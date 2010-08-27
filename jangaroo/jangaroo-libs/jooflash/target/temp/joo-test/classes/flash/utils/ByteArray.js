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