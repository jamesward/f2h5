joo.classLoader.prepare(



























"package com.bit101.components",








"public class ScrollPane extends com.bit101.components.Panel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.geom.Rectangle,com.bit101.components.VScrollBar,flash.display.Shape,com.bit101.components.HScrollBar,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_vScrollbar: undefined},
"protected var",{_hScrollbar: undefined},
"protected var",{_corner: undefined},
"protected var",{_dragContent:true},







"public function ScrollPane",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this.addEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=true;
this._background.buttonMode=true;
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this[$addChildren]();
this._vScrollbar=new com.bit101.components.VScrollBar(this,this.width-10,0,$$bound(this,"onScroll"));
this._hScrollbar=new com.bit101.components.HScrollBar(this,0,this.height-10,$$bound(this,"onScroll"));
this._corner=new flash.display.Shape();
this._corner.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._corner.graphics.drawRect(0,0,10,10);
this._corner.graphics.endFill();
this.addChild(this._corner);
},












"override public function draw",function()
{
this[$draw]();
this._vScrollbar.x=this.width-10;
this._vScrollbar.height=this.height-10;
this._hScrollbar.y=this.height-10;
this._hScrollbar.width=this.width-10;

this._vScrollbar.setThumbPercent((this._height-10)/this.content.height);
this._vScrollbar.maximum=Math.max(0,this.content.height-this._height+10);
this._vScrollbar.pageSize=this._height-10;

this._hScrollbar.setThumbPercent((this._width-10)/this.content.width);
this._hScrollbar.maximum=Math.max(0,this.content.width-this._width+10);
this._hScrollbar.pageSize=this._width-10;

this._corner.x=this.width-10;
this._corner.y=this.height-10;
this.content.x=-this._hScrollbar.value;
this.content.y=-this._vScrollbar.value;
},




"public function update",function()
{
this.invalidate();
},









"protected function onScroll",function(event)
{
this.content.x=-this._hScrollbar.value;
this.content.y=-this._vScrollbar.value;
},

"protected function onResize",function(event)
{
this.invalidate();
},

"protected function onMouseDown",function(event)
{
this.content.startDrag(false,new flash.geom.Rectangle(0,0,Math.min(0,this._width-this.content.width-10),Math.min(0,this._height-this.content.height-10)));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMouseMove",function(event)
{
this._hScrollbar.value=-this.content.x;
this._vScrollbar.value=-this.content.y;
},

"protected function onMouseUp",function(event)
{
this.content.stopDrag();
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"public function set dragContent",function(value)
{
this._dragContent=value;
if(this._dragContent)
{
this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=true;
this._background.buttonMode=true;
}
else
{
this._background.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=false;
this._background.buttonMode=false;
}
},
"public function get dragContent",function()
{
return this._dragContent;
},


];},[],["com.bit101.components.Panel","flash.events.Event","flash.events.MouseEvent","com.bit101.components.VScrollBar","com.bit101.components.HScrollBar","flash.display.Shape","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);