import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './App.css'
import './components/Redesign.css'

const container = document.getElementById('root')
const app = <React.StrictMode><HelmetProvider><BrowserRouter><App/></BrowserRouter></HelmetProvider></React.StrictMode>
if (container.hasChildNodes() && container.querySelector('nav')) hydrateRoot(container, app)
else createRoot(container).render(app)
