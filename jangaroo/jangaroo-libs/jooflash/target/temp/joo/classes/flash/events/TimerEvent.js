joo.classLoader.prepare("package flash.events",



"public class TimerEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[

"public static const",{TIMER:"timer"},
"public static const",{TIMER_COMPLETE:"timerComplete"},

"public function TimerEvent",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}
this[$super](type,bubbles,cancelable);
},

"override public function clone",function(){
return new flash.events.TimerEvent(this.type,this.bubbles,this.cancelable);
},

"override public function toString",function(){
return this.formatToString("TimerEvent","type","bubbles","cancelable");
},

"public function updateAfterEvent",function(){

},
];},[],["flash.events.Event"]
);