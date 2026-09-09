# Bøgelunde – booking-side · Opsætningsguide

Du har fået 4 filer:

| Fil | Hvad det er |
|-----|-------------|
| `index.html` | Den offentlige side hvor kunder ser ledige dage og sender en anmodning |
| `admin.html` | Din private side hvor du klikker dage til/fra som ledige |
| `Code.gs` | Google-backend der gemmer dage og sender anmodninger til din Gmail |
| `billeder/` | Mappe hvor du lægger dine egne fotos (se `billeder/LÆS-MIG.txt`) |
| `OPSAETNING.md` | Denne guide |

Du kan **teste alt med det samme** i demo-tilstand (se nederst). Herunder gør vi det rigtigt.

---

## Sådan hænger det sammen

```
   Kunde  →  index.html  ──┐
                           ├──►  Google-backend (Code.gs)  →  din Gmail
   Du     →  admin.html  ──┘            │
                                        └──►  Google Sheet (gemmer ledige dage)
```

Backenden er gratis, kører på din egen Google-konto, og sender mails fra din egen Gmail. Ingen server eller abonnement.

---

## Del 1 · Sæt Google-backenden op (ca. 10 min)

1. Gå til **https://sheets.google.com** og opret et nyt, tomt regneark. Kald det fx "Bøgelunde bookinger".
2. I regnearket: klik **Udvidelser → Apps Script**. Et nyt faneblad åbner.
3. Slet den kode der står i forvejen (`function myFunction() {}`).
4. Åbn filen `Code.gs` (her fra mappen), kopier **hele** indholdet og indsæt det i Apps Script.
5. Ret de tre linjer øverst:
   - `ADMIN_KODE` → vælg din egen hemmelige adgangskode (den bruger du til `admin.html`).
   - `MODTAGER_MAIL` → er allerede sat til `simonroel1984@gmail.com`. Ret hvis du vil have mails et andet sted.
   - `HUS_NAVN` → ret hvis huset skal hedde noget andet end Bøgelunde.
6. Klik **Gem** (disketten).
7. Klik **Udrul → Ny udrulning** (Deploy → New deployment).
   - Ved "Vælg type" (tandhjulet): vælg **Webapp**.
   - **Kør som:** Mig selv.
   - **Hvem har adgang:** **Alle** (Anyone). *Dette er nødvendigt for at kunder kan bruge siden.*
   - Klik **Udrul**.
8. Første gang beder Google om tilladelse. Klik dig igennem: vælg din konto → "Avanceret" → "Gå til … (usikker)" → Tillad. (Det er "usikkert" blot fordi det er dit eget script, ikke godkendt af Google – helt normalt.)
9. Du får nu en **web-app URL** der ender på `/exec`. **Kopier den.**

## Del 2 · Forbind siderne til backenden

1. Åbn `index.html` i en teksteditor (fx Notesblok). Find linjen øverst i `<script>`:
   ```js
   backendUrl: "",
   ```
   Indsæt din URL mellem anførselstegnene:
   ```js
   backendUrl: "https://script.google.com/macros/s/AKfyc.../exec",
   ```
2. Gør præcis det samme i `admin.html` (samme URL begge steder).
3. Gem begge filer.

Nu er demo-tilstanden slået fra, og siderne bruger den rigtige backend.

## Dine egne billeder (nemmest)

1. Åbn mappen `billeder`.
2. Læg dine fotos ind og navngiv dem `1.jpg`, `2.jpg`, `3.jpg` … (op til 24).
3. Vil du have et stort billede øverst bag titlen, kald det `hero.jpg`.
4. Åbn `index.html` — galleriet finder billederne helt af sig selv. Ingen kode at ændre.

Detaljer og tips står i `billeder/LÆS-MIG.txt` (fx om iPhone-billeder i HEIC-format, der skal gemmes som JPG). Husk at tage `billeder`-mappen med, når du lægger siden online.

## Del 3 · Læg siden online (gratis)

Du skal bruge et sted at hoste de to HTML-filer. Anbefaling til ikke-teknikere:

**Netlify Drop – nemmest, ingen konto-krav for at teste:**
1. Læg `index.html` og `admin.html` i én mappe.
2. Gå til **https://app.netlify.com/drop**.
3. Træk mappen ind i browservinduet. Du får straks en offentlig adresse, fx `https://noget-tilfældigt.netlify.app`.
4. Din bookingside er nu `.../index.html` og din admin er `.../admin.html`.
5. Opret evt. en gratis Netlify-konto for at beholde siden permanent og få et pænere navn.

**Alternativ – GitHub Pages** (hvis du vil have fuld kontrol og eget domæne senere). Sig til, så laver jeg en guide til den.

> Tip: Del kun `index.html`-adressen med kunder. Hold `admin.html`-adressen for dig selv – den er beskyttet af din adgangskode, men det er alligevel bedst ikke at dele den.

## Del 4 · Daglig brug

- **Marker ledige dage:** åbn `admin.html`, log ind med din adgangskode, klik de dage huset er ledigt (bliver grønne), tryk **Gem ændringer**. Ændringerne er straks live.
- **Modtag anmodninger:** når en kunde sender en anmodning, får du en e-mail med alle detaljer, og den logges i regnearkets fane "Bookinger". Du bekræfter selv pr. mail/telefon.

---

## Demo-tilstand (test uden opsætning)

Så længe `backendUrl` står tom, kører siderne i demo:
- Åbn `admin.html`, log ind med adgangskoden **`boegelunde`**, marker nogle dage og tryk Gem.
- Åbn `index.html` **i samme browser** – de dage du markerede vises nu som ledige.
- Sender du en anmodning i demo, åbnes din e-mail-klient med teksten (i stedet for automatisk afsendelse).

Demo gemmer kun i din egen browser og kan ikke bruges af rigtige kunder – det er kun til at prøve flowet.

---

## Vil du have mere?

Sig til hvis du ønsker: automatisk bekræftelses-mail til kunden, at optagede dage automatisk fjernes når du bekræfter, billeder/priser på siden, eller kobling til din Google Kalender.
