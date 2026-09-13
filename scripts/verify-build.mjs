import { readFile, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import path from 'node:path'
import { corePages, SITE_URL } from '../src/content/site.js'
import { blogPosts, blogPath } from '../src/content/blog.js'
const routes=[...Object.keys(corePages),...blogPosts.map(blogPath)]
const seen=new Set()
for(const route of routes){
 const html=await readFile(path.join('dist',route.slice(1),'index.html'),'utf8')
 assert.equal((html.match(/<title\b/g)||[]).length,1,`${route}: one title`)
 assert.equal((html.match(/name="description"/g)||[]).length,1,`${route}: one description`)
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${route}: one canonical`)
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one visible page heading`)
 assert.ok(html.includes(`href="${SITE_URL}${route}"`),`${route}: canonical`)
 assert.ok(!html.includes('REPLACE_WITH')&&!html.includes('<!--app-html-->'),`${route}: no placeholders`)
 const title=html.match(/<title[^>]*>(.*?)<\/title>/s)[1];assert.ok(!seen.has(title),'Unique titles');seen.add(title)
 for(const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs))JSON.parse(match[1])
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^" ]*"/g)){
  const target=match[1].replace(/\/$/,'')||'/'
  if(routes.includes(target))continue
  assert.ok((await stat(path.join('dist',target.slice(1)))).isFile(),`${route}: missing ${target}`)
 }
}
for(const post of blogPosts){assert.equal(post.related.length,3);for(const slug of post.related)assert.ok(blogPosts.some(p=>p.slug===slug)&&slug!==post.slug)}
const robots=await readFile('dist/robots.txt','utf8');assert.ok(!robots.includes('Disallow: /assets'))
const missing=await readFile('dist/404.html','utf8');assert.ok(missing.includes('noindex'))
assert.ok(!(await readFile('dist/sitemap.xml','utf8')).includes('/404'))
console.log(`Verified ${routes.length} prerendered pages, unique metadata, schema, local links, assets and related articles.`)
