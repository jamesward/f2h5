package flash.events
{

public class ContextMenuEvent extends Event
{

  public var contextMenuOwner : InteractiveObject;

  public var isMouseTargetInaccessible : Boolean;
 
  public var mouseTarget : InteractiveObject;

  public function ContextMenuEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, mouseTarget:InteractiveObject = null, contextMenuOwner:InteractiveObject = null)
  {
    super(type, bubbles, cancelable);
    this.mouseTarget = mouseTarget;
    this.contextMenuOwner = contextMenuOwner;
    this.isMouseTargetInaccessible = isMouseTargetInaccessible;
  }

  public static const MENU_ITEM_SELECT : String = "menuItemSelect";
  public static const MENU_SELECT : String = "menuSelect";

}
}
