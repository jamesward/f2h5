joo.classLoader.prepare(



























"package com.bit101.components",





"public class Panel extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},

"protected var",{_mask: undefined},
"protected var",{_background: undefined},
"protected var",{_color:-1},
"protected var",{_shadow:true},
"protected var",{_gridSize:10},
"protected var",{_showGrid:false},
"protected var",{_gridColor:0xd0d0d0},





"public var",{content: undefined},








"public function Panel",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},





"override protected function init",function()
{
this[$init]();
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this._background=new flash.display.Sprite();
this.addChild(this._background);

this._mask=new flash.display.Sprite();
this._mask.mouseEnabled=false;
this.addChild(this._mask);

this.content=new flash.display.Sprite();
this.addChild(this.content);
this.content.mask=this._mask;


},











"override public function draw",function()
{
this[$draw]();
this._background.graphics.clear();
this._background.graphics.lineStyle(1,0,0.1);
if(this._color==-1)
{
this._background.graphics.beginFill(com.bit101.components.Style.PANEL);
}
else
{
this._background.graphics.beginFill(this._color);
}
this._background.graphics.drawRect(0,0,this._width,this._height);
this._background.graphics.endFill();

this.drawGrid();

this._mask.graphics.clear();
this._mask.graphics.beginFill(0xff0000);
this._mask.graphics.drawRect(0,0,this._width,this._height);
this._mask.graphics.endFill();
},

"protected function drawGrid",function()
{
if(!this._showGrid)return;

this._background.graphics.lineStyle(0,this._gridColor);
for(var i=0;i<this._width;i+=this._gridSize)
{
this._background.graphics.moveTo(i,0);
this._background.graphics.lineTo(i,this._height);
}
for(i=0;i<this._height;i+=this._gridSize)
{
this._background.graphics.moveTo(0,i);
this._background.graphics.lineTo(this._width,i);
}
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




"public function set gridSize",function(value)
{
this._gridSize=value;
this.invalidate();
},
"public function get gridSize",function()
{
return this._gridSize;
},




"public function set showGrid",function(value)
{
this._showGrid=value;
this.invalidate();
},
"public function get showGrid",function()
{
return this._showGrid;
},




"public function set gridColor",function(value)
{
this._gridColor=value;
this.invalidate();
},
"public function get gridColor",function()
{
return this._gridColor;
},
];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style"]
);