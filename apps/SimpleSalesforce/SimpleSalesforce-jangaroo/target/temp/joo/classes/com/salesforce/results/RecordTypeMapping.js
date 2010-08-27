joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class RecordTypeMapping",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,Array,com.salesforce.results.PicklistForRecordType);},

"public function RecordTypeMapping",function(result){this[$super]();
for(var key in result){
var val=result[key];
if(key=="picklistsForRecordType"){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(new com.salesforce.results.PicklistForRecordType(val));
}else if(is(val,mx.collections.ArrayCollection)){
for(var i=0;i<(val).length;i++){
this[key].push(new com.salesforce.results.PicklistForRecordType((val)[i]));
}
}

}else{
this[key]=val;
}
}
},
];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.PicklistForRecordType","mx.collections.ArrayCollection"]
);