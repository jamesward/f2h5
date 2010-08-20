joo.classLoader.prepare("package flash.display",









"public class BitmapData implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_transparent=$$l+'_transparent',$_width=$$l+'_width',$_height=$$l+'_height',$context=$$l+'context';return[function(){joo.classLoader.init(flash.geom.Rectangle);},




















"public function BitmapData",function(width,height,transparent,fillColor){if(arguments.length<4){if(arguments.length<3){transparent=true;}fillColor=0xFFFFFFFF;}this[$super]();
this[$_transparent]=transparent;
this.canvas=window.document.createElement("canvas");
this.canvas.width=this[$_width]=width;
this.canvas.height=this[$_height]=height;
this.canvas.style.position="absolute";
this[$context]=this.canvas.getContext("2d");

},





"public function get rect",function(){
return new flash.geom.Rectangle(0,0,this[$_width],this[$_height]);
},




"public function get transparent",function(){
return this[$_transparent];
},




"public function get width",function(){
return this[$_width];
},




"public function get height",function(){
return this[$_height];
},






























"public function colorTransform",function(rect,colorTransform){

if(colorTransform.alphaOffset==0
&&colorTransform.redMultiplier>=0&&colorTransform.redMultiplier<=1
&&colorTransform.redMultiplier==colorTransform.greenMultiplier
&&colorTransform.redMultiplier==colorTransform.blueMultiplier
&&colorTransform.redMultiplier==colorTransform.alphaMultiplier){
if(colorTransform.redOffset>=0&&colorTransform.greenOffset>=0&&colorTransform.blueOffset>=0){
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);

var alpha=1;
if(colorTransform.redMultiplier==1){
this[$context].globalCompositeOperation="lighter";
}else{
this[$context].globalCompositeOperation="source-over";
alpha-=colorTransform.alphaMultiplier;
}
this[$context].fillStyle="rgba("+
[colorTransform.redOffset,colorTransform.greenOffset,colorTransform.blueOffset,
alpha]
.join(",")+")";
this[$context].fillRect(rect.x,rect.y,rect.width,rect.height);
this[$context].restore();
return;



}
}


var input=this[$context].getImageData(rect.x,rect.y,rect.width,rect.height);









var w=input.width,h=input.height;
var inputData=input.data;



var maps=colorTransform.getComponentMaps();
var i;
for(var m=0;m<4;++m){
var map=maps[m];
if(map){
for(i=inputData.length-4+m;i>=0;i-=4){
inputData[i]=map[inputData[i]];
}
}
}

this[$context].putImageData(input,rect.x,rect.y);
},


























































"public function draw",function(source,matrix,colorTransform,
blendMode,clipRect,smoothing){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){matrix=null;}colorTransform=null;}blendMode=null;}clipRect=null;}smoothing=false;}
var element=is(source,flash.display.BitmapData)?(source).canvas:(source).getElement();
if(matrix){
this[$context].save();
this[$context].setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
}
this[$context].drawImage(element,0,0);
if(matrix){
this[$context].restore();
}
},

"private var",{_transparent: undefined},
"private var",{_width: undefined},
"private var",{_height: undefined},
"internal var",{canvas: undefined},
"private var",{context: undefined},
];},[],["flash.display.IBitmapDrawable","flash.geom.Rectangle"]
);