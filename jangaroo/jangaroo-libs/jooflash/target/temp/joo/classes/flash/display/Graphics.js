joo.classLoader.prepare("package flash.display",







"public class Graphics",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$context=$$l+'context',$insideFill=$$l+'insideFill',$_beginFill=$$l+'_beginFill',$createGradientStyle=$$l+'createGradientStyle';return[function(){joo.classLoader.init(flash.geom.Matrix,flash.display.CapsStyle,Math,flash.display.GradientType,flash.display.JointStyle,flash.geom.Point);},

"private var",{context: undefined},
"private var",{insideFill:false},

"public function Graphics",function(context){this[$super]();
this[$context]=context;

this[$context].moveTo(0,0);
this[$context].lineCap=flash.display.CapsStyle.ROUND;
this[$context].lineJoin=flash.display.JointStyle.ROUND;
this[$context].miterLimit=3;
},

"internal function get renderingContext",function(){
return this[$context];
},













































































"public function lineStyle",function(thickness,color,alpha,
pixelHinting,scaleMode,
caps,
joints,miterLimit){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){thickness=NaN;}color=0;}alpha=1.0;}pixelHinting=false;}scaleMode="normal";}caps=null;}joints=null;}miterLimit=3;}
if(!isNaN(thickness)){
this[$context].lineWidth=thickness||1;
}
this[$context].strokeStyle=flash.display.Graphics.toRGBA(color,alpha);
this[$context].lineCap=caps||flash.display.CapsStyle.ROUND;
this[$context].lineJoin=joints||flash.display.JointStyle.ROUND;
this[$context].miterLimit=miterLimit;
},

































































































"public function lineGradientStyle",function(type,colors,alphas,ratios,matrix,
spreadMethod,interpolationMethod,
focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$context].strokeStyle=this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio);
},


















































"public function lineTo",function(x,y){
this[$context].lineTo(x,y);
if(!this[$insideFill]){
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
}
},














































































"public function curveTo",function(controlX,controlY,anchorX,anchorY){
this[$context].quadraticCurveTo(controlX,controlY,anchorX,anchorY);
if(!this[$insideFill]){
this[$context].stroke();
}
},

















"public function drawCircle",function(x,y,radius){
this[$context].moveTo(x+radius,y);
this[$context].arc(x,y,radius,0,2*Math.PI,false);
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
},


















"public function drawRect",function(x,y,width,height){
if(this[$insideFill]){
this[$context].fillRect(x,y,width,height);
}
this[$context].strokeRect(x,y,width,height);
},






















"public function drawRoundRect",function(x,y,width,height,
ellipseWidth,ellipseHeight){if(arguments.length<6){ellipseHeight=NaN;}
if(ellipseHeight==0||ellipseWidth==0){
this.drawRect(x,y,width,height);
return;
}
if(isNaN(ellipseHeight)){
ellipseHeight=ellipseWidth;
}
var x_lw=x+ellipseWidth;
var x_r=x+width;
var x_rw=x_r-ellipseWidth;
var y_tw=y+ellipseHeight;
var y_b=y+height;
var y_bw=y_b-ellipseHeight;
this[$context].beginPath();
this[$context].moveTo(x_lw,y);
this[$context].lineTo(x_rw,y);
this[$context].quadraticCurveTo(x_r,y,x_r,y_tw);
this[$context].lineTo(x_r,y_bw);
this[$context].quadraticCurveTo(x_r,y_b,x_rw,y_b);
this[$context].lineTo(x_lw,y_b);
this[$context].quadraticCurveTo(x,y_b,x,y_bw);
this[$context].lineTo(x,y_tw);
this[$context].quadraticCurveTo(x,y,x_lw,y);
this[$context].closePath();
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
},











































"public function moveTo",function(x,y){
this[$context].beginPath();
this[$context].moveTo(x,y);
},




"public function clear",function(){
this.lineStyle();
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);
this[$context].fillStyle="";
this[$context].clearRect(0,0,this[$context].canvas.width,this[$context].canvas.height);
this[$context].restore();
this[$insideFill]=false;
this[$context].moveTo(0,0);
},













"public function beginFill",function(color,alpha){if(arguments.length<2){alpha=1.0;}
this[$_beginFill](flash.display.Graphics.toRGBA(color,alpha));
},

"private function _beginFill",function(fillStyle){
this[$context].beginPath();
this[$context].fillStyle=fillStyle;
this[$insideFill]=true;
},
















































































"public function beginGradientFill",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$_beginFill](this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio));
},

"private function createGradientStyle",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}


var gradient;
var p0=new flash.geom.Point(0,0);
var p1=new flash.geom.Point(-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2,0);
var p2=type==flash.display.GradientType.LINEAR
?new flash.geom.Point(0,-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2)
:new flash.geom.Point(flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2*focalPointRatio,0);
if(matrix){
p0=matrix.transformPoint(p0);
p1=matrix.transformPoint(p1);
p2=matrix.transformPoint(p2);
}
if(type==flash.display.GradientType.LINEAR){
var x1;
var y1;
if(p2.x==p0.x){
x1=p1.x;
y1=p1.y;
}else if(p2.y==p0.y){
x1=p1.x;
y1=p2.x;
}else{
var d=-(p2.x-p0.x)/(p2.y-p0.y);

x1=(p1.x/d+p1.y+d*p0.x-p0.y)/(d+1/d);
y1=d*(x1-p0.x)+p0.y;
}
var x2=p0.x+(p0.x-x1);
var y2=p0.y+(p0.y-y1);
gradient=this[$context].createLinearGradient(x1,y1,x2,y2);
}else{

var rx=p1.x-p0.x;
var ry=p1.y-p0.y;

var r=rx==0?Math.abs(ry):ry==0?Math.abs(rx):Math.sqrt(rx*rx+ry*ry);
gradient=this[$context].createRadialGradient(p2.x,p2.y,0,p0.x,p0.y,r);
}
for(var i=0;i<colors.length;++i){
gradient.addColorStop(ratios[i]/255,flash.display.Graphics.toRGBA(colors[i],alphas[i]));
}
return gradient;
},











"public function endFill",function(){
this[$context].fill();
this[$insideFill]=false;
},

"public static function toRGBA",function(color,alpha){if(arguments.length<2){alpha=1.0;}
return"rgba("+[color>>16,color>>8&0xFF,color&0xFF,alpha].join(",")+")";
},
];},["toRGBA"],["flash.display.CapsStyle","flash.display.JointStyle","Math","flash.geom.Point","flash.geom.Matrix","flash.display.GradientType"]
);