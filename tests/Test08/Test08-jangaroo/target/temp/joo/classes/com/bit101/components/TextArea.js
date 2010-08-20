joo.classLoader.prepare(



























"package com.bit101.components",





"public class TextArea extends com.bit101.components.Text",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$onChange=$$l+'onChange',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.VScrollBar,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_scrollbar: undefined},








"public function TextArea",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this[$super](parent,xpos,ypos,text);
},




"protected override function init",function()
{
this[$init]();
this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL,$$bound(this,"onMouseWheel"));
},



"override protected function addChildren",function()
{
this[$addChildren]();
this._scrollbar=new com.bit101.components.VScrollBar(this,0,0,$$bound(this,"onScrollbarScroll"));
this._tf.addEventListener(flash.events.Event.SCROLL,$$bound(this,"onTextScroll"));
},




"protected function updateScrollbar",function()
{
var visibleLines=this._tf.numLines-this._tf.maxScrollV+1;
var percent=visibleLines/this._tf.numLines;
this._scrollbar.setSliderParams(1,this._tf.maxScrollV,this._tf.scrollV);
this._scrollbar.setThumbPercent(percent);
this._scrollbar.pageSize=visibleLines;
},











"override public function draw",function()
{
this[$draw]();

this._tf.width=this._width-this._scrollbar.width-4;
this._scrollbar.x=this._width-this._scrollbar.width;
this._scrollbar.height=this._height;
this._scrollbar.draw();
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onTextScrollDelay"));
},











"protected function onTextScrollDelay",function(event)
{
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onTextScrollDelay"));
this.updateScrollbar();
},




"protected override function onChange",function(event)
{
this[$onChange](event);
this.updateScrollbar();
},




"protected function onScrollbarScroll",function(event)
{
this._tf.scrollV=Math.round(this._scrollbar.value);
},




"protected function onTextScroll",function(event)
{
this._scrollbar.value=this._tf.scrollV;
this.updateScrollbar();
},




"protected function onMouseWheel",function(event)
{
this._scrollbar.value-=event.delta;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},
];},[],["com.bit101.components.Text","flash.events.MouseEvent","com.bit101.components.VScrollBar","flash.events.Event","Math"]
);