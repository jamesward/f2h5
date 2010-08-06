joo.classLoader.prepare("package js",["import js.CanvasPattern","import js.HTMLElement","import js.ImageData","import js.HTMLCanvasElement","import js.TextMetrics","import js.CanvasGradient",""],
"public interface CanvasRenderingContext2D",function(CanvasRenderingContext2D,$$private){with(CanvasRenderingContext2D)with($$private)return[ /*

  // back-reference to the canvas
  function canvas() : HTMLCanvasElement;*/,/*

  // state
  function save() : void;*/,/* // push state on state stack
  function restore() : void;*/,/* // pop state stack and restore state

  // transformations (default transform is the identity matrix)
  function scale(x : Number, y : Number) : void;*/,/*

  function rotate(angle : Number) : void;*/,/*

  function translate(x : Number, y : Number) : void;*/,/*

  function transform(m11 : Number, m12 : Number, m21 : Number, m22 : Number, dx : Number, dy : Number) : void;*/,/*

  function setTransform(m11 : Number, m12 : Number, m21 : Number, m22 : Number, dx : Number, dy : Number) : void;*/,/*

  // compositing
  function globalAlpha() : Number;*/,/* // (default 1.0)
  function globalAlpha(alpha : Number) : void;*/,/*

  function globalCompositeOperation() : String;*/,/* // (default source-over)
  function globalCompositeOperation(op : String) : void;*/,/*

  // colors and styles
  function strokeStyle() : *;*/,/* // (default black)
  function strokeStyle(style : *) : void;*/,/*

  function fillStyle() : *;*/,/* // (default black)
  function fillStyle(style : *) : void;*/,/*

  function createLinearGradient(x0 : Number, y0 : Number, x1 : Number, y1 : Number) : CanvasGradient;*/,/*

  function createRadialGradient(x0 : Number, y0 : Number, r0 : Number, x1 : Number, y1 : Number, r1 : Number) : CanvasGradient;*/,/*

  /**
   * @param image HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement.
   * @param repetition
   * @return
   * /
  function createPattern(image : HTMLElement, repetition : String) : CanvasPattern;*/,/*

  // line caps/joins
  function lineWidth() : Number;*/,/* // (default 1)
  function lineWidth(width : Number) : void;*/,/*

  function lineCap() : String;*/,/* // "butt", "round", "square" (default "butt")
  function lineCap(cap : String) : void;*/,/* // "butt", "round", "square" (default "butt")
  function lineJoin() : String;*/,/* // "round", "bevel", "miter" (default "miter")
  function lineJoin(join : String) : void;*/,/* // "round", "bevel", "miter" (default "miter")
  function miterLimit() : Number;*/,/* // (default 10)
  function miterLimit(limit : Number) : void;*/,/* // (default 10)

  // shadows
  function shadowOffsetX() : Number;*/,/* // (default 0)
  function shadowOffsetX(x : Number) : void;*/,/*

  function shadowOffsetY() : Number;*/,/* // (default 0)
  function shadowOffsetY(y : Number) : void;*/,/*

  function shadowBlur() : Number;*/,/* // (default 0)
  function shadowBlur(blur : Number) : void;*/,/*

  function shadowColor() : String;*/,/* // (default transparent black)
  function shadowColor(color : String) : void;*/,/*

  // rects
  function clearRect(x : Number, y : Number, w : Number, h : Number) : void;*/,/*

  function fillRect(x : Number, y : Number, w : Number, h : Number) : void;*/,/*

  function strokeRect(x : Number, y : Number, w : Number, h : Number) : void;*/,/*

  // path API
  function beginPath() : void;*/,/*

  function closePath() : void;*/,/*

  function moveTo(x : Number, y : Number) : void;*/,/*

  function lineTo(x : Number, y : Number) : void;*/,/*

  function quadraticCurveTo(cpx : Number, cpy : Number, x : Number, y : Number) : void;*/,/*

  function bezierCurveTo(cp1x : Number, cp1y : Number, cp2x : Number, cp2y : Number, x : Number, y : Number) : void;*/,/*

  function arcTo(x1 : Number, y1 : Number, x2 : Number, y2 : Number, radius : Number) : void;*/,/*

  function rect(x : Number, y : Number, w : Number, h : Number) : void;*/,/*

  function arc(x : Number, y : Number, radius : Number, startAngle : Number, endAngle : Number, anticlockwise : Boolean) : void;*/,/*

  function fill() : void;*/,/*

  function stroke() : void;*/,/*

  function clip() : void;*/,/*

  function isPointInPath(x : Number, y : Number) : Boolean;*/,/*

  // text
  function font() : String;*/,/* // (default 10px sans-serif)
  function font(font : String) : void;*/,/*

  function textAlign() : String;*/,/* // "start", "end", "left", "right", "center" (default: "start")
  function textAlign(align : String) : void;*/,/*

  function textBaseline() : String;*/,/* // "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic")
  function textBaseline(baseline : String) : void;*/,/*

  function fillText(text : String, x : Number, y : Number, maxWidth : Number) : void;*/,/*

  function strokeText(text : String, x : Number, y : Number, maxWidth : Number) : void;*/,/*

  function measureText(text : String) : TextMetrics;*/,/*

  /**
   * To draw images onto the canvas, the drawImage method can be used.
   * This method can be invoked with three different sets of arguments:
   * drawImage(image, dx, dy)
   * drawImage(image, dx, dy, dw, dh)
   * drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
   * @param image HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement.
   * /
  function drawImage(image : HTMLElement, dxOrSx : Number, dyOrSy : Number,
                     dwOrSw : Number, dhOrSh : Number,
                     dx : Number, dy : Number,
                     dw : Number, dh : Number) : void;*/,/*

  /**
   *   pixel manipulation
   * @param imagedataOrSw - ImageData or Number
   * @param sh
   * @return
   * /
  function createImageData(imagedataOrSw : *, sh : Number) : ImageData;*/,/*

  function getImageData(sx : Number, sy : Number, sw : Number, sh : Number) : ImageData;*/,/*

  function putImageData(imagedata : ImageData, dx : Number, dy : Number, dirtyX : Number, dirtyY : Number, dirtyWidth : Number, dirtyHeight : Number) : void;*/,

];},[]
);joo.classLoader.prepare("package js",["import js.Node",""],
"public class Range",function(Range,$$private){with(Range)with($$private)return[ 

  /**
   * Returns a boolean indicating whether the range's start and end points are at the same position.
   */
  "public native function get collapsed"/*() : Boolean;*/,

  /**
   * Returns the deepest Node that contains the startContainer and endContainer Nodes.
   */
  "public native function get commonAncestorContainer"/*() : Node;*/,

  /**
   * Returns the Node within which the Range ends.
   */
  "public native function get endContainer"/*() : Node;*/,

  /**
   * Returns a number representing where in the endContainer the Range ends.
   */
  "public native function get endOffset"/*() : Number;*/,

  /**
   * Returns the Node within which the Range starts.
   */
  "public native function get startContainer"/*() : Node;*/,

  /**
   * Returns a number representing where in the startContainer the Range starts.
   */
  "public native function get startOffset"/*() : Number;*/,

  // Methods

  // Positioning Methods
  // These methods set the start and end points of a range.

  /**
   * Sets the start position of a Range.
   * <p>If the startNode is a Node of type Text, Comment, or CDATASection, then startOffset is the number of characters
   * from the start of startNode. For other Node types, startOffset is the number of child nodes between the start of
   * the startNode.</p>
   * <p>Setting the start point below (further down in the document) than the end point will throw an
   *  NS_ERROR_ILLEGAL_VALUE exception.</p>
   * @param startNode The Node to start the Range
   * @param startOffset An integer greater than or equal to zero representing the offset for the start
   *  of the Range from the start of startNode.
   */
  "public native function setStart"/*(startNode : Node, startOffset : Number) : void;*/,

  /**
   * Sets the end position of a Range.
   * <p>If the endNode is a Node of type Text, Comment, or CDATASection, then endOffset is the number of characters
   *  from the start of endNode. For other Node types, endOffset is the number of child nodes between the start of
   *  the endNode.</p>
   * <p>Setting the end point above (higher in the document) the start point will throw an
   *  NS_ERROR_ILLEGAL_VALUE exception.</p>
   * @param endNode The Node to end the Range
   * @param endOffset An integer greater than or equal to zero representing the offset for the end of the Range
   *  from the start of endNode.
   */
  "public native function setEnd"/*(endNode : Node, endOffset : Number) : void;*/,

  /**
   * Sets the start position of a Range relative to another Node.
   * <p>The parent Node of the start of the Range will be the same as that for the referenceNode.</p>
   * @param referenceNode The Node to start the Range before
   */
  "public native function setStartBefore"/*(referenceNode : Node) : void;*/,

  /**
   * Sets the start position of a Range relative to another Node.
   * <p>The parent Node of the start of the Range will be the same as that for the referenceNode.</p>
   * @param referenceNode The Node to start the Range after
   */
  "public native function setStartAfter"/*(referenceNode : Node) : void;*/,

  /**
   * Sets the end position of a Range relative to another Node.
   * <p>The parent Node of end of the Range will be the same as that for the referenceNode.</p>
   * @param referenceNode The Node to end the Range before
   */
  "public native function setEndBefore"/*(referenceNode : Node) : void;*/,

  /**
   * Sets the end position of a Range relative to another Node.
   * <p>The parent Node of end of the Range will be the same as that for the referenceNode.</p>
   * @param referenceNode The Node to end the Range after
   */
  "public native function setEndAfter"/*(referenceNode : Node) : void;*/,

  /**
   * Sets the Range to contain the node and its contents.
   * <p>The parent Node of the start and end of the Range will be the same as the parent of the referenceNode.</p>
   * @param referenceNode The Node to select within a Range
   */
  "public native function selectNode"/*(referenceNode : Node) : void;*/,

  /**
   * Sets the Range to contain the contents of a Node.
   * <p>The parent Node of the start and end of the Range will be the referenceNode. The startOffset is 0, and the
   *  endOffset is the number of child Nodes or number of characters contained in the reference node.</p>
   * @param referenceNode The Node whose contents will be selected within a Range
   */
  "public native function selectNodeContents"/*(referenceNode : Node) : void;*/,

  /**
   * Collapses the Range to one of its boundary points.
   * <p>A collapsed Range is empty, containing no content, specifying a single-point in a DOM tree. To determine if a
   *  Range is already collapsed, see the collapsed property.</p>
   * @param toStart A boolean, true collapses the Range to its start, false to its end.
   */
  "public native function collapse"/*(toStart : Boolean) : void;*/,


  // Editing Methods

  // These methods retrieve Nodes from a range and modify the contents of a range.

  /**
   * Returns a document fragment copying the nodes of a Range.
   * <p>Event Listeners added using DOM Events are not copied during cloning. HTML attribute events are duplicated as
   *  they are for the DOM Core cloneNode method. HTML id attributes are also cloned, which can lead to an invalid
   *  document through cloning.</p>
   * <p>Partially selected nodes include the parent tags necessary to make the document fragment valid.</p>
   */
  "public native function cloneContents"/*() : Object /*DocumentFragment* /;*/,


  /**
   * Removes the contents of a Range from the document.
   * <p>Unlike extractContents, this method does not return a documentFragment containing the deleted content.</p>
   */
  "public native function deleteContents"/*() : void;*/,

  /**
   * Moves contents of a Range from the document tree into a document fragment.
   * <p>Event Listeners added using DOM Events are not retained during extraction. HTML attribute events are retained
   *  or duplicated as they are for the DOM Core cloneNode method. HTML id attributes are also cloned, which can lead
   *  to an invalid document if a partially-selected node is extracted and appened to the document.</p>
   * <p>Partially selected nodes are cloned to include the parent tags necessary to make the document fragment valid.</p>
   */
  "public native function extractContents"/*() : void;*/,

  /**
   * Insert a node at the start of a Range.
   * <p>newNode is inserted at the start boundary point of the Range. If the newNodes is to be added to a text Node,
   *  that Node is split at the insertion point, and the insertion occurs between the two text Nodes.</p>
   * <p>If newNode is a document fragment, the children of the document fragment are inserted instead.</p>
   * @param newNode is a Node.
   */
  "public native function insertNode"/*(newNode : Node) : void;*/,

  /**
   * Moves content of a Range into a new node.
   * <p><code>surroundContents</code> is equivalent to
   * <code>newNode.appendChild(range.extractContents()); range.insertNode(newNode)</code>.
   * After surrounding, the boundary points of the range include newNode.</p>
   * @param newNode a Node
   */
  "public native function surroundContents"/*(newNode : Node) : void;*/,

  // Other Methods

  /**
   *  Use as <code>how</code> paramter in compareBoundaryPoints() to compare the end boundary-point of sourceRange to
   *  the end boundary-point of range.
   */
  "public static native function get END_TO_END"/*() : Number;*/,

  /**
   *  Use as <code>how</code> paramter in compareBoundaryPoints() to compare the end boundary-point of sourceRange to
   *  the start boundary-point of range.
   */
  "public static native function get END_TO_START"/*() : Number;*/,

  /**
   *  Use as <code>how</code> paramter in compareBoundaryPoints() to compare the start boundary-point of sourceRange to
   *  the end boundary-point of range.
   */
  "public static native function get START_TO_END"/*() : Number;*/,

  /**
   *  Use as <code>how</code> paramter in compareBoundaryPoints() to compare the start boundary-point of sourceRange to
   *  the start boundary-point of range.
   */
  "public static native function get START_TO_START"/*() : Number;*/,

  /**
   * Compares the boundary points of two Ranges.
   * <p>Any of the following constants can be passed as the value of how parameter:</p>
   * <ul>
   *  <li>Range.END_TO_END compares the end boundary-point of sourceRange to the end boundary-point of range.</li>
   *  <li>Range.END_TO_START compares the end boundary-point of sourceRange to the start boundary-point of range.</li>
   *  <li>Range.START_TO_END compares the start boundary-point of sourceRange to the end boundary-point of range.</li>
   *  <li>Range.START_TO_START compares the start boundary-point of sourceRange to the start boundary-point of range.</li>
   * </ul>
   * @return A number, -1, 0, or 1, indicating whether the corresponding boundary-point of range is respectively
   *  before, equal to, or after the corresponding boundary-point of sourceRange.
   * @param how A constant describing the comparison method, one of values described below.
   * @param sourceRange A Range to compare boundary points with range
   */
  "public native function compareBoundaryPoints"/*(how : Number, sourceRange : Range) : Number;*/,

  /**
   * Returns a Range object with boundary points identical to the cloned Range.
   * <p>clone is copied by value, not reference, so a change in either Range does not effect the other.</p>
   */
  "public native function cloneRange"/*() : Range;*/,

  /**
   * Releases Range from use to improve performance.
   * <p>Allows the user agent to relinquish resources associated with this Range. Subsequent attempts to use the
   *  detached range will result in a DOMException being thrown with an error code of INVALID_STATE_ERR.</p>
   */
  "public native function detach"/*() : void;*/,

  // Gecko Methods

  // This section describes Range methods that are particular to Mozilla and not part of the W3C DOM specifications.

  /**
   * Returns -1, 0, or 1 indicating whether the point occurs before, inside, or after the range.
   * <p>If the referenceNode is a Node of type Text, Comment, or CDATASection, then offset is the number of characters
   *  from the start of referenceNode. For other Node types, offset is the number of child nodes between the start of
   *  the referenceNode.</p>
   * @param referenceNode The Node to compare with the Range.
   * @param offset An integer greater than or equal to zero representing the offset inside the referenceNode.
   * @return -1, 0, or 1 indicating whether the point occurs before, inside, or after the range.
   */
  "public native function comparePoint"/*(referenceNode : Node, offset : Number) : Number;*/,

  /**
   * Returns a document fragment created from a given string of code.
   * <p>This method takes a string and uses Mozilla's parser to convert it to a DOM tree.</p>
   * @param tagString Text that contains text and tags to be converted to a document fragment.
   * @return a document fragment created from a given string of code.
   */
  "public native function createContextualFragment"/*(tagString : String) : Object /*DocumentFragment* /;*/,

  /**
   * Returns a boolean indicating whether the given point is in the range.
   * @param referenceNode The Node to compare with the Range.
   * @param offset The offset into Node of the point to compare with the Range.
   * @return true if the point (cursor position) at offset within ReferenceNode is within this range.
   */
  "public native function isPointInRange"/*(referenceNode : Node, offset : Number) : Boolean;*/,


];},[]
);joo.classLoader.prepare("package js", ["import js.Window","import js.Node","import js.Style","import js.Document","import js.Collection",""],

"public class Element extends Node",function(Element,$$private){with(Element)with($$private)return[ 

  "public native function get id"/*() : String;*/,



  "public native function set id"/*(id : String) : void;*/,



  "public native function get tagName"/*() : String;*/,



  "public native function get ownerDocument"/*() : Document;*/,



  "public native function get contentWindow"/*() : Window;*/,



  "public native function get innerHTML"/*() : String;*/,



  "public native function set innerHTML"/*(s : String) : void;*/,



  "public native function get outerHTML"/*() : String;*/,



  "public native function set outerHTML"/*(s : String) : void;*/,



  "public native function get style"/*() : Style;*/,



  "public native function get filters"/*() : Collection;*/, // IE only

  "public native function get offsetLeft"/*() : Number;*/,



  "public native function get offsetTop"/*() : Number;*/,



  "public native function get offsetWidth"/*() : Number;*/,



  "public native function get offsetHeight"/*() : Number;*/,



  "public native function get offsetParent"/*() : Element;*/,



  "public native function get clientWidth"/*() : Number;*/,



  "public native function get clientHeight"/*() : Number;*/,



  "public native function get className"/*() : String;*/,



  "public native function set className"/*(s : String) : void;*/,



  "public native function get scrollLeft"/*() : Number;*/,



  "public native function set scrollLeft"/*(value : Number) : void;*/,



  "public native function get scrollTop"/*()  : Number;*/,



  "public native function set scrollTop"/*(value : Number) : void;*/,



  "public native function focus"/*() : void;*/,



  "public native function select"/*() : void;*/,



  "public native function get attributes"/*() : Collection;*/,



  "public native function mergeAttributes"/*(withElem : Element, copyId : Boolean) : void;*/,



  "public native function get htmlFor"/*() : String;*/,



  "public native function set htmlFor"/*(htmlFor : String) : void;*/,



  "public native function get scopeName"/*() : String;*/,   // IE only

  "public native function getAttribute"/*(name : String) : Object;*/,



  "public native function removeAttribute"/*(name : String) : void;*/,



  "public native function get type"/*() : String;*/,

  "public native function set type"/*(val : String) : void;*/,



  "public native function get title"/*() : String;*/,



  "public native function get defaultChecked"/*() : String;*/,



  "public native function set defaultChecked"/*(checked : String) : void;*/,



  "public native function get tBodies"/*() : Array;*/,



  "public native function get rows"/*() : Array;*/,



  "public native function get cells"/*() : Array;*/,



  "public native function get name"/*() : String;*/,



  "public native function set name"/*(name : String) : void;*/,



  "public native function get value"/*() : String;*/,



  "public native function set value"/*(value : String) : void;*/,



  "public native function get defaultValue"/*() : String;*/,



  "public native function set defaultValue"/*(value : String) : void;*/,



  "public native function get checked"/*() : Boolean;*/,



  "public native function set checked"/*(checked : Boolean) : void;*/,



  "public native function get disabled"/*() : Boolean;*/,



  "public native function get selectedIndex"/*() : Number;*/, // <select>

  "public native function set selectedIndex"/*(value : Number) : void;*/, // <select>

  "public native function get src"/*() : String;*/, // <script>, <img>

  "public native function set src"/*(url : String) : void;*/, // <script>, <img>

  "public native function get href"/*() : String;*/, // <a>, <link>

  "public native function set href"/*(href : String) : void;*/, // <a>, <link>

  "public native function get target"/*() : String;*/, // <a>

  "public native function set target"/*(target : String) : void;*/, // <a>

  "public native function get colSpan"/*() : Number;*/, // <th>, <td>

  "public native function set colSpan"/*(span : Number) : void;*/, // <th>, <td>

  "public native function get rowSpan"/*() : Number;*/, // <th>, <td>

  "public native function set rowSpan"/*(span : Number) : void;*/, // <th>, <td>

  "public native function scrollIntoView"/*(alignWithTop : Boolean) : void;*/,



];},[]

);joo.classLoader.prepare("package js",["import js.Element","import js.Location","import js.Style","import js.Event","import js.Document","import js.Screen",""],

"public class Window",function(Window,$$private){with(Window)with($$private)return[ 

  "public native function get top"/*() : Window;*/,



  "public native function get parent"/*() : Window;*/,



  "public native function get frameElement"/*() : Element;*/,



  "public native function get status"/*() : String;*/,



  "public native function set status"/*(status : String) : void;*/,



  "public native function get document"/*() : Document;*/,



  "public native function get navigator"/*() : *;*/,



  "public native function get location"/*() : Location;*/,



  "public native function get event"/*() : Event;*/,



  "public native function open"/*(name : String, mode: String, windowFeatures : String) : Window;*/,



  "public native function focus"/*() : void;*/,



  "public native function addEventListener"/*(eventType : String, handler : Function, capture : Boolean) : void;*/,



  "public native function setTimeout"/*(handler : * /* Function or String * /, millies : Number) : Object;*/,



  "public native function clearTimeout"/*(timer : Object) : void;*/,



  "public native function setInterval"/*(handler : Function, millies : Number) : Object;*/,



  "public native function clearInterval"/*(interval : Object) : void;*/,



  "public native function alert"/*(message : String) : void;*/,



  "public native function confirm"/*(message : String) : Boolean;*/,



  "public native function prompt"/*(message : String, defaultValue : String) : String;*/,



  "public native function get innerWidth"/*() : Number;*/,



  "public native function get innerHeight"/*() : Number;*/,



  "public native function eval"/*(expr : String) : *;*/,



  "public native function getComputedStyle"/*(elem : Element, pseudoElt : Element) : Style;*/,



  "public native function set location"/*(location : String) : void;*/,



  "public native function get screen"/*() : Screen;*/,



  "public native function moveTo"/*(x:int, y:int) : void;*/,



  "public native function get closed"/*() : Boolean;*/,



  "public native function close"/*() : void;*/,

];},[]

);joo.classLoader.prepare("package js",[""],
"public class Collection extends Array",function(Collection,$$private){with(Collection)with($$private)return[ 
  "public native function item"/*(index : Number) : Object;*/,
];},[]
);joo.classLoader.prepare("package js",["import js.Element",""],
"public class Event",function(Event,$$private){with(Event)with($$private)return[ 
  "public native function get type"/*() : String;*/,

  "public native function preventDefault"/*() : void;*/,

  "public native function stopPropagation"/*() : void;*/,

  "public native function get pageX"/*() : Number;*/,

  "public native function set pageX"/*(n : Number) : void;*/,

  "public native function get pageY"/*() : Number;*/,

  "public native function set pageY"/*(n : Number) : void;*/,

  "public native function get clientX"/*() : Number;*/,

  "public native function get clientY"/*() : Number;*/,

  "public native function get screenX"/*() : Number;*/,

  "public native function get screenY"/*() : Number;*/,

  "public native function get keyCode"/*() : Number;*/,

  "public native function get fromElement"/*() : Element;*/,

  "public native function get toElement"/*() : Element;*/,

  "public native function get target"/*() : Element;*/,

  "public native function set target"/*(e : Element) : void;*/, // only for IE
  "public native function get relatedTarget"/*() : Element;*/,

  "public native function set relatedTarget"/*(e : Element) : void;*/, // only for IE
  "public native function get shiftKey"/*() : Boolean;*/,

  "public native function get shiftLeft"/*() : Boolean;*/,

  "public native function get ctrlKey"/*() : Boolean;*/,

  "public native function get ctrlLeft"/*() : Boolean;*/,

  "public native function get altKey"/*() : Boolean;*/,

  "public native function get metaKey"/*() : Boolean;*/,

  "public native function get srcElement"/*() : Element;*/, // IE only
  "public native function get returnValue"/*() : Boolean;*/, // IE only
  "public native function set returnValue"/*(val : Boolean) : void;*/, // IE only
  "public native function get cancelBubble"/*() : Boolean;*/, // IE only
  "public native function set cancelBubble"/*(val : Boolean) : void;*/, // IE only
  "public native function get touches"/*() : Array;*/,  // iPhone only
  "public native function initMouseEvent"/*(eventType : String, param2 : Boolean, param3 : Boolean, view:*, detail:*,
                                        screenX : int, screenY : int, clientX : int, clientY : int,
                                        ctrlKey : Boolean, altKey : Boolean, shiftKey : Boolean, metaKey : Boolean,
                                        param14 : *, param15 : *) : void;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public interface CanvasPattern",function(CanvasPattern,$$private){with(CanvasPattern)with($$private)return[ 
  // opaque object
];},[]
);joo.classLoader.prepare("package js",["import js.Element","import js.Window","import js.TextNode","import js.Node","import js.Location","import js.Event",""],

"public class Document extends Node",function(Document,$$private){with(Document)with($$private)return[ 

  "public native function get compatMode"/*() : String;*/,



  "public native function get designMode"/*() : String;*/,



  "public native function set designMode"/*(onOrOff : String) : void;*/,



  "public native function execCommand"/*(commandName : String, showDefaultUI : Boolean, valueArgument : *) : void;*/,



  "public native function get defaultView"/*() : Window;*/,  // not in IE

  "public native function get parentWindow"/*() : Window;*/, // IE only

  "public native function get documentElement"/*() : Element;*/,



  "public native function get body"/*() : Element;*/,



  "public native function get title"/*() : String;*/,



  "public native function set title"/*(title : String) : void;*/,



  "public native function get forms"/*() : Array;*/,



  "public native function get frames"/*() : Array;*/,



  "public native function get cookie"/*(): String;*/,



  "public native function set cookie"/*(value : String) : void;*/,



  "public native function createElement"/*(name : String) : Element;*/,



  "public native function createTextNode"/*(text : String) : TextNode;*/,



  "public native function createComment"/*(comment : String) : Node;*/,



  "public native function getElementById"/*(id : String) : Element;*/,



  "public native function write"/*(text : String) : void;*/,



  "public native function close"/*() : void;*/,



  "public native function createEvent"/*(eventType : String) : Event;*/,



  "public native function dispatchEvent"/*(event:Event):void;*/,



  "public native function get location"/*() : Location;*/,

];},[]

);joo.classLoader.prepare("package js", [""],
"public interface Location",function(Location,$$private){with(Location)with($$private)return[ /*

  /**
   * The part of the URL that follows the # symbol, including the # symbol.
   * /
  native function hash()     :String;*/,/*
  /**
   * The part of the URL that follows the # symbol, including the # symbol.
   * /
  native function hash(value:String):void;*/,/*
  /**
   * The host name and port number.
   * /
  native function host()     :String;*/,/*
  /**
   * The host name and port number.
   * /
  native function host(value:String):void;*/,/*
  /**
   * The host name (without the port number or square brackets).
   * /
  native function hostname() :String;*/,/*
  /**
   * The host name (without the port number or square brackets).
   * /
  native function hostname(value:String):void;*/,/*
  /**
   * The entire URL.
   * /
  native function href()     :String;*/,/*
  /**
   * The entire URL.
   * /
  native function href(value:String):void;*/,/*
  /**
   * The path (relative to the host).
   * /
  native function pathname() :String;*/,/*
  /**
   * The path (relative to the host).
   * /
  native function pathname(value:String):void;*/,/*
  /**
   * The port number of the URL.
   * /
  native function port()     :String;*/,/*
  /**
   * The port number of the URL.
   * /
  native function port(value:String):void;*/,/*
  /**
   * The protocol of the URL.
   * /
  native function protocol() :String;*/,/*
  /**
   * The protocol of the URL.
   * /
  native function protocol(value:String):void;*/,/*
  /**
   * The part of the URL that follows the ? symbol, including the ? symbol.
   * /
  native function search()   :String;*/,/*
  /**
   * The part of the URL that follows the ? symbol, including the ? symbol.
   * /
  native function search(value:String):void;*/,/*

  /**
   * Load the document at the provided URL.
   * /
  native function assign(url:String):void;*/,/*

  /**
   * Reload the document from the current URL.
   * @param forceGet when true, causes the page to always be reloaded from the server. If false or not specified, the
   *   browser may reload the page from its cache.
   * /
  native function reload(forceGet:Boolean):void;*/,/*

  /**
   * Replace the current document with the one at the provided URL. The difference from the assign() method is that
   * after using replace() the current page will not be saved in session history, meaning the user won't be able to use
   * the Back button to navigate to it.
   * @param url the new URL to load the document from.
   * /
  native function replace(url:String):void;*/,/*

  /**
   * Returns the string representation of the Location object's URL. See the JavaScript reference for details.
   * /
  native function toString():String;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public class KeyEvent",function(KeyEvent,$$private){with(KeyEvent)with($$private)return[ 

  "public static const",{ DOM_VK_CANCEL/* : Number*/ : 3},
  "public static const",{ DOM_VK_HELP/* : Number*/ : 6},
  "public static const",{ DOM_VK_BACK_SPACE/* : Number*/ : 8},
  "public static const",{ DOM_VK_TAB/* : Number*/ : 9},
  "public static const",{ DOM_VK_CLEAR/* : Number*/ : 12},
  "public static const",{ DOM_VK_RETURN/* : Number*/ : 13},
  "public static const",{ DOM_VK_ENTER/* : Number*/ : 14},
  "public static const",{ DOM_VK_SHIFT/* : Number*/ : 16},
  "public static const",{ DOM_VK_CONTROL/* : Number*/ : 17},
  "public static const",{ DOM_VK_ALT/* : Number*/ : 18},
  "public static const",{ DOM_VK_PAUSE/* : Number*/ : 19},
  "public static const",{ DOM_VK_CAPS_LOCK/* : Number*/ : 20},
  "public static const",{ DOM_VK_ESCAPE/* : Number*/ : 27},
  "public static const",{ DOM_VK_SPACE/* : Number*/ : 32},
  "public static const",{ DOM_VK_PAGE_UP/* : Number*/ : 33},
  "public static const",{ DOM_VK_PAGE_DOWN/* : Number*/ : 34},
  "public static const",{ DOM_VK_END/* : Number*/ : 35},
  "public static const",{ DOM_VK_HOME/* : Number*/ : 36},
  "public static const",{ DOM_VK_LEFT/* : Number*/ : 37},
  "public static const",{ DOM_VK_UP/* : Number*/ : 38},
  "public static const",{ DOM_VK_RIGHT/* : Number*/ : 39},
  "public static const",{ DOM_VK_DOWN/* : Number*/ : 40},
  "public static const",{ DOM_VK_PRINTSCREEN/* : Number*/ : 44},
  "public static const",{ DOM_VK_INSERT/* : Number*/ : 45},
  "public static const",{ DOM_VK_DELETE/* : Number*/ : 46},
  "public static const",{ DOM_VK_0/* : Number*/ : 48},
  "public static const",{ DOM_VK_1/* : Number*/ : 49},
  "public static const",{ DOM_VK_2/* : Number*/ : 50},
  "public static const",{ DOM_VK_3/* : Number*/ : 51},
  "public static const",{ DOM_VK_4/* : Number*/ : 52},
  "public static const",{ DOM_VK_5/* : Number*/ : 53},
  "public static const",{ DOM_VK_6/* : Number*/ : 54},
  "public static const",{ DOM_VK_7/* : Number*/ : 55},
  "public static const",{ DOM_VK_8/* : Number*/ : 56},
  "public static const",{ DOM_VK_9/* : Number*/ : 57},
  "public static const",{ DOM_VK_SEMICOLON/* : Number*/ : 59},
  "public static const",{ DOM_VK_EQUALS/* : Number*/ : 61},
  "public static const",{ DOM_VK_A/* : Number*/ : 65},
  "public static const",{ DOM_VK_B/* : Number*/ : 66},
  "public static const",{ DOM_VK_C/* : Number*/ : 67},
  "public static const",{ DOM_VK_D/* : Number*/ : 68},
  "public static const",{ DOM_VK_E/* : Number*/ : 69},
  "public static const",{ DOM_VK_F/* : Number*/ : 70},
  "public static const",{ DOM_VK_G/* : Number*/ : 71},
  "public static const",{ DOM_VK_H/* : Number*/ : 72},
  "public static const",{ DOM_VK_I/* : Number*/ : 73},
  "public static const",{ DOM_VK_J/* : Number*/ : 74},
  "public static const",{ DOM_VK_K/* : Number*/ : 75},
  "public static const",{ DOM_VK_L/* : Number*/ : 76},
  "public static const",{ DOM_VK_M/* : Number*/ : 77},
  "public static const",{ DOM_VK_N/* : Number*/ : 78},
  "public static const",{ DOM_VK_O/* : Number*/ : 79},
  "public static const",{ DOM_VK_P/* : Number*/ : 80},
  "public static const",{ DOM_VK_Q/* : Number*/ : 81},
  "public static const",{ DOM_VK_R/* : Number*/ : 82},
  "public static const",{ DOM_VK_S/* : Number*/ : 83},
  "public static const",{ DOM_VK_T/* : Number*/ : 84},
  "public static const",{ DOM_VK_U/* : Number*/ : 85},
  "public static const",{ DOM_VK_V/* : Number*/ : 86},
  "public static const",{ DOM_VK_W/* : Number*/ : 87},
  "public static const",{ DOM_VK_X/* : Number*/ : 88},
  "public static const",{ DOM_VK_Y/* : Number*/ : 89},
  "public static const",{ DOM_VK_Z/* : Number*/ : 90},
  "public static const",{ DOM_VK_CONTEXT_MENU/* : Number*/ : 93},
  "public static const",{ DOM_VK_NUMPAD0/* : Number*/ : 96},
  "public static const",{ DOM_VK_NUMPAD1/* : Number*/ : 97},
  "public static const",{ DOM_VK_NUMPAD2/* : Number*/ : 98},
  "public static const",{ DOM_VK_NUMPAD3/* : Number*/ : 99},
  "public static const",{ DOM_VK_NUMPAD4/* : Number*/ : 100},
  "public static const",{ DOM_VK_NUMPAD5/* : Number*/ : 101},
  "public static const",{ DOM_VK_NUMPAD6/* : Number*/ : 102},
  "public static const",{ DOM_VK_NUMPAD7/* : Number*/ : 103},
  "public static const",{ DOM_VK_NUMPAD8/* : Number*/ : 104},
  "public static const",{ DOM_VK_NUMPAD9/* : Number*/ : 105},
  "public static const",{ DOM_VK_MULTIPLY/* : Number*/ : 106},
  "public static const",{ DOM_VK_ADD/* : Number*/ : 107},
  "public static const",{ DOM_VK_SEPARATOR/* : Number*/ : 108},
  "public static const",{ DOM_VK_SUBTRACT/* : Number*/ : 109},
  "public static const",{ DOM_VK_DECIMAL/* : Number*/ : 110},
  "public static const",{ DOM_VK_DIVIDE/* : Number*/ : 111},
  "public static const",{ DOM_VK_F1/* : Number*/ : 112},
  "public static const",{ DOM_VK_F2/* : Number*/ : 113},
  "public static const",{ DOM_VK_F3/* : Number*/ : 114},
  "public static const",{ DOM_VK_F4/* : Number*/ : 115},
  "public static const",{ DOM_VK_F5/* : Number*/ : 116},
  "public static const",{ DOM_VK_F6/* : Number*/ : 117},
  "public static const",{ DOM_VK_F7/* : Number*/ : 118},
  "public static const",{ DOM_VK_F8/* : Number*/ : 119},
  "public static const",{ DOM_VK_F9/* : Number*/ : 120},
  "public static const",{ DOM_VK_F10/* : Number*/ : 121},
  "public static const",{ DOM_VK_F11/* : Number*/ : 122},
  "public static const",{ DOM_VK_F12/* : Number*/ : 123},
  "public static const",{ DOM_VK_F13/* : Number*/ : 124},
  "public static const",{ DOM_VK_F14/* : Number*/ : 125},
  "public static const",{ DOM_VK_F15/* : Number*/ : 126},
  "public static const",{ DOM_VK_F16/* : Number*/ : 127},
  "public static const",{ DOM_VK_F17/* : Number*/ : 128},
  "public static const",{ DOM_VK_F18/* : Number*/ : 129},
  "public static const",{ DOM_VK_F19/* : Number*/ : 130},
  "public static const",{ DOM_VK_F20/* : Number*/ : 131},
  "public static const",{ DOM_VK_F21/* : Number*/ : 132},
  "public static const",{ DOM_VK_F22/* : Number*/ : 133},
  "public static const",{ DOM_VK_F23/* : Number*/ : 134},
  "public static const",{ DOM_VK_F24/* : Number*/ : 135},
  "public static const",{ DOM_VK_NUM_LOCK/* : Number*/ : 144},
  "public static const",{ DOM_VK_SCROLL_LOCK/* : Number*/ : 145},
  "public static const",{ DOM_VK_COMMA/* : Number*/ : 188},
  "public static const",{ DOM_VK_PERIOD/* : Number*/ : 190},
  "public static const",{ DOM_VK_SLASH/* : Number*/ : 191},
  "public static const",{ DOM_VK_BACK_QUOTE/* : Number*/ : 192},
  "public static const",{ DOM_VK_OPEN_BRACKET/* : Number*/ : 219},
  "public static const",{ DOM_VK_BACK_SLASH/* : Number*/ : 220},
  "public static const",{ DOM_VK_CLOSE_BRACKET/* : Number*/ : 221},
  "public static const",{ DOM_VK_QUOTE/* : Number*/ : 222},
  "public static const",{ DOM_VK_META/* : Number*/ : 224},

];},[]
);joo.classLoader.prepare("package js",[""],
"public interface TextMetrics",function(TextMetrics,$$private){with(TextMetrics)with($$private)return[ /*
  function width() : Number;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public class Screen",function(Screen,$$private){with(Screen)with($$private)return[ 
  "public native function get top"/*() : int;*/,

  "public native function get left"/*() : int;*/,

  "public native function get width"/*() : int;*/,

  "public native function get height"/*() : int;*/,

  "public native function get pixelDepth"/*() : int;*/,

  "public native function get availTop"/*() : int;*/,

  "public native function get availLeft"/*() : int;*/,

  "public native function get availWidth"/*() : int;*/,

  "public native function get availHeight"/*() : int;*/,

  "public native function get colorDepth"/*() : int;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public interface ImageData",function(ImageData,$$private){with(ImageData)with($$private)return[ /*

  function width() : uint;*/,/*

  function height() : uint;*/,/*

  function data() : Array;*/, // CanvasPixelArray

];},[]
);joo.classLoader.prepare("package js",["import js.HTMLElement",""],
"public class HTMLCanvasElement extends HTMLElement",function(HTMLCanvasElement,$$private){with(HTMLCanvasElement)with($$private)return[ 

  "public native function get width"/*() : uint;*/,

  "public native function set width"/*(width : uint) : void;*/,

  "public native function get height"/*() : uint;*/,

  "public native function set height"/*(height : uint) : void;*/,

  /**
   * Returns a data: URL for the image in the canvas.
   * @param type if provided, controls the type of the image to be returned (e.g. PNG or JPEG).
   *   The default is image/png; that type is also used if the given type isn't supported.
   * @param args arguments specific to the type. They control the way that the image is generated.
   *   For image/jpeg, the second argument, if it is a number between 0.0 and 1.0, is treated as the desired
   *   quality level. If it is not a number or is outside that range, the default value is used,
   *   as if the argument had been omitted.
   * @return a data: URL for the image in the canvas.
   */
  "public native function toDataURL"/*(type : String, ...args) : String;*/,

  /**
   * Returns an object that exposes an API for drawing on the canvas.
   * Returns null if the given context ID is not supported.
   * The specification only defines one context, with the name "2d". If getContext() is called with that
   * exact string for its contextId argument, then the result is a reference to an object implementing
   * CanvasRenderingContext2D. Other extensions may define their own contexts, which would return
   * different objects.
   * @param type the type of context to return, where only "2d" has to be supported.
   * @return an object that exposes an API for drawing on the canvas, for "2d", a CanvasRenderingContext2D.
   */
  "public native function getContext"/*(type : String) : Object;*/,
];},[]
);joo.classLoader.prepare("package js",["import js.Node",""],
"public class TextNode extends Node",function(TextNode,$$private){with(TextNode)with($$private)return[ 
  "public native function get data"/*() : String;*/,

  "public native function set data"/*(data : String) : void;*/,

  "public native function appendData"/*(data : String) : void;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public class CSSPrimitiveValue",function(CSSPrimitiveValue,$$private){with(CSSPrimitiveValue)with($$private)return[ 

  "public static const",{ CSS_UNKNOWN/* : Number*/ : 0},
  "public static const",{ CSS_NUMBER/* : Number*/ : 1},
  /**
   * Many CSS properties take percentage values, such as width , margin-top , and font-size . The CSS
   * syntax for percentage is a number followed immediately by a % (percentage sign).
   */
  "public static const",{ CSS_PERCENTAGE/* : Number*/ : 2},
  /**
   * The font-size of the element.
   */
  "public static const",{ CSS_EMS/* : Number*/ : 3},
  /**
   * The x-height of the element's font . This is generally the height of lowercase letters in the font.
   */
  "public static const",{ CSS_EXS/* : Number*/ : 4},
  /**
   * For screen display, one pixel (dot) of the display. For very high resolution screens and for printers,
   * multiple pixels, so that the number of px per inch stays around 96.
   */
  "public static const",{ CSS_PX/* : Number*/ : 5},
  /**
   * One centimeter (which is 10 millimeters). For screen display, the number of pixels in an centimeter is
   * determined by the system's estimate (often incorrect) of the resolution of its display.
   */
  "public static const",{ CSS_CM/* : Number*/ : 6},
  /**
   * One millimeter. For screen display, the number of pixels in an millimeter is determined by the system's
   * estimate (often incorrect) of the resolution of its display.
   */
  "public static const",{ CSS_MM/* : Number*/ : 7},
  /**
   * One inch (which is 2.54 centimeters). For screen display, the number of pixels in an inch is determined
   * by the system's estimate (often incorrect) of the resolution of its display.
   */
  "public static const",{ CSS_IN/* : Number*/ : 8},
  /**
   * One point (which is 1/72 of an inch). For screen display, the number of pixels in an point is determined
   * by the system's estimate (often incorrect) of the resolution of its display.
   */
  "public static const",{ CSS_PT/* : Number*/ : 9},
  /**
   * One pica (which is 12 points). For screen display, the number of pixels in an pica is determined by the
   * system's estimate (often incorrect) of the resolution of its display.
   */
  "public static const",{ CSS_PC/* : Number*/ : 10},
  "public static const",{ CSS_DEG/* : Number*/ : 11},
  "public static const",{ CSS_RAD/* : Number*/ : 12},
  "public static const",{ CSS_GRAD/* : Number*/ : 13},
  "public static const",{ CSS_MS/* : Number*/ : 14},
  "public static const",{ CSS_S/* : Number*/ : 15},
  "public static const",{ CSS_HZ/* : Number*/ : 16},
  "public static const",{ CSS_KHZ/* : Number*/ : 17},
  "public static const",{ CSS_DIMENSION/* : Number*/ : 18},
  "public static const",{ CSS_STRING/* : Number*/ : 19},
  "public static const",{ CSS_URI/* : Number*/ : 20},
  "public static const",{ CSS_IDENT/* : Number*/ : 21},
  "public static const",{ CSS_ATTR/* : Number*/ : 22},
  "public static const",{ CSS_COUNTER/* : Number*/ : 23},
  "public static const",{ CSS_RECT/* : Number*/ : 24},
  "public static const",{ CSS_RGBCOLOR/* : Number*/ : 25},

  "public function CSSPrimitiveValue",function $CSSPrimitiveValue() {
    this[$super]();
  },
];},[]
);joo.classLoader.prepare("package js",[""],
"public interface CanvasGradient",function(CanvasGradient,$$private){with(CanvasGradient)with($$private)return[ /*
  // opaque object
  function addColorStop(offset : Number, color : String) : void;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public class Attribute",function(Attribute,$$private){with(Attribute)with($$private)return[ 
  "public native function get specified"/*() : Boolean;*/,

  "public native function get name"/*() : String;*/,

  "public native function get value"/*(): Object;*/,
];},[]
);joo.classLoader.prepare("package js",[""],
"public class Style",function(Style,$$private){with(Style)with($$private)return[ 
  "public native function get cssText"/*() : String;*/,

  "public native function set cssText"/*(value : String) : void;*/,

  "public native function get azimuth"/*() : String;*/,

  "public native function set azimuth"/*(value : String) : void;*/,

  
  "public native function get background"/*() : String;*/,

  "public native function set background"/*(value : String) : void;*/,

  
  "public native function get backgroundAttachment"/*() : String;*/,

  "public native function set backgroundAttachment"/*(value : String) : void;*/,

  
  "public native function get backgroundColor"/*() : String;*/,

  "public native function set backgroundColor"/*(value : String) : void;*/,

  
  "public native function get backgroundImage"/*() : String;*/,

  "public native function set backgroundImage"/*(value : String) : void;*/,

  
  "public native function get backgroundPosition"/*() : String;*/,

  "public native function set backgroundPosition"/*(value : String) : void;*/,

  
  "public native function get backgroundRepeat"/*() : String;*/,

  "public native function set backgroundRepeat"/*(value : String) : void;*/,

  
  "public native function get border"/*() : String;*/,

  "public native function set border"/*(value : String) : void;*/,

  
  "public native function get borderCollapse"/*() : String;*/,

  "public native function set borderCollapse"/*(value : String) : void;*/,

  
  "public native function get borderColor"/*() : String;*/,

  "public native function set borderColor"/*(value : String) : void;*/,

  
  "public native function get borderSpacing"/*() : String;*/,

  "public native function set borderSpacing"/*(value : String) : void;*/,

  
  "public native function get borderStyle"/*() : String;*/,

  "public native function set borderStyle"/*(value : String) : void;*/,

  
  "public native function get borderTop"/*() : String;*/,

  "public native function set borderTop"/*(value : String) : void;*/,

  
  "public native function get borderRight"/*() : String;*/,

  "public native function set borderRight"/*(value : String) : void;*/,

  
  "public native function get borderBottom"/*() : String;*/,

  "public native function set borderBottom"/*(value : String) : void;*/,

  
  "public native function get borderLeft"/*() : String;*/,

  "public native function set borderLeft"/*(value : String) : void;*/,

  
  "public native function get borderTopColor"/*() : String;*/,

  "public native function set borderTopColor"/*(value : String) : void;*/,

  
  "public native function get borderRightColor"/*() : String;*/,

  "public native function set borderRightColor"/*(value : String) : void;*/,

  
  "public native function get borderBottomColor"/*() : String;*/,

  "public native function set borderBottomColor"/*(value : String) : void;*/,

  
  "public native function get borderLeftColor"/*() : String;*/,

  "public native function set borderLeftColor"/*(value : String) : void;*/,

  
  "public native function get borderTopStyle"/*() : String;*/,

  "public native function set borderTopStyle"/*(value : String) : void;*/,

  
  "public native function get borderRightStyle"/*() : String;*/,

  "public native function set borderRightStyle"/*(value : String) : void;*/,

  
  "public native function get borderBottomStyle"/*() : String;*/,

  "public native function set borderBottomStyle"/*(value : String) : void;*/,

  
  "public native function get borderLeftStyle"/*() : String;*/,

  "public native function set borderLeftStyle"/*(value : String) : void;*/,

  
  "public native function get borderTopWidth"/*() : String;*/,

  "public native function set borderTopWidth"/*(value : String) : void;*/,

  
  "public native function get borderRightWidth"/*() : String;*/,

  "public native function set borderRightWidth"/*(value : String) : void;*/,

  
  "public native function get borderBottomWidth"/*() : String;*/,

  "public native function set borderBottomWidth"/*(value : String) : void;*/,

  
  "public native function get borderLeftWidth"/*() : String;*/,

  "public native function set borderLeftWidth"/*(value : String) : void;*/,

  
  "public native function get borderWidth"/*() : String;*/,

  "public native function set borderWidth"/*(value : String) : void;*/,

  
  "public native function get bottom"/*() : String;*/,

  "public native function set bottom"/*(value : String) : void;*/,

  
  "public native function get captionSide"/*() : String;*/,

  "public native function set captionSide"/*(value : String) : void;*/,

  
  "public native function get clear"/*() : String;*/,

  "public native function set clear"/*(value : String) : void;*/,

  
  "public native function get clip"/*() : String;*/,

  "public native function set clip"/*(value : String) : void;*/,

  
  "public native function get color"/*() : String;*/,

  "public native function set color"/*(value : String) : void;*/,

  
  "public native function get content"/*() : String;*/,

  "public native function set content"/*(value : String) : void;*/,

  
  "public native function get counterIncrement"/*() : String;*/,

  "public native function set counterIncrement"/*(value : String) : void;*/,

  
  "public native function get counterReset"/*() : String;*/,

  "public native function set counterReset"/*(value : String) : void;*/,

  
  "public native function get cue"/*() : String;*/,

  "public native function set cue"/*(value : String) : void;*/,

  
  "public native function get cueAfter"/*() : String;*/,

  "public native function set cueAfter"/*(value : String) : void;*/,

  
  "public native function get cueBefore"/*() : String;*/,

  "public native function set cueBefore"/*(value : String) : void;*/,

  
  "public native function get cursor"/*() : String;*/,

  "public native function set cursor"/*(value : String) : void;*/,

  
  "public native function get direction"/*() : String;*/,

  "public native function set direction"/*(value : String) : void;*/,

  
  "public native function get display"/*() : String;*/,

  "public native function set display"/*(value : String) : void;*/,

  
  "public native function get elevation"/*() : String;*/,

  "public native function set elevation"/*(value : String) : void;*/,

  
  "public native function get emptyCells"/*() : String;*/,

  "public native function set emptyCells"/*(value : String) : void;*/,

  
  "public native function get cssFloat"/*() : String;*/,

  "public native function set cssFloat"/*(value : String) : void;*/,

  
  "public native function get font"/*() : String;*/,

  "public native function set font"/*(value : String) : void;*/,

  
  "public native function get fontFamily"/*() : String;*/,

  "public native function set fontFamily"/*(value : String) : void;*/,

  
  "public native function get fontSize"/*() : String;*/,

  "public native function set fontSize"/*(value : String) : void;*/,

  
  "public native function get fontSizeAdjust"/*() : String;*/,

  "public native function set fontSizeAdjust"/*(value : String) : void;*/,

  
  "public native function get fontStretch"/*() : String;*/,

  "public native function set fontStretch"/*(value : String) : void;*/,

  
  "public native function get fontStyle"/*() : String;*/,

  "public native function set fontStyle"/*(value : String) : void;*/,

  
  "public native function get fontVariant"/*() : String;*/,

  "public native function set fontVariant"/*(value : String) : void;*/,

  
  "public native function get fontWeight"/*() : String;*/,

  "public native function set fontWeight"/*(value : String) : void;*/,

  
  "public native function get height"/*() : String;*/,

  "public native function set height"/*(value : String) : void;*/,

  
  "public native function get left"/*() : String;*/,

  "public native function set left"/*(value : String) : void;*/,

  
  "public native function get letterSpacing"/*() : String;*/,

  "public native function set letterSpacing"/*(value : String) : void;*/,

  
  "public native function get lineHeight"/*() : String;*/,

  "public native function set lineHeight"/*(value : String) : void;*/,

  
  "public native function get listStyle"/*() : String;*/,

  "public native function set listStyle"/*(value : String) : void;*/,

  
  "public native function get listStyleImage"/*() : String;*/,

  "public native function set listStyleImage"/*(value : String) : void;*/,

  
  "public native function get listStylePosition"/*() : String;*/,

  "public native function set listStylePosition"/*(value : String) : void;*/,

  
  "public native function get listStyleType"/*() : String;*/,

  "public native function set listStyleType"/*(value : String) : void;*/,

  
  "public native function get margin"/*() : String;*/,

  "public native function set margin"/*(value : String) : void;*/,

  
  "public native function get marginTop"/*() : String;*/,

  "public native function set marginTop"/*(value : String) : void;*/,

  
  "public native function get marginRight"/*() : String;*/,

  "public native function set marginRight"/*(value : String) : void;*/,

  
  "public native function get marginBottom"/*() : String;*/,

  "public native function set marginBottom"/*(value : String) : void;*/,

  
  "public native function get marginLeft"/*() : String;*/,

  "public native function set marginLeft"/*(value : String) : void;*/,

  
  "public native function get markerOffset"/*() : String;*/,

  "public native function set markerOffset"/*(value : String) : void;*/,

  
  "public native function get marks"/*() : String;*/,

  "public native function set marks"/*(value : String) : void;*/,

  
  "public native function get maxHeight"/*() : String;*/,

  "public native function set maxHeight"/*(value : String) : void;*/,

  
  "public native function get maxWidth"/*() : String;*/,

  "public native function set maxWidth"/*(value : String) : void;*/,

  
  "public native function get minHeight"/*() : String;*/,

  "public native function set minHeight"/*(value : String) : void;*/,

  
  "public native function get minWidth"/*() : String;*/,

  "public native function set minWidth"/*(value : String) : void;*/,

  
  "public native function get orphans"/*() : String;*/,

  "public native function set orphans"/*(value : String) : void;*/,

  
  "public native function get outline"/*() : String;*/,

  "public native function set outline"/*(value : String) : void;*/,

  
  "public native function get outlineColor"/*() : String;*/,

  "public native function set outlineColor"/*(value : String) : void;*/,

  
  "public native function get outlineStyle"/*() : String;*/,

  "public native function set outlineStyle"/*(value : String) : void;*/,

  
  "public native function get outlineWidth"/*() : String;*/,

  "public native function set outlineWidth"/*(value : String) : void;*/,

  
  "public native function get overflow"/*() : String;*/,

  "public native function set overflow"/*(value : String) : void;*/,

  
  "public native function get padding"/*() : String;*/,

  "public native function set padding"/*(value : String) : void;*/,

  
  "public native function get paddingTop"/*() : String;*/,

  "public native function set paddingTop"/*(value : String) : void;*/,

  
  "public native function get paddingRight"/*() : String;*/,

  "public native function set paddingRight"/*(value : String) : void;*/,

  
  "public native function get paddingBottom"/*() : String;*/,

  "public native function set paddingBottom"/*(value : String) : void;*/,

  
  "public native function get paddingLeft"/*() : String;*/,

  "public native function set paddingLeft"/*(value : String) : void;*/,

  
  "public native function get page"/*() : String;*/,

  "public native function set page"/*(value : String) : void;*/,

  
  "public native function get pageBreakAfter"/*() : String;*/,

  "public native function set pageBreakAfter"/*(value : String) : void;*/,

  
  "public native function get pageBreakBefore"/*() : String;*/,

  "public native function set pageBreakBefore"/*(value : String) : void;*/,

  
  "public native function get pageBreakInside"/*() : String;*/,

  "public native function set pageBreakInside"/*(value : String) : void;*/,

  
  "public native function get pause"/*() : String;*/,

  "public native function set pause"/*(value : String) : void;*/,

  
  "public native function get pauseAfter"/*() : String;*/,

  "public native function set pauseAfter"/*(value : String) : void;*/,

  
  "public native function get pauseBefore"/*() : String;*/,

  "public native function set pauseBefore"/*(value : String) : void;*/,

  
  "public native function get pitch"/*() : String;*/,

  "public native function set pitch"/*(value : String) : void;*/,

  
  "public native function get pitchRange"/*() : String;*/,

  "public native function set pitchRange"/*(value : String) : void;*/,

  
  "public native function get playDuring"/*() : String;*/,

  "public native function set playDuring"/*(value : String) : void;*/,

  
  "public native function get position"/*() : String;*/,

  "public native function set position"/*(value : String) : void;*/,

  
  "public native function get quotes"/*() : String;*/,

  "public native function set quotes"/*(value : String) : void;*/,

  
  "public native function get richness"/*() : String;*/,

  "public native function set richness"/*(value : String) : void;*/,

  
  "public native function get right"/*() : String;*/,

  "public native function set right"/*(value : String) : void;*/,

  
  "public native function get size"/*() : String;*/,

  "public native function set size"/*(value : String) : void;*/,

  
  "public native function get speak"/*() : String;*/,

  "public native function set speak"/*(value : String) : void;*/,

  
  "public native function get speakHeader"/*() : String;*/,

  "public native function set speakHeader"/*(value : String) : void;*/,

  
  "public native function get speakNumeral"/*() : String;*/,

  "public native function set speakNumeral"/*(value : String) : void;*/,

  
  "public native function get speakPunctuation"/*() : String;*/,

  "public native function set speakPunctuation"/*(value : String) : void;*/,

  
  "public native function get speechRate"/*() : String;*/,

  "public native function set speechRate"/*(value : String) : void;*/,

  
  "public native function get stress"/*() : String;*/,

  "public native function set stress"/*(value : String) : void;*/,

  
  "public native function get tableLayout"/*() : String;*/,

  "public native function set tableLayout"/*(value : String) : void;*/,

  
  "public native function get textAlign"/*() : String;*/,

  "public native function set textAlign"/*(value : String) : void;*/,

  
  "public native function get textDecoration"/*() : String;*/,

  "public native function set textDecoration"/*(value : String) : void;*/,

  
  "public native function get textIndent"/*() : String;*/,

  "public native function set textIndent"/*(value : String) : void;*/,

  
  "public native function get textShadow"/*() : String;*/,

  "public native function set textShadow"/*(value : String) : void;*/,

  
  "public native function get textTransform"/*() : String;*/,

  "public native function set textTransform"/*(value : String) : void;*/,

  
  "public native function get top"/*() : String;*/,

  "public native function set top"/*(value : String) : void;*/,

  
  "public native function get unicodeBidi"/*() : String;*/,

  "public native function set unicodeBidi"/*(value : String) : void;*/,

  
  "public native function get verticalAlign"/*() : String;*/,

  "public native function set verticalAlign"/*(value : String) : void;*/,

  
  "public native function get visibility"/*() : String;*/,

  "public native function set visibility"/*(value : String) : void;*/,

  
  "public native function get voiceFamily"/*() : String;*/,

  "public native function set voiceFamily"/*(value : String) : void;*/,

  
  "public native function get volume"/*() : String;*/,

  "public native function set volume"/*(value : String) : void;*/,

  
  "public native function get whiteSpace"/*() : String;*/,

  "public native function set whiteSpace"/*(value : String) : void;*/,

  
  "public native function get widows"/*() : String;*/,

  "public native function set widows"/*(value : String) : void;*/,

  
  "public native function get width"/*() : String;*/,

  "public native function set width"/*(value : String) : void;*/,

  
  "public native function get wordSpacing"/*() : String;*/,

  "public native function set wordSpacing"/*(value : String) : void;*/,

  
  "public native function get zIndex"/*() : String;*/,

  "public native function set zIndex"/*(value : String) : void;*/,

  

  // CSS 3 (Firefox, Safari, Opeara):
  "public native function get opacity"/*() : String;*/,

  "public native function set opacity"/*(value : String) : void;*/,

  

  // IE only:
  "public native function get filter"/*() : String;*/,

  "public native function set filter"/*(value : String) : void;*/,

  // WebKit only:
  "public native function get WebkitTransform"/*() : String;*/,

  "public native function set WebkitTransform"/*(value : String) : void;*/,


];},[]
);joo.classLoader.prepare("package js",["import js.Element",""],
"public class HTMLElement extends Element",function(HTMLElement,$$private){with(HTMLElement)with($$private)return[
];},[]
);joo.classLoader.prepare("package js", ["import js.Element","import js.Collection",""],

"public class Node",function(Node,$$private){with(Node)with($$private)return[ 

  "public static const",{ ELEMENT_NODE/* : int*/ : 1},

  "public static const",{ ATTRIBUTE_NODE/* : int*/ : 2},

  "public static const",{ TEXT_NODE/* : int*/ : 3},

  "public static const",{ CDATA_SECTION_NODE/* : int*/ : 4},

  "public static const",{ ENTITY_REFERENCE_NODE/* : int*/ : 5},

  "public static const",{ ENTITY_NODE/* : int*/ : 6},

  "public static const",{ PROCESSING_INSTRUCTION_NODE/* : int*/ : 7},

  "public static const",{ COMMENT_NODE/* : int*/ : 8},

  "public static const",{ DOCUMENT_NODE/* : int*/ : 9},

  "public static const",{ DOCUMENT_TYPE_NODE/* : int*/ : 10},

  "public static const",{ DOCUMENT_FRAGMENT_NODE/* : int*/ : 11},

  "public static const",{ NOTATION_NODE/* : int*/ : 12},

  "public static const",{ DOCUMENT_POSITION_DISCONNECTED/* : int*/ : 1},

  "public static const",{ DOCUMENT_POSITION_PRECEDING/* : int*/ : 2},

  "public static const",{ DOCUMENT_POSITION_FOLLOWING/* : int*/ : 4},

  "public static const",{ DOCUMENT_POSITION_CONTAINS/* : int*/ : 8},

  "public static const",{ DOCUMENT_POSITION_CONTAINED_BY/* : int*/ : 16},

  "public static const",{ DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC/* : int*/ : 32},



  "public native function get nodeName"/*() : String;*/,



  "public native function get localName"/*() : String;*/,



  "public native function get namespaceURI"/*() : String;*/,



  "public native function get nodeType"/*() : Number;*/,



  "public native function get nodeValue"/*() : String;*/,



  "public native function get parentNode"/*() : Element;*/,



  "public native function get childNodes"/*() : Collection;*/,



  "public native function get firstChild"/*() : Node;*/,



  "public native function get lastChild"/*() : Node;*/,



  "public native function get nextSibling"/*() : Node;*/,



  "public native function get previousSibling"/*() : Node;*/,



  "public native function setAttribute"/*(name : String, value : Object) : void;*/,



  "public native function removeChild"/*(child : Node) : Node;*/,



  "public native function appendChild"/*(child : Node) : Node;*/,



  "public native function insertBefore"/*(newNode : Node, refNode : Node) : Node;*/,



  "public native function replaceChild"/*(newChild : Node, oldChild : Node) : Node;*/,



  "public native function cloneNode"/*(recursive : Boolean) : Node;*/,



  "public native function getElementsByTagName"/*(name : String) : Collection;*/,



  "public native function getElementsByTagNameNS"/*(ns : String, name : String) : Collection;*/,



  "public native function addEventListener"/*(eventType : String, handler : Function, capture : Boolean) : void;*/,



  "public native function removeEventListener"/*(eventType : String, handler : Function, capture : Boolean) : void;*/,



  "public native function attachEvent"/*(eventType : String, handler : Function) : Boolean;*/,



  "public native function detachEvent"/*(eventType : String, handler : Function) : void;*/,

];},[]

);