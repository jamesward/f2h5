joo.classLoader.prepare(



























"package com.bit101.components",






"public class RotarySelector extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"public static const",{ALPHABETIC:"alphabetic"},
"public static const",{NUMERIC:"numeric"},
"public static const",{NONE:"none"},
"public static const",{ROMAN:"roman"},


"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_knob: undefined},
"protected var",{_numChoices:2},
"protected var",{_choice:0},
"protected var",{_labels: undefined},
"protected var",{_labelMode:function(){return(com.bit101.components.RotarySelector.ALPHABETIC);}},










"public function RotarySelector",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);this._labelMode=this._labelMode();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.setSize(60,60);
},




"override protected function addChildren",function()
{
this._knob=new flash.display.Sprite();
this._knob.buttonMode=true;
this._knob.useHandCursor=true;
this.addChild(this._knob);

this._label=new com.bit101.components.Label();
this._label.autoSize=true;
this.addChild(this._label);

this._labels=new flash.display.Sprite();
this.addChild(this._labels);

this._knob.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"));
},




"protected function decrement",function()
{
if(this._choice>0)
{
this._choice--;
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},




"protected function increment",function()
{
if(this._choice<this._numChoices-1)
{
this._choice++;
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},




"protected function resetLabels",function()
{
while(this._labels.numChildren>0)
{
this._labels.removeChildAt(0);
}
this._labels.x=this._width/2-5;
this._labels.y=this._height/2-10;
},





"protected function drawKnob",function(radius)
{
this._knob.graphics.clear();
this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._knob.graphics.drawCircle(0,0,radius);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._knob.graphics.drawCircle(0,0,radius-2);

this._knob.x=this._width/2;
this._knob.y=this._height/2;
},








"override public function draw",function()
{
this[$draw]();

var radius=Math.min(this._width,this._height)/2;
this.drawKnob(radius);
this.resetLabels();

var arc=Math.PI*1.5/this._numChoices;
var start=-Math.PI/2-arc*(this._numChoices-1)/2;

this.graphics.clear();
this.graphics.lineStyle(4,com.bit101.components.Style.BACKGROUND,.5);
for(var i=0;i<this._numChoices;i++)
{
var angle=start+arc*i;
var sin=Math.sin(angle);
var cos=Math.cos(angle);

this.graphics.moveTo(this._knob.x,this._knob.y);
this.graphics.lineTo(this._knob.x+cos*(radius+2),this._knob.y+sin*(radius+2));

var lab=new com.bit101.components.Label(this._labels,cos*(radius+10),sin*(radius+10));



lab.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onLabelClick"));
if(this._labelMode==com.bit101.components.RotarySelector.ALPHABETIC)
{
lab.text=String.fromCharCode(65+i);
}
else if(this._labelMode==com.bit101.components.RotarySelector.NUMERIC)
{
lab.text=(i+1).toString();
}
else if(this._labelMode==com.bit101.components.RotarySelector.ROMAN)
{
var chars=["I","II","III","IV","V","VI","VII","VIII","IX","X"];
lab.text=chars[i];
}
if(i!=this._choice)
{
lab.alpha=0.5;
}
}

angle=start+arc*this._choice;
this.graphics.lineStyle(4,com.bit101.components.Style.LABEL_TEXT);
this.graphics.moveTo(this._knob.x,this._knob.y);
this.graphics.lineTo(this._knob.x+Math.cos(angle)*(radius+2),this._knob.y+Math.sin(angle)*(radius+2));


this._label.text=this._labelText;
this._label.draw();
this._label.x=this._width/2-this._label.width/2;
this._label.y=this._height+2;
},











"protected function onClick",function(event)
{








},

"protected function onLabelClick",function(event)
{
var lab=event.target;
this.choice=this._labels.getChildIndex(lab);
},











"public function set numChoices",function(value)
{
this._numChoices=Math.min(value,10);
this.draw();
},
"public function get numChoices",function()
{
return this._numChoices;
},




"public function set choice",function(value)
{
this._choice=Math.max(0,Math.min(this._numChoices-1,value));
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get choice",function()
{
return this._choice;
},




"public function set labelMode",function(value)
{
this._labelMode=value;
this.draw();
},
"public function get labelMode",function()
{
return this._labelMode;
},
];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","com.bit101.components.Label","flash.events.MouseEvent","com.bit101.components.Style","Math","String"]
);