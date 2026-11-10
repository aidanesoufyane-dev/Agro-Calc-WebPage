import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link, T, localizePath, hasLang, pick } from '../lib/i18n'
import Icon from './Icon'
import { Arrow } from './LandingPage'

export default function Navbar({ lang, basePath, handleNavClick }) {
  const [open, setOpen] = useState(false)
  const { hash } = useLocation()
  function go(e, id) { e.preventDefault(); setOpen(false); handleNavClick('landing', id) }
  const home = localizePath('/', lang)
  const current = path => basePath === path ? 'page' : undefined

  return <nav className="ac-nav" aria-label={pick(lang, 'Main navigation', 'Navigation principale', 'Navegación principal')}><div className="ac-nav-inner">
    <Link to="/" className="ac-brand" onClick={() => { setOpen(false); if (basePath === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }}><img src="/logo-96.webp" alt="" width="36" height="36"/><span>AgroCalc<span className="ac-brand-pro">Pro</span></span></Link>
    <button className="ac-menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="ac-nav-links" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={24}/></button>
    <div id="ac-nav-links" className={`ac-nav-links ${open ? 'is-open' : ''}`}>
      <a href={`${home}#features`} onClick={e => go(e, 'features')}><T en="The app" fr="L’application" es="La app"/></a>
      <a href={`${home}#tools`} onClick={e => go(e, 'tools')}><T en="Free tools" fr="Outils gratuits" es="Herramientas gratuitas"/></a>
      <Link to="/fertilizer-calculator" aria-current={current('/fertilizer-calculator')} onClick={() => setOpen(false)}><T en="NPK Calculator" fr="Calculateur NPK" es="Calculadora NPK"/></Link>
      <Link to="/blog" aria-current={basePath.startsWith('/blog') ? 'page' : undefined} onClick={() => setOpen(false)}><T en="Blog" fr="Blog" es="Blog"/></Link>
      <Link to="/feedback" aria-current={current('/feedback')} onClick={() => setOpen(false)}><T en="Feedback" fr="Avis" es="Opiniones"/></Link>
      {/* Real links to the alternate-language URL, so crawlers can follow them too. */}
      <div className="ac-languages" aria-label={pick(lang, 'Language', 'Langue', 'Idioma')}>
        <RouterLink to={basePath + hash} hrefLang="en" lang="en" aria-current={lang === 'en' ? 'true' : undefined} onClick={() => setOpen(false)}>EN</RouterLink><span>/</span>
        <RouterLink to={localizePath(basePath, 'fr') + hash} hrefLang="fr" lang="fr" aria-current={lang === 'fr' ? 'true' : undefined} onClick={() => setOpen(false)}>FR</RouterLink><span>/</span>
        <RouterLink to={hasLang(basePath, 'es') ? localizePath(basePath, 'es') + hash : '/es'} hrefLang="es" lang="es" aria-current={lang === 'es' ? 'true' : undefined} onClick={() => setOpen(false)}>ES</RouterLink>
      </div>
      <a className="ac-nav-download" href={`${home}#download`} onClick={e => go(e, 'download')}><T en="Get the app" fr="Télécharger" es="Descargar"/><Arrow/></a>
    </div>
  </div></nav>
}
