import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import SupportedFertilizersPage from './components/SupportedFertilizersPage'
import { BlogPage, NewArticlePage } from './components/BlogPages'
import { FertilizerCalculatorPage, IrrigationCalculatorPage, CropPlanningPage, FertilizerBlogPage, GreenhouseEcGuidePage, TankMixingGuidePage, TomatoFertigationGuidePage } from './components/SeoPages'
import PrivacyPage from './components/PrivacyPage'
import NotFoundPage from './components/NotFoundPage'
import { SITE_URL, corePages } from './content/site'
import { blogPosts, blogPath } from './content/blog'

export default function App() {
  const [lang, setLang] = useState('en')
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const post = blogPosts.find(p => blogPath(p) === pathname)
  const meta = corePages[pathname] || (post && {title:`${post.title} | AgroCalc Pro`,description:post.description})
  const isNotFound = !meta
  const title = meta?.title || 'Page Not Found | AgroCalc Pro'
  const description = meta?.description || 'The requested page could not be found.'
  const canonical = SITE_URL + pathname
  const schema = post ? {
    '@context':'https://schema.org', '@type':'Article', headline:post.title, description:post.description,
    url:canonical, mainEntityOfPage:canonical, image:`${SITE_URL}/og-image.png`, inLanguage:'en',
    publisher:{'@type':'Organization',name:'AgroCalc Pro',url:SITE_URL},
  } : pathname === '/blog' ? {
    '@context':'https://schema.org','@type':'CollectionPage',name:title,url:canonical,
    mainEntity:{'@type':'ItemList',itemListElement:blogPosts.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.title,url:SITE_URL+blogPath(p)}))},
  } : pathname === '/' ? {
    '@context':'https://schema.org','@type':'SoftwareApplication',name:'AgroCalc Pro',operatingSystem:'Android',applicationCategory:'BusinessApplication',url:SITE_URL,
    description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},
  } : null
  const breadcrumbs = post ? {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'AgroCalc Pro',item:SITE_URL},
    {'@type':'ListItem',position:2,name:'Field Notes',item:`${SITE_URL}/blog`},
    {'@type':'ListItem',position:3,name:post.title,item:canonical},
  ]} : null

  useEffect(() => { document.documentElement.lang = lang }, [lang])
  useEffect(() => { window.scrollTo({top:0,behavior:'instant'}) }, [pathname])
  const scrollToSection = id => document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  const showPage = page => navigate(page === 'privacy' ? '/privacy' : '/')
  const handleNavClick = (_, id) => {
    if (pathname !== '/') navigate(`/#${id}`)
    else scrollToSection(id)
  }
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => scrollToSection(location.hash.slice(1)), 150)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, location.hash])
  return <>
    <Helmet>
      <title>{title}</title><meta name="description" content={description}/>
      <meta name="robots" content={isNotFound?'noindex, follow':'index, follow'}/>
      {!isNotFound && <link rel="canonical" href={canonical}/>}
      <meta property="og:type" content={post?'article':'website'}/><meta property="og:url" content={canonical}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content={`${SITE_URL}/og-image.png`}/><meta property="og:site_name" content="AgroCalc Pro"/>
      <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={title}/><meta name="twitter:description" content={description}/><meta name="twitter:image" content={`${SITE_URL}/og-image.png`}/>
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}{breadcrumbs && <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>}
    </Helmet>
    <a className="ac-skip-link" href="#main-content">Skip to content</a>
    <Navbar lang={lang} setLang={setLang} handleNavClick={handleNavClick}/>
    <div id="main-content" tabIndex={-1}><Routes>
      <Route path="/" element={<LandingPage/>}/><Route path="/blog" element={<BlogPage/>}/>
      <Route path="/supported-fertilizers" element={<SupportedFertilizersPage/>}/><Route path="/privacy" element={<PrivacyPage showPage={showPage}/>}/>
      <Route path="/fertilizer-calculator" element={<FertilizerCalculatorPage/>}/><Route path="/irrigation-calculator" element={<IrrigationCalculatorPage/>}/><Route path="/crop-planning" element={<CropPlanningPage/>}/>
      <Route path="/blog/how-to-calculate-fertilizer" element={<FertilizerBlogPage/>}/><Route path="/blog/ec-in-greenhouse-crops" element={<GreenhouseEcGuidePage/>}/><Route path="/blog/how-to-mix-a-b-c-tanks" element={<TankMixingGuidePage/>}/><Route path="/blog/tomato-fertigation-guide" element={<TomatoFertigationGuidePage/>}/>
      {blogPosts.filter(p=>p.sections).map(p=><Route key={p.slug} path={blogPath(p)} element={<NewArticlePage slug={p.slug}/>}/>)}
      <Route path="*" element={<NotFoundPage showPage={showPage}/>}/>
    </Routes></div><Footer/>
  </>
}
