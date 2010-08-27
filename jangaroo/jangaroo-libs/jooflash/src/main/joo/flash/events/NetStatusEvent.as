package flash.events
{

public class NetStatusEvent extends Event
{

  public var info : Object;

  public function NetStatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, info:Object = null)
  {
    super(type, bubbles, cancelable);
    this.info = info;
  }

  public static const NET_STATUS : String = "netStatus";

}

}
