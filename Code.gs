/* =====================================================================
   Bøgelunde – backend (Google Apps Script)
   ---------------------------------------------------------------------
   Denne kode:
   - gemmer ledige dage i et Google Sheet
   - modtager booking-anmodninger og sender dem til din Gmail
   - beskytter admin med en adgangskode

   Se OPSAETNING.md for trin-for-trin. Ret de 3 værdier herunder:
   ===================================================================== */

const ADMIN_KODE   = "SKIFT_MIG";                 // din hemmelige admin-adgangskode
const MODTAGER_MAIL = "simonroel1984@gmail.com, leticiabarbosaa98@gmail.com";  // hvor booking-anmodninger sendes hen
const HUS_NAVN     = "Bøgelunde";
const AIRBNB_ICAL  = "";   // UDFYLDES KUN I APPS SCRIPT – aldrig i denne fil (repoet er offentligt)

/* ---------------------------------------------------------------------
   Intern: find/opret faner i regnearket
   --------------------------------------------------------------------- */
function ark(navn, kolonner){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(navn);
  if(!s){
    s = ss.insertSheet(navn);
    if(kolonner) s.appendRow(kolonner);
  }
  return s;
}
function ledigeArk(){ return ark("Ledige", ["dato"]); }
function airbnbArk(){ return ark("AirbnbBlokeret", ["dato"]); }
function bookingArk(){ return ark("Bookinger",
  ["tidspunkt","navn","email","telefon","gæster","ankomst","afrejse","besked","status"]); }

/* ---------------------------------------------------------------------
   GET – hjemmesiden henter ledige dage
   --------------------------------------------------------------------- */
function doGet(e){
  const p = (e && e.parameter) || {};
  if(p.action === "availability"){
    // hvis admin=1 kræves korrekt token
    if(p.admin === "1" && p.token !== ADMIN_KODE){
      return json({error:"unauthorized"});
    }
    const ledige = læsDatoer(ledigeArk());
    if(p.admin === "1"){
      // admin ser sine egne markeringer uændret + hvad Airbnb blokerer
      return json({available: ledige, airbnb: læsDatoer(airbnbArk())});
    }
    const blokeret = new Set(læsDatoer(airbnbArk()));
    return json({available: ledige.filter(d => !blokeret.has(d))});
  }
  return json({ok:true, hus:HUS_NAVN});
}

/* ---------------------------------------------------------------------
   POST – booking-anmodning eller admin gemmer ledige dage
   --------------------------------------------------------------------- */
function doPost(e){
  let data;
  try{ data = JSON.parse(e.postData.contents); }
  catch(err){ return json({error:"ugyldig anmodning"}); }

  if(data.action === "setAvailability"){
    if(data.token !== ADMIN_KODE) return json({error:"unauthorized"});
    const s = ledigeArk();
    s.clearContents();
    s.appendRow(["dato"]);
    const rene = (data.dates || []).map(String).filter(Boolean);
    if(rene.length) s.getRange(2,1,rene.length,1).setValues(rene.map(d=>[d]));
    return json({ok:true, gemt:rene.length});
  }

  if(data.action === "book"){
    return håndterBooking(data);
  }

  return json({error:"ukendt handling"});
}

/* ---------------------------------------------------------------------
   Booking: log i ark + send e-mail til dig
   --------------------------------------------------------------------- */
function håndterBooking(d){
  const tid = new Date();
  bookingArk().appendRow([
    tid, d.navn||"", d.email||"", d.telefon||"", d.antal||"",
    d.ankomst||"", d.afrejse||"", d.besked||"", "Ny"
  ]);

  const nætter = antalNætter(d.ankomst, d.afrejse);
  const emne = `Ny booking-anmodning: ${HUS_NAVN} (${d.ankomst} → ${d.afrejse})`;
  const krop =
`Du har modtaget en ny booking-anmodning på ${HUS_NAVN}.

Ankomst:  ${d.ankomst}
Afrejse:  ${d.afrejse}
Nætter:   ${nætter}

Navn:     ${d.navn}
E-mail:   ${d.email}
Telefon:  ${d.telefon || "-"}
Gæster:   ${d.antal || "-"}

Besked:
${d.besked || "(ingen)"}

— Sendt automatisk fra booking-siden.`;

  MailApp.sendEmail({
    to: MODTAGER_MAIL,
    subject: emne,
    body: krop,
    replyTo: d.email || MODTAGER_MAIL
  });

  return json({ok:true});
}

function antalNætter(a,b){
  if(!a||!b) return "";
  return Math.round((new Date(b)-new Date(a))/86400000);
}

/* ---------------------------------------------------------------------
   Datoer: læs en kolonne som "yyyy-MM-dd", uanset om Sheets har
   gemt værdien som tekst eller som en rigtig dato.
   --------------------------------------------------------------------- */
function tilDato(v){
  if(v instanceof Date) return Utilities.formatDate(v, "UTC", "yyyy-MM-dd");
  return String(v).trim();
}
function læsDatoer(s){
  if(s.getLastRow() < 2) return [];
  return s.getRange(2,1,s.getLastRow()-1,1).getValues().flat().map(tilDato).filter(Boolean);
}

/* ---------------------------------------------------------------------
   Airbnb-synkronisering
   Kører hver time via en tidsudløser og gemmer alle nætter, der er
   booket eller blokeret på Airbnb, i fanen "AirbnbBlokeret".
   --------------------------------------------------------------------- */
function opdaterAirbnb(){
  if(!AIRBNB_ICAL){ console.log("AIRBNB_ICAL er ikke sat – springer over."); return; }

  const svar = UrlFetchApp.fetch(AIRBNB_ICAL, {muteHttpExceptions:true});
  if(svar.getResponseCode() !== 200){
    console.log("Kunne ikke hente Airbnb-kalenderen. HTTP " + svar.getResponseCode());
    return;   // vigtigt: behold de gamle datoer frem for at tømme fanen
  }

  const datoer = parseIcalNætter(svar.getContentText());
  if(!datoer.length){
    console.log("Airbnb-feedet indeholdt ingen datoer – beholder de gamle.");
    return;
  }

  const s = airbnbArk();
  s.clearContents();
  s.appendRow(["dato"]);
  const r = s.getRange(2,1,datoer.length,1);
  r.setNumberFormat("@");                       // gem som tekst, ikke som dato
  r.setValues(datoer.map(d => [d]));
  console.log("Airbnb: " + datoer.length + " blokerede nætter gemt.");
}

/* Træk alle blokerede nætter ud af et iCal-feed.
   DTEND er afrejsedagen og tælles IKKE med – den nat er fri.       */
function parseIcalNætter(ical){
  const linjer = ical.replace(/\r\n[ \t]/g, "").split(/\r?\n/);
  const ude = new Set();
  let start = null, slut = null;
  for(const l of linjer){
    if(l.indexOf("BEGIN:VEVENT") === 0){ start = null; slut = null; continue; }
    const mS = l.match(/^DTSTART[^:]*:(\d{4})(\d{2})(\d{2})/);
    if(mS){ start = Date.UTC(+mS[1], +mS[2]-1, +mS[3]); continue; }
    const mE = l.match(/^DTEND[^:]*:(\d{4})(\d{2})(\d{2})/);
    if(mE){ slut = Date.UTC(+mE[1], +mE[2]-1, +mE[3]); continue; }
    if(l.indexOf("END:VEVENT") === 0 && start !== null){
      const sidste = (slut !== null) ? slut : start + 86400000;
      for(let t = start; t < sidste; t += 86400000){
        ude.add(Utilities.formatDate(new Date(t), "UTC", "yyyy-MM-dd"));
      }
      start = null; slut = null;
    }
  }
  return Array.from(ude).sort();
}

/* ---------------------------------------------------------------------
   Svar altid som JSON
   --------------------------------------------------------------------- */
function json(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
