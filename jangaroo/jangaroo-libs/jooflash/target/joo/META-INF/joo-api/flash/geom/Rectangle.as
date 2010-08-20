package flash.geom {

import flash.geom.Point;

/**
 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and
 * by its width and its height.
 */
public class Rectangle {
  /**
   * The height of the rectangle, in pixels.
   */
  public var height : Number;
  /**
   * The width of the rectangle, in pixels.
   */
  public var width : Number;
  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  public var x : Number;
  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  public var y : Number;

  /**
   * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
   */
  public native function get topLeft () : Point;

  public native function set topLeft (topLeft : Point) : void;

  /**
   * The sum of the y and height properties.
   */
  public native function get bottom () : Number;

  public native function set bottom (value:Number) : void;

  /**
   * The location of the Rectangle object's bottom-right corner, determined by the values of the right and
   * bottom properties.
   */
  public native function get bottomRight () : Point;

  public native function set bottomRight (bottomRight : Point) : void;

  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  public native function get left () : Number;

  public native function set left (left : Number) : void;

  /**
   * The sum of the x and width properties.
   */
  public native function get right () : Number;
  public native function set right (value:Number) : void;

  /**
   * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
   */
  public native function get size() : Point;

  public native function set size (value:Point) : void;

  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  public native function get top () : Number;
  public native function set top (value:Number) : void;

  /**
   * Returns a copy of this Rectangle object.
   */
  public native function clone () : Rectangle;

  /**
   * Determines if the specified point is contained within the rectangular region.
   */
  public native function contains (x:Number, y:Number) : Boolean;

  /**
   * Determines if the specified point is contained within the rectangular region defined by this Rectangle
   * object using a Point object as a parameter.
   */
  public native function containsPoint (point:Point) : Boolean;

  /**
   * Determines if the Rectangle object specified by the rect parameter is contained within this Rectangle object.
   */
  public native function containsRect (rect:Rectangle) : Boolean;

  /**
   * Determines if the object specified in the toCompare parameter is equal to this Rectangle object.
   */
  public native function equals (toCompare:Rectangle) : Boolean;

  /**
   * Increases the size of the Rectangle object by the specified amounts, in pixels.
   */
  public native function inflate (dx:Number, dy:Number) : void;

  /**
   * Increases the size of the Rectangle object using a Point object as a parameter.
   */
  public native function inflatePoint (point:Point) : void;

  /**
   * Returns the area of intersection.
   */
  public native function intersection (toIntersect:Rectangle) : Rectangle;

  /**
   * Determines if the object specified in the toIntersect parameter intersects with this Rectangle object.
   */
  public native function intersects (toIntersect:Rectangle) : Boolean;

  /**
   * Determines whether or not this Rectangle object is empty.
   */
  public native function isEmpty () : Boolean;

  /**
   * Adjusts the location of the Rectangle object.
   */
  public native function offset (dx:Number, dy:Number) : void;

  /**
   * Adjusts the location of the Rectangle object using a Point object as a parameter.
   */
  public native function offsetPoint (point:Point) : void;

  /**
   * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the
   * specified width and height.
   */
  public native function Rectangle (x:Number = 0, y:Number = 0, width:Number = 0, height:Number = 0);

  /**
   * Sets all properties to 0.
   */
  public native function setEmpty () : void;

  /**
   * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
   */
  public native function toString () : String;

  /**
   * Adds two rectangles together to create a new Rectangle object.
   */
  public native function union (toUnion:Rectangle) : Rectangle;
}
}