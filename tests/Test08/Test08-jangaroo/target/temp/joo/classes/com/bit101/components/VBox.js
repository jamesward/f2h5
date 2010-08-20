joo.classLoader.prepare(




























"package com.bit101.components",






"public class VBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildAt=$$l+'addChildAt',$removeChild=$$l+'removeChild',$removeChildAt=$$l+'removeChildAt',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.events.Event);},

"protected var",{_spacing:5},








"public function VBox",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"override public function addChildAt",function(child,index)
{
this[$addChildAt](child,index);
child.addEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChild",function(child)
{
this.removeChild(child);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChildAt",function(index)
{
var child=this.removeChildAt(index);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"protected function onResize",function(event)
{
this.invalidate();
},




"override public function draw",function()
{
this._width=0;
this._height=0;
var ypos=0;
for(var i=0;i<this.numChildren;i++)
{
var child=this.getChildAt(i);
child.y=ypos;
ypos+=child.height;
ypos+=this._spacing;
this._height+=child.height;
this._width=Math.max(this._width,child.width);
}
this._height+=this._spacing*(this.numChildren-1);
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},




"public function set spacing",function(s)
{
this._spacing=s;
this.invalidate();
},
"public function get spacing",function()
{
return this._spacing;
},
];},[],["com.bit101.components.Component","flash.events.Event","Math"]
);