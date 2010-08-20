joo.classLoader.prepare(



























"package com.bit101.components",




"public class VUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$draw=$$l+'draw',$positionLabel=$$l+'positionLabel',$width=$$l+'width';return[function(){joo.classLoader.init(com.bit101.components.VSlider);},











"public function VUISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._sliderClass=com.bit101.components.VSlider;
this[$super](parent,x,y,label,defaultEventHandler);
},




"protected override function init",function()
{
this[$init]();
this.setSize(20,146);
},








"override public function draw",function()
{
this[$draw]();
this._label.x=this.width/2-this._label.width/2;

this._slider.x=this.width/2-this._slider.width/2;
this._slider.y=this._label.height+5;
this._slider.height=this.height-this._label.height-this._valueLabel.height-10;

this._valueLabel.x=this.width/2-this._valueLabel.width/2;
this._valueLabel.y=this._slider.y+this._slider.height+5;
},

"override protected function positionLabel",function()
{
this._valueLabel.x=this.width/2-this._valueLabel.width/2;
},












"override public function get width",function()
{
if(this._label==null)return this._width;
return Math.max(this._width,this._label.width);
},

];},[],["com.bit101.components.UISlider","com.bit101.components.VSlider","Math"]
);