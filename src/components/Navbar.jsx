import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { T, Arrow } from './LandingPage'
export default function Navbar({ lang, setLang, handleNavClick }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  function go(e, id) { e.preventDefault(); setOpen(false); handleNavClick('landing', id) }
  return <nav className="ac-nav" aria-label="Main navigation"><div className="ac-nav-inner"><Link to="/" className="ac-brand" onClick={() => { setOpen(false); if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }}><img src="/logo.png" alt="" width="36" height="36"/><span>AgroCalc<span className="ac-brand-pro">PRO</span></span></Link><button className="ac-menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="ac-nav-links" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button><div id="ac-nav-links" className={`ac-nav-links ${open ? 'is-open' : ''}`}><a href="/#features" onClick={e => go(e, 'features')}><T en="The app" fr="L’application"/></a><a href="/#how-it-works" onClick={e => go(e, 'how-it-works')}><T en="How it works" fr="Fonctionnement"/></a><Link to="/blog" aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined} onClick={() => setOpen(false)}><T en="Blog" fr="Blog"/></Link><div className="ac-languages" aria-label="Language"><button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button><span>/</span><button aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>FR</button></div><a className="ac-nav-download" href="/#download" onClick={e => go(e, 'download')}><T en="Get the app" fr="Télécharger"/><Arrow/></a></div></div></nav>
}
