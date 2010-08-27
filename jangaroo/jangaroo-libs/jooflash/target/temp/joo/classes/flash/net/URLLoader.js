joo.classLoader.prepare("package flash.net",




















"public class URLLoader extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$readyStateChanged=$$l+'readyStateChanged',$createEvent=$$l+'createEvent',$xmlHttpRequest=$$l+'xmlHttpRequest';return[function(){joo.classLoader.init(flash.events.Event,js.XMLHttpRequest,Error,flash.net.URLLoaderDataFormat);},




"public var",{bytesLoaded:0},





"public var",{bytesTotal:0},











"public var",{data: undefined},












"public var",{dataFormat:function(){return(flash.net.URLLoaderDataFormat.TEXT);}},







"public function URLLoader",function(request){if(arguments.length<1){request=null;}this[$super]();this.dataFormat=this.dataFormat();
if(request){
this.load(request);
}
},





"public function close",function(){
this[$xmlHttpRequest].abort();
},







































"public function load",function(request){
try{
this[$xmlHttpRequest]=new js.XMLHttpRequest();
}catch(e){if(is(e,Error)){
throw new Error("Your browser does not support XMLHttpRequest: "+e.message);
}else throw e;}
this[$xmlHttpRequest].onreadystatechange=$$bound(this,$readyStateChanged);
this[$xmlHttpRequest].open(request.method,request.url,true);
for(var $1 in request.requestHeaders)
{var h=request.requestHeaders[$1];
this[$xmlHttpRequest].setRequestHeader(h.name,h.value);
}
this[$xmlHttpRequest].setRequestHeader("Content-Type",request.contentType);
this[$xmlHttpRequest].send(request.data);
},

"private function readyStateChanged",function(){
trace("URLLoader: "+this[$xmlHttpRequest].readyState);
if(this[$xmlHttpRequest].readyState==4){
if(this.dataFormat==flash.net.URLLoaderDataFormat.TEXT)
{
this.data=this[$xmlHttpRequest].responseText;
}
else if(this.dataFormat=="xml")
{
this.data=this[$xmlHttpRequest].responseXML;
}
}
var event=this[$createEvent]();
if(event){
this.dispatchEvent(event);
}
},

"private function createEvent",function(){
switch(this[$xmlHttpRequest].readyState){
case 1:return new flash.events.Event(flash.events.Event.OPEN,false,false);
case 4:return new flash.events.Event(flash.events.Event.COMPLETE,false,false);
}
return null;

},
"private var",{xmlHttpRequest: undefined},

];},[],["flash.events.EventDispatcher","flash.net.URLLoaderDataFormat","js.XMLHttpRequest","Error","flash.events.Event"]
);