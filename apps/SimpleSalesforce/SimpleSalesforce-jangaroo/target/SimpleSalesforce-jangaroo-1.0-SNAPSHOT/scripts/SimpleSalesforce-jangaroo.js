// class com.salesforce.results.QueryResult
joo.classLoader.prepare(


























"package com.salesforce.results",
















"public dynamic class QueryResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy);},




"public function QueryResult",function(result){this[$super]();

for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(i=="records"){


var records=val;
var sobjects=new mx.collections.ArrayCollection(null);


if(records==null){
records=new mx.collections.ArrayCollection();
records.addItem(val);
}
for(var x=0;x<records.length;x++){

sobjects.addItem(records[x]);
}
this[i]=sobjects;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy"]
);
// class com.salesforce.results.SearchResult
joo.classLoader.prepare(


























"package com.salesforce.results",















"public dynamic class SearchResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{searchRecords: undefined},

"public function SearchResult",function(result){this[$super]();

for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(i=="searchRecords"){


var records=val;
var sobjects=new mx.collections.ArrayCollection(null);


if(records==null){
records=new mx.collections.ArrayCollection();
records.addItem(val);
}
for(var x=0;x<records.length;x++){
sobjects.addItem(new com.salesforce.objects.SObject(records[x]));
}
this[i]=sobjects;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","com.salesforce.objects.SObject","mx.utils.ObjectProxy"]
);
// class com.salesforce.results.UpdatedResponse
joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class UpdatedResponse",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,Array);},



"public function UpdatedResponse",function(obj){this[$super]();
var val=obj[key];
for(var key in obj){
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(val);
}else{
for(var i=0;i<(val).length;i++){
this[key].push((val)[i]);
}
}

}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","Array"]
);
// class com.salesforce.results.DescribeLayoutItem
joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class DescribeLayoutItem",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeLayoutComponent,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{editable: undefined},

"public var",{layoutComponents: undefined},

"public function DescribeLayoutItem",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layoutComponents"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutComponent(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutComponent((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutComponent"]
);
// class com.salesforce.results.GetServerTimestampResult
joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class GetServerTimestampResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{timestamp:null},

"public function GetServerTimestampResult",function(obj){this[$super]();
this.timestamp=obj.timestamp;
},
"public function toDate",function(){
return com.salesforce.Util.stringToDateTime(this.timestamp);
},

];},[],["com.salesforce.Util"]
);
// class com.salesforce.results.DescribeLayout
joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class DescribeLayout",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RelatedList,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutSection);},

"public var",{detailLayoutSections: undefined},
"public var",{editLayoutSections: undefined},
"public var",{relatedLists: undefined},

"public function DescribeLayout",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){

if(key=="detailLayoutSections"||key=="editLayoutSections"){
this[key]=new mx.collections.ArrayCollection();
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutSection((val)[i]));
}
}else if(key=="relatedLists"){
this[key]=new mx.collections.ArrayCollection();
for(var i2=0;i2<(val).length;i2++){
this[key].addItem(new com.salesforce.results.RelatedList((val)[i2]));
}
}else{
this[key]=val;
}

}else{this[key]=val;}

}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutSection","com.salesforce.results.RelatedList"]
);
// class com.salesforce.results.RelatedList
joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class RelatedList",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RelatedListColumn,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.RelatedListSort);},

"public var",{columns: undefined},

"public function RelatedList",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){
if(key=="columns"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.RelatedListColumn(val));
}else{
for(var i1=0;i1<(val).length;i1++){
this[key].addItem(new com.salesforce.results.RelatedListColumn((val)[i1]));
}
}
}else if(key=="sort"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.RelatedListSort(val));
}else{
for(var i2=0;i2<(val).length;i2++){
this[key].addItem(new com.salesforce.results.RelatedListSort((val)[i2]));
}
}
}
}else{
this[key]=val;
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.RelatedListColumn","com.salesforce.results.RelatedListSort"]
);
// class com.salesforce.results.DescribeSObjectResult
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
// class com.salesforce.results.LoginResult
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
// class com.salesforce.results.ChildRelationship
joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class ChildRelationship",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{cascadeDelete: undefined},
"public var",{childSObject: undefined},
"public var",{field: undefined},

"public function ChildRelationship",function(obj){this[$super]();
for(var key in obj){
this[key]=obj[key];
}
},
];},[],[]
);
// class com.salesforce.results.PickListEntry
joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class PickListEntry",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public function PickListEntry",function(obj){this[$super]();
for(var key in obj){
this[key]=obj[key];
}
},
];},[],[]
);
// class com.salesforce.results.DescribeLayoutSection
joo.classLoader.prepare(


























"package com.salesforce.results",























"public dynamic class DescribeLayoutSection",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutRow);},

"public var",{layoutRows: undefined},
"public var",{useHeading: undefined},
"public var",{heading: undefined},
"public var",{rows: undefined},
"public var",{useCollapsibleSection: undefined},


"public function DescribeLayoutSection",function(result){this[$super]();
for(var key in result){
var val=result[key];

if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){

if(key=="layoutRows"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutRow(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutRow((val)[i]));
}
}
}
}else{
this[key]=val;
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutRow"]
);
// class com.salesforce.results.UpsertResult
joo.classLoader.prepare(


























"package com.salesforce.results",








"public dynamic class UpsertResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.utils.ObjectProxy,Array,com.salesforce.results.Error);},

"public function UpsertResult",function(obj)
{this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="errors"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.Error(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.Error((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.Error"]
);
// class com.salesforce.results.UserInfo
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
// class com.salesforce.results.PicklistForRecordType
joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class PicklistForRecordType",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.PickListEntry,mx.utils.ObjectProxy,Array);},

"public function PicklistForRecordType",function(result){this[$super]();
for(var key in result){
var val=result[key];
if(key=="picklistValues"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.PickListEntry(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.PickListEntry((val)[i]));
}
}
}else{
this[key]=val;
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.PickListEntry"]
);
// class com.salesforce.results.DescribeLayoutComponent
joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class DescribeLayoutComponent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function DescribeLayoutComponent",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
this[key]=val;
}
},
];},[],[]
);
// class com.salesforce.results.DescribeTabSetResult
joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class DescribeTabSetResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeTab,mx.utils.ObjectProxy,Array);},

"public var",{label: undefined},
"public var",{namespace: undefined},
"public var",{logoUrl: undefined},
"public var",{selected: undefined},
"public var",{tabs: undefined},

"public function DescribeTabSetResult",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="tabs"){
this.tabs=new Array();
if(is(val,mx.utils.ObjectProxy)){
this.tabs.push(new com.salesforce.results.DescribeTab(val));
}else{
for(var i=0;i<(val).length;i++){
this.tabs.push(new com.salesforce.results.DescribeTab((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.DescribeTab"]
);
// class com.salesforce.results.DescribeLayoutRow
joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class DescribeLayoutRow",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeLayoutItem,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{layoutItems: undefined},
"public var",{numItems: undefined},

"public function DescribeLayoutRow",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layoutItems"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutItem(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutItem((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutItem"]
);
// class com.salesforce.results.RecordTypeInfo
joo.classLoader.prepare(


























"package com.salesforce.results",



"public dynamic class RecordTypeInfo",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.utils.ObjectProxy);},

"public function RecordTypeInfo",function(obj){this[$super]();
for(var key in obj){
if(is(obj[key],mx.utils.ObjectProxy)){

this[key]=obj[key];
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.utils.ObjectProxy"]
);
// class com.salesforce.results.SaveResult
joo.classLoader.prepare(


























"package com.salesforce.results",











"public dynamic class SaveResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.Error);},

"public function SaveResult",function(result){this[$super]();
for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(is(val,mx.collections.ArrayCollection)){


var records=val;
var errors=new mx.collections.ArrayCollection(null);
for(var x=0;x<records.length;x++){
errors.addItem(new com.salesforce.results.Error(records[x]));
}
this[i]=errors;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}else{
if(i=="errors"){
this[i]=new com.salesforce.results.Error(val);
}
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","com.salesforce.results.Error","mx.utils.ObjectProxy"]
);
// class com.salesforce.results.DescribeLayoutResult
joo.classLoader.prepare(


























"package com.salesforce.results",































"public dynamic class DescribeLayoutResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$i=$$l+'i';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.RecordTypeMapping,com.salesforce.results.DescribeLayout);},

"public var",{layouts: undefined},
"public var",{recordTypeMappings: undefined},
"private var",{i: undefined},

"public function DescribeLayoutResult",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layouts"){
this.layouts=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this.layouts.addItem(new com.salesforce.results.DescribeLayout(val));
}else{
for(this[$i]=0;this[$i]<(val).length;this[$i]++){
this.layouts.addItem(new com.salesforce.results.DescribeLayout((val)[this[$i]]));
}
}
}else if(key=="recordTypeMappings"){
this.recordTypeMappings=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this.recordTypeMappings.addItem(new com.salesforce.results.RecordTypeMapping(val));
}else{
for(this[$i]=0;this[$i]<(val).length;this[$i]++){
this.recordTypeMappings.addItem(new com.salesforce.results.RecordTypeMapping((val)[this[$i]]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayout","com.salesforce.results.RecordTypeMapping"]


































);
// class com.salesforce.results.RelatedListColumn
joo.classLoader.prepare(


























"package com.salesforce.results",




"public class RelatedListColumn",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{name: undefined},
"public var",{label: undefined},
"public var",{format: undefined},
"public var",{field: undefined},

"public function RelatedListColumn",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
this[key]=val;
}
},
];},[],[]
);
// class com.salesforce.results.Error
joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{StatusCode: undefined},
"public var",{message: undefined},
"public var",{fields: undefined},

"public function Error",function(result)
{this[$super]();
for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(is(val,mx.collections.ArrayCollection)){


var records=val;
var fields=new mx.collections.ArrayCollection(null);
for(var x=0;x<records.length;x++){
fields.addItem(records[x]);
}
this[i]=fields;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy"]
);
// class com.salesforce.results.RecordTypeMapping
joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class RecordTypeMapping",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,Array,com.salesforce.results.PicklistForRecordType);},

"public function RecordTypeMapping",function(result){this[$super]();
for(var key in result){
var val=result[key];
if(key=="picklistsForRecordType"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.PicklistForRecordType(val));
}else if(is(val,mx.collections.ArrayCollection)){
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.PicklistForRecordType((val)[i]));
}
}

}else{
this[key]=val;
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.PicklistForRecordType","mx.collections.ArrayCollection"]
);
// class com.salesforce.results.ProcessRequest
joo.classLoader.prepare(


























"package com.salesforce.results",








"public class ProcessRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function ProcessRequest",function(o){this[$super]();
throw('not implemented');
},
];},[],[]
);
// class com.salesforce.results.RelatedListSort
joo.classLoader.prepare(


























"package com.salesforce.results",




"public class RelatedListSort",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{column: undefined},
"public var",{ascending: undefined},

"public function RelatedListSort",function(obj){this[$super]();
this.column=obj.column;
this.ascending=obj.ascending;
},
];},[],[]
);
// class com.salesforce.results.DeletedRecord
joo.classLoader.prepare(


























"package com.salesforce.results",




"public class DeletedRecord",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{deletedDate: undefined},
"public var",{id: undefined},
"public function DeletedRecord",function(obj){this[$super]();
this.deletedDate=obj.deletedDate;
this.id=obj.id;
},
];},[],[]
);
// class com.salesforce.results.DeletedResponse
joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class DeletedResponse",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,com.salesforce.results.DeletedRecord);},

"public var",{earliestDateAvailable: undefined},
"public var",{latestDateCovered: undefined},
"public var",{deletedRecords: undefined},


"public function DeletedResponse",function(obj){this[$super]();
this.latestDateCovered=obj.latestDateCovered;
this.earliestDateAvailable=obj.earliestDateAvailable;
this.deletedRecords=new mx.collections.ArrayCollection();
if(obj.deletedRecords&&obj.deletedRecords.length>0){
for(var i=0;i<obj.deletedRecords.length;i++){
this.deletedRecords.addItem(new com.salesforce.results.DeletedRecord(obj.deletedRecords[i]));
}
}
},
];},[],["mx.collections.ArrayCollection","com.salesforce.results.DeletedRecord"]
);
// class com.salesforce.results.Field
joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class Field",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.PickListEntry,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{type: undefined},
"public var",{updateable: undefined},
"public var",{soapType: undefined},
"public var",{name: undefined},
"public var",{length: undefined},
"public var",{label: undefined},
"public var",{custom: undefined},
"public var",{autoNumber: undefined},
"public var",{createable: undefined},
"public var",{picklistValues: undefined},
"public var",{referenceTo: undefined},

"public function Field",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="picklistValues"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.PickListEntry(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.PickListEntry((val)[i]));
}
}
}
else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.PickListEntry"]
);
// class com.salesforce.results.DescribeTab
joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class DescribeTab",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{custom: undefined},
"public var",{label: undefined},
"public var",{namespace: undefined},
"public var",{sobjectName: undefined},
"public var",{url: undefined},

"public function DescribeTab",function(obj){this[$super]();
this.custom=obj.custom;
this.label=obj.label;
this.namespace=obj.namespace;
this.sobjectName=obj.sobjectName;
this.url=obj.url;
},
];},[],[]
);
// class com.salesforce.results.SendEmailResult
joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class SendEmailResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection);},

"public var",{success: undefined},
"public var",{Error: undefined},

"public function SendEmailResult",function(result){this[$super]();
for(var i in result){
var val=result[i];

if(is(val,mx.collections.ArrayCollection)){
this[i]=new mx.collections.ArrayCollection();
for(var x=0;x<val.length;x++){
this[i].addItem(val[x]);
}
}else{
this[i]=val;
}
}
},
];},[],["mx.collections.ArrayCollection"]
);
// class com.salesforce.results.Fault
joo.classLoader.prepare(



























"package com.salesforce.results",















"public dynamic class Fault",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{faultcode: undefined},
"public var",{faultstring: undefined},
"public var",{detail: undefined},

"public function Fault",function(result)
{this[$super]();
for(var i in result){
var val=result[i];



this[i]=val;
}
},

















];},[],[]
);
// class com.salesforce.QueryResultIterator
joo.classLoader.prepare(


























"package com.salesforce",





























"public class QueryResultIterator",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_soql=$$l+'_soql',$_foreach=$$l+'_foreach',$_connection=$$l+'_connection',$_qr=$$l+'_qr',$_index=$$l+'_index',$queryMoreProcessBatch=$$l+'queryMoreProcessBatch',$sendQueryComplete=$$l+'sendQueryComplete',$genericFault=$$l+'genericFault';return[function(){joo.classLoader.init(com.salesforce.events.QueryEvent,Function,com.salesforce.AsyncResponder);},







"private var",{_soql: undefined},
"private var",{_foreach: undefined},
"private var",{_connection: undefined},
"private var",{_qr:null},
"private var",{_index: undefined},

"public function QueryResultIterator",function(apexConnection,soql,forEachSobject){if(arguments.length<3){if(arguments.length<2){soql="";}forEachSobject=null;}this[$super]();
this[$_soql]=soql;
this[$_connection]=apexConnection;
this[$_index]=0;

if(forEachSobject!=null){
this.forEach(forEachSobject);
}
},
"public function set soql",function(s){this[$_soql]=s;},
"public function get soql",function(){return this[$_soql];},

"public function queryResult",function(){return this[$_qr];},
"public function lastSobject",function(){
return(this[$_qr].done&&this[$_index]==this[$_qr].records.length-1);
},

"public function forEach",function(forEachSobject){
if(forEachSobject==null||!(is(forEachSobject,Function)))throw('forEach expected function argument');
if(this[$_soql]=="")throw("empty SOQL statement on this object");

this[$_foreach]=forEachSobject;
this[$_connection].addEventListener(com.salesforce.events.QueryEvent.QUERY_EVENT,$$bound(this,$queryMoreProcessBatch));
this[$_connection].query(this[$_soql],new com.salesforce.AsyncResponder($$bound(this,$sendQueryComplete),$$bound(this,$genericFault)));
},


"private function queryMoreProcessBatch",function(event){
this[$_qr]=event.queryResult;
var userDone=false;

if(this[$_qr].size>0){
for(this[$_index]=0;this[$_index]<this[$_qr].records.length;this[$_index]++){

if(!this[$_foreach](this[$_qr].records[this[$_index]])){
userDone=true;
break;
}
}
}










if(userDone==false&&this[$_qr].done==false){
this[$_connection].queryMore(this[$_qr].queryLocator,new com.salesforce.AsyncResponder($$bound(this,$sendQueryComplete),$$bound(this,$genericFault)));
}else{
this[$_connection].removeEventListener(com.salesforce.events.QueryEvent.QUERY_EVENT,$$bound(this,$queryMoreProcessBatch));
}
},

"private function sendQueryComplete",function(qr){this[$_connection].dispatchEvent(new com.salesforce.events.QueryEvent(com.salesforce.events.QueryEvent.QUERY_EVENT,qr));},
"private function genericFault",function(fault){throw('fault from operation query()/queryMore(): '+mx.utils.ObjectUtil.toString(fault));},

];},[],["Function","com.salesforce.events.QueryEvent","com.salesforce.AsyncResponder","mx.utils.ObjectUtil"]
);
// class com.salesforce.Connection
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
// class com.salesforce.SalesForceResponder
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
// class com.salesforce.AsyncResponder
joo.classLoader.prepare(


























"package com.salesforce",



















"public class AsyncResponder implements mx.rpc.IResponder",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_resultHandler=$$l+'_resultHandler',$_faultHandler=$$l+'_faultHandler',$_context=$$l+'_context',$defaultFault=$$l+'defaultFault';return[function(){joo.classLoader.init(mx.rpc.events.ResultEvent,mx.rpc.events.FaultEvent,Error);},

"private var",{_resultHandler: undefined},
"private var",{_faultHandler: undefined},
"private var",{_context: undefined},

"public function AsyncResponder",function(result,fault,context)
{if(arguments.length<3){if(arguments.length<2){fault=null;}context=null;}
this[$super]();
this[$_resultHandler]=result;
if(fault==null){
fault=$$bound(this,$defaultFault);
}
this[$_faultHandler]=fault;
this[$_context]=context;
},
"public function get resultHandler",function(){
return this[$_resultHandler];
},
"public function get faultHandler",function(){
return this[$_faultHandler];
},
"public function set context",function(value){
this[$_context]=this.context;
},
"public function get context",function(){
return this[$_context];
},
"public function result",function(data)
{
if(is(data,mx.rpc.events.ResultEvent))
{
var res=(data).result;
res.context=this[$_context];
this[$_resultHandler]((data).result);
}
else
{
try{data.context=this[$_context];}catch(e){if(is(e,Error)){}else throw e;}
this[$_resultHandler](data);
}
},

"public function fault",function(data)
{
if(is(data,mx.rpc.events.FaultEvent))
{
this[$_faultHandler]((data).fault);
}
else
{
this[$_faultHandler](data);
}
},

"private function defaultFault",function(fault){

},
];},[],["mx.rpc.IResponder","mx.rpc.events.ResultEvent","Error","mx.rpc.events.FaultEvent"]
);
// class com.salesforce.Util
joo.classLoader.prepare(


























"package com.salesforce",










"public class Util",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Date,Number,String,com.salesforce.events.DebugEvent);},

"public static const",{millisecondsPerMinute:1000*60},
"public static const",{millisecondsPerHour:1000*60*60},
"public static const",{millisecondsPerDay:1000*60*60*24},












"public static function dateToString",function(theDate){

var today=theDate;
var year=today.getFullYear();
var month=today.getMonth()+1;
var day=today.getDate();
var monthString=new String();
var dayString=new String();

if(month<=9)
{
monthString="0"+month;
}
else
{
monthString=month.toString();
}

if(day<=9)
{
dayString="0"+day;
}
else
{
dayString=day.toString();
}
return year+"-"+monthString+"-"+dayString;
},
"public static function debug",function(obj,message){
obj.dispatchEvent(new com.salesforce.events.DebugEvent(com.salesforce.events.DebugEvent.DEBUG_EVENT,message));
},



"public static function dateTimeToString",function(theDate)
{
var today=theDate;
var year=today.getFullYear();
var month=today.getMonth()+1;
var day=today.getDate();
var hour=today.getHours();
var hourUTC=today.getUTCHours();
var diff=hour-hourUTC;

if(diff>12)
{
diff=diff-24;
}

var hourdifference=Math.abs(diff);
var minute=today.getMinutes();
var minuteUTC=today.getUTCMinutes();
var minutedifference=Math.abs(minute-minuteUTC);
var second=today.getSeconds();

var secondString=new String();
var monthString=new String();
var dayString=new String();
var hourString=new String();
var minuteString=new String();
var minutedifferenceString=new String();

if(second<=9)
{
secondString="0"+second.toString();
}
else
{
secondString=second.toString();
}

var milli=today.getMilliseconds().toString();

if(milli!="0")
{
milli="."+milli;
if(milli.length>4)
{
milli=milli.substring(0,4);
}
secondString=secondString+milli;
}

var timezone;
var pm;

if(hourdifference+minutedifference===0)
{
timezone="Z";
}
else
{
if(diff>0)
{
pm="+";
}
else
{
pm="-";
}

if(minutedifference<10)
{
minutedifferenceString="0"+minutedifference.toString();
}
else
{
minutedifferenceString=minutedifference.toString();
}

if(hourdifference<10)
{
timezone=pm+"0"+hourdifference+":"+minutedifferenceString;
}
else
{
timezone=pm+hourdifference+":"+minutedifferenceString;
}
}

if(month<=9)
{
monthString="0"+month;
}
else
{
monthString=month.toString();
}

if(day<=9)
{
dayString="0"+day;
}
else
{
dayString=day.toString();
}

if(hour<=9)
{
hourString="0"+hour;
}
else
{
hourString=hour.toString();
}

if(minute<=9)
{
minuteString="0"+minute;
}
else
{
minuteString=minute.toString();
}

return year+"-"+monthString+"-"+dayString+"T"+hourString+":"+minuteString+":"+secondString+timezone;
},


"public static function stringToDate",function(source)
{
var bc=false;
if(source===null||source.length===0){
throw"Unable to parse dateTime";
}

if(source.charAt(0)=='+'){
source=source.substring(1);
}

if(source.charAt(0)=='-'){
source=source.substring(1);
bc=true;
}





if(source.charAt(4)!='-'||source.charAt(7)!='-'){
throw("Unable to parse date");
}

var year=source.substring(0,4);
var month=source.substring(5,7);
var day=source.substring(8,10);
var date=new Date(year,month,day);
date.setFullYear(year);
date.setDate(day);
var m=new Number(month);
m=m-1;
date.setMonth(m.toString());







return date;
},


"public static function stringToDateTime",function(source)
{
var bc=false;
if(source===null||source.length===0){
throw"Unable to parse dateTime";
}

if(source.charAt(0)=='+'){
source=source.substring(1);
}
if(source.charAt(0)=='-'){
source=source.substring(1);
bc=true;
}

if(source.length<19){
throw("Unable to parse dateTime");
}

if(source.charAt(4)!='-'||source.charAt(7)!='-'||
source.charAt(10)!='T'){
throw("Unable to parse dateTime");
}

if(source.charAt(13)!=':'||source.charAt(16)!=':'){
throw("Unable to parse dateTime");
}

var date=new Date();
var year=source.substring(0,4);
var month=source.substring(5,7);
var day=source.substring(8,10);
var hour=source.substring(11,13);
var min=source.substring(14,16);
var sec=source.substring(17,19);

date.setFullYear(year);
date.setDate(day);
var xyz=new Number(month);
xyz=xyz-1;
var mmonth=new String(xyz);
date.setMonth(mmonth);
date.setHours(hour);
date.setMinutes(min);
date.setSeconds(sec);

var pos=19;


if(pos<source.length&&source.charAt(pos)=='.'){
var milliseconds=0;
var start=++pos;
while(pos<source.length&&$$private.isDigit(source.charAt(pos))){
pos++;
}
var decimal=source.substring(start,pos);
if(decimal.length==3){
milliseconds=decimal;
}else if(decimal.length<3){
milliseconds=((decimal+"000").substring(0,3));
}else{
milliseconds=decimal.substring(0,3);
if(decimal.charAt(3)>='5'){
milliseconds++;;
}
}

date.setMilliseconds(milliseconds.toString());
}

var offset=date.getTimezoneOffset()*60000;



if(pos+5<source.length&&
(source.charAt(pos)=='+'||(source.charAt(pos)=='-'))){
if(!$$private.isDigit(source.charAt(pos+1))||
!$$private.isDigit(source.charAt(pos+2))||
source.charAt(pos+3)!=':'||
!$$private.isDigit(source.charAt(pos+4))||
!$$private.isDigit(source.charAt(pos+5))){
throw"Unable to parse dateTime";
}
var hours=(new Number(source.charAt(pos+1)))*10+(new Number(source.charAt(pos+2)));
var mins=(new Number(source.charAt(pos+4)))*10+(new Number(source.charAt(pos+5)));
var mseconds=(hours*60+mins)*60*1000;


if(source.charAt(pos)=='+'){
mseconds=-mseconds;
}

date=new Date(date.getTime()-offset+mseconds);
pos+=6;
}

if(pos<source.length&&source.charAt(pos)=='Z'){
pos++;
date=new Date(date.getTime()-offset);
}





return date;
},


"private static function isDigit",function(ch)
{

if(ch=='0'||ch=='1'||ch=='2'||ch=='3'||ch=='4'||
ch=='5'||ch=='6'||ch=='7'||ch=='8'||ch=='9'){
return true;
}else{
return false;
}
},

];},["dateToString","debug","dateTimeToString","stringToDate","stringToDateTime"],["String","com.salesforce.events.DebugEvent","Math","Date","Number"]
);
// class com.salesforce.Transport
joo.classLoader.prepare(


























"package com.salesforce",



















"public class Transport extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$connection=$$l+'connection',$responder=$$l+'responder',$newConnection=$$l+'newConnection',$handleComplete=$$l+'handleComplete',$parseXML=$$l+'parseXML';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent,flash.net.URLRequestMethod,flash.net.URLRequestHeader,mx.collections.ArrayCollection,Array,flash.events.Event,flash.net.URLLoader,Object,flash.net.URLRequest);},


"public var",{url: undefined},
"private var",{connection: undefined},
"private var",{responder: undefined},


"public function Transport",function(url)
{if(arguments.length<1){url=null;}this[$super]();
if(url!=null)
{
this.url=url;
}
},

"private function newConnection",function()
{
this[$connection]=new flash.net.URLLoader();
},

"public function send",function(envelope,responder)
{
this[$newConnection]();
this[$responder]=responder;
var request=new flash.net.URLRequest();

request.method=flash.net.URLRequestMethod.POST;
request.url=this.url;
request.contentType="text/xml; charset=UTF-8";










request.requestHeaders=new Array(
new flash.net.URLRequestHeader("SOAPAction","\"\""),
new flash.net.URLRequestHeader("Accept","text/xml"),
new flash.net.URLRequestHeader("X-Salesforce-No-500-SC","true")
);

request.data=envelope.toString();
this[$connection].dataFormat="xml";
this[$connection].addEventListener(flash.events.Event.COMPLETE,$$bound(this,$handleComplete));
this[$connection].load(request);






this.dispatchEvent(new com.salesforce.events.SendEvent(com.salesforce.events.SendEvent.SEND_REQUEST,envelope.toString()));
},

"public function myFault",function(event){
trace(event.toString());
},

"private function handleComplete",function(event)
{
if(this[$responder]!=null)
{
this[$responder].result({result:this[$parseXML](event.target.data)});
}
},

"private function parseXML",function(xml)
{

if(xml.nodeType==7)
{
return null;
}

var o=new Object();


if(xml.attributes!=null)
{
for(var i=0;i<xml.attributes.length;i++)
{
o[xml.attributes[i].localName]=xml.attributes[i].nodeValue;
}
}

if(xml.childNodes!=null)
{
var nameExists=new Object();
for(var j=0;j<xml.childNodes.length;j++)
{
var n=xml.childNodes[j].localName;
if((nameExists[n]!=undefined)&&(o[n]==undefined))
{
o[n]=new mx.collections.ArrayCollection();
}
else
{
nameExists[n]=true;
}
}

for(var k=0;k<xml.childNodes.length;k++)
{

if(xml.childNodes[k].nodeType==3||xml.childNodes[k].nodeType==4)
{
return xml.childNodes[k].nodeValue;
}

var ln=xml.childNodes[k].localName;

if(is(o[ln],mx.collections.ArrayCollection))
{
o[ln].addItem(this[$parseXML](xml.childNodes[k]));
}
else
{
o[ln]=this[$parseXML](xml.childNodes[k]);
}
}
}

return o;
},
];},[],["flash.events.EventDispatcher","flash.net.URLLoader","flash.net.URLRequest","flash.net.URLRequestMethod","Array","flash.net.URLRequestHeader","flash.events.Event","com.salesforce.events.SendEvent","Object","mx.collections.ArrayCollection"]
);
// class com.salesforce.objects.LeadConvert
joo.classLoader.prepare(


























"package com.salesforce.objects",












"public class LeadConvert extends mx.utils.ObjectProxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{accountId: undefined},
"public var",{contactId: undefined},
"public var",{convertedStatus: undefined},
"public var",{doNotCreateOpportunity: undefined},
"public var",{leadId: undefined},
"public var",{opportunityName: undefined},
"public var",{overwriteLeadSource: undefined},
"public var",{ownerId: undefined},
"public var",{sendNotificationEmail: undefined},

"public function LeadConvert",function(){
this[$super]();
},

"public function toXml",function(sobjectNs,name,writer)
{
writer.writeStartElement(name,sobjectNs);






















writer.writeEndElement(name,sobjectNs);
},
];},[],["mx.utils.ObjectProxy"]
);
// class com.salesforce.objects.Parameter
joo.classLoader.prepare(


























"package com.salesforce.objects",






"public class Parameter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{name: undefined},
"public var",{value: undefined},
"public var",{isArray: undefined},

"public function Parameter",function(name,value,isArray)
{if(arguments.length<3){isArray=false;}this[$super]();
this.name=name;
this.value=value;
this.isArray=isArray;
},
];},[],[]
);
// class com.salesforce.objects.ProcessWorkitemRequest
joo.classLoader.prepare(


























"package com.salesforce.objects",









"public class ProcessWorkitemRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function ProcessWorkitemRequest",function(o){this[$super]();
throw('not implemented');

},
];},[],[]
);
// class com.salesforce.objects.LoginRequest
joo.classLoader.prepare(


























"package com.salesforce.objects",



"public class LoginRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{session_id: undefined},
"public var",{server_url: undefined},
"public var",{username: undefined},
"public var",{password: undefined},
"public var",{callback: undefined},








"public function LoginRequest",function(obj){if(arguments.length<1){obj=null;}this[$super]();
for(var key in obj){
var val=obj[key];
this[key]=val;
}
},
];},[],[]
);
// class com.salesforce.objects.ProcessSubmitRequest
joo.classLoader.prepare(


























"package com.salesforce.objects",









"public class ProcessSubmitRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function ProcessSubmitRequest",function(o){this[$super]();
throw('not implemented');
},
];},[],[]
);
// class com.salesforce.objects.Base64
joo.classLoader.prepare(






































"package com.salesforce.objects",




"public class Base64",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.utils.ByteArray,Error);},


"private static const",{KEY_STR:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},


"public static function encode",function(input)
{
var output="";
var chr1,chr2,chr3;
var enc1,enc2,enc3,enc4;
var i=0;
var length=input.length;
do{
chr1=input.charCodeAt(i++);
chr2=input.charCodeAt(i++);
chr3=input.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2))
{
enc3=enc4=64;
}
else if(isNaN(chr3))
{
enc4=64;
}
output+=$$private.KEY_STR.charAt(enc1)+$$private.KEY_STR.charAt(enc2)+$$private.KEY_STR.charAt(enc3)+$$private.KEY_STR.charAt(enc4);
}while(i<length);
return output;
},




"public static function decode",function(input)
{
var output=new flash.utils.ByteArray();
var chr1,chr2,chr3;
var enc1,enc2,enc3,enc4;
var i=0;
var length=input.length;


var base64test=/[^A-Za-z0-9\+\/\=]/g;
if(base64test.exec(input))
{
throw new Error("There were invalid base64 characters in the input text.\n"+
"Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n"+
"Expect errors in decoding.");
}
input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");

do{
enc1=$$private.KEY_STR.indexOf(input.charAt(i++));
enc2=$$private.KEY_STR.indexOf(input.charAt(i++));
enc3=$$private.KEY_STR.indexOf(input.charAt(i++));
enc4=$$private.KEY_STR.indexOf(input.charAt(i++));

chr1=(enc1<<2)|(enc2>>4);
chr2=((enc2&15)<<4)|(enc3>>2);
chr3=((enc3&3)<<6)|enc4;

output.writeByte(chr1);

if(enc3!=64)
{
output.writeByte(chr2);
}
if(enc4!=64)
{
output.writeByte(chr3);
}

}while(i<length);

return output;
},
];},["encode","decode"],["flash.utils.ByteArray","Error"]
);
// class com.salesforce.objects.BaseEmail
joo.classLoader.prepare(


























"package com.salesforce.objects",














"public class BaseEmail",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{bccSender: undefined},
"public var",{saveAsActivity: undefined},
"public var",{useSignature: undefined},
"public var",{emailPriority: undefined},
"public var",{replyTo: undefined},
"public var",{subject: undefined},






"public function BaseEmail",function(obj){this[$super]();
},

];},[],[]
);
// class com.salesforce.objects.SObject
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
// class com.salesforce.objects.MergeRequest
joo.classLoader.prepare(


























"package com.salesforce.objects",










"public class MergeRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function MergeRequest",function(){this[$super]();
throw('not implemented');
},
];},[],[]
);
// class com.salesforce.objects.SingleEmailMessage
joo.classLoader.prepare(


























"package com.salesforce.objects",




















"public dynamic class SingleEmailMessage extends com.salesforce.objects.BaseEmail",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{bccAddresses: undefined},
"public var",{toAddresses: undefined},
"public var",{ccAddresses: undefined},
"public var",{htmlBody: undefined},
"public var",{charset: undefined},
"public var",{plainTextBody: undefined},
"public var",{targetObjectId: undefined},

"public function SingleEmailMessage",function(obj){if(arguments.length<1){obj=null;}
this[$super](obj);
for(var key in obj){
this[key]=obj[key];
}
},






















"public function toXml",function(sobjectNs,name,writer)
{
writer.writeStartElement(name,sobjectNs);
writer.writeXsiType('SingleEmailMessage');






















writer.writeEndElement(name,sobjectNs);
},

];},[],["com.salesforce.objects.BaseEmail"]
);
// class com.salesforce.events.SendEvent
joo.classLoader.prepare(


























"package com.salesforce.events",









"public class SendEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function SendEvent",function(type,soapRequest){if(arguments.length<2){soapRequest="empty";}

this[$super](type);


this.soapRequest=soapRequest;
},


"public static const",{SEND_REQUEST:"sendRequest"},


"public var",{soapRequest: undefined},


"override public function clone",function(){
return new com.salesforce.events.SendEvent(this.type,this.soapRequest);
},

];},[],["flash.events.Event"]
);
// class com.salesforce.events.DebugEvent
joo.classLoader.prepare(


























"package com.salesforce.events",







"public class DebugEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent);},


"public function DebugEvent",function(type,debugString){if(arguments.length<2){debugString="empty";}

this[$super](type);


this.debugString=debugString;
},


"public static const",{DEBUG_EVENT:"debugEvent"},


"public var",{debugString: undefined},


"override public function clone",function(){
return new com.salesforce.events.SendEvent(this.type,this.debugString);
},
];},[],["flash.events.Event","com.salesforce.events.SendEvent"]
);
// class com.salesforce.events.NetworkStatusChangeEvent
joo.classLoader.prepare(


























"package com.salesforce.events",







"public class NetworkStatusChangeEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function NetworkStatusChangeEvent",function(type,connected){

this[$super](type);


this.connected=connected;
},


"public static const",{NETWORK_STATUS_CHANGE_EVENT:"networkStatusChanged"},


"public var",{connected: undefined},


"override public function clone",function(){
return new com.salesforce.events.NetworkStatusChangeEvent(this.type,this.connected);
},
];},[],["flash.events.Event"]
);
// class com.salesforce.events.QueryEvent
joo.classLoader.prepare(


























"package com.salesforce.events",














"public class QueryEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function QueryEvent",function(type,queryResult){

this[$super](type);


this.queryResult=queryResult;
},


"public static const",{QUERY_EVENT:"queryCompleteEvent"},


"public var",{queryResult: undefined},


"override public function clone",function(){
return new com.salesforce.events.QueryEvent(this.type,this.queryResult);
},
];},[],["flash.events.Event"]
);
// class com.salesforce.XmlWriter
joo.classLoader.prepare(


























"package com.salesforce",






"public class XmlWriter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$buffer=$$l+'buffer',$nspaces=$$l+'nspaces',$prefixCount=$$l+'prefixCount',$writingStartElement=$$l+'writingStartElement',$append=$$l+'append';return[function(){joo.classLoader.init(Date,String,Array,Boolean,Object);},

"private var",{buffer: undefined},
"private var",{nspaces: undefined},
"private var",{prefixCount:0},
"private var",{writingStartElement: undefined},

"private static var",{soapNS:"http://schemas.xmlsoap.org/soap/envelope/"},

"public function XmlWriter",function()
{this[$super]();
this[$buffer]=new String("");
this[$nspaces]=new Object();
this[$prefixCount]=0;
this[$writingStartElement]=false;
},

"public function writeStartElement",function(name,nspace,prefix)
{if(arguments.length<3){if(arguments.length<2){nspace=null;}prefix=null;}
if(this[$writingStartElement]){
this[$append](">");
}
this[$append]("<");
var newns=false;
if(nspace){
if(!this[$nspaces][nspace]&&this[$nspaces][nspace]!==""){
newns=true;
}
if(!prefix){
prefix=this.getPrefix(nspace);
}
if(prefix!==null&&prefix!==""){
this[$append](prefix);
this[$append](":");
}
}

this[$append](name);
if(newns===true){
this.writeNamespace(nspace,prefix);
}
this[$writingStartElement]=true;
},

"public function writeEndElement",function(name,nspace)
{if(arguments.length<2){nspace=null;}
if(this[$writingStartElement]){
this[$append]("/>");
}else{
this[$append]("</");
if(nspace){
var prefix=this.getPrefix(nspace);
if(prefix&&prefix!==""){
this[$append](prefix);
this[$append](":");
}
}
this[$append](name);
this[$append](">");
}
this[$writingStartElement]=false;
},

"public function writeNamespace",function(nspace,prefix)
{
if(prefix&&""!==prefix){
this[$nspaces][nspace]=prefix;
this[$append](" ");
this[$append]("xmlns:");
this[$append](prefix);
}else{
this[$nspaces][nspace]="";
this[$append](" ");
this[$append]("xmlns");
}
this[$append]("=\"");
this[$append](nspace);
this[$append]("\"");
},

"public function writeText",function(text)
{
if(this[$writingStartElement]){
this[$append](">");
this[$writingStartElement]=false;
}else{
throw"Can only write text after a start element";
}
if(typeof text=='string'){
text=text.replace(/&/g,'&amp;');
text=text.replace(/</g,'&lt;');
text=text.replace(/>/g,'&gt;');
}

this[$append](text);
},

"public function writeXsiType",function(xsiType)
{
this.writeNamespace("http://www.w3.org/2001/XMLSchema-instance","xsi");
this.writeAttribute("xsi:type",xsiType);
},

"public function writeAttribute",function(name,value)
{
this[$append](" "+name+"=\""+value+"\"");
},

"public function getPrefix",function(nspace)
{
var prefix=this[$nspaces][nspace];


if(!prefix&&prefix!==""){
prefix="ns"+this[$prefixCount];
this[$prefixCount]++;
this[$nspaces][nspace]=prefix;
return prefix;
}
return prefix;
},

"public function toString",function()
{
return this[$buffer];
},


"public function startEnvelope",function()
{
this.writeStartElement("Envelope",$$private.soapNS,"se");
},

"public function endEnvelope",function()
{
this.writeEndElement("Envelope",$$private.soapNS);
},

"public function startHeader",function()
{
this.writeStartElement("Header",$$private.soapNS,"se");
},

"public function endHeader",function()
{
this.writeEndElement("Header",$$private.soapNS);
},

"public function startBody",function()
{
this.writeStartElement("Body",$$private.soapNS,"se");
},

"public function endBody",function()
{
this.writeEndElement("Body",$$private.soapNS);
},

"public function writeNameValueNode",function(name,value)
{

if(is(value,Date))
{
this.writeStartElement(name);
this.writeText(com.salesforce.Util.dateTimeToString(value));
this.writeEndElement(name);
}
else if(is(value,Boolean))
{


var textValue=value?"true":"false";
this.writeStartElement(name);
this.writeText(textValue);
this.writeEndElement(name);
}
else if(value&&(is(value,Array)))
{
for(var v in value)
{
this.writeStartElement(name);
this.writeText(value[v]);
this.writeEndElement(name);
}
}
else
{
this.writeStartElement(name);
this.writeText(value.toString());
this.writeEndElement(name);
}
},




"private function append",function(s)
{
this[$buffer]=this[$buffer].concat(s);
},

];},[],["String","Object","Date","com.salesforce.Util","Boolean","Array"]
);
// class SimpleSalesforce
joo.classLoader.prepare("package",












"public class SimpleSalesforce extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$loginSuccess=$$l+'loginSuccess',$querySuccess=$$l+'querySuccess';return[function(){joo.classLoader.init(com.salesforce.objects.LoginRequest,flash.text.TextField,com.salesforce.Connection,com.salesforce.AsyncResponder);},


"var",{con: undefined},

"public function SimpleSalesforce",function()
{this[$super]();
this.con=new com.salesforce.Connection();
this.con.serverUrl="https://localhost/services/Soap/u/9.0";

var lr=new com.salesforce.objects.LoginRequest();
lr.username="dev@mavericks.demo";
lr.password="123456";
lr.callback=new com.salesforce.AsyncResponder($$bound(this,$loginSuccess));

this.con.login(lr);
},

"private function loginSuccess",function(result)
{
this.con.query("SELECT Id, FirstName, LastName FROM Contact",new com.salesforce.AsyncResponder($$bound(this,$querySuccess)));
},

"private function querySuccess",function(result)
{
for(var i=0;i<result.size;i++)
{
var tf=new flash.text.TextField();
tf.y=i*15;
tf.text=result.records[i].FirstName+" "+result.records[i].LastName;
this.addChild(tf);
}
},
];},[],["flash.display.Sprite","com.salesforce.Connection","com.salesforce.objects.LoginRequest","com.salesforce.AsyncResponder","flash.text.TextField"]
);
