joo.classLoader.prepare("package flash.display",













"public class DisplayObjectContainer extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$children=$$l+'children';return[

"public function contains",function(child)
{
return false;
},

"public function removeChild",function(child)
{
return child;
},

"public var",{mouseChildren:true},










"public function DisplayObjectContainer",function(){
this[$super]();
this[$children]=[];
},


































"public function get numChildren",function(){
return this[$children].length;
},











































"public function addChild",function(child){
return this.addChildAt(child,this[$children].length);
},






































"public function addChildAt",function(child,index){
var refChild=this[$children][index];
this[$children].splice(index,0,child);
child.parent=this;
if(refChild){
this.getElement().insertBefore(child.getElement(),refChild.getElement());
}else{
this.getElement().appendChild(child.getElement());
}
return child;
},































"public function getChildAt",function(index){
return this[$children][index];
},

"private var",{children: undefined},
];},[],["flash.display.InteractiveObject"]
);