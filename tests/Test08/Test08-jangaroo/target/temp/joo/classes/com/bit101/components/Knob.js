joo.classLoader.prepare(



























"package com.bit101.components",






"public class Knob extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"public static const",{VERTICAL:"vertical"},
"public static const",{HORIZONTAL:"horizontal"},
"public static const",{ROTATE:"rotate"},

"protected var",{_knob: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_max:100},
"protected var",{_min:0},
"protected var",{_mode:function(){return(com.bit101.components.Knob.VERTICAL);}},
"protected var",{_mouseRange:100},
"protected var",{_precision:1},
"protected var",{_radius:20},
"protected var",{_startX: undefined},
"protected var",{_startY: undefined},
"protected var",{_value:0},
"protected var",{_valueLabel: undefined},










"public function Knob",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);this._mode=this._mode();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
},




"override protected function addChildren",function()
{
this._knob=new flash.display.Sprite();
this._knob.buttonMode=true;
this._knob.useHandCursor=true;
this._knob.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this.addChild(this._knob);

this._label=new com.bit101.components.Label();
this._label.autoSize=true;
this.addChild(this._label);

this._valueLabel=new com.bit101.components.Label();
this._valueLabel.autoSize=true;
this.addChild(this._valueLabel);
},




"protected function drawKnob",function()
{
this._knob.graphics.clear();
this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._knob.graphics.drawCircle(0,0,this._radius);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._knob.graphics.drawCircle(0,0,this._radius-2);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
var s=this._radius*.1;
this._knob.graphics.drawRect(this._radius,-s,s*1.5,s*2);
this._knob.graphics.endFill();

this._knob.x=this._radius;
this._knob.y=this._radius+20;
this.updateKnob();
},




"protected function updateKnob",function()
{
this._knob.rotation=-225+(this._value-this._min)/(this._max-this._min)*270;
this.formatValueLabel();
},




"protected function correctValue",function()
{
if(this._max>this._min)
{
this._value=Math.min(this._value,this._max);
this._value=Math.max(this._value,this._min);
}
else
{
this._value=Math.max(this._value,this._max);
this._value=Math.min(this._value,this._min);
}
},




"protected function formatValueLabel",function()
{
var mult=Math.pow(10,this._precision);
var val=(Math.round(this._value*mult)/mult).toString();
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
this._valueLabel.draw();
this._valueLabel.x=this.width/2-this._valueLabel.width/2;
},








"override public function draw",function()
{
this[$draw]();

this.drawKnob();

this._label.text=this._labelText;
this._label.draw();
this._label.x=this._radius-this._label.width/2;
this._label.y=0;

this.formatValueLabel();
this._valueLabel.x=this._radius-this._valueLabel.width/2;
this._valueLabel.y=this._radius*2+20;

this._width=this._radius*2;
this._height=this._radius*2+40;
},








"protected function onMouseDown",function(event)
{


this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},




"protected function onMouseMove",function(event)
{
if(this._mode==com.bit101.components.Knob.ROTATE)
{
var angle=0;
var rot=angle*180/Math.PI-135;
while(rot>360)rot-=360;
while(rot<0)rot+=360;
if(rot>270&&rot<315)rot=270;
if(rot>=315&&rot<=360)rot=0;
this._value=rot/270*(this._max-this._min)+this._min;

this._knob.rotation=rot+135;
this.formatValueLabel();
}
else if(this._mode==com.bit101.components.Knob.VERTICAL)
{
var oldValue=this._value;
var diff=this._startY-0;
var range=this._max-this._min;
var percent=range/this._mouseRange;
this._value+=percent*diff;
this.correctValue();
if(this._value!=oldValue)
{
this.updateKnob();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this._startY=0;
}
else if(this._mode==com.bit101.components.Knob.HORIZONTAL)
{
oldValue=this._value;
diff=this._startX-0;
range=this._max-this._min;
percent=range/this._mouseRange;
this._value-=percent*diff;
this.correctValue();
if(this._value!=oldValue)
{
this.updateKnob();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this._startX=0;
}
},




"protected function onMouseUp",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},









"public function set maximum",function(m)
{
this._max=m;
this.correctValue();
this.updateKnob();
},
"public function get maximum",function()
{
return this._max;
},




"public function set minimum",function(m)
{
this._min=m;
this.correctValue();
this.updateKnob();
},
"public function get minimum",function()
{
return this._min;
},




"public function set value",function(v)
{
this._value=v;
this.correctValue();
this.updateKnob();
},
"public function get value",function()
{
return this._value;
},




"public function set mouseRange",function(value)
{
this._mouseRange=value;
},
"public function get mouseRange",function()
{
return this._mouseRange;
},




"public function set labelPrecision",function(decimals)
{
this._precision=decimals;
},
"public function get labelPrecision",function()
{
return this._precision;
},




"public function set showValue",function(value)
{
this._valueLabel.visible=value;
},
"public function get showValue",function()
{
return this._valueLabel.visible;
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

"public function set mode",function(value)
{
this._mode=value;
},
"public function get mode",function()
{
return this._mode;
},

"public function get radius",function()
{
return this._radius;
},

"public function set radius",function(value)
{
this._radius=value;
this.invalidate();
},
];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math"]
);