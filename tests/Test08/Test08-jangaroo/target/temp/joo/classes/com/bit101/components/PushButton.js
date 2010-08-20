joo.classLoader.prepare(



























"package com.bit101.components",





"public class PushButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_face: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_over:false},
"protected var",{_down:false},
"protected var",{_selected:false},
"protected var",{_toggle:false},









"public function PushButton",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
this.label=label;
},




"override protected function init",function()
{
this[$init]();


this.setSize(100,20);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();


this.addChild(this._back);

this._face=new flash.display.Sprite();


this._face.x=1;
this._face.y=1;
this.addChild(this._face);

this._label=new com.bit101.components.Label();
this.addChild(this._label);

this.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this.addEventListener(flash.events.MouseEvent.ROLL_OVER,$$bound(this,"onMouseOver"));
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._face.graphics.clear();
this._face.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._face.graphics.drawRect(0,0,this._width-2,this._height-2);
this._face.graphics.endFill();

this._label.autoSize=true;
this._label.text=this._labelText;
if(this._label.width>this._width-4)
{
this._label.autoSize=false;
this._label.width=this._width-4;
}
else
{
this._label.autoSize=true;
}
this._label.draw();
this._label.move(this._width/2-this._label.width/2,this._height/2-this._label.height/2);

},












"protected function onMouseOver",function(event)
{
this._over=true;
this.addEventListener(flash.events.MouseEvent.ROLL_OUT,$$bound(this,"onMouseOut"));
},





"protected function onMouseOut",function(event)
{
this._over=false;
if(!this._down)
{

}
this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,$$bound(this,"onMouseOut"));
},





"protected function onMouseDown",function(event)
{
this._down=true;

this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},





"protected function onMouseUp",function(event)
{
if(this._toggle&&this._over)
{
this._selected=!this._selected;
}
this._down=this._selected;

this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},











"public function set label",function(str)
{
this._labelText=str;
this.draw();
},
"public function get label",function()
{
return this._labelText;
},

"public function set selected",function(value)
{
if(!this._toggle)
{
value=false;
}

this._selected=value;
this._down=this._selected;

},
"public function get selected",function()
{
return this._selected;
},

"public function set toggle",function(value)
{
this._toggle=value;
},
"public function get toggle",function()
{
return this._toggle;
},


];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);