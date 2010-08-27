joo.classLoader.prepare(


























"package com.salesforce.results",











"public dynamic class SaveResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.Error);},

"public function SaveResult",function(result){this[$super]();
for(var i in result){
var val=result[i];
if(i!="xsi:type"){
if(is(val,mx.collections.ArrayCollection)){


var records=val;
var errors=new mx.collections.ArrayCollection(null);
for(var x=0;x<records.length;x++){
errors.addItem(new com.salesforce.results.Error(records[x]));
}
this[i]=errors;
}else if(is(val,mx.utils.ObjectProxy)){
if(val.hasOwnProperty("xsi:nil")){
this[i]=null;
}else{
if(i=="errors"){
this[i]=new com.salesforce.results.Error(val);
}
}
}else{
this[i]=val;
}
}
}
},
];},[],["mx.collections.ArrayCollection","com.salesforce.results.Error","mx.utils.ObjectProxy"]
);