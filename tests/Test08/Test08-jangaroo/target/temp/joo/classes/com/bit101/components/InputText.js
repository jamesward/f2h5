joo.classLoader.prepare(

























"package com.bit101.components",








"public class InputText extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,flash.display.Sprite,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_password:false},
"protected var",{_text:""},
"protected var",{_tf: undefined},









"public function InputText",function(parent,xpos,ypos,text,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}defaultHandler=null;}
this.text=text;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.setSize(100,16);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._tf=new flash.text.TextField();
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.INPUT_TEXT);
this.addChild(this._tf);
this._tf.addEventListener(flash.events.Event.CHANGE,$$bound(this,"onChange"));

},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._tf.displayAsPassword=this._password;

if(this._text!=null)
{
this._tf.text=this._text;
}
else
{
this._tf.text="";
}
this._tf.width=this._width-4;
if(this._tf.text=="")
{
this._tf.text="X";
this._tf.height=Math.min(this._tf.textHeight+4,this._height);
this._tf.text="";
}
else
{
this._tf.height=Math.min(this._tf.textHeight+4,this._height);
}
this._tf.x=2;
this._tf.y=Math.round(this._height/2-this._tf.height/2);
},












"protected function onChange",function(event)
{
this._text=this._tf.text;
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




"public function set restrict",function(str)
{
this._tf.restrict=str;
},
"public function get restrict",function()
{
return this._tf.restrict;
},




"public function set maxChars",function(max)
{
this._tf.maxChars=max;
},
"public function get maxChars",function()
{
return this._tf.maxChars;
},




"public function set password",function(b)
{
this._password=b;
this.invalidate();
},
"public function get password",function()
{
return this._password;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},

];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","Math"]
);