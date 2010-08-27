package flash.utils
{
import flash.net.ObjectEncoding;

public class ByteArray extends Array
{
  public var bytesAvailable : uint;
  public static var defaultObjectEncoding : uint = flash.net.ObjectEncoding.AMF3;
  public var endian : String;
  public var length : uint;
  public var objectEncoding : uint;
  public var position : uint = 0;

  public native function clear():void;

  public native function compress(algorithm:String):void;

  public native function deflate():void;

  public native function inflate():void;

  public native function uncompress(algorithm:String):void;

  
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


  public native function writeBoolean(value:Boolean):void;

  public native function writeByte(value:int):void;

  public native function writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void;

  public native function writeDouble(value:Number):void;

  public native function writeFloat(value:Number):void;

  public native function writeInt(value:int):void;

  public native function writeMultiByte(value:String, charSet:String):void;

  public native function writeObject(object:*):void;

  public native function writeShort(value:int):void;

  public native function writeUnsignedInt(value:uint):void;

  public native function writeUTF(value:String):void;

  public native function writeUTFBytes(value:String):void;

}
}