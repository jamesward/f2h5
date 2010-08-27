joo.classLoader.prepare(










"package mx.messaging.messages",































"public class AbstractMessage implements mx.messaging.messages.IMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_body=$$l+'_body',$_clientId=$$l+'_clientId',$clientIdBytes=$$l+'clientIdBytes',$_destination=$$l+'_destination',$_headers=$$l+'_headers',$_messageId=$$l+'_messageId',$messageIdBytes=$$l+'messageIdBytes',$_timestamp=$$l+'_timestamp',$_timeToLive=$$l+'_timeToLive';return[



















"public static const",{DESTINATION_CLIENT_ID_HEADER:"DSDstClientId"},











"public static const",{ENDPOINT_HEADER:"DSEndpoint"},











"public static const",{FLEX_CLIENT_ID_HEADER:"DSId"},












"public static const",{PRIORITY_HEADER:"DSPriority"},











"public static const",{REMOTE_CREDENTIALS_HEADER:"DSRemoteCredentials"},












"public static const",{REMOTE_CREDENTIALS_CHARSET_HEADER:"DSRemoteCredentialsCharset"},














"public static const",{REQUEST_TIMEOUT_HEADER:"DSRequestTimeout"},












"public static const",{STATUS_CODE_HEADER:"DSStatusCode"},








"private static const",{HAS_NEXT_FLAG:128},
"private static const",{BODY_FLAG:1},
"private static const",{CLIENT_ID_FLAG:2},
"private static const",{DESTINATION_FLAG:4},
"private static const",{HEADERS_FLAG:8},
"private static const",{MESSAGE_ID_FLAG:16},
"private static const",{TIMESTAMP_FLAG:32},
"private static const",{TIME_TO_LIVE_FLAG:64},
"private static const",{CLIENT_ID_BYTES_FLAG:1},
"private static const",{MESSAGE_ID_BYTES_FLAG:2},


















"public function AbstractMessage",function()
{
this[$super]();this[$_body]=this[$_body]();
},














"private var",{_body:function(){return({});}},











"public function get body",function()
{
return this[$_body];
},




"public function set body",function(value)
{
this[$_body]=value;
},








"private var",{_clientId: undefined},




"private var",{clientIdBytes: undefined},










"public function get clientId",function()
{
return this[$_clientId];
},




"public function set clientId",function(value)
{
this[$_clientId]=value;
this[$clientIdBytes]=null;
},








"private var",{_destination:""},










"public function get destination",function()
{
return this[$_destination];
},




"public function set destination",function(value)
{
this[$_destination]=value;
},








"private var",{_headers: undefined},















"public function get headers",function()
{
if(this[$_headers]==null)
this[$_headers]={};

return this[$_headers];
},




"public function set headers",function(value)
{
this[$_headers]=value;
},








"private var",{_messageId: undefined},




"private var",{messageIdBytes: undefined},










"public function get messageId",function()
{
if(this[$_messageId]==null)
this[$_messageId]=mx.utils.RPCUIDUtil.createUID();

return this[$_messageId];
},




"public function set messageId",function(value)
{
this[$_messageId]=value;
this[$messageIdBytes]=null;
},








"private var",{_timestamp:0},
















"public function get timestamp",function()
{
return this[$_timestamp];
},




"public function set timestamp",function(value)
{
this[$_timestamp]=value;
},








"private var",{_timeToLive:0},


















"public function get timeToLive",function()
{
return this[$_timeToLive];
},




"public function set timeToLive",function(value)
{
this[$_timeToLive]=value;
},
















"public function readExternal",function(input)
{
var flagsArray=this.readFlags(input);

for(var i=0;i<flagsArray.length;i++)
{
var flags=flagsArray[i];
var reservedPosition=0;

if(i==0)
{
if((flags&$$private.BODY_FLAG)!=0)
this.body=input.readObject();
else
this.body=null;

if((flags&$$private.CLIENT_ID_FLAG)!=0)
this.clientId=input.readObject();

if((flags&$$private.DESTINATION_FLAG)!=0)
this.destination=input.readObject();

if((flags&$$private.HEADERS_FLAG)!=0)
this.headers=input.readObject();

if((flags&$$private.MESSAGE_ID_FLAG)!=0)
this.messageId=input.readObject();

if((flags&$$private.TIMESTAMP_FLAG)!=0)
this.timestamp=input.readObject();

if((flags&$$private.TIME_TO_LIVE_FLAG)!=0)
this.timeToLive=input.readObject();

reservedPosition=7;
}
else if(i==1)
{
if((flags&$$private.CLIENT_ID_BYTES_FLAG)!=0)
{
this[$clientIdBytes]=input.readObject();
this.clientId=mx.utils.RPCUIDUtil.fromByteArray(this[$clientIdBytes]);
}

if((flags&$$private.MESSAGE_ID_BYTES_FLAG)!=0)
{
this[$messageIdBytes]=input.readObject();
this.messageId=mx.utils.RPCUIDUtil.fromByteArray(this[$messageIdBytes]);
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












"public function toString",function()
{
return mx.utils.RPCObjectUtil.toString(this);
},










"public function writeExternal",function(output)
{
var flags=0;



var checkForMessageId=this.messageId;

if(this[$clientIdBytes]==null)
this[$clientIdBytes]=mx.utils.RPCUIDUtil.toByteArray(this[$_clientId]);

if(this[$messageIdBytes]==null)
this[$messageIdBytes]=mx.utils.RPCUIDUtil.toByteArray(this[$_messageId]);

if(this.body!=null)
flags|=$$private.BODY_FLAG;

if(this.clientId!=null&&this[$clientIdBytes]==null)
flags|=$$private.CLIENT_ID_FLAG;

if(this.destination!=null)
flags|=$$private.DESTINATION_FLAG;

if(this.headers!=null)
flags|=$$private.HEADERS_FLAG;

if(this.messageId!=null&&this[$messageIdBytes]==null)
flags|=$$private.MESSAGE_ID_FLAG;

if(this.timestamp!=0)
flags|=$$private.TIMESTAMP_FLAG;

if(this.timeToLive!=0)
flags|=$$private.TIME_TO_LIVE_FLAG;

if(this[$clientIdBytes]!=null||this[$messageIdBytes]!=null)
flags|=$$private.HAS_NEXT_FLAG;

output.writeByte(flags);

flags=0;

if(this[$clientIdBytes]!=null)
flags|=$$private.CLIENT_ID_BYTES_FLAG;

if(this[$messageIdBytes]!=null)
flags|=$$private.MESSAGE_ID_BYTES_FLAG;


if(flags!=0)
output.writeByte(flags);

if(this.body!=null)
output.writeObject(this.body);

if(this.clientId!=null&&this[$clientIdBytes]==null)
output.writeObject(this.clientId);

if(this.destination!=null)
output.writeObject(this.destination);

if(this.headers!=null)
output.writeObject(this.headers);

if(this.messageId!=null&&this[$messageIdBytes]==null)
output.writeObject(this.messageId);

if(this.timestamp!=0)
output.writeObject(this.timestamp);

if(this.timeToLive!=0)
output.writeObject(this.timeToLive);

if(this[$clientIdBytes]!=null)
output.writeObject(this[$clientIdBytes]);

if(this[$messageIdBytes]!=null)
output.writeObject(this[$messageIdBytes]);
},










"protected function addDebugAttributes",function(attributes)
{
attributes["body"]=this.body;
attributes["clientId"]=this.clientId;
attributes["destination"]=this.destination;
attributes["headers"]=this.headers;
attributes["messageId"]=this.messageId;
attributes["timestamp"]=this.timestamp;
attributes["timeToLive"]=this.timeToLive;
},




"final protected function getDebugString",function()
{
var result="("+flash.utils.getQualifiedClassName(this)+")";

var attributes={};
this.addDebugAttributes(attributes);

var propertyNames=[];
for(var propertyName in attributes)
{
propertyNames.push(propertyName);
}
propertyNames.sort();

for(var i=0;i<propertyNames.length;i++)
{
var name=String(propertyNames[i]);
var value=mx.utils.RPCObjectUtil.toString(attributes[name]);
result+=mx.utils.RPCStringUtil.substitute("\n  {0}={1}",name,value);
}

return result;
},












"protected function readFlags",function(input)
{
var hasNextFlag=true;
var flagsArray=[];

while(hasNextFlag&&input.bytesAvailable>0)
{
var flags=input.readUnsignedByte();
flagsArray.push(flags);

if((flags&$$private.HAS_NEXT_FLAG)!=0)
hasNextFlag=true;
else
hasNextFlag=false;
}

return flagsArray;
},
];},[],["mx.messaging.messages.IMessage","mx.utils.RPCUIDUtil","mx.utils.RPCObjectUtil","String","mx.utils.RPCStringUtil"]

);