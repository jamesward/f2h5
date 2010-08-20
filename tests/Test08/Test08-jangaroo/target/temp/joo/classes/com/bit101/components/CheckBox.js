joo.classLoader.prepare(



























"package com.bit101.components",





"public class CheckBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_button: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_selected:false},










"public function CheckBox",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.buttonMode=true;
this.useHandCursor=true;
this.mouseChildren=false;
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();
this._back.filters=[this.getShadow(2,true)];
this.addChild(this._back);

this._button=new flash.display.Sprite();
this._button.filters=[this.getShadow(1)];
this._button.visible=false;
this.addChild(this._button);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();

this.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"));
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,10,10);
this._back.graphics.endFill();

this._button.graphics.clear();
this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._button.graphics.drawRect(2,2,6,6);

this._label.text=this._labelText;
this._label.draw();
this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._width=this._label.width+12;
this._height=10;
},












"protected function onClick",function(event)
{
this._selected=!this._selected;
this._button.visible=this._selected;
},











"public function set label",function(str)
{
this._labelText=str;
this.invalidate();
},
"public function get label",function()
{
return this._labelText;
},




"public function set selected",function(s)
{
this._selected=s;
this._button.visible=this._selected;
},
"public function get selected",function()
{
return this._selected;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this.mouseChildren=false;
},

];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);