joo.classLoader.prepare(



























"package com.bit101.components",








"public class ScrollBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$init=$$l+'init',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.display.Shape,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,flash.utils.Timer,com.bit101.components.Style,com.bit101.components.Slider,com.bit101.components.ScrollSlider);},

"protected const",{DELAY_TIME:500},
"protected const",{REPEAT_TIME:100},
"protected const",{UP:"up"},
"protected const",{DOWN:"down"},

"protected var",{_upButton: undefined},
"protected var",{_downButton: undefined},
"protected var",{_scrollSlider: undefined},
"protected var",{_orientation: undefined},
"protected var",{_lineSize:1},
"protected var",{_delayTimer: undefined},
"protected var",{_repeatTimer: undefined},
"protected var",{_direction: undefined},
"protected var",{_shouldRepeat:false},









"public function ScrollBar",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function addChildren",function()
{
this._scrollSlider=new com.bit101.components.ScrollSlider(this._orientation,this,0,10,$$bound(this,"onChange"));
this._upButton=new com.bit101.components.PushButton(this,0,0,"");
this._upButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onUpClick"));
this._upButton.setSize(10,10);
var upArrow=new flash.display.Shape();
this._upButton.addChild(upArrow);

this._downButton=new com.bit101.components.PushButton(this,0,0,"");
this._downButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDownClick"));
this._downButton.setSize(10,10);
var downArrow=new flash.display.Shape();
this._downButton.addChild(downArrow);

if(this._orientation==com.bit101.components.Slider.VERTICAL)
{
upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
upArrow.graphics.moveTo(5,3);
upArrow.graphics.lineTo(7,6);
upArrow.graphics.lineTo(3,6);
upArrow.graphics.endFill();

downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
downArrow.graphics.moveTo(5,7);
downArrow.graphics.lineTo(7,4);
downArrow.graphics.lineTo(3,4);
downArrow.graphics.endFill();
}
else
{
upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
upArrow.graphics.moveTo(3,5);
upArrow.graphics.lineTo(6,7);
upArrow.graphics.lineTo(6,3);
upArrow.graphics.endFill();

downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
downArrow.graphics.moveTo(7,5);
downArrow.graphics.lineTo(4,7);
downArrow.graphics.lineTo(4,3);
downArrow.graphics.endFill();
}


},




"protected override function init",function()
{
this[$init]();
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this.setSize(100,10);
}
else
{
this.setSize(10,100);
}
this._delayTimer=new flash.utils.Timer(this.DELAY_TIME,1);
this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE,$$bound(this,"onDelayComplete"));
this._repeatTimer=new flash.utils.Timer(this.REPEAT_TIME);
this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onRepeat"));
},













"public function setSliderParams",function(min,max,value)
{
this._scrollSlider.setSliderParams(min,max,value);
},




"public function setThumbPercent",function(value)
{
this._scrollSlider.setThumbPercent(value);
},




"override public function draw",function()
{
this[$draw]();
if(this._orientation==com.bit101.components.Slider.VERTICAL)
{
this._scrollSlider.x=0;
this._scrollSlider.y=10;
this._scrollSlider.width=10;
this._scrollSlider.height=this._height-20;
this._downButton.x=0;
this._downButton.y=this._height-10;
}
else
{
this._scrollSlider.x=10;
this._scrollSlider.y=0;
this._scrollSlider.width=this._width-20;
this._scrollSlider.height=this._height;
this._downButton.x=this._width-10;
this._downButton.y=0;
}
this._scrollSlider.draw();
},












"public function set value",function(v)
{
this._scrollSlider.value=v;
},
"public function get value",function()
{
return this._scrollSlider.value;
},




"public function set minimum",function(v)
{
this._scrollSlider.minimum=v;
},
"public function get minimum",function()
{
return this._scrollSlider.minimum;
},




"public function set maximum",function(v)
{
this._scrollSlider.maximum=v;
},
"public function get maximum",function()
{
return this._scrollSlider.maximum;
},




"public function set lineSize",function(value)
{
this._lineSize=value;
},
"public function get lineSize",function()
{
return this._lineSize;
},




"public function set pageSize",function(value)
{
this._scrollSlider.pageSize=value;
this.invalidate();
},
"public function get pageSize",function()
{
return this._scrollSlider.pageSize;
},










"protected function onUpClick",function(event)
{
this.goUp();
this._shouldRepeat=true;
this._direction=this.UP;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function goUp",function()
{
this._scrollSlider.value-=this._lineSize;
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},

"protected function onDownClick",function(event)
{
this.goDown();
this._shouldRepeat=true;
this._direction=this.DOWN;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function goDown",function()
{
this._scrollSlider.value+=this._lineSize;
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},

"protected function onMouseUp",function(event)
{
this._delayTimer.stop();
this._repeatTimer.stop();
this._shouldRepeat=false;
},

"protected function onChange",function(event)
{
this.dispatchEvent(event);
},

"protected function onDelayComplete",function(event)
{
if(this._shouldRepeat)
{
this._repeatTimer.start();
}
},

"protected function onRepeat",function(event)
{
if(this._direction==this.UP)
{
this.goUp();
}
else
{
this.goDown();
}
},




];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.ScrollSlider","com.bit101.components.PushButton","flash.events.MouseEvent","flash.display.Shape","com.bit101.components.Slider","com.bit101.components.Style","flash.utils.Timer","flash.events.TimerEvent"]
);