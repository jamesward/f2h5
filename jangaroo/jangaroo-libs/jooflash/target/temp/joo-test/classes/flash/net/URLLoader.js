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
this[$xmlHttpRequest].send(null);
},

"private function readyStateChanged",function(){
trace("URLLoader: "+this[$xmlHttpRequest].readyState);
if(this[$xmlHttpRequest].readyState==js.XMLHttpRequest.DONE){
this.data=this[$xmlHttpRequest].responseText;
}
var event=this[$createEvent]();
if(event){
this.dispatchEvent(event);
}
},

"private function createEvent",function(){
switch(this[$xmlHttpRequest].readyState){
case js.XMLHttpRequest.OPENED:return new flash.events.Event(flash.events.Event.OPEN,false,false);
case js.XMLHttpRequest.DONE:return new flash.events.Event(flash.events.Event.COMPLETE,false,false);
}
return null;

},
"private var",{xmlHttpRequest: undefined},
];},[],["flash.events.EventDispatcher","flash.net.URLLoaderDataFormat","js.XMLHttpRequest","Error","flash.events.Event"]
);