joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class DescribeTabSetResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeTab,mx.utils.ObjectProxy,Array);},

"public var",{label: undefined},
"public var",{namespace: undefined},
"public var",{logoUrl: undefined},
"public var",{selected: undefined},
"public var",{tabs: undefined},

"public function DescribeTabSetResult",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="tabs"){
this.tabs=new Array();
if(is(val,mx.utils.ObjectProxy)){
this.tabs.push(new com.salesforce.results.DescribeTab(val));
}else{
for(var i=0;i<(val).length;i++){
this.tabs.push(new com.salesforce.results.DescribeTab((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.DescribeTab"]
);