package mx.utils
{

public class RPCObjectUtil
{

  public static native function getClassInfo(obj:Object, excludes:Array = null, options:Object = null):Object;

  public static native function toString(value:Object, namespaceURIs:Array = null, exclude:Array = null):String;

}
}