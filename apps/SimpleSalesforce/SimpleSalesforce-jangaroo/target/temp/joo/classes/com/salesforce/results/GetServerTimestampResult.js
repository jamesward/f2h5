joo.classLoader.prepare(


























"package com.salesforce.results",




"public dynamic class GetServerTimestampResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{timestamp:null},

"public function GetServerTimestampResult",function(obj){this[$super]();
this.timestamp=obj.timestamp;
},
"public function toDate",function(){
return com.salesforce.Util.stringToDateTime(this.timestamp);
},

];},[],["com.salesforce.Util"]
);