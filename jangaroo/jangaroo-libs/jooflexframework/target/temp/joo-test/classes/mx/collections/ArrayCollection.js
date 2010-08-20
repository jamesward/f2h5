joo.classLoader.prepare(










"package mx.collections",





































"public class ArrayCollection extends Array implements mx.collections.ListCollectionView",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},


















"mx_internal static const",{VERSION:"3.3.0.4852"},














"public function ArrayCollection",function(source)
{
this[$super]();

if(source){
for(var i=0;i<source.length;++i){
this[i]=source[i];
}
this.length=source.length;
}
},










"public function getItemAt",function(index,prefetch){if(arguments.length<2){prefetch=0;}
if(index<0||index>=this.length)
{
throw new Error("[collections] outOfBounds: "+index);
}

return this[index];
},




"public function addItem",function(item){
this[this.length++]=item;
},




"public function toArray",function(){
var result=[];
for(var i=0;i<this.length;++i){
result[i]=this[i];
}
return result;
},




"public function getItemIndex",function(item){
return this.indexOf(item);
},




"public function removeAll",function(){
this.length=0;
},




"public function setItemAt",function(item,index){
var oldItem=this.getItemAt(index);
this[index]=item;
return oldItem;
},







"public function addItemAt",function(item,index){
throw new Error("not implemented");
},

"public function itemUpdated",function(item,property,oldValue,newValue){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){property=null;}oldValue=null;}newValue=null;}
throw new Error("not implemented");
},

"public function removeItemAt",function(index){
throw new Error("not implemented");
},

"public function dispatchEvent",function(event){
throw new Error("not implemented");
},

"public function hasEventListener",function(type){
throw new Error("not implemented");
},

"public function willTrigger",function(type){
throw new Error("not implemented");
},

"public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
throw new Error("not implemented");
},

"public function addEventListener",function(type,listener,useCapture,priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
throw new Error("not implemented");
},
];},[],["Array","mx.collections.ListCollectionView","Error"]
);