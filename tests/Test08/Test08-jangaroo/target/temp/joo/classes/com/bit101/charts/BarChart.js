joo.classLoader.prepare(



























"package com.bit101.charts",



"public class BarChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$drawChart=$$l+'drawChart';return[

"protected var",{_spacing:2},
"protected var",{_barColor:0x999999},








"public function BarChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);
},




"protected override function drawChart",function()
{
var border=2;
var totalSpace=this._spacing*this._data.length;
var barWidth=(this._width-border-totalSpace)/this._data.length;
var chartHeight=this._height-border;
this._chartHolder.x=0;
this._chartHolder.y=this._height;
var xpos=border;
var max=this.getMaxValue();
var min=this.getMinValue();
var scale=chartHeight/(max-min);
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
this._chartHolder.graphics.beginFill(this._barColor);
this._chartHolder.graphics.drawRect(xpos,0,barWidth,(this._data[i]-min)*-scale);
this._chartHolder.graphics.endFill();
}
xpos+=barWidth+this._spacing;
}
},










"public function set spacing",function(value)
{
this._spacing=value;
this.invalidate();
},
"public function get spacing",function()
{
return this._spacing;
},




"public function set barColor",function(value)
{
this._barColor=value;
this.invalidate();
},
"public function get barColor",function()
{
return this._barColor;
},


];},[],["com.bit101.charts.Chart"]
);