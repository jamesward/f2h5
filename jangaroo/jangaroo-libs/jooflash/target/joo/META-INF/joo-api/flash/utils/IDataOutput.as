package flash.utils
{
public interface IDataOutput
{

  public var endian : String;
  public var objectEncoding : uint;

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