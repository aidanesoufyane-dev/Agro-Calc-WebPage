import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve('dist')
const port=Number(process.env.PORT||4173)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'}
createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
  let file=path.resolve(root,'.'+pathname)
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  let code=200
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');await stat(file)}catch{file=path.join(root,'404.html');code=404}
  const data=await readFile(file)
  res.writeHead(code,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'})
  res.end(req.method==='HEAD'?undefined:data)
 }catch{res.writeHead(400);res.end('Bad request')}
}).listen(port,'127.0.0.1',()=>console.log(`Production preview: http://127.0.0.1:${port}`))
