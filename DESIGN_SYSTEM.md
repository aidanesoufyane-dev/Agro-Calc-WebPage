# AgroCalc Pro design system

Version 1.0 · Based on the current website in September 2026

This is a reusable specification for matching the AgroCalc Pro Android app to the website. It describes the implemented visual language, then gives practical mobile translations. The current website styles in src/components/Redesign.css and src/App.css remain the source of truth if they change later. The editorial redesign in Redesign.css takes precedence over older App.css values where both apply.

## 1. Design direction

AgroCalc Pro should feel like a calm, precise field instrument: agricultural without decorative clichés, technical without looking like a spreadsheet, and professional without losing warmth. Use deep botanical green for trust and action, warm off-white for breathing room, thin rules for structure, and a restrained lime accent for emphasis. Real app screens, real nutrient data, and clear labels carry more weight than decorative effects.

The visual rhythm is editorial: generous open space, strong type, clear section boundaries, small uppercase overlines, and one clear primary action. Avoid glossy gradients on every surface, excessive shadows, dense card grids, and decorative icons that compete with data.

## 2. Color tokens

These are the active website values. Use the first five as the shared core palette in the app. The rest are supporting colors observed in specific components.

| Token | Hex | Website use | Suggested app use |
| --- | --- | --- | --- |
| Ink / primary green | #193C2C | Main text, primary buttons, dark CTA | Top bar, primary actions, key values |
| Paper | #F6F5EE | Main page background | Default screen background |
| Muted text | #69746A | Supporting copy | Secondary labels and descriptions |
| Line | #DCDED2 | Hairline borders and dividers | List separators and input outlines |
| Soft lime | #D9ED9C | Light accent and dark-section button | Selected states and light accent surfaces |
| White | #FFFFFF | Blog cards and article body | Cards and elevated surfaces |
| Field tint | #E9EDDF | Field section and supporting panels | Quiet information panels |
| Deep field | #294E37 | Field illustration | Dark feature or summary panel |
| Blog gradient start | #102D20 | Blog/article hero | Optional brand splash or header |
| Blog gradient middle | #254B30 | Blog/article hero | Optional header continuation |
| Blog gradient end | #406138 | Blog/article hero | Optional header continuation |
| Focus green | #769C30 | Keyboard focus outline | Focus indicator where appropriate |
| CTA mint | #F1F8E9 | Article download callout | Subtle recommendation or success panel |
| CTA border | #A5D6A7 | Article callout outline | Callout border |

Use Ink on Paper for the default reading state. On a dark Ink surface, use Paper or White text and Soft Lime for the action. Muted text belongs on light surfaces; do not use it for important values on dark green. Soft Lime is an accent, not the default paragraph color. A native dark mode is not currently defined by the website; design and test it separately rather than reversing these colors mechanically.

### Category and status accents

The website blog uses these category colors, each on a very pale tinted pill with matching text: Formulation #528014, Crop nutrition #2E7D32, Tank management #0D47A1, Water & EC #00695C, and Field workflow #704D37. These describe content categories, not fertilizer safety states. In the app, give warning, error, and success their own accessible semantic colors; do not infer them from the blog categories.

Tank labels on the fertilizer page use soft fills: A #DAE8DF, B #DCE6C8, C #F0E4C7, and A/B #E2E5DB. Always show the letter as text; color alone must not identify a tank.

## 3. Typography

| Role | Website specification | Android translation |
| --- | --- | --- |
| Main UI | DM Sans, weights 400 / 500 / 600 / 700 | Use DM Sans throughout navigation, forms, labels, body, buttons, and results |
| Editorial accent | Playfair Display, usually italic weight 400 | Use sparingly in splash/onboarding or a major screen heading; never for dense calculations |
| Data / codes | DM Mono, weights 400 / 500 | Use for tank letters, ion symbols, units, step numbers, and aligned tabular values |
| Landing display | DM Sans 500, roughly 52–76 px, tight line height around 1.06 | Mobile display around 34–42 sp; adapt to text scale and French length |
| Section title | DM Sans 500, roughly 36–58 px on landing; 25 px in notes | App page title around 24–30 sp; section title around 20–24 sp |
| Article/card title | Playfair Display bold on blog cards and articles | Use only for editorial/guidance areas, not calculator controls |
| Body | DM Sans 14–16 px; article body 16 px / 1.8 | 16 sp body with comfortable line height; 14 sp supporting text |
| Small label | DM Sans 9–12 px, uppercase with 1.5–2 px tracking | Prefer 11–12 sp, tracked uppercase only for short labels |
| Button | DM Sans 13–14 px, medium | At least 14 sp in the app for readability |

The website pairs direct sans-serif headlines with a single italic serif phrase. Carry that contrast into marketing or onboarding screens, but keep every calculator input and result in DM Sans/DM Mono. Use real typographic subscripts and superscripts where possible for NO₃⁻, NH₄⁺, Ca²⁺ and similar ions. Show units beside values, never rely on color or position alone.

## 4. Layout, space, and shape

The website uses a centered maximum content width of 1200 px and roomy desktop gutters. At 700 px and below, its main gutter becomes 20 px per side; article reading width is capped at 760 px. The page structure favors whitespace and dividers over enclosing every item in a card.

Suggested app spacing scale in dp, derived from the site's repeated intervals: 4, 8, 12, 16, 20, 24, 32, 40, and 48. Use 20–24 dp screen gutters, 24–32 dp between form groups, 12–16 dp inside compact rows, and 1 dp dividers. These are mobile adaptations rather than literal CSS pixel copies.

Use a small radius for controls (website buttons are about 5–6 px), 12–16 dp for distinct cards or callouts, and full-pill rounding for category chips. The website's blog cards use 16 px corners and very soft shadows; ordinary data rows and field notes are mostly flat. Prefer a subtle border over heavy elevation. Keep one prominent card or panel per screen, then let simpler rows do the work.

## 5. Components to carry into the app

### Primary button
Filled Ink background, Paper/White text, compact 5–6 px corner radius, medium DM Sans label. The website button has approximately 17 px vertical and 22 px horizontal padding. In the app, make the touch target at least 48 × 48 dp. On dark green backgrounds, invert it to Soft Lime with Ink text. A button states the action: Calculate, Review tanks, or Export PDF.

### Secondary action and text link
A thin Ink outline or a text link with a subtle underline/arrow. The arrow is supportive, not a replacement for a label. Keep link text meaningful. Use a secondary action for Review details or Edit inputs, not a second equally loud primary button.

### Input field
The marketing site does not yet define a mature form system. For the app, extend the palette: Paper or White surface, Ink value, Muted label, Line border, Focus Green indicator. Place the unit in a persistent suffix or beside the label. Show an example or acceptable format only when needed. Validation must use text plus color; do not invent agronomic “safe” ranges without verified data.

### Numeric result
Use large, high-contrast Ink figures with a smaller explicit unit. Align comparable numbers consistently, ideally with DM Mono for values that need scanning. Group by meaning: nutrient amounts, ionic balance, EC, and tank distribution. Highlight the primary result; keep secondary diagnostics quieter.

### Nutrient/tank row
Use a simple divided row rather than a separate card for every ion or fertilizer. Left: ion or fertilizer name. Right: value plus unit or a tank badge. A/B/C badges use the soft fills above and always retain their letters. For anion/cation comparisons, make the relationship explicit with labels, totals, and a short explanatory line.

### Information card and article callout
White or Field Tint surface; 12–16 dp radius; thin Line border or very soft shadow. The website's article download callout is a pale green #F1F8E9 panel with #A5D6A7 border. In the app, reserve this tone for a helpful next step or a successful completed calculation, not every generic container.

### Tabs, filters, and chips
Selected category chips are Soft Lime with Ink text; unselected chips are quiet outlines/tints. Make the selected state visible through fill and text, not color alone. Tabs for Calculator / Analysis / Tanks / Report should have clear labels and a stable selected indicator.

### Navigation
Website navigation is a restrained 80 px cream bar with a hairline bottom border. In the app, use a compact Ink-on-Paper top bar. A bottom navigation bar is appropriate if the app has a few top-level destinations; do not mirror the website's full navbar or footer on a phone.

## 6. Screen composition for AgroCalc Pro

A practical mobile flow that matches the brand is:

1. **Inputs:** title, one-sentence purpose, fertilizer quantity rows, water EC, volume and area fields, then one primary Calculate action. Keep units visible.
2. **Results:** a clear summary value or short set of values first, followed by NPK, ionic balance, EC and per-hectare details in progressive sections.
3. **Tank distribution:** A/B/C groups with text labels and soft tank colors. Explain incompatible or moved fertilizers in plain language.
4. **Report:** a concise preview and Export PDF action, using the same Ink/Lime action hierarchy.
5. **Guidance:** article-like screens may use the website's Playfair title treatment, source links and generous body spacing.

This is a design translation, not a claim that the current app already uses this exact navigation or information architecture.

## 7. Motion and imagery

On the website, the 3D phone gently floats about 10 px while the page is at the top (1.7 s, sine ease, yoyo). The desktop walkthrough pins the scene, moves the phone side to side, crossfades real screenshots, and ends with a centered download moment. Typical transitions are 0.2–0.45 s; large scene movement is slower, around 0.95–1.2 s. A reduced-motion preference disables the major animation and shows a readable static layout.

In the app, use motion to explain state change: a restrained 150–300 ms transition for tabs, expanded details or a completed calculation. Keep numbers stable while users compare them. Avoid bouncing the actual form or animating critical readings. Respect the device's reduced-motion setting.

Use the real AgroCalc Pro logo in public/logo.png and real app screenshots in public/screens. The site's field illustration uses crop-line geometry, a small sun, and subtle orbit lines; these are optional background motifs. Never let decoration obscure a nutrient value, action, or unit.

## 8. Accessibility and localization

- Maintain readable contrast, especially Ink on Paper/White and Paper on Ink. Verify any new status colors against their actual background.
- Support larger system text and long French labels without clipping; do not hard-code a single-line heading where the translation needs two lines.
- Provide visible focus/selection states and accessible labels for icon-only controls.
- Keep interactive targets at least 48 × 48 dp in the app; allow enough space between adjacent actions.
- Use semantic labels, units, and explanations rather than presenting a color-only EC diagnosis.
- If the app supports both English and French, translate the complete task flow, not only headings. Preserve technical notation and localize decimal separators where appropriate.

## 9. Quick implementation checklist

- Start with Ink, Paper, Muted, Line, Soft Lime and White as shared tokens.
- Use DM Sans for functional UI, DM Mono for compact data, Playfair for restrained editorial emphasis.
- Make the calculation result and next action obvious before adding decorative elements.
- Use dividers and whitespace first; cards and shadows only when they clarify grouping.
- Reuse tank badge colors with visible A/B/C text.
- Check French length, large text, small screens, and reduced motion.
- Compare new app screens against the website's homepage, supported-fertilizer table, and Field Notes rather than against the legacy App.css palette alone.

Source references: src/components/Redesign.css (active redesign), src/App.css (older shared styles), src/components/LandingPage.jsx (motion and page composition), src/components/BlogPages.jsx (category colors and article components), and public/logo.png plus public/screens (brand assets).
