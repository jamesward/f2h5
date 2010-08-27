joo.classLoader.prepare(


























"package com.salesforce.results",





"public dynamic class UserInfo",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public function UserInfo",function(obj){this[$super]();
for(var prop in obj){
if(is(obj[prop],mx.utils.ObjectProxy)){
if(obj[prop].hasOwnProperty("xsi:nil")){
this[prop]=null;
}else{
this[prop]=obj[prop];
}
}
this[prop]=obj[prop];
}
},

"public function toDebugString",function()
{
var ret='';
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
];},[],["mx.utils.ObjectProxy","mx.collections.ArrayCollection","com.salesforce.objects.SObject"]
);