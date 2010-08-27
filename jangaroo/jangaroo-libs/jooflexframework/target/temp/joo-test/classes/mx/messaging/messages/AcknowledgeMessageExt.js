joo.classLoader.prepare(










"package mx.messaging.messages",










"public class AcknowledgeMessageExt extends mx.messaging.messages.AcknowledgeMessage implements flash.utils.IExternalizable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$writeExternal=$$l+'writeExternal',$messageId=$$l+'messageId',$_message=$$l+'_message';return[







"public function AcknowledgeMessageExt",function(message)
{if(arguments.length<1){message=null;}
this[$super]();
this[$_message]=message;
},

"override public function writeExternal",function(output)
{
if(this[$_message]!=null)
this[$_message].writeExternal(output);
else
this[$writeExternal](output);
},










"override public function get messageId",function()
{

if(this[$_message]!=null)
return this[$_message].messageId;

return this[$messageId];
},

"private var",{_message: undefined},
];},[],["mx.messaging.messages.AcknowledgeMessage","flash.utils.IExternalizable"]

);