import { useEffect, useMemo, useRef, useState } from 'react'
import { T } from '../lib/i18n'
import { compressPlantImage, exampleDiagnosis, getPlantDoctorClientId, loadConversations, newConversation, PLANT_DOCTOR_LIMITS, saveConversations } from '../lib/plantDoctor'

const starters=[
 ['Diagnose from a photo','Upload a plant photo and tell me when the symptoms started.'],
 ['Leaves turning yellow','My plant leaves are turning yellow. Help me investigate the cause.'],
 ['Strange spots','Brown or dark spots are appearing on the leaves.'],
 ['Pest damage','Something appears to be feeding on my plant.'],
 ['Watering problem','My plant looks stressed and I suspect an irrigation problem.'],
 ['Nutrient problem','Could these symptoms be related to nutrition, pH or EC?'],
]
const confidence={low:'Low confidence',moderate:'Moderate confidence',high:'High confidence'}

function DiagnosisCard({data}){
 return <article className="pd-diagnosis">
  <header><div><span>{data.plant||'Plant'}{data.scientificName&&<em>{data.scientificName}</em>}</span><h3>{data.primaryDiagnosis?.name||'Plant health assessment'}</h3></div><span className={'pd-confidence '+(data.primaryDiagnosis?.confidence||'low')}>{confidence[data.primaryDiagnosis?.confidence]||'Uncertain'}</span></header>
  <p className="pd-summary">{data.summary}</p>
  <div className="pd-diagnosis-meta"><span>{data.primaryDiagnosis?.category}</span><span>Severity: {data.severity}</span>{data.affectedArea&&<span>{data.affectedArea}</span>}</div>
  <section><h4>What I can observe</h4><ul>{data.observations?.map((item,index)=><li key={index}>{item}</li>)}</ul></section>
  <section><h4>Why this is possible</h4><p>{data.primaryDiagnosis?.reasoning}</p></section>
  {data.differentialDiagnoses?.length>0&&<section><h4>Other possibilities</h4><div className="pd-differentials">{data.differentialDiagnoses.map((item,index)=><div key={index}><strong>{item.name}</strong><small>{confidence[item.confidence]||item.confidence}</small><p>{item.reasoning}</p></div>)}</div></section>}
  {data.questions?.length>0&&<section><h4>What to check next</h4><ul>{data.questions.map((item,index)=><li key={index}>{item}</li>)}</ul></section>}
  {data.recommendedActions?.length>0&&<section><h4>Recommended next steps</h4><ol>{data.recommendedActions.map((item,index)=><li key={index}>{item}</li>)}</ol></section>}
  {data.prevention?.length>0&&<section><h4>Prevention</h4><ul>{data.prevention.map((item,index)=><li key={index}>{item}</li>)}</ul></section>}
  <footer><strong>Monitor</strong><p>{data.monitoring}</p>{data.needsProfessionalConfirmation&&<p className="pd-confirm">Professional or laboratory confirmation is recommended.</p>}</footer>
 </article>
}

function Message({message}){
 return <div className={'pd-message '+message.role}>
  <div className="pd-avatar">{message.role==='assistant'?'AI':'You'}</div>
  <div className="pd-message-body">{message.images?.length>0&&<div className="pd-message-images">{message.images.map((src,index)=><img key={index} src={src} alt={'Uploaded plant '+(index+1)}/>)}</div>}{message.text&&<p>{message.text}</p>}{message.diagnosis&&<DiagnosisCard data={message.diagnosis}/>}</div>
 </div>
}

export default function PlantDoctorPage(){
 const [conversations,setConversations]=useState([]),[activeId,setActiveId]=useState(''),[draft,setDraft]=useState(''),[images,setImages]=useState([]),[search,setSearch]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[sidebar,setSidebar]=useState(false)
 const abortRef=useRef(null),fileRef=useRef(null),endRef=useRef(null)
 useEffect(()=>{const saved=loadConversations(),initial=saved[0]||newConversation();setConversations(saved.length?saved:[initial]);setActiveId(initial.id)},[])
 useEffect(()=>{if(conversations.length)saveConversations(conversations)},[conversations])
 useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[conversations,busy])
 const active=conversations.find(chat=>chat.id===activeId)||conversations[0]
 const filtered=useMemo(()=>conversations.filter(chat=>chat.title.toLowerCase().includes(search.toLowerCase())),[conversations,search])
 const patchActive=fn=>setConversations(items=>items.map(chat=>chat.id===activeId?fn(chat):chat))
 const create=()=>{const chat=newConversation();setConversations(items=>[chat,...items]);setActiveId(chat.id);setDraft('');setImages([]);setError('');setSidebar(false)}
 const remove=id=>{setConversations(items=>{const next=items.filter(chat=>chat.id!==id);const replacement=next[0]||newConversation();setActiveId(replacement.id);return next.length?next:[replacement]})}
 const chooseFiles=async event=>{
  setError('');const files=[...event.target.files]
  if(images.length+files.length>PLANT_DOCTOR_LIMITS.maxImages){setError('Upload no more than three images.');return}
  try{const compressed=[];for(const file of files)compressed.push(await compressPlantImage(file));setImages(current=>[...current,...compressed])}
  catch(problem){setError(problem.message==='too_large'?'Each image must be smaller than 4 MB.':'Use a JPG, PNG or WEBP image.')}
  event.target.value=''
 }
 const send=async override=>{
  const text=(override??draft).trim();if((!text&&!images.length)||busy||!active)return
  const user={id:String(Date.now()),role:'user',text,images:[...images]},history=active.messages.filter(item=>item.text).slice(-8).map(item=>({role:item.role,text:item.text}))
  patchActive(chat=>({...chat,title:chat.messages.length?chat.title:(text||'Plant photo diagnosis').slice(0,55),updatedAt:new Date().toISOString(),messages:[...chat.messages,user]}))
  setDraft('');setImages([]);setError('');setBusy(true);abortRef.current=new AbortController()
  try{
   const response=await fetch('/api/plant-doctor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,images:user.images,history,clientId:getPlantDoctorClientId(),conversationId:active.id,title:active.title}),signal:abortRef.current.signal})
   const data=await response.json().catch(()=>({}))
   if(!response.ok)throw new Error(data.error||'The diagnosis service is unavailable.')
   patchActive(chat=>({...chat,updatedAt:new Date().toISOString(),messages:[...chat.messages,{id:String(Date.now()+1),role:'assistant',text:data.diagnosis.summary,diagnosis:data.diagnosis,images:[]}]}))
  }catch(problem){if(problem.name!=='AbortError')setError(problem.message||'Diagnosis failed. Please try again.')}
  finally{setBusy(false);abortRef.current=null}
 }
 const showExample=()=>{
  const chat=newConversation();chat.title='Example: tomato leaf spots';chat.messages=[{id:'example-user',role:'user',text:'These spots started on the lower tomato leaves three days ago.',images:[]},{id:'example-ai',role:'assistant',text:exampleDiagnosis.summary,diagnosis:exampleDiagnosis,images:[]}];setConversations(items=>[chat,...items]);setActiveId(chat.id);setSidebar(false)
 }
 return <main className="pd-page">
  <button className="pd-mobile-menu" onClick={()=>setSidebar(true)} aria-label="Open diagnosis history">☰</button>
  <aside className={'pd-sidebar '+(sidebar?'is-open':'')}>
   <div className="pd-side-head"><div><img src="/logo.png" alt="" width="32" height="32"/><strong>PlantDoctor <span>AI</span></strong></div><button onClick={()=>setSidebar(false)} aria-label="Close history">×</button></div>
   <button className="pd-new" onClick={create}><span>＋</span><T en="New diagnosis" fr="Nouveau diagnostic"/></button>
   <label className="pd-search"><span>⌕</span><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search diagnoses"/></label>
   <div className="pd-history-label"><T en="Recent diagnoses" fr="Diagnostics récents"/></div>
   <div className="pd-history">{filtered.map(chat=><div className={chat.id===activeId?'is-active':''} key={chat.id}><button onClick={()=>{setActiveId(chat.id);setSidebar(false)}}><strong>{chat.title}</strong><small>{new Date(chat.updatedAt).toLocaleDateString()}</small></button><button className="pd-delete" onClick={()=>remove(chat.id)} aria-label={'Delete '+chat.title}>×</button></div>)}</div>
   <div className="pd-side-note"><span>Private guest mode</span><p>Text diagnoses are saved to your guest history. Uploaded photos are analyzed but are not stored.</p></div>
  </aside>
  {sidebar&&<button className="pd-scrim" onClick={()=>setSidebar(false)} aria-label="Close sidebar"/>}
  <section className="pd-chat">
   <header className="pd-chat-head"><div><span className="pd-status"/><div><strong>PlantDoctor AI</strong><small>Careful plant-health investigation</small></div></div><button onClick={create}>New diagnosis</button></header>
   <div className="pd-thread">
    {!active?.messages.length?<div className="pd-empty">
      <div className="pd-empty-mark">✦</div><p className="ac-eyebrow"><span className="ac-dot"/>PLANT HEALTH ASSISTANT</p>
      <h1>Your AI Plant Doctor</h1><p>Upload a photo. Describe the symptoms. Understand what may be happening to your plant.</p>
      <div className="pd-empty-actions"><button onClick={()=>fileRef.current?.click()}>Diagnose a plant <span>↗</span></button><button onClick={showExample}>Try an example</button></div>
      <div className="pd-starters">{starters.map(([title,text])=><button key={title} onClick={()=>{setDraft(text);requestAnimationFrame(()=>document.querySelector('.pd-composer textarea')?.focus())}}><strong>{title}</strong><span>→</span></button>)}</div>
      <p className="pd-caution">AI suggestions can be wrong. Confirm serious or fast-spreading problems with a qualified local professional.</p>
    </div>:active.messages.map(message=><Message key={message.id} message={message}/>)}
    {busy&&<div className="pd-message assistant"><div className="pd-avatar">AI</div><div className="pd-thinking"><span/><span/><span/><p>Analyzing the evidence…</p></div></div>}
    <div ref={endRef}/>
   </div>
   <div className="pd-compose-wrap">
    {error&&<div className="pd-error" role="alert">{error}</div>}
    {images.length>0&&<div className="pd-previews">{images.map((src,index)=><div key={index}><img src={src} alt={'Plant preview '+(index+1)}/><button onClick={()=>setImages(items=>items.filter((_,i)=>i!==index))} aria-label="Remove image">×</button></div>)}</div>}
    <div className="pd-composer">
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={chooseFiles}/>
      <button className="pd-upload" onClick={()=>fileRef.current?.click()} aria-label="Upload plant images">＋</button>
      <textarea value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();send()}}} rows="1" maxLength="4000" placeholder="Describe the plant, symptoms, and when they started…"/>
      {busy?<button className="pd-stop" onClick={()=>abortRef.current?.abort()} aria-label="Stop diagnosis">■</button>:<button className="pd-send" onClick={()=>send()} disabled={!draft.trim()&&!images.length} aria-label="Send">↑</button>}
    </div>
    <div className="pd-compose-meta"><span>JPG, PNG or WEBP · up to 3 photos</span><span>AI assessment, not laboratory confirmation</span></div>
   </div>
  </section>
 </main>
}


