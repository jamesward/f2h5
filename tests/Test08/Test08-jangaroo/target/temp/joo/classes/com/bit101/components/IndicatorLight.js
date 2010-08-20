joo.classLoader.prepare(



























"package com.bit101.components",








"public class IndicatorLight extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.geom.Matrix,flash.display.GradientType,flash.display.Shape,flash.events.TimerEvent,flash.utils.Timer);},

"protected var",{_color: undefined},
"protected var",{_lit:false},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_lite: undefined},
"protected var",{_timer: undefined},











"public function IndicatorLight",function(parent,xpos,ypos,color,label)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}color=0xff0000;}label="";}
this._color=color;
this._labelText=label;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this._timer=new flash.utils.Timer(500);
this._timer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onTimer"));
},




"override protected function addChildren",function()
{
this._lite=new flash.display.Shape();
this.addChild(this._lite);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();
},




"protected function drawLite",function()
{
var colors;
if(this._lit)
{
colors=[0xffffff,this._color];
}
else
{
colors=[0xffffff,0];
}

this._lite.graphics.clear();
var matrix=new flash.geom.Matrix();
matrix.createGradientBox(10,10,0,-2.5,-2.5);
this._lite.graphics.beginGradientFill(flash.display.GradientType.RADIAL,colors,[1,1],[0,255],matrix);
this._lite.graphics.drawCircle(5,5,5);
this._lite.graphics.endFill();
},











"protected function onTimer",function(event)
{
this._lit=!this._lit;
this.draw();
},











"override public function draw",function()
{
this[$draw]();
this.drawLite();

this._label.text=this._labelText;
this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._width=this._label.width+12;
this._height=10;
},




"public function flash",function(interval)
{if(arguments.length<1){interval=500;}
if(interval<1)
{
this._timer.stop();
this.isLit=false;
return;
}
this._timer.delay=interval;
this._timer.start();
},











"public function set isLit",function(value)
{
this._timer.stop();
this._lit=value;
this.drawLite();
},
"public function get isLit",function()
{
return this._lit;
},




"public function set color",function(value)
{
this._color=value;
this.draw();
},
"public function get color",function()
{
return this._color;
},




"public function get isFlashing",function()
{
return this._timer.running;
},




"public function set label",function(str)
{
this._labelText=str;
this.draw();
},
"public function get label",function()
{
return this._labelText;
},


];},[],["com.bit101.components.Component","flash.utils.Timer","flash.events.TimerEvent","flash.display.Shape","com.bit101.components.Label","flash.geom.Matrix","flash.display.GradientType"]
);