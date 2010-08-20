joo.classLoader.prepare(



























"package com.bit101.components",












"public class ScrollSlider extends com.bit101.components.Slider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$drawHandle=$$l+'drawHandle',$positionHandle=$$l+'positionHandle',$onBackClick=$$l+'onBackClick',$onDrag=$$l+'onDrag',$onSlide=$$l+'onSlide';return[function(){joo.classLoader.init(flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_thumbPercent:1.0},
"protected var",{_pageSize:1},









"public function ScrollSlider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](orientation,parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
this.setSliderParams(1,1,0);
this.backClick=true;
},




"override protected function drawHandle",function()
{
var size;
this._handle.graphics.clear();
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
size=Math.round(this._width*this._thumbPercent);
size=Math.max(this._height,size);
this._handle.graphics.beginFill(0,0);
this._handle.graphics.drawRect(0,0,size,this._height);
this._handle.graphics.endFill();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._handle.graphics.drawRect(1,1,size-2,this._height-2);
}
else
{
size=Math.round(this._height*this._thumbPercent);
size=Math.max(this._width,size);
this._handle.graphics.beginFill(0,0);
this._handle.graphics.drawRect(0,0,this._width-2,size);
this._handle.graphics.endFill();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._handle.graphics.drawRect(1,1,this._width-2,size-2);
}
this._handle.graphics.endFill();
this.positionHandle();
},





"protected override function positionHandle",function()
{
var range;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
range=this.width-this._handle.width;
this._handle.x=(this._value-this._min)/(this._max-this._min)*range;
}
else
{
range=this.height-this._handle.height;
this._handle.y=(this._value-this._min)/(this._max-this._min)*range;
}
},










"public function setThumbPercent",function(value)
{
this._thumbPercent=Math.min(value,1.0);
this.invalidate();
},













"protected override function onBackClick",function(event)
{
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
if(0<this._handle.x)
{
if(this._max>this._min)
{
this._value-=this._pageSize;
}
else
{
this._value+=this._pageSize;
}
this.correctValue();
}
else
{
if(this._max>this._min)
{
this._value+=this._pageSize;
}
else
{
this._value-=this._pageSize;
}
this.correctValue();
}
this.positionHandle();
}
else
{
if(0<this._handle.y)
{
if(this._max>this._min)
{
this._value-=this._pageSize;
}
else
{
this._value+=this._pageSize;
}
this.correctValue();
}
else
{
if(this._max>this._min)
{
this._value+=this._pageSize;
}
else
{
this._value-=this._pageSize;
}
this.correctValue();
}
this.positionHandle();
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));

},





"protected override function onDrag",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,this._width-this._handle.width,0));
}
else
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._height-this._handle.height));
}
},





"protected override function onSlide",function(event)
{
var oldValue=this._value;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
if(this._width==this._handle.width)
{
this._value=this._min;
}
else
{
this._value=this._handle.x/(this._width-this._handle.width)*(this._max-this._min)+this._min;
}
}
else
{
if(this._height==this._handle.height)
{
this._value=this._min;
}
else
{
this._value=this._handle.y/(this._height-this._handle.height)*(this._max-this._min)+this._min;
}
}
if(this._value!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},












"public function set pageSize",function(value)
{
this._pageSize=value;
this.invalidate();
},
"public function get pageSize",function()
{
return this._pageSize;
},
];},[],["com.bit101.components.Slider","flash.events.Event","Math","com.bit101.components.Style","flash.events.MouseEvent","flash.geom.Rectangle"]
);