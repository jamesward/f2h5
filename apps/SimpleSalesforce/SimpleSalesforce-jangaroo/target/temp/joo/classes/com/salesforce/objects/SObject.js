joo.classLoader.prepare(


























"package com.salesforce.objects",

























"public dynamic class SObject extends mx.utils.ObjectProxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$writeValue=$$l+'writeValue';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,String,com.salesforce.results.QueryResult,mx.utils.ObjectProxy,Array);},









"public function SObject",function(obj){this[$super]();
if(is(obj,String)){
this.type=obj;
}else if(is(obj,mx.utils.ObjectProxy)){
this.loadSObject(obj);
}else{
this.loadSObject(new mx.utils.ObjectProxy(obj));
}
},










"public function toXml",function(sobjectNs,name,writer)
{
writer.writeStartElement(name,sobjectNs);
this[$writeValue](sobjectNs,writer,"type",this["type"]);
for(var f in this){
var val=this[f];
if(is(val,Array)){
for(var aval in val){
this[$writeValue](sobjectNs,writer,f,val[aval]);
}
}else{
if(f!="type"){
this[$writeValue](sobjectNs,writer,f,val);
}
}
}
writer.writeEndElement(name,sobjectNs);
},

"private function writeValue",function(sobjectNs,writer,name,val)
{
if(val==null){
writer.writeNameValueNode("fieldsToNull",name);
return;
}
if(is(val,com.salesforce.objects.SObject)){
val.toXml(sobjectNs,name,writer);
}else{
writer.writeNameValueNode(name,val);
}
},




"public function loadSObject",function(obj){
for(var i in obj){
var key=i;
var val=obj[i];
if(i==undefined||i=="object"){
continue;
}else if(i!="xsi:type"){
if(i=="Id"){
if(is(val,mx.collections.ArrayCollection)){
this[i]=(val)[0];
}else{
this[i]=val;
}
}else if(is(val,mx.utils.ObjectProxy)){


if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}else{
var xsiType=val["xsi:type"];
if(xsiType=="sf:sObject"){
this[i]=new com.salesforce.objects.SObject(val);
}else{
this[i]=new com.salesforce.results.QueryResult(val);
}
}
}else{
this[i]=val;
}
}
}
},






"public function toDebugString",function()
{
var ret='SObject\n';
for(var key in this){
var val=this[key];
if(is(val,mx.collections.ArrayCollection)){
var vArray=val;
for(var i=0;i<vArray.length;i++){
var vVal=vArray[i];
if(is(vVal,com.salesforce.objects.SObject)){
ret+=(vVal).toDebugString();
}else{
ret+=' '+key+':'+vVal+'\n';
}
}
}else if(is(val,com.salesforce.objects.SObject)){
ret+=(val).toDebugString();
}else{
ret+=' '+key+':'+val+'\n';
}
}
return ret;
},










"public function decodeBase64",function(field){
return com.salesforce.objects.Base64.decode(this[field]);
},

];},[],["mx.utils.ObjectProxy","String","Array","mx.collections.ArrayCollection","com.salesforce.results.QueryResult","com.salesforce.objects.Base64"]
);