joo.classLoader.prepare("package flash.display",
















"public class Shape extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},




"public function Shape",function(){
this[$super]();
},

"override protected function createElement",function(){
var canvas=flash.display.Shape.createCanvas();
canvas.style.position="absolute";
return canvas;
},

"internal static function createCanvas",function(){
var canvas=window.document.createElement("canvas");

canvas.width=flash.display.Stage.getInstance().stageWidth;
canvas.height=flash.display.Stage.getInstance().stageHeight;
return canvas;
},

"internal static function createGraphics",function(canvas){
return new flash.display.Graphics(canvas.getContext("2d"));
},





"public function get graphics",function(){
if(!this[$_graphics]){
this[$_graphics]=flash.display.Shape.createGraphics(this.getElement());
}
return this[$_graphics];
},

"override public function set transform",function(value){
this[$transform]=value;
var m=value.matrix;
if(m){
this.graphics.renderingContext.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
}
},

"private var",{_graphics: undefined},
];},["createCanvas","createGraphics"],["flash.display.DisplayObject","flash.display.Stage","flash.display.Graphics"]
);