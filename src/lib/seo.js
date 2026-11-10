import { SITE_URL, PLAY_STORE_URL, corePages, webTools, ES_ROUTES } from '../content/site.js'
import { blogPosts, blogPath } from '../content/blog.js'
import { faqs } from '../content/faqs.js'

const PREFIX = { en: '', fr: '/fr', es: '/es' }
const localized = (path, lang) => lang === 'en' ? path : (path === '/' ? PREFIX[lang] : PREFIX[lang] + path)
export const absoluteUrl = (path, lang) => SITE_URL + localized(path, lang)

// Every indexable English route; each one also exists under /fr, and under /es when listed in ES_ROUTES.
export const baseRoutes = () => [...Object.keys(corePages), ...blogPosts.map(blogPath)]
export const langsForRoute = base => ES_ROUTES.includes(base) ? ['en', 'fr', 'es'] : ['en', 'fr']
const pick = (lang, en, fr, es) => lang === 'fr' ? fr : lang === 'es' ? (es ?? en) : en

export function pageMeta(basePath, lang) {
  const fr = lang === 'fr'
  const core = corePages[basePath]
  if (lang === 'es' && !ES_ROUTES.includes(basePath)) return null
  if (core) return { title: pick(lang, core.title, core.titleFr, core.titleEs), description: pick(lang, core.description, core.descriptionFr, core.descriptionEs) }
  const post = blogPosts.find(p => blogPath(p) === basePath)
  if (post) return {
    post,
    title: fr ? `${post.titleFr} | Blog AgroCalc Pro` : `${post.title} | AgroCalc Pro Blog`,
    description: fr ? post.descriptionFr : post.description,
  }
  return null
}

const ORG_ID = SITE_URL + '/#organization'
const SITE_ID = SITE_URL + '/#website'
const organization = { '@type': 'Organization', '@id': ORG_ID, name: 'AgroCalc Pro', url: SITE_URL, logo: { '@type': 'ImageObject', url: SITE_URL + '/favicon-512x512.png', width: 512, height: 512 }, sameAs: [PLAY_STORE_URL] }
const website = lang => ({ '@type': 'WebSite', '@id': SITE_ID, name: 'AgroCalc Pro', url: SITE_URL, inLanguage: lang, publisher: { '@id': ORG_ID } })

const faqPage = (basePath, lang, url) => faqs[basePath] && {
  '@type': 'FAQPage', '@id': url + '#faq', inLanguage: lang,
  mainEntity: faqs[basePath].map(item => ({ '@type': 'Question', name: pick(lang, item.q, item.qFr, item.qEs), acceptedAnswer: { '@type': 'Answer', text: pick(lang, item.a, item.aFr, item.aEs) } })),
}

const breadcrumb = (items, lang) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absoluteUrl(path, lang) })),
})

export function pageSchema({ basePath, lang, title, description, post }) {
  const fr = lang === 'fr'
  const url = absoluteUrl(basePath, lang)
  const home = pick(lang, 'Home', 'Accueil', 'Inicio')
  const graph = [organization, website(lang)]
  const tool = webTools.find(t => t.path === basePath)
  if (basePath === '/') graph.push({
    '@type': 'SoftwareApplication', name: 'AgroCalc Pro', operatingSystem: 'Android', applicationCategory: 'BusinessApplication',
    url, description, installUrl: PLAY_STORE_URL, inLanguage: lang, publisher: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })
  else if (tool) graph.push({
    '@type': 'WebApplication', name: pick(lang, tool.en, tool.fr, tool.es), url, description, inLanguage: lang,
    applicationCategory: 'BusinessApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true,
    publisher: { '@id': ORG_ID }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }, breadcrumb([[home, '/'], [pick(lang, tool.en, tool.fr, tool.es), basePath]], lang))
  else if (post) graph.push({
    '@type': 'Article', headline: fr ? post.titleFr : post.title, description, url, mainEntityOfPage: url, inLanguage: lang,
    image: SITE_URL + '/og-image.png', about: { '@type': 'Thing', name: 'Fertigation' },
    author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
  }, breadcrumb([['AgroCalc Pro', '/'], [fr ? 'Notes du terrain' : 'Field Notes', '/blog'], [fr ? post.titleFr : post.title, basePath]], lang))
  else if (basePath === '/blog') graph.push({
    '@type': 'CollectionPage', name: title, url, inLanguage: lang,
    mainEntity: { '@type': 'ItemList', itemListElement: blogPosts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: pick(lang, p.title, p.titleFr, p.titleEs), url: absoluteUrl(blogPath(p), langsForRoute(blogPath(p)).includes(lang) ? lang : 'en') })) },
  })
  const faq = faqPage(basePath, lang, url)
  if (faq) graph.push(faq)
  return { '@context': 'https://schema.org', '@graph': graph }
}
