package flash.events
{

public class HTTPStatusEvent extends Event
{

  public var status : int;

  public function HTTPStatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, status:int = 0)
  {
    super(type, bubbles, cancelable);
    this.status = status;
  }

  public static const HTTP_STATUS : String = "httpStatus";

}

}
