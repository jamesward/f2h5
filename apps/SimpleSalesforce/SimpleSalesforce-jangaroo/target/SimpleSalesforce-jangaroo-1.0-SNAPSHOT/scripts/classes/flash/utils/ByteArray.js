joo.classLoader.prepare("package flash.utils",/*
{
import flash.net.ObjectEncoding*/

"public class ByteArray extends Array",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.net.ObjectEncoding);},

  "public var",{ bytesAvailable/* : uint*/: undefined},
  "public static var",{ defaultObjectEncoding/* : uint*/ :function(){return( flash.net.ObjectEncoding.AMF3);}},
  "public var",{ endian/* : String*/: undefined},
  "public var",{ length/* : uint*/: undefined},
  "public var",{ objectEncoding/* : uint*/: undefined},
  "public var",{ position/* : uint*/ : 0},

  "public function clear",function clear()/*:void*/
  {
    this.splice(0, this.length);
  },

  "public function compress",function compress(algorithm/*:String*/)/*:void*/
  {
    // todo
  },

  "public function deflate",function deflate()/*:void*/
  {
    // todo
  },

  "public function inflate",function inflate()/*:void*/
  {
    // todo
  },

  "public function uncompress",function uncompress(algorithm/*:String*/)/*:void*/
  {
    // todo
  },

  
  "public function readBoolean",function readBoolean()/*:Boolean*/
  {
    return (this.readByte()) ? true : false;
  },


  "public function readByte",function readByte()/*:int*/
  {
    return this.readUnsignedByte() - 128;
  },

  "public function readBytes",function readBytes(bytes/*:ByteArray*/, offset/*:uint = 0*/, length/*:uint = 0*/)/*:void*/
  {if(arguments.length<3){if(arguments.length<2){offset = 0;}length = 0;}
    if (length == 0)
    {
      length = this.length - this.position;
    }
    bytes.concat(this.slice(offset, offset + length));
  },

  "public function readDouble",function readDouble()/*:Number*/
  {
    var b1/*:int*/ = this.readByte();
    var b2/*:int*/ = this.readByte();
    var b3/*:int*/ = this.readByte();
    var b4/*:int*/ = this.readByte();
    var b5/*:int*/ = this.readByte();
    var b6/*:int*/ = this.readByte();
    var b7/*:int*/ = this.readByte();
    var b8/*:int*/ = this.readByte();

    var sign/*:int*/ = 1 - ((b1 >> 7) << 1); // sign = bit 0
    var exp/*:int*/ = (((b1 << 4) & 0x7FF) | (b2 >> 4)) - 1023; // exponent = bits 1..11

    var sig/*:int*/ = (((b2 & 0xF) << 16) | (b3 << 8) | b4).toString(2) +
              ((b5 >> 7) ? '1' : '0') +
              (((b5 & 0x7F) << 24) | (b6 << 16) | (b7 << 8) | b8).toString(2); // significand = bits 12..63

    sig = parseInt(sig, 2);

    if (sig == 0 && exp == -1023)
    {
      return 0.0;
    }

    return sign * (1.0 + Math.pow(2, -52) * sig) * Math.pow(2, exp);
  },

  "public function readFloat",function readFloat()/*:Number*/
  {
    var b1/*:int*/ = this.readByte();
    var b2/*:int*/ = this.readByte();
    var b3/*:int*/ = this.readByte();
    var b4/*:int*/ = this.readByte();

    var sign/*:int*/ = 1 - ((b1 >> 7) << 1); // sign = bit 0
    var exp/*:int*/ = (((b1 << 1) & 0xFF) | (b2 >> 7)) - 127; // exponent = bits 1..8
    var sig/*:int*/ = ((b2 & 0x7F) << 16) | (b3 << 8) | b4; // significand = bits 9..31
    if (sig == 0 && exp == -127)
    {
      return 0.0;
    }

    return sign * (1 + Math.pow(2, -23) * sig) * Math.pow(2, exp);
  },

  "public function readInt",function readInt()/*:int*/
  {
    var x/*:uint*/ = (this.readByte() << 24) |
            (this.readByte() << 16) |
            (this.readByte() << 8) |
            (this.readByte());

    if (x > int.MAX_VALUE)
    {
      return x - (int.MAX_VALUE * 2);
    }

    return x;
  },

  "public function readMultiByte",function readMultiByte(length/*:uint*/, charSet/*:String*/)/*:String*/
  {
    // todo
    return "";
  },

  "public function readObject",function readObject()/*:**/
  {
    // todo
    return {};
  },

  "public function readShort",function readShort()/*:int*/
  {
    var x = (this.readByte() << 8) |
            (this.readByte());
    return (x >= 32768) ? x - 65536 : x;
  },

  "public function readUnsignedByte",function readUnsignedByte()/*:uint*/
  {
    return this[this.position++] & 0xFF;
  },

  "public function readUnsignedInt",function readUnsignedInt()/*:uint*/
  {
    return (this.readByte() << 24) |
           (this.readByte() << 16) |
           (this.readByte() << 8) |
           (this.readByte());
  },

  "public function readUnsignedShort",function readUnsignedShort()/*:uint*/
  {
    return (this.readByte() << 8) |
           (this.readByte());
  },

  "public function readUTF",function readUTF()/*:String*/
  {
    return this.readUTFBytes(this.readUnsignedShort());
  },

  "public function readUTFBytes",function readUTFBytes(length/*:uint*/)/*:String*/
  {
    var str = "";

    while (length > 0)
    {
      str += String.fromCharCode(this.readUnsignedByte());
      length--;
    }
    return str;
  },


  "public function writeBoolean",function writeBoolean(value/*:Boolean*/)/*:void*/
  {
    if (value)
    {
      this.writeByte(1);
    }
    else
    {
      this.writeByte(0);
    }
  },

  "public function writeByte",function writeByte(value/*:int*/)/*:void*/
  {
    this.push(value & 0xff);
    this.position++;
  },

  "public function writeBytes",function writeBytes(bytes/*:ByteArray*/, offset/*:uint = 0*/, length/*:uint = 0*/)/*:void*/
  {if(arguments.length<3){if(arguments.length<2){offset = 0;}length = 0;}
    // todo
  },

  "public function writeDouble",function writeDouble(value/*:Number*/)/*:void*/
  {
    // todo
  },

  "public function writeFloat",function writeFloat(value/*:Number*/)/*:void*/
  {
    // todo
  },

  "public function writeInt",function writeInt(value/*:int*/)/*:void*/
  {
    var b1/*:int*/ = (value << 24);
    var b2/*:int*/ = (value << 16);
    var b3/*:int*/ = (value << 8);
    var b4/*:int*/ = (value);
    
    this.writeByte(b1);
    this.writeByte(b2);
    this.writeByte(b3);
    this.writeByte(b4);
  },

  "public function writeMultiByte",function writeMultiByte(value/*:String*/, charSet/*:String*/)/*:void*/
  {
    // todo
  },

  "public function writeObject",function writeObject(object/*:**/)/*:void*/
  {
    // todo
  },

  "public function writeShort",function writeShort(value/*:int*/)/*:void*/
  {
    // todo
  },

  "public function writeUnsignedInt",function writeUnsignedInt(value/*:uint*/)/*:void*/
  {
    var b1/*:int*/ = (value << 24);
    var b2/*:int*/ = (value << 16);
    var b3/*:int*/ = (value << 8);
    var b4/*:int*/ = (value);
    
    this.writeByte(b1);
    this.writeByte(b2);
    this.writeByte(b3);
    this.writeByte(b4);
  },

  "public function writeUTF",function writeUTF(value/*:String*/)/*:void*/
  {
    var length/*:int*/ = value.length;

    var b1/*:int*/ = (value << 8);
    var b2/*:int*/ = (value);

    this.writeByte(b1);
    this.writeByte(b2);

    this.writeUTFBytes(value);
  },

  "public function writeUTFBytes",function writeUTFBytes(value/*:String*/)/*:void*/
  {
    for (var i/*:int*/ = 0; i < value.length; i++)
    {
      this.writeByte(value.charCodeAt(i));
    }
  },

];},[],["Array","flash.net.ObjectEncoding","Math","String"]
);