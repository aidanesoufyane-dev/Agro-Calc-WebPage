import { MongoClient, ServerApiVersion } from 'mongodb'

let clientPromise
let indexesPromise

export async function getDatabase(){
 const uri=process.env.MONGODB_URI
 if(!uri)return null
 if(!clientPromise){
  const client=new MongoClient(uri,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})
  clientPromise=client.connect().then(()=>client)
 }
 const client=await clientPromise
 const db=client.db(process.env.MONGODB_DB||'agrocalc')
 if(!indexesPromise)indexesPromise=Promise.all([
  db.collection('plant_doctor_conversations').createIndex({clientId:1,conversationId:1},{unique:true}),
  db.collection('plant_doctor_conversations').createIndex({updatedAt:-1}),
  db.collection('plant_doctor_usage').createIndex({expiresAt:1},{expireAfterSeconds:0})
 ])
 await indexesPromise
 return db
}
export async function consumeDailyRequest({clientId,ip,limit}){
 const db=await getDatabase()
 if(!db)return null
 const day=new Date().toISOString().slice(0,10),identity=clientId||ip||'guest',expiresAt=new Date(Date.now()+48*60*60*1000)
 const record=await db.collection('plant_doctor_usage').findOneAndUpdate({_id:`${identity}:${day}`},{$inc:{count:1},$setOnInsert:{clientId:identity,day,createdAt:new Date(),expiresAt}},{upsert:true,returnDocument:'after',includeResultMetadata:false})
 return {allowed:record.count<=limit,remaining:Math.max(0,limit-record.count)}
}
export async function saveConversation({clientId,conversationId,title,userText,diagnosis}){
 if(!clientId||!conversationId)return
 const db=await getDatabase()
 if(!db)return
 const now=new Date(),userMessage={role:'user',text:userText||'Plant image submitted',createdAt:now},assistantMessage={role:'assistant',text:diagnosis.summary,diagnosis,createdAt:now}
 await db.collection('plant_doctor_conversations').updateOne({clientId,conversationId},{$set:{title:(title||userText||'Plant diagnosis').slice(0,80),updatedAt:now,lastDiagnosis:diagnosis},$setOnInsert:{createdAt:now},$push:{messages:{$each:[userMessage,assistantMessage],$slice:-40}}},{upsert:true})
}
