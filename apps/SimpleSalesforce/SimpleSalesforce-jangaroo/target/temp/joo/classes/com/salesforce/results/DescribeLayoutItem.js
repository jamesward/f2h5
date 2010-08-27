joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class DescribeLayoutItem",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeLayoutComponent,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{editable: undefined},

"public var",{layoutComponents: undefined},

"public function DescribeLayoutItem",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layoutComponents"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutComponent(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutComponent((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutComponent"]
);