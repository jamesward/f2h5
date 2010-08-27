joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class SendEmailResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection);},

"public var",{success: undefined},
"public var",{Error: undefined},

"public function SendEmailResult",function(result){this[$super]();
for(var i in result){
var val=result[i];

if(is(val,mx.collections.ArrayCollection)){
this[i]=new mx.collections.ArrayCollection();
for(var x=0;x<val.length;x++){
this[i].addItem(val[x]);
}
}else{
this[i]=val;
}
}
},
];},[],["mx.collections.ArrayCollection"]
);