joo.classLoader.prepare(



























"package com.bit101.components",




"public class HUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$positionLabel=$$l+'positionLabel',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.HSlider);},










"public function HUISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._sliderClass=com.bit101.components.HSlider;
this[$super](parent,x,y,label,defaultEventHandler);
},




"override protected function init",function()
{
this[$init]();
this.setSize(200,18);
},




"override protected function positionLabel",function()
{
this._valueLabel.x=this._slider.x+this._slider.width+5;
},











"override public function draw",function()
{
this[$draw]();
this._slider.x=this._label.width+5;
this._slider.y=this.height/2-this._slider.height/2;
this._slider.width=this.width-this._label.width-50-10;

this._valueLabel.x=this._slider.x+this._slider.width+5;
},









];},[],["com.bit101.components.UISlider","com.bit101.components.HSlider"]
);