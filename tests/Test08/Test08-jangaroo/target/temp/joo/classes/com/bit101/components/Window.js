joo.classLoader.prepare(



























"package com.bit101.components",







"public class Window extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$height=$$l+'height';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,com.bit101.components.PushButton,com.bit101.components.Panel,flash.display.Shape,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_title: undefined},
"protected var",{_titleBar: undefined},
"protected var",{_titleLabel: undefined},
"protected var",{_panel: undefined},
"protected var",{_color:-1},
"protected var",{_shadow:true},
"protected var",{_draggable:true},
"protected var",{_minimizeButton: undefined},
"protected var",{_hasMinimizeButton:false},
"protected var",{_minimized:false},
"protected var",{_hasCloseButton: undefined},
"protected var",{_closeButton: undefined},
"protected var",{_grips: undefined},









"public function Window",function(parent,xpos,ypos,title)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}title="Window";}
this._title=title;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this._titleBar=new com.bit101.components.Panel(this);

this._titleBar.buttonMode=true;
this._titleBar.useHandCursor=true;
this._titleBar.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._titleBar.height=20;
this._titleLabel=new com.bit101.components.Label(this._titleBar.content,5,1,this._title);

this._grips=new flash.display.Shape();
for(var i=0;i<4;i++)
{
this._grips.graphics.lineStyle(1,0xffffff,.55);
this._grips.graphics.moveTo(0,3+i*4);
this._grips.graphics.lineTo(100,3+i*4);
this._grips.graphics.lineStyle(1,0,.125);
this._grips.graphics.moveTo(0,4+i*4);
this._grips.graphics.lineTo(100,4+i*4);
}
this._titleBar.content.addChild(this._grips);
this._grips.visible=false;

this._panel=new com.bit101.components.Panel(this,0,20);
this._panel.visible=!this._minimized;

this._minimizeButton=new flash.display.Sprite();
this._minimizeButton.graphics.beginFill(0,0);
this._minimizeButton.graphics.drawRect(-10,-10,20,20);
this._minimizeButton.graphics.endFill();
this._minimizeButton.graphics.beginFill(0,.35);
this._minimizeButton.graphics.moveTo(-5,-3);
this._minimizeButton.graphics.lineTo(5,-3);
this._minimizeButton.graphics.lineTo(0,4);
this._minimizeButton.graphics.lineTo(-5,-3);
this._minimizeButton.graphics.endFill();
this._minimizeButton.x=10;
this._minimizeButton.y=10;
this._minimizeButton.useHandCursor=true;
this._minimizeButton.buttonMode=true;
this._minimizeButton.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onMinimize"));

this._closeButton=new com.bit101.components.PushButton(null,86,6,"",$$bound(this,"onClose"));
this._closeButton.setSize(8,8);


},











"override public function draw",function()
{
this[$draw]();
this._titleBar.color=this._color;
this._panel.color=this._color;
this._titleBar.width=this.width;
this._titleBar.draw();
this._titleLabel.x=this._hasMinimizeButton?20:5;
this._closeButton.x=this._width-14;
this._grips.x=this._titleLabel.x+this._titleLabel.width;
if(this._hasCloseButton)
{
this._grips.width=this._closeButton.x-this._grips.x-2;
}
else
{
this._grips.width=this._width-this._grips.x-2;
}
this._panel.setSize(this._width,this._height-20);
this._panel.draw();
},










"protected function onMouseDown",function(event)
{
if(this._draggable)
{
this.startDrag();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
this.parent.addChild(this);
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},





"protected function onMouseUp",function(event)
{
this.stopDrag();
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMinimize",function(event)
{
this.minimized=!this.minimized;
},

"protected function onClose",function(event)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CLOSE));
},








"public function set shadow",function(b)
{
this._shadow=b;
if(this._shadow)
{

}
else
{

}
},
"public function get shadow",function()
{
return this._shadow;
},




"public function set color",function(c)
{
this._color=c;
this.invalidate();
},
"public function get color",function()
{
return this._color;
},




"public function set title",function(t)
{
this._title=t;
this._titleLabel.text=this._title;
},
"public function get title",function()
{
return this._title;
},




"public function get content",function()
{
return this._panel.content;
},




"public function set draggable",function(b)
{
this._draggable=b;
this._titleBar.buttonMode=this._draggable;
this._titleBar.useHandCursor=this._draggable;
},
"public function get draggable",function()
{
return this._draggable;
},




"public function set hasMinimizeButton",function(b)
{
this._hasMinimizeButton=b;
if(this._hasMinimizeButton)
{
this.addChild(this._minimizeButton);
}




this.invalidate();
},
"public function get hasMinimizeButton",function()
{
return this._hasMinimizeButton;
},




"public function set minimized",function(value)
{
this._minimized=value;

if(this._minimized)
{

this._minimizeButton.rotation=-90;
}
else
{

this._minimizeButton.rotation=0;
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"public function get minimized",function()
{
return this._minimized;
},




"override public function get height",function()
{






return 20;

},





"public function set hasCloseButton",function(value)
{
this._hasCloseButton=value;
if(this._hasCloseButton)
{
this._titleBar.content.addChild(this._closeButton);
}




this.invalidate();
},
"public function get hasCloseButton",function()
{
return this._hasCloseButton;
},




"public function get titleBar",function()
{
return this._titleBar;
},
"public function set titleBar",function(value)
{
this._titleBar=value;
},




"public function get grips",function()
{
return this._grips;
},


];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.events.MouseEvent","com.bit101.components.Label","flash.display.Shape","flash.display.Sprite","com.bit101.components.PushButton","flash.events.Event"]
);