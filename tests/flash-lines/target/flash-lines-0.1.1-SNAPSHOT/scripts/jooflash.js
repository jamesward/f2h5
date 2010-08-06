joo.classLoader.prepare("package flash.display", [

"import js.HTMLElement",
"import js.HTMLCanvasElement",
"import js.CanvasRenderingContext2D",
"import js.ImageData",
"import flash.geom.Matrix",
"import flash.display.IBitmapDrawable",
"import flash.geom.Rectangle",
"import flash.geom.ColorTransform",""],

"public class BitmapData implements flash.display.IBitmapDrawable",function(BitmapData,$$private){with(BitmapData)with($$private)return[ 

  /**
   * Creates a BitmapData object with a specified width and height. If you specify a value for the fillColor parameter,
   * every pixel in the bitmap is set to that color.
   * <p>By default, the bitmap is created as transparent, unless you pass the value false for the transparent parameter.
   * After you create an opaque bitmap, you cannot change it to a transparent bitmap. Every pixel in an opaque bitmap
   * uses only 24 bits of color channel information. If you define the bitmap as transparent, every pixel uses 32 bits
   * of color channel information, including an alpha transparency channel.
   * <p>The maximum width and maximum height of a BitmapData object is 2880 pixels. If you specify a width or height
   * value that is greater than 2880, a new instance is not created.
   * @throws ArgumentError width and/or height are invalid (less than or equal to zero, greater than 2880) 
   * @param width The width of the bitmap image in pixels.
   * @param height The height of the bitmap image in pixels.
   * @param transparent (default = true) Specifies whether the bitmap image supports per-pixel transparency.
   *   The default value is true (transparent). To create a fully transparent bitmap, set the value of the transparent
   *   parameter to true and the value of the fillColor parameter to 0x00000000 (or to 0). Setting the transparent
   *   property to false can result in minor improvements in rendering performance.
   * @param fillColor (default = 0xFFFFFFFF) A 32-bit ARGB color value that you use to fill the bitmap image area.
   *   The default value is 0xFFFFFFFF (solid white).
   */
  "public function BitmapData",function $BitmapData(width/* : int*/, height/* : int*/, transparent/* : Boolean*/, fillColor/* : uint*/) {if(arguments.length<4){if(arguments.length<3){transparent = true;}fillColor = 0xFFFFFFFF;}this[$super]();
    this[$_transparent] = transparent;
    this.canvas = window.document.createElement("canvas");
    this.canvas.width = this[$_width] = width;
    this.canvas.height = this[$_height] = height;
    this.canvas.style.position = "absolute";
    this[$context] = this.canvas.getContext("2d");
    // TODO: transparent, fillColor.
  },

  /**
   * The rectangle that defines the size and location of the bitmap image. The top and left of the rectangle
   * are 0; the width and height are equal to the width and height in pixels of the BitmapData object.
   */
  "public function get rect",function get$rect()/* : Rectangle*/ {
    return new Rectangle(0, 0, this[$_width], this[$_height]);
  },

  /**
   * Defines whether the bitmap image supports per-pixel transparency. You can set this value only when you construct a BitmapData object by passing in true for the transparent parameter of the constructor. Then, after you create a BitmapData object, you can check whether it supports per-pixel transparency by determining if the value of the transparent property is true.
   */
  "public function get transparent",function get$transparent()/*:Boolean*/ {
    return this[$_transparent];
  },

  /**
   * The width of the bitmap image in pixels.
   */
  "public function get width",function get$width()/*:int*/ {
    return this[$_width];
  },

  /**
   * The height of the bitmap image in pixels.
   */
  "public function get height",function get$height()/* : int*/ {
    return this[$_height];
  },

  /**
   * Adjusts the color values in a specified area of a bitmap image by using a ColorTransform object. If the
   * rectangle matches the boundaries of the bitmap image, this method transforms the color values of the entire
   * image.
   * @throws TypeError The rect or colorTransform are null.
   * @example
   * The following example shows how to apply a color transform to the left half (rectangle) of a BitmapData
   * object:
   * <pre>
   * import flash.display.Bitmap;
   * import flash.display.BitmapData;
   * import flash.geom.Rectangle;
   * import flash.geom.ColorTransform;
   * 
   * var bmd:BitmapData = new BitmapData(80, 30, false, 0xFF0000);
   * 
   * var cTransform:ColorTransform = new ColorTransform();
   * cTransform.alphaMultiplier = 0.5
   * var rect:Rectangle = new Rectangle(0, 0, 40, 30);
   * bmd.colorTransform(rect, cTransform);
   * 
   * var bm:Bitmap = new Bitmap(bmd);
   * addChild(bm);
   * </pre>
   * @param rect A Rectangle object that defines the area of the image in which the ColorTransform object is applied.
   * @param colorTransform A ColorTransform object that describes the color transformation values to apply.
   * @see flash.geom.ColorTransform
   * @see flash.geom.Rectangle
   */
  "public function colorTransform",function colorTransform(rect/* : Rectangle*/, colorTransform/* : ColorTransform*/)/* : void*/ {
    // check for all known faster methods to map colorTransform directly to canvas APIs:
    if (colorTransform.alphaOffset==0
      && colorTransform.redMultiplier>=0 && colorTransform.redMultiplier<=1
      && colorTransform.redMultiplier==colorTransform.greenMultiplier
      && colorTransform.redMultiplier==colorTransform.blueMultiplier
      && colorTransform.redMultiplier==colorTransform.alphaMultiplier) {
      if (colorTransform.redOffset>=0 && colorTransform.greenOffset>=0 && colorTransform.blueOffset>=0) {
        this[$context].save();
        this[$context].setTransform(1, 0, 0, 1, 0, 0);
        // TODO: which other context attributes to reset?
        var alpha/* : Number*/ = 1;
        if (colorTransform.redMultiplier==1) {
          this[$context].globalCompositeOperation = "lighter";
        } else {
          this[$context].globalCompositeOperation = "source-over";
          alpha -= colorTransform.alphaMultiplier;
        }
        this[$context].fillStyle = "rgba("+
                            [colorTransform.redOffset, colorTransform.greenOffset, colorTransform.blueOffset,
                              alpha]
                              .join(",")+")";
        this[$context].fillRect(rect.x,rect.y, rect.width,rect.height);
        this[$context].restore();
        return;
      //} else {
      //   TODO: "destination-out" for alphaMultiplier within 0..1 only
      //   TODO: negative offsets: "darker" does not work in Firefox :-(
      }
    }
    // generic, but very slow solution:
    // get the image data to manipulate
    var input/* : ImageData*/ = this[$context].getImageData(rect.x, rect.y, rect.width, rect.height);

    // get an empty slate to put the data into
    //var output : ImageData = context.createImageData(rect.width, rect.height);
    // => createImageData not yet supported by all browsers with canvas support, esp. not Firefox.

    // alias some variables for convenience
    // notice that we are using input.width and input.height here
    // as they might not be the same as rect.width and rect.height
    // (in particular, they might be different on high-res displays)
    var w/* : uint*/ = input.width, h/* : uint*/ = input.height;
    var inputData/* : Array*/ = input.data;
    //var outputData : Array = output.data;

    // color transformation:
    var maps/* : Array*/ = colorTransform.getComponentMaps();
    var i/* : uint*/;
    for (var m/*:uint*/ =0; m<4; ++m) {
      var map/* : Array*/ = maps[m];
      if (map) {
        for (i = inputData.length-4 + m; i >= 0; i -= 4) {
          inputData[i] = map[inputData[i]];
        }
      }
    }
    // put the image data back after manipulation
    this[$context].putImageData(input, rect.x, rect.y);
  },

  /**
   * Draws the source display object onto the bitmap image, using the Flash Player vector renderer. You can
   * specify matrix, colorTransform, blendMode, and a destination clipRect parameter to control how the
   * rendering performs. Optionally, you can specify whether the bitmap should be smoothed when scaled (this
   * works only if the source object is a BitmapData object).
   * <p>This method directly corresponds to how objects are drawn with the standard vector renderer for objects in
   * the authoring tool interface.
   * <p>The source display object does not use any of its applied transformations for this call. It is treated as it
   * exists in the library or file, with no matrix transform, no color transform, and no blend mode. To draw a
   * display object (such as a movie clip) by using its own transform properties, you can copy its transform
   * property object to the transform property of the Bitmap object that uses the BitmapData object.
   * <p>Note: The source object and (in the case of a Sprite or MovieClip object) all of its child objects must
   * come from the same domain as the caller, or must be in a SWF file that is accessible to the caller by having
   * called the Security.allowDomain() method. If these conditions are not met, the draw() method does not draw
   * anything.
   * @throws ArgumentError The source parameter is not a BitmapData or DisplayObject object.
   * @throws SecurityError The source object and (in the case of a Sprite or MovieClip object) all of its
   *   child objects do not come from the same domain as the caller, or are not in a SWF file that is accessible
   *   to the caller by having called the Security.allowDomain() method.
   * @throws ArgumentError The source is null or not a valid IBitmapDrawable object.
   * @example
   * The following example shows how to draw a TextField object to a BitmapData object:
   * <pre>
   * import flash.display.Bitmap;
   * import flash.display.BitmapData;
   * import flash.text.TextField;
   * 
   * var tf:TextField = new TextField();
   * tf.text = "bitmap text";
   * 
   * var myBitmapData:BitmapData = new BitmapData(80, 20);
   * myBitmapData.draw(tf);
   * var bmp:Bitmap = new Bitmap(myBitmapData);
   * this.addChild(bmp);
   * </pre>
   * @param source The display object or BitmapData object to draw to the BitmapData object. (The DisplayObject
   *   and BitmapData classes implement the IBitmapDrawable interface.)
   * @param matrix (default = null) A Matrix object used to scale, rotate, or translate the coordinates of the
   *   bitmap. If you do not want to apply a matrix transformation to the image, set this parameter to an identity
   *   matrix, created with the default new Matrix() constructor, or pass a null value.
   * @param colorTransform (default = null) A ColorTransform object that you use to adjust the color values of
   *   the bitmap. If no object is supplied, the bitmap image's colors are not transformed. If you must pass this
   *   parameter but you do not want to transform the image, set this parameter to a ColorTransform object
   *   created with the default new ColorTransform() constructor.
   * @param blendMode (default = null) A string value, from the flash.display.BlendMode class, specifying the
   *   blend mode to be applied to the resulting bitmap.
   * @param clipRect (default = null) A Rectangle object that defines the area of the source object to draw. If
   *   you do not supply this value, no clipping occurs and the entire source object is drawn.
   * @param smoothing (default = false) A Boolean value that determines whether a BitmapData object is smoothed
   *   when scaled or rotated, due to a scaling or rotation in the matrix parameter. The smoothing parameter only
   *   applies if the source parameter is a BitmapData object. With smoothing set to false, the rotated or scaled
   *   BitmapData image can appear pixelated or jagged. Drawing a bitmap with smoothing set to true takes longer
   *   than doing so with smoothing set to false.
   * @see flash.display.BlendMode
   * @see flash.geom.ColorTransform
   * @see flash.geom.Matrix
   */
  "public function draw",function draw(source/* : IBitmapDrawable*/, matrix/* : Matrix*/, colorTransform/* : ColorTransform*/, 
                       blendMode/* : String*/, clipRect/* : Rectangle*/, smoothing/* : Boolean*/)/* : void*/ {if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){matrix = null;}colorTransform = null;}blendMode = null;}clipRect = null;}smoothing = false;}
    var element/* : HTMLElement*/ = is( source, BitmapData) ? (source).canvas : (source).getElement();
    if (matrix) {
      this[$context].save();
      this[$context].setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
    this[$context].drawImage(element, 0, 0);
    if (matrix) {
      this[$context].restore();
    }
  },

  "private var",{ _transparent/* : Boolean*/: undefined},
  "private var",{ _width/* : int*/: undefined},
  "private var",{ _height/* : int*/: undefined},
  "internal var",{ canvas/* : HTMLCanvasElement*/: undefined},
  "private var",{ context/* : CanvasRenderingContext2D*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.display", [

"import flash.display.InteractiveObject",
"import flash.display.DisplayObject",""],
//import flash.media.SoundTransform;

/**
 * The SimpleButton class lets you control all instances of button symbols in a SWF file.
 */
"public class SimpleButton extends InteractiveObject",function(SimpleButton,$$private){with(SimpleButton)with($$private)return[ 

  /**
   * Creates a new SimpleButton instance.
   * @param upState (default null) a display object that is used as the visual object for the button "Down" state
   * @param overState
   * @param downState
   * @param hitTestState
   */
  "public function SimpleButton",function $SimpleButton (upState/*:DisplayObject*/, overState/*:DisplayObject*/,
                                downState/*:DisplayObject*/, hitTestState/*:DisplayObject*/) {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){upState = null;}overState = null;}downState = null;}hitTestState = null;}
    this[$super]();
    this[$_upState] = upState;
    this[$_overState] = overState;
    this[$_downState] = downState;
    this[$_hitTestState] = hitTestState;
  },

  "override protected function getElementName",function getElementName()/*:String*/ {
    return "button";
  },

  /**
   * Specifies a display object that is used as the visual object for the button "Down" state&#8212;the state that the
   * button is in when the user clicks the hitTestState object.
   * @return the display object that is used as the visual object for the button "Down" state
   */
  "public function get downState",function get$downState ()/* : DisplayObject*/ {
    return this[$_downState];
  },

  "public function set downState",function set$downState (value/*:DisplayObject*/)/* : void*/ {
    this[$_downState] = value;
  },

  /**
   * A Boolean value that specifies whether a button is enabled.
   * @return whether a button is enabled.
   */
  "public function get enabled",function get$enabled ()/* : Boolean*/ {
    return this[$_enabled];
  },

  "public function set enabled",function set$enabled (value/*:Boolean*/)/* : void*/ {
    this[$_enabled] = value;
  },

  /// Specifies a display object that is used as the hit testing object for the button.
  "public function get hitTestState",function get$hitTestState ()/* : DisplayObject*/ {
    return this[$_hitTestState];
  },

  "public function set hitTestState",function set$hitTestState (value/*:DisplayObject*/)/* : void*/ {
    this[$_hitTestState] = value;
  },

  /// Specifies a display object that is used as the visual object for the button over state &#8212; the state that the button is in when the mouse is positioned over the button.
  "public function get overState",function get$overState ()/* : DisplayObject*/ {
    return this[$_overState];
  },

  "public function set overState",function set$overState (value/*:DisplayObject*/)/* : void*/ {
    this[$_overState] = value;
  },

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
  "public function get trackAsMenu",function get$trackAsMenu ()/* : Boolean*/ {
    return this[$_trackAsMenu];
  },

  "public function set trackAsMenu",function set$trackAsMenu (value/*:Boolean*/)/* : void*/ {
    this[$_trackAsMenu] = value;
  },

  /// Specifies a display object that is used as the visual object for the button up state &#8212; the state that the button is in when the mouse is not positioned over the button.
  "public function get upState",function get$upState ()/* : DisplayObject*/ {
    return this[$_upState];
  },

  "public function set upState",function set$upState (value/*:DisplayObject*/)/* : void*/ {
    this[$_upState] = value;
  },

  /// A Boolean value that, when set to true, indicates whether Flash Player displays the hand cursor when the mouse rolls over a button.
  "public function get useHandCursor",function get$useHandCursor ()/* : Boolean*/ {
    return this[$_useHandCursor];
  },

  "public function set useHandCursor",function set$useHandCursor (value/*:Boolean*/)/* : void*/ {
    this[$_useHandCursor] = value;
  },

  "private var",{ _upState/* : DisplayObject*/: undefined},
  "private var",{ _overState/* : DisplayObject*/: undefined},
  "private var",{ _downState/* : DisplayObject*/: undefined},
  "private var",{ _hitTestState/* : DisplayObject*/: undefined},
//  private var _soundTransform : SoundTransform;
  "private var",{ _enabled/* : Boolean*/ : true},
  "private var",{ _trackAsMenu/* : Boolean*/: undefined},
  "private var",{ _useHandCursor/* : Boolean*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.net", [""],

/**
 * The URLVariables class allows you to transfer variables between a Flash� application and a server.
 * Use URLVariables objects with methods of the URLLoader class, with the data property of the URLRequest class,
 * and with flash.net package functions.
 * @see URLLoader
 */
"public class URLVariables",function(URLVariables,$$private){with(URLVariables)with($$private)return[ 

  /**
   * Creates a new URLVariables object.
   * You pass URLVariables objects to the data property of URLRequest objects.
   * <p>If you call the URLVariables constructor with a string, the decode() method is automatically called to convert
   * the string to properties of the URLVariables object.
   * @param source (default = null) A URL-encoded string containing name/value pairs. 
   */
  "public function URLVariables",function $URLVariables(source/* : String*/) {if(arguments.length<1){source = null;}this[$super]();
    
  },

  /**
   * Converts the variable string to properties of the specified URLVariables object.
   * <p>This method is used internally by the URLVariables events. Most users do not need to call this method directly.
   * @param source A URL-encoded query string containing name/value pairs.
   * @throws Error The source parameter must be a URL-encoded query string containing name/value pairs.
   */
  "public function decode",function decode(source/* : String*/)/* : void*/ {
    
  },

  /**
   * Returns a string containing all enumerable variables, in the MIME content encoding application/x-www-form-urlencoded.
   * @return A URL-encoded string containing name/value pairs. 
   */
  "public function toString",function toString()/* : String*/ {
    return "";
  },
  
];},[]
);joo.classLoader.prepare("package flash.display", [""],
/**
 * The LineScaleMode class provides values for the scaleMode parameter in the Graphics.lineStyle() method.
 */
"public class LineScaleMode extends Object",function(LineScaleMode,$$private){with(LineScaleMode)with($$private)return[

  /**
   * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line scales only
   * vertically.
   */
  "public static const",{ HORIZONTAL/* : String*/ : "horizontal"},
  /**
   * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line never
   * scales.
   */
  "public static const",{ NONE/* : String*/ : "none"},
  /**
   * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line always
   * scales when the object is scaled (the default).
   */
  "public static const",{ NORMAL/* : String*/ : "normal"},
  /**
   * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line scales only
   * horizontally.
   */
  "public static const",{ VERTICAL/* : String*/ : "vertical"},

];},[]
);joo.classLoader.prepare("package flash.display",
[""],
/**
 * The InterpolationMethod class provides values for the interpolationMethod parameter in the
 * Graphics.beginGradientFill() and Graphics.lineGradientStyle() methods.
 */
"public class InterpolationMethod extends Object",function(InterpolationMethod,$$private){with(InterpolationMethod)with($$private)return[

  /** Specifies that the linear RGB interpolation method should be used. */
  "public static const",{ LINEAR_RGB/* : String*/ : "linear_rgb"},

  /** Specifies that the RGB interpolation method should be used. */
  "public static const",{ RGB/* : String*/ : "rgb"},

];},[]
);joo.classLoader.prepare("package flash.geom", ["import flash.geom.ColorTransform","import flash.geom.Matrix",

"import flash.geom.Rectangle",
"import flash.display.DisplayObject",
"import flash.display.Shape",""],

/**
 * The Transform class provides access to color adjustment properties and two- or three-dimensional
 * transformation objects that can be applied to a display object.
 */
"public class Transform",function(Transform,$$private){with(Transform)with($$private)return[ 

  "public function Transform",function $Transform (displayObject/* : DisplayObject*/) {this[$super]();
    this[$displayObject] = displayObject;
  },

  "private var",{ displayObject/* : DisplayObject*/: undefined},

  /**
   * A ColorTransform object containing values that universally adjust the colors in the display object.
   * @return
   */
  "public function get colorTransform",function get$colorTransform ()/* : ColorTransform*/ {
    return this[$_colorTransform];
  },

  "public function set colorTransform",function set$colorTransform (value/* : ColorTransform*/)/* : void*/ {
    this[$_colorTransform] = value;
  },

  "private var",{ _colorTransform/* : ColorTransform*/: undefined},

  /**
   * A ColorTransform object representing the combined color transformations applied to the display object
   * and all of its parent objects, back to the root level.
   * @return
   */
  "public function get concatenatedColorTransform",function get$concatenatedColorTransform ()/* : ColorTransform*/ {
    var concCT/* : ColorTransform*/ = this[$_colorTransform];
    var currentDO/* : DisplayObject*/ = this[$displayObject].parent;
    while (currentDO) {
      concCT.concat(currentDO.transform.colorTransform);
      currentDO = currentDO.parent;
    }
    return colorTransform;
  },

  /**
   * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.
   * @return
   */
  "public function get matrix",function get$matrix ()/* : Matrix*/ {
    return this[$_matrix];
  },
  "public function set matrix",function set$matrix (value/*:Matrix*/)/* : void*/ {
    this[$_matrix] = value;
    this[$displayObject].transform = this;
  },

  "private var",{ _matrix/* : Matrix*/: undefined},

  /**
   * A Matrix object representing the combined transformation matrixes of the display object and all of its
   * parent objects, back to the root level.
   * @return
   */
  "public function get concatenatedMatrix",function get$concatenatedMatrix ()/* : Matrix*/ {
    var concMatrix/* : Matrix*/ = this[$_matrix];
    var currentDO/* : DisplayObject*/ = this[$displayObject].parent;
    while (currentDO) {
      concMatrix.concat(currentDO.transform.matrix);
      currentDO = currentDO.parent;
    }
    return concMatrix;
  },

  /**
   * A Rectangle object that defines the bounding rectangle of the display object on the stage.
   * @return
   */
  "public function get pixelBounds",function get$pixelBounds ()/* : Rectangle*/ {
    return new Rectangle(this[$displayObject].x, this[$displayObject].y, this[$displayObject].width, this[$displayObject].height);
  },

];},[]
);joo.classLoader.prepare("package flash.geom", [""],

/**
 * The ColorTransform class lets you adjust the color values in a display object.
 */
"public class ColorTransform",function(ColorTransform,$$private){with(ColorTransform)with($$private)return[ 
  /**
   * A decimal value that is multiplied with the alpha transparency channel value. 
   */
  "public var",{ alphaMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the alpha transparency channel value after it has been
   * multiplied by the alphaMultiplier value.
   */
  "public var",{ alphaOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the blue channel value.
   */
  "public var",{ blueMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the blue channel value after it has been multiplied by the
   * blueMultiplier value.
   */
  "public var",{ blueOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the green channel value.
   */
  "public var",{ greenMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the green channel value after it has been multiplied by the
   * greenMultiplier value.
   */
  "public var",{ greenOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the red channel value. 
   */
  "public var",{ redMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the red channel value after it has been multiplied by the
   * redMultiplier value.
   */
  "public var",{ redOffset/* : Number*/: undefined},

  /**
   * The RGB color value for a ColorTransform object.
   */
  "public function get color",function get$color ()/* : uint*/ {
    return this.redOffset << 16 | this.greenOffset << 8 || this.blueOffset; 
  },

  "public function set color",function set$color (newColor/* : uint*/)/* : void*/ {
    this.redOffset   = newColor >> 16 & 0xF;
    this.greenOffset = newColor >>  8 & 0xF;
    this.blueOffset  = newColor       & 0xF;
    this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 1;
  },

  /**
   * Creates a ColorTransform object for a display object. 
   */
  "public function ColorTransform",function $ColorTransform (redMultiplier/* : Number*/, greenMultiplier/* : Number*/, blueMultiplier/* : Number*/,
                                  alphaMultiplier/* : Number*/,
                                  redOffset/* : Number*/, greenOffset/* : Number*/, blueOffset/* : Number*/,
                                  alphaOffset/*:Number*/) {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){redMultiplier = 1;}greenMultiplier = 1;}blueMultiplier = 1;}alphaMultiplier = 1;}redOffset = 0;}greenOffset = 0;}blueOffset = 0;}alphaOffset = 0;}this[$super]();
    this.redMultiplier = redMultiplier;
    this.greenMultiplier = greenMultiplier;
    this.blueMultiplier = blueMultiplier;
    this.alphaMultiplier = alphaMultiplier;
    this.redOffset = redOffset;
    this.greenOffset = greenOffset;
    this.blueOffset = blueOffset;
    this.alphaOffset = alphaOffset;
  },

  /**
   * Concatenates the ColorTranform object specified by the second parameter with the current ColorTransform
   * object and sets the current object as the result, which is an additive combination of the two color
   * transformations.
   */
  "public function concat",function concat (second/*:ColorTransform*/)/* : void*/ {
    this.redMultiplier *= second.redMultiplier;
    this.greenMultiplier *= second.greenMultiplier;
    this.blueMultiplier *= second.blueMultiplier;
    this.alphaMultiplier *= second.alphaMultiplier;
    this.redOffset += second.redOffset;
    this.greenOffset += second.greenOffset;
    this.blueOffset += second.blueOffset;
    this.alphaOffset += second.alphaOffset;
  },

  "private var",{ maps/* : Array*/: undefined},

  "public function getComponentMaps",function getComponentMaps()/* : Array*/ {
    if (!this[$maps]) {
      var offsets/* : Array*/ = [this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset];
      var multipliers/* : Array*/ = [this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier];
      this[$maps] = new Array(4);
      for (var c/*:uint*/ = 0; c < 4; ++c) {
        var offset/* : Number*/ = offsets[c];
        var multiplier/* : Number*/ = multipliers[c];
        var map/* : Array*/;
        if (offset==0 && multiplier==1) {
          map = null;
        } else {
          map = new Array(256);
          for (var b/*:uint*/ = 0; b < 256; ++b) {
            var val/* : Number*/ = offset + multiplier * b;
            map[b] = val <= 0 ? 0 : val <= 255 ? val : 255;
          }
        }
        this[$maps][c] = map;
      }
    }
    return this[$maps];
  },

  /**
   * Formats and returns a string that describes all of the properties of the ColorTransform object.
   */
  "public function toString",function toString ()/* : String*/ {
    return "[ColorTransform("+[this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier,
      this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset].join(", ")+")]";
  },

];},[]
);joo.classLoader.prepare("package flash.events", [

"import flash.events.Event",""],

/**
 * The IEventDispatcher interface defines methods for adding or removing event listeners, checks whether specific types
 * of event listeners are registered, and dispatches events.
 * <p>Event targets are an important part of the Flash� Player event model. The event target serves as the focal point
 * for how events flow through the display list hierarchy. When an event such as a mouse click or a keypress occurs,
 * Flash Player dispatches an Event object into the event flow from the root of the display list. The Event object
 * makes a round-trip journey to the event target, which is conceptually divided into three phases: the capture phase
 * includes the journey from the root to the last node before the event target's node; the target phase includes only
 * the event target node; and the bubbling phase includes any subsequent nodes encountered on the return trip to the
 * root of the display list.
 * <p>In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend
 * EventDispatcher. If this is impossible (that is, if the class is already extending another class), you can instead
 * implement the IEventDispatcher interface, create an EventDispatcher member, and write simple hooks to route calls
 * into the aggregated EventDispatcher.
 */
"public interface IEventDispatcher",function(IEventDispatcher,$$private){with(IEventDispatcher)with($$private)return[ /*

  function IEventDispatcher():*;*/,/*

  /**
   * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which dispatchEvent()
   * is called.
   * @param event The Event object dispatched into the event flow.
   * @return A value of true unless preventDefault() is called on the event, in which case it returns false.
   * /
  function dispatchEvent(event : flash.events.Event) : Boolean;*/,/*

  /**
   * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. This allows
   * you to determine where an EventDispatcher object has altered handling of an event type in the event flow hierarchy.
   * To determine whether a specific event type will actually trigger an event listener, use
   * IEventDispatcher.willTrigger().
   * <p>The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
   * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
   * parameter.
   * 
   * @param type The type of event.
   * @return A value of true if a listener of the specified type is registered; false otherwise.
   * @see #willTrigger()
   * /
  function hasEventListener(type : String) : Boolean;*/,/*

  /**
   * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the
   * specified event type. This method returns true if an event listener is triggered during any phase of the event
   * flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
   * <p>The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
   * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
   * parameter.
   *  
   * @param type The type of event.
   * @return A value of true if a listener of the specified type will be triggered; false otherwise.
   * /
  function willTrigger(type : String) : Boolean;*/,/*

  /**
   * Removes a listener from the EventDispatcher object. If there is no matching listener registered with the
   * EventDispatcher object, a call to this method has no effect.
   * @param type The type of event.
   * @param listener The listener object to remove.
   * @param useCapture (default = false) Specifies whether the listener was registered for the capture phase or the
   *   target and bubbling phases. If the listener was registered for both the capture phase and the target and
   *   bubbling phases, two calls to removeEventListener() are required to remove both: one call with useCapture set
   *   to true, and another call with useCapture set to false.
   * /
  function removeEventListener(type : String, listener : Function, useCapture : Boolean) : void;*/,/*

  /**
   * Registers an event listener object with an EventDispatcher object so that the listener receives notification of
   * an event. You can register event listeners on all nodes in the display list for a specific type of event, phase,
   * and priority.
   * <p>After you successfully register an event listener, you cannot change its priority through additional calls to
   * addEventListener(). To change a listener's priority, you must first call removeEventListener(). Then you can
   * register the listener again with the new priority level.
   * <p>After the listener is registered, subsequent calls to addEventListener() with a different value for either type
   * or useCapture result in the creation of a separate listener registration. For example, if you first register a
   * listener with useCapture set to true, it listens only during the capture phase. If you call addEventListener()
   * again using the same listener object, but with useCapture set to false, you have two separate listeners: one that
   * listens during the capture phase, and another that listens during the target and bubbling phases.
   * <p>You cannot register an event listener for only the target phase or the bubbling phase. Those phases are coupled
   * during registration because bubbling applies only to the ancestors of the target node.
   * <p>When you no longer need an event listener, remove it by calling EventDispatcher.removeEventListener();
   * otherwise, memory problems might result. Objects with registered event listeners are not automatically removed
   * from memory because the garbage collector does not remove objects that still have references.
   * <p>Copying an EventDispatcher instance does not copy the event listeners attached to it. (If your newly created
   * node needs an event listener, you must attach the listener after creating the node.) However, if you move an
   * EventDispatcher instance, the event listeners attached to it move along with it.
   * <p>If the event listener is being registered on a node while an event is also being processed on this node, the
   * event listener is not triggered during the current phase but may be triggered during a later phase in the event
   * flow, such as the bubbling phase.
   * <p>If an event listener is removed from a node while an event is being processed on the node, it is still
   * triggered by the current actions. After it is removed, the event listener is never invoked again (unless it is
   * registered again for future processing).
   * 
   * @param type The type of event.
   * @param listener The listener function that processes the event. This function must accept an Event object as its
   *   only parameter and must return nothing, as this example shows:
   *   <code>function(evt:Event):void</code>
   *   The function can have any name.
   * @param useCapture (default = false) Determines whether the listener works in the capture phase or the target and
   *   bubbling phases. If useCapture is set to true, the listener processes the event only during the capture phase
   *   and not in the target or bubbling phase. If useCapture is false, the listener processes the event only during
   *   the target or bubbling phase. To listen for the event in all three phases, call addEventListener() twice, once
   *   with useCapture set to true, then again with useCapture set to false.
   * @param priority (default = 0) The priority level of the event listener. Priorities are designated by a 32-bit
   *   integer. The higher the number, the higher the priority. All listeners with priority n are processed before
   *   listeners of priority n-1. If two or more listeners share the same priority, they are processed in the order
   *   in which they were added. The default priority is 0.
   * @param useWeakReference (default = false) Determines whether the reference to the listener is strong or weak.
   *   A strong reference (the default) prevents your listener from being garbage-collected. A weak reference does not.
   *   Class-level member functions are not subject to garbage collection, so you can set useWeakReference to true for
   *   class-level member functions without subjecting them to garbage collection. If you set useWeakReference to true
   *   for a listener that is a nested inner function, the function will be garbge-collected and no longer persistent.
   *   If you create references to the inner function (save it in another variable) then it is not garbage-collected
   *   and stays persistent.
   * /
  function addEventListener(type : String, listener : Function, useCapture : Boolean, priority :int, useWeakReference : Boolean) : void;*/,
];},[]
);joo.classLoader.prepare("package flash.display", [

"import js.Element",
"import js.HTMLCanvasElement",
"import flash.display.DisplayObject",
"import flash.display.Graphics",
"import flash.display.Stage",
"import flash.geom.Transform",
"import flash.geom.Matrix",""],

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
"public class Shape extends DisplayObject",function(Shape,$$private){with(Shape)with($$private)return[function(){joo.classLoader.init(Stage);}, 

  /**
   * Creates a new Shape object.
   */
  "public function Shape",function $Shape() {
    this[$super]();
  },

  "override protected function createElement",function createElement()/* : Element*/ {
    var canvas/* : HTMLCanvasElement*/ = createCanvas();
    canvas.style.position = "absolute";
    return canvas;
  },

  "internal static function createCanvas",function createCanvas()/* : HTMLCanvasElement*/ {
    var canvas/* : HTMLCanvasElement*/ = window.document.createElement("canvas");
    // TODO: adjust width and height when drawing into the canvas!
    canvas.width = Stage.instance.stageWidth;
    canvas.height = Stage.instance.stageHeight;
    return canvas;
  },

  "internal static function createGraphics",function createGraphics(canvas/* : HTMLCanvasElement*/)/* : Graphics*/ {
    return new Graphics(canvas.getContext("2d"));
  },

  /**
   * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
   * @return  the Graphics object belonging to this Shape object
   */
  "public function get graphics",function get$graphics()/* : Graphics*/ {
    if (!this[$_graphics]) {
      this[$_graphics] = createGraphics(this.getElement());
    }
    return this[$_graphics];
  },

  "override public function set transform",function set$transform(value/*:Transform*/)/*:void*/ {
    this[$transform] = value;
    var m/* : Matrix*/ = value.matrix;
    if (m) {
      this.graphics.renderingContext.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    }
  },

  "private var",{ _graphics/* : Graphics*/: undefined},
];},["createCanvas","createGraphics"]
);joo.classLoader.prepare("package flash.geom", ["import flash.geom.Point",""],

/**
 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate
 * space to another.
 */
"public class Matrix",function(Matrix,$$private){with(Matrix)with($$private)return[ 

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
  "public function Matrix",function $Matrix (a/*:Number*/, b/*:Number*/, c/*:Number*/, d/*:Number*/, tx/*:Number*/, ty/*:Number*/) {if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){a = 1;}b = 0;}c = 0;}d = 1;}tx = 0;}ty = 0;}this[$super]();
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  },

  /**
   * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
   */
  "public var",{ a/* : Number*/: undefined},
  /**
   * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
   */
  "public var",{ b/* : Number*/: undefined},
  /**
   * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
   */
  "public var",{ c/* : Number*/: undefined},
  /**
   * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
   */
  "public var",{ d/* : Number*/: undefined},
  /**
   * The distance by which to translate each point along the x axis.
   */
  "public var",{ tx/* : Number*/: undefined},
  /**
   * The distance by which to translate each point along the y axis.
   */
  "public var",{ ty/* : Number*/: undefined},

  /**
   * Returns a new Matrix object that is a copy of the current matrix.
   * @return a new Matrix object that is a copy of the current matrix.
   */
  "public function clone",function clone ()/* : Matrix*/ {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
  },

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
  "public function concat",function concat(m/* : Matrix*/)/* : void*/ {
    var a/* : Number*/ = this.a;
    var b/* : Number*/ = this.b;
    var c/* : Number*/ = this.c;
    var d/* : Number*/ = this.d;
    var tx/* : Number*/ = this.tx;
    var ty/* : Number*/ = this.ty;
    this.a  = m.a*a  + m.c*b;
    this.b  = m.b*a  + m.d*b;
    this.c  = m.a*c  + m.c*d;
    this.d  = m.b*c  + m.d*d;
    this.tx = m.a*tx + m.c*ty + m.tx;
    this.ty = m.b*tx + m.d*ty+m.ty;
  },

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
  "public function createBox",function createBox(scaleX/*:Number*/, scaleY/*:Number*/, rotation/*:Number*/, tx/*:Number*/, ty/*:Number*/)/* : void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){scaleX = 1;}scaleY = 1;}rotation = 0;}tx = 0;}ty = 0;}
    // all inlined for higher performance:
    if (rotation == 0) {
      this.a = this.d = 1;
      this.b = this.c = 0;
    } else {
      this.a = Math.cos(rotation);
      this.b = Math.sin(rotation);
      this.c = -this.b;
      this.d = this.a;
    }
    if (scaleX != 1) {
      this.a *= scaleX;
      this.c *= scaleY;
    }
    if (scaleY != 1) {
      this.b *= scaleY;
      this.d *= scaleY;
    }
    this.tx = tx;
    this.ty = ty;
  },

  "public static const",{ MAGIC_GRADIENT_FACTOR/*:Number*/ : 16384/10},

  /**
   * Creates the specific style of matrix expected by the beginGradientFill() method of the Graphics class.
   *
   * @param width
   * @param height
   * @param rotation
   * @param tx
   * @param ty
   */
  "public function createGradientBox",function createGradientBox (width/*:Number*/, height/*:Number*/, rotation/*:Number*/, tx/*:Number*/, ty/*:Number*/)/* : void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){width = NaN;}height = NaN;}rotation = 0;}tx = 0;}ty = 0;}
    this.createBox(width/MAGIC_GRADIENT_FACTOR, height/MAGIC_GRADIENT_FACTOR, rotation, tx + width/2, ty + height/2);
  },

  /**
   * Returns the result of applying the geometric transformation represented by the Matrix object to the
   * specified point.
   *
   * @param point The point for which you want to get the result of the Matrix transformation. 
   * @return The point resulting from applying the Matrix transformation. 
   */
  "public function transformPoint",function transformPoint(point/* : Point*/)/* : Point*/ {
    return new Point(this.a*point.x + this.c*point.y + this.tx, this.b*point.x + this.d*point.y + this.ty);
  },

  /**
   * Given a point in the pretransform coordinate space, returns the coordinates of that point after the
   * transformation occurs. Unlike the standard transformation applied using the transformPoint() method, the
   * deltaTransformPoint() method's transformation does not consider the translation parameters tx and ty.
   *
   * @param point The point for which you want to get the result of the matrix transformation.
   * @return The point resulting from applying the matrix transformation.
   */
  "public function deltaTransformPoint",function deltaTransformPoint(point/* : Point*/)/* : Point*/ {
    return new Point(this.a*point.x + this.c*point.y, this.b*point.x + this.d*point.y);
  },

  /**
   * Sets each matrix property to a value that causes a null transformation.
   */
  "public function identity",function identity ()/* : void*/ {
    this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
  },

  /**
   * Performs the opposite transformation of the original matrix.
   */
  "public function invert",function invert ()/* : void*/ {
    var a/* : Number*/ = this.a;
    var b/* : Number*/ = this.b;
    var c/* : Number*/ = this.c;
    var d/* : Number*/ = this.d;
    var tx/* : Number*/ = this.tx;
    var ty/* : Number*/ = this.ty;
    // Cremer's rule: inverse = adjugate / determinant
    // A-1 = adj(A) / det(A)
    var det/* : Number*/ = a*d - c*b;
    //     [a11 a12 a13]
    // A = [a21 a22 a23]
    //     [a31 a32 a33]
    // according to http://de.wikipedia.org/wiki/Inverse_Matrix#Formel_f.C3.BCr_3x3-Matrizen (sorry, German):
    //          [a22*a33-a32*a23 a13*a32-a12*a33 a12*a23-a13*a22]
    // adj(A) = [a23*a31-a21*a33 a11*a33-a13*a31 a13*a21-a11*a23]
    //          [a21*a32-a22*a31 a12*a31-a11*a32 a11*a22-a12*a21]
    // with a11 = a, a12 = c, a13 = tx,
    //      a21 = b, a22 = d, a23 = ty,
    //      a31 = 0, a32 = 0, a33 = 1:
    //          [d *1-0*ty  tx*0-c *1  c *ty-tx*d ]
    // adj(A) = [ty*0-b* 1  a *1-tx*0  tx* b-a *ty]
    //          [b *0-d* 0  c *0-a *0  a * d-c *b ]
    //          [ d -c  c*ty-tx*d]
    //        = [-b  a  tx*b-a*ty]
    //          [ 0  0  a*d -c*b ]
    this.a = d/det;
    this.b = -b/det;
    this.c = -c/det;
    this.d = a/det;
    this.tx = (c*ty-tx*d)/det;
    this.ty = (tx*b-a*ty)/det;
  },

  /**
   * A transformation that moves an object along the x and y axes.
   *
   * @param dx
   * @param dy
   */
  "public function translate",function translate (dx/*:Number*/, dy/*:Number*/)/* : void*/ {
    this.tx += dx; this.ty += dy;
  },

  /**
   * Applies a scaling transformation to the matrix.
   *
   * @param sx
   * @param sy
   */
  "public function scale",function scale (sx/*:Number*/, sy/*:Number*/)/* : void*/ {
    if (sx != 1) {
      this.a *= sx;
      this.c *= sx;
    }
    if (sy != 1) {
      this.b *= sy;
      this.d *= sy;
    }
  },

  /**
   * Applies a rotation transformation to the Matrix object.
   *
   * @param angle
   */
  "public function rotate",function rotate (angle/*:Number*/)/* : void*/ {
    if (angle!=0) {
      var cos/* : Number*/ = Math.cos(angle);
      var sin/* : Number*/ = Math.sin(angle);
      var a/* : Number*/ = this.a;
      var b/* : Number*/ = this.b;
      var c/* : Number*/ = this.c;
      var d/* : Number*/ = this.d;
      this.a   = a*cos  - c*sin;
      this.b   = a*sin  + c*cos;
      this.c   = b*cos  - d*sin;
      this.d   = b*sin  + d*cos;
    }
  },

  /**
   * Returns a text value listing the properties of this Matrix object.
   * @return
   */
  "public function toString",function toString ()/* : String*/ {
    return "("+["a="+this.a,"b="+this.b,"c="+this.c,"d="+this.d,"tx="+this.tx,"ty="+this.ty].join(", ")+")";
  },

];},[]
);joo.classLoader.prepare("package flash.net", [""],

/**
 * The URLRequestMethod class provides values that specify whether the URLRequest object should use the POST method
 * or the GET method when sending data to a server.
 * @see URLRequest
 * @see URLVariables 
 */
"public class URLRequestMethod",function(URLRequestMethod,$$private){with(URLRequestMethod)with($$private)return[ 

  /**
   * Specifies that the URLRequest object is a GET.
   */
  "public static const",{ GET/* : String*/ : "GET"},

  /**
   * Specifies that the URLRequest object is a POST.
   */
  "public static const",{ POST/* : String*/ : "POST"},

];},[]
);joo.classLoader.prepare("package flash.display", ["import flash.display.BitmapData",

"import js.Element",
"import flash.display.DisplayObject",""],

"public class Bitmap extends flash.display.DisplayObject",function(Bitmap,$$private){with(Bitmap)with($$private)return[ 

  /**
   * Initializes a Bitmap object to refer to the specified BitmapData object.
   *
   * @param bitmapData (default = null) The BitmapData object being referenced.
   * @param pixelSnapping (default = "auto") Whether or not the Bitmap object is snapped to the nearest pixel.
   * @param smoothing (default = false) Whether or not the bitmap is smoothed when scaled.
   */
  "public function Bitmap",function $Bitmap(bitmapData/* : BitmapData*/, pixelSnapping/* : String*/, smoothing/* : Boolean*/) {if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){bitmapData = null;}pixelSnapping = "auto";}smoothing = false;}
    this[$_bitmapData] = bitmapData;
    this[$super]();
    this[$_pixelSnapping] = pixelSnapping;
    this[$_smoothing] = smoothing;
  },

  "override protected function createElement",function createElement()/* : Element*/ {
    return this[$_bitmapData].canvas;
  },

  /**
   * The BitmapData object being referenced.
   * @return the BitmapData object being referenced.
   */
  "public function get bitmapData",function get$bitmapData()/* : BitmapData*/ {
    return this[$_bitmapData];
  },

  "public function set bitmapData",function set$bitmapData(value/* : BitmapData*/)/* : void*/ {
    this[$_bitmapData] = value;
  },

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
  "public function get pixelSnapping",function get$pixelSnapping()/* : String*/ {
    return this[$_pixelSnapping];
  },

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
  "public function set pixelSnapping",function set$pixelSnapping(value/* : String*/)/* : void*/ {
    this[$_pixelSnapping] = value;
  },

  /**
   * Returns whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   * @return whether or not the bitmap is smoothed when scaled.
   */
  "public function get smoothing",function get$smoothing()/*:Boolean*/ {
    return this[$_smoothing];
  },

  /**
   * Controls whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   */
  "public function set smoothing",function set$smoothing(value/* : Boolean*/)/* : void*/ {
    this[$_smoothing] = value;
  },

  "private var",{ _bitmapData/* : BitmapData*/: undefined},
  "private var",{ _pixelSnapping/* : String*/: undefined},
  "private var",{ _smoothing/* : Boolean*/: undefined},

];},[]
);joo.classLoader.prepare("package flash.events", [

"import flash.events.Event",""],

"public class TimerEvent extends Event",function(TimerEvent,$$private){with(TimerEvent)with($$private)return[ 

  "public static const",{ TIMER/* : String*/ : "timer"},
  "public static const",{ TIMER_COMPLETE/*:String*/ : "timerComplete"},

  "public function TimerEvent",function $TimerEvent(type/* : String*/, bubbles/* : Boolean*/, cancelable/* : Boolean*/) {if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}
    this[$super](type, bubbles, cancelable);
  },

  "override public function clone",function clone()/* : Event*/ {
    return new TimerEvent(this.type, this.bubbles, this.cancelable);
  },

  "override public function toString",function toString()/* : String*/ {
    return this.formatToString("TimerEvent", "type", "bubbles", "cancelable");
  },

  "public function updateAfterEvent",function updateAfterEvent()/* : void*/ {
    // TODO
  },
];},[]
);joo.classLoader.prepare("package flash.display", [

"import js.Element",
"import js.HTMLCanvasElement",
"import flash.display.Graphics",
"import flash.display.DisplayObjectContainer",
"import flash.display.Shape",
"import flash.geom.Transform",
"import flash.geom.Matrix",""],

/**
 * The Sprite class is a basic display list building block: a display list node that can display graphics and can also
 * contain children.
 * A Sprite object is similar to a movie clip, but does not have a timeline. Sprite is an appropriate base class for
 * objects that do not require timelines. For example, Sprite would be a logical base class for user interface (UI)
 * components that typically do not use the timeline.
 * The Sprite class is new in ActionScript 3.0. It provides an alternative to the functionality of the MovieClip class,
 * which retains all the functionality of previous ActionScript releases to provide backward compatibility.
 */
"public class Sprite extends DisplayObjectContainer",function(Sprite,$$private){with(Sprite)with($$private)return[ 

  /**
   * Creates a new Sprite instance. After you create the Sprite instance, call the
   * <code>DisplayObjectContainer.addChild()</code> or <code>DisplayObjectContainer.addChildAt()</code>
   * method to add the Sprite to a parent DisplayObjectContainer. 
   * @see flash.display.DisplayObjectContainer#addChildAt()
   */
  "public function Sprite",function $Sprite() {
    this[$super]();
  },

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
  "public function get graphics",function get$graphics()/* : Graphics*/ {
    if (!this[$_graphics]) {
      var canvas/* : HTMLCanvasElement*/ = Shape.createCanvas();
      var element/* : Element*/ = this.getElement();
      if (element.firstChild) {
        element.insertBefore(canvas, element.firstChild);
      } else {
        element.appendChild(canvas);
      }
      this[$_graphics] = new Graphics(canvas.getContext("2d"));
    }
    return this[$_graphics];
  },

  "override public function set transform",function set$transform(value/*:Transform*/)/*:void*/ {
    this[$transform] = value;
    var m/* : Matrix*/ = value.matrix;
    if (m) {
      this.graphics.renderingContext.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    }
  },

  "private var",{ _graphics/* : Graphics*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.events", [""],
"public class Event extends Object",function(Event,$$private){with(Event)with($$private)return[


  "public function Event",function $Event(type/* : String*/, bubbles/* : Boolean*/, cancelable/* : Boolean*/) {if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}this[$super]();
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  },

  "public var",{ type/* : String*/: undefined},

  "public var",{ bubbles/* : Boolean*/: undefined},

  "public var",{ cancelable/* : Boolean*/: undefined},

  "public var",{ eventPhase/* : uint*/: undefined},

  "public var",{ target/* : Object*/: undefined},

  "public var",{ currentTarget/* : Object*/: undefined},

  "public function preventDefault",function preventDefault()/* : void*/ {
    if (this.cancelable) {
      this[$defaultPrevented] = true;
    }
  },

  "public function isDefaultPrevented",function isDefaultPrevented()/* : Boolean*/ {
    return this[$defaultPrevented];
  },

  "public function formatToString",function formatToString(className/* : String, ... rest*/)/* : String*/ {var rest=Array.prototype.slice.call(arguments,1);
    var sb/* : Array*/ = ["[", className, " "];
    for (var i/* :uint*/ = 0; i < rest.length; ++i) {
      sb.push(rest[i],"=",this[rest[i]]," ");
    }
    sb.push("]");
    return sb.join("");
  },

  "public function toString",function toString()/*:String*/ {
    return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
  },

  "public function stopPropagation",function stopPropagation()/* : void*/ {
    this[$propagationStopped] = true;
  },

  "public function isPropagationStopped",function isPropagationStopped()/* : Boolean*/ {
    return this[$propagationStopped];
  },

  "public function stopImmediatePropagation",function stopImmediatePropagation()/* : void*/ {
    this[$immediatePropagationStopped] = true;
  },

  "public function isImmediatePropagationStopped",function isImmediatePropagationStopped()/* : Boolean*/ {
    return this[$immediatePropagationStopped];
  },

  "public function clone",function clone()/* : Event*/ {
    return new Event(this.type, this.bubbles, this.cancelable);
  },

  "static public const",{ ENTER_FRAME/*:String*/ : "enterFrame"},

  "static public const",{ ID3/*:String*/ : "id3"},
  "static public const",{ SOUND_COMPLETE/*:String*/ : "soundComplete"},
  "static public const",{ INIT/*:String*/ : "init"},
  "static public const",{ RENDER/*:String*/ : "render"},
  "static public const",{ TAB_ENABLED_CHANGE/*:String*/ : "tabEnabledChange"},

  "static public const",{ ADDED_TO_STAGE/*:String*/ : "addedToStage"},
  "static public const",{ TAB_CHILDREN_CHANGE/*:String*/ : "tabChildrenChange"},
  "static public const",{ RESIZE/*:String*/ : "resize"},
  "static public const",{ CHANGE/*:String*/ : "change"},
  "static public const",{ COMPLETE/*:String*/ : "complete"},

  "static public const",{ FULLSCREEN/*:String*/ : "fullScreen"},
  "static public const",{ REMOVED/*:String*/ : "removed"},
  "static public const",{ CONNECT/*:String*/ : "connect"},
  "static public const",{ SCROLL/*:String*/ : "scroll"},
  "static public const",{ OPEN/*:String*/ : "open"},

  "static public const",{ CLOSE/*:String*/ : "close"},
  "static public const",{ MOUSE_LEAVE/*:String*/ : "mouseLeave"},
  "static public const",{ ADDED/*:String*/ : "added"},
  "static public const",{ TAB_INDEX_CHANGE/*:String*/ : "tabIndexChange"},
  "static public const",{ REMOVED_FROM_STAGE/*:String*/ : "removedFromStage"},

  "static public const",{ ACTIVATE/*:String*/ : "activate"},
  "static public const",{ DEACTIVATE/*:String*/ : "deactivate"},
  "static public const",{ CANCEL/*:String*/ : "cancel"},
  "static public const",{ SELECT/*:String*/ : "select"},
  "static public const",{ UNLOAD/*:String*/ : "unload"},

  "private var",{ defaultPrevented/* : Boolean*/ : false},
  "private var",{ propagationStopped/*:Boolean*/: undefined},
  "private var",{ immediatePropagationStopped/*:Boolean*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.display", [

"import js.CanvasRenderingContext2D",
"import js.CanvasGradient",
"import flash.display.CapsStyle",
"import flash.display.JointStyle",
"import flash.display.LineScaleMode",
"import flash.display.GradientType",
"import flash.geom.Matrix",
"import flash.geom.Point",
"import ArgumentError",""],

"public class Graphics",function(Graphics,$$private){with(Graphics)with($$private)return[function(){joo.classLoader.init(JointStyle,GradientType,CapsStyle,Matrix);}, 

  "private var",{ context/* : CanvasRenderingContext2D*/: undefined},
  "private var",{ insideFill/* : Boolean*/ : false},

  "public function Graphics",function $Graphics(context/* : CanvasRenderingContext2D*/) {this[$super]();
    this[$context] = context;
    // switch to Flash defaults:
    this[$context].moveTo(0, 0);
    this[$context].lineCap = CapsStyle.ROUND;
    this[$context].lineJoin = JointStyle.ROUND;
    this[$context].miterLimit = 3;
  },

  "internal function get renderingContext",function get$renderingContext()/* : CanvasRenderingContext2D*/ {
    return this[$context];
  },

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
  "public function lineStyle",function lineStyle(thickness/* : Number*/, color/* : uint*/, alpha/* : Number*/,
                            pixelHinting/* : Boolean*/, scaleMode/* : String*/ /*LineScaleMode.NORMAL*/,
                            caps/* : String*/,
                            joints/* : String*/, miterLimit/* : Number*/)/* : void*/ {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){thickness = NaN;}color = 0;}alpha = 1.0;}pixelHinting = false;}scaleMode = "normal";}caps = null;}joints = null;}miterLimit = 3;}
    if (!isNaN(thickness)) {
      this[$context].lineWidth = thickness || 1;
    }
    this[$context].strokeStyle = toRGBA(color, alpha);
    this[$context].lineCap = caps || CapsStyle.ROUND;
    this[$context].lineJoin = joints || JointStyle.ROUND;
    this[$context].miterLimit = miterLimit;
  },

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
  "public function lineGradientStyle",function lineGradientStyle(type/*:String*/, colors/*:Array*/, alphas/*:Array*/, ratios/*:Array*/, matrix/*:Matrix*/,
                                    spreadMethod/*:String*/, interpolationMethod/*:String*/,
                                    focalPointRatio/*:Number*/)/* : void*/ {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix = null;}spreadMethod = "pad";}interpolationMethod = "rgb";}focalPointRatio = 0;}
    this[$context].strokeStyle = this[$createGradientStyle](type, colors, alphas, ratios,
      matrix, spreadMethod, interpolationMethod, focalPointRatio);
  },

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
  "public function lineTo",function lineTo(x/* : Number*/, y/* : Number*/)/* : void*/ {
    this[$context].lineTo(x, y);
    if (!this[$insideFill]) {
      this[$context].stroke();
      this[$context].beginPath();
      this[$context].moveTo(x, y);
    }
  },

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
  "public function curveTo",function curveTo(controlX/*:Number*/, controlY/*:Number*/, anchorX/*:Number*/, anchorY/*:Number*/)/* : void*/ {
    this[$context].quadraticCurveTo(controlX, controlY, anchorX, anchorY);
    if (!this[$insideFill]) {
      this[$context].stroke();
    }
  },

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
  "public function drawCircle",function drawCircle(x/* : Number*/, y/* : Number*/, radius/* : Number*/)/* : void*/ {
    this[$context].moveTo(x + radius, y);
    this[$context].arc(x, y, radius, 0 , 2*Math.PI, false);
    if (this[$insideFill]) {
      this[$context].fill();
    }
    this[$context].stroke();
    this[$context].beginPath();
    this[$context].moveTo(x, y);
  },

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
  "public function drawRect",function drawRect(x/* : Number*/, y/* : Number*/, width/* : Number*/, height/* : Number*/)/* : void*/ {
    if (this[$insideFill]) {
      this[$context].fillRect(x, y, width, height);
    }
    this[$context].strokeRect(x, y, width, height);
  },

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
  "public function drawRoundRect",function drawRoundRect(x/* : Number*/, y/* : Number*/, width/* : Number*/, height/* : Number*/,
                                ellipseWidth/* : Number*/, ellipseHeight/* : Number*/)/* : void*/ {if(arguments.length<6){ellipseHeight = NaN;}
    if (ellipseHeight==0 || ellipseWidth==0) {
      return this.drawRect(x, y, width, height);
    }
    if (isNaN(ellipseHeight)) {
      ellipseHeight = ellipseWidth;
    }
    var x_lw/* : Number*/ = x + ellipseWidth;
    var x_r/*  : Number*/ = x + width;
    var x_rw/* : Number*/ = x_r - ellipseWidth;
    var y_tw/* : Number*/ = y + ellipseHeight;
    var y_b/*  : Number*/ = y + height;
    var y_bw/* : Number*/ = y_b - ellipseHeight;
    this[$context].beginPath();
    this[$context].moveTo(x_lw, y);
    this[$context].lineTo(x_rw, y);
    this[$context].quadraticCurveTo(x_r, y, x_r, y_tw);
    this[$context].lineTo(x_r, y_bw);
    this[$context].quadraticCurveTo(x_r, y_b, x_rw, y_b);
    this[$context].lineTo(x_lw, y_b);
    this[$context].quadraticCurveTo(x, y_b, x, y_bw);
    this[$context].lineTo(x, y_tw);
    this[$context].quadraticCurveTo(x, y, x_lw, y);
    this[$context].closePath();
    if (this[$insideFill]) {
      this[$context].fill();
    }
    this[$context].stroke();
  },

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
  "public function moveTo",function moveTo(x/* : Number*/, y/* : Number*/)/* : void*/ {
    this[$context].beginPath();
    this[$context].moveTo(x, y);
  },

  /**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings. 
   */
  "public function clear",function clear()/* : void*/ {
    this.lineStyle();
    this[$context].save();
    this[$context].setTransform(1,0,0,1,0,0);
    this[$context].fillStyle = "";
    this[$context].clearRect(0,0,this[$context].canvas.width, this[$context].canvas.height);
    this[$context].restore();
    this[$insideFill] = false;
    this[$context].moveTo(0, 0);
  },

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
  "public function beginFill",function beginFill(color/* : uint*/, alpha/* : Number*/)/* : void*/ {if(arguments.length<2){alpha = 1.0;}
    this[$_beginFill](toRGBA(color, alpha));
  },

  "private function _beginFill",function _beginFill(fillStyle/* : Object*/)/* : void*/ {
    this[$context].beginPath();
    this[$context].fillStyle = fillStyle;
    this[$insideFill] = true;
  },

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
  "public function beginGradientFill",function beginGradientFill(type/*:String*/, colors/*:Array*/, alphas/*:Array*/, ratios/*:Array*/,
                                    matrix/*:Matrix*/, spreadMethod/*:String*/,
                                    interpolationMethod/*:String*/, focalPointRatio/*:Number*/)/* : void*/ {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix = null;}spreadMethod = "pad";}interpolationMethod = "rgb";}focalPointRatio = 0;}
    this[$_beginFill](this[$createGradientStyle](type, colors, alphas, ratios,
      matrix, spreadMethod, interpolationMethod, focalPointRatio));
  },

  "private function createGradientStyle",function createGradientStyle(type/*:String*/, colors/*:Array*/, alphas/*:Array*/, ratios/*:Array*/,
                                       matrix/*:Matrix*/, spreadMethod/*:String*/,
                                       interpolationMethod/*:String*/, focalPointRatio/*:Number*/)/* : CanvasGradient*/ {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix = null;}spreadMethod = "pad";}interpolationMethod = "rgb";}focalPointRatio = 0;}
    // TODO: support spreadMethod != "pad" (medium), interpolationMethod == "rgb_linear" (hard)
    // TODO: check enumeration-typed parameters: throw new ArgumentError("<param-name>","2002");
    var gradient/* : CanvasGradient*/;
    var p0/* : Point*/ = new Point(0, 0);
    var p1/* : Point*/ = new Point(-Matrix.MAGIC_GRADIENT_FACTOR/2,0);
    var p2/* : Point*/ = type == GradientType.LINEAR
      ? new Point(0,-Matrix.MAGIC_GRADIENT_FACTOR/2)
      : new Point(Matrix.MAGIC_GRADIENT_FACTOR/2 * focalPointRatio, 0);
    if (matrix) {
      p0 = matrix.transformPoint(p0);
      p1 = matrix.transformPoint(p1);
      p2 = matrix.transformPoint(p2);
    }
    if (type == GradientType.LINEAR) {
      var x1/* : Number*/;
      var y1/* : Number*/;
      if (p2.x==p0.x) {
        x1 = p1.x;
        y1 = p1.y;
      } else if (p2.y==p0.y) {
        x1 = p1.x;
        y1 = p2.x;
      } else {
        var d/* : Number*/ = -(p2.x - p0.x) / (p2.y - p0.y);
        // d*(x1 - pm.x) + pm.y = -1/d*(x1 - px.x) + px.y =>
        x1 = (p1.x/d + p1.y + d*p0.x - p0.y) / (d + 1/d);
        y1 = d*(x1 - p0.x) + p0.y;
      }
      var x2/* : Number*/ = p0.x + (p0.x-x1);
      var y2/* : Number*/ = p0.y + (p0.y-y1);
      gradient = this[$context].createLinearGradient(x1, y1, x2, y2);
    } else { // type == GradientType.RADIAL
      // TODO: support squashed box, i.e. ellipse, not circle! But how? Somehow delegate transform to fill...
      var rx/* : Number*/ = p1.x - p0.x;
      var ry/* : Number*/ = p1.y - p0.y;
      // point distance with optimizations for two typical special cases:
      var r/* : Number*/ = rx==0 ? Math.abs(ry) : ry==0 ? Math.abs(rx) : Math.sqrt(rx*rx+ry*ry);
      gradient = this[$context].createRadialGradient(p2.x, p2.y, 0, p0.x, p0.y, r);
    }
    for (var i/*:uint*/ = 0; i < colors.length; ++i) {
      gradient.addColorStop(ratios[i] / 255, toRGBA(colors[i], alphas[i]));
    }
    return gradient;
  },

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
  "public function endFill",function endFill()/* : void*/ {
    this[$context].fill();
    this[$insideFill] = false;
  },

  "public static function toRGBA",function toRGBA(color/* : uint*/, alpha/* : Number*/)/* : String*/ {if(arguments.length<2){alpha = 1.0;}
    return "rgba("+[color >> 16, color >> 8 & 0xFF, color & 0xFF, alpha].join(",")+")";
  },
];},["toRGBA"]
);joo.classLoader.prepare("package joo.flash", [

"import flash.display.Stage",
"import joo.classLoader",
"import joo.DynamicClassLoader",
"import joo.getQualifiedObject",""],

"public class Run",function(Run,$$private){with(Run)with($$private)return[function(){joo.classLoader.init(classLoader);}, 

  "public static function main",function main(id/* : String*/, primaryDisplayObjectClassName/* : String*/)/* : void*/ {
    (classLoader).import_(primaryDisplayObjectClassName);
    (classLoader).complete(function joo$flash$Run$12_50()/* : void*/ {
      var stage/* : Stage*/ = new Stage(id);
      var primaryDisplayObjectClass/* : Class*/ = getQualifiedObject(primaryDisplayObjectClassName);
      stage.addChildAt(new primaryDisplayObjectClass(), 0);
    });
  },

];},["main"]
);joo.classLoader.prepare("package flash.display", [""],
/**
 * The JointStyle class is an enumeration of constant values that specify the joint style to use in drawing lines.
 * @see flash.display.Graphics#lineStyle()
 */
"public class JointStyle",function(JointStyle,$$private){with(JointStyle)with($$private)return[ 
  /**
   * Specifies beveled joints in the joints parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ BEVEL/* : String*/ : "bevel"},
  /**
   * Specifies mitered joints in the joints parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ MITER/* : String*/ : "miter"},
  /**
   * Specifies round joints in the joints parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ ROUND/* : String*/ : "round"},

];},[]
);joo.classLoader.prepare("package flash.utils", [""],

"public class Dictionary",function(Dictionary,$$private){with(Dictionary)with($$private)return[ 

  "public function Dictionary",function $Dictionary(weak/* : Boolean*/) {if(arguments.length<1){weak = false;}this[$super]();
  },
];},[]

);joo.classLoader.prepare("package flash.display", ["import flash.display.DisplayObject",

"import flash.display.InteractiveObject",""],

/**
 * The DisplayObjectContainer class is the base class for all objects that can serve as display object containers on
 * the display list. The display list manages all objects displayed in Flash Player. Use the DisplayObjectContainer
 * class to arrange the display objects in the display list. Each DisplayObjectContainer object has its own child list
 * for organizing the z-order of the objects. The z-order is the front-to-back order that determines which object is
 * drawn in front, which is behind, and so on.
 * <p>The DisplayObjectContainer class is an abstract base class for all objects that can contain child objects.
 * It cannot be instantiated directly; calling the new DisplayObjectContainer() constructor throws an ArgumentError
 * exception.
 * <p>For more information, see the "Display Programming" chapter of the Programming ActionScript 3.0 book.
 * @see flash.display.DisplayObject
 */
"public class DisplayObjectContainer extends flash.display.InteractiveObject",function(DisplayObjectContainer,$$private){with(DisplayObjectContainer)with($$private)return[ 

  /**
   * Calling the new DisplayObjectContainer() constructor throws an ArgumentError exception. You can, however, call
   * constructors for the following subclasses of DisplayObjectContainer:
   * <ul>
   *   <li>new Loader()
   *   <li>new Sprite()
   *   <li>new MovieClip()
   * </ul>
   */
  "public function DisplayObjectContainer",function $DisplayObjectContainer() {
    this[$super]();
    this[$children] = [];
  },

  /**
   * Returns the number of children of this object.
   * <p><b>Example</b></p>
   * <p>The following example sets up two Sprite objects named container1 and container2. A Sprite is a type of display
   * object container. The example calls the addChild() method to set up the display hierarchy: container1 is a child
   * of container2, and two other display objects, circle1 and circle2, are children of container1. The calls to the
   * trace() method show the number of children of each object. Note that grandchildren are not included in the
   * numChildren count:
   * <pre>
import flash.display.Sprite;

var container1:Sprite = new Sprite();
var container2:Sprite = new Sprite();

var circle1:Sprite = new Sprite();
circle1.graphics.beginFill(0xFFCC00);
circle1.graphics.drawCircle(40, 40, 40);

var circle2:Sprite = new Sprite();
circle2.graphics.beginFill(0x00CCFF);
circle2.graphics.drawCircle(80, 40, 40);

container2.addChild(container1);
container1.addChild(circle1);
container1.addChild(circle2);

trace(container1.numChildren); // 2
trace(container2.numChildren); // 1
trace(circle1.numChildren); // 0
trace(circle2.numChildren); // 0
</pre>
   * @return the number of children of this object.
   */
  "public function get numChildren",function get$numChildren()/* : int*/ {
    return this[$children].length;
  },

  /**
   * Adds a child DisplayObject instance to this DisplayObjectContainer instance. The child is added to the front (top)
   * of all other children in this DisplayObjectContainer instance. (To add a child to a specific index position, use
   * the addChildAt() method.)
   * <p>If you add a child object that already has a different display object container as a parent, the object is
   * removed from the child list of the other display object container.
   * @event added {Event} Dispatched when a display object is added to the display list.
   * @throws ArgumentError if the child is the same as the parent. Also throws if the caller is a child
   *   (or grandchild etc.) of the child being added.
   * <p><b>Example</b></p>
   * <p>The following example sets up two Sprite objects named container1 and container2. A Sprite is a type of display
   * object container. The example calls the addChild() method to set up the display hierarchy: container1 is a child
   * of container2, and two other display objects, circle1 and circle2, are children of container1. The calls to the
   * trace() method show the number of children of each object. Note that grandchildren are not included in the
   * numChildren count:
   * <pre>
import flash.display.Sprite;

var container1:Sprite = new Sprite();
var container2:Sprite = new Sprite();

var circle1:Sprite = new Sprite();
circle1.graphics.beginFill(0xFFCC00);
circle1.graphics.drawCircle(40, 40, 40);

var circle2:Sprite = new Sprite();
circle2.graphics.beginFill(0x00CCFF);
circle2.graphics.drawCircle(80, 40, 40);

container2.addChild(container1);
container1.addChild(circle1);
container1.addChild(circle2);

trace(container1.numChildren); // 2
trace(container2.numChildren); // 1
trace(circle1.numChildren); // 0
trace(circle2.numChildren); // 0
</pre>
   * @param child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
   * @return The DisplayObject instance that you pass in the child parameter.
   * @see #addChildAt()
   */
  "public function addChild",function addChild(child/* : DisplayObject*/)/* : DisplayObject*/ {
    return this.addChildAt(child, this[$children].length);
  },

  /**
   * Adds a child DisplayObject instance to this DisplayObjectContainer instance. The child is added at the index
   * position specified. An index of 0 represents the back (bottom) of the display list for this DisplayObjectContainer
   * object.
   * <p>For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 2,
   * and 1, respectively.
   * <p>If you add a child object that already has a different display object container as a parent, the object is
   * removed from the child list of the other display object container.
   * @event added {Event} Dispatched when a display object is added to the display list.
   * @throws RangeError if the index position does not exist in the child list.
   * @throws ArgumentError if the child is the same as the parent. Also throws if the caller is a child (or
   *   grandchild etc.) of the child being added.
   * <p><b>Example</b></p>
   * The following example creates a container display object container and adds a display objects circle1 to its
   * display list. Then, by calling container.addChildAt(circle2, 0), it adds the circle2 object to index position zero
   * (the back), and moves the circle1 object to index position 1:
   * <pre>
import flash.display.Sprite;

var container:Sprite = new Sprite();

var circle1:Sprite = new Sprite();
var circle2:Sprite = new Sprite();

container.addChild(circle1);
container.addChildAt(circle2, 0);

trace(container.getChildAt(0) == circle2); // true
trace(container.getChildAt(1) == circle1); // true
</pre>
   * @param child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
   * @param index The index position to which the child is added. If you specify a currently occupied index position,
   *   the child object that exists at that position and all higher positions are moved up one position in the child
   *   list.
   * @return The DisplayObject instance that you pass in the child parameter.
   * @see #addChild()
   */
  "public function addChildAt",function addChildAt(child/* : DisplayObject*/, index/* : int*/)/* : DisplayObject*/ {
    var refChild/* : DisplayObject*/ = this[$children][index];
    this[$children].splice(index, 0, child);
    child.parent = this;
    if (refChild) {
      this.getElement().insertBefore(child.getElement(), refChild.getElement());
    } else {
      this.getElement().appendChild(child.getElement());
    }
    return child;
  },

  /**
   * Returns the child display object instance that exists at the specified index.
   * @throws RangeError if the index does not exist in the child list.
   * @throws SecurityError This child display object belongs to a sandbox to which you do not have access.
   *   You can avoid this situation by having the child movie call Security.allowDomain().
   * <p><b>Example</b></p>
   * <p>The following example creates a display object container named container and then adds a three display objects
   * to the child list of the container object. The calls to the getChildAt() method then reveal the positions of the
   * child objects:
   * <pre>
import flash.display.Sprite;

var container:Sprite = new Sprite();

var sprite1:Sprite = new Sprite();
var sprite2:Sprite = new Sprite();
var sprite3:Sprite = new Sprite();

container.addChild(sprite1);
container.addChild(sprite2);
container.addChildAt(sprite3, 0);

trace(container.getChildAt(0) == sprite3); // true
trace(container.getChildAt(1) == sprite1); // true
trace(container.getChildAt(2) == sprite2); // true
</pre>
   * @param index The index position of the child object.
   * @return The child display object at the specified index position.
   * @see #getChildByName()
   */
  "public function getChildAt",function getChildAt(index/* : int*/)/* : DisplayObject*/ {
    return this[$children][index];
  },

  "private var",{ children/* : Array*/: undefined}/*<DisplayObject>*/,
];},[]
);joo.classLoader.prepare("package flash.display",
[
	"import flash.display.DisplayObject",/*
	//import flash.ui.ContextMenu;
	//import flash.accessibility.AccessibilityImplementation;

	/**
	 * Dispatched when the value of the object's tabIndex property changes.
	 * @eventType flash.events.Event.TAB_INDEX_CHANGE
	 * /
	[Event(name="tabIndexChange", type="flash.events.Event")] 

	/**
	 * Dispatched when the object's tabEnabled flag changes.
	 * @eventType flash.events.Event.TAB_ENABLED_CHANGE
	 * /
	[Event(name="tabEnabledChange", type="flash.events.Event")] 

	/**
	 * Dispatched when the value of the object's tabChildren flag changes.
	 * @eventType flash.events.Event.TAB_CHILDREN_CHANGE
	 * /
	[Event(name="tabChildrenChange", type="flash.events.Event")] 

	/**
	 * Dispatched when the user releases a key.
	 * @eventType flash.events.KeyboardEvent.KEY_UP
	 * /
	[Event(name="keyUp", type="flash.events.KeyboardEvent")] 

	/**
	 * Dispatched when the user presses a key.
	 * @eventType flash.events.KeyboardEvent.KEY_DOWN
	 * /
	[Event(name="keyDown", type="flash.events.KeyboardEvent")] 

	/**
	 * Dispatched when the user moves a pointing device over an InteractiveObject instance.
	 * @eventType flash.events.MouseEvent.ROLL_OVER
	 * /
	[Event(name="rollOver", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when the user moves a pointing device away from an InteractiveObject instance.
	 * @eventType flash.events.MouseEvent.ROLL_OUT
	 * /
	[Event(name="rollOut", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a mouse wheel is spun over an InteractiveObject instance in the Flash Player window.
	 * @eventType flash.events.MouseEvent.MOUSE_WHEEL
	 * /
	[Event(name="mouseWheel", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a user releases the pointing device button over an InteractiveObject instance in the Flash Player window.
	 * @eventType flash.events.MouseEvent.MOUSE_UP
	 * /
	[Event(name="mouseUp", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when the user moves a pointing device over an InteractiveObject instance in the Flash Player window.
	 * @eventType flash.events.MouseEvent.MOUSE_OVER
	 * /
	[Event(name="mouseOver", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when the user moves a pointing device away from an InteractiveObject instance.
	 * @eventType flash.events.MouseEvent.MOUSE_OUT
	 * /
	[Event(name="mouseOut", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a user moves the pointing device while it is over an InteractiveObject.
	 * @eventType flash.events.MouseEvent.MOUSE_MOVE
	 * /
	[Event(name="mouseMove", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a user presses the pointing device button over an InteractiveObject instance in the Flash Player window.
	 * @eventType flash.events.MouseEvent.MOUSE_DOWN
	 * /
	[Event(name="mouseDown", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a user presses and releases the main button of a pointing device twice in rapid succession over the same InteractiveObject when that object's doubleClickEnabled flag is set to true.
	 * @eventType flash.events.MouseEvent.DOUBLE_CLICK
	 * /
	[Event(name="doubleClick", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when a user presses and releases the main button of the user's pointing device over the same InteractiveObject.
	 * @eventType flash.events.MouseEvent.CLICK
	 * /
	[Event(name="click", type="flash.events.MouseEvent")] 

	/**
	 * Dispatched when the user attempts to change focus by using a pointer device.
	 * @eventType flash.events.FocusEvent.MOUSE_FOCUS_CHANGE
	 * /
	[Event(name="mouseFocusChange", type="flash.events.FocusEvent")] 

	/**
	 * Dispatched when the user attempts to change focus by using keyboard navigation.
	 * @eventType flash.events.FocusEvent.KEY_FOCUS_CHANGE
	 * /
	[Event(name="keyFocusChange", type="flash.events.FocusEvent")] 

	/**
	 * Dispatched after a display object loses focus.
	 * @eventType flash.events.FocusEvent.FOCUS_OUT
	 * /
	[Event(name="focusOut", type="flash.events.FocusEvent")] 

	/**
	 * Dispatched after a display object gains focus.
	 * @eventType flash.events.FocusEvent.FOCUS_IN
	 * /
	[Event(name="focusIn", type="flash.events.FocusEvent")]*/""], 

	/// The InteractiveObject class is the abstract base class for all display objects with which the user can interact, using the mouse and keyboard.
	"public class InteractiveObject extends flash.display.DisplayObject",function(InteractiveObject,$$private){with(InteractiveObject)with($$private)return[
	
//		public function get accessibilityImplementation () : AccessibilityImplementation;
//		public function set accessibilityImplementation (value:AccessibilityImplementation) : void;

		/// Specifies the context menu associated with this object.
//		public function get contextMenu () : ContextMenu;
//		public function set contextMenu (cm:ContextMenu) : void;

		/// Specifies whether the object receives doubleClick events.
//		public function get doubleClickEnabled () : Boolean;
//		public function set doubleClickEnabled (enabled:Boolean) : void;

		/// Specifies whether this object displays a focus rectangle.
//		public function get focusRect () : Object;
//		public function set focusRect (focusRect:Object) : void;

		/// Specifies whether this object receives mouse messages.
//		public function get mouseEnabled () : Boolean;
//		public function set mouseEnabled (enabled:Boolean) : void;

		/// Specifies whether this object is in the tab order.
//		public function get tabEnabled () : Boolean;
//		public function set tabEnabled (enabled:Boolean) : void;

		/// Specifies the tab ordering of objects in a SWF file.
//		public function get tabIndex () : int;
//		public function set tabIndex (index:int) : void;

		/// Calling the new InteractiveObject() constructor throws an ArgumentError exception.
		"public function InteractiveObject",function $InteractiveObject () {
      this[$super]();
      // TODO
    },
	];},[]
);joo.classLoader.prepare("package flash.display", [""],

/**
 * The IBitmapDrawable interface is implemented by objects that can be passed as the source parameter of the
 * draw() method of the BitmapData class. These objects are of type BitmapData or DisplayObject.
 * 
 * @see flash.display.BitmapData#draw()
 * @see flash.display.BitmapData
 * @see flash.display.DisplayObject
 */
"public interface IBitmapDrawable",function(IBitmapDrawable,$$private){with(IBitmapDrawable)with($$private)return[ 

];},[]
);joo.classLoader.prepare("package flash.text", [""],

/**
 * The TextFormat class represents character formatting information.
 */
"public class TextFormat extends Object",function(TextFormat,$$private){with(TextFormat)with($$private)return[ 

  /**
   * Creates a TextFormat object with the specified properties.
   */
  "public function TextFormat",function $TextFormat(font/*:String*/, size/*:Object*/, color/*:Object*/,
                             bold/*:Object*/, italic/*:Object*/, underline/*:Object*/,
                             url/*:String*/, target/*:String*/, align/*:String*/,
                             leftMargin/*:Object*/, rightMargin/*:Object*/,
                             indent/*:Object*/, leading/*:Object*/) {if(arguments.length<13){if(arguments.length<12){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){font = null;}size = null;}color = null;}bold = null;}italic = null;}underline = null;}url = null;}target = null;}align = null;}leftMargin = null;}rightMargin = null;}indent = null;}leading = null;}this[$super]();
    this.align = align;
    this.blockIndent = this.blockIndent;
    this.bold = bold;
    this.bullet = this.bullet;
    this.color = color;
    this.display = this.display;
    this.font = font;
    this.indent = indent;
    this.italic = italic;
    this.kerning = this.kerning;
    this.leading = leading;
    this.leftMargin = leftMargin;
    this.letterSpacing = this.letterSpacing;
    this.rightMargin = rightMargin;
    this.size = size;
    this.tabStops = this.tabStops;
    this.target = target;
    this.underline = underline;
    this.url = url;
  },

  /** Indicates the alignment of the paragraph. */
  "public var",{ align/* : String*/: undefined},

  /** Indicates the block indentation in pixels. */
  "public var",{ blockIndent/* : Object*/: undefined},

  /** Specifies whether the text is boldface. */
  "public var",{ bold/* : Object*/: undefined},

  /** Indicates that the text is part of a bullet list. */
  "public var",{ bullet/* : Object*/: undefined},

  /** Indicates the color of the text. */
  "public var",{ color/* : Object*/: undefined},

  "public var",{ display/* : String*/: undefined},

  /** The name of the font for text in this text format, as a string. */
  "public var",{ font/* : String*/: undefined},

  /** Indicates the indentation from the left margin to the first character in the paragraph. */
  "public var",{ indent/* : Object*/: undefined},

  /** Indicates whether text in this text format is italicized. */
  "public var",{ italic/* : Object*/: undefined},

  /** A Boolean value that indicates whether kerning is enabled (true) or disabled (false). */
  "public var",{ kerning/* : Object*/: undefined},

  /** An integer representing the amount of vertical space (called leading) between lines. */
  "public var",{ leading/* : Object*/: undefined},

  /** The left margin of the paragraph, in pixels. */
  "public var",{ leftMargin/* : Object*/: undefined},

  /** A number representing the amount of space that is uniformly distributed between all characters. */
  "public var",{ letterSpacing/* : Object*/: undefined},

  /** The right margin of the paragraph, in pixels. */
  "public var",{ rightMargin/* : Object*/: undefined},

  /** The point size of text in this text format. */
  "public var",{ size/* : Object*/: undefined},

  /** Specifies custom tab stops as an array of non-negative integers. */
  "public var",{ tabStops/* : Array*/: undefined},

  /** Indicates the target window where the hyperlink is displayed. */
  "public var",{ target/* : String*/: undefined},

  /** Indicates whether the text that uses this text format is underlined (true) or not (false). */
  "public var",{ underline/* : Object*/: undefined},

  /** Indicates the target URL for the text in this text format. */
  "public var",{ url/* : String*/: undefined},

];},[]
);joo.classLoader.prepare("package flash.display", [""],

/**
 * The PixelSnapping class is an enumeration of constant values for setting the pixel snapping options by
 * using the pixelSnapping property of a Bitmap object.
 */
"public class PixelSnapping",function(PixelSnapping,$$private){with(PixelSnapping)with($$private)return[ 
  /**
   * A constant value used in the pixelSnapping property of a Bitmap object to specify that the bitmap image is
   * always snapped to the nearest pixel, independent of any transformation.
   */
  "public static const",{ ALWAYS/* : String*/ : "always"},
  /**
   * A constant value used in the pixelSnapping property of a Bitmap object to specify that the bitmap image is
   * snapped to the nearest pixel if it is drawn with no rotation or skew and it is drawn at a scale factor of
   * 99.9% to 100.1%.
   */
  "public static const",{ AUTO/* : String*/ : "auto"},
  /**
   * A constant value used in the pixelSnapping property of a Bitmap object to specify that no pixel snapping
   * occurs.
   */
  "public static const",{ NEVER/* : String*/ : "never"},

];},[]
);joo.classLoader.prepare("package flash.events", [

"import flash.events.IEventDispatcher",
"import flash.events.Event",/*

/**
 * Dispatched when Flash Player gains operating system focus and becomes active.
 * <p>Defines the value of the type property of an activate event object.
 * <p>Note: This event does not go through a "capture phase" and is dispatched directly to the target, whether the
 * target is on the display list or not.
 * <p>This event has the following properties:
 * <ul>
 * <li>bubbles	false
 * <li>cancelable	false; there is no default behavior to cancel.
 * <li>currentTarget	The object that is actively processing the Event object with an event listener.
 * <li>target	Any DisplayObject instance with a listener registered for the activate event.
 * </ul>
 * /
[Event(name="activate",type="flash.events.Event")]

/**
 * Dispatched when Flash Player loses operating system focus and is becoming inactive.
 * <p>Defines the value of the type property of a deactivate event object.
 * <p>Note: This event does not go through a "capture phase" and is dispatched directly to the target, whether the
 * target is on the display list or not.
 * <p>This event has the following properties:
 * <ul>
 * <li>bubbles	false
 * <li>cancelable	false; there is no default behavior to cancel.
 * <li>currentTarget	The object that is actively processing the Event object with an event listener.
 * <li>target	Any DisplayObject instance with a listener registered for the deactivate event.
 * </ul>
 * /
[Event(name="deactivate",type="flash.events.Event")]*/""],

/**
 * The EventDispatcher class implements the IEventDispatcher interface and is the base class for the DisplayObject
 * class. The EventDispatcher class allows any object on the display list to be an event target and as such, to use the
 * methods of the IEventDispatcher interface.
 * <p>Event targets are an important part of the Flash� Player event model. The event target serves as the focal point
 * for how events flow through the display list hierarchy. When an event such as a mouse click or a keypress occurs,
 * Flash Player dispatches an event object into the event flow from the root of the display list. The event object then
 * makes its way through the display list until it reaches the event target, at which point it begins its return trip
 * through the display list. This round-trip journey to the event target is conceptually divided into three phases:
 * the capture phase comprises the journey from the root to the last node before the event target's node, the target
 * phase comprises only the event target node, and the bubbling phase comprises any subsequent nodes encountered on the
 * return trip to the root of the display list.
 * <p>In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend
 * EventDispatcher. If this is impossible (that is, if the class is already extending another class), you can instead
 * implement the IEventDispatcher interface, create an EventDispatcher member, and write simple hooks to route calls
 * into the aggregated EventDispatcher.
 */
"public class EventDispatcher extends Object implements IEventDispatcher",function(EventDispatcher,$$private){with(EventDispatcher)with($$private)return[ 

  /**
   * Aggregates an instance of the EventDispatcher class.
   * <p>The EventDispatcher class is generally used as a base class, which means that most developers do not need to
   * use this constructor function. However, advanced developers who are implementing the IEventDispatcher interface
   * need to use this constructor. If you are unable to extend the EventDispatcher class and must instead implement the
   * IEventDispatcher interface, use this constructor to aggregate an instance of the EventDispatcher class.
   * @param target (default = null) The target object for events dispatched to the EventDispatcher object.
   *   This parameter is used when the EventDispatcher instance is aggregated by a class that implements
   *   IEventDispatcher; it is necessary so that the containing object can be the target for events. Do not use this
   *   parameter in simple cases in which a class extends EventDispatcher.
   */
  "public function EventDispatcher",function $EventDispatcher(target/* : IEventDispatcher*/) {if(arguments.length<1){target = null;}this[$super]();
    this[$target] = target;
    this[$captureListeners] = {};
    this[$listeners] = {};
  },

  "public function dispatchEvent",function dispatchEvent(event/* : flash.events.Event*/)/* : Boolean*/ {
    event.target = this[$target] || this;
    var listeners/* : Array*/ = this[$listeners][event.type];
    if (listeners) {
      for (var i/* : int*/ = 0; i<listeners.length; ++i) {
        if (listeners[i](event)===false) {
          event.stopPropagation();
          event.preventDefault();
        }
        if (event.isImmediatePropagationStopped()) {
          return false;
        }
      }
    }
    return event.isDefaultPrevented();
  },

  "public function willTrigger",function willTrigger(type/* : String*/)/* : Boolean*/ {
    return this.hasEventListener(type);
  },

  "public function addEventListener",function addEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean*/, priority/* : int*/, useWeakReference/* : Boolean*/)/* : void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture = false;}priority = 0;}useWeakReference = false;}
    var listenersByType/* : Object*/ = useCapture ? this[$captureListeners] : this[$listeners];
    if (!(type in listenersByType)) {
      listenersByType[type] = [ listener ];
    } else {
      listenersByType[type].push(listener);
    }
  },

  "public function removeEventListener",function removeEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean*/)/* : void*/ {if(arguments.length<3){useCapture = false;}
    var listenersByType/* : Object*/ = useCapture ? this[$captureListeners] : this[$listeners];
    var listeners/* : Array*/ = listenersByType[type];
    if (listeners) {
      for (var i/* : int*/ = 0; i<listeners.length; ++i) {
        if (listeners[i]==listener) {
          if (listeners.length==1) {
            delete listenersByType[type];
          } else {
            listeners.splice(i,1);
          }
          return;
        }
      }
    }
  },

  "public function hasEventListener",function hasEventListener(type/* : String*/)/* : Boolean*/ {
    return this[$listeners][type] || this[$captureListeners][type];
  },

  "public function toString",function toString()/* : String*/ {
    return ["EventDispatcher[target=",this[$target],"]"].join("");
  },

  "private var",{ captureListeners/* : Object*/: undefined}/*<String,Array>*/,
  "private var",{ listeners/* : Object*/: undefined}/*<String,Array>*/,
  "private var",{ target/* : IEventDispatcher*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.display", [""],

/** The GradientType class provides values for the type parameter in the beginGradientFill() and lineGradientStyle() methods of the flash.display.Graphics class. */
"public class GradientType extends Object",function(GradientType,$$private){with(GradientType)with($$private)return[ 

  /** Value used to specify a linear gradient fill. */
  "public static const",{ LINEAR/* : String*/ : "linear"},

  /** Value used to specify a radial gradient fill. */
  "public static const",{ RADIAL/* : String*/ : "radial"},

];},[]
);joo.classLoader.prepare("package flash.geom", [""],

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x  represents the horizontal
 * axis and y represents the vertical axis.
 * <p>The following code creates a point at (0,0):
 * <code>
 *   var myPoint:Point = new Point();
 * </code>
 */
"public class Point",function(Point,$$private){with(Point)with($$private)return[ 

  /**
   * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
   * @param x (default = 0) The horizontal coordinate.
   * @param y (default = 0) The vertical coordinate.
   */
  "public function Point",function $Point(x/* : Number*/, y/* : Number*/) {if(arguments.length<2){if(arguments.length<1){x = 0;}y = 0;}this[$super]();
    this.x = x;
    this.y = y;
  },

  /**
   * The length of the line segment from (0,0) to this point.
   * @see #polar()
   */
   "public function get length",function get$length()/* : Number*/ {
     return Math.sqrt(this.x^2 + this.y^2);
   },

  /**
   * The horizontal coordinate of the point. The default value is 0.
   */
  "public var",{ x/* : Number*/: undefined},

  /**
   * The vertical coordinate of the point. The default value is 0.
   */
  "public var",{ y/*:Number*/: undefined},

  /**
   * Adds the coordinates of another point to the coordinates of this point to create a new point.
   * @param v The point to be added.
   * @return The new point.
   */
  "public function add",function add(v/* : Point*/)/* : Point*/ {
    return new Point(this.x+v.x, this.y+v.y);
  },

  /**
   * Creates a copy of this Point object.
   * @return The new Point object.
   */
  "public function clone",function clone()/* : Point*/ {
    return new Point(this.x, this.y);
  },

  /**
   * Returns the distance between pt1 and pt2.
   * @param pt1 The first point.
   * @param pt2 The second point.
   * @return The distance between the first and second points.
   */
  "public static function distance",function distance(pt1/* : Point*/, pt2/* : Point*/)/* : Number*/ {
    return Math.sqrt((pt2.x-pt1.x)^2 + (pt2.y-pt2.y)^2);
  },

  /**
   * Determines whether two points are equal.
   * Two points are equal if they have the same x and y values.
   * @param toCompare The point to be compared.
   * @return A value of true if the object is equal to this Point object; false if it is not equal.
   */
  "public function equals",function equals(toCompare/* : Point*/)/* : Boolean*/ {
    return this.x == toCompare.x && this.y == toCompare.y;
  },

  /**
   * Determines a point between two specified points.
   * The parameter f determines where the new interpolated point is located relative to the two end points specified
   * by parameters pt1 and pt2. The closer the value of the parameter f is to 1.0, the closer the interpolated point
   * is to the first point (parameter pt1). The closer the value of the parameter f is to 0, the closer the
   * interpolated point is to the second point (parameter pt2).
   * @param pt1 The first point.
   * @param pt2 The second point.
   * @param f The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
   * @return The new, interpolated point.
   */
  "public static function interpolate",function interpolate(pt1/* : Point*/, pt2/* : Point*/, f/* : Number*/)/* : Point*/ {
    return 0; // TODO
  },

  /**
   * Scales the line segment between (0,0) and the current point to a set length.
   * @param thickness The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the
   *   resulting point is at (0,1).
   * @see #length
   */
  "public function normalize",function normalize(thickness/* : Number*/)/* : void*/ {
    // TODO
  },

  /**
   * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create
   * the new x value. The value of dy is added to the original value of y to create the new y value.
   * @param dx The amount by which to offset the horizontal coordinate, x.
   * @param dy The amount by which to offset the vertical coordinate, y.
   */
  "public function offset",function offset(dx/* : Number*/, dy/* : Number*/)/* : void*/ {
    this.x += dx;
    this.y += dy;
  },

  /**
   * Converts a pair of polar coordinates to a Cartesian point coordinate.
   * @param len The length coordinate of the polar pair.
   * @param angle The angle, in radians, of the polar pair.
   * @return The Cartesian point.
   * @see #length
   * @see Math#round()
   */
  "public static function polar",function polar(len/* : Number*/, angle/* : Number*/)/* : Point*/ {
    return null; // TODO
  },

  /**
   * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
   * @param v The point to be subtracted.
   * @return The new point.
   */
  "public function subtract",function subtract(v/* : Point*/)/* : Point*/ {
    return new Point(this.x-v.x, this.y-v.y);
  },

  /**
   * Returns a string that contains the values of the x and y coordinates.
   * The string has the form "(x=x, y=y)", so calling the toString() method for a point at 23,17 would return
   * "(x=23, y=17)".
   * @return The string representation of the coordinates. 
   */
  "public function toString",function toString()/* : String*/ {
    return ["(x=",this.x,", y=",this.y,")"].join("");
  },

];},["distance","interpolate","polar"]
);joo.classLoader.prepare("package flash.net", [

"import js.XMLHttpRequest",
"import flash.events.Event",
"import flash.events.EventDispatcher",
"import flash.net.URLLoaderDataFormat",
"import flash.net.URLRequest",""],

/**
 * The URLLoader class downloads data from a URL as text, binary data, or URL-encoded variables.
 * It is useful for downloading text files, XML, or other information to be used in a dynamic, data-driven application.
 * <p>A URLLoader object downloads all of the data from a URL before making it available to ActionScript. It sends out
 * notifications about the progress of the download, which you can monitor through the bytesLoaded and bytesTotal
 * properties, as well as through dispatched events.
 * <p>The value you pass for the url parameter must, by default, be in exactly the same domain. For example, a SWF file
 * at www.adobe.com can load data only from sources that are also at www.adobe.com. To load data from a different
 * domain, place a cross-domain policy file on the server hosting the SWF file.
 * @see URLRequest
 * @see URLVariables
 * @see URLStream
 */
"public class URLLoader extends EventDispatcher",function(URLLoader,$$private){with(URLLoader)with($$private)return[function(){joo.classLoader.init(XMLHttpRequest,flash.events.Event,URLLoaderDataFormat);}, 

  /**
   * Indicates the number of bytes that have been loaded thus far during the load operation.
   */
  "public var",{ bytesLoaded/* : uint*/ : 0},

  /**
   * Indicates the total number of bytes in the downloaded data. This property contains 0 while the load operation is
   * in progress and is populated when the operation is complete. 
   */
  "public var",{ bytesTotal/* : uint*/ : 0},

  /**
   * The data received from the load operation. This property is populated only when the load operation is complete.
   * The format of the data depends on the setting of the dataFormat property:
   * <p>If the dataFormat property is URLLoaderDataFormat.TEXT, the received data is a string containing the text of
   *  the loaded file.
   * <p>If the dataFormat property is URLLoaderDataFormat.BINARY, the received data is a ByteArray object containing
   *  the raw binary data.
   * <p>If the dataFormat property is URLLoaderDataFormat.VARIABLES, the received data is a URLVariables object
   *  containing the URL-encoded variables.
   */
  "public var",{ data/* : **/: undefined},

  /**
   * Controls whether the downloaded data is received as text (URLLoaderDataFormat.TEXT), raw binary data
   * (URLLoaderDataFormat.BINARY), or URL-encoded variables (URLLoaderDataFormat.VARIABLES).
   * <p>If the value of the dataFormat property is URLLoaderDataFormat.TEXT, the received data is a string containing
   *  the text of the loaded file.
   * <p>If the value of the dataFormat property is URLLoaderDataFormat.BINARY, the received data is a ByteArray object
   *  containing the raw binary data.
   * <p>If the value of the dataFormat property is URLLoaderDataFormat.VARIABLES, the received data is a URLVariables
   *  object containing the URL-encoded variables.
   * <p>The default value is URLLoaderDataFormat.TEXT.
   */
  "public var",{ dataFormat/* : String*/ :function(){return( URLLoaderDataFormat.TEXT);}},

  /**
   * Creates a URLLoader object.
   * @param request (default = null) A URLRequest object specifying the URL to download. If this parameter is
   * omitted, no load operation begins. If specified, the load operation begins immediately (see the load entry for
   * more information). 
   */
  "public function URLLoader",function $URLLoader(request/* : URLRequest*/) {if(arguments.length<1){request = null;}this[$super]();
    if (request) {
      this.load(request);
    }
  },

  /**
   * Closes the load operation in progress. Any load operation in progress is immediately terminated.
   * If no URL is currently being streamed, an invalid stream error is thrown. 
   */
  "public function close",function close()/* : void*/ {
    this[$xmlHttpRequest].abort();
  },

  /**
   * Sends and loads data from the specified URL. The data can be received as text, raw binary data, or URL-encoded
   * variables, depending on the value you set for the dataFormat property. Note that the default value of the
   * dataFormat property is text. If you want to send data to the specified URL, you can set the data property in the
   * URLRequest object.
   * <p>Note: If a file being loaded contains non-ASCII characters (as found in many non-English languages), it is
   * recommended that you save the file with UTF-8 or UTF-16 encoding as opposed to a non-Unicode format like ASCII.
   * <p>By default, the URL you load must be in exactly the same domain as the calling SWF file. For example, a SWF
   * file at www.adobe.com can load data only from sources that are also at www.adobe.com. To load data from a
   * different domain, put a cross-domain policy file on the server hosting the SWF file.
   * <p>When using this method, consider the user agent's security model.
   * @param request A URLRequest object specifying the URL to download.
   * 
   * @event complete:Event � Dispatched after data has loaded successfully.
   * @event httpStatus:HTTPStatusEvent � If access is over HTTP, and the current Flash Player environment supports
   *  obtaining status codes, you may receive these events in addition to any complete or error event.
   * @event ioError:IOErrorEvent � The load operation could not be completed.
   * @event progress:ProgressEvent � Dispatched when data is received as the download operation progresses.
   * @event securityError:SecurityErrorEvent � A load operation attempted to retrieve data from a server outside the
   *  caller's security sandbox. This may be worked around using a policy file on the server.
   * @event open:Event � Dispatched when a load operation commences.
   * 
   * @throws ArgumentError URLRequest.requestHeader objects may not contain certain prohibited HTTP request headers.
   *  For more information, see the URLRequestHeader class description.
   * @throws MemoryError This error can occur for the following reasons: 1) Flash Player cannot convert the
   *  URLRequest.data parameter from UTF8 to MBCS. This error is applicable if the URLRequest object passed to load()
   *  is set to perform a GET operation and if System.useCodePage is set to true. 2) Flash Player cannot allocate
   *  memory for the POST data. This error is applicable if the URLRequest object passed to load is set to perform a
   *  POST operation.
   * @throws SecurityError Local untrusted SWF files may not communicate with the Internet. This may be worked around
   *  by reclassifying this SWF file as local-with-networking or trusted.
   * @throws TypeError The value of the request parameter or the URLRequest.url property of the URLRequest object
   *  passed are null.
   * @see URLRequestHeader
   * @see URLRequest.requestHeaders
   * @see URLRequest.data
   * @see Working with external data 
   */
  "public function load",function load(request/* : URLRequest*/)/* : void*/ {
    try {
      this[$xmlHttpRequest] = new XMLHttpRequest();
    } catch(e){if(is(e , Error)) {
      throw new Error("Your browser does not support XMLHttpRequest: "+e.message);
    }}
    this[$xmlHttpRequest].onreadystatechange = this[$readyStateChanged];
    this[$xmlHttpRequest].open(request.method, request.url, true);
    this[$xmlHttpRequest].send(null);
  },

  "private bound function readyStateChanged",function readyStateChanged()/* : void*/ {
    trace("URLLoader: "+this[$xmlHttpRequest].readyState);
    if (this[$xmlHttpRequest].readyState==XMLHttpRequest.DONE) {
      this.data = this[$xmlHttpRequest].responseText;
    }
    var event/* : flash.events.Event*/ = this[$createEvent]();
    if (event) {
      this.dispatchEvent(event);
    }
  },

  "private function createEvent",function createEvent()/* : flash.events.Event*/ {
    switch (this[$xmlHttpRequest].readyState) {
      case XMLHttpRequest.OPENED: return new flash.events.Event(flash.events.Event.OPEN, false, false);
      case XMLHttpRequest.DONE: return new flash.events.Event(flash.events.Event.COMPLETE, false, false);
    }
    return null;
    
  },
  "private var",{ xmlHttpRequest/* : XMLHttpRequest*/: undefined},
];},[]
);joo.classLoader.prepare("package", [""],
"public class ArgumentError extends Error",function(ArgumentError,$$private){with(ArgumentError)with($$private)return[ 
  "public function ArgumentError",function $ArgumentError(msg/* : String*/, id/* : String*/) {if(arguments.length<2){if(arguments.length<1){msg = "";}id = "";}this[$super]();
    // built-in class Error cannot be used in super-constructor call :-(
    this.name = "ArgumentError";
    this.message = "Error #"+id+": Parameter "+msg+" must have a legal value.";
  },

];},[]
);joo.classLoader.prepare("package flash.display", ["import flash.display.DisplayObjectContainer",

"import js.Element",
"import flash.events.EventDispatcher",
"import js.Event",
"import flash.events.Event",
"import flash.events.MouseEvent",
"import flash.display.Stage",
"import flash.display.IBitmapDrawable",
"import flash.geom.Transform",""],

"public class DisplayObject extends EventDispatcher implements flash.display.IBitmapDrawable",function(DisplayObject,$$private){with(DisplayObject)with($$private)return[function(){joo.classLoader.init(flash.display.Stage,MouseEvent,flash.events.Event);}, 

  "public function DisplayObject",function $DisplayObject() {
    this[$super]();
    this[$_stage] = flash.display.Stage.instance; // Stage singleton must be set before creating DisplayObject instances!
    this[$_elem] = this.createElement();
    if (!isNaN(this.x)) {
      this[$_elem].style.left = this.x + "px";
    }
    if (!isNaN(this.y)) {
      this[$_elem].style.top = this.y + "px";
    }
    if (!isNaN(this[$_stage].stageWidth)) {
      this[$_elem].style.width  = this[$_stage].stageWidth  + "px"; // TODO: resize according to its current content?
      this[$_elem].style.height = this[$_stage].stageHeight + "px"; // TODO: resize according to its current content?
    }
  },

  /**
   * The Stage of the display object. A Flash application has only one Stage object. For example, you can create and
   * load multiple display objects into the display list, and the stage property of each display object refers to the
   * same Stage object (even if the display object belongs to a loaded SWF file).
   * <p>If a display object is not added to the display list, its stage property is set to null.
   * <p><b>Example</b></p>
   * <p>The following code creates two TextField objects and uses the width property of the Stage object to position
   * the text fields:
   * <pre>
import flash.text.TextField;

var tf1:TextField = new TextField();
tf1.text = "Text Field 1";
tf1.border = true;
tf1.x = 10;
addChild(tf1);
tf1.width = tf1.stage.stageWidth / 2 - 10;

var tf2:TextField = new TextField();
tf2.text = "Text Field 2";
tf2.border = true;
tf2.x = tf1.x + tf1.width + 5;
addChild(tf2);
tf2.width = tf2.stage.stageWidth / 2 - 10;

trace(stage.stageWidth);
</pre>
   * @return the Stage of the display object.
   */
  "public function get stage",function get$stage()/* : Stage*/ {
    return this[$_stage];
  },

  /**
   * Indicates the DisplayObjectContainer object that contains this display object. Use the parent property to
   * specify a relative path to display objects that are above the current display object in the display list
   * hierarchy.
   * <p>You can use parent to move up multiple levels in the display list as in the following:
   * <pre>
   *   this.parent.parent.alpha = 20;
   * </pre>
   * @throws SecurityError The parent display object belongs to a security sandbox to which you do not have
   *   access. You can avoid this situation by having the parent movie call the Security.allowDomain() method.
   * @example
   * The following code creates three Sprite objects and shows how the parent property reflects the display
   * list hierarchy:
   * <pre>
   * import flash.display.Sprite;
   * 
   * var sprite1:Sprite = new Sprite();
   * sprite1.name = "sprite1";
   * var sprite2:Sprite = new Sprite();
   * sprite2.name = "sprite2";
   * var sprite3:Sprite = new Sprite();
   * sprite3.name = "sprite3";
   * 
   * sprite1.addChild(sprite2);
   * sprite2.addChild(sprite3);
   * 
   * trace(sprite2.parent.name); // sprite1
   * trace(sprite3.parent.name); // sprite2
   * trace(sprite3.parent.parent.name); // sprite1
   * </pre>
   */
  "public function get parent",function get$parent()/*:DisplayObjectContainer*/ {
    return this[$_parent];
  },

  // internal
  "public function set parent",function set$parent(parent/* : DisplayObjectContainer*/)/* : void*/ {
    this[$_parent] = parent;
  },

  "private static function createEventMap",function createEventMap(/*...events*/ /*: Array<String>*/)/* : Object*//*<String,String>*/ {var events=arguments;
    var result/* : Object*/ = {};
    for (var i/*:uint*/ =0; i<events.length; ++i) {
      result[events[i].toLowerCase()] = events[i];
    }
    return result;
  },

  "private static const",{ DELEGATED_EVENT_MAP/* : Object*//*<String,String>*/ :function(){return(
          createEventMap(MouseEvent.CLICK, MouseEvent.MOUSE_MOVE));}},

  "override public function addEventListener",function addEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean*/,
                                            priority/* : int*/, useWeakReference/* : Boolean*/)/* : void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture = false;}priority = 0;}useWeakReference = false;}
    var newEventType/* : Boolean*/ = !this.hasEventListener(type);
    this[$addEventListener](type, listener, useCapture, priority, useWeakReference);
    var jsType/* : String*/ = type.toLowerCase();
    if (newEventType) {
      if (DELEGATED_EVENT_MAP[jsType] == type) {
        this[$_elem].addEventListener(jsType, this[$transformAndDispatch], useCapture);
      } else if (this!=this.stage && flash.events.Event.ENTER_FRAME == type) {
        this.stage.addEventListener(type, this[$dispatchWithOwnTarget], useCapture, priority, useWeakReference);
      }
    }
  },

  "override public function removeEventListener",function removeEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean*/)/*:void*/ {if(arguments.length<3){useCapture = false;}
    this[$removeEventListener](type, listener, useCapture);
    var jsType/* : String*/ = type.toLowerCase();
    if (DELEGATED_EVENT_MAP[jsType]==type) {
      this[$_elem].removeEventListener(jsType, this[$transformAndDispatch], useCapture);
    }
  },

  "private bound function transformAndDispatch",function transformAndDispatch(event/* : js.Event*/)/* : Boolean*/ {
    var type/* : String*/ = DELEGATED_EVENT_MAP[event.type];
    return this.dispatchEvent(new MouseEvent(type, true, true, event.pageX - this.stage.x, event.pageY - this.stage.y, null,
            event.ctrlKey, event.altKey, event.shiftKey));
  },

  "private bound function dispatchWithOwnTarget",function dispatchWithOwnTarget(event/* : flash.events.Event*/)/* : Boolean*/ {
    return this.dispatchEvent(event.clone());
  },

  /**
   * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer. If the object is inside a DisplayObjectContainer that has transformations, it is in the
   * local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated 90�
   * counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90�
   * counterclockwise. The object's coordinates refer to the registration point position.
   * <p><b>Example</b></p>
   * The following code sets up a circle Sprite object. A Timer object is used to change the x property of the sprite
   * every 50 milliseconds:
   * <code>
   * import flash.display.Sprite;
   * import flash.utils.Timer;
   * import flash.events.TimerEvent;
   * 
   * var circle:Sprite = new Sprite();
   * circle.graphics.beginFill(0xFF0000);
   * circle.graphics.drawCircle(100, 100, 100);
   * addChild(circle);
   * 
   * var tim:Timer = new Timer(50);
   * tim.start();
   * tim.addEventListener(TimerEvent.TIMER, bounce);
   * 
   * var xInc:Number = 2;
   * 
   * function bounce(event:TimerEvent):void {
   *     circle.x += xInc;
   *     if (circle.x > circle.width) {
   *         xInc = -2;
   *     }
   *     if (circle.x < 0) {
   *         xInc = 2;
   *     }
   * }
   * </code>
   * @return the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer.
   */
  "public function get x",function get$x()/*:Number*/ {
    return this[$_x];
  },

  /**
   * Updates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer.
   * @param value the new x coordinate.
   * @see #x()
   */
  "public function set x",function set$x(value/*:Number*/)/* : void*/ {
    this[$_x] = value;
    if (this[$_elem]) {
      this[$_elem].style.left = value + "px";
    }
  },

  /**
   * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer. If the object is inside a DisplayObjectContainer that has transformations, it is in the
   * local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated 90�
   * counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90�
   * counterclockwise. The object's coordinates refer to the registration point position.
   * <p><b>Example</b></p>
   * The following code creates two TextField objects and adjusts the height property of each based on the textHeight
   * property of each; it also positions the second text field by setting its y property:
   * <code>
   * import flash.text.TextField;
   * 
   * var tf1:TextField = new TextField();
   * tf1.text = "Text Field 1";
   * tf1.border = true;
   * tf1.wordWrap = true;
   * tf1.width = 40;
   * tf1.height = tf1.textHeight + 5;
   * addChild(tf1);
   * 
   * var tf2:TextField = new TextField();
   * tf2.text = "Text Field 2";
   * tf2.border = true;
   * tf2.wordWrap = true;
   * tf2.width = 40;
   * tf2.height = tf2.textHeight + 5;
   * tf2.y = tf1.y + tf1.height + 5;
   * addChild(tf2);
   * @return the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer.
   */
  "public function get y",function get$y()/*:Number*/ {
    return this[$_y];
  },

  /**
   * Updates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
   * DisplayObjectContainer.
   * @param value the new x coordinate.
   * @see #x()
   */
  "public function set y",function set$y(value/*:Number*/)/* : void*/ {
    this[$_y] = value;
    if (this[$_elem]) {
      this[$_elem].style.top = value+"px";
    }
  },

  /**
   * Indicates the width of the display object, in pixels. The width is calculated based on the bounds of the content
   * of the display object. When you set the width property, the scaleX property is adjusted accordingly, as shown in
   * the following code:
<pre>
    var rect:Shape = new Shape();
    rect.graphics.beginFill(0xFF0000);
    rect.graphics.drawRect(0, 0, 100, 100);
    trace(rect.scaleX) // 1;
    rect.width = 200;
    trace(rect.scaleX) // 2;
</pre>
   * Except for TextField and Video objects, a display object with no content (such as an empty sprite) has a width
   * of 0, even if you try to set width to a different value.
   * <p><b>Example</b></p>
   * <p>The following code sets up a square Sprite object. When the user clicks the sprite, the widen() method
   * increases the width property of the sprite:
<pre>
import flash.display.Sprite;
import flash.events.MouseEvent;

var square:Sprite = new Sprite();
square.graphics.beginFill(0xFF0000);
square.graphics.drawRect(0, 0, 100, 100);
addChild(square);

square.addEventListener(MouseEvent.CLICK, widen);

function widen(event:MouseEvent):void {
    square.width += 10;
}
</pre>
   * @return the width of the display object, in pixels.
   */
  "public function get width",function get$width()/* : Number*/ {
    return this[$_elem].offsetWidth;
    //return this._width;
  },

  /**
   * Sets the width of the display object, in pixels.
   * @param value the new width of the display object, in pixels.
   * @see #width
   */
  "public function set width",function set$width(value/* : Number*/)/* : void*/ {
    this[$_width] = value;
  },

  /**
   * Indicates the height of the display object, in pixels. The height is calculated based on the bounds of the content
   * of the display object. When you set the height property, the scaleY property is adjusted accordingly, as shown in
   * the following code:
<pre>
    var rect:Shape = new Shape();
    rect.graphics.beginFill(0xFF0000);
    rect.graphics.drawRect(0, 0, 100, 100);
    trace(rect.scaleY) // 1;
    rect.height = 200;
    trace(rect.scaleY) // 2;
</pre>
   * Except for TextField and Video objects, a display object with no content (such as an empty sprite) has a height
   * of 0, even if you try to set height to a different value.
   * <p><b>Example</b></p>
   * The following code creates two TextField objects and adjusts the height property of each based on the textHeight
   * property of each; it also positions the second text field by setting its y property:
<pre>
import flash.text.TextField;

var tf1:TextField = new TextField();
tf1.text = "Text Field 1";
tf1.border = true;
tf1.wordWrap = true;
tf1.width = 40;
tf1.height = tf1.textHeight + 5;
addChild(tf1);

var tf2:TextField = new TextField();
tf2.text = "Text Field 2";
tf2.border = true;
tf2.wordWrap = true;
tf2.width = 40;
tf2.height = tf2.textHeight + 5;
tf2.y = tf1.y + tf1.height + 5;
addChild(tf2);
</pre>
   */
  "public function get height",function get$height()/* : Number*/ {
    return this[$_height];
  },

  /**
   * Sets the height of the display object, in pixels.
   * @param value the new height of the display object, in pixels.
   * @see #height
   */
  "public function set height",function set$height(value/* : Number*/)/* : void*/ {
    this[$_height] = value;
  },

  "protected function createElement",function createElement()/* : Element*/ {
    var elem/* : Element*/ = window.document.createElement(this.getElementName());
    elem.style.position = "absolute";
    return elem;
  },

  "protected function getElementName",function getElementName()/* : String*/ {
    return "div";
  },

  "public function getElement",function getElement()/* : Element*/ {
    return this[$_elem];
  },

  /**
   * An object with properties pertaining to a display object's matrix, color transform, and pixel bounds. The
   * specific properties � matrix, colorTransform, and three read-only properties (concatenatedMatrix,
   * concatenatedColorTransform, and pixelBounds) � are described in the entry for the Transform class.
   * <p>Each of the transform object's properties is itself an object. This concept is important because the
   * only way to set new values for the matrix or colorTransform objects is to create a new object and copy that
   * object into the transform.matrix or transform.colorTransform property.
   * <p>For example, to increase the tx value of a display object's matrix, you must make a copy of the entire
   * matrix object, then copy the new object into the matrix property of the transform object:
   * <pre>
   *   var myMatrix:Object = myDisplayObject.transform.matrix;  
   *   myMatrix.tx += 10; 
   *   myDisplayObject.transform.matrix = myMatrix;  
   * </pre>
   * You cannot directly set the tx property. The following code has no effect on myDisplayObject:
   * <pre>
   *   myDisplayObject.transform.matrix.tx += 10;
   * </pre>
   * You can also copy an entire transform object and assign it to another display object's transform property.
   * For example, the following code copies the entire transform object from myOldDisplayObj to myNewDisplayObj:
   * <pre>
   *   myNewDisplayObj.transform = myOldDisplayObj.transform;
   * </pre>
   * The resulting display object, myNewDisplayObj, now has the same values for its matrix, color transform,
   * and pixel bounds as the old display object, myOldDisplayObj.
   * @example
   * The following code sets up a square Sprite object. When the user clicks the sprite, the transformer()
   * method adjusts the colorTransform and matrix properties of the transform property of the sprite:
   * <pre>
   * import flash.display.Sprite;
   * import flash.geom.ColorTransform;
   * import flash.geom.Matrix;
   * import flash.geom.Transform;
   * import flash.events.MouseEvent;
   * 
   * var square:Sprite = new Sprite();
   * square.graphics.lineStyle(20, 0xFF2200);
   * square.graphics.beginFill(0x0000DD);
   * square.graphics.drawRect(0, 0, 100, 100);
   * addChild(square);
   * 
   * var resultColorTransform:ColorTransform = new ColorTransform();
   * resultColorTransform.alphaMultiplier = 0.5;
   * resultColorTransform.redOffset = 155;
   * resultColorTransform.greenMultiplier = 0.5;
   * 
   * var skewMatrix:Matrix = new Matrix(1, 1, 0, 1);
   * 
   * square.addEventListener(MouseEvent.CLICK, transformer);
   * 
   * function transformer(event:MouseEvent):void {
   *     var transformation:Transform = square.transform;
   *     var tempMatrix:Matrix = square.transform.matrix;
   *     tempMatrix.concat(skewMatrix);
   *     square.transform.colorTransform = resultColorTransform;
   *     
   *     square.transform.matrix = tempMatrix;
   * }
   * </pre>
   * @see flash.geom.Transform
   */
  "public function get transform",function get$transform()/*:Transform*/ {
    if (!this[$_transform])
      this[$_transform] = new Transform(this);
    return this[$_transform];
  },

  "public function set transform",function set$transform(value/*:Transform*/)/* : void*/ {
    this[$_transform] = value;
  },

  "private var",{ _stage/* : Stage*/: undefined},
  "private var",{ _parent/* : DisplayObjectContainer*/: undefined},
  "private var",{ _elem/* : Element*/: undefined},
  "private var",{ _x/* : Number*/ : 0, _y/* : Number*/ : 0, _width/* : Number*/: undefined, _height/* : Number*/: undefined},
  "private var",{ _transform/* : Transform*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.display", [

"import js.Element",
"import flash.display.DisplayObjectContainer",
"import flash.events.TimerEvent",
"import flash.utils.Timer",
"import flash.events.Event",""],

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
"public class Stage extends flash.display.DisplayObjectContainer",function(Stage,$$private){with(Stage)with($$private)return[function(){joo.classLoader.init(TimerEvent,flash.events.Event);}, 

  "internal static var",{ instance/* : Stage*/: undefined},

  "public function Stage",function $Stage(id/* : String*/) {
    this[$id] = id;
    instance = this;
    this[$super]();
    this[$frameTimer] = new Timer(1000/this[$_frameRate]);
    this[$frameTimer].addEventListener(TimerEvent.TIMER, this[$enterFrame]);
    this[$frameTimer].start();
  },

  "override public function get x",function get$x()/* : Number*/ {
    // TODO: consider offsetParent(s)!
    return this.getElement().offsetLeft;
  },

  "override public function get y",function get$y()/* : Number*/ {
    // TODO: consider offsetParent(s)!
    return this.getElement().offsetTop;
  },

  /// The current height, in pixels, of the Stage.
  "public function get stageHeight",function get$stageHeight ()/* : int*/ {
    return this.getElement().offsetHeight;
  },

  "public function set stageHeight",function set$stageHeight (value/* : int*/)/* : void*/ {
    this.getElement().offsetHeight = value;
  },

  /// Specifies the current width, in pixels, of the Stage.
  "public function get stageWidth",function get$stageWidth ()/* : int*/ {
    return this.getElement().offsetWidth;    
  },

  "public function set stageWidth",function set$stageWidth (value/* : int*/)/* : void*/ {
    this.getElement().offsetWidth = value;    
  },

  "override protected function createElement",function createElement()/*:Element*/ {
    var element/* : Element*/ = window.document.getElementById(this[$id]);
    element.style.position = "relative";
    var width/* : Object*/ = element.getAttribute("width");
    if (width) {
      element.style.width = width+"px";
    }
    var height/* : Object*/ = element.getAttribute("height");
    if (height) {
      element.style.height = height + "px";
    }
    element.innerHTML = "";
    return element;
  },

  "private bound function enterFrame",function enterFrame()/* : void*/ {
    this.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME, false, false));
  },

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
  "public function get frameRate",function get$frameRate()/* : Number*/ {
    return this[$_frameRate];
  },

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
  "public function set frameRate",function set$frameRate(value/* : Number*/)/* : void*/ {
    this[$_frameRate] = value;
    this[$frameTimer].delay = 1000/value;
  },

  "private var",{ id/* : String*/: undefined},
  "private var",{ _frameRate/* : Number*/ : 30},
  "private var",{ frameTimer/* : Timer*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.display",
[""],
/**
 * The SpreadMethod class provides values for the spreadMethod parameter in the beginGradientFill() and
 * lineGradientStyle() methods of the Graphics class.
 */
"public class SpreadMethod extends Object",function(SpreadMethod,$$private){with(SpreadMethod)with($$private)return[

  /** Specifies that the gradient use the pad spread method. */
  "public static const",{ PAD/* : String*/ : "pad"},
  /** Specifies that the gradient use the reflect spread method. */
  "public static const",{ REFLECT/* : String*/ : "reflect"},
  /** Specifies that the gradient use the repeat spread method. */
  "public static const",{ REPEAT/* : String*/ : "repeat"},

];},[]
);joo.classLoader.prepare("package flash.net", [""],

/**
 * The URLLoaderDataFormat class provides values that specify how downloaded data is received. 
 */
"public class URLLoaderDataFormat",function(URLLoaderDataFormat,$$private){with(URLLoaderDataFormat)with($$private)return[ 
  /**
   * Specifies that downloaded data is received as raw binary data.
   */
  "public static const",{ BINARY/* : String*/ : "binary"},

  /**
   * Specifies that downloaded data is received as text.
   */
  "public static const",{ TEXT/* : String*/ : "text"},

  /**
   * Specifies that downloaded data is received as URL-encoded variables. }
   */
  "public static const",{ VARIABLES/* : String*/ : "variables"},

];},[]
);joo.classLoader.prepare("package flash.geom", [

"import flash.geom.Point",""],

/**
 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and
 * by its width and its height.
 */
"public class Rectangle",function(Rectangle,$$private){with(Rectangle)with($$private)return[ 
  /**
   * The height of the rectangle, in pixels.
   */
  "public var",{ height/* : Number*/: undefined},
  /**
   * The width of the rectangle, in pixels.
   */
  "public var",{ width/* : Number*/: undefined},
  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  "public var",{ x/* : Number*/: undefined},
  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  "public var",{ y/* : Number*/: undefined},

  /**
   * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
   */
  "public function get topLeft",function get$topLeft ()/* : Point*/ {
    return new Point(this.x, this.y);
  },

  "public function set topLeft",function set$topLeft (topLeft/* : Point*/)/* : void*/ {
    left = topLeft.x;
    top = topLeft.y;
  },

  /**
   * The sum of the y and height properties.
   */
  "public function get bottom",function get$bottom ()/* : Number*/ {
    return this.x+this.height;
  },

  "public function set bottom",function set$bottom (value/*:Number*/)/* : void*/ {
    this.height = value - this.x;
  },

  /**
   * The location of the Rectangle object's bottom-right corner, determined by the values of the right and
   * bottom properties.
   */
  "public function get bottomRight",function get$bottomRight ()/* : Point*/ {
    return new Point(right, bottom);
  },

  "public function set bottomRight",function set$bottomRight (bottomRight/* : Point*/)/* : void*/ {
    right = bottomRight.x;
    bottom = bottomRight.y;
  },

  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  "public function get left",function get$left ()/* : Number*/ {
    return this.x+this.width;
  },

  "public function set left",function set$left (left/* : Number*/)/* : void*/ {
    this.width += this.x - left;
    this.x = left;
  },

  /**
   * The sum of the x and width properties.
   */
  "public function get right",function get$right ()/* : Number*/ {
    return this.x + this.width;
  },
  "public function set right",function set$right (value/*:Number*/)/* : void*/ {
    this.width = value - this.x;
  },

  /**
   * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
   */
  "public function get size",function get$size()/* : Point*/ {
    return new Point(this.width, this.height);
  },

  "public function set size",function set$size (value/*:Point*/)/* : void*/ {
    this.width = value.x;
    this.height = value.y;
  },

  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  "public function get top",function get$top ()/* : Number*/ {
    return this.y;
  },
  "public function set top",function set$top (value/*:Number*/)/* : void*/ {
    this.height += this.y - value;
    this.y = value;
  },

  /**
   * Returns a copy of this Rectangle object.
   */
  "public function clone",function clone ()/* : Rectangle*/ {
    return new Rectangle(this.x, this.y, this.width, this.height);
  },

  /**
   * Determines if the specified point is contained within the rectangular region.
   */
  "public function contains",function contains (x/*:Number*/, y/*:Number*/)/* : Boolean*/ {
    return this.x <= x && x <= this.right && this.y <= y && y <= this.bottom;
  },

  /**
   * Determines if the specified point is contained within the rectangular region defined by this Rectangle
   * object using a Point object as a parameter.
   */
  "public function containsPoint",function containsPoint (point/*:Point*/)/* : Boolean*/ {
    return this.contains(point.x, point.y);
  },

  /**
   * Determines if the Rectangle object specified by the rect parameter is contained within this Rectangle object.
   */
  "public function containsRect",function containsRect (rect/*:Rectangle*/)/* : Boolean*/ {
    return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
  },

  /**
   * Determines if the object specified in the toCompare parameter is equal to this Rectangle object.
   */
  "public function equals",function equals (toCompare/*:Rectangle*/)/* : Boolean*/ {
    return this.x==toCompare.x && this.y==toCompare.y && this.width==toCompare.width && this.height==toCompare.height;
  },

  /**
   * Increases the size of the Rectangle object by the specified amounts, in pixels.
   */
  "public function inflate",function inflate (dx/*:Number*/, dy/*:Number*/)/* : void*/ {
    this.width += dx;
    this.height += dy;
  },

  /**
   * Increases the size of the Rectangle object using a Point object as a parameter.
   */
  "public function inflatePoint",function inflatePoint (point/*:Point*/)/* : void*/ {
    this.inflate(point.x, point.y);
  },

  /**
   * Returns the area of intersection.
   */
  "public function intersection",function intersection (toIntersect/*:Rectangle*/)/* : Rectangle*/ {
    var x/* : Number*/ = Math.max(this.x, toIntersect.x);
    var right/* : Number*/ = Math.min(this.right, toIntersect.right);
    if (x <= right) {
      var y/* : Number*/ = Math.max(this.y, toIntersect.y);
      var bottom/* : Number*/ = Math.min(this.bottom, toIntersect.bottom);
      if (y <= bottom) {
        return new Rectangle(x, y, right-x, bottom-y);
      }
    }
    return new Rectangle();
  },

  /**
   * Determines if the object specified in the toIntersect parameter intersects with this Rectangle object.
   */
  "public function intersects",function intersects (toIntersect/*:Rectangle*/)/* : Boolean*/ {
    return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
        && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
  },

  /**
   * Determines whether or not this Rectangle object is empty.
   */
  "public function isEmpty",function isEmpty ()/* : Boolean*/ {
    return this.x==0 && this.y==0 && this.width==0 && this.height==0;
  },

  /**
   * Adjusts the location of the Rectangle object.
   */
  "public function offset",function offset (dx/*:Number*/, dy/*:Number*/)/* : void*/ {
    this.x += dx;
    this.y += dy;
  },

  /**
   * Adjusts the location of the Rectangle object using a Point object as a parameter.
   */
  "public function offsetPoint",function offsetPoint (point/*:Point*/)/* : void*/ {
    this.offset(point.x, point.y);
  },

  /**
   * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the
   * specified width and height.
   */
  "public function Rectangle",function $Rectangle (x/*:Number*/, y/*:Number*/, width/*:Number*/, height/*:Number*/) {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){x = 0;}y = 0;}width = 0;}height = 0;}this[$super]();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  },

  /**
   * Sets all properties to 0.
   */
  "public function setEmpty",function setEmpty ()/* : void*/ {
    this.x = this.y = this.width = this.height = 0;
  },

  /**
   * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
   */
  "public function toString",function toString ()/* : String*/ {
    return "[Rectangle("+[this.x,this.y,this.width,this.height].join(", ")+")]";
  },

  /**
   * Adds two rectangles together to create a new Rectangle object.
   */
  "public function union",function union (toUnion/*:Rectangle*/)/* : Rectangle*/ {
    var x/* : Number*/ = Math.min(this.x, toUnion.x);
    var y/* : Number*/ = Math.min(this.y, toUnion.y);
    return new Rectangle(x, y, Math.max(this.right,toUnion.right)-x, Math.max(this.bottom-toUnion.bottom)-y);
  },
];},[]
);joo.classLoader.prepare("package flash.net", [
"import flash.net.URLRequestMethod",""],

/**
 * The URLRequest class captures all of the information in a single HTTP request.
 * URLRequest objects are passed to the load() methods of URLStream, URLLoader, Loader and other loading operations
 * to initiate URL downloads, as well as to the upload()  and download() methods of the FileReference class.
 * <p>By default, the URL that you pass to the url parameter must be in exactly the same domain as the calling
 * SWF file, including subdomains. For example, www.adobe.com and store.adobe.com are different domains. To load data
 * from a different domain, place a cross-domain policy file on the server that is hosting the SWF file.
 * <p>When you use this class, consider the Adobe� Flash� Player security model:
 * <ul>
 * <li>Data loading is not allowed if the calling SWF file is in the local-with-file-system sandbox and the target
 *  resource is from a network sandbox.
 * <li>Data loading is also not allowed if the calling SWF file is from a network sandbox and the target resource is
 *  local.
 * </ul>
 * <p>For more information, see the following:
 * <ul>
 * <li>The security chapter in the Programming ActionScript 3.0 book and the latest comments on LiveDocs
 * <li>The Flash Player 9 Security white paper
 * </ul>
 * @see URLRequestHeader
 * @see URLLoader
 * @see URLStream
 * @see FileReference 
 */
"public class URLRequest",function(URLRequest,$$private){with(URLRequest)with($$private)return[function(){joo.classLoader.init(URLRequestMethod);}, 

  /**
   * Creates a URLRequest object. If System.useCodePage is true, the request is encoded using the system code page,
   * rather than Unicode. If System.useCodePage is false, the request is encoded using Unicode, rather than the system
   * code page.
   * @param url (default = null) The URL to be requested. You can set the URL later by using the url property.
   * @see flash.system.System.useCodePage 
   */
  "public function URLRequest",function $URLRequest(url/* : String*/) {if(arguments.length<1){url = null;}this[$super]();
    this.url = url;
  },

  /**
   *  The MIME content type of any POST data.
   *  <p><b>Note:</b> The FileReference.upload() and FileReference.download() methods do not support the
   *  URLRequest.contentType parameter.
   */
  "public var",{ contentType/* : String*/: undefined},

  /**
   * An object containing data to be transmitted with the URL request.
   * <p>This property is used with the method property. If the value of URLRequest.method is POST, the data is
   * transmitted with the URLRequest object with the HTTP POST method.
   * <p>If the value of URLRequest.method is GET, the data defines variables to be sent with the URLRequest object
   * with the HTTP GET method.
   * <p>The URLRequest API offers binary POST support and support for URL-encoded variables, as well as support for
   * strings. The data object can be of ByteArray, URLVariables, or String type.
   * <p>The way in which the data is used depends on the type of object used:
   * <ul>
   * <li>If the object is a ByteArray object, the binary data of the ByteArray object is used as POST data. For GET,
   * data of ByteArray type is not supported. Also, data of ByteArray type is not supported for FileReference.upload()
   * and FileReference.download().
   * <li>If the object is a URLVariables object and the method is POST, the variables are encoded using
   * x-www-form-urlencoded format and the resulting string is used as POST data. An exception is a call to
   * FileReference.upload(), in which the variables are sent as separate fields in a multipart/form-data post.
   * <li>If the object is a URLVariables object and the method is GET, the URLVariables object defines variables to 
   * be sent with the URLRequest object.
   * <li>Otherwise, the object is converted to a string, and the string is used as the POST or GET data.
   * </ul>
   * <p>This data is not sent until a method, such as navigateToURL() or FileReference.upload(), uses the URLRequest
   * object.
   * @see URLRequest.method
   * @see URLRequestMethod
   * @see URLVariables
   * @see flash.utils.ByteArray
   */
  "public var",{ data/* : Object*/: undefined},

  /**
   * Controls whether the HTTP form submission method is a GET  or POST operation.
   * Valid values are URLRequestMethod.GET or URLRequestMethod.POST.
   * <p>The default value is URLRequestMethod.GET.
   * @throws ArgumentError If the value parameter is not URLRequestMethod.GET or URLRequestMethod.POST.
   * @see URLRequestMethod
   */
  "public var",{ method/* : String*/ :function(){return( URLRequestMethod.GET);}},

  /**
   * The array of HTTP request headers to be appended to the HTTP request.
   * The array is composed of URLRequestHeader objects. Each object in the array must be a URLRequestHeader object
   * that contains a name string and a value string, as follows:
   * <code>var rhArray:Array = new Array(new URLRequestHeader("Content-Type", "text/html"));</code>
   * <p>Flash Player imposes certain restrictions on request headers; for more information, see the URLRequestHeader
   * class description.
   * <p>The FileReference.upload() and FileReference.download() methods do not support the URLRequest.requestHeaders
   * parameter.
   * @see URLRequestHeader 
   */
  "public var",{ requestHeaders/* : Array*/: undefined},

  /**
   * The URL to be requested.
   * By default, the URL must be in exactly the same domain as the calling SWF file, including subdomains.
   * For example, SWF files at www.adobe.com and store.adobe.com are in different domains.
   * To load data from a different domain, put a cross-domain policy file on the server that is hosting the SWF file.
   * For more information, see the security documentation described in the URLRequest class description.
   */
  "public var",{ url/* : String*/: undefined},
];},[]
);joo.classLoader.prepare("package flash.text",
[
  "import js.Element",
  "import flash.display.Graphics",
  "import flash.display.InteractiveObject",
  //import flash.display.DisplayObject;
  //import flash.geom.Rectangle;
  "import flash.text.TextFormat",/*
  //import flash.text.StyleSheet;
  //import flash.text.TextLineMetrics;

  /**
   * Flash Player dispatches the textInput event when a user enters one or more characters of text.
   * @eventType flash.events.TextEvent.TEXT_INPUT
   * /
  [Event(name="textInput", type="flash.events.TextEvent")] 

  /**
   * Dispatched by a TextField object after the user scrolls.
   * @eventType flash.events.Event.SCROLL
   * /
  [Event(name="scroll", type="flash.events.Event")] 

  /**
   * Dispatched when a user clicks a hyperlink in an HTML-enabled text field, where the URL begins with "event:".
   * @eventType flash.events.TextEvent.LINK
   * /
  [Event(name="link", type="flash.events.TextEvent")] 

  /**
   * Dispatched after a control value is modified, unlike the textInput event, which is dispatched before the value is modified.
   * @eventType flash.events.Event.CHANGE
   * /
  [Event(name="change", type="flash.events.Event")]*/""], 

  /// The TextField class is used to create display objects for text display and input.
  "public class TextField extends InteractiveObject",function(TextField,$$private){with(TextField)with($$private)return[ 

    /// Creates a new TextField instance.
    "public function TextField",function $TextField () {this[$super](); },

    /// When set to true and the text field is not in focus, Flash Player highlights the selection in the text field in gray.
    "public var",{ alwaysShowSelection/* : Boolean*/: undefined},

    /// The type of anti-aliasing used for this text field.
    "public var",{ antiAliasType/* : String*/: undefined},

    /// Controls automatic sizing and alignment of text fields.
    "public var",{ autoSize/* : String*/: undefined},

    /// Specifies whether the text field has a background fill.
    "public var",{ background/* : Boolean*/: undefined},

    /// The color of the text field background.
    "private var",{ _backgroundColor/* : uint*/: undefined},

    "public function get backgroundColor",function get$backgroundColor()/* : uint*/ {
      return this[$_backgroundColor];
    },

    "public function set backgroundColor",function set$backgroundColor(val/* : uint*/)/* : void*/ {
      this[$_backgroundColor] = val;
      this[$updateElementProperty]("style.backgroundColor", Graphics.toRGBA(val));
    },

    /// Specifies whether the text field has a border.
    "private var",{ _border/* : Boolean*/: undefined},

    "public function get border",function get$border()/*:Boolean*/ {
      return this[$_border];
    },

    "public function set border",function set$border(val/*:Boolean*/)/*:void*/ {
      this[$_border] = val;
      this[$updateElementProperty]("style.borderWidth", val ? "1px" : "0");
    },

    /// The color of the text field border.
    "private var",{ _borderColor/* : uint*/: undefined},

    "public function get borderColor",function get$borderColor()/*:uint*/ {
      return this[$_borderColor];
    },

    "public function set borderColor",function set$borderColor(val/*:uint*/)/*:void*/ {
      this[$_borderColor] = val;
      this[$updateElementProperty]("style.borderColor", Graphics.toRGBA(val));
    },

    /// An integer (1-based index) that indicates the bottommost line that is currently visible in the specified text field.
    "public var",{ bottomScrollV/* : int*/: undefined},

    /// The index of the insertion point (caret) position.
    "public var",{ caretIndex/* : int*/: undefined},

    /// A Boolean value that specifies whether extra white space (spaces, line breaks, and so on) in a text field with HTML text is removed.
    "public var",{ condenseWhite/* : Boolean*/: undefined},

    /// Specifies the format applied to newly inserted text, such as text inserted with the replaceSelectedText() method or text entered by a user.
    "private var",{ _defaultTextFormat/* : TextFormat*/: undefined},

    "public function get defaultTextFormat",function get$defaultTextFormat()/* : TextFormat*/ {
      return this[$_defaultTextFormat];
    },

    "public function set defaultTextFormat",function set$defaultTextFormat(val/* : TextFormat*/)/* : void*/ {
      this[$_defaultTextFormat] = val;
      this[$updateElementProperty]("style.fontFamily", val.font);
      this[$updateElementProperty]("style.fontSize",   val.size);
      this[$updateElementProperty]("style.color",      val.color ? Graphics.toRGBA(val.color) : "black");
      this[$updateElementProperty]("style.fontWeight", val.bold ? "bold" : "normal");
      // TODO: listen to property changes of my defaultTextFormat object?
    },

    /// Specifies whether the text field is a password text field.
    "public var",{ displayAsPassword/* : Boolean*/: undefined},

    /// Specifies whether to render by using embedded font outlines.
    "public var",{ embedFonts/* : Boolean*/: undefined},

    /// The type of grid fitting used for this text field.
    "public var",{ gridFitType/* : String*/: undefined},

    "private var",{ _htmlText/* : String*/: undefined},

    /// Contains the HTML representation of the text field contents.
    "public function get htmlText",function get$htmlText()/*:String*/ {
      return this[$_htmlText];
    },

    /// Sets the HTML representation of the text field contents.
    "public function set htmlText",function set$htmlText(val/*:String*/)/*:void*/ {
      this[$_htmlText] = val;
      this[$updateElementProperty]("innerHTML", val);
    },

    /// The number of characters in a text field.
    "public var",{ length/* : int*/: undefined},

    /// The maximum number of characters that the text field can contain, as entered by a user.
    "public var",{ maxChars/* : int*/: undefined},

    /// The maximum value of scrollH.
    "public var",{ maxScrollH/* : int*/: undefined},

    /// The maximum value of scrollV.
    "public var",{ maxScrollV/* : int*/: undefined},

    /// A Boolean value that indicates whether Flash Player automatically scrolls multiline text fields when the user clicks a text field and rolls the mouse wheel.
    "public var",{ mouseWheelEnabled/* : Boolean*/: undefined},

    /// Indicates whether field is a multiline text field.
    "public var",{ multiline/* : Boolean*/: undefined},

    /// Defines the number of text lines in a multiline text field.
    "public var",{ numLines/* : int*/: undefined},

    /// Indicates the set of characters that a user can enter into the text field.
    "public var",{ restrict/* : String*/: undefined},

    /// The current horizontal scrolling position.
    "public var",{ scrollH/* : int*/: undefined},

    /// The vertical position of text in a text field.
    "public var",{ scrollV/* : int*/: undefined},

    /// A Boolean value that indicates whether the text field is selectable.
    "public var",{ selectable/* : Boolean*/: undefined},

    "public var",{ selectedText/* : String*/: undefined},

    /// The zero-based character index value of the first character in the current selection.
    "public var",{ selectionBeginIndex/* : int*/: undefined},

    /// The zero-based character index value of the last character in the current selection.
    "public var",{ selectionEndIndex/* : int*/: undefined},

    /// The sharpness of the glyph edges in this text field.
    "public var",{ sharpness/* : Number*/: undefined},

    /// Attaches a style sheet to the text field.
    "public var",{ styleSheet/* : StyleSheet*/: undefined},

    /// A string that is the current text in the text field.
    "private var",{ _text/* : String*/: undefined},

    "public function get text",function get$text()/* : String*/ {
      return this[$_text];
    },

    "public function set text",function set$text(val/*:String*/)/* : void*/ {
      this[$_text] = val;
      //updateElementProperty("firstChild.data", val); TODO: does not work if TextNode does not yet exit!
      this[$updateElementProperty]("innerHTML", val);
    },

    /// The color of the text in a text field, in hexadecimal format.
    "public var",{ _textColor/* : uint*/: undefined},

    "public function get textColor",function get$textColor()/* : uint*/ {
      return this._textColor;
    },

    "public function set textColor",function set$textColor(val/*:uint*/)/* : void*/ {
      this._textColor = val;
      this[$updateElementProperty]("style.color", Graphics.toRGBA(val));
    },

    /// The height of the text in pixels.
    "public var",{ textHeight/* : Number*/: undefined},

    /// The width of the text in pixels.
    "public var",{ textWidth/* : Number*/: undefined},

    /// The thickness of the glyph edges in this text field.
    "public var",{ thickness/* : Number*/: undefined},

    /// The type of the text field.
    "public var",{ type/* : String*/: undefined},

    /// Specifies whether to copy and paste the text formatting along with the text.
    "public var",{ useRichTextClipboard/* : Boolean*/: undefined},

    /// A Boolean value that indicates whether the text field has word wrap.
    "public var",{ wordWrap/* : Boolean*/: undefined},

    /// Appends text to the end of the existing text of the TextField.
    //public function appendText (newText:String) : void;

    /// Returns a rectangle that is the bounding box of the character.
    //public function getCharBoundaries (charIndex:int) : Rectangle;

    /// Returns the zero-based index value of the character.
    //public function getCharIndexAtPoint (x:Number, y:Number) : int;

    /// The zero-based index value of the character.
    //public function getFirstCharInParagraph (charIndex:int) : int;

    /// Returns a DisplayObject reference for the given id, for an image or SWF file that has been added to an HTML-formatted text field by using an &lt;img&gt; tag.
    //public function getImageReference (id:String) : DisplayObject;

    /// The zero-based index value of the line at a specified point.
    //public function getLineIndexAtPoint (x:Number, y:Number) : int;

    /// The zero-based index value of the line containing the character that the the charIndex parameter specifies.
    //public function getLineIndexOfChar (charIndex:int) : int;

    /// Returns the number of characters in a specific text line.
    //public function getLineLength (lineIndex:int) : int;

    /// Returns metrics information about a given text line.
    //public function getLineMetrics (lineIndex:int) : TextLineMetrics;

    /// The zero-based index value of the first character in the line.
    //public function getLineOffset (lineIndex:int) : int;

    /// The text string contained in the specified line.
    //public function getLineText (lineIndex:int) : String;

    /// The zero-based index value of the character.
    //public function getParagraphLength (charIndex:int) : int;

    //public function getRawText () : String;

    /// Returns a TextFormat object.
    //public function getTextFormat (beginIndex:int = -1, endIndex:int = -1) : TextFormat;

    //public function getTextRuns (beginIndex:int = 0, endIndex:int = 2147483647) : Array;

    //public function getXMLText (beginIndex:int = 0, endIndex:int = 2147483647) : String;

    //public function insertXMLText (beginIndex:int = null, endIndex:int = null, richText:String = null, pasting:Boolean = false) : void;

    /// Replaces the current selection with the contents of the value parameter.
    //public function replaceSelectedText (value:String) : void;

    /// Replaces a range of characters.
    //public function replaceText (beginIndex:int, endIndex:int, newText:String) : void;

    /// Sets a new text selection.
    //public function setSelection (beginIndex:int, endIndex:int) : void;

    /// Applies text formatting.
    //public function setTextFormat (format:TextFormat = null, beginIndex:int = -1, endIndex:int = -1) : void;

    "override protected function getElementName",function getElementName()/*:String*/ {
      return "span";
    },

    "private function updateElementProperty",function updateElementProperty(propertyPath/* : String*/, value/* : Object*/)/* : void*/ {
      var element/* : Element*/ = this.getElement();
      if (element) {
        var propertyPathArcs/* : Array*/ = propertyPath.split(".");
        var lastIndex/* : uint*/ = propertyPathArcs.length - 1;
        for (var i/*:uint*/ =0; i<lastIndex; ++i) {
          element = element[propertyPathArcs[i]];
        }
        element[propertyPathArcs[lastIndex]] = value;
      }
    },

  ];},[]
);joo.classLoader.prepare("package flash.utils", [

"import flash.events.EventDispatcher",
"import flash.events.TimerEvent",/*

[Event(name="timerComplete",type="flash.events.TimerEvent")]
[Event(name="timer",type="flash.events.TimerEvent")]*/""],
/**
 * The Timer class is the interface to timers, which let you run code on
   a specified time sequence. Use the <code>start()</code> method to
   start a timer. Add an event listener for the timer event to set up
   code to be run on the timer interval.
   <p>You can create Timer objects to run once or repeat at specified
   intervals to execute code on a schedule. Depending on the environment
   (available memory and other factors), events may be dispatched at
   slightly offset intervals. Memory-intensive scripts may also offset
   the events.
 */
"public class Timer extends EventDispatcher",function(Timer,$$private){with(Timer)with($$private)return[function(){joo.classLoader.init(TimerEvent);},


  /**
   * Constructs a new Timer object with the specified <code>delay</code>
     and <code>repeatCount</code> states.
   * <p>The timer does not start automatically; you must call the
     <code>start()</code> method to start it.
   * @param delay The delay between timer events, in milliseconds.
   * @param repeatCount (default = 0) � Specifies the number of
     repetitions. If zero, the timer repeats infinitely. If nonzero, the
     timer runs the specified number of times and then stops.
   * @throws Error if the delay specified is negative or not a finite
     number
   */
  "public function Timer",function $Timer(delay/* : Number*/, repeatCount/* : int*/) {if(arguments.length<2){repeatCount = 0;}this[$super]();
    this[$_delay] = delay;
    this[$_repeatCount] = repeatCount;
  },

  /**
   * Return the delay, in milliseconds, between timer events.
   * @return the delay, in milliseconds, between timer events.
   */
  "public function get delay",function get$delay()/*:Number*/ {
    return this[$_delay];
  },

  /**
   * The delay, in milliseconds, between timer events. If
   * you set the delay interval while the timer is running, the timer
   * will restart at the same <code>repeatCount</code> iteration.
   */
  "public function set delay",function set$delay(val/*:Number*/)/*:void*/ {
    this[$_delay] = val;
    if (this[$timer]) {
      this.stop();
      this.start();
    }
  },

  "private var",{ _delay/* : Number*/: undefined},

  /**
   * The total number of times the timer is set to run.
   * @return the total number of times the timer is set to run.
   */
  "public function get repeatCount",function get$repeatCount()/* : int*/ {
    return this[$_repeatCount];
  },

  /**
   * The total number of times the timer is set to run. If
   * the repeat count is set to 0, the timer continues forever or until
   * the <code>stop()</code> method is invoked or the program stops. If
   * the repeat count is nonzero, the timer runs the specified number
   * of times. If <code>repeatCount</code> is set to a total that is
   * the same or less then <code>currentCount</code> the timer stops
   * and will not fire again.
   */
  "public function set repeatCount",function set$repeatCount(val/* : int*/)/* : void*/ {
    this[$_repeatCount] = val;
    this[$checkComplete]();
  },

  "private var",{ _repeatCount/* : int*/: undefined},

  /**
   * The timer's current state; <code>true</code> if the
   * timer is running, otherwise <code>false</code>.
   */
  "public function get running",function get$running()/* : Boolean*/ {
    return this[$timer]!=null;
  },

  /**
   * The total number of times the timer has fired since it
   * started at zero. If the timer has been reset, only the fires since
   * the reset are counted.
   */
  "public function get currentCount",function get$currentCount()/* : int*/ {
    return this[$_currentCount];
  },

  "private var",{ _currentCount/* : int*/ : 0},

  /**
   * Starts the timer, if it is not already running.
   */
  "public function start",function start()/* : void*/ {
    if (!this[$timer]) {
      this[$timer] = window.setInterval(this[$tick], this[$_delay]);
    }
  },

  /**
   * Stops the timer. When <code>start()</code> is called after
     <code>stop()</code>, the timer instance runs for the
     <code>remaining</code> number of repetitions, as set by the
     <code>repeatCount</code> property.
   */
  "public function stop",function stop()/* : void*/ {
    if (this[$timer]) {
      window.clearInterval(this[$timer]);
      this[$timer] = null;
    }
  },

  /**
   * Stops the timer, if it is running, and sets the <code>currentCount</code> property back to 0, like the reset
   * button of a stopwatch. Then, when <code>start()</code> is called, the timer instance runs for the specified
   * number of repetitions, as set by the <code>repeatCount</code> value.
   * @see flash.utils.Timer
   */
  "public function reset",function reset()/* : void*/ {
    this.stop();
    this[$_currentCount] = 0;
  },

  "private bound function tick",function tick()/* : void*/ {
    if (!this[$timer]) {
      // oops, a tick occurred although timer has been stopped:
      return;
    }
    ++this[$_currentCount];
    try {
      this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
    } finally {
      this[$checkComplete]();
    }
  },

  "private function checkComplete",function checkComplete()/* : void*/ {
    if (this[$_repeatCount] > 0 && this[$_currentCount] >= this[$_repeatCount]) {
      this.stop();
      this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
    }
  },

  "private var",{ timer/* : Object*/ : null},
];},[]
);joo.classLoader.prepare("package flash.net", [""],
/**
 * A URLRequestHeader object encapsulates a single HTTP request header and consists of a name/value pair.
 * URLRequestHeader objects are used in the requestHeaders property of the URLRequest class.
 * <p>The following request headers cannot be used:
 * Accept-Ranges, Age, Allow, Allowed, Connection, Content-Length, Content-Location, Content-Range, ETag, Host,
 * Last-Modified, Location, Max-Forwards, Proxy-Authenticate, Proxy-Authorization, Public, Range, Retry-After,
 * Server, TE, Trailer, Transfer-Encoding, Upgrade, URI, Vary, Via, Warning, WWW-Authenticate, x-flash-version,
 * Referer, Get, Post, Put, Delete, Options, and Trace.
 * <p>URLRequestHeader objects are restricted in length. If the cumulative length of a URLRequestHeader object
 * (the length of the name property plus the value property) or an array of URLRequestHeader objects used in the
 * URLRequest.requestHeaders property exceeds the acceptable length, Adobe� Flash� Player throws an exception.
 * @see URLRequest
 * @see URLLoader 
 */
"public class URLRequestHeader",function(URLRequestHeader,$$private){with(URLRequestHeader)with($$private)return[ 

  /**
   * An HTTP request header name (such as Content-Type or SOAPAction).
   */
  "public var",{ name/* : String*/: undefined},

  /**
   * The value associated with the name property (such as text/plain). 
   */
  "public var",{ value/* : String*/: undefined},

  /**
   * Creates a new URLRequestHeader object that encapsulates a single HTTP request header.
   * URLRequestHeader objects are used in the requestHeaders property of the URLRequest class.
   * @param name (default = "") An HTTP request header name (such as Content-Type or SOAPAction).
   * @param value (default = "") The value associated with the name property (such as text/plain). }
   */
  "public function URLRequestHeader",function $URLRequestHeader(name/*:String*/, value/*:String*/) {if(arguments.length<2){if(arguments.length<1){name = "";}value = "";}this[$super]();
    
  },

];},[]
);joo.classLoader.prepare("package flash.display", [""],

/**
 * The CapsStyle class is an enumeration of constant values that specify the caps style to use in drawing lines.
 * @see flash.display.Graphics#lineStyle()
 */
"public class CapsStyle",function(CapsStyle,$$private){with(CapsStyle)with($$private)return[ 
  /**
   * Used to specify no caps in the caps parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ NONE/* : String*/ : "butt"},
  /**
   * Used to specify round caps in the caps parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ ROUND/* : String*/ : "round"},
  /**
   * Used to specify square caps in the caps parameter of the flash.display.Graphics.lineStyle() method.
   */
  "public static const",{ SQUARE/* : String*/ : "square"},

];},[]
);joo.classLoader.prepare("package flash.events",
[
  "import flash.display.InteractiveObject",
  "import flash.events.Event",""],

  /// Flash&#xAE; Player dispatches MouseEvent objects into the event flow whenever mouse events occur.
  "public class MouseEvent extends Event",function(MouseEvent,$$private){with(MouseEvent)with($$private)return[ 

    /// Defines the value of the type property of a click event object.
    "public static const",{ CLICK/* : String*/ : "click"},
    /// Defines the value of the type property of a doubleClick event object.
    "public static const",{ DOUBLE_CLICK/* : String*/ : "doubleClick"},
    /// Defines the value of the type property of a mouseDown event object.
    "public static const",{ MOUSE_DOWN/* : String*/ : "mouseDown"},
    /// Defines the value of the type property of a mouseMove event object.
    "public static const",{ MOUSE_MOVE/* : String*/ : "mouseMove"},
    /// Defines the value of the type property of a mouseOut event object.
    "public static const",{ MOUSE_OUT/* : String*/ : "mouseOut"},
    /// Defines the value of the type property of a mouseOver event object.
    "public static const",{ MOUSE_OVER/* : String*/ : "mouseOver"},
    /// Defines the value of the type property of a mouseUp event object.
    "public static const",{ MOUSE_UP/* : String*/ : "mouseUp"},
    /// Defines the value of the type property of a mouseWheel event object.
    "public static const",{ MOUSE_WHEEL/* : String*/ : "mouseWheel"},
    /// Defines the value of the type property of a rollOut event object.
    "public static const",{ ROLL_OUT/* : String*/ : "rollOut"},
    /// Defines the value of the type property of a rollOver event object.
    "public static const",{ ROLL_OVER/* : String*/ : "rollOver"},

    /// Indicates whether the Alt key is active (true) or inactive (false).
    "public var",{ altKey/* : Boolean*/: undefined},

    /// Indicates whether the primary mouse button is pressed (true) or not (false).
    "public var",{ buttonDown/* : Boolean*/: undefined},

    /// Indicates whether the Control key is active (true) or inactive (false).
    "public var",{ ctrlKey/* : Boolean*/: undefined},

    /// Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
    "public var",{ delta/* : int*/: undefined},

    /// The horizontal coordinate at which the event occurred relative to the containing sprite.
    "public var",{ localX/* : Number*/: undefined},

    /// The vertical coordinate at which the event occurred relative to the containing sprite.
    "public var",{ localY/* : Number*/: undefined},

    /// A reference to a display list object that is related to the event.
    "public var",{ relatedObject/* : InteractiveObject*/: undefined},

    /// Indicates whether the Shift key is active (true) or inactive (false).
    "public var",{ shiftKey/* : Boolean*/: undefined},

    /// The horizontal coordinate at which the event occurred in global Stage coordinates.
    "public var",{ stageX/* : Number*/: undefined},

    /// The vertical coordinate at which the event occurred in global Stage coordinates.
    "public var",{ stageY/* : Number*/: undefined},

    /// Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
    "public override function clone",function clone()/* : Event*/ {
      return new MouseEvent(this.type, this.bubbles, this.cancelable, this.localX, this.localY, this.relatedObject, this.ctrlKey, this.altKey, this.shiftKey, this.buttonDown, this.delta);
    },

    /// Constructor for MouseEvent objects.
    "public function MouseEvent",function $MouseEvent(type/*:String*/, bubbles/*:Boolean*/, cancelable/*:Boolean*/,
                               localX/*:Number*/, localY/*:Number*/, relatedObject/*:InteractiveObject*/,
                               ctrlKey/*:Boolean*/, altKey/*:Boolean*/, shiftKey/*:Boolean*/,
                               buttonDown/*:Boolean*/, delta/*:int*/) {if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){type = null;}bubbles = true;}cancelable = false;}localX = NaN;}localY = NaN;}relatedObject = null;}ctrlKey = false;}altKey = false;}shiftKey = false;}buttonDown = false;}delta = 0;}
      this[$super](type, bubbles, cancelable);
      this.localX = localX;
      this.localY = localY;
      this.relatedObject = relatedObject;
      this.ctrlKey = ctrlKey;
      this.altKey = altKey;
      this.shiftKey = shiftKey;
      this.buttonDown = buttonDown;
      this.delta = delta;
    },

    /// Returns a string that contains all the properties of the MouseEvent object.
    "public override function toString",function toString ()/* : String*/ {
      return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase",
              "localX", "localY", "relatedObject", "ctrlKey", "altKey", "shiftKey", "buttonDown", "delta");
    },

    /// Instructs Flash Player to render after processing of this event completes, if the display list has been modified.
    "public function updateAfterEvent",function updateAfterEvent ()/* : void*/ {
      // TODO
    },
  ];},[]
);