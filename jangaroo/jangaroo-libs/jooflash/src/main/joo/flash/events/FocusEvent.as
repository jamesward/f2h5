package flash.events
{

public class FocusEvent extends Event
{

  public var isRelatedObjectInaccessible : Boolean;
  public var keyCode : uint;
  public var relatedObject : InteractiveObject;
  public var shiftKey : Boolean;

  public static const FOCUS_IN : String = "focusIn";
  public static const FOCUS_OUT : String = "focusOut";
  public static const KEY_FOCUS_CHANGE : String = "keyFocusChange";
  public static const MOUSE_FOCUS_CHANGE : String = "mouseFocusChange";

}

}
