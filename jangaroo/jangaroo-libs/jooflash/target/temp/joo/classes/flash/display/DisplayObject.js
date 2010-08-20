joo.classLoader.prepare("package flash.display",








"public class DisplayObject extends flash.events.EventDispatcher implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_mouseX=$$l+'_mouseX',$_mouseY=$$l+'_mouseY',$_handleMouseMove=$$l+'_handleMouseMove',$addEventListener=$$l+'addEventListener',$removeEventListener=$$l+'removeEventListener',$transformAndDispatch=$$l+'transformAndDispatch',$dispatchWithOwnTarget=$$l+'dispatchWithOwnTarget',$_stage=$$l+'_stage',$_parent=$$l+'_parent',$_elem=$$l+'_elem',$_x=$$l+'_x',$_y=$$l+'_y',$_width=$$l+'_width',$_height=$$l+'_height',$_transform=$$l+'_transform';return[function(){joo.classLoader.init(flash.events.MouseEvent,flash.geom.Transform,flash.events.Event);},

"private var",{_mouseX:0},
"private var",{_mouseY:0},

"public function get mouseX",function()
{
return this[$_mouseX];
},

"public function get mouseY",function()
{
return this[$_mouseY];
},

"public var",{alpha: undefined},

"public function stopDrag",function()
{

},

"public var",{filters: undefined},

"public var",{visible: undefined},


"public function DisplayObject",function(){
this[$super]();
this[$_stage]=flash.display.Stage.getInstance();
this[$_elem]=this.createElement();
if(!isNaN(this.x)){
this[$_elem].style.left=this.x+"px";
}
if(!isNaN(this.y)){
this[$_elem].style.top=this.y+"px";
}
if(!isNaN(this[$_stage].stageWidth)){
this[$_elem].style.width=this[$_stage].stageWidth+"px";
this[$_elem].style.height=this[$_stage].stageHeight+"px";
}

this.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,$_handleMouseMove));
},

"private function _handleMouseMove",function(event)
{
this[$_mouseX]=event.localX;
this[$_mouseY]=event.localY;
},






























"public function get stage",function(){
return this[$_stage];
},
































"public function get parent",function(){
return this[$_parent];
},


"public function set parent",function(parent){
this[$_parent]=parent;
},

"private static function createEventMap",function(){var events=arguments;
var result={};
for(var i=0;i<events.length;++i){
result[events[i].toLowerCase()]=events[i];
}
return result;
},

"private static const",{DELEGATED_EVENT_MAP:function(){return(
$$private.createEventMap(flash.events.MouseEvent.CLICK,flash.events.MouseEvent.MOUSE_MOVE));}},

"override public function addEventListener",function(type,listener,useCapture,
priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var newEventType=!this.hasEventListener(type);
this[$addEventListener](type,listener,useCapture,priority,useWeakReference);
var jsType=type.toLowerCase();
if(newEventType){
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
this[$_elem].addEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}else if(this!=this.stage&&flash.events.Event.ENTER_FRAME==type){
if(this.stage!=undefined)
{
this.stage.addEventListener(type,$$bound(this,$dispatchWithOwnTarget),useCapture,priority,useWeakReference);
}
}
}
},

"override public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
this[$removeEventListener](type,listener,useCapture);
var jsType=type.toLowerCase();
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
this[$_elem].removeEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}
},

"private function transformAndDispatch",function(event){
var type=$$private.DELEGATED_EVENT_MAP[event.type];
return this.dispatchEvent(new flash.events.MouseEvent(type,true,true,event.pageX-this.stage.x,event.pageY-this.stage.y,null,
event.ctrlKey,event.altKey,event.shiftKey));
},

"private function dispatchWithOwnTarget",function(event){
return this.dispatchEvent(event.clone());
},







































"public function get x",function(){
return this[$_x];
},







"public function set x",function(value){
this[$_x]=value;
if(this[$_elem]){
this[$_elem].style.left=value+"px";
}
},
































"public function get y",function(){
return this[$_y];
},







"public function set y",function(value){
this[$_y]=value;
if(this[$_elem]){
this[$_elem].style.top=value+"px";
}
},



































"public function get width",function(){
return this[$_elem].offsetWidth;

},






"public function set width",function(value){
this[$_width]=value;
},







































"public function get height",function(){
return this[$_height];
},






"public function set height",function(value){
this[$_height]=value;
},

"protected function createElement",function(){
var elem=window.document.createElement(this.getElementName());
elem.style.position="absolute";
return elem;
},

"protected function getElementName",function(){
return"div";
},

"public function getElement",function(){
return this[$_elem];
},






























































"public function get transform",function(){
if(!this[$_transform])
this[$_transform]=new flash.geom.Transform(this);
return this[$_transform];
},

"public function set transform",function(value){
this[$_transform]=value;
},

"private var",{_stage: undefined},
"private var",{_parent: undefined},
"private var",{_elem: undefined},
"private var",{_x:0,_y:0,_width: undefined,_height: undefined},
"private var",{_transform: undefined},
];},[],["flash.events.EventDispatcher","flash.display.IBitmapDrawable","flash.display.Stage","flash.events.MouseEvent","flash.events.Event","flash.geom.Transform"]
);