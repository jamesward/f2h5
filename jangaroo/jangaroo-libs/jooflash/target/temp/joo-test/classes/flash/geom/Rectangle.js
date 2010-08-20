joo.classLoader.prepare("package flash.geom",







"public class Rectangle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},



"public var",{height: undefined},



"public var",{width: undefined},



"public var",{x: undefined},



"public var",{y: undefined},




"public function get topLeft",function(){
return new flash.geom.Point(this.x,this.y);
},

"public function set topLeft",function(topLeft){
this.left=topLeft.x;
this.top=topLeft.y;
},




"public function get bottom",function(){
return this.x+this.height;
},

"public function set bottom",function(value){
this.height=value-this.x;
},





"public function get bottomRight",function(){
return new flash.geom.Point(this.right,this.bottom);
},

"public function set bottomRight",function(bottomRight){
this.right=bottomRight.x;
this.bottom=bottomRight.y;
},




"public function get left",function(){
return this.x+this.width;
},

"public function set left",function(left){
this.width+=this.x-left;
this.x=left;
},




"public function get right",function(){
return this.x+this.width;
},
"public function set right",function(value){
this.width=value-this.x;
},




"public function get size",function(){
return new flash.geom.Point(this.width,this.height);
},

"public function set size",function(value){
this.width=value.x;
this.height=value.y;
},




"public function get top",function(){
return this.y;
},
"public function set top",function(value){
this.height+=this.y-value;
this.y=value;
},




"public function clone",function(){
return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
},




"public function contains",function(x,y){
return this.x<=x&&x<=this.right&&this.y<=y&&y<=this.bottom;
},





"public function containsPoint",function(point){
return this.contains(point.x,point.y);
},




"public function containsRect",function(rect){
return this.containsPoint(rect.topLeft)&&this.containsPoint(rect.bottomRight);
},




"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y&&this.width==toCompare.width&&this.height==toCompare.height;
},




"public function inflate",function(dx,dy){
this.width+=dx;
this.height+=dy;
},




"public function inflatePoint",function(point){
this.inflate(point.x,point.y);
},




"public function intersection",function(toIntersect){
var x=Math.max(this.x,toIntersect.x);
var right=Math.min(this.right,toIntersect.right);
if(x<=right){
var y=Math.max(this.y,toIntersect.y);
var bottom=Math.min(this.bottom,toIntersect.bottom);
if(y<=bottom){
return new flash.geom.Rectangle(x,y,right-x,bottom-y);
}
}
return new flash.geom.Rectangle();
},




"public function intersects",function(toIntersect){
return Math.max(this.x,toIntersect.x)<=Math.min(this.right,toIntersect.right)
&&Math.max(this.y,toIntersect.y)<=Math.min(this.bottom,toIntersect.bottom);
},




"public function isEmpty",function(){
return this.x==0&&this.y==0&&this.width==0&&this.height==0;
},




"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},




"public function offsetPoint",function(point){
this.offset(point.x,point.y);
},





"public function Rectangle",function(x,y,width,height){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}width=0;}height=0;}this[$super]();
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},




"public function setEmpty",function(){
this.x=this.y=this.width=this.height=0;
},




"public function toString",function(){
return"[Rectangle("+[this.x,this.y,this.width,this.height].join(", ")+")]";
},




"public function union",function(toUnion){
var x=Math.min(this.x,toUnion.x);
var y=Math.min(this.y,toUnion.y);
return new flash.geom.Rectangle(x,y,Math.max(this.right,toUnion.right)-x,Math.max(this.bottom-toUnion.bottom)-y);
},
];},[],["flash.geom.Point","Math"]
);