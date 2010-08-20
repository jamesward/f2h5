joo.classLoader.prepare(



























"package com.bit101.components",




"public class ProgressBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_bar: undefined},
"protected var",{_value:0},
"protected var",{_max:1},







"public function ProgressBar",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},





"override protected function init",function()
{
this[$init]();
this.setSize(100,10);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._bar=new flash.display.Sprite();
this._bar.x=1;
this._bar.y=1;

this.addChild(this._bar);
},




"protected function update",function()
{
this._bar.scaleX=this._value/this._max;
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._bar.graphics.clear();
this._bar.graphics.beginFill(com.bit101.components.Style.PROGRESS_BAR);
this._bar.graphics.drawRect(0,0,this._width-2,this._height-2);
this._bar.graphics.endFill();
this.update();
},















"public function set maximum",function(m)
{
this._max=m;
this._value=Math.min(this._value,this._max);
this.update();
},
"public function get maximum",function()
{
return this._max;
},




"public function set value",function(v)
{
this._value=Math.min(v,this._max);
this.update();
},
"public function get value",function()
{
return this._value;
},

];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style","Math"]
);