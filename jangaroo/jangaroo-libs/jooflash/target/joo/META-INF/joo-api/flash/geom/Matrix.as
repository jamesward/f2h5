package flash.geom {

/**
 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate
 * space to another.
 */
public class Matrix {

  /**
   * Creates a new two-dimensional Matrix object.
   *
   * @param a
   * @param b
   * @param c
   * @param d
   * @param tx
   * @param ty
   */
  public native function Matrix (a:Number = 1, b:Number = 0, c:Number = 0, d:Number = 1, tx:Number = 0, ty:Number = 0);

  /**
   * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
   */
  public var a : Number;
  /**
   * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
   */
  public var b : Number;
  /**
   * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
   */
  public var c : Number;
  /**
   * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
   */
  public var d : Number;
  /**
   * The distance by which to translate each point along the x axis.
   */
  public var tx : Number;
  /**
   * The distance by which to translate each point along the y axis.
   */
  public var ty : Number;

  /**
   * Returns a new Matrix object that is a copy of the current matrix.
   * @return a new Matrix object that is a copy of the current matrix.
   */
  public native function clone () : Matrix;

  /**
   * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In
   * mathematical terms, concatenating two matrixes is the same as combining them using matrix multiplication.
   * <p>For example, if matrix m1 scales an object by a factor of four, and matrix m2 rotates an object by
   * 1.5707963267949 radians (Math.PI/2), then m1.concat(m2) transforms m1 into a matrix that scales an object
   * by a factor of four and rotates the object by Math.PI/2 radians.
   * <p>This method replaces the source matrix with the concatenated matrix. If you want to concatenate two
   * matrixes without altering either of the two source matrixes, first copy the source matrix by using the
   * clone() method, as shown in the Class Examples section.
   * 
   * @param m The matrix to be concatenated to the source matrix. 
   */
  public native function concat(m : Matrix) : void;

  /**
   * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's
   * values based on those parameters.
   * <p>Using the createBox() method lets you obtain the same matrix as you would if you applied the
   * identity(), scale(), rotate(), and translate() methods in succession. For example,
   * mat1.createBox(2,2,Math.PI/4, 100, 100) has the same effect as the following:
   * <pre>
   *  import flash.geom.Matrix;
   *       var mat1:Matrix = new Matrix();
   *  mat1.identity();
   *  mat1.scale(2,2);
   *  mat1.rotate(Math.PI/4);
   *  mat1.translate(10,20);
   * </pre>
   * @example
   * The following example sets the x scale, y scale, rotation, x location, and y location of myMatrix by
   * calling its createBox() method.
   * <pre>
   * package
   * {
   *     import flash.display.Shape;
   *     import flash.display.Sprite;
   *     import flash.geom.Matrix;
   *     import flash.geom.Transform;
   *     
   *     public class Matrix_createBox extends Sprite
   *     {
   *         public function Matrix_createBox()
   *         {
   *              var myMatrix:Matrix = new Matrix();
   *              trace(myMatrix.toString());  // (a=1, b=0, c=0, d=1, tx=0, ty=0)
   *              
   *              myMatrix.createBox(1, 2, Math.PI/4, 50, 100);
   *              trace(myMatrix.toString());  
   *              // (a=0.7071067811865476, b=1.414213562373095, c=-0.7071067811865475, 
   *              //  d=1.4142135623730951, tx=100, ty=200)
   *              
   *              var rectangleShape:Shape = createRectangle(20, 80, 0xFF0000);   
   *              addChild(rectangleShape);
   *               
   *              var rectangleTrans:Transform = new Transform(rectangleShape);
   *              rectangleTrans.matrix = myMatrix;
   *         }
   *         
   *         public function createRectangle(w:Number, h:Number, color:Number):Shape 
   *         {
   *             var rect:Shape = new Shape();
   *             rect.graphics.beginFill(color);
   *             rect.graphics.drawRect(0, 0, w, h);
   *             addChild(rect);
   *             return rect;
   *         }
   *     }
   * }
   * </pre>
   * 
   * @param scaleX The factor by which to scale horizontally.
   * @param scaleY The factor by which scale vertically.
   * @param rotation (default = 0) The amount to rotate, in radians.
   * @param tx (default = 0) The number of pixels to translate (move) to the right along the x axis.
   * @param ty (default = 0) The number of pixels to translate (move) down along the y axis.
   * @see flash.display.Graphics#beginBitmapFill()
   */
  public native function createBox(scaleX:Number = 1, scaleY:Number = 1, rotation:Number = 0, tx:Number = 0, ty:Number = 0) : void;

  public static const MAGIC_GRADIENT_FACTOR:Number = 16384/10;

  /**
   * Creates the specific style of matrix expected by the beginGradientFill() method of the Graphics class.
   *
   * @param width
   * @param height
   * @param rotation
   * @param tx
   * @param ty
   */
  public native function createGradientBox (width:Number = NaN, height:Number = NaN, rotation:Number = 0, tx:Number = 0, ty:Number = 0) : void;

  /**
   * Returns the result of applying the geometric transformation represented by the Matrix object to the
   * specified point.
   *
   * @param point The point for which you want to get the result of the Matrix transformation. 
   * @return The point resulting from applying the Matrix transformation. 
   */
  public native function transformPoint(point : Point) : Point;

  /**
   * Given a point in the pretransform coordinate space, returns the coordinates of that point after the
   * transformation occurs. Unlike the standard transformation applied using the transformPoint() method, the
   * deltaTransformPoint() method's transformation does not consider the translation parameters tx and ty.
   *
   * @param point The point for which you want to get the result of the matrix transformation.
   * @return The point resulting from applying the matrix transformation.
   */
  public native function deltaTransformPoint(point : Point) : Point;

  /**
   * Sets each matrix property to a value that causes a null transformation.
   */
  public native function identity () : void;

  /**
   * Performs the opposite transformation of the original matrix.
   */
  public native function invert () : void;

  /**
   * A transformation that moves an object along the x and y axes.
   *
   * @param dx
   * @param dy
   */
  public native function translate (dx:Number, dy:Number) : void;

  /**
   * Applies a scaling transformation to the matrix.
   *
   * @param sx
   * @param sy
   */
  public native function scale (sx:Number, sy:Number) : void;

  /**
   * Applies a rotation transformation to the Matrix object.
   *
   * @param angle
   */
  public native function rotate (angle:Number) : void;

  /**
   * Returns a text value listing the properties of this Matrix object.
   * @return
   */
  public native function toString () : String;

}
}