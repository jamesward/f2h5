joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{StatusCode: undefined},
"public var",{message: undefined},
"public var",{fields: undefined},

"public function Error",function(result)
{this[$super]();
for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(is(val,mx.collections.ArrayCollection)){


var records=val;
var fields=new mx.collections.ArrayCollection(null);
for(var x=0;x<records.length;x++){
fields.addItem(records[x]);
}
this[i]=fields;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy"]
);