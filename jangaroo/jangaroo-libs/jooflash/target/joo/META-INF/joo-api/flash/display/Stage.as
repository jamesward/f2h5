package flash.display {

import js.Element;
import flash.display.DisplayObjectContainer;
import flash.events.TimerEvent;
import flash.utils.Timer;
import flash.events.Event;

/**
 * The Stage class represents the main drawing area. The Stage represents the entire area where Flash� content is shown.
 * <p>The Stage object is not globally accessible. You need to access it through the stage property of a DisplayObject
 * instance.
 * <p>The Stage class has several ancestor classes � DisplayObjectContainer, InteractiveObject, DisplayObject, and
 * EventDispatcher � from which it inherits properties and methods. Many of these properties and methods are either
 * inapplicable to Stage objects, or require security checks when called on a Stage object. The properties and methods
 * that require security checks are documented as part of the Stage class.
 * <p>In addition, the following inherited properties are inapplicable to Stage objects. If you try to set them, an
 * IllegalOperationError is thrown. These properties may always be read, but since they cannot be set, they will always
 * contain default values.
 * <ul>
 *   <li>accessibilityProperties
 *   <li>alpha
 *   <li>blendMode
 *   <li>cacheAsBitmap
 *   <li>contextMenu
 *   <li>filters
 *   <li>focusRect
 *   <li>loaderInfo
 *   <li>mask
 *   <li>mouseEnabled
 *   <li>name
 *   <li>opaqueBackground
 *   <li>rotation
 *   <li>scale9Grid
 *   <li>scaleX
 *   <li>scaleY
 *   <li>scrollRect
 *   <li>tabEnabled
 *   <li>tabIndex
 *   <li>transform
 *   <li>visible
 *   <li>x
 *   <li>y
 * </ul>
 */
public class Stage extends flash.display.DisplayObjectContainer {

  internal static var instance : Stage;

  public native function Stage(id : String);

  override public native function get x() : Number;

  override public native function get y() : Number;

  /// The current height, in pixels, of the Stage.
  public native function get stageHeight () : int;

  public native function set stageHeight (value : int) : void;

  /// Specifies the current width, in pixels, of the Stage.
  public native function get stageWidth () : int;

  public native function set stageWidth (value : int) : void;

  override protected native function createElement():Element;

  /**
   * Gets the frame rate of the stage. The frame rate is defined as frames per second. By default the
   * rate is set to the frame rate of the first SWF file loaded. Valid range for the frame rate is from 0.01 to
   * 1000 frames per second.
   * @throws SecurityError Calling the frameRate property of a Stage object throws an exception for any
   *   caller that is not in the same security sandbox as the Stage owner (the main SWF file). To avoid this, the
   *   Stage owner can grant permission to the domain of the caller by calling the Security.allowDomain() method
   *   or the Security.allowInsecureDomain() method. For more information, see the "Security" chapter in
   *   Programming ActionScript 3.0.
   * @return the frame rate of the stage.
   */
  public native function get frameRate() : Number;

  /**
   * Sets the frame rate of the stage. The frame rate is defined as frames per second. By default the
   * rate is set to the frame rate of the first SWF file loaded. Valid range for the frame rate is from 0.01 to
   * 1000 frames per second.
   * <p>Note: An application might not be able to follow high frame rate settings, either because the target
   * platform is not fast enough or the player is synchronized to the vertical blank timing of the display
   * device (usually 60 Hz on LCD devices). In some cases, a target platform might also choose to lower the
   * maximum frame rate if it anticipates high CPU usage.
   * <p>For content running in Adobe AIR, setting the frameRate property of one Stage object changes the frame
   * rate for all Stage objects (used by different NativeWindow objects).
   * @param value the new frame rate in frames per second.
   */
  public native function set frameRate(value : Number) : void;
}
}