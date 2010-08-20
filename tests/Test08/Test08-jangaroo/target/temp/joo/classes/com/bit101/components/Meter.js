joo.classLoader.prepare(



























"package com.bit101.components",






"public class Meter extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$setSize=$$l+'setSize';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.Event,com.bit101.components.Style);},

"protected var",{_damp:.8},
"protected var",{_dial: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText: undefined},
"protected var",{_maximum:1.0},
"protected var",{_maxLabel: undefined},
"protected var",{_minimum:0.0},
"protected var",{_minLabel: undefined},
"protected var",{_needle: undefined},
"protected var",{_needleMask: undefined},
"protected var",{_showValues:true},
"protected var",{_targetRotation:0},
"protected var",{_value:0.0},
"protected var",{_velocity:0},











"public function Meter",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this._labelText=text;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this._width=200;
this._height=100;
},





"override protected function addChildren",function()
{
this._dial=new flash.display.Sprite();
this.addChild(this._dial);

this._needle=new flash.display.Sprite();
this._needle.rotation=-50;
this._dial.addChild(this._needle);

this._needleMask=new flash.display.Sprite();
this.addChild(this._needleMask);
this._dial.mask=this._needleMask;

this._minLabel=new com.bit101.components.Label(this);
this._minLabel.text=this._minimum.toString();

this._maxLabel=new com.bit101.components.Label(this);
this._maxLabel.autoSize=true;
this._maxLabel.text=this._maximum.toString();

this._label=new com.bit101.components.Label(this);
this._label.text=this._labelText;
},










"override public function draw",function()
{
var startAngle=-140*Math.PI/180;
var endAngle=-40*Math.PI/180;

this.drawBackground();
this.drawDial(startAngle,endAngle);
this.drawTicks(startAngle,endAngle);
this.drawNeedle();

this._minLabel.move(10,this._height-this._minLabel.height-4);
this._maxLabel.move(this._width-this._maxLabel.width-10,this._height-this._maxLabel.height-4);
this._label.move((this._width-this._label.width)/2,this._height*.5);
this.update();
},






"override public function setSize",function(w,h)
{
this[$setSize](w,w/2);
},








"protected function drawBackground",function()
{
this.graphics.clear();
this.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this.graphics.drawRect(0,0,this._width,this._height);
this.graphics.endFill();

this.graphics.beginFill(com.bit101.components.Style.PANEL);
this.graphics.drawRect(1,1,this._width-2,this._height-2);
this.graphics.endFill();
},




"protected function drawDial",function(startAngle,endAngle)
{
this._dial.x=this._width/2;
this._dial.y=this._height*1.25;
this._dial.graphics.clear();
this._dial.graphics.lineStyle(0,com.bit101.components.Style.BACKGROUND);
this._dial.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
var r1=this._height*1.05;
var r2=this._height*0.96;

this._dial.graphics.moveTo(Math.cos(startAngle)*r1,Math.sin(startAngle)*r1);
for(var i=startAngle;i<endAngle;i+=.1)
{
this._dial.graphics.lineTo(Math.cos(i)*r1,Math.sin(i)*r1);
}
this._dial.graphics.lineTo(Math.cos(endAngle)*r1,Math.sin(endAngle)*r1);

this._dial.graphics.lineTo(Math.cos(endAngle)*r2,Math.sin(endAngle)*r2);
for(i=endAngle;i>startAngle;i-=.1)
{
this._dial.graphics.lineTo(Math.cos(i)*r2,Math.sin(i)*r2);
}
this._dial.graphics.lineTo(Math.cos(startAngle)*r2,Math.sin(startAngle)*r2);
this._dial.graphics.lineTo(Math.cos(startAngle)*r1,Math.sin(startAngle)*r1);

},




"protected function drawTicks",function(startAngle,endAngle)
{
var r1=this._height*1.05;
var r2=this._height*0.96;
var r3=this._height*1.13;
var tick=0;
for(var i=0;i<9;i++)
{
var angle=startAngle+i*(endAngle-startAngle)/8;
this._dial.graphics.moveTo(Math.cos(angle)*r2,Math.sin(angle)*r2);
if(tick++%2==0)
{
this._dial.graphics.lineTo(Math.cos(angle)*r3,Math.sin(angle)*r3);
}
else
{
this._dial.graphics.lineTo(Math.cos(angle)*r1,Math.sin(angle)*r1);
}
}
},




"protected function drawNeedle",function()
{
this._needle.graphics.clear();
this._needle.graphics.beginFill(0xff0000);
this._needle.graphics.drawRect(-0.5,-this._height*1.10,1,this._height*1.10);


this._needleMask.graphics.clear();
this._needleMask.graphics.beginFill(0);
this._needleMask.graphics.drawRect(0,0,this._width,this._height);
this._needleMask.graphics.endFill();
},




"protected function update",function()
{
this._value=Math.max(this._value,this._minimum);
this._value=Math.min(this._value,this._maximum);
this._targetRotation=-50+this._value/(this._maximum-this._minimum)*100;
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
},








"protected function onEnterFrame",function(event)
{
var dist=this._targetRotation-this._needle.rotation;
this._velocity+=dist*.05;
this._velocity*=this._damp;
if(Math.abs(this._velocity)<.1&&Math.abs(dist)<.1)
{
this._needle.rotation=this._targetRotation;
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
}
else
{
this._needle.rotation+=this._velocity;
}
},








"public function set maximum",function(value)
{
this._maximum=value;
this._maxLabel.text=this._maximum.toString();
this.update();
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
this._minLabel.text=this._minimum.toString();
this.update();
},
"public function get minimum",function()
{
return this._minimum;
},




"public function set value",function(val)
{
this._value=val;
this.update();
},
"public function get value",function()
{
return this._value;
},




"public function set label",function(value)
{
this._labelText=value;
this._label.text=this._labelText;
},
"public function get label",function()
{
return this._labelText;
},




"public function set showValues",function(value)
{
this._showValues=value;
this._minLabel.visible=this._showValues;
this._maxLabel.visible=this._showValues;
},
"public function get showValues",function()
{
return this._showValues;
},




"public function set damp",function(value)
{
this._damp=value;
},
"public function get damp",function()
{
return this._damp;
},

];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Label","Math","com.bit101.components.Style","flash.events.Event"]
);