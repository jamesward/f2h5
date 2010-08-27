joo.classLoader.prepare(


























"package com.salesforce.results",































"public dynamic class DescribeLayoutResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$i=$$l+'i';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.RecordTypeMapping,com.salesforce.results.DescribeLayout);},

"public var",{layouts: undefined},
"public var",{recordTypeMappings: undefined},
"private var",{i: undefined},

"public function DescribeLayoutResult",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="layouts"){
this.layouts=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this.layouts.addItem(new com.salesforce.results.DescribeLayout(val));
}else{
for(this[$i]=0;this[$i]<(val).length;this[$i]++){
this.layouts.addItem(new com.salesforce.results.DescribeLayout((val)[this[$i]]));
}
}
}else if(key=="recordTypeMappings"){
this.recordTypeMappings=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this.recordTypeMappings.addItem(new com.salesforce.results.RecordTypeMapping(val));
}else{
for(this[$i]=0;this[$i]<(val).length;this[$i]++){
this.recordTypeMappings.addItem(new com.salesforce.results.RecordTypeMapping((val)[this[$i]]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayout","com.salesforce.results.RecordTypeMapping"]


































);