package flash.ui
{

public final class Mouse
{
  public static var cursor : String;
  public static var supportsCursor : Boolean;

  public static native function hide():void;
  
  public static native function show():void;
}
}