import { readFile, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import path from 'node:path'
import { corePages, SITE_URL, webTools } from '../src/content/site.js'
import { blogPosts, blogPath } from '../src/content/blog.js'
import { faqs } from '../src/content/faqs.js'
import { baseRoutes, absoluteUrl, langsForRoute } from '../src/lib/seo.js'
import { calculateFertigation, emptyCalculatorInputs, fertilizerComposition, fertilizerFields } from '../src/lib/fertigationCalculator.js'
import { ppmFromDose, doseForTarget, convertEc, ppmToEc, dripIrrigation } from '../src/lib/tools.js'
import { exampleDiagnosis } from '../src/lib/plantDoctor.js'
import { validateDiagnosis } from '../netlify/functions/_plantDoctorSchema.mjs'
import { handler as plantDoctorHandler } from '../netlify/functions/plant-doctor.mjs'
const bases=baseRoutes()
assert.equal(new Set(bases).size,bases.length,'unique public routes');
const pages=bases.flatMap(base=>langsForRoute(base).map(lang=>({base,lang,route:new URL(absoluteUrl(base,lang)).pathname})))
const esc=text=>text.replace(/&/g,'&amp;').replace(/'/g,'&#x27;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
const fileFor=route=>path.join('dist',route.slice(1),'index.html')
const routes=pages.map(p=>p.route)
const seen=new Set()
for(const {base,lang,route} of pages){
 const html=await readFile(fileFor(route),'utf8')
 const others=['en','fr','es'].filter(l=>l!==lang)
 assert.ok(html.includes(`<html lang="${lang}">`),`${route}: html lang`)
 assert.equal((html.match(/<title\b/g)||[]).length,1,`${route}: one title`)
 assert.equal((html.match(/name="description"/g)||[]).length,1,`${route}: one description`)
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${route}: one canonical`)
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one visible page heading`)
 assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(base,lang)}"`),`${route}: canonical`)
 for(const alt of langsForRoute(base)) assert.ok(html.includes(`hrefLang="${alt}" href="${absoluteUrl(base,alt)}"`),`${route}: hreflang ${alt}`)
 assert.ok(html.includes(`hrefLang="x-default" href="${absoluteUrl(base,'en')}"`),`${route}: hreflang x-default`)
 for(const other of others) assert.ok(!html.includes(`class="${other}"`),`${route}: only ${lang} text is rendered (found ${other})`)
 assert.ok(!html.includes('REPLACE_WITH')&&!html.includes('<!--app-html-->'),`${route}: no placeholders`)
 assert.ok(!html.includes('noindex'),`${route}: indexable`)
 const title=html.match(/<title[^>]*>(.*?)<\/title>/s)[1];assert.ok(!seen.has(title),`${route}: unique title`);seen.add(title)
 const graphs=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]))
 assert.equal(graphs.length,1,`${route}: one JSON-LD graph`)
 const types=graphs[0]['@graph'].map(node=>node['@type'])
 assert.ok(types.includes('Organization')&&types.includes('WebSite'),`${route}: organization and website schema`)
 if(faqs[base]){
  assert.ok(types.includes('FAQPage'),`${route}: FAQ schema`)
  for(const item of faqs[base]) assert.ok(html.includes(esc({fr:item.qFr,es:item.qEs}[lang]||item.q)),`${route}: visible FAQ "${item.q}"`)
 }
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^" ]*"/g)){
  const target=match[1].replace(/\/$/,'')||'/'
  if(routes.includes(target))continue
  assert.ok((await stat(path.join('dist',target.slice(1)))).isFile(),`${route}: missing ${target}`)
 }
 for(const match of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)){
  const target=match[1].replace(/\/$/,'')||'/'
  // Links stay in the page language whenever the target exists in that language (the switcher excepted).
  if(lang!=='en'&&!match[0].includes('hrefLang=')&&routes.includes(target)&&!/^\/(fr|es)(\/|$)/.test(target)) assert.ok(!langsForRoute(target).includes(lang),`${route}: ${lang} page links stay in ${lang} (${target})`)
 }
}
for(const post of blogPosts){assert.equal(post.related.length,3);for(const slug of post.related)assert.ok(blogPosts.some(p=>p.slug===slug)&&slug!==post.slug)}
const robots=await readFile('dist/robots.txt','utf8');assert.ok(!robots.includes('Disallow: /assets'))
assert.ok(!(await readFile('dist/sitemap.xml','utf8')).includes('/404'))

assert.equal(blogPosts.length,17,'17 blog posts');
for(const post of blogPosts.slice(7)){
 assert.ok(post.sections.length>=3 && post.sections.length<=4,post.slug+': section count');
 for(const section of post.sections) assert.ok(section.en.length>=2 && section.fr.length>=2,post.slug+': bilingual paragraphs');
 for(const source of post.sources) assert.ok(!source.url.startsWith(SITE_URL),post.slug+': external source');
 const html=await readFile(fileFor(blogPath(post)),'utf8');
 assert.ok(html.includes(post.title+' | AgroCalc Pro Blog'),post.slug+': title');
 assert.ok(html.includes('BreadcrumbList') && html.includes('Article'),post.slug+': schema');
 assert.ok(html.includes('ac-post-cta'),post.slug+': app CTA');
 assert.ok(html.includes('ac-post-tool'),post.slug+': in-article tool link');
 const fr=await readFile(fileFor('/fr'+blogPath(post)),'utf8');
 assert.ok(fr.includes(esc(post.titleFr))&&fr.includes('| Blog AgroCalc Pro'),post.slug+': French title');
}
const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,pages.length,'sitemap route count');
assert.ok(!sitemap.includes('<lastmod>')&&!sitemap.includes('<priority>')&&!sitemap.includes('<changefreq>'),'no invented dates or ignored hints');
assert.ok(!sitemap.includes('#')&&!sitemap.includes('localhost'),'canonical sitemap URLs only');
for(const {base,lang} of pages){
 assert.ok(sitemap.includes('<loc>'+absoluteUrl(base,lang)+'</loc>'),base+' '+lang+': exact sitemap URL');
 assert.ok(sitemap.includes(`hreflang="fr" href="${absoluteUrl(base,'fr')}"`),base+': sitemap alternate');
}
assert.ok(robots.includes('User-agent: *') && robots.includes('Allow: /') && robots.includes('Sitemap: '+SITE_URL+'/sitemap.xml'),'robots sitemap discovery');
const missingHtml=await readFile('dist/404.html','utf8');
assert.ok(missingHtml.includes('noindex'),'404 noindex');
assert.equal((missingHtml.match(/<title\b/g)||[]).length,1,'404 single title');
assert.equal((missingHtml.match(/name="description"/g)||[]).length,1,'404 single description');
assert.equal((missingHtml.match(/name="robots"/g)||[]).length,1,'404 single robots directive');
assert.ok(!missingHtml.includes('rel="canonical"'),'404 has no canonical');
for(const route of ['/','/fertilizer-calculator','/blog']) assert.ok(missingHtml.includes('href="'+route+'"'),'404 recovery link '+route);
for(const lang of ['en','fr','es']){
 const blogHub=await readFile(fileFor(new URL(absoluteUrl('/blog',lang)).pathname),'utf8');
 for(const post of blogPosts){ const target=langsForRoute(blogPath(post)).includes(lang)?lang:'en'; assert.ok(blogHub.includes('href="'+new URL(absoluteUrl(blogPath(post),target)).pathname+'"'),post.slug+': crawlable blog hub link '+lang) }
}
const home=await readFile('dist/index.html','utf8');
assert.ok(/<h1[^>]*><span class="ac-h1-kicker">.*?NPK/.test(home),'home H1 carries the NPK keyword');
for(const tool of webTools) assert.ok(home.includes('href="'+tool.path+'"'),tool.path+': linked from home');
const representative=await readFile('dist/blog/tomato-fertigation-guide/index.html','utf8');
assert.ok(representative.includes('<h1') && (representative.match(/<p\b/g)||[]).length>=3,'tomato article prerendered content');
const calculator=await readFile('dist/fertilizer-calculator/index.html','utf8');
assert.ok(calculator.includes('How the NPK fertigation calculator works') && calculator.includes('Worked example') && calculator.includes('ac-composition-table') && calculator.includes('href="/blog/how-to-calculate-fertilizer"'),'calculator crawlable explanation, example, composition and guide');
assert.ok(calculator.includes('WebApplication') && calculator.includes('Calculate formulation'),'calculator app schema and interactive form');
const formulation=calculateFertigation({mkp:12,nk:24,sp:10,clk:0,nca:22,ammon:5,uree:0,sulamo:4,an:3,aph:4,map:6,asul:0,nmgo:3,smgo:8,waterEc:.55,area:2,irrigationVolume:100,stockVolume:1000});
assert.deepEqual(formulation.ions,{no3:6.39,nh4:1.75,h2po4:1.81,k:4.41,so4:2.4,ca:2.68,h:.88,cl:0,mg:.88},'Flutter formula parity fixture');
assert.equal(formulation.solution.estimatedEc,1.74,'estimated EC fixture');
assert.deepEqual(formulation.distribution.tanks.map(t=>t.total),[49,49,3],'A/B/C tank distribution fixture');
// Per-tank volumes balance A and B by concentration; equal volumes must reproduce the app's result.
const demoInputs={...emptyCalculatorInputs,mkp:12,nk:24,sp:10,clk:0,nca:22,ammon:5,uree:0,sulamo:4,an:3,aph:4,map:6,asul:0,nmgo:3,smgo:8,waterEc:.55,area:2,irrigationVolume:100}
const equalTanks=calculateFertigation({...demoInputs,tankVolumeA:1000,tankVolumeB:1000,tankVolumeC:1000}).distribution
assert.deepEqual(equalTanks.tanks.map(t=>t.total),[49,49,3],'equal per-tank volumes match the shared-volume result')
const unequal=calculateFertigation({...demoInputs,tankVolumeA:500,tankVolumeB:1000,tankVolumeC:200})
assert.ok(unequal.distribution.balanced&&Math.abs(unequal.distribution.tanks[0].concentration-unequal.distribution.tanks[1].concentration)<.05,'A 500 L / B 1000 L reach the same g/L')
assert.equal(unequal.distribution.tanks[0].total+unequal.distribution.tanks[1].total,98,'balancing moves fertilizer without losing any')
assert.deepEqual(unequal.distribution.injection,{A:2.5,B:5,C:1},'injector draw proportional to tank volume')
assert.equal(formulation.solution.stockConcentration,101,'stock concentration uses the stock-solution volume (app formula)')
const bigStock=calculateFertigation({...demoInputs,stockVolume:1500})
assert.equal(bigStock.solution.stockConcentration,67.33,'stock concentration follows the solution mère volume')
assert.deepEqual(bigStock.distribution.tanks.map(t=>[t.volume,t.concentration]),[[1000,49],[1000,49],[1000,3]],'tanks default to 1000 L whatever the solution mère volume')
const tooSmallB=calculateFertigation({...demoInputs,tankVolumeA:1000,tankVolumeB:500,tankVolumeC:500}).distribution
assert.equal(tooSmallB.warning,'outside-tolerance','unreachable balance is flagged, not hidden')
assert.ok(calculator.replace(/<!-- -->/g,'').includes('1.74 mS/cm'),'published worked example matches the engine');
// The displayed composition table must describe exactly what the engine computes.
for(const field of fertilizerFields){
 const c=fertilizerComposition[field.key]
 const r=calculateFertigation({...emptyCalculatorInputs,[field.key]:100,irrigationVolume:1,area:1,stockVolume:1})
 const totals=Object.fromEntries(r.nutrients.map(item=>[item.key,item.total]))
 for(const [key,label] of [['n','N'],['p2o5','P₂O₅'],['k2o','K₂O'],['cao','CaO'],['mgo','MgO']]) assert.equal(totals[label],c[key]??0,`${field.key}: ${label} composition`)
}
// Tool formulas against hand-checked values.
assert.deepEqual(ppmFromDose({grams:100,liters:100,n:20,p2o5:20,k2o:20,ratio:1}),{product:1000,n:200,p:87.3,k:166,p2o5:200,k2o:200},'1 g/L of 20-20-20');
assert.equal(ppmFromDose({grams:100,liters:100,n:20,p2o5:20,k2o:20,ratio:100}).n,2,'1:100 injector dilution');
assert.equal(doseForTarget({targetPpm:150,nutrient:'n',liters:1000,n:20,p2o5:20,k2o:20,ratio:1}).grams,750,'150 ppm N from 20-20-20');
assert.deepEqual(convertEc('1.5','mScm'),{mScm:1.5,uScm:1500,cf:15,ppm:{500:750,640:960,700:1050}},'EC conversions');
assert.equal(convertEc('1500','uScm').mScm,1.5,'µS/cm input');
assert.equal(ppmToEc(1000,500),2,'ppm back to EC');
const drip=dripIrrigation({flow:1.6,emitterSpacing:.3,lateralSpacing:1.5,minutes:60,area:1,targetMm:4})
assert.equal(drip.emittersPerHa,22222,'emitters per hectare');assert.equal(drip.rate,3.56,'application rate');assert.equal(drip.volumePerHa,35.56,'m³ per hectare');
assert.ok(Math.abs(drip.minutesForTarget-67.5)<=.5,'run time for target depth');
assert.ok(!sitemap.includes('/water-analysis')&&!sitemap.includes('/fertilizer-recipe-optimizer'),'retired tools removed from sitemap');
assert.ok(validateDiagnosis(exampleDiagnosis),'example diagnosis matches server contract');
const emptyDiagnosisRequest=await plantDoctorHandler({httpMethod:'POST',body:'{}',headers:{}});assert.equal(emptyDiagnosisRequest.statusCode,400,'Plant Doctor rejects empty request');
const invalidImageRequest=await plantDoctorHandler({httpMethod:'POST',body:JSON.stringify({message:'help',images:['data:text/plain;base64,QQ==']}),headers:{}});assert.equal(invalidImageRequest.statusCode,400,'Plant Doctor rejects invalid images');
const netlify=await readFile('netlify.toml','utf8');
assert.ok(netlify.includes('[build.processing.html]') && netlify.includes('pretty_urls = false'),'Netlify must serve slashless canonical routes without Pretty URL redirects');
assert.ok(netlify.includes('from = "/api/plant-doctor"')&&netlify.includes('to = "/.netlify/functions/plant-doctor"'),'Plant Doctor API rewrite');
const redirects=await readFile('dist/_redirects','utf8');
for(const route of routes.filter(route=>route!=='/')) assert.ok(redirects.includes(route+' '+route+'/index.html 200'),route+': prerender rewrite');
console.log(`Verified ${pages.length} prerendered pages (EN ${bases.length}, FR ${bases.length}, ES ${pages.filter(p=>p.lang==='es').length}): single-language markup, hreflang, metadata, schema, FAQs, crawlable links, tool formulas, robots, sitemap and 404.`);
