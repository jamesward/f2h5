package flash.events
{

public class NetStatusEvent extends flash.events.Event
{

  public var info : Object;

  public native function NetStatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, info:Object = null);

  public static const NET_STATUS : String = "netStatus";

}

}