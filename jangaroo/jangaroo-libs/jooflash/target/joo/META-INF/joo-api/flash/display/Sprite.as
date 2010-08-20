package flash.display {
import js.CanvasRenderingContext2D;
import js.Element;
import js.HTMLCanvasElement;
import flash.geom.Transform;
import flash.geom.Matrix;

/**
 * The Sprite class is a basic display list building block: a display list node that can display graphics and can also
 * contain children.
 * A Sprite object is similar to a movie clip, but does not have a timeline. Sprite is an appropriate base class for
 * objects that do not require timelines. For example, Sprite would be a logical base class for user interface (UI)
 * components that typically do not use the timeline.
 * The Sprite class is new in ActionScript 3.0. It provides an alternative to the functionality of the MovieClip class,
 * which retains all the functionality of previous ActionScript releases to provide backward compatibility.
 */
public class Sprite extends flash.display.DisplayObjectContainer {

  public var buttonMode:Boolean;
  public var useHandCursor:Boolean;

  /**
   * Creates a new Sprite instance. After you create the Sprite instance, call the
   * <code>DisplayObjectContainer.addChild()</code> or <code>DisplayObjectContainer.addChildAt()</code>
   * method to add the Sprite to a parent DisplayObjectContainer. 
   * @see flash.display.DisplayObjectContainer#addChildAt()
   */
  public native function Sprite();

  /**
   * Specifies the Graphics object that belongs to this sprite where vector drawing commands can occur.
   * <p><b>Example</b></p>
   * The following example creates a circle sprite and uses its graphics property to draw a circle with a yellow
   * (0xFFCC00) fill:
   * <code>
   * import flash.display.Sprite;
   * 
   * var circle:Sprite = new Sprite();
   * circle.graphics.beginFill(0xFFCC00);
   * circle.graphics.drawCircle(40, 40, 40);
   * addChild(circle);
   * </code>
   * @return the Graphics object that belongs to this sprite where vector drawing commands can occur.
   */
  public native function get graphics() : Graphics;

  override public native function set transform(value:Transform):void;
}
}