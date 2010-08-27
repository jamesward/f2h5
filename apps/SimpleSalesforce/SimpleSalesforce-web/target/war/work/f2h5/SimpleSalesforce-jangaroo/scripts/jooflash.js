// class QName
joo.classLoader.prepare("package",


"public final class QName",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],[]
);
// class joo.flash.Run
joo.classLoader.prepare("package joo.flash",







"public class Run",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static function main",function(id,primaryDisplayObjectClassName){
(joo.classLoader).import_(primaryDisplayObjectClassName);
(joo.classLoader).complete(function(){
var stage=flash.display.Stage.getInstance(id);
var primaryDisplayObjectClass=joo.getQualifiedObject(primaryDisplayObjectClassName);
stage.addChildAt(new primaryDisplayObjectClass(),0);
});
},

];},["main"],["flash.display.Stage"]
);
// class flash.text.TextFormat
joo.classLoader.prepare("package flash.text",




"public class TextFormat extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




"public function TextFormat",function(font,size,color,
bold,italic,underline,
url,target,align,
leftMargin,rightMargin,
indent,leading){if(arguments.length<13){if(arguments.length<12){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){font=null;}size=null;}color=null;}bold=null;}italic=null;}underline=null;}url=null;}target=null;}align=null;}leftMargin=null;}rightMargin=null;}indent=null;}leading=null;}this[$super]();
this.align=align;
this.blockIndent=this.blockIndent;
this.bold=bold;
this.bullet=this.bullet;
this.color=color;
this.display=this.display;
this.font=font;
this.indent=indent;
this.italic=italic;
this.kerning=this.kerning;
this.leading=leading;
this.leftMargin=leftMargin;
this.letterSpacing=this.letterSpacing;
this.rightMargin=rightMargin;
this.size=size;
this.tabStops=this.tabStops;
this.target=target;
this.underline=underline;
this.url=url;
},


"public var",{align: undefined},


"public var",{blockIndent: undefined},


"public var",{bold: undefined},


"public var",{bullet: undefined},


"public var",{color: undefined},

"public var",{display: undefined},


"public var",{font: undefined},


"public var",{indent: undefined},


"public var",{italic: undefined},


"public var",{kerning: undefined},


"public var",{leading: undefined},


"public var",{leftMargin: undefined},


"public var",{letterSpacing: undefined},


"public var",{rightMargin: undefined},


"public var",{size: undefined},


"public var",{tabStops: undefined},


"public var",{target: undefined},


"public var",{underline: undefined},


"public var",{url: undefined},

];},[],["Object"]
);
// class flash.text.TextField
joo.classLoader.prepare("package flash.text",



































"public class TextField extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_backgroundColor=$$l+'_backgroundColor',$_border=$$l+'_border',$_borderColor=$$l+'_borderColor',$_defaultTextFormat=$$l+'_defaultTextFormat',$_htmlText=$$l+'_htmlText',$_text=$$l+'_text',$getElementName=$$l+'getElementName',$updateElementProperty=$$l+'updateElementProperty';return[


"public function TextField",function(){this[$super]();},


"public var",{alwaysShowSelection: undefined},


"public var",{antiAliasType: undefined},


"public var",{autoSize: undefined},


"public var",{background: undefined},


"private var",{_backgroundColor: undefined},

"public function get backgroundColor",function(){
return this[$_backgroundColor];
},

"public function set backgroundColor",function(val){
this[$_backgroundColor]=val;
this[$updateElementProperty]("style.backgroundColor",flash.display.Graphics.toRGBA(val));
},


"private var",{_border: undefined},

"public function get border",function(){
return this[$_border];
},

"public function set border",function(val){
this[$_border]=val;
this[$updateElementProperty]("style.borderWidth",val?"1px":"0");
},


"private var",{_borderColor: undefined},

"public function get borderColor",function(){
return this[$_borderColor];
},

"public function set borderColor",function(val){
this[$_borderColor]=val;
this[$updateElementProperty]("style.borderColor",flash.display.Graphics.toRGBA(val));
},


"public var",{bottomScrollV: undefined},


"public var",{caretIndex: undefined},


"public var",{condenseWhite: undefined},


"private var",{_defaultTextFormat: undefined},

"public function get defaultTextFormat",function(){
return this[$_defaultTextFormat];
},

"public function set defaultTextFormat",function(val){
this[$_defaultTextFormat]=val;
this[$updateElementProperty]("style.fontFamily",val.font);
this[$updateElementProperty]("style.fontSize",val.size);
this[$updateElementProperty]("style.color",val.color?flash.display.Graphics.toRGBA(val.color):"black");
this[$updateElementProperty]("style.fontWeight",val.bold?"bold":"normal");

},


"public var",{displayAsPassword: undefined},


"public var",{embedFonts: undefined},


"public var",{gridFitType: undefined},

"private var",{_htmlText: undefined},


"public function get htmlText",function(){
return this[$_htmlText];
},


"public function set htmlText",function(val){
this[$_htmlText]=val;
this[$updateElementProperty]("innerHTML",val);
},


"public var",{length: undefined},


"public var",{maxChars: undefined},


"public var",{maxScrollH: undefined},


"public var",{maxScrollV: undefined},


"public var",{mouseWheelEnabled: undefined},


"public var",{multiline: undefined},


"public var",{numLines: undefined},


"public var",{restrict: undefined},


"public var",{scrollH: undefined},


"public var",{scrollV: undefined},


"public var",{selectable: undefined},

"public var",{selectedText: undefined},


"public var",{selectionBeginIndex: undefined},


"public var",{selectionEndIndex: undefined},


"public var",{sharpness: undefined},


"public var",{styleSheet: undefined},


"private var",{_text: undefined},

"public function get text",function(){
return this[$_text];
},

"public function set text",function(val){
this[$_text]=val;

this[$updateElementProperty]("innerHTML",val);
},


"public var",{_textColor: undefined},

"public function get textColor",function(){
return this._textColor;
},

"public function set textColor",function(val){
this._textColor=val;
this[$updateElementProperty]("style.color",flash.display.Graphics.toRGBA(val));
},


"public var",{textHeight: undefined},


"public var",{textWidth: undefined},


"public var",{thickness: undefined},


"public var",{type: undefined},


"public var",{useRichTextClipboard: undefined},


"public var",{wordWrap: undefined},




























































"override protected function getElementName",function(){
return"span";
},

"private function updateElementProperty",function(propertyPath,value){
var element=this.getElement();
if(element){
var propertyPathArcs=propertyPath.split(".");
var lastIndex=propertyPathArcs.length-1;
for(var i=0;i<lastIndex;++i){
element=element[propertyPathArcs[i]];
}
element[propertyPathArcs[lastIndex]]=value;
}
},

];},[],["flash.display.InteractiveObject","flash.display.Graphics"]
);
// class flash.text.TextFieldType
joo.classLoader.prepare("package flash.text",

"public class TextFieldType",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{DYNAMIC:"dynamic"},
"public static const",{INPUT:"input"},

];},[],[]
);
// class flash.text.TextFieldAutoSize
joo.classLoader.prepare("package flash.text",


"public class TextFieldAutoSize",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{CENTER:"center"},
"public static const",{LEFT:"left"},
"public static const",{NONE:"none"},
"public static const",{RIGHT:"right"},

];},[],[]
);
// class flash.utils.ByteArray
joo.classLoader.prepare("package flash.utils",



"public class ByteArray extends Array",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.net.ObjectEncoding);},

"public var",{bytesAvailable: undefined},
"public static var",{defaultObjectEncoding:function(){return(flash.net.ObjectEncoding.AMF3);}},
"public var",{endian: undefined},
"public var",{length: undefined},
"public var",{objectEncoding: undefined},
"public var",{position:0},

"public function clear",function()
{
this.splice(0,this.length);
},

"public function compress",function(algorithm)
{

},

"public function deflate",function()
{

},

"public function inflate",function()
{

},

"public function uncompress",function(algorithm)
{

},


"public function readBoolean",function()
{
return(this.readByte())?true:false;
},


"public function readByte",function()
{
return this.readUnsignedByte()-128;
},

"public function readBytes",function(bytes,offset,length)
{if(arguments.length<3){if(arguments.length<2){offset=0;}length=0;}
if(length==0)
{
length=this.length-this.position;
}
bytes.concat(this.slice(offset,offset+length));
},

"public function readDouble",function()
{
var b1=this.readByte();
var b2=this.readByte();
var b3=this.readByte();
var b4=this.readByte();
var b5=this.readByte();
var b6=this.readByte();
var b7=this.readByte();
var b8=this.readByte();

var sign=1-((b1>>7)<<1);
var exp=(((b1<<4)&0x7FF)|(b2>>4))-1023;

var sig=(((b2&0xF)<<16)|(b3<<8)|b4).toString(2)+
((b5>>7)?'1':'0')+
(((b5&0x7F)<<24)|(b6<<16)|(b7<<8)|b8).toString(2);

sig=parseInt(sig,2);

if(sig==0&&exp==-1023)
{
return 0.0;
}

return sign*(1.0+Math.pow(2,-52)*sig)*Math.pow(2,exp);
},

"public function readFloat",function()
{
var b1=this.readByte();
var b2=this.readByte();
var b3=this.readByte();
var b4=this.readByte();

var sign=1-((b1>>7)<<1);
var exp=(((b1<<1)&0xFF)|(b2>>7))-127;
var sig=((b2&0x7F)<<16)|(b3<<8)|b4;
if(sig==0&&exp==-127)
{
return 0.0;
}

return sign*(1+Math.pow(2,-23)*sig)*Math.pow(2,exp);
},

"public function readInt",function()
{
var x=(this.readByte()<<24)|
(this.readByte()<<16)|
(this.readByte()<<8)|
(this.readByte());

if(x>int.MAX_VALUE)
{
return x-(int.MAX_VALUE*2);
}

return x;
},

"public function readMultiByte",function(length,charSet)
{

return"";
},

"public function readObject",function()
{

return{};
},

"public function readShort",function()
{
var x=(this.readByte()<<8)|
(this.readByte());
return(x>=32768)?x-65536:x;
},

"public function readUnsignedByte",function()
{
return this[this.position++]&0xFF;
},

"public function readUnsignedInt",function()
{
return(this.readByte()<<24)|
(this.readByte()<<16)|
(this.readByte()<<8)|
(this.readByte());
},

"public function readUnsignedShort",function()
{
return(this.readByte()<<8)|
(this.readByte());
},

"public function readUTF",function()
{
return this.readUTFBytes(this.readUnsignedShort());
},

"public function readUTFBytes",function(length)
{
var str="";

while(length>0)
{
str+=String.fromCharCode(this.readUnsignedByte());
length--;
}
return str;
},


"public function writeBoolean",function(value)
{
if(value)
{
this.writeByte(1);
}
else
{
this.writeByte(0);
}
},

"public function writeByte",function(value)
{
this.push(value&0xff);
this.position++;
},

"public function writeBytes",function(bytes,offset,length)
{if(arguments.length<3){if(arguments.length<2){offset=0;}length=0;}

},

"public function writeDouble",function(value)
{

},

"public function writeFloat",function(value)
{

},

"public function writeInt",function(value)
{
var b1=(value<<24);
var b2=(value<<16);
var b3=(value<<8);
var b4=(value);

this.writeByte(b1);
this.writeByte(b2);
this.writeByte(b3);
this.writeByte(b4);
},

"public function writeMultiByte",function(value,charSet)
{

},

"public function writeObject",function(object)
{

},

"public function writeShort",function(value)
{

},

"public function writeUnsignedInt",function(value)
{
var b1=(value<<24);
var b2=(value<<16);
var b3=(value<<8);
var b4=(value);

this.writeByte(b1);
this.writeByte(b2);
this.writeByte(b3);
this.writeByte(b4);
},

"public function writeUTF",function(value)
{
var length=value.length;

var b1=(value<<8);
var b2=(value);

this.writeByte(b1);
this.writeByte(b2);

this.writeUTFBytes(value);
},

"public function writeUTFBytes",function(value)
{
for(var i=0;i<value.length;i++)
{
this.writeByte(value.charCodeAt(i));
}
},

];},[],["Array","flash.net.ObjectEncoding","Math","String"]
);
// class flash.utils.IDataOutput
joo.classLoader.prepare("package flash.utils",

"public interface IDataOutput",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{endian: undefined},
"public var",{objectEncoding: undefined},

,
,
,
,
,
,
,
,
,
,
,
,

];},[],[]
);
// class flash.utils.Endian
joo.classLoader.prepare("package flash.utils",

"public final class Endian",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{BIG_ENDIAN:"bigEndian"},
"public static const",{LITTLE_ENDIAN:"littleEndian"},
];},[],[]
);
// class flash.utils.Dictionary
joo.classLoader.prepare("package flash.utils",

"public class Dictionary",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function Dictionary",function(weak){if(arguments.length<1){weak=false;}this[$super]();
},
];},[],[]

);
// class flash.utils.IExternalizable
joo.classLoader.prepare("package flash.utils",


"public interface IExternalizable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


,

,

];},[],[]

);
// class flash.utils.Timer
joo.classLoader.prepare("package flash.utils",

















"public class Timer extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_delay=$$l+'_delay',$_repeatCount=$$l+'_repeatCount',$_currentCount=$$l+'_currentCount',$tick=$$l+'tick',$checkComplete=$$l+'checkComplete',$timer=$$l+'timer';return[function(){joo.classLoader.init(flash.events.TimerEvent);},














"public function Timer",function(delay,repeatCount){if(arguments.length<2){repeatCount=0;}this[$super]();
this[$_delay]=delay;
this[$_repeatCount]=repeatCount;
},





"public function get delay",function(){
return this[$_delay];
},






"public function set delay",function(val){
this[$_delay]=val;
if(this[$timer]){
this.stop();
this.start();
}
},

"private var",{_delay: undefined},





"public function get repeatCount",function(){
return this[$_repeatCount];
},










"public function set repeatCount",function(val){
this[$_repeatCount]=val;
this[$checkComplete]();
},

"private var",{_repeatCount: undefined},





"public function get running",function(){
return this[$timer]!=null;
},






"public function get currentCount",function(){
return this[$_currentCount];
},

"private var",{_currentCount:0},




"public function start",function(){
if(!this[$timer]){
this[$timer]=window.setInterval($$bound(this,$tick),this[$_delay]);
}
},







"public function stop",function(){
if(this[$timer]){
window.clearInterval(this[$timer]);
this[$timer]=null;
}
},







"public function reset",function(){
this.stop();
this[$_currentCount]=0;
},

"private function tick",function(){
if(!this[$timer]){

return;
}
++this[$_currentCount];
try{
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER));
}finally{
this[$checkComplete]();
}
},

"private function checkComplete",function(){
if(this[$_repeatCount]>0&&this[$_currentCount]>=this[$_repeatCount]){
this.stop();
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER_COMPLETE));
}
},

"private var",{timer:null},
];},[],["flash.events.EventDispatcher","flash.events.TimerEvent"]
);
// class flash.utils.Proxy
joo.classLoader.prepare("package flash.utils",


"public class Proxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"protected function callProperty",function(name)
{var rest=Array.prototype.slice.call(arguments,1);

},

"protected function deleteProperty",function(name)
{
return false;
},

"protected function getDescendants",function(name)
{

},

"protected function getProperty",function(name)
{

},

"protected function hasProperty",function(name)
{
return false;
},

"protected function isAttribute",function(name)
{
return false;
},

"protected function nextName",function(index)
{
return"";
},

"protected function nextNameIndex",function(index)
{
return-1;
},

"protected function nextValue",function(index)
{

},

"protected function setProperty",function(name,value)
{

},

];},[],[]
);
// class flash.utils.IDataInput
joo.classLoader.prepare("package flash.utils",


"public interface IDataInput",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{bytesAvailable: undefined},
"public var",{endian: undefined},
"public var",{objectEncoding: undefined},

,
,
,
,
,
,
,
,
,
,
,
,
,
,
];},[],[]
);
// class flash.xml.XMLDocument
joo.classLoader.prepare("package flash.xml",

"public class XMLDocument extends flash.xml.XMLNode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],["flash.xml.XMLNode"]
);
// class flash.xml.XMLNodeType
joo.classLoader.prepare("package flash.xml",


"public final class XMLNodeType",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{ELEMENT_NODE:1},
"public static const",{TEXT_NODE:3},

];},[],[]
);
// class flash.xml.XMLNode
joo.classLoader.prepare("package flash.xml",
"public class XMLNode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function XMLNode",function(){this[$super]();
},
];},[],[]
);
// class flash.display.BitmapData
joo.classLoader.prepare("package flash.display",









"public class BitmapData implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_transparent=$$l+'_transparent',$_width=$$l+'_width',$_height=$$l+'_height',$context=$$l+'context';return[function(){joo.classLoader.init(flash.geom.Rectangle);},




















"public function BitmapData",function(width,height,transparent,fillColor){if(arguments.length<4){if(arguments.length<3){transparent=true;}fillColor=0xFFFFFFFF;}this[$super]();
this[$_transparent]=transparent;
this.canvas=window.document.createElement("canvas");
this.canvas.width=this[$_width]=width;
this.canvas.height=this[$_height]=height;
this.canvas.style.position="absolute";
this[$context]=this.canvas.getContext("2d");

},





"public function get rect",function(){
return new flash.geom.Rectangle(0,0,this[$_width],this[$_height]);
},




"public function get transparent",function(){
return this[$_transparent];
},




"public function get width",function(){
return this[$_width];
},




"public function get height",function(){
return this[$_height];
},






























"public function colorTransform",function(rect,colorTransform){

if(colorTransform.alphaOffset==0
&&colorTransform.redMultiplier>=0&&colorTransform.redMultiplier<=1
&&colorTransform.redMultiplier==colorTransform.greenMultiplier
&&colorTransform.redMultiplier==colorTransform.blueMultiplier
&&colorTransform.redMultiplier==colorTransform.alphaMultiplier){
if(colorTransform.redOffset>=0&&colorTransform.greenOffset>=0&&colorTransform.blueOffset>=0){
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);

var alpha=1;
if(colorTransform.redMultiplier==1){
this[$context].globalCompositeOperation="lighter";
}else{
this[$context].globalCompositeOperation="source-over";
alpha-=colorTransform.alphaMultiplier;
}
this[$context].fillStyle="rgba("+
[colorTransform.redOffset,colorTransform.greenOffset,colorTransform.blueOffset,
alpha]
.join(",")+")";
this[$context].fillRect(rect.x,rect.y,rect.width,rect.height);
this[$context].restore();
return;



}
}


var input=this[$context].getImageData(rect.x,rect.y,rect.width,rect.height);









var w=input.width,h=input.height;
var inputData=input.data;



var maps=colorTransform.getComponentMaps();
var i;
for(var m=0;m<4;++m){
var map=maps[m];
if(map){
for(i=inputData.length-4+m;i>=0;i-=4){
inputData[i]=map[inputData[i]];
}
}
}

this[$context].putImageData(input,rect.x,rect.y);
},


























































"public function draw",function(source,matrix,colorTransform,
blendMode,clipRect,smoothing){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){matrix=null;}colorTransform=null;}blendMode=null;}clipRect=null;}smoothing=false;}
var element=is(source,flash.display.BitmapData)?(source).canvas:(source).getElement();
if(matrix){
this[$context].save();
this[$context].setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
}
this[$context].drawImage(element,0,0);
if(matrix){
this[$context].restore();
}
},

"private var",{_transparent: undefined},
"private var",{_width: undefined},
"private var",{_height: undefined},
"internal var",{canvas: undefined},
"private var",{context: undefined},
];},[],["flash.display.IBitmapDrawable","flash.geom.Rectangle"]
);
// class flash.display.BlendMode
joo.classLoader.prepare("package flash.display",

"public class BlendMode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{ADD:"add"},
"public static const",{ALPHA:"alpha"},
"public static const",{DARKEN:"darken"},
"public static const",{DIFFERENCE:"difference"},
"public static const",{ERASE:"erase"},
"public static const",{HARDLIGHT:"hardlight"},
"public static const",{INVERT:"invert"},
"public static const",{LAYER:"layer"},
"public static const",{LIGHTEN:"lighten"},
"public static const",{MULTIPLY:"multiply"},
"public static const",{NORMAL:"normal"},
"public static const",{OVERLAY:"overlay"},
"public static const",{SCREEN:"screen"},
"public static const",{SHADER:"shader"},
"public static const",{SUBTRACT:"subtract"},
];},[],[]
);
// class flash.display.IBitmapDrawable
joo.classLoader.prepare("package flash.display",









"public interface IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

];},[],[]
);
// class flash.display.Loader
joo.classLoader.prepare("package flash.display",


"public class Loader extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{content: undefined},
"public var",{contentLoaderInfo: undefined},

];},[],["flash.display.DisplayObjectContainer"]
);
// class flash.display.FrameLabel
joo.classLoader.prepare("package flash.display",











"public class FrameLabel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_frame=$$l+'_frame',$_name=$$l+'_name';return[

"private var",{_frame: undefined},
"private var",{_name: undefined},

"public function FrameLabel",function(){this[$super]();
},




"public function get frame",function(){
return this[$_frame];
},




"public function get name",function(){
return this[$_name];
},
];},[],[]
);
// class flash.display.Stage
joo.classLoader.prepare("package flash.display",











































"public class Stage extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$x=$$l+'x',$y=$$l+'y',$createElement=$$l+'createElement',$enterFrame=$$l+'enterFrame',$id=$$l+'id',$_frameRate=$$l+'_frameRate',$frameTimer=$$l+'frameTimer';return[function(){joo.classLoader.init(flash.events.Event,flash.events.TimerEvent,flash.utils.Timer);},

"private static var",{instance: undefined},
"public static function getInstance",function(id){if(arguments.length<1){id="stage";}
if(!$$private.instance){
new flash.display.Stage(id);
}
return $$private.instance;
},

"public function Stage",function(id){
this[$id]=id;
$$private.instance=this;
this[$super]();
this[$frameTimer]=new flash.utils.Timer(1000/this[$_frameRate]);
this[$frameTimer].addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,$enterFrame));
this[$frameTimer].start();
},

"override public function get x",function(){

return this.getElement().offsetLeft;
},

"override public function get y",function(){

return this.getElement().offsetTop;
},


"public function get stageHeight",function(){
return this.getElement().offsetHeight;
},

"public function set stageHeight",function(value){
this.getElement()['offsetHeight']=value;
},


"public function get stageWidth",function(){
return this.getElement().offsetWidth;
},

"public function set stageWidth",function(value){
this.getElement()['offsetWidth']=value;
},

"override protected function createElement",function(){
var element=window.document.getElementById(this[$id]);
element.style.position="relative";
var width=element.getAttribute("width");
if(width){
element.style.width=width+"px";
}
var height=element.getAttribute("height");
if(height){
element.style.height=height+"px";
}
element.innerHTML="";
return element;
},

"private function enterFrame",function(){
this.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME,false,false));
},












"public function get frameRate",function(){
return this[$_frameRate];
},













"public function set frameRate",function(value){
this[$_frameRate]=value;
this[$frameTimer].delay=1000/value;
},

"private var",{id: undefined},
"private var",{_frameRate:30},
"private var",{frameTimer: undefined},
];},["getInstance"],["flash.display.DisplayObjectContainer","flash.utils.Timer","flash.events.TimerEvent","flash.events.Event"]
);
// class flash.display.CapsStyle
joo.classLoader.prepare("package flash.display",





"public class CapsStyle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[



"public static const",{NONE:"butt"},



"public static const",{ROUND:"round"},



"public static const",{SQUARE:"square"},

];},[],[]
);
// class flash.display.Sprite
joo.classLoader.prepare("package flash.display",















"public class Sprite extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},

"public var",{buttonMode: undefined},
"public var",{useHandCursor: undefined},







"public function Sprite",function(){
this[$super]();
},
















"public function get graphics",function(){
if(!this[$_graphics]){
var canvas=flash.display.Shape.createCanvas();
var element=this.getElement();
if(element.firstChild){
element.insertBefore(canvas,element.firstChild);
}else{
element.appendChild(canvas);
}
this[$_graphics]=new flash.display.Graphics(canvas.getContext("2d"));
}
return this[$_graphics];
},

"override public function set transform",function(value){
this[$transform]=value;
var m=value.matrix;
if(m){
this.graphics.renderingContext.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
}
},

"private var",{_graphics: undefined},
];},[],["flash.display.DisplayObjectContainer","flash.display.Shape","flash.display.Graphics"]
);
// class flash.display.StageAlign
joo.classLoader.prepare("package flash.display",

"public class StageAlign",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{BOTTOM:"B"},
"public static const",{BOTTOM_LEFT:"BL"},
"public static const",{BOTTOM_RIGHT:"BR"},
"public static const",{LEFT:"L"},
"public static const",{RIGHT:"R"},
"public static const",{TOP:"T"},
"public static const",{TOP_LEFT:"TL"},
"public static const",{TOP_RIGHT:"TR"},
];},[],[]
);
// class flash.display.Shape
joo.classLoader.prepare("package flash.display",
















"public class Shape extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},




"public function Shape",function(){
this[$super]();
},

"override protected function createElement",function(){
var canvas=flash.display.Shape.createCanvas();
canvas.style.position="absolute";
return canvas;
},

"internal static function createCanvas",function(){
var canvas=window.document.createElement("canvas");

canvas.width=flash.display.Stage.getInstance().stageWidth;
canvas.height=flash.display.Stage.getInstance().stageHeight;
return canvas;
},

"internal static function createGraphics",function(canvas){
return new flash.display.Graphics(canvas.getContext("2d"));
},





"public function get graphics",function(){
if(!this[$_graphics]){
this[$_graphics]=flash.display.Shape.createGraphics(this.getElement());
}
return this[$_graphics];
},

"override public function set transform",function(value){
this[$transform]=value;
var m=value.matrix;
if(m){
this.graphics.renderingContext.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
}
},

"private var",{_graphics: undefined},
];},["createCanvas","createGraphics"],["flash.display.DisplayObject","flash.display.Stage","flash.display.Graphics"]
);
// class flash.display.StageScaleMode
joo.classLoader.prepare("package flash.display",

"public class StageScaleMode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{EXACT_FIT:"exactFit"},
"public static const",{NO_BORDER:"noBorder"},
"public static const",{NO_SCALE:"noScale"},
"public static const",{SHOW_ALL:"showAll"},
];},[],[]
);
// class flash.display.DisplayObject
joo.classLoader.prepare("package flash.display",








"public class DisplayObject extends flash.events.EventDispatcher implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_mouseX=$$l+'_mouseX',$_mouseY=$$l+'_mouseY',$_handleMouseMove=$$l+'_handleMouseMove',$addEventListener=$$l+'addEventListener',$removeEventListener=$$l+'removeEventListener',$transformAndDispatch=$$l+'transformAndDispatch',$dispatchWithOwnTarget=$$l+'dispatchWithOwnTarget',$_stage=$$l+'_stage',$_parent=$$l+'_parent',$_elem=$$l+'_elem',$_x=$$l+'_x',$_y=$$l+'_y',$_width=$$l+'_width',$_height=$$l+'_height',$_transform=$$l+'_transform';return[function(){joo.classLoader.init(flash.events.MouseEvent,flash.geom.Transform,flash.events.Event);},

"private var",{_mouseX:0},
"private var",{_mouseY:0},

"public function get mouseX",function()
{
return this[$_mouseX];
},

"public function get mouseY",function()
{
return this[$_mouseY];
},

"public var",{alpha: undefined},

"public function stopDrag",function()
{

},

"public var",{filters: undefined},

"public var",{visible: undefined},

"public var",{name: undefined},

"public function DisplayObject",function(){
this[$super]();
this[$_stage]=flash.display.Stage.getInstance();
this[$_elem]=this.createElement();
if(!isNaN(this.x)){
this[$_elem].style.left=this.x+"px";
}
if(!isNaN(this.y)){
this[$_elem].style.top=this.y+"px";
}
if(!isNaN(this[$_stage].stageWidth)){
this[$_elem].style.width=this[$_stage].stageWidth+"px";
this[$_elem].style.height=this[$_stage].stageHeight+"px";
}

this.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,$_handleMouseMove));
},

"private function _handleMouseMove",function(event)
{
this[$_mouseX]=event.localX;
this[$_mouseY]=event.localY;
},






























"public function get stage",function(){
return this[$_stage];
},
































"public function get parent",function(){
return this[$_parent];
},


"public function set parent",function(parent){
this[$_parent]=parent;
},

"private static function createEventMap",function(){var events=arguments;
var result={};
for(var i=0;i<events.length;++i){
result[events[i].toLowerCase()]=events[i];
}
return result;
},

"private static const",{DELEGATED_EVENT_MAP:function(){return(
$$private.createEventMap(flash.events.MouseEvent.CLICK,flash.events.MouseEvent.MOUSE_MOVE));}},

"override public function addEventListener",function(type,listener,useCapture,
priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var newEventType=!this.hasEventListener(type);
this[$addEventListener](type,listener,useCapture,priority,useWeakReference);
var jsType=type.toLowerCase();
if(newEventType){
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
this[$_elem].addEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}else if(this!=this.stage&&flash.events.Event.ENTER_FRAME==type){
if(this.stage!=undefined)
{
this.stage.addEventListener(type,$$bound(this,$dispatchWithOwnTarget),useCapture,priority,useWeakReference);
}
}
}
},

"override public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
this[$removeEventListener](type,listener,useCapture);
var jsType=type.toLowerCase();
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
this[$_elem].removeEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}
},

"private function transformAndDispatch",function(event){
var type=$$private.DELEGATED_EVENT_MAP[event.type];
return this.dispatchEvent(new flash.events.MouseEvent(type,true,true,event.pageX-this.stage.x,event.pageY-this.stage.y,null,
event.ctrlKey,event.altKey,event.shiftKey));
},

"private function dispatchWithOwnTarget",function(event){
return this.dispatchEvent(event.clone());
},







































"public function get x",function(){
return this[$_x];
},







"public function set x",function(value){
this[$_x]=value;
if(this[$_elem]){
this[$_elem].style.left=value+"px";
}
},
































"public function get y",function(){
return this[$_y];
},







"public function set y",function(value){
this[$_y]=value;
if(this[$_elem]){
this[$_elem].style.top=value+"px";
}
},



































"public function get width",function(){
return this[$_elem].offsetWidth;

},






"public function set width",function(value){
this[$_width]=value;
},







































"public function get height",function(){
return this[$_height];
},






"public function set height",function(value){
this[$_height]=value;
},

"protected function createElement",function(){
var elem=window.document.createElement(this.getElementName());
elem.style.position="absolute";
return elem;
},

"protected function getElementName",function(){
return"div";
},

"public function getElement",function(){
return this[$_elem];
},






























































"public function get transform",function(){
if(!this[$_transform])
this[$_transform]=new flash.geom.Transform(this);
return this[$_transform];
},

"public function set transform",function(value){
this[$_transform]=value;
},

"private var",{_stage: undefined},
"private var",{_parent: undefined},
"private var",{_elem: undefined},
"private var",{_x:0,_y:0,_width: undefined,_height: undefined},
"private var",{_transform: undefined},
];},[],["flash.events.EventDispatcher","flash.display.IBitmapDrawable","flash.display.Stage","flash.events.MouseEvent","flash.events.Event","flash.geom.Transform"]
);
// class flash.display.GradientType
joo.classLoader.prepare("package flash.display",


"public class GradientType extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{LINEAR:"linear"},


"public static const",{RADIAL:"radial"},

];},[],["Object"]
);
// class flash.display.InterpolationMethod
joo.classLoader.prepare("package flash.display",





"public class InterpolationMethod extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{LINEAR_RGB:"linear_rgb"},


"public static const",{RGB:"rgb"},

];},[],["Object"]
);
// class flash.display.BitmapDataChannel
joo.classLoader.prepare("package flash.display",

















"public class BitmapDataChannel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




"public static const",{ALPHA:8},




"public static const",{BLUE:4},




"public static const",{GREEN:2},




"public static const",{RED:1},

];},[],[]
);
// class flash.display.JointStyle
joo.classLoader.prepare("package flash.display",




"public class JointStyle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[



"public static const",{BEVEL:"bevel"},



"public static const",{MITER:"miter"},



"public static const",{ROUND:"round"},

];},[],[]
);
// class flash.display.SimpleButton
joo.classLoader.prepare("package flash.display",






"public class SimpleButton extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getElementName=$$l+'getElementName',$_upState=$$l+'_upState',$_overState=$$l+'_overState',$_downState=$$l+'_downState',$_hitTestState=$$l+'_hitTestState',$_enabled=$$l+'_enabled',$_trackAsMenu=$$l+'_trackAsMenu',$_useHandCursor=$$l+'_useHandCursor';return[








"public function SimpleButton",function(upState,overState,
downState,hitTestState){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){upState=null;}overState=null;}downState=null;}hitTestState=null;}
this[$super]();
this[$_upState]=upState;
this[$_overState]=overState;
this[$_downState]=downState;
this[$_hitTestState]=hitTestState;
},

"override protected function getElementName",function(){
return"button";
},






"public function get downState",function(){
return this[$_downState];
},

"public function set downState",function(value){
this[$_downState]=value;
},





"public function get enabled",function(){
return this[$_enabled];
},

"public function set enabled",function(value){
this[$_enabled]=value;
},


"public function get hitTestState",function(){
return this[$_hitTestState];
},

"public function set hitTestState",function(value){
this[$_hitTestState]=value;
},


"public function get overState",function(){
return this[$_overState];
},

"public function set overState",function(value){
this[$_overState]=value;
},












"public function get trackAsMenu",function(){
return this[$_trackAsMenu];
},

"public function set trackAsMenu",function(value){
this[$_trackAsMenu]=value;
},


"public function get upState",function(){
return this[$_upState];
},

"public function set upState",function(value){
this[$_upState]=value;
},


"public function get useHandCursor",function(){
return this[$_useHandCursor];
},

"public function set useHandCursor",function(value){
this[$_useHandCursor]=value;
},

"private var",{_upState: undefined},
"private var",{_overState: undefined},
"private var",{_downState: undefined},
"private var",{_hitTestState: undefined},

"private var",{_enabled:true},
"private var",{_trackAsMenu: undefined},
"private var",{_useHandCursor: undefined},
];},[],["flash.display.InteractiveObject"]
);
// class flash.display.PixelSnapping
joo.classLoader.prepare("package flash.display",





"public class PixelSnapping",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




"public static const",{ALWAYS:"always"},





"public static const",{AUTO:"auto"},




"public static const",{NEVER:"never"},

];},[],[]
);
// class flash.display.LoaderInfo
joo.classLoader.prepare("package flash.display",










"public class LoaderInfo extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{actionScriptVersion: undefined},
"public var",{applicationDomain: undefined},
"public var",{bytes: undefined},
"public var",{bytesLoaded: undefined},
"public var",{bytesTotal: undefined},
"public var",{childAllowsParent: undefined},
"public var",{content: undefined},
"public var",{contentType: undefined},
"public var",{frameRate: undefined},
"public var",{height: undefined},
"public var",{isURLInaccessible: undefined},
"public var",{loader: undefined},
"public var",{loaderURL: undefined},
"public var",{parameters: undefined},
"public var",{parentAllowsChild: undefined},
"public var",{sameDomain: undefined},
"public var",{sharedEvents: undefined},
"public var",{swfVersion: undefined},
"public var",{uncaughtErrorEvents: undefined},
"public var",{url: undefined},
"public var",{width: undefined},

"public static function getLoaderInfoByDefinition",function(object)
{
return null;
},

];},["getLoaderInfoByDefinition"],["flash.events.EventDispatcher"]

);
// class flash.display.DisplayObjectContainer
joo.classLoader.prepare("package flash.display",













"public class DisplayObjectContainer extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$children=$$l+'children';return[

"public function contains",function(child)
{
return false;
},

"public function removeChild",function(child)
{
return child;
},

"public var",{mouseChildren:true},










"public function DisplayObjectContainer",function(){
this[$super]();
this[$children]=[];
},


































"public function get numChildren",function(){
return this[$children].length;
},











































"public function addChild",function(child){
return this.addChildAt(child,this[$children].length);
},






































"public function addChildAt",function(child,index){
var refChild=this[$children][index];
this[$children].splice(index,0,child);
child.parent=this;
if(refChild){
this.getElement().insertBefore(child.getElement(),refChild.getElement());
}else{
this.getElement().appendChild(child.getElement());
}
return child;
},































"public function getChildAt",function(index){
return this[$children][index];
},

"private var",{children: undefined},
];},[],["flash.display.InteractiveObject"]
);
// class flash.display.Bitmap
joo.classLoader.prepare("package flash.display",


"public class Bitmap extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$_bitmapData=$$l+'_bitmapData',$_pixelSnapping=$$l+'_pixelSnapping',$_smoothing=$$l+'_smoothing';return[








"public function Bitmap",function(bitmapData,pixelSnapping,smoothing){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){bitmapData=null;}pixelSnapping="auto";}smoothing=false;}
this[$_bitmapData]=bitmapData;
this[$super]();
this[$_pixelSnapping]=pixelSnapping;
this[$_smoothing]=smoothing;
},

"override protected function createElement",function(){
return this[$_bitmapData].canvas;
},





"public function get bitmapData",function(){
return this[$_bitmapData];
},

"public function set bitmapData",function(value){
this[$_bitmapData]=value;
},














"public function get pixelSnapping",function(){
return this[$_pixelSnapping];
},














"public function set pixelSnapping",function(value){
this[$_pixelSnapping]=value;
},






"public function get smoothing",function(){
return this[$_smoothing];
},





"public function set smoothing",function(value){
this[$_smoothing]=value;
},

"private var",{_bitmapData: undefined},
"private var",{_pixelSnapping: undefined},
"private var",{_smoothing: undefined},

];},[],["flash.display.DisplayObject"]
);
// class flash.display.Graphics
joo.classLoader.prepare("package flash.display",







"public class Graphics",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$context=$$l+'context',$insideFill=$$l+'insideFill',$_beginFill=$$l+'_beginFill',$createGradientStyle=$$l+'createGradientStyle';return[function(){joo.classLoader.init(flash.geom.Matrix,flash.display.CapsStyle,Math,flash.display.GradientType,flash.display.JointStyle,flash.geom.Point);},

"private var",{context: undefined},
"private var",{insideFill:false},

"public function Graphics",function(context){this[$super]();
this[$context]=context;

this[$context].moveTo(0,0);
this[$context].lineCap=flash.display.CapsStyle.ROUND;
this[$context].lineJoin=flash.display.JointStyle.ROUND;
this[$context].miterLimit=3;
},

"internal function get renderingContext",function(){
return this[$context];
},













































































"public function lineStyle",function(thickness,color,alpha,
pixelHinting,scaleMode,
caps,
joints,miterLimit){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){thickness=NaN;}color=0;}alpha=1.0;}pixelHinting=false;}scaleMode="normal";}caps=null;}joints=null;}miterLimit=3;}
if(!isNaN(thickness)){
this[$context].lineWidth=thickness||1;
}
this[$context].strokeStyle=flash.display.Graphics.toRGBA(color,alpha);
this[$context].lineCap=caps||flash.display.CapsStyle.ROUND;
this[$context].lineJoin=joints||flash.display.JointStyle.ROUND;
this[$context].miterLimit=miterLimit;
},

































































































"public function lineGradientStyle",function(type,colors,alphas,ratios,matrix,
spreadMethod,interpolationMethod,
focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$context].strokeStyle=this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio);
},


















































"public function lineTo",function(x,y){
this[$context].lineTo(x,y);
if(!this[$insideFill]){
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
}
},














































































"public function curveTo",function(controlX,controlY,anchorX,anchorY){
this[$context].quadraticCurveTo(controlX,controlY,anchorX,anchorY);
if(!this[$insideFill]){
this[$context].stroke();
}
},

















"public function drawCircle",function(x,y,radius){
this[$context].moveTo(x+radius,y);
this[$context].arc(x,y,radius,0,2*Math.PI,false);
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
},


















"public function drawRect",function(x,y,width,height){
if(this[$insideFill]){
this[$context].fillRect(x,y,width,height);
}
this[$context].strokeRect(x,y,width,height);
},






















"public function drawRoundRect",function(x,y,width,height,
ellipseWidth,ellipseHeight){if(arguments.length<6){ellipseHeight=NaN;}
if(ellipseHeight==0||ellipseWidth==0){
this.drawRect(x,y,width,height);
return;
}
if(isNaN(ellipseHeight)){
ellipseHeight=ellipseWidth;
}
var x_lw=x+ellipseWidth;
var x_r=x+width;
var x_rw=x_r-ellipseWidth;
var y_tw=y+ellipseHeight;
var y_b=y+height;
var y_bw=y_b-ellipseHeight;
this[$context].beginPath();
this[$context].moveTo(x_lw,y);
this[$context].lineTo(x_rw,y);
this[$context].quadraticCurveTo(x_r,y,x_r,y_tw);
this[$context].lineTo(x_r,y_bw);
this[$context].quadraticCurveTo(x_r,y_b,x_rw,y_b);
this[$context].lineTo(x_lw,y_b);
this[$context].quadraticCurveTo(x,y_b,x,y_bw);
this[$context].lineTo(x,y_tw);
this[$context].quadraticCurveTo(x,y,x_lw,y);
this[$context].closePath();
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
},











































"public function moveTo",function(x,y){
this[$context].beginPath();
this[$context].moveTo(x,y);
},




"public function clear",function(){
this.lineStyle();
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);
this[$context].fillStyle="";
this[$context].clearRect(0,0,this[$context].canvas.width,this[$context].canvas.height);
this[$context].restore();
this[$insideFill]=false;
this[$context].moveTo(0,0);
},













"public function beginFill",function(color,alpha){if(arguments.length<2){alpha=1.0;}
this[$_beginFill](flash.display.Graphics.toRGBA(color,alpha));
},

"private function _beginFill",function(fillStyle){
this[$context].beginPath();
this[$context].fillStyle=fillStyle;
this[$insideFill]=true;
},
















































































"public function beginGradientFill",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$_beginFill](this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio));
},

"private function createGradientStyle",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}


var gradient;
var p0=new flash.geom.Point(0,0);
var p1=new flash.geom.Point(-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2,0);
var p2=type==flash.display.GradientType.LINEAR
?new flash.geom.Point(0,-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2)
:new flash.geom.Point(flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2*focalPointRatio,0);
if(matrix){
p0=matrix.transformPoint(p0);
p1=matrix.transformPoint(p1);
p2=matrix.transformPoint(p2);
}
if(type==flash.display.GradientType.LINEAR){
var x1;
var y1;
if(p2.x==p0.x){
x1=p1.x;
y1=p1.y;
}else if(p2.y==p0.y){
x1=p1.x;
y1=p2.x;
}else{
var d=-(p2.x-p0.x)/(p2.y-p0.y);

x1=(p1.x/d+p1.y+d*p0.x-p0.y)/(d+1/d);
y1=d*(x1-p0.x)+p0.y;
}
var x2=p0.x+(p0.x-x1);
var y2=p0.y+(p0.y-y1);
gradient=this[$context].createLinearGradient(x1,y1,x2,y2);
}else{

var rx=p1.x-p0.x;
var ry=p1.y-p0.y;

var r=rx==0?Math.abs(ry):ry==0?Math.abs(rx):Math.sqrt(rx*rx+ry*ry);
gradient=this[$context].createRadialGradient(p2.x,p2.y,0,p0.x,p0.y,r);
}
for(var i=0;i<colors.length;++i){
gradient.addColorStop(ratios[i]/255,flash.display.Graphics.toRGBA(colors[i],alphas[i]));
}
return gradient;
},











"public function endFill",function(){
this[$context].fill();
this[$insideFill]=false;
},

"public static function toRGBA",function(color,alpha){if(arguments.length<2){alpha=1.0;}
return"rgba("+[color>>16,color>>8&0xFF,color&0xFF,alpha].join(",")+")";
},
];},["toRGBA"],["flash.display.CapsStyle","flash.display.JointStyle","Math","flash.geom.Point","flash.geom.Matrix","flash.display.GradientType"]
);
// class flash.display.InteractiveObject
joo.classLoader.prepare("package flash.display",























































































































"public class InteractiveObject extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{mouseEnabled:true},





















"public function get tabEnabled",function()
{
return false;
},
"public function set tabEnabled",function(enabled)
{
},






"public function InteractiveObject",function(){
this[$super]();

},
];},[],["flash.display.DisplayObject"]
);
// class flash.display.LineScaleMode
joo.classLoader.prepare("package flash.display",



"public class LineScaleMode extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[





"public static const",{HORIZONTAL:"horizontal"},




"public static const",{NONE:"none"},




"public static const",{NORMAL:"normal"},




"public static const",{VERTICAL:"vertical"},

];},[],["Object"]
);
// class flash.display.SpreadMethod
joo.classLoader.prepare("package flash.display",





"public class SpreadMethod extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{PAD:"pad"},

"public static const",{REFLECT:"reflect"},

"public static const",{REPEAT:"repeat"},

];},[],["Object"]
);
// class flash.filters.BitmapFilter
joo.classLoader.prepare("package flash.filters",


"public class BitmapFilter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],[]
);
// class flash.filters.DropShadowFilter
joo.classLoader.prepare("package flash.filters",


"public class DropShadowFilter extends flash.filters.BitmapFilter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public function DropShadowFilter",function(distance,angle,color,alpha,blurX,blurY,strength,quality,inner,knockout,hideObject)
{if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){distance=4.0;}angle=45;}color=0;}alpha=1.0;}blurX=4.0;}blurY=4.0;}strength=1.0;}quality=1;}inner=false;}knockout=false;}hideObject=false;}this[$super]();

},
];},[],["flash.filters.BitmapFilter"]
);
// class flash.ui.Mouse
joo.classLoader.prepare("package flash.ui",


"public final class Mouse",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static var",{cursor: undefined},
"public static var",{supportsCursor: undefined},

"public static function hide",function()
{

},

"public static function show",function()
{

},
];},["hide","show"],[]
);
// class flash.system.Capabilities
joo.classLoader.prepare("package flash.system",


"public final class Capabilities",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static var",{avHardwareDisable: undefined},
"public static var",{cpuArchitecture: undefined},
"public static var",{hasAccessibility: undefined},
"public static var",{hasAudio: undefined},
"public static var",{hasAudioEncoder: undefined},
"public static var",{hasEmbeddedVideo: undefined},
"public static var",{hasIME: undefined},
"public static var",{hasMP3: undefined},
"public static var",{hasPrinting: undefined},
"public static var",{hasScreenBroadcast: undefined},
"public static var",{hasScreenPlayback: undefined},
"public static var",{hasStreamingAudio: undefined},
"public static var",{hasStreamingVideo: undefined},
"public static var",{hasTLS: undefined},
"public static var",{hasVideoEncoder: undefined},
"public static var",{isDebugger: undefined},
"public static var",{isEmbeddedInAcrobat: undefined},
"public static var",{language: undefined},
"public static var",{localFileReadDisable: undefined},
"public static var",{manufacturer: undefined},
"public static var",{maxLevelIDC: undefined},
"public static var",{os: undefined},
"public static var",{pixelAspectRatio: undefined},
"public static var",{playerType: undefined},
"public static var",{screenColor: undefined},
"public static var",{screenDPI: undefined},
"public static var",{screenResolutionX: undefined},
"public static var",{screenResolutionY: undefined},
"public static var",{serverString: undefined},
"public static var",{supports32BitProcesses: undefined},
"public static var",{supports64BitProcesses: undefined},
"public static var",{touchscreenType: undefined},
"public static var",{version: undefined},

];},[],[]

);
// class flash.system.LoaderContext
joo.classLoader.prepare("package flash.system",


"public class LoaderContext",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{allowCodeImport: undefined},
"public var",{applicationDomain:null},
"public var",{checkPolicyFile:false},
"public var",{securityDomain:null},

"public function LoaderContext",function(checkPolicyFile,applicationDomain,securityDomain)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){checkPolicyFile=false;}applicationDomain=null;}securityDomain=null;}this[$super]();

},

];},[],[]

);
// class flash.system.SecurityDomain
joo.classLoader.prepare("package flash.system",


"public class SecurityDomain",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static var",{currentDomain: undefined},

];},[],[]
);
// class flash.system.ApplicationDomain
joo.classLoader.prepare("package flash.system",


"public final class ApplicationDomain",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static var",{currentDomain: undefined},
"public var",{domainMemory: undefined},
"public static var",{MIN_DOMAIN_MEMORY_LENGTH: undefined},
"public var",{parentDomain: undefined},

"public function getDefinition",function(name)
{
return{};
},

"public function hasDefinition",function(name)
{
return false;
},

];},[],[]
);
// class flash.system.Security
joo.classLoader.prepare("package flash.system",


"public class Security",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static var",{exactSettings: undefined},
"public static var",{sandboxType: undefined},

"public static function allowDomain",function()
{var domains=arguments;

},

"public static function allowInsecureDomain",function()
{var domains=arguments;

},

"public static function loadPolicyFile",function(url)
{

},

"public static function showSettings",function(panel)
{if(arguments.length<1){panel="default";}

},

"public static const",{LOCAL_TRUSTED:"localTrusted"},
"public static const",{LOCAL_WITH_FILE:"localWithFile"},
"public static const",{LOCAL_WITH_NETWORK:"localWithNetwork"},
"public static const",{REMOTE:"remote"},

];},["allowDomain","allowInsecureDomain","loadPolicyFile","showSettings"],[]

);
// class flash.geom.Transform
joo.classLoader.prepare("package flash.geom",









"public class Transform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$displayObject=$$l+'displayObject',$_colorTransform=$$l+'_colorTransform',$_matrix=$$l+'_matrix';return[function(){joo.classLoader.init(flash.geom.Rectangle);},

"public function Transform",function(displayObject){this[$super]();
this[$displayObject]=displayObject;
},

"private var",{displayObject: undefined},





"public function get colorTransform",function(){
return this[$_colorTransform];
},

"public function set colorTransform",function(value){
this[$_colorTransform]=value;
},

"private var",{_colorTransform: undefined},






"public function get concatenatedColorTransform",function(){
var concCT=this[$_colorTransform];
var currentDO=this[$displayObject].parent;
while(currentDO){
concCT.concat(currentDO.transform.colorTransform);
currentDO=currentDO.parent;
}
return this.colorTransform;
},





"public function get matrix",function(){
return this[$_matrix];
},
"public function set matrix",function(value){
this[$_matrix]=value;
this[$displayObject].transform=this;
},

"private var",{_matrix: undefined},






"public function get concatenatedMatrix",function(){
var concMatrix=this[$_matrix];
var currentDO=this[$displayObject].parent;
while(currentDO){
concMatrix.concat(currentDO.transform.matrix);
currentDO=currentDO.parent;
}
return concMatrix;
},





"public function get pixelBounds",function(){
return new flash.geom.Rectangle(this[$displayObject].x,this[$displayObject].y,this[$displayObject].width,this[$displayObject].height);
},

];},[],["flash.geom.Rectangle"]
);
// class flash.geom.Matrix
joo.classLoader.prepare("package flash.geom",





"public class Matrix",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},











"public function Matrix",function(a,b,c,d,tx,ty){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){a=1;}b=0;}c=0;}d=1;}tx=0;}ty=0;}this[$super]();
this.a=a;
this.b=b;
this.c=c;
this.d=d;
this.tx=tx;
this.ty=ty;
},




"public var",{a: undefined},



"public var",{b: undefined},



"public var",{c: undefined},



"public var",{d: undefined},



"public var",{tx: undefined},



"public var",{ty: undefined},





"public function clone",function(){
return new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
},













"public function concat",function(m){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;
this.a=m.a*a+m.c*b;
this.b=m.b*a+m.d*b;
this.c=m.a*c+m.c*d;
this.d=m.b*c+m.d*d;
this.tx=m.a*tx+m.c*ty+m.tx;
this.ty=m.b*tx+m.d*ty+m.ty;
},
































































"public function createBox",function(scaleX,scaleY,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){scaleX=1;}scaleY=1;}rotation=0;}tx=0;}ty=0;}

if(rotation==0){
this.a=this.d=1;
this.b=this.c=0;
}else{
this.a=Math.cos(rotation);
this.b=Math.sin(rotation);
this.c=-this.b;
this.d=this.a;
}
if(scaleX!=1){
this.a*=scaleX;
this.c*=scaleY;
}
if(scaleY!=1){
this.b*=scaleY;
this.d*=scaleY;
}
this.tx=tx;
this.ty=ty;
},

"public static const",{MAGIC_GRADIENT_FACTOR:16384/10},










"public function createGradientBox",function(width,height,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){width=NaN;}height=NaN;}rotation=0;}tx=0;}ty=0;}
this.createBox(width/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,height/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,rotation,tx+width/2,ty+height/2);
},








"public function transformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y+this.tx,this.b*point.x+this.d*point.y+this.ty);
},









"public function deltaTransformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y,this.b*point.x+this.d*point.y);
},




"public function identity",function(){
this.a=this.d=1;
this.b=this.c=this.tx=this.ty=0;
},




"public function invert",function(){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;


var det=a*d-c*b;
















this.a=d/det;
this.b=-b/det;
this.c=-c/det;
this.d=a/det;
this.tx=(c*ty-tx*d)/det;
this.ty=(tx*b-a*ty)/det;
},







"public function translate",function(dx,dy){
this.tx+=dx;this.ty+=dy;
},







"public function scale",function(sx,sy){
if(sx!=1){
this.a*=sx;
this.c*=sx;
}
if(sy!=1){
this.b*=sy;
this.d*=sy;
}
},






"public function rotate",function(angle){
if(angle!=0){
var cos=Math.cos(angle);
var sin=Math.sin(angle);
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
this.a=a*cos-c*sin;
this.b=a*sin+c*cos;
this.c=b*cos-d*sin;
this.d=b*sin+d*cos;
}
},





"public function toString",function(){
return"("+["a="+this.a,"b="+this.b,"c="+this.c,"d="+this.d,"tx="+this.tx,"ty="+this.ty].join(", ")+")";
},

];},[],["Math","flash.geom.Point"]
);
// class flash.geom.Point
joo.classLoader.prepare("package flash.geom",









"public class Point",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[






"public function Point",function(x,y){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}this[$super]();
this.x=x;
this.y=y;
},





"public function get length",function(){
return Math.sqrt(this.x^2+this.y^2);
},




"public var",{x: undefined},




"public var",{y: undefined},






"public function add",function(v){
return new flash.geom.Point(this.x+v.x,this.y+v.y);
},





"public function clone",function(){
return new flash.geom.Point(this.x,this.y);
},







"public static function distance",function(pt1,pt2){
return Math.sqrt((pt2.x-pt1.x)^2+(pt2.y-pt2.y)^2);
},







"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y;
},












"public static function interpolate",function(pt1,pt2,f){
return 0;
},







"public function normalize",function(thickness){

},







"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},









"public static function polar",function(len,angle){
return null;
},






"public function subtract",function(v){
return new flash.geom.Point(this.x-v.x,this.y-v.y);
},







"public function toString",function(){
return["(x=",this.x,", y=",this.y,")"].join("");
},

];},["distance","interpolate","polar"],["Math"]
);
// class flash.geom.Rectangle
joo.classLoader.prepare("package flash.geom",







"public class Rectangle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},



"public var",{height: undefined},



"public var",{width: undefined},



"public var",{x: undefined},



"public var",{y: undefined},




"public function get topLeft",function(){
return new flash.geom.Point(this.x,this.y);
},

"public function set topLeft",function(topLeft){
this.left=topLeft.x;
this.top=topLeft.y;
},




"public function get bottom",function(){
return this.x+this.height;
},

"public function set bottom",function(value){
this.height=value-this.x;
},





"public function get bottomRight",function(){
return new flash.geom.Point(this.right,this.bottom);
},

"public function set bottomRight",function(bottomRight){
this.right=bottomRight.x;
this.bottom=bottomRight.y;
},




"public function get left",function(){
return this.x+this.width;
},

"public function set left",function(left){
this.width+=this.x-left;
this.x=left;
},




"public function get right",function(){
return this.x+this.width;
},
"public function set right",function(value){
this.width=value-this.x;
},




"public function get size",function(){
return new flash.geom.Point(this.width,this.height);
},

"public function set size",function(value){
this.width=value.x;
this.height=value.y;
},




"public function get top",function(){
return this.y;
},
"public function set top",function(value){
this.height+=this.y-value;
this.y=value;
},




"public function clone",function(){
return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
},




"public function contains",function(x,y){
return this.x<=x&&x<=this.right&&this.y<=y&&y<=this.bottom;
},





"public function containsPoint",function(point){
return this.contains(point.x,point.y);
},




"public function containsRect",function(rect){
return this.containsPoint(rect.topLeft)&&this.containsPoint(rect.bottomRight);
},




"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y&&this.width==toCompare.width&&this.height==toCompare.height;
},




"public function inflate",function(dx,dy){
this.width+=dx;
this.height+=dy;
},




"public function inflatePoint",function(point){
this.inflate(point.x,point.y);
},




"public function intersection",function(toIntersect){
var x=Math.max(this.x,toIntersect.x);
var right=Math.min(this.right,toIntersect.right);
if(x<=right){
var y=Math.max(this.y,toIntersect.y);
var bottom=Math.min(this.bottom,toIntersect.bottom);
if(y<=bottom){
return new flash.geom.Rectangle(x,y,right-x,bottom-y);
}
}
return new flash.geom.Rectangle();
},




"public function intersects",function(toIntersect){
return Math.max(this.x,toIntersect.x)<=Math.min(this.right,toIntersect.right)
&&Math.max(this.y,toIntersect.y)<=Math.min(this.bottom,toIntersect.bottom);
},




"public function isEmpty",function(){
return this.x==0&&this.y==0&&this.width==0&&this.height==0;
},




"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},




"public function offsetPoint",function(point){
this.offset(point.x,point.y);
},





"public function Rectangle",function(x,y,width,height){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}width=0;}height=0;}this[$super]();
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},




"public function setEmpty",function(){
this.x=this.y=this.width=this.height=0;
},




"public function toString",function(){
return"[Rectangle("+[this.x,this.y,this.width,this.height].join(", ")+")]";
},




"public function union",function(toUnion){
var x=Math.min(this.x,toUnion.x);
var y=Math.min(this.y,toUnion.y);
return new flash.geom.Rectangle(x,y,Math.max(this.right,toUnion.right)-x,Math.max(this.bottom-toUnion.bottom)-y);
},
];},[],["flash.geom.Point","Math"]
);
// class flash.geom.ColorTransform
joo.classLoader.prepare("package flash.geom",




"public class ColorTransform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$maps=$$l+'maps';return[function(){joo.classLoader.init(Array);},



"public var",{alphaMultiplier: undefined},




"public var",{alphaOffset: undefined},



"public var",{blueMultiplier: undefined},




"public var",{blueOffset: undefined},



"public var",{greenMultiplier: undefined},




"public var",{greenOffset: undefined},



"public var",{redMultiplier: undefined},




"public var",{redOffset: undefined},




"public function get color",function(){
return this.redOffset<<16|this.greenOffset<<8||this.blueOffset;
},

"public function set color",function(newColor){
this.redOffset=newColor>>16&0xF;
this.greenOffset=newColor>>8&0xF;
this.blueOffset=newColor&0xF;
this.redMultiplier=this.greenMultiplier=this.blueMultiplier=1;
},




"public function ColorTransform",function(redMultiplier,greenMultiplier,blueMultiplier,
alphaMultiplier,
redOffset,greenOffset,blueOffset,
alphaOffset){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){redMultiplier=1;}greenMultiplier=1;}blueMultiplier=1;}alphaMultiplier=1;}redOffset=0;}greenOffset=0;}blueOffset=0;}alphaOffset=0;}this[$super]();
this.redMultiplier=redMultiplier;
this.greenMultiplier=greenMultiplier;
this.blueMultiplier=blueMultiplier;
this.alphaMultiplier=alphaMultiplier;
this.redOffset=redOffset;
this.greenOffset=greenOffset;
this.blueOffset=blueOffset;
this.alphaOffset=alphaOffset;
},






"public function concat",function(second){
this.redMultiplier*=second.redMultiplier;
this.greenMultiplier*=second.greenMultiplier;
this.blueMultiplier*=second.blueMultiplier;
this.alphaMultiplier*=second.alphaMultiplier;
this.redOffset+=second.redOffset;
this.greenOffset+=second.greenOffset;
this.blueOffset+=second.blueOffset;
this.alphaOffset+=second.alphaOffset;
},

"private var",{maps: undefined},

"public function getComponentMaps",function(){
if(!this[$maps]){
var offsets=[this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset];
var multipliers=[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier];
this[$maps]=new Array(4);
for(var c=0;c<4;++c){
var offset=offsets[c];
var multiplier=multipliers[c];
var map;
if(offset==0&&multiplier==1){
map=null;
}else{
map=new Array(256);
for(var b=0;b<256;++b){
var val=offset+multiplier*b;
map[b]=val<=0?0:val<=255?val:255;
}
}
this[$maps][c]=map;
}
}
return this[$maps];
},




"public function toString",function(){
return"[ColorTransform("+[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,
this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset].join(", ")+")]";
},

];},[],["Array"]
);
// class flash.events.NetStatusEvent
joo.classLoader.prepare("package flash.events",


"public class NetStatusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{info: undefined},

"public function NetStatusEvent",function(type,bubbles,cancelable,info)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}info=null;}
this[$super](type,bubbles,cancelable);
this.info=info;
},

"public static const",{NET_STATUS:"netStatus"},

];},[],["flash.events.Event"]

);
// class flash.events.MouseEvent
joo.classLoader.prepare("package flash.events",





"public class MouseEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[


"public static const",{CLICK:"click"},

"public static const",{DOUBLE_CLICK:"doubleClick"},

"public static const",{MOUSE_DOWN:"mouseDown"},

"public static const",{MOUSE_MOVE:"mouseMove"},

"public static const",{MOUSE_OUT:"mouseOut"},

"public static const",{MOUSE_OVER:"mouseOver"},

"public static const",{MOUSE_UP:"mouseUp"},

"public static const",{MOUSE_WHEEL:"mouseWheel"},

"public static const",{ROLL_OUT:"rollOut"},

"public static const",{ROLL_OVER:"rollOver"},


"public var",{altKey: undefined},


"public var",{buttonDown: undefined},


"public var",{ctrlKey: undefined},


"public var",{delta: undefined},


"public var",{localX: undefined},


"public var",{localY: undefined},


"public var",{relatedObject: undefined},


"public var",{shiftKey: undefined},


"public var",{stageX: undefined},


"public var",{stageY: undefined},


"public override function clone",function(){
return new flash.events.MouseEvent(this.type,this.bubbles,this.cancelable,this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta);
},


"public function MouseEvent",function(type,bubbles,cancelable,
localX,localY,relatedObject,
ctrlKey,altKey,shiftKey,
buttonDown,delta){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){type=null;}bubbles=true;}cancelable=false;}localX=NaN;}localY=NaN;}relatedObject=null;}ctrlKey=false;}altKey=false;}shiftKey=false;}buttonDown=false;}delta=0;}
this[$super](type,bubbles,cancelable);
this.localX=localX;
this.localY=localY;
this.relatedObject=relatedObject;
this.ctrlKey=ctrlKey;
this.altKey=altKey;
this.shiftKey=shiftKey;
this.buttonDown=buttonDown;
this.delta=delta;
},


"public override function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase",
"localX","localY","relatedObject","ctrlKey","altKey","shiftKey","buttonDown","delta");
},


"public function updateAfterEvent",function(){

},
];},[],["flash.events.Event"]
);
// class flash.events.ErrorEvent
joo.classLoader.prepare("package flash.events",


"public class ErrorEvent extends flash.events.TextEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{errorID: undefined},

"public static const",{ERROR:"error"},
];},[],["flash.events.TextEvent"]

);
// class flash.events.FocusEvent
joo.classLoader.prepare("package flash.events",


"public class FocusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{isRelatedObjectInaccessible: undefined},
"public var",{keyCode: undefined},
"public var",{relatedObject: undefined},
"public var",{shiftKey: undefined},

"public static const",{FOCUS_IN:"focusIn"},
"public static const",{FOCUS_OUT:"focusOut"},
"public static const",{KEY_FOCUS_CHANGE:"keyFocusChange"},
"public static const",{MOUSE_FOCUS_CHANGE:"mouseFocusChange"},

];},[],["flash.events.Event"]

);
// class flash.events.ContextMenuEvent
joo.classLoader.prepare("package flash.events",


"public class ContextMenuEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{contextMenuOwner: undefined},

"public var",{isMouseTargetInaccessible: undefined},

"public var",{mouseTarget: undefined},

"public function ContextMenuEvent",function(type,bubbles,cancelable,mouseTarget,contextMenuOwner)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}mouseTarget=null;}contextMenuOwner=null;}
this[$super](type,bubbles,cancelable);
this.mouseTarget=mouseTarget;
this.contextMenuOwner=contextMenuOwner;
this.isMouseTargetInaccessible=this.isMouseTargetInaccessible;
},

"public static const",{MENU_ITEM_SELECT:"menuItemSelect"},
"public static const",{MENU_SELECT:"menuSelect"},

];},[],["flash.events.Event"]
);
// class flash.events.EventDispatcher
joo.classLoader.prepare("package flash.events",



















































"public class EventDispatcher extends Object implements flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$captureListeners=$$l+'captureListeners',$listeners=$$l+'listeners',$target=$$l+'target';return[












"public function EventDispatcher",function(target){if(arguments.length<1){target=null;}this[$super]();
this[$target]=target;
this[$captureListeners]={};
this[$listeners]={};
},

"public function dispatchEvent",function(event){
event.target=this[$target]||this;
var listeners=this[$listeners][event.type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i](event)===false){
event.stopPropagation();
event.preventDefault();
}
if(event.isImmediatePropagationStopped()){
return false;
}
}
}
return event.isDefaultPrevented();
},

"public function willTrigger",function(type){
return this.hasEventListener(type);
},

"public function addEventListener",function(type,listener,useCapture,priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
if(listenersByType!=undefined)
{
if(!(type in listenersByType)){
listenersByType[type]=[listener];
}else{
listenersByType[type].push(listener);
}
}
},

"public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
var listeners=listenersByType[type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i]==listener){
if(listeners.length==1){
delete listenersByType[type];
}else{
listeners.splice(i,1);
}
return;
}
}
}
},

"public function hasEventListener",function(type){
if(this[$listeners]!=undefined)
{
return this[$listeners][type]||this[$captureListeners][type];
}
return false;
},

"public function toString",function(){
return["EventDispatcher[target=",this[$target],"]"].join("");
},

"private var",{captureListeners: undefined},
"private var",{listeners: undefined},
"private var",{target: undefined},
];},[],["Object","flash.events.IEventDispatcher"]
);
// class flash.events.IEventDispatcher
joo.classLoader.prepare("package flash.events",


















"public interface IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

,







,














,












,











,


















































,
];},[],[]
);
// class flash.events.Event
joo.classLoader.prepare("package flash.events",
"public class Event extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$defaultPrevented=$$l+'defaultPrevented',$propagationStopped=$$l+'propagationStopped',$immediatePropagationStopped=$$l+'immediatePropagationStopped';return[


"public function Event",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}this[$super]();
this.type=type;
this.bubbles=bubbles;
this.cancelable=cancelable;
},

"public var",{type: undefined},

"public var",{bubbles: undefined},

"public var",{cancelable: undefined},

"public var",{eventPhase: undefined},

"public var",{target: undefined},

"public var",{currentTarget: undefined},

"public function preventDefault",function(){
if(this.cancelable){
this[$defaultPrevented]=true;
}
},

"public function isDefaultPrevented",function(){
return this[$defaultPrevented];
},

"public function formatToString",function(className){var rest=Array.prototype.slice.call(arguments,1);
var sb=["[",className," "];
for(var i=0;i<rest.length;++i){
sb.push(rest[i],"=",this[rest[i]]," ");
}
sb.push("]");
return sb.join("");
},

"public function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase");
},

"public function stopPropagation",function(){
this[$propagationStopped]=true;
},

"public function isPropagationStopped",function(){
return this[$propagationStopped];
},

"public function stopImmediatePropagation",function(){
this[$immediatePropagationStopped]=true;
},

"public function isImmediatePropagationStopped",function(){
return this[$immediatePropagationStopped];
},

"public function clone",function(){
return new flash.events.Event(this.type,this.bubbles,this.cancelable);
},

"static public const",{ENTER_FRAME:"enterFrame"},

"static public const",{ID3:"id3"},
"static public const",{SOUND_COMPLETE:"soundComplete"},
"static public const",{INIT:"init"},
"static public const",{RENDER:"render"},
"static public const",{TAB_ENABLED_CHANGE:"tabEnabledChange"},

"static public const",{ADDED_TO_STAGE:"addedToStage"},
"static public const",{TAB_CHILDREN_CHANGE:"tabChildrenChange"},
"static public const",{RESIZE:"resize"},
"static public const",{CHANGE:"change"},
"static public const",{COMPLETE:"complete"},

"static public const",{FULLSCREEN:"fullScreen"},
"static public const",{REMOVED:"removed"},
"static public const",{CONNECT:"connect"},
"static public const",{SCROLL:"scroll"},
"static public const",{OPEN:"open"},

"static public const",{CLOSE:"close"},
"static public const",{MOUSE_LEAVE:"mouseLeave"},
"static public const",{ADDED:"added"},
"static public const",{TAB_INDEX_CHANGE:"tabIndexChange"},
"static public const",{REMOVED_FROM_STAGE:"removedFromStage"},

"static public const",{ACTIVATE:"activate"},
"static public const",{DEACTIVATE:"deactivate"},
"static public const",{CANCEL:"cancel"},
"static public const",{SELECT:"select"},
"static public const",{UNLOAD:"unload"},

"private var",{defaultPrevented:false},
"private var",{propagationStopped: undefined},
"private var",{immediatePropagationStopped: undefined},
];},[],["Object"]
);
// class flash.events.TimerEvent
joo.classLoader.prepare("package flash.events",



"public class TimerEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[

"public static const",{TIMER:"timer"},
"public static const",{TIMER_COMPLETE:"timerComplete"},

"public function TimerEvent",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}
this[$super](type,bubbles,cancelable);
},

"override public function clone",function(){
return new flash.events.TimerEvent(this.type,this.bubbles,this.cancelable);
},

"override public function toString",function(){
return this.formatToString("TimerEvent","type","bubbles","cancelable");
},

"public function updateAfterEvent",function(){

},
];},[],["flash.events.Event"]
);
// class flash.events.TextEvent
joo.classLoader.prepare("package flash.events",


"public class TextEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{text: undefined},

];},[],["flash.events.Event"]
);
// class flash.events.HTTPStatusEvent
joo.classLoader.prepare("package flash.events",


"public class HTTPStatusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{status: undefined},

"public function HTTPStatusEvent",function(type,bubbles,cancelable,status)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}status=0;}
this[$super](type,bubbles,cancelable);
this.status=status;
},

"public static const",{HTTP_STATUS:"httpStatus"},

];},[],["flash.events.Event"]

);
// class flash.events.IOErrorEvent
joo.classLoader.prepare("package flash.events",


"public class IOErrorEvent extends flash.events.ErrorEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{IO_ERROR:"ioError"},

];},[],["flash.events.ErrorEvent"]

);
// class flash.events.SecurityErrorEvent
joo.classLoader.prepare("package flash.events",


"public class SecurityErrorEvent extends flash.events.ErrorEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{SECURITY_ERROR:"securityError"},

];},[],["flash.events.ErrorEvent"]
);
// class flash.events.ProgressEvent
joo.classLoader.prepare("package flash.events",

"public class ProgressEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{bytesLoaded: undefined},
"public var",{bytesTotal: undefined},

"public static const",{PROGRESS:"progress"},
"public static const",{SOCKET_DATA:"socketData"},
];},[],["flash.events.Event"]
);
// class flash.events.AsyncErrorEvent
joo.classLoader.prepare("package flash.events",


"public class AsyncErrorEvent extends flash.events.ErrorEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{error: undefined},

"public function AsyncErrorEvent",function(type,bubbles,cancelable,text,error)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}text="";}error=null;}
this[$super](type,bubbles,cancelable);
this.text=text;
this.error=error;
},

"public static const",{ASYNC_ERROR:"asyncError"},

];},[],["flash.events.ErrorEvent"]

);
// class flash.errors.IllegalOperationError
joo.classLoader.prepare("package flash.errors",


"public dynamic class IllegalOperationError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[



];},[],["Error"]
);
// class flash.net.NetConnection
joo.classLoader.prepare("package flash.net",



"public class NetConnection extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{client: undefined},
"public var",{connected: undefined},
"public var",{connectedProxyType: undefined},
"public static var",{defaultObjectEncoding: undefined},
"public var",{farID: undefined},
"public var",{farNonce: undefined},
"public var",{maxPeerConnections: undefined},
"public var",{nearID: undefined},
"public var",{nearNonce: undefined},
"public var",{objectEncoding: undefined},
"public var",{protocol: undefined},
"public var",{proxyType: undefined},
"public var",{unconnectedPeerStreams: undefined},
"public var",{uri: undefined},
"public var",{usingTLS: undefined},

"public function addHeader",function(operation,mustUnderstand,param)
{if(arguments.length<3){if(arguments.length<2){mustUnderstand=false;}param=null;}

},

"public function call",function(command,responder)
{var arguments=Array.prototype.slice.call(arguments,2);

},

"public function close",function()
{

},

"public function connect",function(command)
{var arguments=Array.prototype.slice.call(arguments,1);

},



];},[],["flash.events.EventDispatcher"]

);
// class flash.net.URLLoader
joo.classLoader.prepare("package flash.net",




















"public class URLLoader extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$readyStateChanged=$$l+'readyStateChanged',$createEvent=$$l+'createEvent',$xmlHttpRequest=$$l+'xmlHttpRequest';return[function(){joo.classLoader.init(flash.events.Event,js.XMLHttpRequest,Error,flash.net.URLLoaderDataFormat);},




"public var",{bytesLoaded:0},





"public var",{bytesTotal:0},











"public var",{data: undefined},












"public var",{dataFormat:function(){return(flash.net.URLLoaderDataFormat.TEXT);}},







"public function URLLoader",function(request){if(arguments.length<1){request=null;}this[$super]();this.dataFormat=this.dataFormat();
if(request){
this.load(request);
}
},





"public function close",function(){
this[$xmlHttpRequest].abort();
},







































"public function load",function(request){
try{
this[$xmlHttpRequest]=new js.XMLHttpRequest();
}catch(e){if(is(e,Error)){
throw new Error("Your browser does not support XMLHttpRequest: "+e.message);
}else throw e;}
this[$xmlHttpRequest].onreadystatechange=$$bound(this,$readyStateChanged);
this[$xmlHttpRequest].open(request.method,request.url,true);
for(var $1 in request.requestHeaders)
{var h=request.requestHeaders[$1];
this[$xmlHttpRequest].setRequestHeader(h.name,h.value);
}
this[$xmlHttpRequest].setRequestHeader("Content-Type",request.contentType);
this[$xmlHttpRequest].send(request.data);
},

"private function readyStateChanged",function(){
trace("URLLoader: "+this[$xmlHttpRequest].readyState);
if(this[$xmlHttpRequest].readyState==4){
if(this.dataFormat==flash.net.URLLoaderDataFormat.TEXT)
{
this.data=this[$xmlHttpRequest].responseText;
}
else if(this.dataFormat=="xml")
{
this.data=this[$xmlHttpRequest].responseXML;
}
}
var event=this[$createEvent]();
if(event){
this.dispatchEvent(event);
}
},

"private function createEvent",function(){
switch(this[$xmlHttpRequest].readyState){
case 1:return new flash.events.Event(flash.events.Event.OPEN,false,false);
case 4:return new flash.events.Event(flash.events.Event.COMPLETE,false,false);
}
return null;

},
"private var",{xmlHttpRequest: undefined},

];},[],["flash.events.EventDispatcher","flash.net.URLLoaderDataFormat","js.XMLHttpRequest","Error","flash.events.Event"]
);
// class flash.net.URLRequestHeader
joo.classLoader.prepare("package flash.net",














"public class URLRequestHeader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




"public var",{name: undefined},




"public var",{value: undefined},







"public function URLRequestHeader",function(name,value){if(arguments.length<2){if(arguments.length<1){name="";}value="";}this[$super]();
this.name=name;
this.value=value;
},

];},[],[]
);
// class flash.net.URLRequestMethod
joo.classLoader.prepare("package flash.net",







"public class URLRequestMethod",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[




"public static const",{GET:"GET"},




"public static const",{POST:"POST"},

];},[],[]
);
// class flash.net.URLRequest
joo.classLoader.prepare("package flash.net",


























"public class URLRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.net.URLRequestMethod);},








"public function URLRequest",function(url){if(arguments.length<1){url=null;}this[$super]();this.method=this.method();
this.url=url;
},






"public var",{contentType:"application/x-www-form-urlencoded"},




























"public var",{data: undefined},








"public var",{method:function(){return(flash.net.URLRequestMethod.GET);}},












"public var",{requestHeaders: undefined},








"public var",{url: undefined},
];},[],["flash.net.URLRequestMethod"]
);
// class flash.net.Responder
joo.classLoader.prepare("package flash.net",


"public class Responder",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public function Responder",function(result,status)
{if(arguments.length<2){status=null;}this[$super]();

},

];},[],[]
);
// class flash.net.URLLoaderDataFormat
joo.classLoader.prepare("package flash.net",




"public class URLLoaderDataFormat",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[



"public static const",{BINARY:"binary"},




"public static const",{TEXT:"text"},




"public static const",{VARIABLES:"variables"},

];},[],[]
);
// class flash.net.URLVariables
joo.classLoader.prepare("package flash.net",







"public class URLVariables",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[








"public function URLVariables",function(source){if(arguments.length<1){source=null;}this[$super]();

},







"public function decode",function(source){

},





"public function toString",function(){
return"";
},

];},[],[]
);
// class flash.net.registerClassAlias
joo.classLoader.prepare("package flash.net",


"public function registerClassAlias",function(aliasName,classObject)
{


},,[]

);
// class ArgumentError
joo.classLoader.prepare("package",
"public class ArgumentError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function ArgumentError",function(msg,id){if(arguments.length<2){if(arguments.length<1){msg="";}id="";}this[$super]();

this.name="ArgumentError";
this.message="Error #"+id+": Parameter "+msg+" must have a legal value.";
},

];},[],["Error"]
);
// class XML
joo.classLoader.prepare("package",


"public final class XML",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],[]
);
// class XMLList
joo.classLoader.prepare("package",

"public final class XMLList",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],[]
);
