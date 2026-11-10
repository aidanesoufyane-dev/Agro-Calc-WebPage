import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { baseRoutes, absoluteUrl, langsForRoute } from '../src/lib/seo.js'

const root = process.cwd()
const temp = path.resolve(root, '.prerender')
if (path.dirname(temp) !== root) throw new Error('Unsafe temporary build directory')
await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: temp, emptyOutDir: true }, ssr: { noExternal: ['gsap', 'react-helmet-async'] } })
try {
  const { render, missingSpanish } = await import(pathToFileURL(path.join(temp, 'entry-server.js')).href)
  const template = await readFile('dist/index.html', 'utf8')
  const bases = baseRoutes()
  const routeFor = (base, lang) => lang === 'en' ? base : base === '/' ? '/' + lang : '/' + lang + base
  const pages = bases.flatMap(base => langsForRoute(base).map(lang => ({ base, lang, route: routeFor(base, lang) })))
  const untranslated = []
  for (const { route, lang } of [...pages, { route: '/404', lang: 'en' }]) {
    missingSpanish.clear()
    const {html, head} = render(route)
    if (lang === 'es' && missingSpanish.size) untranslated.push(`${route}: ${[...missingSpanish].join(' | ')}`)
    const output = route === '/404' ? 'dist/404.html' : path.join('dist', route.slice(1), 'index.html')
    await mkdir(path.dirname(output), { recursive:true })
    await writeFile(output, template.replace('<html lang="en">', `<html lang="${lang}">`).replace('<!--app-head-->',head).replace('<!--app-html-->',html))
  }
  if (untranslated.length) throw new Error(['Spanish pages contain untranslated text:', ...untranslated].join(String.fromCharCode(10)))
  // Each URL lists every language version, as Google recommends for hreflang in sitemaps.
  const alternates = base => langsForRoute(base).map(lang => `<xhtml:link rel="alternate" hreflang="${lang}" href="${absoluteUrl(base, lang)}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(base, 'en')}"/>`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages.map(({ base, lang }) => `  <url><loc>${absoluteUrl(base, lang)}</loc>${alternates(base)}</url>`).join('\n')}\n</urlset>\n`
  await writeFile('dist/sitemap.xml',sitemap)
  await writeFile('dist/_redirects', [
    ...pages.filter(page => page.route !== '/').map(({ route }) => `${route} ${route}/index.html 200`),
    '/* /404.html 404',
  ].join('\n')+'\n')
  console.log(`Prerendered ${pages.length} pages (${bases.length} English, ${bases.length} French, ${pages.filter(p => p.lang === 'es').length} Spanish) plus a noindex 404 page.`)
} finally {
  await rm(temp, { recursive:true, force:true })
}
