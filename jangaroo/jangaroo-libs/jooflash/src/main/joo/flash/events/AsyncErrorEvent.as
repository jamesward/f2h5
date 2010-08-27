package flash.events
{

public class AsyncErrorEvent extends ErrorEvent
{

  public var error : Error;

  public function AsyncErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "", error:Error = null)
  {
    super(type, bubbles, cancelable);
    this.text = text;
    this.error = error;
  }

  public static const ASYNC_ERROR : String = "asyncError";

}

}
