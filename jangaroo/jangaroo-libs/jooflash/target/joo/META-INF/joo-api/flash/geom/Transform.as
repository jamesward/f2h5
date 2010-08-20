package flash.geom {

import flash.geom.Rectangle;
import flash.display.DisplayObject;
import flash.display.Shape;

/**
 * The Transform class provides access to color adjustment properties and two- or three-dimensional
 * transformation objects that can be applied to a display object.
 */
public class Transform {

  public native function Transform (displayObject : DisplayObject);

  /**
   * A ColorTransform object containing values that universally adjust the colors in the display object.
   * @return
   */
  public native function get colorTransform () : ColorTransform;

  public native function set colorTransform (value : ColorTransform) : void;

  /**
   * A ColorTransform object representing the combined color transformations applied to the display object
   * and all of its parent objects, back to the root level.
   * @return
   */
  public native function get concatenatedColorTransform () : ColorTransform;

  /**
   * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.
   * @return
   */
  public native function get matrix () : Matrix;
  public native function set matrix (value:Matrix) : void;

  /**
   * A Matrix object representing the combined transformation matrixes of the display object and all of its
   * parent objects, back to the root level.
   * @return
   */
  public native function get concatenatedMatrix () : Matrix;

  /**
   * A Rectangle object that defines the bounding rectangle of the display object on the stage.
   * @return
   */
  public native function get pixelBounds () : Rectangle;

}
}