package flash.display {

import flash.geom.Matrix;
import flash.geom.Point;

import js.CanvasGradient;
import js.CanvasRenderingContext2D;

public class Graphics {

  public native function Graphics(context : CanvasRenderingContext2D);

  internal native function get renderingContext() : CanvasRenderingContext2D;

  /**
   * Specifies a line style to be used for subsequent calls to Graphics methods such as the lineTo() method or the
   * drawCircle() method. The line style remains in effect until you call the lineGradientStyle() method, the
   * lineBitmapStyle() method, or the lineStyle() method with different parameters.
   * <p>You can call the lineStyle() method in the middle of drawing a path to specify different styles for different
   * line segments within the path.
   * <p>Note: Calls to the clear() method set the line style back to undefined.
   * <p>Please see the lineTo() or moveTo() method's example for illustrations of how to use the getStyle() method.
   * 
   * @param thickness (default = NaN) An integer that indicates the thickness of the line in points;
   *   valid values are 0 to 255. If a number is not specified, or if the parameter is undefined, a line is not drawn.
   *   If a value of less than 0 is passed, the default is 0. The value 0 indicates hairline thickness; the maximum
   *   thickness is 255. If a value greater than 255 is passed, the default is 255.
   * @param color (default = 0) A hexadecimal color value of the line; for example, red is 0xFF0000, blue is 0x0000FF,
   *   and so on. If a value is not indicated, the default is 0x000000 (black). Optional.
   * @param alpha (default = 1.0) A number that indicates the alpha value of the color of the line;
   *   valid values are 0 to 1. If a value is not indicated, the default is 1 (solid).
   *   If the value is less than 0, the default is 0. If the value is greater than 1, the default is 1.
   * @param pixelHinting (default = false) A Boolean value that specifies whether to hint strokes to full pixels.
   *   This affects both the position of anchors of a curve and the line stroke size itself. With pixelHinting set to
   *   true, line widths are hinted to full pixel widths. With pixelHinting set to false, disjoints can appear for
   *   curves and straight lines. For example, the following illustrations show how two rounded rectangles that are
   *   identical are rendered, except that the pixelHinting parameter used in the lineStyle() method is set differently
   *   (the images are scaled by 200%, to emphasize the difference):
   *    <img src="http://injun.ru/flash10api/images/lineStyle_pixelHinting.jpg" />
   *   <p>If a value is not supplied, the line does not use pixel hinting.
   * @param scaleMode (default = "normal") A value from the LineScaleMode class that specifies which scale mode to use:
   *   <ul>
   *   <li>LineScaleMode.NORMAL�Always scale the line thickness when the object is scaled (the default).
   *   <li>LineScaleMode.NONE�Never scale the line thickness.
   *   <li>LineScaleMode.VERTICAL�Do not scale the line thickness if the object is scaled vertically only. For example,
   *     consider the following circles, drawn with a one-pixel line, and each with the scaleMode parameter set to
   *     LineScaleMode.VERTICAL. The circle on the left is scaled vertically only, and the circle on the right is scaled
   *     both vertically and horizontally:
   *     <img src="http://injun.ru/flash10api/images/LineScaleMode_VERTICAL.jpg" />
   *   <li>LineScaleMode.HORIZONTAL�Do not scale the line thickness if the object is scaled horizontally only. For
   *     example, consider the following circles, drawn with a one-pixel line, and each with the scaleMode parameter set
   *     to LineScaleMode.HORIZONTAL. The circle on the left is scaled horizontally only, and the circle on the right is
   *     scaled both vertically and horizontally:
   *     <img src="http://injun.ru/flash10api/images/LineScaleMode_HORIZONTAL.jpg" />
   *   </ul>
   * @param caps (default = null) A value from the CapsStyle class that specifies the type of caps at the end of lines.
   *   Valid values are: CapsStyle.NONE, CapsStyle.ROUND, and CapsStyle.SQUARE. If a value is not indicated, round caps
   *   are used.
   *   For example, the following illustrations show the different capsStyle settings. For each setting, the
   *   illustration shows a blue line with a thickness of 30 (for which the capsStyle applies), and a superimposed
   *   black line with a thickness of 1 (for which no capsStyle applies):
   * @param joints (default = null) A value from the JointStyle class that specifies the type of joint appearance used
   *   at angles. Valid values are: JointStyle.BEVEL, JointStyle.MITER, and JointStyle.ROUND. If a value is not
   *   indicated, round joints are used.
   *   For example, the following illustrations show the different joints settings. For each setting, the illustration
   *   shows an angled blue line with a thickness of 30 (for which the jointStyle applies), and a superimposed angled
   *   black line with a thickness of 1 (for which no jointStyle applies).
   *   Note: For joints set to JointStyle.MITER, you can use the miterLimit parameter to limit the length of the miter.
   * @param miterLimit (default = 3) A number that indicates the limit at which a miter is cut off. Valid values range
   *   from 1 to 255 (and values outside of that range are rounded to 1 or 255). This value is only used if the
   *   jointStyle is set to "miter". The miterLimit value represents the length that a miter can extend beyond the
   *   point at which the lines meet to form a joint. The value expresses a factor of the line thickness. For example,
   *   with a miterLimit factor of 2.5 and a thickness of 10 pixels, the miter is cut off at 25 pixels.
   *   For example, consider the following angled lines, each drawn with a thickness of 20, but with miterLimit set to
   *   1, 2, and 4. Superimposed are black reference lines showing the meeting points of the joints.
   *   Notice that a given miterLimit value has a specific maximum angle for which the miter is cut off. The following
   *   table lists some examples:
   *   <table>
   *     <tr><th>miterLimit value:</th><th>Angles smaller than this are cut off:</th></tr>
   *     <tr><td>1.414</td><td>90 degrees</td></tr>
   *     <tr><td>2</td><td>60 degrees</td></tr>
   *     <tr><td>4</td><td>30 degrees</td></tr>
   *     <tr><td>8</td><td>15 degrees</td></tr>
   *   </table>
   * @see #lineBitmapStyle
   * @see #lineGradientStyle
   * @see LineScaleMode
   * @see CapsStyle
   * @see JointStyle
   */
  public native function lineStyle(thickness : Number = NaN, color : uint = 0, alpha : Number = 1.0,
                            pixelHinting : Boolean = false, scaleMode : String = "normal" /*LineScaleMode.NORMAL*/,
                            caps : String = null,
                            joints : String = null, miterLimit : Number = 3) : void;

  /**
   * Specifies a gradient to use for the stroke when drawing lines.
   * <p>The gradient line style is used for subsequent calls to Graphics methods such as the lineTo() methods
   * or the drawCircle() method. The line style remains in effect until you call the lineStyle() or
   * lineBitmapStyle() methods, or the lineGradientStyle() method again with different parameters.
   * You can call the lineGradientStyle() method in the middle of drawing a path to specify different styles
   * for different line segments within a path.
   * Call the lineStyle() method before you call the lineGradientStyle() method to enable a stroke, or else
   * the value of the line style is undefined.
   * Calls to the clear() method set the line style back to undefined.
   * @example
   * The following example draws a rectangle and a circle that use a gradient stroke from red to green to blue.
   * <p>The method createGradientBox() from the Matrix class is used to define the gradient box to 200 width
   * and 40 height. The thickness of line is set to 5 pixels. Thickness of the stroke must be defined for
   * lineGradientStyle() method. The gradient is set to linear. Colors for the gradient are set to red, green,
   * and blue. Transparency (alpha value) for the colors is set to 1 (opaque). The distribution of gradient is
   * even, where the colors are sampled at 100% at 0 (left-hand position in the gradient box), 128 (middle in
   * the box) and 255 (right-hand position in the box). The width of the rectangle encompasses all the spectrum
   * of the gradient, while the circle encompasses 50% from the middle of the spectrum.
   * <pre>
   * package {
   *     import flash.display.Sprite;
   *     import flash.display.Shape;
   *     import flash.geom.Matrix; 
   *     import flash.display.GradientType;
   *     
   *     public class Graphics_lineGradientStyleExample extends Sprite
   *     {
   *         public function Graphics_lineGradientStyleExample()
   *         {
   *             var myShape:Shape = new Shape();
   *             var gradientBoxMatrix:Matrix = new Matrix();
   *   
   *             gradientBoxMatrix.createGradientBox(200, 40, 0, 0, 0);  
   *             
   *             myShape.graphics.lineStyle(5);
   *   
   *             myShape.graphics.lineGradientStyle(GradientType.LINEAR, [0xFF0000,
   *             0x00FF00, 0x0000FF], [1, 1, 1], [0, 128, 255], gradientBoxMatrix);
   *             
   *             myShape.graphics.drawRect(0, 0, 200, 40);
   *             myShape.graphics.drawCircle(100, 120, 50);  
   *              
   *             this.addChild(myShape);
   *     
   *         }
   *     }
   * }
   * </pre>
   *
   * @param type A value from the GradientType class that specifies which gradient type to use, either
   *   GradientType.LINEAR or GradientType.RADIAL.
   * @param colors An array of RGB hex color values to be used in the gradient (for example, red is 0xFF0000,
   *   blue is 0x0000FF, and so on).
   * @param alphas An array of alpha values for the corresponding colors in the colors array; valid values are 0
   *   to 1. If the value is less than 0, the default is 0. If the value is greater than 1, the default is 1.
   * @param ratios An array of color distribution ratios; valid values are from 0 to 255. This value defines
   *   the percentage of the width where the color is sampled at 100%. The value 0 represents the left position in
   *   the gradient box, and 255 represents the right position in the gradient box. This value represents
   *   positions in the gradient box, not the coordinate space of the final gradient, which can be wider or
   *   thinner than the gradient box. Specify a value for each value in the colors parameter.
   *   <p>For example, for a linear gradient that includes two colors, blue and green, the following figure
   *   illustrates the placement of the colors in the gradient based on different values in the ratios array:
   *   <table>
   *     <tr><th>ratios</th><th>Gradient</th></tr>
   *     <tr><td>[0, 127]</td><td>linear gradient blue to green with ratios 0 and 127</td></tr>
   *     <tr><td>[0, 255]</td><td>linear gradient blue to green with ratios 0 and 255</td></tr>
   *     <tr><td>[127, 255]</td><td>linear gradient blue to green with ratios 127 and 255</td></tr>
   *   </table>
   *   The values in the array must increase, sequentially; for example, [0, 63, 127, 190, 255].
   * @param matrix (default = null) A transformation matrix as defined by the flash.geom.Matrix class. The
   *   flash.geom.Matrix class includes a createGradientBox() method, which lets you conveniently set up the
   *   matrix for use with the lineGradientStyle() method.
   * @param spreadMethod (default = "pad") A value from the SpreadMethod class that specifies which spread
   * method to use:
   * linear gradient with SpreadMethod.PAD
   * linear gradient with SpreadMethod.REFLECT
   * linear gradient with SpreadMethod.REPEAT
   * @param interpolationMethod (default = "rgb") A value from the InterpolationMethod class that specifies
   * which value to use. For example, consider a simple linear gradient between two colors (with the
   * spreadMethod parameter set to SpreadMethod.REFLECT). The different interpolation methods affect the
   * appearance as follows:
   * linear gradient with InterpolationMethod.LINEAR_RGB
   * linear gradient with InterpolationMethod.RGB
   * @param focalPointRatio (default = 0) A number that controls the location of the focal point of the
   *   gradient. The value 0 means the focal point is in the center. The value 1 means the focal point is at one
   *   border of the gradient circle. The value -1 means that the focal point is at the other border of the
   *   gradient circle. Values less than -1 or greater than 1 are rounded to -1 or 1. The following image shows a
   *   gradient with a focalPointRatio of -0.75:
   *   radial gradient with focalPointRatio set to 0.75
   * @see #lineStyle()
   * @see #lineBitmapStyle()
   * @see flash.geom.Matrix#createGradientBox()
   * @see flash.display.GradientType
   * @see flash.display.SpreadMethod
   */
  public native function lineGradientStyle(type:String, colors:Array, alphas:Array, ratios:Array, matrix:Matrix = null,
                                    spreadMethod:String = "pad", interpolationMethod:String = "rgb",
                                    focalPointRatio:Number = 0) : void;

  /**
   * Draws a line using the current line style from the current drawing position to (x, y); the current drawing
   * position is then set to (x, y). If the display object in which you are drawing contains content that was created
   * with the Flash drawing tools, calls to the lineTo() method are drawn underneath the content. If you call lineTo()
   * before any calls to the moveTo() method, the default position for the current drawing is (0, 0). If any of the
   * parameters are missing, this method fails and the current drawing position is not changed.

   Example

   The following example draws a trapezoid using lineTo() method, starting at pixels (100, 100).

   The line thickness is set to 10 pixels, color is gold and opaque, caps at the end of lines is set to none (since all
   lines are jointed), and the joint between the lines is set to MITER with miter limit set to 10, to have sharp,
   pointed corners.
   <pre>
   package {
       import flash.display.Sprite;
       import flash.display.LineScaleMode;
       import flash.display.CapsStyle;
       import flash.display.JointStyle;
       import flash.display.Shape;


       public class Graphics_lineToExample extends Sprite {

           public function Graphics_lineToExample() {

               var trapezoid:Shape = new Shape();    

               trapezoid.graphics.lineStyle(10, 0xFFD700, 1, false, LineScaleMode.VERTICAL,
                                  CapsStyle.NONE, JointStyle.MITER, 10);

               trapezoid.graphics.moveTo(100, 100);
 
               trapezoid.graphics.lineTo(120, 50);
               trapezoid.graphics.lineTo(200, 50);
               trapezoid.graphics.lineTo(220, 100);
               trapezoid.graphics.lineTo(100, 100); 

               this.addChild(trapezoid);
           }
       }
   }
   </pre>
   * @param x A number that indicates the horizontal position relative to the registration point of the parent display
   *   object (in pixels).
   * @param y A number that indicates the vertical position relative to the registration point of the parent display
   *  object (in pixels).
   */
  public native function lineTo(x : Number, y : Number) : void;

  /**
   * Draws a curve using the current line style from the current drawing position to (anchorX, anchorY) and using the
   * control point that (controlX, controlY) specifies. The current drawing position is then set to (anchorX, anchorY).
   * If the movie clip in which you are drawing contains content created with the Flash drawing tools, calls to the
   * curveTo() method are drawn underneath this content. If you call the curveTo() method before any calls to the
   * moveTo() method, the default of the current drawing position is (0, 0). If any of the parameters are missing,
   * this method fails and the current drawing position is not changed.
   * <p>The curve drawn is a quadratic Bezier curve. Quadratic Bezier curves consist of two anchor points and one
   * control point. The curve interpolates the two anchor points and curves toward the control point.
   * 
   * <p><b>Example</b></p>
   * <p>The following example draws a green circular object with a width and height of 100 pixels, 250 pixels to the right
   * from the registration point (0, 0) of Sprite display object.
   * <p>Draw four curves to produce a circle and fill it green.
   * <p>Note that due to the nature of the quadratic Bezier equation, this is not a perfect circle. The best way to
   * draw a circle is to use the Graphics class's drawCircle() method.
   * <pre>
package {
    import flash.display.Sprite;
    import flash.display.Shape;
    
    public class Graphics_curveToExample1 extends Sprite
    {
        public function Graphics_curveToExample1():void
        {
            var roundObject:Shape = new Shape();

            roundObject.graphics.beginFill(0x00FF00);
            roundObject.graphics.moveTo(250, 0);
            roundObject.graphics.curveTo(300, 0, 300, 50);
            roundObject.graphics.curveTo(300, 100, 250, 100);
            roundObject.graphics.curveTo(200, 100, 200, 50);
            roundObject.graphics.curveTo(200, 0, 250, 0);
            roundObject.graphics.endFill();
            
            this.addChild(roundObject);
        }
    }
}
</pre>
   * The following example draws a new moon using curveTo() method.
   * <p>Two curve lines of 1 pixel are drawn and the space in between is filled white. The moveTo() method is used to
   * position the current drawing position to coordinates (100, 100). The first curve moves the drawing position to
   * (100, 200), its destination point. The second curve returns the position back to the starting position (100, 100),
   * its destination point. The horizontal control points determine the different curve sizes.
   * <pre>
package {
    import flash.display.Sprite;
    import flash.display.Shape;

    public class Graphics_curveToExample2 extends Sprite
    {
        public function Graphics_curveToExample2() {
            var newMoon:Shape = new Shape();
            
            newMoon.graphics.lineStyle(1, 0);
            newMoon.graphics.beginFill(0xFFFFFF);
            newMoon.graphics.moveTo(100, 100); 
            newMoon.graphics.curveTo(30, 150, 100, 200);    
            newMoon.graphics.curveTo(50, 150, 100, 100);
            graphics.endFill();
            
            this.addChild(newMoon);
        }
    }
}
</pre>
   * 
   * @param controlX A number that specifies the horizontal position of the control point relative to the registration
   *   point of the parent display object.
   * @param controlY A number that specifies the vertical position of the control point relative to the registration
   *   point of the parent display object.
   * @param anchorX A number that specifies the horizontal position of the next anchor point relative to the
   *   registration point of the parent display object.
   * @param anchorY A number that specifies the vertical position of the next anchor point relative to the registration
   *   point of the parent display object.
   */
  public native function curveTo(controlX:Number, controlY:Number, anchorX:Number, anchorY:Number) : void;

  /**
   * Draws a circle. You must set the line style, fill, or both before you call the drawCircle() method, by calling the
   * linestyle(), lineGradientStyle(), beginFill(), beginGradientFill(), or beginBitmapFill() method.
   * 
   * @param x The x location of the center of the circle relative to the registration point of the parent display
   *   object (in pixels).
   * @param y The y location of the center of the circle relative to the registration point of the parent display
   *   object (in pixels).
   * @param radius The radius of the circle (in pixels).
   * @see #drawEllipse()
   * @see #lineStyle()
   * @see #lineGradientStyle()
   * @see #beginFill()
   * @see #beginGradientFill()
   * @see #beginBitmapFill()
   */
  public native function drawCircle(x : Number, y : Number, radius : Number) : void;

  /**
   * Draws a rectangle. You must set the line style, fill, or both before you call the drawRect() method, by calling
   * the lineStyle(), lineGradientStyle(), beginFill(), beginGradientFill(), or beginBitmapFill() method.
   * @throws ArgumentError If the width or height parameters are not a number (Number.NaN).
   * @param x A number indicating the horizontal position relative to the registration point of the parent display
   *   object (in pixels).
   * @param y A number indicating the vertical position relative to the registration point of the parent display
   *   object (in pixels).
   * @param width The width of the rectangle (in pixels).
   * @param height The height of the rectangle (in pixels).
   * @see #lineStyle()
   * @see #lineGradientStyle()
   * @see #beginFill()
   * @see #beginGradientFill()
   * @see #beginBitmapFill()
   * @see #drawRoundRect()
   */
  public native function drawRect(x : Number, y : Number, width : Number, height : Number) : void;

  /**
   * Draws a rounded rectangle. You must set the line style, fill, or both before you call the drawRoundRect() method,
   * by calling the lineStyle(), lineGradientStyle(), beginFill(), beginGradientFill(), or beginBitmapFill() method.
   * @throws ArgumentError If the width, height, ellipseWidth or ellipseHeight parameters are not a number (Number.NaN).
   *
   * @param x A number indicating the horizontal position relative to the registration point of the parent display
   *   object (in pixels).
   * @param y A number indicating the horizontal position relative to the registration point of the parent display
   *   object (in pixels).
   * @param width The width of the round rectangle (in pixels).
   * @param height The height of the round rectangle (in pixels).
   * @param ellipseWidth The width of the ellipse used to draw the rounded corners (in pixels).
   * @param ellipseHeight (default = NaN) The height of the ellipse used to draw the rounded corners (in pixels).
   *   Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
   * @see #lineStyle()
   * @see #lineGradientStyle()
   * @see #beginFill()
   * @see #beginGradientFill()
   * @see #beginBitmapFill()
   * @see #drawRect()
   */
  public native function drawRoundRect(x : Number, y : Number, width : Number, height : Number,
                                ellipseWidth : Number, ellipseHeight : Number = NaN) : void;

  /**
   * Moves the current drawing position to (x, y). If any of the parameters are missing, this method fails and the
   * current drawing position is not changed.
   * <p><b>Example</b></p>
   * <p>The following example draws a dashed line of three pixels thickness using moveTo() and lineTo() methods.
   * <p>Using the lineStyle() method, the line thickness is set to 3 pixels. It is also set not to scale. Color is set
   * to red with 25 percent opacity. The CapsStyle property is set to square (the default is round).
   * <p>Since Graphics_moveToExample is an instance of the Sprite class, it has access to all the Graphics class
   * methods. The Graphics class methods can be used to directly draw on the Graphic_moveToExample Sprite object.
   * However, not putting the vector drawing object in a Shape limits the way they can be managed, moved, or changed.
   * <pre>
 package {
     import flash.display.Sprite;
     import flash.display.CapsStyle;
     import flash.display.LineScaleMode;

     public class Graphics_moveToExample extends Sprite
     {
         public function Graphics_moveToExample() {
            
             graphics.lineStyle(3, 0x990000, 0.25, false, 
                             LineScaleMode.NONE, CapsStyle.SQUARE);

             graphics.moveTo(10, 20);
             graphics.lineTo(20, 20);
             graphics.moveTo(30, 20);
             graphics.lineTo(50, 20);
             graphics.moveTo(60, 20);
             graphics.lineTo(80, 20);
             graphics.moveTo(90, 20);
             graphics.lineTo(110, 20);            
             graphics.moveTo(120, 20);
             graphics.lineTo(130, 20);           
         }
     }
 }
</pre>
   * @param x A number that indicates the horizontal position relative to the registration point of the parent display
   *   object (in pixels).
   * @param y A number that indicates the vertical position relative to the registration point of the parent display
   *  object (in pixels).
   */
  public native function moveTo(x : Number, y : Number) : void;

  /**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings. 
   */
  public native function clear() : void;

  /**
   * Specifies a simple one-color fill that Flash Player uses for subsequent calls to other Graphics methods (such as
   * lineTo() or drawCircle()) for the object. The fill remains in effect until you call the beginFill(),
   * beginBitmapFill(), beginGradientFill(), or beginShaderFill() method. Calling the clear() method clears the fill.
   * <p>The fill is not rendered until the endFill() method is called.
   *
   * @param color The color of the fill (0xRRGGBB).
   * @param alpha (default = 1.0) The alpha value of the fill (0.0 to 1.0).
   * @see #endFill()
   * @see #beginBitmapFill()
   * @see #beginGradientFill()
   */
  public native function beginFill(color : uint, alpha : Number = 1.0) : void;

  /**
   * Specifies a gradient fill used by subsequent calls to other Graphics methods (such as lineTo() or
   * drawCircle()) for the object. The fill remains in effect until you call the beginFill(),
   * beginBitmapFill(), beginGradientFill(), or beginShaderFill() method. Calling the clear() method clears the
   * fill.
   * <p>The application renders the fill whenever three or more points are drawn, or when the endFill() method
   * is called.
   * 
   * @param type A value from the GradientType class that specifies which gradient type to use:
   *   GradientType.LINEAR or GradientType.RADIAL.
   * @param colors An array of RGB hexadecimal color values used in the gradient; for example, red is 0xFF0000,
   *   blue is 0x0000FF, and so on. You can specify up to 15 colors. For each color, specify a corresponding value
   *   in the alphas and ratios parameters.
   * @param alphas An array of alpha values for the corresponding colors in the colors array; valid values are
   *   0 to 1. If the value is less than 0, the default is 0. If the value is greater than 1, the default is 1.
   * @param ratios An array of color distribution ratios; valid values are 0-255. This value defines the
   *   percentage of the width where the color is sampled at 100%. The value 0 represents the left position in the
   *   gradient box, and 255 represents the right position in the gradient box.
   *   <p>Note: This value represents positions in the gradient box, not the coordinate space of the final
   *   gradient, which can be wider or thinner than the gradient box. Specify a value for each value in the
   *   colors parameter.
   *   <p>For example, for a linear gradient that includes two colors, blue and green, the following example
   *   illustrates the placement of the colors in the gradient based on different values in the ratios array:
   *   <table>
   *     <tr><th>ratios</th><th>Gradient</th></tr>
   *     <tr><td>[0, 127]</td><td>linear gradient blue to green with ratios 0 and 127</td></tr>
   *     <tr><td>[0, 255]</td><td>linear gradient blue to green with ratios 0 and 255</td></tr>
   *     <tr><td>[127, 255]</td><td>linear gradient blue to green with ratios 127 and 255</td></tr>
   *   </table>
   *   The values in the array must increase sequentially; for example, [0, 63, 127, 190, 255].
   * @param matrix (default = null) A transformation matrix as defined by the flash.geom.Matrix class. The
   *   flash.geom.Matrix class includes a createGradientBox() method, which lets you conveniently set up the
   *   matrix for use with the beginGradientFill() method.
   * @param spreadMethod (default = "pad") A value from the SpreadMethod class that specifies which spread
   *   method to use, either: SpreadMethod.PAD, SpreadMethod.REFLECT, or SpreadMethod.REPEAT.
   * For example, consider a simple linear gradient between two colors:
   * <pre>
   * import flash.geom.*
   * import flash.display.*
   * var fillType:String = GradientType.LINEAR;
   * var colors:Array = [0xFF0000, 0x0000FF];
   * var alphas:Array = [1, 1];
   * var ratios:Array = [0x00, 0xFF];
   * var matr:Matrix = new Matrix();
   * matr.createGradientBox(20, 20, 0, 0, 0);
   * var spreadMethod:String = SpreadMethod.PAD;
   * this.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr, spreadMethod);  
   * this.graphics.drawRect(0,0,100,100);
   * </pre>
   * This example uses SpreadMethod.PAD for the spread method, and the gradient fill looks like the following:
   * TODO: linear gradient with SpreadMethod.PAD
   * If you use SpreadMethod.REFLECT for the spread method, the gradient fill looks like the following:
   * TODO: linear gradient with SpreadMethod.REFLECT
   * If you use SpreadMethod.REPEAT for the spread method, the gradient fill looks like the following:
   * TODO: linear gradient with SpreadMethod.REPEAT
   * @throws ArgumentError If the type parameter is not valid.
   * @param interpolationMethod (default = "rgb") A value from the InterpolationMethod class that specifies
   *   which value to use: InterpolationMethod.LINEAR_RGB or InterpolationMethod.RGB
   *   <p>For example, consider a simple linear gradient between two colors (with the spreadMethod parameter
   *   set to SpreadMethod.REFLECT). The different interpolation methods affect the appearance as follows:
   *   <pre>
   *   linear gradient with InterpolationMethod.LINEAR_RGB 	linear gradient with InterpolationMethod.RGB
   *   InterpolationMethod.LINEAR_RGB	InterpolationMethod.RGB
   *   </pre>
   * @param focalPointRatio (default = 0) A number that controls the location of the focal point of the
   *   gradient. 0 means that the focal point is in the center. 1 means that the focal point is at one border of
   *   the gradient circle. -1 means that the focal point is at the other border of the gradient circle. A value
   *   less than -1 or greater than 1 is rounded to -1 or 1. For example, the following example shows a
   *   focalPointRatio set to 0.75:
   *   <pre>
   *   radial gradient with focalPointRatio set to 0.75
   *   </pre>
   * @see #endFill()
   * @see #beginFill()
   * @see #beginBitmapFill()
   * @see flash.geom.Matrix#createGradientBox()
   * @see flash.display.GradientType
   * @see flash.display.SpreadMethod
   */
  public native function beginGradientFill(type:String, colors:Array, alphas:Array, ratios:Array,
                                    matrix:Matrix = null, spreadMethod:String = "pad",
                                    interpolationMethod:String = "rgb", focalPointRatio:Number = 0) : void;

  /**
   * Applies a fill to the lines and curves that were added since the last call to the beginFill(),
   * beginGradientFill(), or beginBitmapFill() method. Flash uses the fill that was specified in the previous call to
   * the beginFill(), beginGradientFill(), or beginBitmapFill() method. If the current drawing position does not equal
   * the previous position specified in a moveTo() method and a fill is defined, the path is closed with a line and
   * then filled.
   * @see #beginFill()
   * @see #beginBitmapFill()
   * @see #beginGradientFill()
   */
  public native function endFill() : void;

  public static native function toRGBA(color : uint, alpha : Number = 1.0) : String;
}
}