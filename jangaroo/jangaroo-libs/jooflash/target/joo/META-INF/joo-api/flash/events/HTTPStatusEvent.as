package flash.events
{

public class HTTPStatusEvent extends flash.events.Event
{

  public var status : int;

  public native function HTTPStatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, status:int = 0);

  public static const HTTP_STATUS : String = "httpStatus";

}

}