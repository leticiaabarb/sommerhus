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
    const s = ledigeArk();
    const værdier = s.getLastRow() > 1
      ? s.getRange(2,1,s.getLastRow()-1,1).getValues().flat().map(String).filter(Boolean)
      : [];
    return json({available: værdier});
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
   Svar altid som JSON
   --------------------------------------------------------------------- */
function json(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
