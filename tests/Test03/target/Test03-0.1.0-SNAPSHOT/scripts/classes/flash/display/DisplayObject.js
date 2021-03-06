joo.classLoader.prepare("package flash.display", [

"import js.Element",
"import flash.events.EventDispatcher",
"import js.Event",
"import flash.events.Event",
"import flash.events.MouseEvent",
"import flash.display.Stage",
"import flash.display.IBitmapDrawable",
"import flash.geom.Transform",""],

"public class DisplayObject extends flash.events.EventDispatcher implements flash.display.IBitmapDrawable",function($$private){with($$private)return[function(){joo.classLoader.init(flash.display.Stage,flash.events.MouseEvent,flash.events.Event);}, 

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
          $$private.createEventMap(flash.events.MouseEvent.CLICK, flash.events.MouseEvent.MOUSE_MOVE));}},

  "override public function addEventListener",function addEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean = false*/,
                                            priority/* : int = 0*/, useWeakReference/* : Boolean = false*/)/* : void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture = false;}priority = 0;}useWeakReference = false;}
    var newEventType/* : Boolean*/ = !this.hasEventListener(type);
    this[$addEventListener](type, listener, useCapture, priority, useWeakReference);
    var jsType/* : String*/ = type.toLowerCase();
    if (newEventType) {
      if ($$private.DELEGATED_EVENT_MAP[jsType] == type) {
        this[$_elem].addEventListener(jsType, this[$transformAndDispatch], useCapture);
      } else if (this!=this.stage && flash.events.Event.ENTER_FRAME == type) {
        this.stage.addEventListener(type, this[$dispatchWithOwnTarget], useCapture, priority, useWeakReference);
      }
    }
  },

  "override public function removeEventListener",function removeEventListener(type/* : String*/, listener/* : Function*/, useCapture/* : Boolean = false*/)/*:void*/ {if(arguments.length<3){useCapture = false;}
    this[$removeEventListener](type, listener, useCapture);
    var jsType/* : String*/ = type.toLowerCase();
    if ($$private.DELEGATED_EVENT_MAP[jsType]==type) {
      this[$_elem].removeEventListener(jsType, this[$transformAndDispatch], useCapture);
    }
  },

  "private bound function transformAndDispatch",function transformAndDispatch(event/* : js.Event*/)/* : Boolean*/ {
    var type/* : String*/ = $$private.DELEGATED_EVENT_MAP[event.type];
    return this.dispatchEvent(new flash.events.MouseEvent(type, true, true, event.pageX - this.stage.x, event.pageY - this.stage.y, null,
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
      this[$_transform] = new flash.geom.Transform(this);
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
];},[],["flash.events.EventDispatcher","flash.display.IBitmapDrawable","flash.display.Stage","flash.events.MouseEvent","flash.events.Event","flash.geom.Transform"]
);