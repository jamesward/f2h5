joo.classLoader.prepare(


























"package com.salesforce",


















"class SalesForceResponder implements mx.rpc.IResponder",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clientResponder=$$l+'clientResponder',$connection=$$l+'connection',$_context=$$l+'_context',$getResponseType=$$l+'getResponseType',$getResponse=$$l+'getResponse',$ensureArray=$$l+'ensureArray',$createSaveResult=$$l+'createSaveResult';return[function(){joo.classLoader.init(com.salesforce.results.DescribeSObjectResult,com.salesforce.results.DeletedResponse,com.salesforce.objects.SObject,com.salesforce.results.SaveResult,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.QueryResult,Array,com.salesforce.results.LoginResult,com.salesforce.results.GetServerTimestampResult,com.salesforce.results.UpdatedResponse,com.salesforce.results.Fault,com.salesforce.results.UserInfo,com.salesforce.results.UpsertResult,com.salesforce.results.DescribeLayoutResult,com.salesforce.results.DescribeTabSetResult,com.salesforce.results.SearchResult,com.salesforce.results.SendEmailResult);},









"public function SalesForceResponder",function(connection,clientResponder){this[$super]();
this[$connection]=connection;
this[$clientResponder]=clientResponder;
this[$_context]=clientResponder;
},

"private var",{clientResponder: undefined},
"private var",{connection: undefined},
"private var",{_context: undefined},

"private function getResponseType",function(result){
var response=result.result.Envelope.Body;
var responseKey;
for(var key in response){
responseKey=key;
break;
}
return responseKey;
},

"private function getResponse",function(result){
var response=result.result.Envelope.Body;
for(var key in response){
response=response[key].result;
break;
}
return response;
},

"public function result",function(result){
var resultObject;
var response=this[$getResponse](result);
var responseType=this[$getResponseType](result);
var i;

com.salesforce.Util.debug(this[$connection],"responseType: "+responseType);
switch(responseType){
case"loginResponse":
this[$connection]._loginResult=new com.salesforce.results.LoginResult(result);
resultObject=this[$connection].loginResult;
this[$connection].sessionId=resultObject.sessionId;

this[$connection].isLoggingIn=false;
this[$connection].isLoggedIn=true;
break;

case"describeSObjectsResponse":
resultObject=new Array();
response=this[$ensureArray](response);
for(i=0;i<response.length;i++){
resultObject.push(new com.salesforce.results.DescribeSObjectResult(response[i]));
}
break;

case"describeSObjectResponse":
resultObject=new com.salesforce.results.DescribeSObjectResult(response);
break;

case"searchResponse":
resultObject=new com.salesforce.results.SearchResult(response);
break;

case"queryMoreResponse":
case"queryAllResponse":
case"queryResponse":
resultObject=new com.salesforce.results.QueryResult(response);
break;

case"deleteResponse":
case"createResponse":
case"updateResponse":
resultObject=this[$createSaveResult](response);
break;

case"upsertResponse":
resultObject=new Array();
response=this[$ensureArray](response);
for(i=0;i<response.length;i++){
resultObject.push(new com.salesforce.results.UpsertResult(response[i]));
}
break;

case"retrieveResponse":
resultObject=new Array();
response=this[$ensureArray](response);
for(i=0;i<response.length;i++){
resultObject.push(new com.salesforce.objects.SObject(response[i]));
}
break;

case"getServerTimestampResponse":
resultObject=new com.salesforce.results.GetServerTimestampResult(response);
break;
case"getUpdatedResponse":
resultObject=new com.salesforce.results.UpdatedResponse(response);
break;
case"getDeletedResponse":
resultObject=new com.salesforce.results.DeletedResponse(response);
break;
case"describeGlobalResponse":
resultObject=response;
break;
case"describeLayoutResponse":
resultObject=new com.salesforce.results.DescribeLayoutResult(response);
break;
case"sendEmailResponse":
resultObject=new com.salesforce.results.SendEmailResult(response);
break;
case"describeTabsResponse":
resultObject=new Array();
response=this[$ensureArray](response);
for(i=0;i<response.length;i++){
resultObject.push(new com.salesforce.results.DescribeTabSetResult(response[i]));
}
break;
case"getUserInfoResponse":
resultObject=new com.salesforce.results.UserInfo(response);
break;

case"Fault":
var fault=new mx.utils.ObjectProxy(result.result.Envelope.Body.Fault);
try{
resultObject=new com.salesforce.results.Fault(fault);
com.salesforce.Util.debug(this[$connection],"Saleforce Soap Fault: "+resultObject.faultcode+'\n'+resultObject.faultstring);
}catch(e){

resultObject=fault;
com.salesforce.Util.debug(this[$connection],"Other Fault: "+resultObject.toString());
}
break;

default:
resultObject=response;
break;
}


if(responseType=='Fault'){
this[$clientResponder].fault(resultObject);
}else{
this[$clientResponder].result(resultObject);
}
},


"private function ensureArray",function(result){
if(is(result,mx.collections.ArrayCollection)){
return result;
}
var resultArray=new mx.collections.ArrayCollection();
resultArray.addItem(result);
return resultArray;
},

"private function createSaveResult",function(result){
var rArray=new mx.collections.ArrayCollection();

if(is(result,mx.collections.ArrayCollection)){
rArray=result;
}else{
rArray.addItem(result);
}
var resultObject=new Array();
for(var i=0;i<rArray.length;i++){
resultObject[i]=new com.salesforce.results.SaveResult(rArray[i]);
}
return resultObject;
},

"public function fault",function(fault){

this[$clientResponder].fault(fault);
},
];},[],["mx.rpc.IResponder","com.salesforce.Util","com.salesforce.results.LoginResult","Array","com.salesforce.results.DescribeSObjectResult","com.salesforce.results.SearchResult","com.salesforce.results.QueryResult","com.salesforce.results.UpsertResult","com.salesforce.objects.SObject","com.salesforce.results.GetServerTimestampResult","com.salesforce.results.UpdatedResponse","com.salesforce.results.DeletedResponse","com.salesforce.results.DescribeLayoutResult","com.salesforce.results.SendEmailResult","com.salesforce.results.DescribeTabSetResult","com.salesforce.results.UserInfo","mx.utils.ObjectProxy","com.salesforce.results.Fault","mx.collections.ArrayCollection","com.salesforce.results.SaveResult"]
);