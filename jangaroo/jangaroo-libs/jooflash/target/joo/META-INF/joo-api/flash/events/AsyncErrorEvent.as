package flash.events
{

public class AsyncErrorEvent extends flash.events.ErrorEvent
{

  public var error : Error;

  public native function AsyncErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "", error:Error = null);

  public static const ASYNC_ERROR : String = "asyncError";

}

}