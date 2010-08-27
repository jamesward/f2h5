joo.classLoader.prepare(


























"package com.salesforce.results",








"public dynamic class UpsertResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.utils.ObjectProxy,Array,com.salesforce.results.Error);},

"public function UpsertResult",function(obj)
{this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="errors"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.Error(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.Error((val)[i]));
}
}
}else{
this[key]=obj[key];
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.Error"]
);