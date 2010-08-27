joo.classLoader.prepare(


























"package com.salesforce.results",













"public dynamic class UpdatedResponse",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,Array);},



"public function UpdatedResponse",function(obj){this[$super]();
var val=obj[key];
for(var key in obj){
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){
this[key]=new Array();
if(is(val,mx.utils.ObjectProxy)){
this[key].push(val);
}else{
for(var i=0;i<(val).length;i++){
this[key].push((val)[i]);
}
}

}else{
this[key]=obj[key];
}
}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","Array"]
);