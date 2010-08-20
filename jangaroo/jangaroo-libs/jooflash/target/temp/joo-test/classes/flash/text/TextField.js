joo.classLoader.prepare("package flash.text",



































"public class TextField extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_backgroundColor=$$l+'_backgroundColor',$_border=$$l+'_border',$_borderColor=$$l+'_borderColor',$_defaultTextFormat=$$l+'_defaultTextFormat',$_htmlText=$$l+'_htmlText',$_text=$$l+'_text',$getElementName=$$l+'getElementName',$updateElementProperty=$$l+'updateElementProperty';return[


"public function TextField",function(){this[$super]();},


"public var",{alwaysShowSelection: undefined},


"public var",{antiAliasType: undefined},


"public var",{autoSize: undefined},


"public var",{background: undefined},


"private var",{_backgroundColor: undefined},

"public function get backgroundColor",function(){
return this[$_backgroundColor];
},

"public function set backgroundColor",function(val){
this[$_backgroundColor]=val;
this[$updateElementProperty]("style.backgroundColor",flash.display.Graphics.toRGBA(val));
},


"private var",{_border: undefined},

"public function get border",function(){
return this[$_border];
},

"public function set border",function(val){
this[$_border]=val;
this[$updateElementProperty]("style.borderWidth",val?"1px":"0");
},


"private var",{_borderColor: undefined},

"public function get borderColor",function(){
return this[$_borderColor];
},

"public function set borderColor",function(val){
this[$_borderColor]=val;
this[$updateElementProperty]("style.borderColor",flash.display.Graphics.toRGBA(val));
},


"public var",{bottomScrollV: undefined},


"public var",{caretIndex: undefined},


"public var",{condenseWhite: undefined},


"private var",{_defaultTextFormat: undefined},

"public function get defaultTextFormat",function(){
return this[$_defaultTextFormat];
},

"public function set defaultTextFormat",function(val){
this[$_defaultTextFormat]=val;
this[$updateElementProperty]("style.fontFamily",val.font);
this[$updateElementProperty]("style.fontSize",val.size);
this[$updateElementProperty]("style.color",val.color?flash.display.Graphics.toRGBA(val.color):"black");
this[$updateElementProperty]("style.fontWeight",val.bold?"bold":"normal");

},


"public var",{displayAsPassword: undefined},


"public var",{embedFonts: undefined},


"public var",{gridFitType: undefined},

"private var",{_htmlText: undefined},


"public function get htmlText",function(){
return this[$_htmlText];
},


"public function set htmlText",function(val){
this[$_htmlText]=val;
this[$updateElementProperty]("innerHTML",val);
},


"public var",{length: undefined},


"public var",{maxChars: undefined},


"public var",{maxScrollH: undefined},


"public var",{maxScrollV: undefined},


"public var",{mouseWheelEnabled: undefined},


"public var",{multiline: undefined},


"public var",{numLines: undefined},


"public var",{restrict: undefined},


"public var",{scrollH: undefined},


"public var",{scrollV: undefined},


"public var",{selectable: undefined},

"public var",{selectedText: undefined},


"public var",{selectionBeginIndex: undefined},


"public var",{selectionEndIndex: undefined},


"public var",{sharpness: undefined},


"public var",{styleSheet: undefined},


"private var",{_text: undefined},

"public function get text",function(){
return this[$_text];
},

"public function set text",function(val){
this[$_text]=val;

this[$updateElementProperty]("innerHTML",val);
},


"public var",{_textColor: undefined},

"public function get textColor",function(){
return this._textColor;
},

"public function set textColor",function(val){
this._textColor=val;
this[$updateElementProperty]("style.color",flash.display.Graphics.toRGBA(val));
},


"public var",{textHeight: undefined},


"public var",{textWidth: undefined},


"public var",{thickness: undefined},


"public var",{type: undefined},


"public var",{useRichTextClipboard: undefined},


"public var",{wordWrap: undefined},




























































"override protected function getElementName",function(){
return"span";
},

"private function updateElementProperty",function(propertyPath,value){
var element=this.getElement();
if(element){
var propertyPathArcs=propertyPath.split(".");
var lastIndex=propertyPathArcs.length-1;
for(var i=0;i<lastIndex;++i){
element=element[propertyPathArcs[i]];
}
element[propertyPathArcs[lastIndex]]=value;
}
},

];},[],["flash.display.InteractiveObject","flash.display.Graphics"]
);