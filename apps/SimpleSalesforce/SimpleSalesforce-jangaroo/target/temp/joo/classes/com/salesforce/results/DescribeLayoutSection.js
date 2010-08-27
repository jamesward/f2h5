joo.classLoader.prepare(


























"package com.salesforce.results",























"public dynamic class DescribeLayoutSection",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutRow);},

"public var",{layoutRows: undefined},
"public var",{useHeading: undefined},
"public var",{heading: undefined},
"public var",{rows: undefined},
"public var",{useCollapsibleSection: undefined},


"public function DescribeLayoutSection",function(result){this[$super]();
for(var key in result){
var val=result[key];

if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){

if(key=="layoutRows"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.DescribeLayoutRow(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutRow((val)[i]));
}
}
}
}else{
this[key]=val;
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutRow"]
);