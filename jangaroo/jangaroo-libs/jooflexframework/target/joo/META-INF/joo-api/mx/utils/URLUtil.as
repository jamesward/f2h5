package mx.utils
{

public class URLUtil
{

  public static native function getProtocol(url:String):String;

  public static native function getServerNameWithPort(url:String):String;

  public static native function getServerName(url:String):String;

}

}