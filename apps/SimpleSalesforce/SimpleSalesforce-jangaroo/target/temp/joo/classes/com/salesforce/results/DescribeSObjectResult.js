joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class DescribeSObjectResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RecordTypeInfo,com.salesforce.results.Field,mx.collections.ArrayCollection,com.salesforce.results.ChildRelationship,mx.utils.ObjectProxy,Array);},

"public function DescribeSObjectResult",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){
if(key=="fields"){
var fieldArray=new Array();
for(var i=0;i<(val).length;i++){
var field=new com.salesforce.results.Field((val)[i]);
fieldArray[field.name]=field;
}
this[key]=fieldArray;
}else if(key=="childRelationships"){
var crArray=new Array();
var cr;
if(is(!val,mx.utils.ObjectProxy)){
cr=new com.salesforce.results.ChildRelationship(val);
crArray[cr.relationshipName]=cr;
}else{
for(var i2=0;i2<(val).length;i2++){
cr=new com.salesforce.results.ChildRelationship((val)[i2]);
crArray[cr.relationshipName]=cr;
}
}
this[key]=crArray;
}else if(key=="recordTypeInfos"){
var rtArray=new Array();
var rt;
if(is(val,mx.utils.ObjectProxy)){
rt=new com.salesforce.results.RecordTypeInfo(val);
rtArray[rt.name]=rt;
}else{
for(var i3=0;i3<(val).length;i3++){
rt=new com.salesforce.results.RecordTypeInfo((val)[i3]);
rtArray[rt.name]=rt;
}
}
this[key]=rtArray;
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","Array","com.salesforce.results.Field","com.salesforce.results.ChildRelationship","com.salesforce.results.RecordTypeInfo"]
);