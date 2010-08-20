joo.classLoader.prepare(



























"package com.bit101.components",







"public class Text extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,com.bit101.components.Panel,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_tf: undefined},
"protected var",{_text:""},
"protected var",{_editable:true},
"protected var",{_panel: undefined},
"protected var",{_selectable:true},
"protected var",{_html:false},









"public function Text",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this.text=text;
this[$super](parent,xpos,ypos);
this.setSize(200,100);
},




"override protected function init",function()
{
this[$init]();
},




"override protected function addChildren",function()
{
this._panel=new com.bit101.components.Panel(this);
this._panel.color=0xffffff;

this._tf=new flash.text.TextField();
this._tf.x=2;
this._tf.y=2;
this._tf.height=this._height;
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.multiline=true;
this._tf.wordWrap=true;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.LABEL_TEXT);
this._tf.addEventListener(flash.events.Event.CHANGE,$$bound(this,"onChange"));
this.addChild(this._tf);
},











"override public function draw",function()
{
this[$draw]();

this._panel.setSize(this._width,this._height);
this._panel.draw();

this._tf.width=this._width-4;
this._tf.height=this._height-4;
if(this._html)
{
this._tf.htmlText=this._text;
}
else
{
this._tf.text=this._text;
}
if(this._editable)
{
this._tf.mouseEnabled=true;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
}
else
{
this._tf.mouseEnabled=this._selectable;
this._tf.selectable=this._selectable;
this._tf.type=flash.text.TextFieldType.DYNAMIC;
}
},











"protected function onChange",function(event)
{
this._text=this._tf.text;
this.dispatchEvent(event);
},








"public function set text",function(t)
{
this._text=t;
if(this._text==null)this._text="";
this.invalidate();
},
"public function get text",function()
{
return this._text;
},




"public function get textField",function()
{
return this._tf;
},




"public function set editable",function(b)
{
this._editable=b;
this.invalidate();
},
"public function get editable",function()
{
return this._editable;
},




"public function set selectable",function(b)
{
this._selectable=b;
this.invalidate();
},
"public function get selectable",function()
{
return this._selectable;
},




"public function set html",function(b)
{
this._html=b;
this.invalidate();
},
"public function get html",function()
{
return this._html;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},

];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","flash.events.Event"]
);