joo.classLoader.prepare("package flash.events",





"public class MouseEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[


"public static const",{CLICK:"click"},

"public static const",{DOUBLE_CLICK:"doubleClick"},

"public static const",{MOUSE_DOWN:"mouseDown"},

"public static const",{MOUSE_MOVE:"mouseMove"},

"public static const",{MOUSE_OUT:"mouseOut"},

"public static const",{MOUSE_OVER:"mouseOver"},

"public static const",{MOUSE_UP:"mouseUp"},

"public static const",{MOUSE_WHEEL:"mouseWheel"},

"public static const",{ROLL_OUT:"rollOut"},

"public static const",{ROLL_OVER:"rollOver"},


"public var",{altKey: undefined},


"public var",{buttonDown: undefined},


"public var",{ctrlKey: undefined},


"public var",{delta: undefined},


"public var",{localX: undefined},


"public var",{localY: undefined},


"public var",{relatedObject: undefined},


"public var",{shiftKey: undefined},


"public var",{stageX: undefined},


"public var",{stageY: undefined},


"public override function clone",function(){
return new flash.events.MouseEvent(this.type,this.bubbles,this.cancelable,this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta);
},


"public function MouseEvent",function(type,bubbles,cancelable,
localX,localY,relatedObject,
ctrlKey,altKey,shiftKey,
buttonDown,delta){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){type=null;}bubbles=true;}cancelable=false;}localX=NaN;}localY=NaN;}relatedObject=null;}ctrlKey=false;}altKey=false;}shiftKey=false;}buttonDown=false;}delta=0;}
this[$super](type,bubbles,cancelable);
this.localX=localX;
this.localY=localY;
this.relatedObject=relatedObject;
this.ctrlKey=ctrlKey;
this.altKey=altKey;
this.shiftKey=shiftKey;
this.buttonDown=buttonDown;
this.delta=delta;
},


"public override function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase",
"localX","localY","relatedObject","ctrlKey","altKey","shiftKey","buttonDown","delta");
},


"public function updateAfterEvent",function(){

},
];},[],["flash.events.Event"]
);