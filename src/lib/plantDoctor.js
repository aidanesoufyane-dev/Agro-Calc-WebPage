export const PLANT_DOCTOR_STORAGE='agrocalc-plant-doctor-v1'
export const PLANT_DOCTOR_CLIENT='agrocalc-plant-doctor-client-v1'
export const PLANT_DOCTOR_LIMITS={maxImages:3,maxFileBytes:4*1024*1024,maxDimension:1600,accepted:['image/jpeg','image/png','image/webp']}

export const exampleDiagnosis={
 plant:'Tomato',scientificName:'Solanum lycopersicum',affectedArea:'Older lower leaves',
 summary:'The visible pattern is compatible with early blight, but a photo alone cannot confirm the cause.',
 observations:['Brown circular lesions on older leaves','Yellow tissue around several lesions','Symptoms appear concentrated on lower foliage'],
 primaryDiagnosis:{name:'Possible early blight',scientificName:'Alternaria solani',confidence:'moderate',category:'Fungal disease',reasoning:'Older-leaf symptoms and brown lesions with surrounding yellowing are compatible with early blight. Concentric rings and progression after prolonged leaf wetness would add support.'},
 differentialDiagnoses:[{name:'Septoria leaf spot',confidence:'low',reasoning:'Can produce numerous leaf spots and lower-leaf yellowing.'},{name:'Nutrient or root stress',confidence:'low',reasoning:'Stress can yellow older foliage, though discrete lesions suggest another contributor.'}],
 severity:'moderate',questions:['Do the spots contain visible concentric rings?','Have leaves remained wet for long periods?','Are nearby tomato plants developing the same pattern?'],
 recommendedActions:['Photograph both sides of an affected leaf in daylight.','Remove heavily affected fallen foliage and avoid handling wet plants.','Reduce avoidable leaf wetness and improve airflow.','Monitor new growth and the speed of spread.'],
 prevention:['Keep foliage dry when practical.','Remove crop debris between cycles.','Inspect lower leaves regularly.'],
 monitoring:'Take another photo from the same plant in 3–5 days and compare spread onto newer leaves.',needsProfessionalConfirmation:false
}

export function newConversation(){
 return {id:globalThis.crypto?.randomUUID?.()||String(Date.now()),title:'New plant diagnosis',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),messages:[]}
}
export function getPlantDoctorClientId(){
 try{let id=localStorage.getItem(PLANT_DOCTOR_CLIENT);if(!id){id=globalThis.crypto?.randomUUID?.()||String(Date.now());localStorage.setItem(PLANT_DOCTOR_CLIENT,id)}return id}catch{return String(Date.now())}
}
export function loadConversations(){try{const value=JSON.parse(localStorage.getItem(PLANT_DOCTOR_STORAGE));return Array.isArray(value)?value:[]}catch{return []}}
export function saveConversations(items){
 try{const safe=items.slice(0,20).map(chat=>({...chat,messages:chat.messages.slice(-20).map(message=>({...message,images:[]}))}));localStorage.setItem(PLANT_DOCTOR_STORAGE,JSON.stringify(safe))}catch{}
}
export async function compressPlantImage(file){
 if(!PLANT_DOCTOR_LIMITS.accepted.includes(file.type))throw new Error('invalid_type')
 if(file.size>PLANT_DOCTOR_LIMITS.maxFileBytes)throw new Error('too_large')
 const url=URL.createObjectURL(file)
 try{
  const image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url})
  const scale=Math.min(1,PLANT_DOCTOR_LIMITS.maxDimension/Math.max(image.width,image.height)),canvas=document.createElement('canvas')
  canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale)
  canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height)
  return canvas.toDataURL('image/webp',.82)
 }finally{URL.revokeObjectURL(url)}
}



