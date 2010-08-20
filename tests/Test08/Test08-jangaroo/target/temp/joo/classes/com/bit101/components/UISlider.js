joo.classLoader.prepare(



























"package com.bit101.components",




"public class UISlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.events.Event);},

"protected var",{_label: undefined},
"protected var",{_valueLabel: undefined},
"protected var",{_slider: undefined},
"protected var",{_precision:1},
"protected var",{_sliderClass: undefined},
"protected var",{_labelText: undefined},
"protected var",{_tick:1},










"public function UISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._labelText=label;
this[$super](parent,x,y);
if(defaultEventHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultEventHandler);
}
this.formatValueLabel();
},




"override protected function addChildren",function()
{
this._label=new com.bit101.components.Label(this,0,0);
this._slider=new this._sliderClass(this,0,0,$$bound(this,"onSliderChange"));
this._valueLabel=new com.bit101.components.Label(this);
},




"protected function formatValueLabel",function()
{
var mult=Math.pow(10,this._precision);
var val=(Math.round(this._slider.value*mult)/mult).toString();
var parts=val.split(".");
if(parts[1]==null)
{
if(this._precision>0)
{
val+=".";
}
for(var i=0;i<this._precision;i++)
{
val+="0";
}
}
else if(parts[1].length<this._precision)
{
for(i=0;i<this._precision-parts[1].length;i++)
{
val+="0";
}
}
this._valueLabel.text=val;
this.positionLabel();
},




"protected function positionLabel",function()
{

},











"override public function draw",function()
{
this[$draw]();
this._label.text=this._labelText;
this._label.draw();
this.formatValueLabel();
},







"public function setSliderParams",function(min,max,value)
{
this._slider.setSliderParams(min,max,value);
},












"protected function onSliderChange",function(event)
{
this.formatValueLabel();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},











"public function set value",function(v)
{
this._slider.value=v;
this.formatValueLabel();
},
"public function get value",function()
{
return this._slider.value;
},




"public function set maximum",function(m)
{
this._slider.maximum=m;
},
"public function get maximum",function()
{
return this._slider.maximum;
},




"public function set minimum",function(m)
{
this._slider.minimum=m;
},
"public function get minimum",function()
{
return this._slider.minimum;
},




"public function set labelPrecision",function(decimals)
{
this._precision=decimals;
},
"public function get labelPrecision",function()
{
return this._precision;
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




"public function set tick",function(t)
{
this._tick=t;
this._slider.tick=this._tick;
},
"public function get tick",function()
{
return this._tick;
},


];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.Label","Math"]
);