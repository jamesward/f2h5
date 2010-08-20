joo.classLoader.prepare(




























"package com.bit101.components",





"public class RadioButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Array,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_button: undefined},
"protected var",{_selected:false},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_groupName:"defaultRadioGroup"},

"protected static var",{buttons: undefined},










"public function RadioButton",function(parent,xpos,ypos,label,checked,defaultHandler)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}checked=false;}defaultHandler=null;}
com.bit101.components.RadioButton.addButton(this);
this._selected=checked;
this._labelText=label;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
},





"protected static function addButton",function(rb)
{
if(com.bit101.components.RadioButton.buttons==null)
{
com.bit101.components.RadioButton.buttons=new Array();
}
com.bit101.components.RadioButton.buttons.push(rb);
},






"protected static function clear",function(rb)
{
for(var i=0;i<com.bit101.components.RadioButton.buttons.length;i++)
{
if(com.bit101.components.RadioButton.buttons[i]!=rb&&com.bit101.components.RadioButton.buttons[i].groupName==rb.groupName)
{
com.bit101.components.RadioButton.buttons[i].selected=false;
}
}
},




"override protected function init",function()
{
this[$init]();




this.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"),false,1);
this.selected=this._selected;
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._button=new flash.display.Sprite();


this.addChild(this._button);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();


},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawCircle(5,5,5);
this._back.graphics.endFill();

this._button.graphics.clear();
this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._button.graphics.drawCircle(5,5,3);

this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._label.text=this._labelText;
this._label.draw();
this._width=this._label.width+12;
this._height=10;
},












"protected function onClick",function(event)
{
this.selected=true;
},











"public function set selected",function(s)
{
this._selected=s;
this._button.visible=this._selected;
if(this._selected)
{
com.bit101.components.RadioButton.clear(this);
}
},
"public function get selected",function()
{
return this._selected;
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




"public function get groupName",function()
{
return this._groupName;
},

"public function set groupName",function(value)
{
this._groupName=value;
},


];},[],["com.bit101.components.Component","flash.events.MouseEvent","Array","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);