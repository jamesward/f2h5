joo.classLoader.prepare("package flash.display",















"public class Sprite extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},

"public var",{buttonMode: undefined},
"public var",{useHandCursor: undefined},







"public function Sprite",function(){
this[$super]();
},
















"public function get graphics",function(){
if(!this[$_graphics]){
var canvas=flash.display.Shape.createCanvas();
var element=this.getElement();
if(element.firstChild){
element.insertBefore(canvas,element.firstChild);
}else{
element.appendChild(canvas);
}
this[$_graphics]=new flash.display.Graphics(canvas.getContext("2d"));
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
];},[],["flash.display.DisplayObjectContainer","flash.display.Shape","flash.display.Graphics"]
);