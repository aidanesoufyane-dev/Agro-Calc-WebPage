import { createContext, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ES_ROUTES } from '../content/site.js'

// English lives at the root; French mirrors every route under /fr.
// Spanish lives under /es, only for the routes listed in ES_ROUTES (fully translated pages).
export const LANGS = ['en', 'fr', 'es']
export const LangContext = createContext('en')
export const useLang = () => useContext(LangContext)

const PREFIX = { fr: '/fr', es: '/es' }
export const langFromPath = pathname => {
  for (const [lang, prefix] of Object.entries(PREFIX)) if (pathname === prefix || pathname.startsWith(prefix + '/')) return lang
  return 'en'
}
export const stripLang = pathname => {
  const lang = langFromPath(pathname)
  return (lang === 'en' ? pathname : pathname.slice(PREFIX[lang].length)) || '/'
}

/** Languages a base route exists in. */
export const langsFor = base => ES_ROUTES.includes(base) ? LANGS : ['en', 'fr']
export const hasLang = (base, lang) => langsFor(base).includes(lang)

// '/blog' -> '/fr/blog', '/' -> '/fr', '/#faq' -> '/fr#faq'. External and relative targets pass through.
// A Spanish link to a page that has no Spanish version points to the English page.
export function localizePath(to, lang) {
  if (lang === 'en' || typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) return to
  const cut = to.search(/[?#]/)
  const path = cut === -1 ? to : to.slice(0, cut)
  const rest = cut === -1 ? '' : to.slice(cut)
  if (langFromPath(path) !== 'en') return to
  if (!hasLang(path, lang)) return to
  return (path === '/' ? PREFIX[lang] : PREFIX[lang] + path) + rest
}

export function Link({ to, ...props }) {
  const lang = useLang()
  return <RouterLink to={localizePath(to, lang)} {...props}/>
}

// Every Spanish text the prerender needed but did not find. scripts/build.mjs fails the build if
// any Spanish page used one, so English never ships under /es by accident.
export const missingSpanish = new Set()

// Renders only the active language so each URL carries a single language for search engines.
export function T({ en, fr, es }) {
  const lang = useLang()
  if (lang === 'es' && es === undefined) missingSpanish.add(typeof en === 'string' ? en : '[JSX] ' + JSON.stringify(en?.props?.children ?? en).slice(0, 80))
  return <span className={lang}>{lang === 'fr' ? fr : lang === 'es' ? (es ?? en) : en}</span>
}

/** Pick the right field for the active language: pick(lang, item.q, item.qFr, item.qEs). */
export const pick = (lang, en, fr, es) => lang === 'fr' ? fr : lang === 'es' ? (es ?? en) : en
