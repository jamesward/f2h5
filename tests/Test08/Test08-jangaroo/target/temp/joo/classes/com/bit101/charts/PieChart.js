joo.classLoader.prepare("package com.bit101.charts",















"public class PieChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$drawChart=$$l+'drawChart';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Number,Math);},

"protected var",{_sprite: undefined},
"protected var",{_beginningAngle:0},
"protected var",{_colors:function(){return([
0xff9999,0xffff99,0x99ff99,0x99ffff,0x9999ff,0xff99ff,
0xffcccc,0xffffcc,0xccffcc,0xccffff,0xccccff,0xffccff,
0xff6666,0xffff66,0x99ff66,0x66ffff,0x6666ff,0xff66ff,
0xffffff
]);}},










"public function PieChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);this._colors=this._colors();
},




"protected override function init",function()
{
this[$init]();
this.setSize(160,120);
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._sprite=new flash.display.Sprite();
this._panel.content.addChild(this._sprite);
},




"protected override function drawChart",function()
{
var radius=Math.min(this.width-40,this.height-40)/2;
this._sprite.x=this.width/2;
this._sprite.y=this.height/2;
this._sprite.graphics.clear();
this._sprite.graphics.lineStyle(0,0x666666,1);
while(this._sprite.numChildren>0)this._sprite.removeChildAt(0);

var total=this.getDataTotal();
var startAngle=this._beginningAngle*Math.PI/180;
for(var i=0;i<this._data.length;i++)
{
var percent=this.getValueForData(i)/total;
var endAngle=startAngle+Math.PI*2*percent;
this.drawArc(startAngle,endAngle,radius,this.getColorForData(i));
this.makeLabel((startAngle+endAngle)*0.5,radius+10,this.getLabelForData(i));
startAngle=endAngle;
}
},







"protected function makeLabel",function(angle,radius,text)
{
var label=new com.bit101.components.Label(this._sprite,0,0,text);
label.x=Math.cos(angle)*radius;
label.y=Math.sin(angle)*radius-label.height/2;
if(label.x<0)
{
label.x-=label.width;
}
},








"protected function drawArc",function(startAngle,endAngle,radius,color)
{
this._sprite.graphics.beginFill(color);
this._sprite.graphics.moveTo(0,0);
for(var i=startAngle;i<endAngle;i+=.01)
{
this._sprite.graphics.lineTo(Math.cos(i)*radius,Math.sin(i)*radius);
}
this._sprite.graphics.lineTo(Math.cos(endAngle)*radius,Math.sin(endAngle)*radius);
this._sprite.graphics.lineTo(0,0);
this._sprite.graphics.endFill();
},





"protected function getLabelForData",function(index)
{
if(!(is(this._data[index],Number))&&this._data[index].label!=null)
{
return this._data[index].label;
}
var value=Math.round(this.getValueForData(index)*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision);
return value.toString();
},





"protected function getColorForData",function(index)
{
if((is(!this._data[index],Number))&&this._data[index].color!=null)
{
return this._data[index].color;
}
if(index<this._colors.length)
{
return this._colors[index];
}
return Math.random()*0xffffff;
},





"protected function getValueForData",function(index)
{
if(is(this._data[index],Number))
{
return this._data[index];
}
if(this._data[index].value!=null)
{
return this._data[index].value;
}
return NaN;
},




"protected function getDataTotal",function()
{
var total=0;
for(var i=0;i<this._data.length;i++)
{
total+=this.getValueForData(i);
}
return total;
},











"public function set colors",function(value)
{
this._colors=value;
this.invalidate();
},
"public function get colors",function()
{
return this._colors;
},




"public function set beginningAngle",function(value)
{
this._beginningAngle=value;
this.invalidate();
},
"public function get beginningAngle",function()
{
return this._beginningAngle;
},


];},[],["com.bit101.charts.Chart","flash.display.Sprite","Math","com.bit101.components.Label","Number"]
);