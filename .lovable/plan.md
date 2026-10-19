# Soumyakanta Bera - Career Dashboard + Showcase (one-pager)

A single long page that works first as **your personal tracker** and then as a **public showcase** for recruiters and agencies in Milan. Built from the files in your zip (CVs v5, handover, 6-month execution report, P1/P2 projects, thesis, certificates).

## 1. Two modes, one page
- **Showcase mode (default, public):** profile, 3 career tracks, projects, thesis, certificates, CV downloads, contact.
- **My mode (toggle, top-right):** adds the weekly tracker, application pipeline, next actions, hours budget, wellbeing nudge. Private notes (permit date, salary answer, personal context) appear only here.
- Note: without a login, "My mode" is hidden, not secured. A real login can be added later if you want private data truly protected.

## 2. Sections (top to bottom)
1. **Hero tile wall** - name, "MSc Finance & Risk Management - Milan", availability chip, 4 colour tiles: Finance, Data/BI, Business Analyst, Contact. Buttons: Download CV, LinkedIn, Email.
2. **Current snapshot** - stat tiles: 3,055 firm-years thesis, 4h -> 30min budget pack, 3h -> 20min ETL, ATS 119/120, Languages EN C1 / IT B1.
3. **Three career tracks** (the 3 genres), each a solid colour block:
   - Finance - FP&A / Controller / Credit (blue) - 45% + 15% focus
   - Data / BI Analyst (orange) - 25%
   - Business Analyst (green) - 10%
   Each shows: skills I have (solid), skills in progress (faded, e.g. SAP CO), gaps (outlined-by-fill, honest), matching CV to download.
4. **Projects grid** - Thesis (SSRN), Budget-vs-actual pack, ETL + Power BI dashboard (done, full colour); P1 Navaro Casa, P2 Live Valuation, P3 Thesis card (faded, with "In progress / Planned" label and target date). Each card opens a popup: description, embedded content (PDF viewer, Power BI / YouTube / any URL iframe), GitHub link, download.
5. **6-month roadmap (Oct 2026 - Mar 2027)** - horizontal timeline tiles (vertical on mobile): P0 publish (Oct), P1 Navaro Casa (Nov - mid Dec), P3 thesis card (Dec), P2 valuation (Jan - Feb), interview prep (Mar), SAP CO cert, Italian. Done = solid, current = 70% opacity with progress bar, planned = 45% opacity, still fully readable (no blur).
6. **Certificates wall** - icon tiles (CFI, Power BI, Google DA, LSEG, Bocconi, AWS, Claude API, SAP CO in progress = faded).
7. **Documents / Downloads** - CVs EN/IT per track (PDF + DOCX), Navaro Casa one-pager, project zip. Preview in popup, download button.
8. **My mode only:** this week's next actions (checkbox), applications pipeline (Applied / Interview / Offer counts, editable), hours used vs 10 h/week, "it's late - go to sleep" nudge after 23:00.
9. **Contact footer** - email, phone, LinkedIn, location, "Open to junior roles in Milan, Turin, Bologna, remote".

## 3. Interactivity
- Popup (modal) for any item: embed URL / PDF / image, plus "Open link", "GitHub", "Download".
- "+ Add item" in My mode: paste a URL or upload a file to attach to a project, roadmap step or document tile (saved in this browser for now).
- Filter chips on tracks/projects (Finance / Data / BA); sticky section nav; smooth scroll; tile hover lift; progress animations.

## 4. Design assets
**Font:** DM Sans (400/500/700) for everything.

**Palette (solid blocks, no borders, no gradients):**
```text
Blue    #1D4ED8  -> Finance track       text: white
Orange  #F97316  -> Data / BI track     text: near-black #1A1A1A
Green   #16A34A  -> Business Analyst    text: white (bold/large) or #0B2E17
Yellow  #FACC15  -> Highlights, CTAs    text: #1A1A1A
Ink     #111827  -> Headings / dark tiles
Paper   #FAFAF7  -> Page background
Soft tints (blue-50, orange-50, green-50, yellow-50) for secondary tiles
```
Separation by colour, spacing and soft shadow only - zero borders on cards, inputs, buttons.

**Status styling:** Done = 100% solid; In progress = 70% opacity + striped progress bar + "In progress" chip; Planned = 45% opacity + dashed timeline dot + "Planned - Jan 2027". Labels always stay at readable contrast.

**Custom iconography (inline SVG set, single style: 2px rounded strokes + one solid fill accent):** finance chart, ledger/controller, credit shield, database/ETL, dashboard, BA flow map, thesis/book, certificate badge, SAP gear, language bubble, permit/passport, CV doc, GitHub, PDF, link, download, calendar, moon (sleep).

**Layout:** desktop 12-column bento tile grid; tablet 2 columns; mobile single column, timeline turns vertical, nav becomes bottom chip bar.

## 5. Contrast / UX smoke test (run after build)
- Check every text/background pair against WCAG AA (4.5:1 body, 3:1 large). Known adjustment: white on orange and yellow fails, so those use near-black text; green uses dark text for small sizes.
- Faded items: confirm their text still passes 3:1 at reduced opacity (fade the tile background, keep text darker).
- Playwright screenshots at 390px (mobile) and 1280px (desktop); check popup open/close, keyboard focus, downloads, mode toggle.
- Results reported as a table.

## Technical details
- Single route `/` with section anchors (explicitly a one-pager); head() metadata for SEO.
- Content in one typed data file (profile, tracks, projects, roadmap, certs, docs) so you can update numbers in one place.
- CV PDFs/DOCX and project files uploaded as CDN assets from the zip; downloads link to them.
- My-mode data (checkboxes, pipeline counts, added links) stored in localStorage; upgradeable to Lovable Cloud with login later.
- shadcn Dialog for popups, tokens in styles.css (oklch), DM Sans via Google Fonts link.
- Embeds via sandboxed iframe; sites that block embedding fall back to an "Open in new tab" button.
