import { readFile, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import path from 'node:path'
import { corePages, SITE_URL } from '../src/content/site.js'
import { blogPosts, blogPath } from '../src/content/blog.js'
const routes=[...Object.keys(corePages),...blogPosts.map(blogPath)]
assert.equal(new Set(routes).size,routes.length,'unique public routes');
const seen=new Set()
for(const route of routes){
 const html=await readFile(path.join('dist',route.slice(1),'index.html'),'utf8')
 assert.equal((html.match(/<title\b/g)||[]).length,1,`${route}: one title`)
 assert.equal((html.match(/name="description"/g)||[]).length,1,`${route}: one description`)
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${route}: one canonical`)
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one visible page heading`)
 assert.ok(html.includes(`href="${SITE_URL}${route}"`),`${route}: canonical`)
 assert.ok(!html.includes('REPLACE_WITH')&&!html.includes('<!--app-html-->'),`${route}: no placeholders`)
 assert.ok(!html.includes('noindex'),`${route}: indexable`)
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

assert.equal(blogPosts.length,17,'17 blog posts');
for(const post of blogPosts.slice(7)){
 assert.ok(post.sections.length>=3 && post.sections.length<=4,post.slug+': section count');
 for(const section of post.sections) assert.ok(section.en.length>=2 && section.fr.length>=2,post.slug+': bilingual paragraphs');
 for(const source of post.sources) assert.ok(!source.url.startsWith(SITE_URL),post.slug+': external source');
 const html=await readFile(path.join('dist','blog',post.slug,'index.html'),'utf8');
 assert.ok(html.includes(post.title+' | AgroCalc Pro Blog'),post.slug+': title');
 assert.ok(html.includes('BreadcrumbList') && html.includes('Article'),post.slug+': schema');
 assert.ok(html.includes('ac-post-cta'),post.slug+': app CTA');
}
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const post of blogPosts) assert.ok(sitemap.includes(SITE_URL+blogPath(post)),post.slug+': sitemap');
assert.equal((sitemap.match(/<loc>/g)||[]).length,routes.length,'sitemap route count');
assert.ok(!sitemap.includes('<lastmod>')&&!sitemap.includes('<priority>')&&!sitemap.includes('<changefreq>'),'no invented dates or ignored hints');
assert.ok(!sitemap.includes('#')&&!sitemap.includes('localhost'),'canonical sitemap URLs only');
for(const route of routes) assert.ok(sitemap.includes('<loc>'+SITE_URL+route+'</loc>'),route+': exact sitemap URL');
assert.ok(robots.includes('User-agent: *') && robots.includes('Allow: /') && robots.includes('Sitemap: '+SITE_URL+'/sitemap.xml'),'robots sitemap discovery');
const missingHtml=await readFile('dist/404.html','utf8');
assert.equal((missingHtml.match(/<title\b/g)||[]).length,1,'404 single title');
assert.equal((missingHtml.match(/name="description"/g)||[]).length,1,'404 single description');
assert.equal((missingHtml.match(/name="robots"/g)||[]).length,1,'404 single robots directive');
assert.ok(!missingHtml.includes('rel="canonical"'),'404 has no canonical');
for(const route of ['/','/fertilizer-calculator','/blog']) assert.ok(missingHtml.includes('href="'+route+'"'),'404 recovery link '+route);
const blogHub=await readFile('dist/blog/index.html','utf8');
for(const post of blogPosts) assert.ok(blogHub.includes('href="'+blogPath(post)+'"'),post.slug+': crawlable blog hub link');
const representative=await readFile('dist/blog/tomato-fertigation-guide/index.html','utf8');
assert.ok(representative.includes('<h1') && (representative.match(/<p\b/g)||[]).length>=3,'tomato article prerendered content');
const calculator=await readFile('dist/fertilizer-calculator/index.html','utf8');
assert.ok(calculator.includes('How the Android calculator works') && calculator.includes('href="/blog/how-to-calculate-fertilizer"'),'calculator crawlable explanation and guide');
const netlify=await readFile('netlify.toml','utf8');
assert.ok(netlify.includes('[build.processing.html]') && netlify.includes('pretty_urls = false'),'Netlify must serve slashless canonical routes without Pretty URL redirects');
const redirects=await readFile('dist/_redirects','utf8');
for(const route of routes.filter(route=>route!=='/')) assert.ok(redirects.includes(route+' '+route+'/index.html 200'),route+': prerender rewrite');
console.log('Verified '+routes.length+' prerendered pages, metadata, schema, crawlable links, robots, sitemap and 404.');
