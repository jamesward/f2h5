package mx.utils
{
import flash.utils.ByteArray;

public class RPCUIDUtil
{

  public static native function createUID():String;

  public static native function fromByteArray(ba:ByteArray):String;

  public static native function toByteArray(uid:String):ByteArray;

}

}