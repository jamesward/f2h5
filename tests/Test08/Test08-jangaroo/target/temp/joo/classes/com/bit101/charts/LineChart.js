joo.classLoader.prepare(



























"package com.bit101.charts",



"public class LineChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$drawChart=$$l+'drawChart';return[

"protected var",{_lineWidth:1},
"protected var",{_lineColor:0x999999},








"public function LineChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);
},




"protected override function drawChart",function()
{
var border=2;
var lineWidth=(this._width-border)/(this._data.length-1);
var chartHeight=this._height-border;
this._chartHolder.x=0;
this._chartHolder.y=this._height;
var xpos=border;
var max=this.getMaxValue();
var min=this.getMinValue();
var scale=chartHeight/(max-min);
this._chartHolder.graphics.lineStyle(this._lineWidth,this._lineColor);
this._chartHolder.graphics.moveTo(xpos,(this._data[0]-min)*-scale);
xpos+=lineWidth;
for(var i=1;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
this._chartHolder.graphics.lineTo(xpos,(this._data[i]-min)*-scale);
}
xpos+=lineWidth;
}
},









"public function set lineWidth",function(value)
{
this._lineWidth=value;
this.invalidate();
},
"public function get lineWidth",function()
{
return this._lineWidth;
},




"public function set lineColor",function(value)
{
this._lineColor=value;
this.invalidate();
},
"public function get lineColor",function()
{
return this._lineColor;
},


];},[],["com.bit101.charts.Chart"]
);