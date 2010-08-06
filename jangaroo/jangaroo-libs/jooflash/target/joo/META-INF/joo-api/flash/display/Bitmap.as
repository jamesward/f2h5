package flash.display {

import js.Element;
import flash.display.DisplayObject;

public class Bitmap extends flash.display.DisplayObject {

  /**
   * Initializes a Bitmap object to refer to the specified BitmapData object.
   *
   * @param bitmapData (default = null) The BitmapData object being referenced.
   * @param pixelSnapping (default = "auto") Whether or not the Bitmap object is snapped to the nearest pixel.
   * @param smoothing (default = false) Whether or not the bitmap is smoothed when scaled.
   */
  public native function Bitmap(bitmapData : BitmapData = null, pixelSnapping : String = "auto", smoothing : Boolean = false);

  override protected native function createElement() : Element;

  /**
   * The BitmapData object being referenced.
   * @return the BitmapData object being referenced.
   */
  public native function get bitmapData() : BitmapData;

  public native function set bitmapData(value : BitmapData) : void;

  /**
   * Returns whether or not the Bitmap object is snapped to the nearest pixel. The PixelSnapping class includes
   * possible values:
   * <ul>
   *   <li>PixelSnapping.NEVER�No pixel snapping occurs.
   *   <li>PixelSnapping.ALWAYS�The image is always snapped to the nearest pixel, independent of transformation.
   *   <li>PixelSnapping.AUTO�The image is snapped to the nearest pixel if it is drawn with no rotation or skew and it
   *       is drawn at a scale factor of 99.9% to 100.1%. If these conditions are satisfied, the bitmap image is drawn
   *       at 100% scale, snapped to the nearest pixel. Internally, this value allows the image to be drawn as fast as
   *       possible using the vector renderer.
   * </ul>
   * @return whether or not the Bitmap object is snapped to the nearest pixel.
   */
  public native function get pixelSnapping() : String;

  /**
   * Controls whether or not the Bitmap object is snapped to the nearest pixel. The PixelSnapping class includes
   * possible values:
   * <ul>
   *   <li>PixelSnapping.NEVER�No pixel snapping occurs.
   *   <li>PixelSnapping.ALWAYS�The image is always snapped to the nearest pixel, independent of transformation.
   *   <li>PixelSnapping.AUTO�The image is snapped to the nearest pixel if it is drawn with no rotation or skew and it
   *       is drawn at a scale factor of 99.9% to 100.1%. If these conditions are satisfied, the bitmap image is drawn
   *       at 100% scale, snapped to the nearest pixel. Internally, this value allows the image to be drawn as fast as
   *       possible using the vector renderer.
   * </ul>
   * @return whether or not the Bitmap object is snapped to the nearest pixel.
   */
  public native function set pixelSnapping(value : String) : void;

  /**
   * Returns whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   * @return whether or not the bitmap is smoothed when scaled.
   */
  public native function get smoothing():Boolean;

  /**
   * Controls whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   */
  public native function set smoothing(value : Boolean) : void;

}
}