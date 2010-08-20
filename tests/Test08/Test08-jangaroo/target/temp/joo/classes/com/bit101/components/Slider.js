joo.classLoader.prepare(



























"package com.bit101.components",







"public class Slider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_handle: undefined},
"protected var",{_back: undefined},
"protected var",{_backClick:true},
"protected var",{_value:0},
"protected var",{_max:100},
"protected var",{_min:0},
"protected var",{_orientation: undefined},
"protected var",{_tick:1},

"public static const",{HORIZONTAL:"horizontal"},
"public static const",{VERTICAL:"vertical"},









"public function Slider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){orientation=com.bit101.components.Slider.HORIZONTAL;}parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();

if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this.setSize(100,10);
}
else
{
this.setSize(10,100);
}
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._handle=new flash.display.Sprite();

this._handle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDrag"));


this.addChild(this._handle);
},




"protected function drawBack",function()
{
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

if(this._backClick)
{
this._back.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onBackClick"));
}
else
{
this._back.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onBackClick"));
}
},




"protected function drawHandle",function()
{
this._handle.graphics.clear();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.graphics.drawRect(1,1,this._height-2,this._height-2);
}
else
{
this._handle.graphics.drawRect(1,1,this._width-2,this._width-2);
}
this._handle.graphics.endFill();
this.positionHandle();
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





"protected function positionHandle",function()
{
var range;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
range=this._width-this._height;
this._handle.x=(this._value-this._min)/(this._max-this._min)*range;
}
else
{
range=this._height-this._width;
this._handle.y=this._height-this._width-(this._value-this._min)/(this._max-this._min)*range;
}
},











"override public function draw",function()
{
this[$draw]();
this.drawBack();
this.drawHandle();
},







"public function setSliderParams",function(min,max,value)
{
this.minimum=min;
this.maximum=max;
this.value=value;
},












"protected function onBackClick",function(event)
{
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{


this._handle.x=Math.max(this._handle.x,0);
this._handle.x=Math.min(this._handle.x,this._width-this._height);
this._value=this._handle.x/(this.width-this._height)*(this._max-this._min)+this._min;
}
else
{


this._handle.y=Math.max(this._handle.y,0);
this._handle.y=Math.min(this._handle.y,this._height-this._width);
this._value=(this._height-this._width-this._handle.y)/(this.height-this._width)*(this._max-this._min)+this._min;
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));

},





"protected function onDrag",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,this._width-this._height,0));
}
else
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._height-this._width));
}
},





"protected function onDrop",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));

},





"protected function onSlide",function(event)
{
var oldValue=this._value;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._value=this._handle.x/(this.width-this._height)*(this._max-this._min)+this._min;
}
else
{
this._value=(this._height-this._width-this._handle.y)/(this.height-this._width)*(this._max-this._min)+this._min;
}
if(this._value!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},











"public function set backClick",function(b)
{
this._backClick=b;
this.invalidate();
},
"public function get backClick",function()
{
return this._backClick;
},




"public function set value",function(v)
{
this._value=v;
this.correctValue();
this.positionHandle();

},
"public function get value",function()
{
return Math.round(this._value/this._tick)*this._tick;
},




"public function set maximum",function(m)
{
this._max=m;
this.correctValue();
this.positionHandle();
},
"public function get maximum",function()
{
return this._max;
},




"public function set minimum",function(m)
{
this._min=m;
this.correctValue();
this.positionHandle();
},
"public function get minimum",function()
{
return this._min;
},




"public function set tick",function(t)
{
this._tick=t;
},
"public function get tick",function()
{
return this._tick;
},

];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);