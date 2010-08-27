joo.classLoader.prepare(


























"package com.salesforce",












































"public class Connection extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$updateMru=$$l+'updateMru',$client=$$l+'client',$_batchSize=$$l+'_batchSize',$organizationId=$$l+'organizationId',$emailHeader=$$l+'emailHeader',$assignmentRuleHeader=$$l+'assignmentRuleHeader',$transferToUserId=$$l+'transferToUserId',$debuggingHeader=$$l+'debuggingHeader',$sforceNs=$$l+'sforceNs',$sobjectNs=$$l+'sobjectNs',$_resultGetUserInfo=$$l+'_resultGetUserInfo',$writeHeader=$$l+'writeHeader',$invoke=$$l+'invoke',$_invoke=$$l+'_invoke',$writeOne=$$l+'writeOne',$sendRequestHandler=$$l+'sendRequestHandler',$resultHandler=$$l+'resultHandler',$faultHandler=$$l+'faultHandler';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent,com.salesforce.XmlWriter,com.salesforce.objects.SingleEmailMessage,com.salesforce.objects.SObject,com.salesforce.objects.Parameter,flash.system.Security,Array,com.salesforce.objects.LeadConvert,com.salesforce.results.LoginResult,com.salesforce.AsyncResponder,com.salesforce.Transport,com.salesforce.SalesForceResponder);},



"salesforce_internal var",{sessionId:null},



"salesforce_internal var",{_internalServerUrl: undefined},



"salesforce_internal var",{isLoggingIn:false},



"salesforce_internal var",{isLoggedIn:false},



"salesforce_internal var",{_loginResult:null},

"salesforce_internal var",{_loginCallback:null},



"salesforce_internal var",{_applicationServerName:null},



"salesforce_internal var",{_applicationUrl:null},



"salesforce_internal var",{_applicationDomain:null},



"salesforce_internal var",{_protocol:'https'},

"private var",{updateMru:null},
"private var",{client:null},
"private var",{_batchSize: undefined},
"private var",{organizationId:null},
"private var",{emailHeader:null},
"private var",{assignmentRuleHeader:null},
"private var",{transferToUserId:null},
"private var",{debuggingHeader:null},
"private var",{sforceNs:"urn:partner.soap.sforce.com"},
"private var",{sobjectNs:"sobject.partner.soap.sforce.com"},

"private static var",{namespaceMap:function(){return([
{ns:"urn:partner.soap.sforce.com",prefix:null},
{ns:"sobject.partner.soap.sforce.com",prefix:"ns1"}
]);}},







"public function getCurrentSessionid",function(){
return this.sessionId;
},






"public function getFrontDoorUrl",function(){
if(!this.isLoggedIn){
throw"You must be logged in to use the front door.";
}else{
var url=mx.utils.URLUtil.getProtocol(this._internalServerUrl)+"://"+mx.utils.URLUtil.getServerName(this._internalServerUrl);
return url+"/secur/frontdoor.jsp?sid="+this.sessionId;
}
},






"public function isSControl",function(){
if(this._applicationDomain==null)
return false;
return this._applicationDomain.indexOf("salesforce")>0;
},


"public function get loginResult",function(){
return this._loginResult;
},





"public function get applicationDomain",function(){
return this._applicationDomain;
},





"public function get applicationServerName",function(){
return this._applicationServerName;
},





"public function get applicationUrl",function(){
return this._applicationUrl;
},






"public function get protocol",function(){
return this._protocol;
},
"public function set protocol",function(prot){
this._protocol=prot;
},






"public function set applicationUrl",function(url){
this._applicationUrl=url;
this._applicationServerName=mx.utils.URLUtil.getServerName(url);
var parts=this._applicationServerName.split(".");
if(parts.length===3){
this._applicationDomain=parts[1]+"."+parts[2];
}else{
this._applicationDomain=this._applicationServerName;
}
},






"public function set serverUrl",function(serverUrl){

com.salesforce.Util.debug(this,"App Domain = "+this._applicationDomain);
var apiServerName=mx.utils.URLUtil.getServerName(serverUrl);
com.salesforce.Util.debug(this,"Api Server name = "+apiServerName);

if(this._applicationDomain=="salesforce.com"){
serverUrl=serverUrl.replace(apiServerName,this._applicationServerName);
}
if(this._protocol=='http'&&serverUrl.match("^https.*")){
serverUrl=serverUrl.replace('https','http');
}
this._internalServerUrl=serverUrl;
com.salesforce.Util.debug(this,"_internalServerUrl set to "+this._internalServerUrl);





if(flash.system.Security.sandboxType==flash.system.Security.REMOTE&&apiServerName!="www.salesforce.com"){
var policyUrl=this._internalServerUrl;
var s="/services/Soap/u/";
var i=this._internalServerUrl.indexOf(s);
policyUrl=this._internalServerUrl.substr(0,(i+s.length));
policyUrl+="cross-domain.xml";

com.salesforce.Util.debug(this,"loading the policy file: "+policyUrl);
flash.system.Security.loadPolicyFile(policyUrl);

}else{
com.salesforce.Util.debug(this,"set serverUrl: skip the policy file for sandboxType:"+flash.system.Security.sandboxType+' and server:'+apiServerName);
}
},

"public function get serverUrl",function(){
return this._internalServerUrl;
},






"public function set batchSize",function(num){this[$_batchSize]=num;},








"public function Connection",function(){this[$super]();
},











"public function loginWithSessionId",function(sessionId,serverUrl,callback){if(arguments.length<3){callback=null;}
com.salesforce.Util.debug(this,"\nloginWithSessionId(\n sid: "+sessionId+"\n surl: "+serverUrl+'\n);');
this.applicationUrl=serverUrl;

this.sessionId=sessionId;
this.serverUrl=serverUrl;
this.isLoggedIn=true;

if(callback!=null){


this._loginCallback=callback;





var oCallBack=new com.salesforce.AsyncResponder($$bound(this,$_resultGetUserInfo));


this[$invoke]("getUserInfo",[],false,oCallBack);
}
},

"private function _resultGetUserInfo",function(userInfo)
{



var loginResult=new com.salesforce.results.LoginResult();
loginResult.serverUrl=this.serverUrl;
loginResult.sessionId=this.sessionId;
loginResult.userId=userInfo.userId;
loginResult.userInfo=userInfo;


this._loginCallback.result(loginResult);
},








"public function loginWithCredentials",function(username,password,callback){
if(this.serverUrl==null)
{
this.serverUrl="https://www.salesforce.com/services/Soap/u/9.0";
}
var arg1=new com.salesforce.objects.Parameter("username",username,false);
var arg2=new com.salesforce.objects.Parameter("password",password,false);
this.isLoggingIn=true;

if(flash.system.Security.sandboxType==flash.system.Security.REMOTE){

var policyUrl=this._protocol+"://www.salesforce.com/services/crossdomain.xml";
com.salesforce.Util.debug(this,"loading the policy file: "+policyUrl);
flash.system.Security.loadPolicyFile(policyUrl);
}else{
com.salesforce.Util.debug(this,"loginWithCredentials: skip the policy file for sandboxType:"+flash.system.Security.sandboxType);
}

this[$invoke]("login",[arg1,arg2],false,callback);
},








"public function login",function(loginRequest){
try{

if((loginRequest.session_id!=null)&&(loginRequest.server_url!=null)){

this.loginWithSessionId(loginRequest.session_id,loginRequest.server_url,loginRequest.callback);

}else{

if(loginRequest.username==null||loginRequest.password==null){
throw('missing username or password to login request');
}
if(loginRequest.username==''||loginRequest.password==''){
throw('empty username or password to login request');
}
this.loginWithCredentials(loginRequest.username,loginRequest.password,loginRequest.callback);
}
}catch(e){
if(loginRequest.callback!=null)
loginRequest.callback.fault(e);
}
},










"public function query",function(queryString,callback){
var arg=new com.salesforce.objects.Parameter("queryString",queryString,false);
this[$invoke]("query",[arg],false,callback);
},










"public function create",function(sobjects,callback){
var arg=new com.salesforce.objects.Parameter("sObjects",sobjects,true);
this[$invoke]("create",[arg],true,callback);
},













"public function update",function(sobjects,callback){
var arg=new com.salesforce.objects.Parameter("sObjects",sobjects,true);
this[$invoke]("update",[arg],true,callback);
},






"public function deleteIds",function(ids,callback){
var arg=new com.salesforce.objects.Parameter("ids",ids,true);
this[$invoke]("delete",[arg],true,callback);
},










"public function execute",function(packageName,method,args,callback,isArray){if(arguments.length<5){isArray=false;}


var sobjectNs="http://soap.sforce.com/schemas/package/"+packageName;

var nsmap=[{ns:sobjectNs,prefix:""}];

if(!args){
throw"args not specified";
}

var params=[];






for(var i=0;i<args.length;i++){
if(is(!args[i],com.salesforce.objects.Parameter)){
throw"Apex arguments must of type Parameter.";
}else{
var param=args[i];
if(is(param.value,Array)){
param.isArray=true;
}else{
param.isArray=false;
}
params.push(args[i]);
}
}

var isRealArray=true;

if(isArray===false){
isRealArray=false;
}

this[$invoke](method,params,isRealArray,callback,nsmap,"/services/Soap/package/"+packageName,sobjectNs,sobjectNs);
},










"public function retrieve",function(fieldList,sObjectType,ids,callback){
var arg1=new com.salesforce.objects.Parameter("fieldList",fieldList,false);
var arg2=new com.salesforce.objects.Parameter("sObjectType",sObjectType,false);
var arg3=new com.salesforce.objects.Parameter("ids",ids,true);
this[$invoke]("retrieve",[arg1,arg2,arg3],true,callback);
},

"public function getUserInfo",function(callback){
this[$invoke]("getUserInfo",[],false,callback);
},









"public function search",function(searchString,callback){
var arg1=new com.salesforce.objects.Parameter("searchString",searchString,false);
this[$invoke]("search",[arg1],false,callback);
},






"public function describeSObject",function(type,callback){
var arg=new com.salesforce.objects.Parameter("sObjectType",type,false);
this[$invoke]("describeSObject",[arg],false,callback);
},







"public function describeSObjects",function(types,callback){
var arg=new com.salesforce.objects.Parameter("sObjectType",types,true);
this[$invoke]("describeSObjects",[arg],true,callback);
},







"public function describeGlobal",function(callback){
this[$invoke]("describeGlobal",[],false,callback);
},











"public function describeLayout",function(type,recordTypes,callback){
var arg1=new com.salesforce.objects.Parameter("sObjectType",type,false);
if(!recordTypes){
recordTypes=[];
}
var arg2=new com.salesforce.objects.Parameter("recordTypeIds",recordTypes,true);
this[$invoke]("describeLayout",[arg1,arg2],false,callback);
},







"public function getServerTimestamp",function(callback){
this[$invoke]("getServerTimestamp",[],false,callback);
},








"public function describeTabs",function(callback){
this[$invoke]("describeTabs",[],true,callback);
},











"public function getDeleted",function(sObjectType,startDate,endDate,callback){
var arg1=new com.salesforce.objects.Parameter("sObjectType",sObjectType,false);
var arg2=new com.salesforce.objects.Parameter("startDate",startDate,false);
var arg3=new com.salesforce.objects.Parameter("endDate",endDate,false);
this[$invoke]("getDeleted",[arg1,arg2,arg3],false,callback);
},








"public function upsert",function(externalIDFieldName,sobjects,callback){
var arg1=new com.salesforce.objects.Parameter("externalIDFieldName",externalIDFieldName,false);
var arg2=new com.salesforce.objects.Parameter("sObjects",sobjects,true);
this[$invoke]("upsert",[arg1,arg2],true,callback);
},










"public function getUpdated",function(sObjectType,startDate,endDate,callback){
var arg1=new com.salesforce.objects.Parameter("sObjectType",sObjectType,false);
var arg2=new com.salesforce.objects.Parameter("startDate",startDate,false);
var arg3=new com.salesforce.objects.Parameter("endDate",endDate,false);
this[$invoke]("getUpdated",[arg1,arg2,arg3],false,callback);
},







"public function queryAll",function(queryString,callback){
var arg=new com.salesforce.objects.Parameter("queryString",queryString,false);
this[$invoke]("queryAll",[arg],false,callback);
},








"public function queryMore",function(queryLocator,callback){
var arg=new com.salesforce.objects.Parameter("queryLocator",queryLocator,false);
this[$invoke]("queryMore",[arg],false,callback);
},












"public function sendEmail",function(messgeList,callback){
var arg1=new com.salesforce.objects.Parameter("messages",messgeList,false);
this[$invoke]("sendEmail",[arg1],false,callback);
},








"public function merge",function(mergeRequest,callback){
var arg1=new com.salesforce.objects.Parameter("request",mergeRequest,true);
this[$invoke]("merge",[arg1],true,callback);
},






"public function undelete",function(ids,callback){
var arg1=new com.salesforce.objects.Parameter("ids",ids,true);
this[$invoke]("undelete",[arg1],true,callback);
},






"public function convertLead",function(leadConverts,callback){
var arg1=new com.salesforce.objects.Parameter("leadConverts",leadConverts,true);
this[$invoke]("convertLead",[arg1],true,callback);
},






"public function resetPassword",function(userId,callback){
throw("not implemented");
var arg1=new com.salesforce.objects.Parameter("userId",userId,false);
this[$invoke]("resetPassword",[arg1],false,callback);
},







"public function setPassword",function(userId,password,callback){
throw("not implemented");
var arg1=new com.salesforce.objects.Parameter("userId",userId,false);
var arg2=new com.salesforce.objects.Parameter("password",password,false);
this[$invoke]("setPassword",[arg1,arg2],false,callback);
},






"public function process",function(actions,callback){
throw("not implemented");
var arg1=new com.salesforce.objects.Parameter("actions",actions,true);
this[$invoke]("process",[arg1],true,callback);
},









"private function writeHeader",function(writer,headerNs){
writer.startHeader();

writer.writeNamespace(headerNs,"sfns");

if(this.sessionId!==null){
writer.writeStartElement("SessionHeader",headerNs);
writer.writeNameValueNode("sessionId",this.sessionId);
writer.writeEndElement("SessionHeader",headerNs);
}

if(this[$organizationId]!==null){
writer.writeStartElement("LoginScopeHeader",headerNs);
writer.writeNameValueNode("organizationId",this[$organizationId]);
writer.writeEndElement("LoginScopeHeader",headerNs);
}

if(this[$client]!==null){
writer.writeStartElement("CallOptions",headerNs);
writer.writeNameValueNode("client",this[$client]);
writer.writeEndElement("CallOptions",headerNs);
}

if(!(isNaN(this[$_batchSize]))){
writer.writeStartElement("QueryOptions",headerNs);
writer.writeNameValueNode("batchSize",this[$_batchSize]);
writer.writeEndElement("QueryOptions",headerNs);
}

if(this[$updateMru]!==null){
writer.writeStartElement("MruHeader",headerNs);
writer.writeNameValueNode("updateMru",this[$updateMru]);
writer.writeEndElement("MruHeader",headerNs);
}

if(this[$emailHeader]!==null){
writer.writeStartElement("EmailHeader",headerNs);
if(this[$emailHeader].triggerAutoResponseEmail){
writer.writeNameValueNode("triggerAutoResponseEmail",this[$emailHeader].triggerAutoResponseEmail);
}
if(this[$emailHeader].triggerOtherEmail){
writer.writeNameValueNode("triggerOtherEmail",this[$emailHeader].triggerOtherEmail);
}
if(this[$emailHeader].triggerUserEmail){
writer.writeNameValueNode("triggerUserEmail",this[$emailHeader].triggerUserEmail);
}
writer.writeEndElement("EmailHeader",headerNs);
}

if(this[$assignmentRuleHeader]!==null){
writer.writeStartElement("AssignmentRuleHeader",headerNs);
if(this[$assignmentRuleHeader].assignmentRuleId){
writer.writeNameValueNode("assignmentRuleId",this[$assignmentRuleHeader].assignmentRuleId);
}

if(this[$assignmentRuleHeader].useDefaultRule){
writer.writeNameValueNode("useDefaultRule",this[$assignmentRuleHeader].useDefaultRule);
}
writer.writeEndElement("AssignmentRuleHeader",headerNs);
}

if(this[$transferToUserId]!==null){
writer.writeStartElement("UserTerritoryDeleteHeader",headerNs);
writer.writeNameValueNode("transferToUserId",this[$transferToUserId]);
writer.writeEndElement("UserTerritoryDeleteHeader",headerNs);
}

if(this[$debuggingHeader]!==null){
writer.writeStartElement("DebuggingHeader",headerNs);
writer.writeNameValueNode("debugLevel",this[$debuggingHeader].debugLevel);
writer.writeEndElement("DebuggingHeader",headerNs);
}

writer.endHeader();
},












"private function invoke",function(method,args,isArray,responder,nsMap,intServerUrl,sfNs,sobjNs){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){nsMap=null;}intServerUrl=null;}sfNs=null;}sobjNs=null;}

var sf_responder=new com.salesforce.SalesForceResponder(this,responder);
if(nsMap==null){
nsMap=$$private.namespaceMap;
}
if(intServerUrl==null){

intServerUrl=this._internalServerUrl;
}else{
var proto=mx.utils.URLUtil.getProtocol(this._internalServerUrl);
var server=mx.utils.URLUtil.getServerName(this._internalServerUrl);
intServerUrl=proto+"://"+server+intServerUrl;
}


if(sfNs==null){
sfNs=this[$sforceNs];
}
if(sobjNs==null){
sobjNs=this[$sobjectNs];
}
return this[$_invoke](method,args,isArray,sf_responder,nsMap,intServerUrl,sfNs,sobjNs);
},















"private function _invoke",function(method,args,isArray,responder,namespaces,url,headerNs,sobjectNs){
var writer=new com.salesforce.XmlWriter();
writer.startEnvelope();
this[$writeHeader](writer,headerNs);
writer.startBody();
writer.writeStartElement(method);

for(var n in namespaces){
writer.writeNamespace(namespaces[n].ns,namespaces[n].prefix);
}

for(var i=0;i<args.length;i++){
var arg=args[i];
if(arg.value===null){
throw"arg "+i+" '"+arg.name+"' not specified";
}
if(is(arg.value,Array)){
for(var j=0;j<arg.value.length;j++){
var obj=arg.value[j];
if(!obj){
throw"Array element at "+j+" is null.";
}
this[$writeOne](writer,arg.name,obj,sobjectNs);
}
}else{
this[$writeOne](writer,arg.name,arg.value,sobjectNs);
}
}

writer.writeEndElement(method);
writer.endBody();
writer.endEnvelope();

var transport=new com.salesforce.Transport();
transport.addEventListener(com.salesforce.events.SendEvent.SEND_REQUEST,$$bound(this,$sendRequestHandler));


var trans=mx.utils.URLUtil.getProtocol(this.serverUrl);
var server=mx.utils.URLUtil.getServerName(this.serverUrl);

var thisUrl;
if(url!=this.serverUrl){
thisUrl=url;
}else{
thisUrl=this.serverUrl;
}

if(this.isLoggedIn){
transport.url=thisUrl;
}else{
transport.url=thisUrl;
}

com.salesforce.Util.debug(this,"transport.url = "+transport.url);

transport.send(writer,responder);
},









"private function writeOne",function(writer,name,value,sobjectNs){
if(is(value,com.salesforce.objects.SObject)||is(value,com.salesforce.objects.SingleEmailMessage)||is(value,com.salesforce.objects.LeadConvert))
{
value.toXml(sobjectNs,name,writer);
}else{
writer.writeNameValueNode(name,value);
}
},





"private function sendRequestHandler",function(event){
this.dispatchEvent(event);
},





"private function resultHandler",function(event){
this.dispatchEvent(event);
},





"private function faultHandler",function(event){
this.dispatchEvent(event);
},
];},[],["flash.events.EventDispatcher","mx.utils.URLUtil","com.salesforce.Util","flash.system.Security","com.salesforce.AsyncResponder","com.salesforce.results.LoginResult","com.salesforce.objects.Parameter","Array","com.salesforce.SalesForceResponder","com.salesforce.XmlWriter","com.salesforce.Transport","com.salesforce.events.SendEvent","com.salesforce.objects.SObject","com.salesforce.objects.SingleEmailMessage","com.salesforce.objects.LeadConvert"]
);