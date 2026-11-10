import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { brotliCompressSync, gzipSync, constants } from 'node:zlib'
const root=path.resolve('dist')
const port=Number(process.env.PORT||4173)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.webp':'image/webp','.woff2':'font/woff2'}
// Compress text like Netlify does, so local Lighthouse runs reflect production transfer sizes.
const compressed=new Map()
// Fast brotli settings plus an in-memory cache keep local responses quick, as a CDN would.
const encode=(file,mtime,data,kind)=>{const key=kind+file+mtime;if(!compressed.has(key))compressed.set(key,kind==='br'?brotliCompressSync(data,{params:{[constants.BROTLI_PARAM_QUALITY]:5}}):gzipSync(data));return compressed.get(key)}
const compressible=/^(text|application\/(json|xml|manifest))/
createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
  let file=path.resolve(root,'.'+pathname)
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  let code=200
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');await stat(file)}catch{file=path.join(root,'404.html');code=404}
  const { mtimeMs }=await stat(file)
  let data=await readFile(file)
  const type=types[path.extname(file)]||'application/octet-stream'
  const headers={'Content-Type':type,'X-Content-Type-Options':'nosniff'}
  const accepts=String(req.headers['accept-encoding']||'')
  if(compressible.test(type)&&/\bbr\b/.test(accepts)){data=encode(file,mtimeMs,data,'br');headers['Content-Encoding']='br'}
  else if(compressible.test(type)&&/\bgzip\b/.test(accepts)){data=encode(file,mtimeMs,data,'gzip');headers['Content-Encoding']='gzip'}
  res.writeHead(code,headers)
  res.end(req.method==='HEAD'?undefined:data)
 }catch{res.writeHead(400);res.end('Bad request')}
}).listen(port,'127.0.0.1',()=>console.log(`Production preview: http://127.0.0.1:${port}`))
