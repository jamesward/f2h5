joo.classLoader.prepare(










"package mx.messaging.messages",



















"public class AcknowledgeMessage extends mx.messaging.messages.AsyncMessage implements mx.messaging.messages.ISmallMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getSmallMessage=$$l+'getSmallMessage',$readExternal=$$l+'readExternal',$writeExternal=$$l+'writeExternal';return[function(){joo.classLoader.init(mx.messaging.messages.AcknowledgeMessageExt);},


















"public static const",{ERROR_HINT_HEADER:"DSErrorHint"},
















"public function AcknowledgeMessage",function()
{
this[$super]();
},










"override public function getSmallMessage",function()
{
var o=this;
if(o.constructor==mx.messaging.messages.AcknowledgeMessage)
return new mx.messaging.messages.AcknowledgeMessageExt(this);
return null;
},




"override public function readExternal",function(input)
{
this[$readExternal](input);

var flagsArray=this.readFlags(input);
for(var i=0;i<flagsArray.length;i++)
{
var flags=flagsArray[i];
var reservedPosition=0;



if((flags>>reservedPosition)!=0)
{
for(var j=reservedPosition;j<6;j++)
{
if(((flags>>j)&1)!=0)
{
input.readObject();
}
}
}
}
},




"override public function writeExternal",function(output)
{
this[$writeExternal](output);

var flags=0;
output.writeByte(flags);
},

];},[],["mx.messaging.messages.AsyncMessage","mx.messaging.messages.ISmallMessage","mx.messaging.messages.AcknowledgeMessageExt"]

);