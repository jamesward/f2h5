joo.classLoader.prepare(


























"package com.salesforce.objects",




















"public dynamic class SingleEmailMessage extends com.salesforce.objects.BaseEmail",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{bccAddresses: undefined},
"public var",{toAddresses: undefined},
"public var",{ccAddresses: undefined},
"public var",{htmlBody: undefined},
"public var",{charset: undefined},
"public var",{plainTextBody: undefined},
"public var",{targetObjectId: undefined},

"public function SingleEmailMessage",function(obj){if(arguments.length<1){obj=null;}
this[$super](obj);
for(var key in obj){
this[key]=obj[key];
}
},






















"public function toXml",function(sobjectNs,name,writer)
{
writer.writeStartElement(name,sobjectNs);
writer.writeXsiType('SingleEmailMessage');






















writer.writeEndElement(name,sobjectNs);
},

];},[],["com.salesforce.objects.BaseEmail"]
);