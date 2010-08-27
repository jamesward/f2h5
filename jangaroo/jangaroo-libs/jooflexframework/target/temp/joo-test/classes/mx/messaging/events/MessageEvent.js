joo.classLoader.prepare(










"package mx.messaging.events",














"public class MessageEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[


































"public static const",{MESSAGE:"message"},





























"public static const",{RESULT:"result"},























"public static function createEvent",function(type,msg)
{
return new mx.messaging.events.MessageEvent(type,false,false,msg);
},



























"public function MessageEvent",function(type,bubbles,cancelable,
message)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}message=null;}
this[$super](type,bubbles,cancelable);

this.message=message;
},
















"public var",{message: undefined},














"public function get messageId",function()
{
if(this.message!=null)
{
return this.message.messageId;
}
return null;
},


















"override public function clone",function()
{
return new mx.messaging.events.MessageEvent(this.type,this.bubbles,this.cancelable,this.message);
},












"override public function toString",function()
{
return this.formatToString("MessageEvent","messageId","type","bubbles","cancelable","eventPhase");
},
];},["createEvent"],["flash.events.Event"]

);