joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class DeletedResponse",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,com.salesforce.results.DeletedRecord);},

"public var",{earliestDateAvailable: undefined},
"public var",{latestDateCovered: undefined},
"public var",{deletedRecords: undefined},


"public function DeletedResponse",function(obj){this[$super]();
this.latestDateCovered=obj.latestDateCovered;
this.earliestDateAvailable=obj.earliestDateAvailable;
this.deletedRecords=new mx.collections.ArrayCollection();
if(obj.deletedRecords&&obj.deletedRecords.length>0){
for(var i=0;i<obj.deletedRecords.length;i++){
this.deletedRecords.addItem(new com.salesforce.results.DeletedRecord(obj.deletedRecords[i]));
}
}
},
];},[],["mx.collections.ArrayCollection","com.salesforce.results.DeletedRecord"]
);