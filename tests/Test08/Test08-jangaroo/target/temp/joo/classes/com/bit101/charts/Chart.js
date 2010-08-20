joo.classLoader.prepare(



























"package com.bit101.charts",









"public class Chart extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,com.bit101.components.Panel,Number,flash.display.Shape);},

"protected var",{_data: undefined},
"protected var",{_chartHolder: undefined},
"protected var",{_maximum:100},
"protected var",{_minimum:0},
"protected var",{_autoScale:true},
"protected var",{_maxLabel: undefined},
"protected var",{_minLabel: undefined},
"protected var",{_showScaleLabels:false},
"protected var",{_labelPrecision:0},
"protected var",{_panel: undefined},








"public function Chart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this._data=data;
this[$super](parent,xpos,ypos);
},




"protected override function init",function()
{
this[$init]();
this.setSize(200,100);
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._panel=new com.bit101.components.Panel(this);

this._chartHolder=new flash.display.Shape();
this._panel.content.addChild(this._chartHolder);

this._maxLabel=new com.bit101.components.Label();
this._minLabel=new com.bit101.components.Label();
},




"protected function drawChart",function()
{
},




"protected function getMaxValue",function()
{
if(!this._autoScale)return this._maximum;
var maxValue=Number.NEGATIVE_INFINITY;
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
maxValue=Math.max(this._data[i],maxValue);
}
}
return maxValue;
},




"protected function getMinValue",function()
{
if(!this._autoScale)return this._minimum;
var minValue=Number.POSITIVE_INFINITY;
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
minValue=Math.min(this._data[i],minValue);
}
}
return minValue;
},








"public override function draw",function()
{
this[$draw]();
this._panel.setSize(this.width,this.height);
this._panel.draw();
this._chartHolder.graphics.clear();
if(this._data!=null)
{
this.drawChart();

var mult=Math.pow(10,this._labelPrecision);
var maxVal=Math.round(this.maximum*mult)/mult;
this._maxLabel.text=maxVal.toString();
this._maxLabel.draw();
this._maxLabel.x=-this._maxLabel.width-5;
this._maxLabel.y=-this._maxLabel.height*0.5;

var minVal=Math.round(this.minimum*mult)/mult;
this._minLabel.text=minVal.toString();
this._minLabel.draw();
this._minLabel.x=-this._minLabel.width-5;
this._minLabel.y=this.height-this._minLabel.height*0.5;
}
},








"public function set data",function(value)
{
this._data=value;
this.invalidate();
},
"public function get data",function()
{
return this._data;
},




"public function set maximum",function(value)
{
this._maximum=value;
this.invalidate();
},
"public function get maximum",function()
{
if(this._autoScale)return this.getMaxValue();
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
this.invalidate();
},
"public function get minimum",function()
{
if(this._autoScale)return this.getMinValue();
return this._minimum;
},




"public function set autoScale",function(value)
{
this._autoScale=value;
this.invalidate();
},
"public function get autoScale",function()
{
return this._autoScale;
},





"public function set showScaleLabels",function(value)
{
this._showScaleLabels=value;
if(this._showScaleLabels)
{
this.addChild(this._maxLabel);
this.addChild(this._minLabel);
}
else
{


}
},
"public function get showScaleLabels",function()
{
return this._showScaleLabels;
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




"public function set gridSize",function(value)
{
this._panel.gridSize=value;
this.invalidate();
},
"public function get gridSize",function()
{
return this._panel.gridSize;
},




"public function set showGrid",function(value)
{
this._panel.showGrid=value;
this.invalidate();
},
"public function get showGrid",function()
{
return this._panel.showGrid;
},




"public function set gridColor",function(value)
{
this._panel.gridColor=value;
this.invalidate();
},
"public function get gridColor",function()
{
return this._panel.gridColor;
},


];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.display.Shape","com.bit101.components.Label","Number","Math"]
);