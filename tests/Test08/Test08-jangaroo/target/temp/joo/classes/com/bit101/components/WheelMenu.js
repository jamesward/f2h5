joo.classLoader.prepare(
































"package com.bit101.components",







"public class WheelMenu extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init';return[function(){joo.classLoader.init(com.bit101.components.ArcButton,Math,Array,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_borderColor:0xcccccc},
"protected var",{_buttons: undefined},
"protected var",{_color:0xffffff},
"protected var",{_highlightColor:0xeeeeee},
"protected var",{_iconRadius: undefined},
"protected var",{_innerRadius: undefined},
"protected var",{_items: undefined},
"protected var",{_numButtons: undefined},
"protected var",{_outerRadius: undefined},
"protected var",{_selectedIndex:-1},
"protected var",{_startingAngle:-90},










"public function WheelMenu",function(parent,numButtons,outerRadius,iconRadius,innerRadius,defaultHandler)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){outerRadius=80;}iconRadius=60;}innerRadius=10;}defaultHandler=null;}
this._numButtons=numButtons;
this._outerRadius=outerRadius;
this._iconRadius=iconRadius;
this._innerRadius=innerRadius;
this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$$bound(this,"onAddedToStage"));
this[$super](parent);

if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.SELECT,defaultHandler);
}
},








"override protected function init",function()
{
this[$init]();
this._items=new Array();
this.makeButtons();


},




"protected function makeButtons",function()
{
this._buttons=new Array();
for(var i=0;i<this._numButtons;i++)
{
var btn=new com.bit101.components.ArcButton(Math.PI*2/this._numButtons,this._outerRadius,this._iconRadius,this._innerRadius);
btn.id=i;
btn.rotation=this._startingAngle+360/this._numButtons*i;
btn.addEventListener(flash.events.Event.SELECT,$$bound(this,"onSelect"));
this.addChild(btn);
this._buttons.push(btn);
}
},








"public function hide",function()
{

if(this.stage!=null)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"));
}
},







"public function setItem",function(index,iconOrLabel,data)
{if(arguments.length<3){data=null;}
this._buttons[index].setIcon(iconOrLabel);
this._items[index]=data;
},




"public function show",function()
{
this.parent.addChild(this);
this.x=Math.round(this.parent.mouseX);
this.y=Math.round(this.parent.mouseY);
this._selectedIndex=-1;

this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"),true);
},








"protected function onAddedToStage",function(event)
{
this.hide();
this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
},




"protected function onRemovedFromStage",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"));
this.removeEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
},




"protected function onSelect",function(event)
{
this._selectedIndex=event.target.id;
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},




"protected function onStageMouseUp",function(event)
{
this.hide();
},








"public function set borderColor",function(value)
{
this._borderColor=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].borderColor=this._borderColor;
}
},
"public function get borderColor",function()
{
return this._borderColor;
},




"public function set color",function(value)
{
this._color=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].color=this._color;
}
},
"public function get color",function()
{
return this._color;
},




"public function set highlightColor",function(value)
{
this._highlightColor=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].highlightColor=this._highlightColor;
}
},
"public function get highlightColor",function()
{
return this._highlightColor;
},




"public function get selectedIndex",function()
{
return this._selectedIndex;
},




"public function get selectedItem",function()
{
return this._items[this._selectedIndex];
},



];},[],["com.bit101.components.Component","flash.events.Event","Array","com.bit101.components.ArcButton","Math","flash.events.MouseEvent"]
);