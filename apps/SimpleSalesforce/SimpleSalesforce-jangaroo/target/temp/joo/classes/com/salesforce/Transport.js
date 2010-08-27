joo.classLoader.prepare(


























"package com.salesforce",



















"public class Transport extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$connection=$$l+'connection',$responder=$$l+'responder',$newConnection=$$l+'newConnection',$handleComplete=$$l+'handleComplete',$parseXML=$$l+'parseXML';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent,flash.net.URLRequestMethod,flash.net.URLRequestHeader,mx.collections.ArrayCollection,Array,flash.events.Event,flash.net.URLLoader,Object,flash.net.URLRequest);},


"public var",{url: undefined},
"private var",{connection: undefined},
"private var",{responder: undefined},


"public function Transport",function(url)
{if(arguments.length<1){url=null;}this[$super]();
if(url!=null)
{
this.url=url;
}
},

"private function newConnection",function()
{
this[$connection]=new flash.net.URLLoader();
},

"public function send",function(envelope,responder)
{
this[$newConnection]();
this[$responder]=responder;
var request=new flash.net.URLRequest();

request.method=flash.net.URLRequestMethod.POST;
request.url=this.url;
request.contentType="text/xml; charset=UTF-8";










request.requestHeaders=new Array(
new flash.net.URLRequestHeader("SOAPAction","\"\""),
new flash.net.URLRequestHeader("Accept","text/xml"),
new flash.net.URLRequestHeader("X-Salesforce-No-500-SC","true")
);

request.data=envelope.toString();
this[$connection].dataFormat="xml";
this[$connection].addEventListener(flash.events.Event.COMPLETE,$$bound(this,$handleComplete));
this[$connection].load(request);






this.dispatchEvent(new com.salesforce.events.SendEvent(com.salesforce.events.SendEvent.SEND_REQUEST,envelope.toString()));
},

"public function myFault",function(event){
trace(event.toString());
},

"private function handleComplete",function(event)
{
if(this[$responder]!=null)
{
this[$responder].result({result:this[$parseXML](event.target.data)});
}
},

"private function parseXML",function(xml)
{

if(xml.nodeType==7)
{
return null;
}

var o=new Object();


if(xml.attributes!=null)
{
for(var i=0;i<xml.attributes.length;i++)
{
o[xml.attributes[i].localName]=xml.attributes[i].nodeValue;
}
}

if(xml.childNodes!=null)
{
var nameExists=new Object();
for(var j=0;j<xml.childNodes.length;j++)
{
var n=xml.childNodes[j].localName;
if((nameExists[n]!=undefined)&&(o[n]==undefined))
{
o[n]=new mx.collections.ArrayCollection();
}
else
{
nameExists[n]=true;
}
}

for(var k=0;k<xml.childNodes.length;k++)
{

if(xml.childNodes[k].nodeType==3||xml.childNodes[k].nodeType==4)
{
return xml.childNodes[k].nodeValue;
}

var ln=xml.childNodes[k].localName;

if(is(o[ln],mx.collections.ArrayCollection))
{
o[ln].addItem(this[$parseXML](xml.childNodes[k]));
}
else
{
o[ln]=this[$parseXML](xml.childNodes[k]);
}
}
}

return o;
},
];},[],["flash.events.EventDispatcher","flash.net.URLLoader","flash.net.URLRequest","flash.net.URLRequestMethod","Array","flash.net.URLRequestHeader","flash.events.Event","com.salesforce.events.SendEvent","Object","mx.collections.ArrayCollection"]
);