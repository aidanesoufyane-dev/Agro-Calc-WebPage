import { useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import SupportedFertilizersPage from './components/SupportedFertilizersPage'
import { BlogPage, NewArticlePage } from './components/BlogPages'
import { CropPlanningPage, FertilizerBlogPage, GreenhouseEcGuidePage, TankMixingGuidePage, TomatoFertigationGuidePage } from './components/SeoPages'
import WebCalculatorPage from './components/WebCalculatorPage'
import { FertilizerPpmPage, EcPpmPage, IrrigationCalculatorPage } from './components/ToolPages'
import PrivacyPage from './components/PrivacyPage'
import FeedbackPage from './components/FeedbackPage'
import NotFoundPage from './components/NotFoundPage'
import { SITE_URL } from './content/site'
import { blogPosts, blogPath } from './content/blog'
import { LangContext, langFromPath, stripLang, localizePath, langsFor, pick } from './lib/i18n'
import { pageMeta, pageSchema, absoluteUrl } from './lib/seo'

const LOCALE = { en: 'en_US', fr: 'fr_FR', es: 'es_ES' }

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const lang = langFromPath(pathname)
  const basePath = stripLang(pathname)
  const meta = pageMeta(basePath, lang)
  const isNotFound = !meta
  const title = meta?.title || pick(lang, 'Page Not Found | AgroCalc Pro', 'Page introuvable | AgroCalc Pro', 'Página no encontrada | AgroCalc Pro')
  const description = meta?.description || pick(lang, 'The requested page could not be found.', 'La page demandée est introuvable.', 'La página solicitada no existe.')
  const canonical = absoluteUrl(basePath, lang)
  const searchVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
  const schema = meta && pageSchema({ basePath, lang, title, description, post: meta.post })
  const ogImage = `${SITE_URL}/og-image.png`

  useEffect(() => { document.documentElement.lang = lang }, [lang])
  // Reset scroll on navigation only; on first load the visitor may already be scrolling before hydration.
  const firstRender = useRef(true)
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return } window.scrollTo({top:0,behavior:'instant'}) }, [pathname])
  const scrollToSection = id => document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  const showPage = page => navigate(localizePath(page === 'privacy' ? '/privacy' : '/', lang))
  const handleNavClick = (_, id) => {
    if (basePath !== '/') navigate(localizePath(`/#${id}`, lang))
    else scrollToSection(id)
  }
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => scrollToSection(location.hash.slice(1)), 150)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, location.hash])
  return <LangContext.Provider value={lang}>
    <Helmet>
      <title>{title}</title><meta name="description" content={description}/>
      {searchVerification && <meta name="google-site-verification" content={searchVerification}/>}
      <meta name="robots" content={isNotFound?'noindex, follow':'index, follow, max-image-preview:large, max-snippet:-1'}/>
      {!isNotFound && <link rel="canonical" href={canonical}/>}
      {!isNotFound && langsFor(basePath).map(alt => <link key={alt} rel="alternate" hrefLang={alt} href={absoluteUrl(basePath, alt)}/>)}
      {!isNotFound && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(basePath, 'en')}/>}
      <meta property="og:type" content={meta?.post?'article':'website'}/><meta property="og:url" content={canonical}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content={ogImage}/><meta property="og:image:alt" content="AgroCalc Pro NPK fertigation calculator"/><meta property="og:site_name" content="AgroCalc Pro"/>
      <meta property="og:locale" content={LOCALE[lang]}/>{langsFor(basePath).filter(alt => alt !== lang).map(alt => <meta key={alt} property="og:locale:alternate" content={LOCALE[alt]}/>)}
      <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={title}/><meta name="twitter:description" content={description}/><meta name="twitter:image" content={ogImage}/>
      {basePath === '/' && <link rel="preload" as="image" href={`/screens/${lang}/home.webp`} fetchPriority="high"/>}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
    <a className="ac-skip-link" href="#main-content">{pick(lang, 'Skip to content', 'Aller au contenu', 'Ir al contenido')}</a>
    <Navbar lang={lang} basePath={basePath} handleNavClick={handleNavClick}/>
    <div id="main-content" tabIndex={-1}><Routes location={{ ...location, pathname: basePath }}>
      <Route path="/" element={<LandingPage/>}/><Route path="/blog" element={<BlogPage/>}/>
      <Route path="/supported-fertilizers" element={<SupportedFertilizersPage/>}/><Route path="/privacy" element={<PrivacyPage showPage={showPage}/>}/><Route path="/feedback" element={<FeedbackPage/>}/>
      <Route path="/fertilizer-calculator" element={<WebCalculatorPage/>}/><Route path="/fertilizer-ppm-calculator" element={<FertilizerPpmPage/>}/><Route path="/ec-ppm-converter" element={<EcPpmPage/>}/>
      <Route path="/irrigation-calculator" element={<IrrigationCalculatorPage/>}/><Route path="/crop-planning" element={<CropPlanningPage/>}/>
      <Route path="/blog/how-to-calculate-fertilizer" element={<FertilizerBlogPage/>}/><Route path="/blog/ec-in-greenhouse-crops" element={<GreenhouseEcGuidePage/>}/><Route path="/blog/how-to-mix-a-b-c-tanks" element={<TankMixingGuidePage/>}/><Route path="/blog/tomato-fertigation-guide" element={<TomatoFertigationGuidePage/>}/>
      {blogPosts.filter(p=>p.sections).map(p=><Route key={p.slug} path={blogPath(p)} element={<NewArticlePage slug={p.slug}/>}/>)}
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes></div><Footer/>
  </LangContext.Provider>
}
