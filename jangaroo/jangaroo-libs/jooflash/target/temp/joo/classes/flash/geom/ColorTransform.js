joo.classLoader.prepare("package flash.geom",




"public class ColorTransform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$maps=$$l+'maps';return[function(){joo.classLoader.init(Array);},



"public var",{alphaMultiplier: undefined},




"public var",{alphaOffset: undefined},



"public var",{blueMultiplier: undefined},




"public var",{blueOffset: undefined},



"public var",{greenMultiplier: undefined},




"public var",{greenOffset: undefined},



"public var",{redMultiplier: undefined},




"public var",{redOffset: undefined},




"public function get color",function(){
return this.redOffset<<16|this.greenOffset<<8||this.blueOffset;
},

"public function set color",function(newColor){
this.redOffset=newColor>>16&0xF;
this.greenOffset=newColor>>8&0xF;
this.blueOffset=newColor&0xF;
this.redMultiplier=this.greenMultiplier=this.blueMultiplier=1;
},




"public function ColorTransform",function(redMultiplier,greenMultiplier,blueMultiplier,
alphaMultiplier,
redOffset,greenOffset,blueOffset,
alphaOffset){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){redMultiplier=1;}greenMultiplier=1;}blueMultiplier=1;}alphaMultiplier=1;}redOffset=0;}greenOffset=0;}blueOffset=0;}alphaOffset=0;}this[$super]();
this.redMultiplier=redMultiplier;
this.greenMultiplier=greenMultiplier;
this.blueMultiplier=blueMultiplier;
this.alphaMultiplier=alphaMultiplier;
this.redOffset=redOffset;
this.greenOffset=greenOffset;
this.blueOffset=blueOffset;
this.alphaOffset=alphaOffset;
},






"public function concat",function(second){
this.redMultiplier*=second.redMultiplier;
this.greenMultiplier*=second.greenMultiplier;
this.blueMultiplier*=second.blueMultiplier;
this.alphaMultiplier*=second.alphaMultiplier;
this.redOffset+=second.redOffset;
this.greenOffset+=second.greenOffset;
this.blueOffset+=second.blueOffset;
this.alphaOffset+=second.alphaOffset;
},

"private var",{maps: undefined},

"public function getComponentMaps",function(){
if(!this[$maps]){
var offsets=[this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset];
var multipliers=[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier];
this[$maps]=new Array(4);
for(var c=0;c<4;++c){
var offset=offsets[c];
var multiplier=multipliers[c];
var map;
if(offset==0&&multiplier==1){
map=null;
}else{
map=new Array(256);
for(var b=0;b<256;++b){
var val=offset+multiplier*b;
map[b]=val<=0?0:val<=255?val:255;
}
}
this[$maps][c]=map;
}
}
return this[$maps];
},




"public function toString",function(){
return"[ColorTransform("+[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,
this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset].join(", ")+")]";
},

];},[],["Array"]
);