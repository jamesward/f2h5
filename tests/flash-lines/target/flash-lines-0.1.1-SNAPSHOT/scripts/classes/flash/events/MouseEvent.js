joo.classLoader.prepare("package flash.events",
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