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