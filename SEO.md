# AgroCalc Pro search setup

The Vite/React site prerenders each public route in scripts/build.mjs. This build creates dist/sitemap.xml from corePages and blogPosts, so add new public pages to those lists. Keep canonicals and the sitemap on https://agrocalcpro.soufyanedev.com with no trailing slash except /. Do not add guessed publication or modification dates.

## Search Console

Use a URL-prefix property for https://agrocalcpro.soufyanedev.com/ if choosing HTML-tag verification. Add the token value only as VITE_GOOGLE_SITE_VERIFICATION in the deployment environment (see .env.example), rebuild, and confirm the tag in the homepage source. A Domain property instead requires DNS verification and does not use this variable. Submit https://agrocalcpro.soufyanedev.com/sitemap.xml, then inspect the homepage, /fertilizer-calculator, /blog, and a representative article. Request indexing for important pages after they are live; submission does not guarantee indexing.

## Future work

**High:** Review articles and crop targets with a qualified agronomist, add original worked examples with known inputs and assumptions, and monitor Search Console queries and indexing. Build a real web calculator only from verified app formulas, with indexable explanatory content and separate validated calculation logic.

**Medium:** If French search traffic matters, introduce separate /en/ and /fr/ routes with equivalent prerendered content, reciprocal hreflang, and redirects or canonicals preserving existing URLs. The current language toggle changes content on the same URL; do not claim separate language alternates now. Review Core Web Vitals with real field data before optimizing bundles or images further.

**Low:** Add Google Analytics only if useful and configured with an actual measurement ID. Pursue relevant links from credible agronomy partners and publications; avoid paid link schemes.

For proposed web tools such as /tools/npk-calculator, keep calculation logic in a tested shared module, render a useful static explanation and input form at a stable canonical route, and load interactive code only where needed. Do not promise crop-specific targets without source data and expert review.
