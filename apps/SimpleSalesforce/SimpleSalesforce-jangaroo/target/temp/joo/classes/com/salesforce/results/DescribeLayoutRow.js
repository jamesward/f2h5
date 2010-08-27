joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class DescribeLayoutRow",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeLayoutItem,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{layoutItems: undefined},
"public var",{numItems: undefined},

"public function DescribeLayoutRow",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layoutItems"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutItem(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutItem((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutItem"]
);