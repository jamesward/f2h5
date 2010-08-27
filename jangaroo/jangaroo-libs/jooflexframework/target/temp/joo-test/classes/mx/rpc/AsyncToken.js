joo.classLoader.prepare(










"package mx.rpc",




































"public dynamic class AsyncToken extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_message=$$l+'_message',$_responders=$$l+'_responders',$_result=$$l+'_result';return[

















"public function AsyncToken",function(message)
{if(arguments.length<1){message=null;}
this[$super]();
this[$_message]=message;
},











"private var",{_message: undefined},









"public function get message",function()
{
return this[$_message];
},




"public function setMessage",function(message)
{
this[$_message]=message;
},








"private var",{_responders: undefined},





















"public function get responders",function()
{
return this[$_responders];
},





"private var",{_result: undefined},













"public function get result",function()
{
return this[$_result];
},





















"public function addResponder",function(responder)
{
if(this[$_responders]==null)
this[$_responders]=[];

this[$_responders].push(responder);
},










"public function hasResponder",function()
{
return(this[$_responders]!=null&&this[$_responders].length>0);
},




"public function applyFault",function(event)
{
if(this[$_responders]!=null)
{
for(var i=0;i<this[$_responders].length;i++)
{
var responder=this[$_responders][i];
if(responder!=null)
{
responder.fault(event);
}
}
}
},




"public function applyResult",function(event)
{
this.setResult(event.result);

if(this[$_responders]!=null)
{
for(var i=0;i<this[$_responders].length;i++)
{
var responder=this[$_responders][i];
if(responder!=null)
{
responder.result(event);
}
}
}
},




"public function setResult",function(newResult)
{
if(this[$_result]!==newResult)
{
var event=mx.events.PropertyChangeEvent.createUpdateEvent(this,"result",this[$_result],newResult);
this[$_result]=newResult;
this.dispatchEvent(event);
}
},
];},[],["flash.events.EventDispatcher","mx.events.PropertyChangeEvent"]
);