joo.classLoader.prepare("package flash.geom",





"public class Matrix",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},











"public function Matrix",function(a,b,c,d,tx,ty){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){a=1;}b=0;}c=0;}d=1;}tx=0;}ty=0;}this[$super]();
this.a=a;
this.b=b;
this.c=c;
this.d=d;
this.tx=tx;
this.ty=ty;
},




"public var",{a: undefined},



"public var",{b: undefined},



"public var",{c: undefined},



"public var",{d: undefined},



"public var",{tx: undefined},



"public var",{ty: undefined},





"public function clone",function(){
return new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
},













"public function concat",function(m){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;
this.a=m.a*a+m.c*b;
this.b=m.b*a+m.d*b;
this.c=m.a*c+m.c*d;
this.d=m.b*c+m.d*d;
this.tx=m.a*tx+m.c*ty+m.tx;
this.ty=m.b*tx+m.d*ty+m.ty;
},
































































"public function createBox",function(scaleX,scaleY,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){scaleX=1;}scaleY=1;}rotation=0;}tx=0;}ty=0;}

if(rotation==0){
this.a=this.d=1;
this.b=this.c=0;
}else{
this.a=Math.cos(rotation);
this.b=Math.sin(rotation);
this.c=-this.b;
this.d=this.a;
}
if(scaleX!=1){
this.a*=scaleX;
this.c*=scaleY;
}
if(scaleY!=1){
this.b*=scaleY;
this.d*=scaleY;
}
this.tx=tx;
this.ty=ty;
},

"public static const",{MAGIC_GRADIENT_FACTOR:16384/10},










"public function createGradientBox",function(width,height,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){width=NaN;}height=NaN;}rotation=0;}tx=0;}ty=0;}
this.createBox(width/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,height/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,rotation,tx+width/2,ty+height/2);
},








"public function transformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y+this.tx,this.b*point.x+this.d*point.y+this.ty);
},









"public function deltaTransformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y,this.b*point.x+this.d*point.y);
},




"public function identity",function(){
this.a=this.d=1;
this.b=this.c=this.tx=this.ty=0;
},




"public function invert",function(){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;


var det=a*d-c*b;
















this.a=d/det;
this.b=-b/det;
this.c=-c/det;
this.d=a/det;
this.tx=(c*ty-tx*d)/det;
this.ty=(tx*b-a*ty)/det;
},







"public function translate",function(dx,dy){
this.tx+=dx;this.ty+=dy;
},







"public function scale",function(sx,sy){
if(sx!=1){
this.a*=sx;
this.c*=sx;
}
if(sy!=1){
this.b*=sy;
this.d*=sy;
}
},






"public function rotate",function(angle){
if(angle!=0){
var cos=Math.cos(angle);
var sin=Math.sin(angle);
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
this.a=a*cos-c*sin;
this.b=a*sin+c*cos;
this.c=b*cos-d*sin;
this.d=b*sin+d*cos;
}
},





"public function toString",function(){
return"("+["a="+this.a,"b="+this.b,"c="+this.c,"d="+this.d,"tx="+this.tx,"ty="+this.ty].join(", ")+")";
},

];},[],["Math","flash.geom.Point"]
);