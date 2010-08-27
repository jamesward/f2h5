// class mx.rpc.AsyncToken
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
// class mx.rpc.events.ResultEvent
joo.classLoader.prepare(










"package mx.rpc.events",
















"public class ResultEvent extends mx.rpc.events.AbstractEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString',$callTokenResponders=$$l+'callTokenResponders',$_result=$$l+'_result',$_headers=$$l+'_headers',$_statusCode=$$l+'_statusCode';return[function(){joo.classLoader.init(mx.messaging.messages.AbstractMessage);},






































"public static const",{RESULT:"result"},






















"public function ResultEvent",function(type,bubbles,cancelable,
result,token,message)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=true;}result=null;}token=null;}message=null;}
this[$super](type,bubbles,cancelable,token,message);

if(message!=null&&message.headers!=null)
this[$_statusCode]=message.headers[mx.messaging.messages.AbstractMessage.STATUS_CODE_HEADER];

this[$_result]=result;
},

















"public function get headers",function()
{
return this[$_headers];
},




"public function set headers",function(value)
{
this[$_headers]=value;
},









"public function get result",function()
{
return this[$_result];
},











"public function get statusCode",function()
{
return this[$_statusCode];
},










"public static function createEvent",function(result,token,message)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){result=null;}token=null;}message=null;}
return new mx.rpc.events.ResultEvent(mx.rpc.events.ResultEvent.RESULT,false,true,result,token,message);
},







"override public function clone",function()
{
return new mx.rpc.events.ResultEvent(this.type,this.bubbles,this.cancelable,this.result,this.token,this.message);
},










"override public function toString",function()
{
return this.formatToString("ResultEvent","messageId","type","bubbles","cancelable","eventPhase");
},




"override public function callTokenResponders",function()
{
if(this.token!=null)
this.token.applyResult(this);
},

"public function setResult",function(r)
{
this[$_result]=r;
},








"private var",{_result: undefined},
"private var",{_headers: undefined},
"private var",{_statusCode: undefined},
];},["createEvent"],["mx.rpc.events.AbstractEvent","mx.messaging.messages.AbstractMessage"]

);
// class mx.rpc.events.AbstractEvent
joo.classLoader.prepare(










"package mx.rpc.events",

















"public class AbstractEvent extends mx.messaging.events.MessageEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_token=$$l+'_token';return[

"private var",{_token: undefined},




"public function AbstractEvent",function(type,bubbles,cancelable,
token,message)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=true;}token=null;}message=null;}
this[$super](type,bubbles,cancelable,message);

this[$_token]=token;
},









"public function get token",function()
{
return this[$_token];
},

"mx_internal function setToken",function(t)
{
this[$_token]=t;
},









"mx_internal function callTokenResponders",function()
{
},
];},[],["mx.messaging.events.MessageEvent"]

);
// class mx.rpc.events.FaultEvent
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
// class mx.rpc.IResponder
joo.classLoader.prepare(










"package mx.rpc",











"public interface IResponder",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[









,









,
];},[],[]

);
// class mx.rpc.Fault
joo.classLoader.prepare(










"package mx.rpc",











"public class Fault extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$toString=$$l+'toString';return[














"public function Fault",function(faultCode,faultString,faultDetail)
{if(arguments.length<3){faultDetail=null;}
this[$super]("faultCode:"+faultCode+" faultString:'"+faultString+"' faultDetail:'"+faultDetail+"'");

this._faultCode=faultCode;
this._faultString=faultString?faultString:"";
this._faultDetail=faultDetail;
},

















"public var",{content: undefined},










"public var",{rootCause: undefined},















"public function get faultCode",function()
{
return this._faultCode;
},









"public function get faultDetail",function()
{
return this._faultDetail;
},









"public function get faultString",function()
{
return this._faultString;
},

















"override public function toString",function()
{
var s="[RPC Fault";
s+=" faultString=\""+this.faultString+"\"";
s+=" faultCode=\""+this.faultCode+"\"";
s+=" faultDetail=\""+this.faultDetail+"\"]";
return s;
},




"protected var",{_faultCode: undefined},




"protected var",{_faultString: undefined},




"protected var",{_faultDetail: undefined},
];},[],["Error"]

);
// class mx.core.IUID
joo.classLoader.prepare("package mx.core",


"public interface IUID",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

,

,
];},[],[]
);
// class mx.core.IFlexDisplayObject
joo.classLoader.prepare(










"package mx.core",






















"public interface IFlexDisplayObject extends flash.display.IBitmapDrawable,flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




























,










,










,
,










,










,
,










,
,










,
,










,
,










,
,










,
,










,










,










,
,










,
,










,
,









,
,










,
,









,
,










,
,










,
,









,
,









,
,









,
,









,









,









,









,









,









,









,









,
,































,






















,




















,


























,
];},[],["flash.display.IBitmapDrawable","flash.events.IEventDispatcher"]

);
// class mx.core.Singleton
joo.classLoader.prepare(










"package mx.core",



























"public class Singleton",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},
















"public static const",{VERSION:"4.1.0.16076"},















"private static var",{classMap:function(){return({});}},














"public static function registerClass",function(interfaceName,
clazz)
{
var c=$$private.classMap[interfaceName];
if(!c)
$$private.classMap[interfaceName]=clazz;
},









"public static function getClass",function(interfaceName)
{
return $$private.classMap[interfaceName];
},











"public static function getInstance",function(interfaceName)
{
var c=$$private.classMap[interfaceName];
if(!c)
{
throw new Error("No class registered for interface '"+
interfaceName+"'.");
}
return c["getInstance"]();
},
];},["registerClass","getClass","getInstance"],["Error"]

);
// class mx.core.IPropertyChangeNotifier
joo.classLoader.prepare("package mx.core",



"public interface IPropertyChangeNotifier extends flash.events.IEventDispatcher,mx.core.IUID",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],["flash.events.IEventDispatcher","mx.core.IUID"]

);
// class mx.core.ISystemCursorClient
joo.classLoader.prepare(










"package mx.core",













"public interface ISystemCursorClient",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




















,
];},[],[]

);
// class mx.core.FlexGlobals
joo.classLoader.prepare(










"package mx.core",












"public class FlexGlobals",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


















"public static var",{topLevelApplication: undefined},
];},[],[]

);
// class mx.core.EventPriority
joo.classLoader.prepare(










"package mx.core",

























"public final class EventPriority",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
















"public static const",{VERSION:"4.1.0.16076"},


















"public static const",{CURSOR_MANAGEMENT:200},











"public static const",{BINDING:100},










"public static const",{DEFAULT:0},














"public static const",{DEFAULT_HANDLER:-50},











"public static const",{EFFECT:-100},
];},[],[]

);
// class mx.utils.RPCStringUtil
joo.classLoader.prepare(










"package mx.utils",











"public class RPCStringUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Array,RegExp);},
















"public static const",{VERSION:"4.1.0.16076"},






















"public static function trim",function(str)
{
if(str==null)return'';

var startIndex=0;
while(mx.utils.RPCStringUtil.isWhitespace(str.charAt(startIndex)))
++startIndex;

var endIndex=str.length-1;
while(mx.utils.RPCStringUtil.isWhitespace(str.charAt(endIndex)))
--endIndex;

if(endIndex>=startIndex)
return str.slice(startIndex,endIndex+1);
else
return"";
},

















"public static function trimArrayElements",function(value,delimiter)
{
if(value!=""&&value!=null)
{
var items=value.split(delimiter);

var len=items.length;
for(var i=0;i<len;i++)
{
items[i]=mx.utils.RPCStringUtil.trim(items[i]);
}

if(len>0)
{
value=items.join(delimiter);
}
}

return value;
},















"public static function isWhitespace",function(character)
{
switch(character)
{
case" ":
case"\t":
case"\r":
case"\n":
case"\f":
return true;

default:
return false;
}
},









































"public static function substitute",function(str)
{var rest=Array.prototype.slice.call(arguments,1);
if(str==null)return'';


var len=rest.length;
var args;
if(len==1&&is(rest[0],Array))
{
args=rest[0];
len=args.length;
}
else
{
args=rest;
}

for(var i=0;i<len;i++)
{
str=str.replace(new RegExp("\\{"+i+"\\}","g"),args[i]);
}

return str;
},
];},["trim","trimArrayElements","isWhitespace","substitute"],["Array","RegExp"]

);
// class mx.utils.URLUtil
joo.classLoader.prepare("package mx.utils",


"public class URLUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static function getProtocol",function(url)
{
var slash=url.indexOf("/");
var indx=url.indexOf(":/");
if(indx>-1&&indx<slash)
{
return url.substring(0,indx);
}
else
{
indx=url.indexOf("::");
if(indx>-1&&indx<slash)
return url.substring(0,indx);
}

return"";
},

"public static function getServerNameWithPort",function(url)
{

var start=url.indexOf("/")+2;
var length=url.indexOf("/",start);
return length==-1?url.substring(start):url.substring(start,length);
},

"public static function getServerName",function(url)
{
var sp=mx.utils.URLUtil.getServerNameWithPort(url);


var delim=sp.indexOf("]");
delim=(delim>-1)?sp.indexOf(":",delim):sp.indexOf(":");

if(delim>0)
sp=sp.substring(0,delim);
return sp;
},

];},["getProtocol","getServerNameWithPort","getServerName"],[]

);
// class mx.utils.LoaderUtil
joo.classLoader.prepare(










"package mx.utils",

















"public class LoaderUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

















"public static const",{VERSION:"4.1.0.16076"},


































"public static var",{urlFilters:function(){return(
[
{searchString:"/[[DYNAMIC]]/",filterFunction:$$private.dynamicURLFilter},
{searchString:"/[[IMPORT]]/",filterFunction:$$private.importURLFilter}
]);}},



























"public static function normalizeURL",function(loaderInfo)
{
var url=loaderInfo.url;
var index;
var searchString;
var urlFilter;
var n=mx.utils.LoaderUtil.urlFilters.length;

for(var i=0;i<n;i++)
{
searchString=mx.utils.LoaderUtil.urlFilters[i].searchString;
if((index=url.indexOf(searchString))!=-1)
{
urlFilter=mx.utils.LoaderUtil.urlFilters[i].filterFunction;
url=urlFilter(url,index);
}
}




if($$private.isMac())
return encodeURI(url);

return url;
},


























"public static function createAbsoluteURL",function(rootURL,url)
{
var absoluteURL=url;


if(rootURL&&
!(url.indexOf(":")>-1||url.indexOf("/")==0||url.indexOf("\\")==0))
{

var index;

if((index=rootURL.indexOf("?"))!=-1)
rootURL=rootURL.substring(0,index);

if((index=rootURL.indexOf("#"))!=-1)
rootURL=rootURL.substring(0,index);





var lastIndex=Math.max(rootURL.lastIndexOf("\\"),rootURL.lastIndexOf("/"));
if(url.indexOf("./")==0)
{
url=url.substring(2);
}
else
{
while(url.indexOf("../")==0)
{
url=url.substring(3);
lastIndex=Math.max(rootURL.lastIndexOf("\\",lastIndex-1),
rootURL.lastIndexOf("/",lastIndex-1));
}
}

if(lastIndex!=-1)
absoluteURL=rootURL.substr(0,lastIndex+1)+url;
}

return absoluteURL;
},




"private static function isMac",function()
{
return flash.system.Capabilities.os.substring(0,3)=="Mac";
},






"private static function dynamicURLFilter",function(url,index)
{
return url.substring(0,index);
},






"private static function importURLFilter",function(url,index)
{
var protocolIndex=url.indexOf("://");
return url.substring(0,protocolIndex+3)+url.substring(index+12);
},

];},["normalizeURL","createAbsoluteURL"],["Math","flash.system.Capabilities"]
);
// class mx.utils.ArrayUtil
joo.classLoader.prepare(










"package mx.utils",









"public class ArrayUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Array);},
















"public static const",{VERSION:"4.1.0.16076"},
























"public static function toArray",function(obj)
{
if(!obj)
return[];

else if(is(obj,Array))
return obj;

else
return[obj];
},













"public static function getItemIndex",function(item,source)
{
var n=source.length;
for(var i=0;i<n;i++)
{
if(source[i]===item)
return i;
}

return-1;
},
];},["toArray","getItemIndex"],["Array"]

);
// class mx.utils.OrderedObject
joo.classLoader.prepare(









"package mx.utils",














"public dynamic class OrderedObject extends flash.utils.Proxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_item=$$l+'_item',$getProperty=$$l+'getProperty',$callProperty=$$l+'callProperty',$deleteProperty=$$l+'deleteProperty',$hasProperty=$$l+'hasProperty',$nextName=$$l+'nextName',$nextNameIndex=$$l+'nextNameIndex',$nextValue=$$l+'nextValue',$setProperty=$$l+'setProperty';return[

















"public function OrderedObject",function(item)
{if(arguments.length<1){item=null;}
this[$super]();

if(!item)
item={};
this[$_item]=item;

this.propertyList=[];
},















"public var",{propertyList: undefined},



















"private var",{_item: undefined},



























"public function getObjectProperty",function(name)
{
return this.getProperty(name);
},






















"public function setObjectProperty",function(name,value)
{
this.setProperty(name,value);
},





















"override public function getProperty",function(name)
{

var result=null;

result=this[$_item][name];

return result;
},















"override public function callProperty",function(name)
{var rest=Array.prototype.slice.call(arguments,1);
return this[$_item][name].apply(this[$_item],rest);
},















"override public function deleteProperty",function(name)
{
var oldVal=this[$_item][name];
var deleted=delete this[$_item][name];

var deleteIndex=-1;
for(var i=0;i<this.propertyList.length;i++)
{
if(this.propertyList[i]==name)
{
deleteIndex=i;
break;
}
}
if(deleteIndex>-1)
{
this.propertyList.splice(deleteIndex,1);
}

return deleted;
},

















"override public function hasProperty",function(name)
{
return(name in this[$_item]);
},
















"override public function nextName",function(index)
{
return this.propertyList[index-1];
},












"override public function nextNameIndex",function(index)
{
if(index<this.propertyList.length)
{
return index+1;
}
else
{
return 0;
}
},
















"override public function nextValue",function(index)
{
return this[$_item][this.propertyList[index-1]];
},














"override public function setProperty",function(name,value)
{
var oldVal=this[$_item][name];
if(oldVal!==value)
{

this[$_item][name]=value;

for(var i=0;i<this.propertyList.length;i++)
{
if(this.propertyList[i]==name)
{
return;
}
}
this.propertyList.push(name);
}
},

];},[],["flash.utils.Proxy"]

);
// class mx.utils.ObjectProxy
joo.classLoader.prepare("package mx.utils",





"public dynamic class ObjectProxy extends flash.utils.Proxy implements flash.utils.IExternalizable,mx.core.IPropertyChangeNotifier",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{uid: undefined},

"protected var",{dispatcher: undefined},
"protected var",{notifiers: undefined},
"protected var",{object: undefined},
"protected var",{propertyList: undefined},
"protected var",{proxyClass: undefined},

];},[],["flash.utils.Proxy","flash.utils.IExternalizable","mx.core.IPropertyChangeNotifier"]

);
// class mx.utils.RPCUIDUtil
joo.classLoader.prepare("package mx.utils",



"public class RPCUIDUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.utils.ByteArray);},


"public static function createUID",function()
{
return"";
},

"public static function fromByteArray",function(ba)
{
return"";
},

"public static function toByteArray",function(uid)
{
return new flash.utils.ByteArray();
},

];},["createUID","fromByteArray","toByteArray"],["flash.utils.ByteArray"]

);
// class mx.utils.DescribeTypeCache
joo.classLoader.prepare("package mx.utils",
"public class DescribeTypeCache",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function DescribeTypeCache",function(){this[$super]();
},

"static function describeType",function(obj){
return undefined;
},

];},["describeType"],[]
);
// class mx.utils.RPCObjectUtil
joo.classLoader.prepare("package mx.utils",


"public class RPCObjectUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static function getClassInfo",function(obj,excludes,options)
{if(arguments.length<3){if(arguments.length<2){excludes=null;}options=null;}
return{};
},

"public static function toString",function(value,namespaceURIs,exclude)
{if(arguments.length<3){if(arguments.length<2){namespaceURIs=null;}exclude=null;}
return"";
},

];},["getClassInfo","toString"],[]
);
// class mx.utils.StringUtil
joo.classLoader.prepare(










"package mx.utils",









"public class StringUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Array,RegExp);},
















"public static const",{VERSION:"4.1.0.16076"},

















"public static function trim",function(str)
{
if(str==null)return'';

var startIndex=0;
while(mx.utils.StringUtil.isWhitespace(str.charAt(startIndex)))
++startIndex;

var endIndex=str.length-1;
while(mx.utils.StringUtil.isWhitespace(str.charAt(endIndex)))
--endIndex;

if(endIndex>=startIndex)
return str.slice(startIndex,endIndex+1);
else
return"";
},












"public static function trimArrayElements",function(value,delimiter)
{
if(value!=""&&value!=null)
{
var items=value.split(delimiter);

var len=items.length;
for(var i=0;i<len;i++)
{
items[i]=mx.utils.StringUtil.trim(items[i]);
}

if(len>0)
{
value=items.join(delimiter);
}
}

return value;
},










"public static function isWhitespace",function(character)
{
switch(character)
{
case" ":
case"\t":
case"\r":
case"\n":
case"\f":
return true;

default:
return false;
}
},




































"public static function substitute",function(str)
{var rest=Array.prototype.slice.call(arguments,1);
if(str==null)return'';


var len=rest.length;
var args;
if(len==1&&is(rest[0],Array))
{
args=rest[0];
len=args.length;
}
else
{
args=rest;
}

for(var i=0;i<len;i++)
{
str=str.replace(new RegExp("\\{"+i+"\\}","g"),String(args[i]));
}

return str;
},
];},["trim","trimArrayElements","isWhitespace","substitute"],["Array","RegExp","String"]

);
// class mx.utils.ObjectUtil
joo.classLoader.prepare("package mx.utils",


"public class ObjectUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static function toString",function(value,namespaceURIs,exclude)
{if(arguments.length<3){if(arguments.length<2){namespaceURIs=null;}exclude=null;}
return"";
},

];},["toString"],[]

);
// class mx.netmon.NetworkMonitor
joo.classLoader.prepare(










"package mx.netmon",





















"public class NetworkMonitor",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[















"public static var",{isMonitoringImpl: undefined},









"public static var",{adjustURLRequestImpl: undefined},









"public static var",{adjustNetConnectionURLImpl: undefined},









"public static var",{monitorEventImpl: undefined},









"public static var",{monitorInvocationImpl: undefined},









"public static var",{monitorResultImpl: undefined},









"public static var",{monitorFaultImpl: undefined},















"public static function isMonitoring",function()
{
return mx.netmon.NetworkMonitor.isMonitoringImpl!=null?mx.netmon.NetworkMonitor.isMonitoringImpl():false;
},
























"public static function adjustURLRequest",function(urlRequest,
rootURL,
correlationID)
{
if(mx.netmon.NetworkMonitor.adjustURLRequestImpl!=null)
mx.netmon.NetworkMonitor.adjustURLRequestImpl(urlRequest,rootURL,correlationID);
},













"public static function adjustNetConnectionURL",function(rootUrl,url)
{
if(mx.netmon.NetworkMonitor.adjustNetConnectionURLImpl!=null)
return mx.netmon.NetworkMonitor.adjustNetConnectionURLImpl(rootUrl,url);
return null;
},
















"public static function monitorEvent",function(event,
correlationID)
{
if(mx.netmon.NetworkMonitor.monitorEventImpl!=null)
mx.netmon.NetworkMonitor.monitorEventImpl(event,correlationID);
},















"public static function monitorInvocation",function(id,
invocationMessage,messageAgent)
{
if(mx.netmon.NetworkMonitor.monitorInvocationImpl!=null)
mx.netmon.NetworkMonitor.monitorInvocationImpl(id,invocationMessage,messageAgent);
},














"public static function monitorResult",function(resultMessage,
actualResult)
{
if(mx.netmon.NetworkMonitor.monitorResultImpl!=null)
mx.netmon.NetworkMonitor.monitorResultImpl(resultMessage,actualResult);
},
















"public static function monitorFault",function(faultMessage,
actualFault)
{
if(mx.netmon.NetworkMonitor.monitorFaultImpl!=null)
mx.netmon.NetworkMonitor.monitorFaultImpl(faultMessage,actualFault);
},
];},["isMonitoring","adjustURLRequest","adjustNetConnectionURL","monitorEvent","monitorInvocation","monitorResult","monitorFault"],[]

);
// class mx.events.PropertyChangeEventKind
joo.classLoader.prepare(










"package mx.events",













"public final class PropertyChangeEventKind",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
















"public static const",{VERSION:"4.1.0.16076"},
















"public static const",{UPDATE:"update"},









"public static const",{DELETE:"delete"},
];},[],[]

);
// class mx.events.PropertyChangeEvent
joo.classLoader.prepare(










"package mx.events",




















"public class PropertyChangeEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[function(){joo.classLoader.init(mx.events.PropertyChangeEventKind);},
















"public static const",{VERSION:"4.1.0.16076"},












































"public static const",{PROPERTY_CHANGE:"propertyChange"},






























"public static function createUpdateEvent",function(
source,
property,
oldValue,
newValue)
{
var event=
new mx.events.PropertyChangeEvent(mx.events.PropertyChangeEvent.PROPERTY_CHANGE);

event.kind=mx.events.PropertyChangeEventKind.UPDATE;
event.oldValue=oldValue;
event.newValue=newValue;
event.source=source;
event.property=property;

return event;
},




































"public function PropertyChangeEvent",function(type,bubbles,
cancelable,
kind,
property,
oldValue,
newValue,
source)
{if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}kind=null;}property=null;}oldValue=null;}newValue=null;}source=null;}
this[$super](type,bubbles,cancelable);

this.kind=kind;
this.property=property;
this.oldValue=oldValue;
this.newValue=newValue;
this.source=source;
},





















"public var",{kind: undefined},













"public var",{newValue: undefined},













"public var",{oldValue: undefined},













"public var",{property: undefined},













"public var",{source: undefined},










"override public function clone",function()
{
return new mx.events.PropertyChangeEvent(this.type,this.bubbles,this.cancelable,this.kind,
this.property,this.oldValue,this.newValue,this.source);
},
];},["createUpdateEvent"],["flash.events.Event","mx.events.PropertyChangeEventKind"]

);
// class mx.events.FlexEvent
joo.classLoader.prepare(










"package mx.events",













"public class FlexEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[
















"public static const",{VERSION:"4.1.0.16076"},





































"public static const",{ADD:"add"},





























"public static const",{ADD_FOCUS_MANAGER:"addFocusManager"},



























"public static const",{APPLICATION_COMPLETE:"applicationComplete"},



























"public static const",{BUTTON_DOWN:"buttonDown"},



























"public static const",{CHANGE_END:"changeEnd"},



























"public static const",{CHANGE_START:"changeStart"},



























"public static const",{CHANGING:"changing"},



























"public static const",{CREATION_COMPLETE:"creationComplete"},



























"public static const",{CONTENT_CREATION_COMPLETE:"contentCreationComplete"},




























"public static const",{CURSOR_UPDATE:"cursorUpdate"},



























"public static const",{DATA_CHANGE:"dataChange"},



























"public static const",{ENTER:"enter"},

















"public static const",{ENTER_FRAME:"flexEventEnterFrame"},






























"public static const",{ENTER_STATE:"enterState"},






























"public static const",{EXIT_STATE:"exitState"},

































"public static const",{FLEX_WINDOW_ACTIVATE:"flexWindowActivate"},

































"public static const",{FLEX_WINDOW_DEACTIVATE:"flexWindowDeactivate"},



























"public static const",{HIDE:"hide"},



























"public static const",{IDLE:"idle"},















































"public static const",{INIT_COMPLETE:"initComplete"},


































"public static const",{INIT_PROGRESS:"initProgress"},



























"public static const",{INITIALIZE:"initialize"},



























"public static const",{INVALID:"invalid"},




























"public static const",{LOADING:"loading"},



























"public static const",{MUTED_CHANGE:"mutedChange"},




"public static const",{NEW_CHILD_APPLICATION:"newChildApplication"},



























"public static const",{PREINITIALIZE:"preinitialize"},




"public static const",{PRELOADER_DONE:"preloaderDone"},




"public static const",{PRELOADER_DOC_FRAME_READY:"preloaderDocFrameReady"},

















"public static const",{RENDER:"flexEventRender"},






























"public static const",{REMOVE:"remove"},



























"public static const",{REPEAT:"repeat"},



























"public static const",{REPEAT_END:"repeatEnd"},



























"public static const",{REPEAT_START:"repeatStart"},



























"public static const",{SELECTION_CHANGE:"selectionChange"},



























"public static const",{SHOW:"show"},



























"public static const",{TRANSFORM_CHANGE:"transformChange"},






























"public static const",{UPDATE_COMPLETE:"updateComplete"},




























"public static const",{URL_CHANGED:"urlChanged"},



























"public static const",{VALID:"valid"},




























"public static const",{VALUE_COMMIT:"valueCommit"},
























"public function FlexEvent",function(type,bubbles,
cancelable)
{if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}
this[$super](type,bubbles,cancelable);
},










"override public function clone",function()
{
return new mx.events.FlexEvent(this.type,this.bubbles,this.cancelable);
},
];},[],["flash.events.Event"]

);
// class mx.events.Request
joo.classLoader.prepare(










"package mx.events",













"public class Request extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[
















"public static const",{VERSION:"4.1.0.16076"},














"public static const",{GET_PARENT_FLEX_MODULE_FACTORY_REQUEST:"getParentFlexModuleFactoryRequest"},




























"public function Request",function(type,bubbles,
cancelable,
value)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}value=null;}
this[$super](type,bubbles,cancelable);

this.value=value;
},



















"public var",{value: undefined},










"override public function clone",function()
{
var cloneEvent=new mx.events.Request(this.type,this.bubbles,this.cancelable,
this.value);

return cloneEvent;
},

];},[],["flash.events.Event"]

);
// class mx.events.CollectionEventKind
joo.classLoader.prepare(










"package mx.events",









"public final class CollectionEventKind",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
















"public static const",{VERSION:"4.1.0.16076"},











"public static const",{ADD:"add"},






"public static const",{MOVE:"move"},





"public static const",{REFRESH:"refresh"},




"public static const",{REMOVE:"remove"},





"public static const",{REPLACE:"replace"},






"mx_internal static const",{EXPAND:"expand"},





"public static const",{RESET:"reset"},






"public static const",{UPDATE:"update"},
];},[],[]

);
// class mx.events.CollectionEvent
joo.classLoader.prepare(










"package mx.events",










"public class CollectionEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$toString=$$l+'toString',$clone=$$l+'clone';return[
















"public static const",{VERSION:"4.1.0.16076"},












































"public static const",{COLLECTION_CHANGE:"collectionChange"},









































"public function CollectionEvent",function(type,bubbles,
cancelable,
kind,location,
oldLocation,items)
{if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}kind=null;}location=-1;}oldLocation=-1;}items=null;}
this[$super](type,bubbles,cancelable);

this.kind=kind;
this.location=location;
this.oldLocation=oldLocation;
this.items=items?items:[];
},





















"public var",{kind: undefined},























"public var",{items: undefined},

















"public var",{location: undefined},












"public var",{oldLocation: undefined},










"override public function toString",function()
{
return this.formatToString("CollectionEvent","kind","location",
"oldLocation","type","bubbles",
"cancelable","eventPhase");
},










"override public function clone",function()
{
return new mx.events.CollectionEvent(this.type,this.bubbles,this.cancelable,this.kind,this.location,this.oldLocation,this.items);
},
];},[],["flash.events.Event"]

);
// class mx.collections.ListCollectionView
joo.classLoader.prepare(










"package mx.collections",







































"public interface ListCollectionView\n"+
"extends mx.collections.IList",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
















"public static const",{VERSION:"4.1.0.16076"},


];},[],["mx.collections.IList"]
);
// class mx.collections.ArrayCollection
joo.classLoader.prepare(










"package mx.collections",





































"public class ArrayCollection extends Array implements mx.collections.ListCollectionView",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},
















"public static const",{VERSION:"4.1.0.16076"},














"public function ArrayCollection",function(source)
{
this[$super]();

if(source){
for(var i=0;i<source.length;++i){
this[i]=source[i];
}
this.length=source.length;
}
},










"public function getItemAt",function(index,prefetch){if(arguments.length<2){prefetch=0;}
if(index<0||index>=this.length)
{
throw new Error("[collections] outOfBounds: "+index);
}

return this[index];
},




"public function addItem",function(item){
this[this.length++]=item;
},




"public function toArray",function(){
var result=[];
for(var i=0;i<this.length;++i){
result[i]=this[i];
}
return result;
},




"public function getItemIndex",function(item){
return this.indexOf(item);
},




"public function removeAll",function(){
this.length=0;
},




"public function setItemAt",function(item,index){
var oldItem=this.getItemAt(index);
this[index]=item;
return oldItem;
},







"public function addItemAt",function(item,index){
throw new Error("not implemented");
},

"public function itemUpdated",function(item,property,oldValue,newValue){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){property=null;}oldValue=null;}newValue=null;}
throw new Error("not implemented");
},

"public function removeItemAt",function(index){
throw new Error("not implemented");
},

"public function dispatchEvent",function(event){
throw new Error("not implemented");
},

"public function hasEventListener",function(type){
throw new Error("not implemented");
},

"public function willTrigger",function(type){
throw new Error("not implemented");
},

"public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
throw new Error("not implemented");
},

"public function addEventListener",function(type,listener,useCapture,priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
throw new Error("not implemented");
},
];},[],["Array","mx.collections.ListCollectionView","Error"]
);
// class mx.collections.IList
joo.classLoader.prepare(










"package mx.collections",






























"public interface IList extends flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[















,













,













,


















,















,


























,











,











,














,











,
];},[],["flash.events.IEventDispatcher"]

);
// class mx.messaging.messages.AsyncMessage
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
// class mx.messaging.messages.IMessage
joo.classLoader.prepare(










"package mx.messaging.messages",











"public interface IMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[





















,




,














,




,














,




,


















,




,
















,




,




















,




,






















,




,


















,

];},[],[]

);
// class mx.messaging.messages.AcknowledgeMessageExt
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
// class mx.messaging.messages.ErrorMessage
joo.classLoader.prepare(










"package mx.messaging.messages",















"public class ErrorMessage extends mx.messaging.messages.AcknowledgeMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getSmallMessage=$$l+'getSmallMessage';return[

















"public static const",{MESSAGE_DELIVERY_IN_DOUBT:"Client.Error.DeliveryInDoubt"},












"public static const",{RETRYABLE_HINT_HEADER:"DSRetryableErrorHint"},
















"public function ErrorMessage",function()
{
this[$super]();
},



















"public var",{faultCode: undefined},










"public var",{faultString: undefined},











"public var",{faultDetail: undefined},












"public var",{rootCause: undefined},











"public var",{extendedData: undefined},











"override public function getSmallMessage",function()
{
return null;
},
];},[],["mx.messaging.messages.AcknowledgeMessage"]

);
// class mx.messaging.messages.AsyncMessageExt
joo.classLoader.prepare(










"package mx.messaging.messages",















"public class AsyncMessageExt extends mx.messaging.messages.AsyncMessage implements flash.utils.IExternalizable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$writeExternal=$$l+'writeExternal',$messageId=$$l+'messageId',$_message=$$l+'_message';return[







"public function AsyncMessageExt",function(message)
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
];},[],["mx.messaging.messages.AsyncMessage","flash.utils.IExternalizable"]

);
// class mx.messaging.messages.ISmallMessage
joo.classLoader.prepare(










"package mx.messaging.messages",












"public interface ISmallMessage extends mx.messaging.messages.IMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[























,
];},[],["mx.messaging.messages.IMessage"]

);
// class mx.messaging.messages.AbstractMessage
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
// class mx.messaging.messages.AcknowledgeMessage
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
// class mx.messaging.events.MessageFaultEvent
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
// class mx.messaging.events.MessageEvent
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
