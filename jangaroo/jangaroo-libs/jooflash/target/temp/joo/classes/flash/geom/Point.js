joo.classLoader.prepare("package flash.geom",









"public class Point",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[






"public function Point",function(x,y){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}this[$super]();
this.x=x;
this.y=y;
},





"public function get length",function(){
return Math.sqrt(this.x^2+this.y^2);
},




"public var",{x: undefined},




"public var",{y: undefined},






"public function add",function(v){
return new flash.geom.Point(this.x+v.x,this.y+v.y);
},





"public function clone",function(){
return new flash.geom.Point(this.x,this.y);
},







"public static function distance",function(pt1,pt2){
return Math.sqrt((pt2.x-pt1.x)^2+(pt2.y-pt2.y)^2);
},







"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y;
},












"public static function interpolate",function(pt1,pt2,f){
return 0;
},







"public function normalize",function(thickness){

},







"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},









"public static function polar",function(len,angle){
return null;
},






"public function subtract",function(v){
return new flash.geom.Point(this.x-v.x,this.y-v.y);
},







"public function toString",function(){
return["(x=",this.x,", y=",this.y,")"].join("");
},

];},["distance","interpolate","polar"],["Math"]
);