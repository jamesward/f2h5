joo.classLoader.prepare(
































"package com.bit101.components",













"class ArcButton extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$rotation=$$l+'rotation';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.display.DisplayObject,String,Class,Math,flash.events.MouseEvent,flash.display.Shape,flash.events.Event);},

"public var",{id: undefined},

"protected var",{_arc: undefined},
"protected var",{_bg: undefined},
"protected var",{_borderColor:0xcccccc},
"protected var",{_color:0xffffff},
"protected var",{_highlightColor:0xeeeeee},
"protected var",{_icon: undefined},
"protected var",{_iconHolder: undefined},
"protected var",{_iconRadius: undefined},
"protected var",{_innerRadius: undefined},
"protected var",{_outerRadius: undefined},







"public function ArcButton",function(arc,outerRadius,iconRadius,innerRadius)
{this[$super]();
this._arc=arc;
this._outerRadius=outerRadius;
this._iconRadius=iconRadius;
this._innerRadius=innerRadius;

this._bg=new flash.display.Shape();
this.addChild(this._bg);

this._iconHolder=new flash.display.Sprite();
this.addChild(this._iconHolder);

this.drawArc(0xffffff);
this.addEventListener(flash.events.MouseEvent.MOUSE_OVER,$$bound(this,"onMouseOver"));
this.addEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"onMouseOut"));
this.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},









"protected function drawArc",function(color)
{
this._bg.graphics.clear();
this._bg.graphics.lineStyle(2,this._borderColor);
this._bg.graphics.beginFill(color);
this._bg.graphics.moveTo(this._innerRadius,0);
this._bg.graphics.lineTo(this._outerRadius,0);
for(var i=0;i<this._arc;i+=.05)
{
this._bg.graphics.lineTo(Math.cos(i)*this._outerRadius,Math.sin(i)*this._outerRadius);
}
this._bg.graphics.lineTo(Math.cos(this._arc)*this._outerRadius,Math.sin(this._arc)*this._outerRadius);
this._bg.graphics.lineTo(Math.cos(this._arc)*this._innerRadius,Math.sin(this._arc)*this._innerRadius);
for(i=this._arc;i>0;i-=.05)
{
this._bg.graphics.lineTo(Math.cos(i)*this._innerRadius,Math.sin(i)*this._innerRadius);
}
this._bg.graphics.lineTo(this._innerRadius,0);

this.graphics.endFill();
},









"public function setIcon",function(iconOrLabel)
{
if(iconOrLabel==null)return;
while(this._iconHolder.numChildren>0)this._iconHolder.removeChildAt(0);
if(is(iconOrLabel,Class))
{
this._icon=new iconOrLabel();
}
else if(is(iconOrLabel,flash.display.DisplayObject))
{
this._icon=iconOrLabel;
}
else if(is(iconOrLabel,String))
{
this._icon=new com.bit101.components.Label(null,0,0,iconOrLabel);
(this._icon).draw();
}
if(this._icon!=null)
{
var angle=this._bg.rotation*Math.PI/180;
this._icon.x=Math.round(-this._icon.width/2);
this._icon.y=Math.round(-this._icon.height/2);
this._iconHolder.addChild(this._icon);
this._iconHolder.x=Math.round(Math.cos(angle+this._arc/2)*this._iconRadius);
this._iconHolder.y=Math.round(Math.sin(angle+this._arc/2)*this._iconRadius);
}
},









"protected function onMouseOver",function(event)
{
this.drawArc(this._highlightColor);
},




"protected function onMouseOut",function(event)
{
this.drawArc(this._color);
},




"protected function onMouseUp",function(event)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},









"public function set borderColor",function(value)
{
this._borderColor=value;
this.drawArc(this._color);
},
"public function get borderColor",function()
{
return this._borderColor;
},




"public function set color",function(value)
{
this._color=value;
this.drawArc(this._color);
},
"public function get color",function()
{
return this._color;
},




"public function set highlightColor",function(value)
{
this._highlightColor=value;
},
"public function get highlightColor",function()
{
return this._highlightColor;
},




"override public function set rotation",function(value)
{
this._bg.rotation=value;
},
"override public function get rotation",function()
{
return this._bg.rotation;
},

];},[],["flash.display.Sprite","flash.display.Shape","flash.events.MouseEvent","Math","Class","flash.display.DisplayObject","String","com.bit101.components.Label","flash.events.Event"]
);