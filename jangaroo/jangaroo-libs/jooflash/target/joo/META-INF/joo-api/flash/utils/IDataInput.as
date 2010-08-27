package flash.utils
{

public interface IDataInput
{

  public var bytesAvailable : uint;
  public var endian : String;
  public var objectEncoding : uint;

  public native function readBoolean():Boolean;
  public native function readByte():int;
  public native function readBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void;
  public native function readDouble():Number;
  public native function readFloat():Number;
  public native function readInt():int;
  public native function readMultiByte(length:uint, charSet:String):String;
  public native function readObject():*;
  public native function readShort():int;
  public native function readUnsignedByte():uint;
  public native function readUnsignedInt():uint;
  public native function readUnsignedShort():uint;
  public native function readUTF():String;
  public native function readUTFBytes(length:uint):String;
}
}