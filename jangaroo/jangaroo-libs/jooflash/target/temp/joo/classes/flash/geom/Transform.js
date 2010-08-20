joo.classLoader.prepare("package flash.geom",









"public class Transform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$displayObject=$$l+'displayObject',$_colorTransform=$$l+'_colorTransform',$_matrix=$$l+'_matrix';return[function(){joo.classLoader.init(flash.geom.Rectangle);},

"public function Transform",function(displayObject){this[$super]();
this[$displayObject]=displayObject;
},

"private var",{displayObject: undefined},





"public function get colorTransform",function(){
return this[$_colorTransform];
},

"public function set colorTransform",function(value){
this[$_colorTransform]=value;
},

"private var",{_colorTransform: undefined},






"public function get concatenatedColorTransform",function(){
var concCT=this[$_colorTransform];
var currentDO=this[$displayObject].parent;
while(currentDO){
concCT.concat(currentDO.transform.colorTransform);
currentDO=currentDO.parent;
}
return this.colorTransform;
},





"public function get matrix",function(){
return this[$_matrix];
},
"public function set matrix",function(value){
this[$_matrix]=value;
this[$displayObject].transform=this;
},

"private var",{_matrix: undefined},






"public function get concatenatedMatrix",function(){
var concMatrix=this[$_matrix];
var currentDO=this[$displayObject].parent;
while(currentDO){
concMatrix.concat(currentDO.transform.matrix);
currentDO=currentDO.parent;
}
return concMatrix;
},





"public function get pixelBounds",function(){
return new flash.geom.Rectangle(this[$displayObject].x,this[$displayObject].y,this[$displayObject].width,this[$displayObject].height);
},

];},[],["flash.geom.Rectangle"]
);