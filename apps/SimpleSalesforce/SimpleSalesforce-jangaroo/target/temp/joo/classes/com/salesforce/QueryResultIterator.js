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