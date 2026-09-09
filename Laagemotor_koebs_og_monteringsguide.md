# Ny motor + styring til din låge — købs- og monteringsguide

*Lavet til Simon, maj 2026. Priser er vejledende danske priser inkl. moms og kan svinge.*

---

## 0. Porttype: Fløjlåge (bekræftet)

Du har bekræftet, at det er en **fløjlåge** — den svinger ind/ud på hængsler. Så du skal bruge en **arm- eller stempelmotor** (IKKE en skydeportmotor med tandstang). Denne guide er nu skrevet til fløjlåge.

Det er bekræftet, at lågen er **én bred fløj på ca. 3 meter** (ét stykke, hængslet i den ene side). Du skal derfor bruge et **enkelt-motor-kit** (én motor) dimensioneret til en lang/tung fløj — se den konkrete anbefaling i afsnit 2.

Det eneste tal, der stadig er værd at få fat i, er **vægten** af fløjen (smedejern på 3 m vejer ofte 150–300 kg). Den finjusterer den endelige modelstørrelse, men alle de anbefalede motorer nedenfor har rigelig margin til en 3 m fløj.

---

## 1. Mål og noter dette, før du køber

Tag følgende med, når du shopper — det afgør hvilken model i serien du skal vælge:

1. **Lågens vægt** (vigtigst). Smedejern er tungt. En 4 m jernlåge vejer ofte **250–450 kg**. Kan du ikke veje den, så vælg en motor med god margin (fx 600 kg-klassen).
2. **Lågens bredde/længde** og højde.
3. **Svingplads** — er der fri plads til, at fløjen kan svinge helt op? Notér om den svinger **ind mod gården** eller **ud mod vejen** (det afgør, hvilken vej motoren skal arbejde).
4. **Underlag/fundament**: er der støbt et fundament, hvor den gamle motor sad? (Brostenene tyder på fast underlag — godt.)
5. **Strøm**: hvor langt er der til nærmeste 230V, og hvordan var den gamle motor forsynet?
6. **Billeder af den gamle motor og styreboks** (mærke/model) — nogle gange kan man genbruge tandstang, fundament og kabling.

---

## 2. Vælg motor (fløjlåge)

Du prioriterer **kvalitet/holdbarhed (8.000+ kr)** og vil lave **alt selv**. Gode, robuste mærker i Danmark er **CAME, Nice og BFT** — de fås som komplette kit med styring, modtager, fotoceller, fjernbetjeninger og blinklys, og de har alle en simpel "START"-indgang, som telefonstyringen kan kobles på (se afsnit 5).

Til en **tung smedejernsfløj** er det vigtigt at vælge en **kraftig motor med god margin**. Til lange/tunge fløje er **stempel-/ram-motorer** generelt stærkere og mere holdbare end de lette leddelte arm-motorer.

**Din situation: én smedejernsfløj på ca. 3 m.** Du skal bruge ét **enkelt-motor-kit** med en kraftig **stempel-/ram-motor** (stærkere og mere holdbar til en tung jernfløj end en let leddelt arm).

Anbefalet (i prioriteret rækkefølge):

- **CAME Ferni FE4024 — enkelt-kit** (24V, op til 4 m pr. fløj). Klassisk, robust stempelmotor, der passer perfekt til en 3 m jernfløj med god margin. Kittet indeholder typisk styreboks, radiomodtager, fotoceller, 2 fjernbetjeninger og blinklys.
- **BFT Phobos A40 — enkelt** (24V stempelmotor, op til 4 m). Lige så solidt alternativ.
- **Nice Toona TO5024 — enkelt** (24V, op til 5 m / 500 kg) — leddelt arm-motor, hvis der ikke er plads til en lige stempelarm langs fløjen.

Du skal altså kun bruge **én** motor (ikke et dobbelt-kit). Bekræft gerne over for forhandleren med fløjens **vægt + et foto**, og tjek at hængslerne og muren er solide nok til motorbeslaget.

---

## 3. Styreenhed (styringen)

Du behøver i de fleste tilfælde **ikke** købe en separat styreenhed: på de anbefalede kit er **styreprintet indbygget i motorhuset**, og en **radiomodtager til fjernbetjening sidder også indbygget**. Du får altså motor + styring + modtager i ét.

Det er præcis derfor disse kit er det rigtige valg, når din gamle separate styreboks er død — du erstatter både motor OG styring på én gang med en moderne enhed.

---

## 4. Sikkerhed (køb det med — det er en tung port)

En tung jernlåge kan gøre skade. Tag som minimum:

- **Fotoceller** (et par på hver side af åbningen) — stopper/vender porten, hvis noget krydser. Følger typisk med i kittene.
- **Blinklys / advarselslampe** — markerer at porten kører. Følger ofte med.
- **Indbygget forhindringsregistrering** (kraft/strøm) — findes i styreprintet; husk at indstille følsomheden ved montering.
- **Sikkerhedsliste (klemliste)** på lukkekanten — anbefales på tunge porte, kan tilkøbes.

---

## 5. Telefonstyring (det du ønsker: universel WiFi/GSM)

Du valgte en **universel tilføjelse** frem for en mærke-app. Det er smart og billigt, og det virker på et hvilket som helst af de styreprint ovenfor, fordi de alle har en **"START"/"STEP"/"P.P." (potentialfri) indgang** — den samme indgang som en trykknap eller nøglekontakt bruger. Du simulerer bare et "knaptryk" via nettet.

### Anbefalet: Shelly (WiFi) — hvis WiFi når ud til lågen
- Køb en **Shelly 1 Gen3 med potentialfrit kontaktsæt** (12–48V DC / 230V AC). Den fås i DK (fx billigventilation.dk) og koster typisk **150–250 kr**.
- Forbind Shelly'ens **potentialfrie udgang (O / I)** til styreprintets **START + COM (stel)**.
- Forsyn Shelly'en fra enten 230V eller motorprintets lavspændingsudgang (24V), afhængig af model.
- I Shelly-appen: sæt relæet til **"momentan / auto-off efter 1 sekund"** (detached/pulse), så hvert tryk bliver et kort puls — præcis som at trykke på knappen.
- Resultat: åbn/luk fra **Shelly-appen** hvor som helst, og du kan tilføje **Google Home / Alexa / Apple Home** og automatikker.
- Vil du se **om lågen er åben/lukket** i appen: brug Shelly'ens indgang (SW) koblet til portens hjælpe-/endestop-udgang, eller sæt en lille magnetkontakt på porten.

### Alternativ: GSM-modul — hvis WiFi IKKE når ud til lågen
- En **RTU5024 GSM-portåbner** (ca. **300–600 kr**) eller et dansk GSM-styringsmodul (fx el-grossisten/smith-co).
- Sæt et **SIM-kort** i, kobl **relæudgangen (NO/COM)** til **START + COM**.
- Du åbner ved at **ringe** til enheden (gratis — den afviser opkaldet og udløser pulsen). Op til ~200 godkendte numre, styres via SMS. **Kræver hverken app eller WiFi.**

> Begge løsninger er "tilføjelser" oven på motorens egen styring. Du beholder også de medfølgende **fysiske fjernbetjeninger** (afsnit 7) som backup.

---

## 6. El og 230V — vigtig dansk regel

Du valgte "alt selv, inkl. el". Det meste **må** du selv lave: montere motor, tandstang, fotoceller, indstille styringen, og koble **lavspændingen (24V)** og **Shelly/GSM på den potentialfrie/lavspændte side**.

**Men:** I Danmark må **fast 230V-installation** (stærkstrøm) lovligt **kun** udføres af en **autoriseret elinstallatør**. Det gælder fast tilslutning af motoren til nettet, ny gruppe, fast kabelføring i jord m.m. Du havde allerede en elektriker inde over — få ham/hende til at lave selve 230V-tilslutningen, så er du på den sikre side både juridisk og sikkerhedsmæssigt. Resten kan du roligt selv.

Praktisk arbejdsdeling:
- **Dig:** mekanik (motor, tandstang/arm, fotoceller, blinklys), programmering af endestop og kraft, montering + opsætning af Shelly/GSM, parring af fjernbetjeninger.
- **Autoriseret elektriker:** den faste 230V-forsyning frem til motoren.

---

## 7. Fjernbetjeninger

Kittene kommer med 1–2 fjernbetjeninger. Vil du have flere (til familie/biler), så køb **ekstra fjernbetjeninger af samme mærke/serie** som motoren og par dem til den indbyggede modtager (typisk hold en knap på styreprintet + tryk på fjernbetjeningen — står i manualen). Bestil dem gerne sammen med kittet.

---

## 8. Montering — trin for trin (overordnet)

1. **Afmontér den gamle motor og styring.** Notér/fotografér kabling først.
2. **Tjek hængsler og stolpe.** Sidder hængslerne solidt, og er muren/stolpen stærk nok til motorbeslaget? Fløjen skal kunne svinge frit og let **i hånden**, før motoren sættes på — gør den ikke det, så smør/juster hængslerne først.
3. **Montér bagbeslaget** (på stolpe/mur) og **frontbeslaget** (på fløjen) i de korrekte mål — følg motorens monteringsskema nøje; afstandene bestemmer åbningsvinklen.
4. **Montér motoren** mellem de to beslag.
5. **Få 230V frem** (autoriseret elektriker) og forsyn motorprintet.
6. **Montér fotoceller** på hver side af åbningen, i samme højde, lige over for hinanden.
7. **Montér blinklys** synligt.
8. **Tilslut Shelly/GSM** til START + COM (se afsnit 5).
9. **Programmér styringen:** indlær åbnings-/lukkevinkel og endestop; ved to fløje sæt **fløjforsinkelse**; indstil kraft/forhindringsregistrering, så fløjen vender ved modstand.
10. **Par fjernbetjeninger** og sæt Shelly/GSM op i app/SMS.
11. **Test sikkerheden grundigt:** fløjen skal stoppe/vende, når fotocellen brydes, og når den møder modstand. Test flere gange før daglig brug.

> Følg **altid den medfølgende manual** for netop din model — terminalnavne og indlæringssekvenser varierer mellem Nice/BFT/CAME.

---

## 9. Indkøbsliste (kvalitetsniveau, vejledende priser)

| Del | Eksempel | Ca. pris (DKK) |
|---|---|---|
| Motor-kit m. styring + modtager + fotoceller + 1–2 fjernb. + blinklys | CAME Ferni FE4024 / Axo 5024 (enkelt el. dobbelt) · BFT Phobos | 4.500–9.000 |
| Ekstra fjernbetjeninger | Samme mærke | 250–500 / stk |
| Telefonstyring | Shelly 1 Gen3 (potentialfri) **eller** RTU5024 GSM | 150–600 |
| Sikkerhedsliste (valgfrit, anbefales) | Klemliste til lukkekant | 400–900 |
| El-arbejde (230V af autoriseret) | Tilslutning/forsyning | efter tilbud |

**Samlet materialepris** lander typisk i **~6.000–10.000 kr** for et solidt kvalitetssetup uden el-regningen — det passer fint med dit budget.

---

## 10. Hvor køber du det i Danmark?

- **NEMTEKNIK** (nemteknik.dk) — Nice skyde- og garageautomatik.
- **CAME Danmark** (came-danmark.dk) — skyde- og fløjkit (Ferni, Axo, BX/BK).
- **Systems4you / BFT-forhandlere** — BFT Deimos.
- **billigventilation.dk** — Shelly 1 Gen3 med potentialfrit kontaktsæt.
- **el-grossisten.dk / smith-co.dk / svane-el.dk** — GSM-styringsmoduler.

Ring gerne til forhandleren med lågens **vægt og bredde** + et foto — de hjælper med at ramme den rigtige model i serien.

---

## Kort opsummeret
1. **Fløjlåge bekræftet** — du skal bruge en arm-/stempelmotor (ikke en skydeportmotor).
2. **Én fløj på ca. 3 m** bekræftet → du skal bruge ét **enkelt-motor-kit** (ikke dobbelt).
3. Køb et **kraftigt 24V kvalitetskit** (fx CAME Ferni/Axo eller BFT Phobos) dimensioneret til vægt + bredde — styring + modtager er **indbygget**.
4. Tilføj **Shelly 1 Gen3** (WiFi-app) eller **RTU5024 GSM** (opkald) på motorens **START-indgang** til telefonstyring.
5. Lav **mekanik + lavspænding + opsætning selv**; lad **elektrikeren** lave den faste **230V-tilslutning**.
6. **Test sikkerheden** (fotoceller + forhindringsstop) grundigt før brug.
