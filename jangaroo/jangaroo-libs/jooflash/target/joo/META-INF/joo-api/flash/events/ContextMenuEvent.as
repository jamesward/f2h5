package flash.events
{

public class ContextMenuEvent extends flash.events.Event
{

  public var contextMenuOwner : InteractiveObject;

  public var isMouseTargetInaccessible : Boolean;
 
  public var mouseTarget : InteractiveObject;

  public native function ContextMenuEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, mouseTarget:InteractiveObject = null, contextMenuOwner:InteractiveObject = null);

  public static const MENU_ITEM_SELECT : String = "menuItemSelect";
  public static const MENU_SELECT : String = "menuSelect";

}
}