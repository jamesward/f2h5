joo.classLoader.prepare(



























"package com.bit101.components",







"public class Label extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.text.TextFieldAutoSize,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_autoSize:true},
"protected var",{_text:""},
"protected var",{_tf: undefined},








"public function Label",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this.text=text;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();


},




"override protected function addChildren",function()
{
this._height=18;
this._tf=new flash.text.TextField();
this._tf.height=this._height;
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.selectable=false;
this._tf.mouseEnabled=false;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.LABEL_TEXT);
this._tf.text=this._text;
this.addChild(this._tf);
this.draw();
},











"override public function draw",function()
{
this[$draw]();
this._tf.text=this._text;
if(this._autoSize)
{
this._tf.autoSize=flash.text.TextFieldAutoSize.LEFT;
this._width=this._tf.width;
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
}
else
{
this._tf.autoSize=flash.text.TextFieldAutoSize.NONE;
this._tf.width=this._width;
}
this._height=this._tf.height=18;
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




"public function set autoSize",function(b)
{
this._autoSize=b;
},
"public function get autoSize",function()
{
return this._autoSize;
},




"public function get textField",function()
{
return this._tf;
},
];},[],["com.bit101.components.Component","flash.text.TextField","com.bit101.components.Style","flash.text.TextFormat","flash.text.TextFieldAutoSize","flash.events.Event"]
);