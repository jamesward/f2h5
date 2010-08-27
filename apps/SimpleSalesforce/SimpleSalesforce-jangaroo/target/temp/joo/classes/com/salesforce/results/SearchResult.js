joo.classLoader.prepare(


























"package com.salesforce.results",















"public dynamic class SearchResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},

"public var",{searchRecords: undefined},

"public function SearchResult",function(result){this[$super]();

for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(i=="searchRecords"){


var records=val;
var sobjects=new mx.collections.ArrayCollection(null);


if(records==null){
records=new mx.collections.ArrayCollection();
records.addItem(val);
}
for(var x=0;x<records.length;x++){
sobjects.addItem(new com.salesforce.objects.SObject(records[x]));
}
this[i]=sobjects;
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
];},[],["mx.collections.ArrayCollection","com.salesforce.objects.SObject","mx.utils.ObjectProxy"]
);