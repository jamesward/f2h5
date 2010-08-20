package flash.text
{
  import js.Element;
  import flash.display.Graphics;
  import flash.display.InteractiveObject;
  //import flash.display.DisplayObject;
  //import flash.geom.Rectangle;
  import flash.text.TextFormat;/*
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
  [Event(name="change", type="flash.events.Event")]*/ 

  /// The TextField class is used to create display objects for text display and input.
  public class TextField extends flash.display.InteractiveObject {

    /// Creates a new TextField instance.
    public native function TextField ();

    /// When set to true and the text field is not in focus, Flash Player highlights the selection in the text field in gray.
    public var alwaysShowSelection : Boolean;

    /// The type of anti-aliasing used for this text field.
    public var antiAliasType : String;

    /// Controls automatic sizing and alignment of text fields.
    public var autoSize : String;

    /// Specifies whether the text field has a background fill.
    public var background : Boolean;

    public native function get backgroundColor() : uint;

    public native function set backgroundColor(val : uint) : void;

    public native function get border():Boolean;

    public native function set border(val:Boolean):void;

    public native function get borderColor():uint;

    public native function set borderColor(val:uint):void;

    /// An integer (1-based index) that indicates the bottommost line that is currently visible in the specified text field.
    public var bottomScrollV : int;

    /// The index of the insertion point (caret) position.
    public var caretIndex : int;

    /// A Boolean value that specifies whether extra white space (spaces, line breaks, and so on) in a text field with HTML text is removed.
    public var condenseWhite : Boolean;

    public native function get defaultTextFormat() : TextFormat;

    public native function set defaultTextFormat(val : TextFormat) : void;

    /// Specifies whether the text field is a password text field.
    public var displayAsPassword : Boolean;

    /// Specifies whether to render by using embedded font outlines.
    public var embedFonts : Boolean;

    /// The type of grid fitting used for this text field.
    public var gridFitType : String;

    /// Contains the HTML representation of the text field contents.
    public native function get htmlText():String;

    /// Sets the HTML representation of the text field contents.
    public native function set htmlText(val:String):void;

    /// The number of characters in a text field.
    public var length : int;

    /// The maximum number of characters that the text field can contain, as entered by a user.
    public var maxChars : int;

    /// The maximum value of scrollH.
    public var maxScrollH : int;

    /// The maximum value of scrollV.
    public var maxScrollV : int;

    /// A Boolean value that indicates whether Flash Player automatically scrolls multiline text fields when the user clicks a text field and rolls the mouse wheel.
    public var mouseWheelEnabled : Boolean;

    /// Indicates whether field is a multiline text field.
    public var multiline : Boolean;

    /// Defines the number of text lines in a multiline text field.
    public var numLines : int;

    /// Indicates the set of characters that a user can enter into the text field.
    public var restrict : String;

    /// The current horizontal scrolling position.
    public var scrollH : int;

    /// The vertical position of text in a text field.
    public var scrollV : int;

    /// A Boolean value that indicates whether the text field is selectable.
    public var selectable : Boolean;

    public var selectedText : String;

    /// The zero-based character index value of the first character in the current selection.
    public var selectionBeginIndex : int;

    /// The zero-based character index value of the last character in the current selection.
    public var selectionEndIndex : int;

    /// The sharpness of the glyph edges in this text field.
    public var sharpness : Number;

    /// Attaches a style sheet to the text field.
    public var styleSheet : StyleSheet;

    public native function get text() : String;

    public native function set text(val:String) : void;

    /// The color of the text in a text field, in hexadecimal format.
    public var _textColor : uint;

    public native function get textColor() : uint;

    public native function set textColor(val:uint) : void;

    /// The height of the text in pixels.
    public var textHeight : Number;

    /// The width of the text in pixels.
    public var textWidth : Number;

    /// The thickness of the glyph edges in this text field.
    public var thickness : Number;

    /// The type of the text field.
    public var type : String;

    /// Specifies whether to copy and paste the text formatting along with the text.
    public var useRichTextClipboard : Boolean;

    /// A Boolean value that indicates whether the text field has word wrap.
    public var wordWrap : Boolean;

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

    override protected native function getElementName():String;

  }
}