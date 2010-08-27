joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class RelatedList",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RelatedListColumn,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.RelatedListSort);},

"public var",{columns: undefined},

"public function RelatedList",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){
if(key=="columns"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.RelatedListColumn(val));
}else{
for(var i1=0;i1<(val).length;i1++){
this[key].addItem(new com.salesforce.results.RelatedListColumn((val)[i1]));
}
}
}else if(key=="sort"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.RelatedListSort(val));
}else{
for(var i2=0;i2<(val).length;i2++){
this[key].addItem(new com.salesforce.results.RelatedListSort((val)[i2]));
}
}
}
}else{
this[key]=val;
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.RelatedListColumn","com.salesforce.results.RelatedListSort"]
);