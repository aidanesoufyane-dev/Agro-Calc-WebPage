export const diagnosisSchema={
 type:'object',additionalProperties:false,
 required:['plant','scientificName','affectedArea','summary','observations','primaryDiagnosis','differentialDiagnoses','severity','questions','recommendedActions','prevention','monitoring','needsProfessionalConfirmation'],
 properties:{
  plant:{type:'string'},scientificName:{type:'string'},affectedArea:{type:'string'},summary:{type:'string'},
  observations:{type:'array',items:{type:'string'}},
  primaryDiagnosis:{type:'object',additionalProperties:false,required:['name','scientificName','confidence','category','reasoning'],properties:{name:{type:'string'},scientificName:{type:'string'},confidence:{type:'string',enum:['low','moderate','high']},category:{type:'string'},reasoning:{type:'string'}}},
  differentialDiagnoses:{type:'array',items:{type:'object',additionalProperties:false,required:['name','confidence','reasoning'],properties:{name:{type:'string'},confidence:{type:'string',enum:['low','moderate','high']},reasoning:{type:'string'}}}},
  severity:{type:'string',enum:['unknown','mild','moderate','severe']},
  questions:{type:'array',items:{type:'string'}},recommendedActions:{type:'array',items:{type:'string'}},prevention:{type:'array',items:{type:'string'}},
  monitoring:{type:'string'},needsProfessionalConfirmation:{type:'boolean'}
 }
}

export function validateDiagnosis(value){
 if(!value||typeof value!=='object')return false
 const arrays=['observations','differentialDiagnoses','questions','recommendedActions','prevention']
 return typeof value.summary==='string'&&typeof value.plant==='string'&&value.primaryDiagnosis&&['low','moderate','high'].includes(value.primaryDiagnosis.confidence)&&arrays.every(key=>Array.isArray(value[key]))
}
