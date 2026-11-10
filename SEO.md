# AgroCalc Pro search setup

The Vite/React site prerenders each public route in scripts/build.mjs, once in English at the root and once in French under /fr (for example /fertilizer-calculator and /fr/fertilizer-calculator). The route list, sitemap and hreflang alternates all come from `baseRoutes()` in src/lib/seo.js, which reads corePages (src/content/site.js) and blogPosts, so add new public pages there and give each corePages entry `titleFr` and `descriptionFr`. Keep canonicals and the sitemap on https://agrocalcpro.soufyanedev.com with no trailing slash except /. Do not add guessed publication or modification dates.

## Languages

Each URL renders exactly one language. Write bilingual text with `T` from src/lib/i18n.jsx, which renders only the active language, and use the `Link` from that module so French pages link to French pages. Never add paired `<span className="en">`/`<span className="fr">` markup: hidden text in the other language is what this setup removed. `npm run check` fails if a page contains text in the other language.

## Structured data and FAQs

src/lib/seo.js emits one JSON-LD graph per page: Organization and WebSite everywhere, plus SoftwareApplication (home), WebApplication and BreadcrumbList (tools), Article and BreadcrumbList (posts), and CollectionPage (blog hub). FAQs live in src/content/faqs.js, keyed by English route; the same data renders the visible FAQ and the FAQPage schema. Google currently shows FAQ rich results mainly for government and health sites, so treat FAQPage as context for search engines rather than a guaranteed snippet.

## Web tools

Calculation logic lives in tested modules: src/lib/fertigationCalculator.js (NPK calculator, matching the Android app) and src/lib/tools.js (ppm, EC and drip irrigation). scripts/verify-build.mjs checks them against hand-calculated values and checks that the published composition table matches the engine. Tools render with example values at build time, so the prerendered HTML includes real results.

## Search Console

Use a URL-prefix property for https://agrocalcpro.soufyanedev.com/ if choosing HTML-tag verification. Add the token value only as VITE_GOOGLE_SITE_VERIFICATION in the deployment environment (see .env.example), rebuild, and confirm the tag in the homepage source. A Domain property instead requires DNS verification and does not use this variable. Submit https://agrocalcpro.soufyanedev.com/sitemap.xml, then inspect the homepage, /fertilizer-calculator, /fertilizer-ppm-calculator, /fr/fertilizer-calculator, /blog and a representative article. Request indexing for important pages after they are live; submission does not guarantee indexing.

## Future work

**High:** Review articles and crop targets with a qualified agronomist, add an author/about page with real credentials, and monitor Search Console queries and indexing. Earn links from credible agronomy, extension and grower sources; avoid paid link schemes.

**Medium:** Review Core Web Vitals with real field data before optimizing bundles or images further. Consider further single-purpose tools that match frequent searches (for example a stock-solution or nutrient-recipe calculator) once their formulas are verified.

**Low:** Add Google Analytics only if useful and configured with an actual measurement ID.
