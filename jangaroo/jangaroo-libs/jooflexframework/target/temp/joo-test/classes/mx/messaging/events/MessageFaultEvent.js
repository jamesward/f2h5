joo.classLoader.prepare(










"package mx.messaging.events",














"public class MessageFaultEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[










































"public static const",{FAULT:"fault"},





















"public static function createEvent",function(msg)
{
return new mx.messaging.events.MessageFaultEvent(mx.messaging.events.MessageFaultEvent.FAULT,false,false,msg);
},



























"public function MessageFaultEvent",function(type,bubbles,cancelable,
message)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}message=null;}
this[$super](type,bubbles,cancelable);

this.message=message;
},
















"public var",{message: undefined},





























"public function get faultCode",function()
{
return this.message.faultCode;
},




















"public function get faultDetail",function()
{
return this.message.faultDetail;
},

















"public function get faultString",function()
{
return this.message.faultString;
},




















"public function get rootCause",function()
{
return this.message.rootCause;
},


















"override public function clone",function()
{
return new mx.messaging.events.MessageFaultEvent(this.type,this.bubbles,this.cancelable,this.message);
},












"override public function toString",function()
{
return this.formatToString("MessageFaultEvent","faultCode","faultDetail","faultString","rootCause","type","bubbles","cancelable","eventPhase");
},
];},["createEvent"],["flash.events.Event"]

);