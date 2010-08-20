joo.classLoader.prepare("package flash.utils",

















"public class Timer extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_delay=$$l+'_delay',$_repeatCount=$$l+'_repeatCount',$_currentCount=$$l+'_currentCount',$tick=$$l+'tick',$checkComplete=$$l+'checkComplete',$timer=$$l+'timer';return[function(){joo.classLoader.init(flash.events.TimerEvent);},














"public function Timer",function(delay,repeatCount){if(arguments.length<2){repeatCount=0;}this[$super]();
this[$_delay]=delay;
this[$_repeatCount]=repeatCount;
},





"public function get delay",function(){
return this[$_delay];
},






"public function set delay",function(val){
this[$_delay]=val;
if(this[$timer]){
this.stop();
this.start();
}
},

"private var",{_delay: undefined},





"public function get repeatCount",function(){
return this[$_repeatCount];
},










"public function set repeatCount",function(val){
this[$_repeatCount]=val;
this[$checkComplete]();
},

"private var",{_repeatCount: undefined},





"public function get running",function(){
return this[$timer]!=null;
},






"public function get currentCount",function(){
return this[$_currentCount];
},

"private var",{_currentCount:0},




"public function start",function(){
if(!this[$timer]){
this[$timer]=window.setInterval($$bound(this,$tick),this[$_delay]);
}
},







"public function stop",function(){
if(this[$timer]){
window.clearInterval(this[$timer]);
this[$timer]=null;
}
},







"public function reset",function(){
this.stop();
this[$_currentCount]=0;
},

"private function tick",function(){
if(!this[$timer]){

return;
}
++this[$_currentCount];
try{
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER));
}finally{
this[$checkComplete]();
}
},

"private function checkComplete",function(){
if(this[$_repeatCount]>0&&this[$_currentCount]>=this[$_repeatCount]){
this.stop();
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER_COMPLETE));
}
},

"private var",{timer:null},
];},[],["flash.events.EventDispatcher","flash.events.TimerEvent"]
);