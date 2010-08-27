joo.classLoader.prepare(


























"package com.salesforce.results",












"public dynamic class DescribeLayout",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RelatedList,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutSection);},

"public var",{detailLayoutSections: undefined},
"public var",{editLayoutSections: undefined},
"public var",{relatedLists: undefined},

"public function DescribeLayout",function(obj){this[$super]();
for(var key in obj){
var val=obj[key];
if(is(val,mx.collections.ArrayCollection)||is(val,mx.utils.ObjectProxy)){

if(key=="detailLayoutSections"||key=="editLayoutSections"){
this[key]=new mx.collections.ArrayCollection();
for(var i=0;i<(val).length;i++){
this[key].addItem(new com.salesforce.results.DescribeLayoutSection((val)[i]));
}
}else if(key=="relatedLists"){
this[key]=new mx.collections.ArrayCollection();
for(var i2=0;i2<(val).length;i2++){
this[key].addItem(new com.salesforce.results.RelatedList((val)[i2]));
}
}else{
this[key]=val;
}

}else{this[key]=val;}

}
},
];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutSection","com.salesforce.results.RelatedList"]
);