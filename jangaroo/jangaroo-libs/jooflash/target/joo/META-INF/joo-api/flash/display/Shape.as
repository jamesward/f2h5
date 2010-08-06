package flash.display {

import js.Element;
import js.HTMLCanvasElement;
import flash.display.DisplayObject;
import flash.display.Graphics;
import flash.display.Stage;
import flash.geom.Transform;
import flash.geom.Matrix;

/**
 * The Shape class is used to create lightweight shapes by using the ActionScript drawing application program interface
 * (API). The Shape class includes a graphics property, which lets you access methods from the Graphics class.
 * <p>The Sprite class also includes a graphicsproperty, and it includes other features not available to the Shape
 * class. For example, a Sprite object is a display object container, whereas a Shape object is not (and cannot contain
 * child display objects). For this reason, Shape objects consume less memory than Sprite objects that contain the same
 * graphics. However, a Sprite object supports mouse click events, while a Shape object does not.
 * @see flash.display.Graphics
 * @see flash.display.Sprite
 */
public class Shape extends flash.display.DisplayObject {

  /**
   * Creates a new Shape object.
   */
  public native function Shape();

  override protected native function createElement() : Element;

  internal static native function createCanvas() : HTMLCanvasElement;

  internal static native function createGraphics(canvas : HTMLCanvasElement) : Graphics;

  /**
   * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
   * @return  the Graphics object belonging to this Shape object
   */
  public native function get graphics() : Graphics;

  override public native function set transform(value:Transform):void;
}
}