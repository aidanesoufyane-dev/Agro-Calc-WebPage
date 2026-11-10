import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
export { missingSpanish } from './lib/i18n'

export function render(url) {
  const context = {}
  const html = renderToString(<HelmetProvider context={context}><StaticRouter location={url}><App/></StaticRouter></HelmetProvider>)
  const { helmet } = context
  return { html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(tag => tag.toString()).join('\n') }
}
