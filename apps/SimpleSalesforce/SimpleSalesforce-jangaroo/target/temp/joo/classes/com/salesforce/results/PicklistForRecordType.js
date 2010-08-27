joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class PicklistForRecordType",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.PickListEntry,mx.utils.ObjectProxy,Array);},

"public function PicklistForRecordType",function(result){this[$super]();
for(var key in result){
var val=result[key];
if(key=="picklistValues"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.PickListEntry(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.PickListEntry((val)[i]));
}
}
}else{
this[key]=val;
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.PickListEntry"]
);