import { PLANT_DOCTOR_SYSTEM_PROMPT } from './_plantDoctorPrompt.mjs'
import { diagnosisSchema, validateDiagnosis } from './_plantDoctorSchema.mjs'
import { consumeDailyRequest, saveConversation } from './_mongo.mjs'
const limits={maxImages:3,maxImageBytes:4*1024*1024,maxMessageChars:4000,maxHistory:8,dailyRequests:5},requests=new Map()
const json=(status,body)=>({statusCode:status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(body)})
const estimateDataBytes=url=>{const comma=url.indexOf(',');return comma<0?Infinity:Math.ceil((url.length-comma-1)*3/4)}
const validId=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]{8,80}$/.test(value)
const parseJson=text=>JSON.parse(String(text).trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,''))
const groq=async({message,history,images})=>{
 const apiKey=process.env.GROQ_API_KEY
 if(!apiKey)throw Object.assign(new Error('Plant Doctor is not configured yet.'),{status:503,code:'not_configured'})
 const recent=history.slice(-limits.maxHistory).filter(item=>['user','assistant'].includes(item.role)&&typeof item.text==='string').map(item=>({role:item.role,content:item.text.slice(0,2000)}))
 const content=[{type:'text',text:message||'Analyze the attached plant photos.'},...images.map(url=>({type:'image_url',image_url:{url}}))]
 const response=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:process.env.GROQ_MODEL||'qwen/qwen3.8-27b',messages:[{role:'system',content:`${PLANT_DOCTOR_SYSTEM_PROMPT}\nReturn one valid JSON object matching this schema exactly: ${JSON.stringify(diagnosisSchema)}`},...recent,{role:'user',content}],response_format:{type:'json_object'},temperature:.2,max_completion_tokens:1800})})
 const data=await response.json()
 if(!response.ok)throw Object.assign(new Error(data?.error?.message||'The diagnosis service is unavailable.'),{status:response.status>=500?503:400,code:'provider_error'})
 const text=data?.choices?.[0]?.message?.content
 if(!text)throw Object.assign(new Error('The model returned no diagnosis.'),{status:502,code:'empty_response'})
 let diagnosis
 try{diagnosis=parseJson(text)}catch{throw Object.assign(new Error('The diagnosis response could not be read.'),{status:502,code:'invalid_response'})}
 if(!validateDiagnosis(diagnosis))throw Object.assign(new Error('The diagnosis response was incomplete.'),{status:502,code:'invalid_response'})
 return diagnosis
}
export const handler=async event=>{
 if(event.httpMethod!=='POST')return json(405,{error:'Method not allowed.',code:'method_not_allowed'})
 let body
 try{body=JSON.parse(event.body||'{}')}catch{return json(400,{error:'Invalid request.',code:'invalid_json'})}
 const message=String(body.message||'').trim(),images=Array.isArray(body.images)?body.images:[],history=Array.isArray(body.history)?body.history:[],clientId=validId(body.clientId)?body.clientId:'',conversationId=validId(body.conversationId)?body.conversationId:''
 if(!message&&!images.length)return json(400,{error:'Add a plant photo or describe the symptoms.',code:'empty_request'})
 if(message.length>limits.maxMessageChars)return json(400,{error:'The message is too long.',code:'message_too_long'})
 if(images.length>limits.maxImages)return json(400,{error:`Upload no more than ${limits.maxImages} images.`,code:'too_many_images'})
 for(const image of images)if(!/^data:image\/(jpeg|png|webp);base64,/i.test(image)||estimateDataBytes(image)>limits.maxImageBytes)return json(400,{error:'Use JPG, PNG or WEBP images smaller than 4 MB.',code:'invalid_image'})
 const ip=event.headers?.['x-nf-client-connection-ip']||event.headers?.['x-forwarded-for']?.split(',')[0]||'guest'
 let allowance
 try{allowance=await consumeDailyRequest({clientId,ip,limit:limits.dailyRequests})}catch(error){console.error('MongoDB usage counter failed',error)}
 if(!allowance){const day=new Date().toISOString().slice(0,10),key=ip+':'+day,count=requests.get(key)||0;allowance={allowed:count<limits.dailyRequests,remaining:Math.max(0,limits.dailyRequests-count-1)};requests.set(key,count+1)}
 if(!allowance.allowed)return json(429,{error:'The free daily diagnosis limit has been reached. Try again tomorrow.',code:'rate_limited'})
 try{const diagnosis=await groq({message,images,history});try{await saveConversation({clientId,conversationId,title:String(body.title||''),userText:message,diagnosis})}catch(error){console.error('MongoDB conversation save failed',error)}return json(200,{diagnosis,usage:{remaining:allowance.remaining}})}
 catch(error){return json(error.status||500,{error:error.message||'Diagnosis failed. Please try again.',code:error.code||'internal_error'})}
}
