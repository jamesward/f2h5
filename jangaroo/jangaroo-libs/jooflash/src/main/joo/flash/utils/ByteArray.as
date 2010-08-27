package flash.utils
{
import flash.net.ObjectEncoding;

public class ByteArray extends Array
{
  public var bytesAvailable : uint;
  public static var defaultObjectEncoding : uint = ObjectEncoding.AMF3;
  public var endian : String;
  public var length : uint;
  public var objectEncoding : uint;
  public var position : uint = 0;

  public function clear():void
  {
    splice(0, length);
  }

  public function compress(algorithm:String):void
  {
    // todo
  }

  public function deflate():void
  {
    // todo
  }

  public function inflate():void
  {
    // todo
  }

  public function uncompress(algorithm:String):void
  {
    // todo
  }

  
  public function readBoolean():Boolean
  {
    return (readByte()) ? true : false;
  }


  public function readByte():int
  {
    return readUnsignedByte() - 128;
  }

  public function readBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
  {
    if (length == 0)
    {
      length = this.length - position;
    }
    bytes.concat(slice(offset, offset + length));
  }

  public function readDouble():Number
  {
    var b1:int = this.readByte();
    var b2:int = this.readByte();
    var b3:int = this.readByte();
    var b4:int = this.readByte();
    var b5:int = this.readByte();
    var b6:int = this.readByte();
    var b7:int = this.readByte();
    var b8:int = this.readByte();

    var sign:int = 1 - ((b1 >> 7) << 1); // sign = bit 0
    var exp:int = (((b1 << 4) & 0x7FF) | (b2 >> 4)) - 1023; // exponent = bits 1..11

    var sig:int = (((b2 & 0xF) << 16) | (b3 << 8) | b4).toString(2) +
              ((b5 >> 7) ? '1' : '0') +
              (((b5 & 0x7F) << 24) | (b6 << 16) | (b7 << 8) | b8).toString(2); // significand = bits 12..63

    sig = parseInt(sig, 2);

    if (sig == 0 && exp == -1023)
    {
      return 0.0;
    }

    return sign * (1.0 + Math.pow(2, -52) * sig) * Math.pow(2, exp);
  }

  public function readFloat():Number
  {
    var b1:int = readByte();
    var b2:int = readByte();
    var b3:int = readByte();
    var b4:int = readByte();

    var sign:int = 1 - ((b1 >> 7) << 1); // sign = bit 0
    var exp:int = (((b1 << 1) & 0xFF) | (b2 >> 7)) - 127; // exponent = bits 1..8
    var sig:int = ((b2 & 0x7F) << 16) | (b3 << 8) | b4; // significand = bits 9..31
    if (sig == 0 && exp == -127)
    {
      return 0.0;
    }

    return sign * (1 + Math.pow(2, -23) * sig) * Math.pow(2, exp);
  }

  public function readInt():int
  {
    var x:uint = (readByte() << 24) |
            (readByte() << 16) |
            (readByte() << 8) |
            (readByte());

    if (x > int.MAX_VALUE)
    {
      return x - (int.MAX_VALUE * 2);
    }

    return x;
  }

  public function readMultiByte(length:uint, charSet:String):String
  {
    // todo
    return "";
  }

  public function readObject():*
  {
    // todo
    return {};
  }

  public function readShort():int
  {
    var x = (readByte() << 8) |
            (readByte());
    return (x >= 32768) ? x - 65536 : x;
  }

  public function readUnsignedByte():uint
  {
    return this[position++] & 0xFF;
  }

  public function readUnsignedInt():uint
  {
    return (readByte() << 24) |
           (readByte() << 16) |
           (readByte() << 8) |
           (readByte());
  }

  public function readUnsignedShort():uint
  {
    return (readByte() << 8) |
           (readByte());
  }

  public function readUTF():String
  {
    return readUTFBytes(readUnsignedShort());
  }

  public function readUTFBytes(length:uint):String
  {
    var str = "";

    while (length > 0)
    {
      str += String.fromCharCode(readUnsignedByte());
      length--;
    }
    return str;
  }


  public function writeBoolean(value:Boolean):void
  {
    if (value)
    {
      writeByte(1);
    }
    else
    {
      writeByte(0);
    }
  }

  public function writeByte(value:int):void
  {
    push(value & 0xff);
    position++;
  }

  public function writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
  {
    // todo
  }

  public function writeDouble(value:Number):void
  {
    // todo
  }

  public function writeFloat(value:Number):void
  {
    // todo
  }

  public function writeInt(value:int):void
  {
    var b1:int = (value << 24);
    var b2:int = (value << 16);
    var b3:int = (value << 8);
    var b4:int = (value);
    
    writeByte(b1);
    writeByte(b2);
    writeByte(b3);
    writeByte(b4);
  }

  public function writeMultiByte(value:String, charSet:String):void
  {
    // todo
  }

  public function writeObject(object:*):void
  {
    // todo
  }

  public function writeShort(value:int):void
  {
    // todo
  }

  public function writeUnsignedInt(value:uint):void
  {
    var b1:int = (value << 24);
    var b2:int = (value << 16);
    var b3:int = (value << 8);
    var b4:int = (value);
    
    writeByte(b1);
    writeByte(b2);
    writeByte(b3);
    writeByte(b4);
  }

  public function writeUTF(value:String):void
  {
    var length:int = value.length;

    var b1:int = (value << 8);
    var b2:int = (value);

    writeByte(b1);
    writeByte(b2);

    writeUTFBytes(value);
  }

  public function writeUTFBytes(value:String):void
  {
    for (var i:int = 0; i < value.length; i++)
    {
      writeByte(value.charCodeAt(i));
    }
  }

}
}
