import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { corePages, SITE_URL } from '../src/content/site.js'
import { blogPosts, blogPath } from '../src/content/blog.js'

const root = process.cwd()
const temp = path.resolve(root, '.prerender')
if (path.dirname(temp) !== root) throw new Error('Unsafe temporary build directory')
await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: temp, emptyOutDir: true }, ssr: { noExternal: ['gsap', 'react-helmet-async'] } })
try {
  const { render } = await import(pathToFileURL(path.join(temp, 'entry-server.js')).href)
  const template = await readFile('dist/index.html', 'utf8')
  const routes = [...Object.keys(corePages), ...blogPosts.map(blogPath)]
  for (const route of [...routes, '/404']) {
    const {html, head} = render(route)
    const output = route === '/404' ? 'dist/404.html' : path.join('dist', route.slice(1), 'index.html')
    await mkdir(path.dirname(output), { recursive:true })
    await writeFile(output, template.replace('<!--app-head-->',head).replace('<!--app-html-->',html))
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route=>`  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}\n</urlset>\n`
  await writeFile('dist/sitemap.xml',sitemap)
  await writeFile('dist/_redirects', routes.filter(route=>route!=='/').map(route=>`${route} ${route}/index.html 200`).join('\n')+'\n/* /404.html 404\n')
  console.log(`Prerendered ${routes.length} pages plus a noindex 404 page.`)
} finally {
  await rm(temp, { recursive:true, force:true })
}
