joo.classLoader.prepare(


























"package com.salesforce.results",






"public dynamic class LoginResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,com.salesforce.results.UserInfo,mx.utils.ObjectProxy);},

"public var",{passwordExpired: undefined},
"public var",{serverUrl: undefined},
"public var",{sessionId: undefined},
"public var",{userId: undefined},
"public var",{userInfo: undefined},

"public function LoginResult",function(result){if(arguments.length<1){result=null;}
this[$super]();

if(result!=null)
{
var response=result.result.Envelope.Body.loginResponse.result;
for(var i in response){
var value=response[i];
if(is(value,mx.utils.ObjectProxy)){

this[i]=new com.salesforce.results.UserInfo(value);
}else{
this[i]=response[i];
}
}
}
else
{
this.passwordExpired=false;
this.serverUrl='';
this.sessionId='';
this.userId='';
this.userInfo=null;
}
},

"public function toDebugString",function()
{
var ret='LoginResult\n';
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
}else if(is(val,com.salesforce.results.UserInfo)){
ret+=key+"\n"+(val).toDebugString();
}else{
ret+=' '+key+':'+val+'\n';
}
}
return ret;
},
];},[],["mx.utils.ObjectProxy","com.salesforce.results.UserInfo","mx.collections.ArrayCollection","com.salesforce.objects.SObject"]
);