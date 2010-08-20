joo.classLoader.prepare("package flash.events",



















































"public class EventDispatcher extends Object implements flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$captureListeners=$$l+'captureListeners',$listeners=$$l+'listeners',$target=$$l+'target';return[












"public function EventDispatcher",function(target){if(arguments.length<1){target=null;}this[$super]();
this[$target]=target;
this[$captureListeners]={};
this[$listeners]={};
},

"public function dispatchEvent",function(event){
event.target=this[$target]||this;
var listeners=this[$listeners][event.type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i](event)===false){
event.stopPropagation();
event.preventDefault();
}
if(event.isImmediatePropagationStopped()){
return false;
}
}
}
return event.isDefaultPrevented();
},

"public function willTrigger",function(type){
return this.hasEventListener(type);
},

"public function addEventListener",function(type,listener,useCapture,priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
if(listenersByType!=undefined)
{
if(!(type in listenersByType)){
listenersByType[type]=[listener];
}else{
listenersByType[type].push(listener);
}
}
},

"public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
var listeners=listenersByType[type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i]==listener){
if(listeners.length==1){
delete listenersByType[type];
}else{
listeners.splice(i,1);
}
return;
}
}
}
},

"public function hasEventListener",function(type){
if(this[$listeners]!=undefined)
{
return this[$listeners][type]||this[$captureListeners][type];
}
return false;
},

"public function toString",function(){
return["EventDispatcher[target=",this[$target],"]"].join("");
},

"private var",{captureListeners: undefined},
"private var",{listeners: undefined},
"private var",{target: undefined},
];},[],["Object","flash.events.IEventDispatcher"]
);