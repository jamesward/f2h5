joo.classLoader.prepare(
































"package com.bit101.components",









"public class Component extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$width=$$l+'width',$height=$$l+'height',$x=$$l+'x',$y=$$l+'y';return[function(){joo.classLoader.init(flash.display.StageScaleMode,flash.filters.DropShadowFilter,flash.display.StageAlign,flash.events.Event,com.bit101.components.Style);},









"protected var",{Ronda: undefined},

"protected var",{_width:0},
"protected var",{_height:0},
"protected var",{_tag:-1},
"protected var",{_enabled:true},

"public static const",{DRAW:"draw"},







"public function Component",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}this[$super]();
this.move(xpos,ypos);
if(parent!=null)
{
parent.addChild(this);
}
this.init();
},




"protected function init",function()
{
this.addChildren();
this.invalidate();
},




"protected function addChildren",function()
{

},






"protected function getShadow",function(dist,knockout)
{if(arguments.length<2){knockout=false;}
return new flash.filters.DropShadowFilter(dist,45,com.bit101.components.Style.DROPSHADOW,1,dist,dist,.3,1,knockout);
},




"protected function invalidate",function()
{

this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onInvalidate"));
},











"public static function initStage",function(stage)
{
stage.align=flash.display.StageAlign.TOP_LEFT;
stage.scaleMode=flash.display.StageScaleMode.NO_SCALE;
},






"public function move",function(xpos,ypos)
{
this.x=Math.round(xpos);
this.y=Math.round(ypos);
},






"public function setSize",function(w,h)
{
this._width=w;
this._height=h;
this.invalidate();
},




"public function draw",function()
{
this.dispatchEvent(new flash.events.Event(com.bit101.components.Component.DRAW));
},











"protected function onInvalidate",function(event)
{
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onInvalidate"));
this.draw();
},











"override public function set width",function(w)
{
this._width=w;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"override public function get width",function()
{
return this._width;
},




"override public function set height",function(h)
{
this._height=h;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"override public function get height",function()
{
return this._height;
},




"public function set tag",function(value)
{
this._tag=value;
},
"public function get tag",function()
{
return this._tag;
},




"override public function set x",function(value)
{
this[$x]=Math.round(value);
},




"override public function set y",function(value)
{
this[$y]=Math.round(value);
},




"public function set enabled",function(value)
{
this._enabled=value;
this.mouseEnabled=this.mouseChildren=this._enabled;
this.tabEnabled=value;
this.alpha=this._enabled?1.0:0.5;
},
"public function get enabled",function()
{
return this._enabled;
},

];},["initStage"],["flash.display.Sprite","flash.filters.DropShadowFilter","com.bit101.components.Style","flash.events.Event","flash.display.StageAlign","flash.display.StageScaleMode","Math"]
);