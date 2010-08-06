joo.classLoader.prepare("package flash.events", [

"import flash.events.Event",""],

"public class TimerEvent extends Event",function(TimerEvent,$$private){with(TimerEvent)with($$private)return[ 

  "public static const",{ TIMER/* : String*/ : "timer"},
  "public static const",{ TIMER_COMPLETE/*:String*/ : "timerComplete"},

  "public function TimerEvent",function $TimerEvent(type/* : String*/, bubbles/* : Boolean*/, cancelable/* : Boolean*/) {if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}
    this[$super](type, bubbles, cancelable);
  },

  "override public function clone",function clone()/* : Event*/ {
    return new TimerEvent(this.type, this.bubbles, this.cancelable);
  },

  "override public function toString",function toString()/* : String*/ {
    return this.formatToString("TimerEvent", "type", "bubbles", "cancelable");
  },

  "public function updateAfterEvent",function updateAfterEvent()/* : void*/ {
    // TODO
  },
];},[]
);