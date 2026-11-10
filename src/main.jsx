import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { langFromPath } from './lib/i18n'
import './fonts.css'
import './App.css'
import './components/Redesign.css'
import './components/Site.css'

const container = document.getElementById('root')
const app = <React.StrictMode><HelmetProvider><BrowserRouter><App/></BrowserRouter></HelmetProvider></React.StrictMode>
// The shared 404 shell is prerendered in English, so a French miss renders fresh instead of hydrating.
const prerenderedForThisUrl = document.documentElement.lang === langFromPath(window.location.pathname)
if (container.hasChildNodes() && container.querySelector('nav') && prerenderedForThisUrl) hydrateRoot(container, app)
else createRoot(container).render(app)
