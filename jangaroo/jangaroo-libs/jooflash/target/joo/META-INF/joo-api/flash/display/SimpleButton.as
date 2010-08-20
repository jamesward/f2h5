package flash.display {

//import flash.media.SoundTransform;

/**
 * The SimpleButton class lets you control all instances of button symbols in a SWF file.
 */
public class SimpleButton extends flash.display.InteractiveObject {

  /**
   * Creates a new SimpleButton instance.
   * @param upState (default null) a display object that is used as the visual object for the button "Down" state
   * @param overState
   * @param downState
   * @param hitTestState
   */
  public native function SimpleButton (upState:DisplayObject = null, overState:DisplayObject = null,
                                downState:DisplayObject = null, hitTestState:DisplayObject = null);

  override protected native function getElementName():String;

  /**
   * Specifies a display object that is used as the visual object for the button "Down" state&#8212;the state that the
   * button is in when the user clicks the hitTestState object.
   * @return the display object that is used as the visual object for the button "Down" state
   */
  public native function get downState () : DisplayObject;

  public native function set downState (value:DisplayObject) : void;

  /**
   * A Boolean value that specifies whether a button is enabled.
   * @return whether a button is enabled.
   */
  public native function get enabled () : Boolean;

  public native function set enabled (value:Boolean) : void;

  /// Specifies a display object that is used as the hit testing object for the button.
  public native function get hitTestState () : DisplayObject;

  public native function set hitTestState (value:DisplayObject) : void;

  /// Specifies a display object that is used as the visual object for the button over state &#8212; the state that the button is in when the mouse is positioned over the button.
  public native function get overState () : DisplayObject;

  public native function set overState (value:DisplayObject) : void;

  /// The SoundTransform object assigned to this button.
/*
  public function get soundTransform () : SoundTransform {
    return this._soundTransform;
  }

  public function set soundTransform (sndTransform:SoundTransform) : void {
    this._soundTransform = sndTransform;
  }
*/
  /// Indicates whether other display objects that are SimpleButton or MovieClip objects can receive mouse release events.
  public native function get trackAsMenu () : Boolean;

  public native function set trackAsMenu (value:Boolean) : void;

  /// Specifies a display object that is used as the visual object for the button up state &#8212; the state that the button is in when the mouse is not positioned over the button.
  public native function get upState () : DisplayObject;

  public native function set upState (value:DisplayObject) : void;

  /// A Boolean value that, when set to true, indicates whether Flash Player displays the hand cursor when the mouse rolls over a button.
  public native function get useHandCursor () : Boolean;

  public native function set useHandCursor (value:Boolean) : void;
}
}