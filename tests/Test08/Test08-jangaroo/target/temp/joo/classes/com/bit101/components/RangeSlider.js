joo.classLoader.prepare(



























"package com.bit101.components",







"public class RangeSlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_highLabel: undefined},
"protected var",{_highValue:100},
"protected var",{_labelMode:function(){return(com.bit101.components.RangeSlider.ALWAYS);}},
"protected var",{_labelPosition: undefined},
"protected var",{_labelPrecision:0},
"protected var",{_lowLabel: undefined},
"protected var",{_lowValue:0},
"protected var",{_maximum:100},
"protected var",{_maxHandle: undefined},
"protected var",{_minimum:0},
"protected var",{_minHandle: undefined},
"protected var",{_orientation:function(){return(com.bit101.components.RangeSlider.VERTICAL);}},
"protected var",{_tick:1},

"public static const",{ALWAYS:"always"},
"public static const",{BOTTOM:"bottom"},
"public static const",{HORIZONTAL:"horizontal"},
"public static const",{LEFT:"left"},
"public static const",{MOVE:"move"},
"public static const",{NEVER:"never"},
"public static const",{RIGHT:"right"},
"public static const",{TOP:"top"},
"public static const",{VERTICAL:"vertical"},











"public function RangeSlider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);this._labelMode=this._labelMode();this._orientation=this._orientation();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this.setSize(110,10);
this._labelPosition=com.bit101.components.RangeSlider.TOP;
}
else
{
this.setSize(10,110);
this._labelPosition=com.bit101.components.RangeSlider.RIGHT;
}
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._minHandle=new flash.display.Sprite();

this._minHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDragMin"));


this.addChild(this._minHandle);

this._maxHandle=new flash.display.Sprite();

this._maxHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDragMax"));


this.addChild(this._maxHandle);

this._lowLabel=new com.bit101.components.Label(this);
this._highLabel=new com.bit101.components.Label(this);
this._lowLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
},




"protected function drawBack",function()
{
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();
},




"protected function drawHandles",function()
{
this._minHandle.graphics.clear();
this._minHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._maxHandle.graphics.clear();
this._maxHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._minHandle.graphics.drawRect(1,1,this._height-2,this._height-2);
this._maxHandle.graphics.drawRect(1,1,this._height-2,this._height-2);
}
else
{
this._minHandle.graphics.drawRect(1,1,this._width-2,this._width-2);
this._maxHandle.graphics.drawRect(1,1,this._width-2,this._width-2);
}
this._minHandle.graphics.endFill();
this.positionHandles();
},





"protected function positionHandles",function()
{
var range;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
range=this._width-this._height*2;
this._minHandle.x=(this._lowValue-this._minimum)/(this._maximum-this._minimum)*range;
this._maxHandle.x=this._height+(this._highValue-this._minimum)/(this._maximum-this._minimum)*range;
}
else
{
range=this._height-this._width*2;
this._minHandle.y=this._height-this._width-(this._lowValue-this._minimum)/(this._maximum-this._minimum)*range;
this._maxHandle.y=this._height-this._width*2-(this._highValue-this._minimum)/(this._maximum-this._minimum)*range;
}
this.updateLabels();
},




"protected function updateLabels",function()
{
this._lowLabel.text=this.getLabelForValue(this.lowValue);
this._highLabel.text=this.getLabelForValue(this.highValue);
this._lowLabel.draw();
this._highLabel.draw();

if(this._orientation==com.bit101.components.RangeSlider.VERTICAL)
{
this._lowLabel.y=this._minHandle.y+(this._width-this._lowLabel.height)*0.5;
this._highLabel.y=this._maxHandle.y+(this._width-this._highLabel.height)*0.5;
if(this._labelPosition==com.bit101.components.RangeSlider.LEFT)
{
this._lowLabel.x=-this._lowLabel.width-5;
this._highLabel.x=-this._highLabel.width-5;
}
else
{
this._lowLabel.x=this._width+5;
this._highLabel.x=this._width+5;
}
}
else
{
this._lowLabel.x=this._minHandle.x-this._lowLabel.width+this._height;
this._highLabel.x=this._maxHandle.x;
if(this._labelPosition==com.bit101.components.RangeSlider.BOTTOM)
{
this._lowLabel.y=this._height+2;
this._highLabel.y=this._height+2;
}
else
{
this._lowLabel.y=-this._lowLabel.height;
this._highLabel.y=-this._highLabel.height;
}

}
},





"protected function getLabelForValue",function(value)
{
var str=(Math.round(value*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision)).toString();
if(this._labelPrecision>0)
{
var decimal=str.split(".")[1]||"";
if(decimal.length==0)str+=".";
for(var i=decimal.length;i<this._labelPrecision;i++)
{
str+="0";
}
}
return str;
},








"override public function draw",function()
{
this[$draw]();
this.drawBack();
this.drawHandles();
},













"protected function onDragMin",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMinSlide"));
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._minHandle.startDrag(false,new flash.geom.Rectangle(0,0,this._maxHandle.x-this._height,0));
}
else
{
this._minHandle.startDrag(false,new flash.geom.Rectangle(0,this._maxHandle.y+this._width,0,this._height-this._maxHandle.y-this._width*2));
}
if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=true;
this._highLabel.visible=true;
}
},





"protected function onDragMax",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMaxSlide"));
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._maxHandle.startDrag(false,new flash.geom.Rectangle(this._minHandle.x+this._height,0,this._width-this._height-this._minHandle.x-this._height,0));
}
else
{
this._maxHandle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._minHandle.y-this._width));
}
if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=true;
this._highLabel.visible=true;
}
},





"protected function onDrop",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMinSlide"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMaxSlide"));

if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=false;
this._highLabel.visible=false;
}
},





"protected function onMinSlide",function(event)
{
var oldValue=this._lowValue;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._lowValue=this._minHandle.x/(this._width-this._height*2)*(this._maximum-this._minimum)+this._minimum;
}
else
{
this._lowValue=(this._height-this._width-this._minHandle.y)/(this.height-this._width*2)*(this._maximum-this._minimum)+this._minimum;
}
if(this._lowValue!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this.updateLabels();
},





"protected function onMaxSlide",function(event)
{
var oldValue=this._highValue;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._highValue=(this._maxHandle.x-this._height)/(this._width-this._height*2)*(this._maximum-this._minimum)+this._minimum;
}
else
{
this._highValue=(this._height-this._width*2-this._maxHandle.y)/(this._height-this._width*2)*(this._maximum-this._minimum)+this._minimum;
}
if(this._highValue!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this.updateLabels();
},




"public function set minimum",function(value)
{
this._minimum=value;
this._maximum=Math.max(this._maximum,this._minimum);
this._lowValue=Math.max(this._lowValue,this._minimum);
this._highValue=Math.max(this._highValue,this._minimum);
this.positionHandles();
},
"public function get minimum",function()
{
return this._minimum;
},




"public function set maximum",function(value)
{
this._maximum=value;
this._minimum=Math.min(this._minimum,this._maximum);
this._lowValue=Math.min(this._lowValue,this._maximum);
this._highValue=Math.min(this._highValue,this._maximum);
this.positionHandles();
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set lowValue",function(value)
{
this._lowValue=value;
this._lowValue=Math.min(this._lowValue,this._highValue);
this._lowValue=Math.max(this._lowValue,this._minimum);
this.positionHandles();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get lowValue",function()
{
return Math.round(this._lowValue/this._tick)*this._tick;
},




"public function set highValue",function(value)
{
this._highValue=value;
this._highValue=Math.max(this._highValue,this._lowValue);
this._highValue=Math.min(this._highValue,this._maximum);
this.positionHandles();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get highValue",function()
{
return Math.round(this._highValue/this._tick)*this._tick;
},




"public function set labelMode",function(value)
{
this._labelMode=value;
this._highLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
this._lowLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
},
"public function get labelMode",function()
{
return this._labelMode;
},




"public function set labelPosition",function(value)
{
this._labelPosition=value;
this.updateLabels();
},
"public function get labelPosition",function()
{
return this._labelPosition;
},




"public function set labelPrecision",function(value)
{
this._labelPrecision=value;
this.updateLabels();
},
"public function get labelPrecision",function()
{
return this._labelPrecision;
},




"public function set tick",function(value)
{
this._tick=value;
this.updateLabels();
},
"public function get tick",function()
{
return this._tick;
},


];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);