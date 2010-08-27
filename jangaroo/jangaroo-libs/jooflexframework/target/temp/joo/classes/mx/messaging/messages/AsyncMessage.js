joo.classLoader.prepare(










"package mx.messaging.messages",



















"public class AsyncMessage extends mx.messaging.messages.AbstractMessage implements mx.messaging.messages.ISmallMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_correlationId=$$l+'_correlationId',$correlationIdBytes=$$l+'correlationIdBytes',$readExternal=$$l+'readExternal',$writeExternal=$$l+'writeExternal',$addDebugAttributes=$$l+'addDebugAttributes';return[function(){joo.classLoader.init(mx.messaging.messages.AsyncMessageExt);},

















"public static const",{SUBTOPIC_HEADER:"DSSubtopic"},







"private static const",{CORRELATION_ID_FLAG:1},
"private static const",{CORRELATION_ID_BYTES_FLAG:2},


























"public function AsyncMessage",function(body,headers)
{if(arguments.length<2){if(arguments.length<1){body=null;}headers=null;}
this[$super]();

this.correlationId="";
if(body!=null)
this.body=body;

if(headers!=null)
this.headers=headers;
},














"private var",{_correlationId: undefined},




"private var",{correlationIdBytes: undefined},















"public function get correlationId",function()
{
return this[$_correlationId];
},




"public function set correlationId",function(value)
{
this[$_correlationId]=value;
this[$correlationIdBytes]=null;
},










"public function getSmallMessage",function()
{


var o=this;
if(o.constructor==mx.messaging.messages.AsyncMessage)
return new mx.messaging.messages.AsyncMessageExt(this);
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

if(i==0)
{
if((flags&$$private.CORRELATION_ID_FLAG)!=0)
this.correlationId=input.readObject();

if((flags&$$private.CORRELATION_ID_BYTES_FLAG)!=0)
{
this[$correlationIdBytes]=input.readObject();
this.correlationId=mx.utils.RPCUIDUtil.fromByteArray(this[$correlationIdBytes]);
}

reservedPosition=2;
}



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

if(this[$correlationIdBytes]==null)
this[$correlationIdBytes]=mx.utils.RPCUIDUtil.toByteArray(this[$_correlationId]);

var flags=0;

if(this.correlationId!=null&&this[$correlationIdBytes]==null)
flags|=$$private.CORRELATION_ID_FLAG;

if(this[$correlationIdBytes]!=null)
flags|=$$private.CORRELATION_ID_BYTES_FLAG;

output.writeByte(flags);

if(this.correlationId!=null&&this[$correlationIdBytes]==null)
output.writeObject(this.correlationId);

if(this[$correlationIdBytes]!=null)
output.writeObject(this[$correlationIdBytes]);
},




"override protected function addDebugAttributes",function(attributes)
{
this[$addDebugAttributes](attributes);
attributes["correlationId"]=this.correlationId;
},


];},[],["mx.messaging.messages.AbstractMessage","mx.messaging.messages.ISmallMessage","mx.messaging.messages.AsyncMessageExt","mx.utils.RPCUIDUtil"]

);