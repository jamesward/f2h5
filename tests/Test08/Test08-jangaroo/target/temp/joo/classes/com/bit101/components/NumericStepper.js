joo.classLoader.prepare(



























"package com.bit101.components",








"public class NumericStepper extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.InputText,com.bit101.components.PushButton,Number,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,Error,flash.utils.Timer);},

"protected const",{DELAY_TIME:500},
"protected const",{UP:"up"},
"protected const",{DOWN:"down"},
"protected var",{_minusBtn: undefined},

"protected var",{_repeatTime:100},
"protected var",{_plusBtn: undefined},
"protected var",{_valueText: undefined},
"protected var",{_value:0},
"protected var",{_step:1},
"protected var",{_labelPrecision:1},
"protected var",{_maximum:function(){return(Number.POSITIVE_INFINITY);}},
"protected var",{_minimum:function(){return(Number.NEGATIVE_INFINITY);}},
"protected var",{_delayTimer: undefined},
"protected var",{_repeatTimer: undefined},
"protected var",{_direction: undefined},








"public function NumericStepper",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](parent,xpos,ypos);this._maximum=this._maximum();this._minimum=this._minimum();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
this.setSize(80,16);
this._delayTimer=new flash.utils.Timer(this.DELAY_TIME,1);
this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE,$$bound(this,"onDelayComplete"));
this._repeatTimer=new flash.utils.Timer(this._repeatTime);
this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onRepeat"));
},




"protected override function addChildren",function()
{
this._valueText=new com.bit101.components.InputText(this,0,0,"0",$$bound(this,"onValueTextChange"));
this._valueText.restrict="-0123456789.";
this._minusBtn=new com.bit101.components.PushButton(this,0,0,"-");
this._minusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMinus"));
this._minusBtn.setSize(16,16);
this._plusBtn=new com.bit101.components.PushButton(this,0,0,"+");
this._plusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onPlus"));
this._plusBtn.setSize(16,16);
},

"protected function increment",function()
{
if(this._value+this._step<=this._maximum)
{
this._value+=this._step;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},

"protected function decrement",function()
{
if(this._value-this._step>=this._minimum)
{
this._value-=this._step;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},











"public override function draw",function()
{
this._plusBtn.x=this._width-16;
this._minusBtn.x=this._width-32;
this._valueText.text=(Math.round(this._value*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision)).toString();
this._valueText.width=this._width-32;
this._valueText.draw();
},












"protected function onMinus",function(event)
{
this.decrement();
this._direction=this.DOWN;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},




"protected function onPlus",function(event)
{
this.increment();
this._direction=this.UP;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMouseUp",function(event)
{
this._delayTimer.stop();
this._repeatTimer.stop();
},




"protected function onValueTextChange",function(event)
{
var newVal=(this._valueText.text);
if(newVal<=this._maximum&&newVal>=this._minimum)
{
this._value=newVal;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},

"protected function onDelayComplete",function(event)
{
this._repeatTimer.start();
},

"protected function onRepeat",function(event)
{
if(this._direction==this.UP)
{
this.increment();
}
else
{
this.decrement();
}
},










"public function set value",function(val)
{
if(val<=this._maximum&&val>=this._minimum)
{
this._value=val;
this.invalidate();
}
},
"public function get value",function()
{
return this._value;
},




"public function set step",function(value)
{
if(value<0)
{
throw new Error("NumericStepper step must be positive.");
}
this._step=value;
},
"public function get step",function()
{
return this._step;
},




"public function set labelPrecision",function(value)
{
this._labelPrecision=value;
this.invalidate();
},
"public function get labelPrecision",function()
{
return this._labelPrecision;
},




"public function set maximum",function(value)
{
this._maximum=value;
if(this._value>this._maximum)
{
this._value=this._maximum;
this.invalidate();
}
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
if(this._value<this._minimum)
{
this._value=this._minimum;
this.invalidate();
}
},
"public function get minimum",function()
{
return this._minimum;
},




"public function get repeatTime",function()
{
return this._repeatTime;
},

"public function set repeatTime",function(value)
{

this._repeatTime=Math.max(value,10);
this._repeatTimer.delay=this._repeatTime;
},
];},[],["com.bit101.components.Component","Number","flash.events.Event","flash.utils.Timer","flash.events.TimerEvent","com.bit101.components.InputText","com.bit101.components.PushButton","flash.events.MouseEvent","Math","Error"]
);