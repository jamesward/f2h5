joo.classLoader.prepare(










"package mx.rpc.events",



















"public class FaultEvent extends mx.rpc.events.AbstractEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString',$callTokenResponders=$$l+'callTokenResponders',$_fault=$$l+'_fault',$_headers=$$l+'_headers',$_statusCode=$$l+'_statusCode';return[function(){joo.classLoader.init(mx.rpc.Fault,mx.messaging.messages.AbstractMessage);},






































"public static const",{FAULT:"fault"},























"public function FaultEvent",function(type,bubbles,cancelable,
fault,token,message)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=true;}fault=null;}token=null;}message=null;}
this[$super](type,bubbles,cancelable,token,message);

if(message!=null&&message.headers!=null)
this[$_statusCode]=message.headers[mx.messaging.messages.AbstractMessage.STATUS_CODE_HEADER];

this[$_fault]=fault;
},
















"public function get fault",function()
{
return this[$_fault];
},










"public function get headers",function()
{
return this[$_headers];
},




"public function set headers",function(value)
{
this[$_headers]=value;
},











"public function get statusCode",function()
{
return this[$_statusCode];
},













"override public function clone",function()
{
return new mx.rpc.events.FaultEvent(this.type,this.bubbles,this.cancelable,this.fault,this.token,this.message);
},











"override public function toString",function()
{
return this.formatToString("FaultEvent","fault","messageId","type","bubbles","cancelable","eventPhase");
},




"override public function callTokenResponders",function()
{
if(this.token!=null)
this.token.applyFault(this);
},















"public static function createEventFromMessageFault",function(value,token)
{if(arguments.length<2){token=null;}
var fault=new mx.rpc.Fault(value.faultCode,value.faultString,value.faultDetail);
fault.rootCause=value.rootCause;
return new mx.rpc.events.FaultEvent(mx.rpc.events.FaultEvent.FAULT,false,true,fault,token,value.message);
},















"public static function createEvent",function(fault,token,msg)
{if(arguments.length<3){if(arguments.length<2){token=null;}msg=null;}
return new mx.rpc.events.FaultEvent(mx.rpc.events.FaultEvent.FAULT,false,true,fault,token,msg);
},








"private var",{_fault: undefined},
"private var",{_headers: undefined},
"private var",{_statusCode: undefined},
];},["createEventFromMessageFault","createEvent"],["mx.rpc.events.AbstractEvent","mx.messaging.messages.AbstractMessage","mx.rpc.Fault"]

);