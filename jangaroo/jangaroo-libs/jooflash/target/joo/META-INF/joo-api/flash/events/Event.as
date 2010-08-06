package flash.events {
public class Event extends Object
{

  public native function Event(type : String, bubbles : Boolean = false, cancelable : Boolean = false);

  public var type : String;

  public var bubbles : Boolean;

  public var cancelable : Boolean;

  public var eventPhase : uint;

  public var target : Object;

  public var currentTarget : Object;

  public native function preventDefault() : void;

  public native function isDefaultPrevented() : Boolean;

  public native function formatToString(className : String, ... rest) : String;

  public native function toString():String;

  public native function stopPropagation() : void;

  public native function isPropagationStopped() : Boolean;

  public native function stopImmediatePropagation() : void;

  public native function isImmediatePropagationStopped() : Boolean;

  public native function clone() : Event;

  static public const ENTER_FRAME:String = "enterFrame";

  static public const ID3:String = "id3";
  static public const SOUND_COMPLETE:String = "soundComplete";
  static public const INIT:String = "init";
  static public const RENDER:String = "render";
  static public const TAB_ENABLED_CHANGE:String = "tabEnabledChange";

  static public const ADDED_TO_STAGE:String = "addedToStage";
  static public const TAB_CHILDREN_CHANGE:String = "tabChildrenChange";
  static public const RESIZE:String = "resize";
  static public const CHANGE:String = "change";
  static public const COMPLETE:String = "complete";

  static public const FULLSCREEN:String = "fullScreen";
  static public const REMOVED:String = "removed";
  static public const CONNECT:String = "connect";
  static public const SCROLL:String = "scroll";
  static public const OPEN:String = "open";

  static public const CLOSE:String = "close";
  static public const MOUSE_LEAVE:String = "mouseLeave";
  static public const ADDED:String = "added";
  static public const TAB_INDEX_CHANGE:String = "tabIndexChange";
  static public const REMOVED_FROM_STAGE:String = "removedFromStage";

  static public const ACTIVATE:String = "activate";
  static public const DEACTIVATE:String = "deactivate";
  static public const CANCEL:String = "cancel";
  static public const SELECT:String = "select";
  static public const UNLOAD:String = "unload";
}
}