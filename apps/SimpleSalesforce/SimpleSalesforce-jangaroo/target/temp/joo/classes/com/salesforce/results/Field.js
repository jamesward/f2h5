joo.classLoader.prepare(


























"package com.salesforce.results",














"public dynamic class Field",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.PickListEntry,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{type: undefined},
"public var",{updateable: undefined},
"public var",{soapType: undefined},
"public var",{name: undefined},
"public var",{length: undefined},
"public var",{label: undefined},
"public var",{custom: undefined},
"public var",{autoNumber: undefined},
"public var",{createable: undefined},
"public var",{picklistValues: undefined},
"public var",{referenceTo: undefined},

"public function Field",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(key=="picklistValues"){
this[key]=new mx.collections.ArrayCollection();
if(is(val,mx.utils.ObjectProxy)){
this[key].addItem(new com.salesforce.results.PickListEntry(val));
}else{
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.PickListEntry((val)[i]));
}
}
}
else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.PickListEntry"]
);