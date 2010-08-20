joo.classLoader.prepare("package flash.display",











































"public class Stage extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$x=$$l+'x',$y=$$l+'y',$createElement=$$l+'createElement',$enterFrame=$$l+'enterFrame',$id=$$l+'id',$_frameRate=$$l+'_frameRate',$frameTimer=$$l+'frameTimer';return[function(){joo.classLoader.init(flash.events.Event,flash.events.TimerEvent,flash.utils.Timer);},

"private static var",{instance: undefined},
"public static function getInstance",function(id){if(arguments.length<1){id="stage";}
if(!$$private.instance){
new flash.display.Stage(id);
}
return $$private.instance;
},

"public function Stage",function(id){
this[$id]=id;
$$private.instance=this;
this[$super]();
this[$frameTimer]=new flash.utils.Timer(1000/this[$_frameRate]);
this[$frameTimer].addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,$enterFrame));
this[$frameTimer].start();
},

"override public function get x",function(){

return this.getElement().offsetLeft;
},

"override public function get y",function(){

return this.getElement().offsetTop;
},


"public function get stageHeight",function(){
return this.getElement().offsetHeight;
},

"public function set stageHeight",function(value){
this.getElement()['offsetHeight']=value;
},


"public function get stageWidth",function(){
return this.getElement().offsetWidth;
},

"public function set stageWidth",function(value){
this.getElement()['offsetWidth']=value;
},

"override protected function createElement",function(){
var element=window.document.getElementById(this[$id]);
element.style.position="relative";
var width=element.getAttribute("width");
if(width){
element.style.width=width+"px";
}
var height=element.getAttribute("height");
if(height){
element.style.height=height+"px";
}
element.innerHTML="";
return element;
},

"private function enterFrame",function(){
this.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME,false,false));
},












"public function get frameRate",function(){
return this[$_frameRate];
},













"public function set frameRate",function(value){
this[$_frameRate]=value;
this[$frameTimer].delay=1000/value;
},

"private var",{id: undefined},
"private var",{_frameRate:30},
"private var",{frameTimer: undefined},
];},["getInstance"],["flash.display.DisplayObjectContainer","flash.utils.Timer","flash.events.TimerEvent","flash.events.Event"]
);