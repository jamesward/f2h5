package flash.events
{
public class ProgressEvent extends Event
{
  public var bytesLoaded : Number;
  public var bytesTotal : Number;

  public static const PROGRESS : String = "progress";
  public static const SOCKET_DATA : String = "socketData";
}
}
