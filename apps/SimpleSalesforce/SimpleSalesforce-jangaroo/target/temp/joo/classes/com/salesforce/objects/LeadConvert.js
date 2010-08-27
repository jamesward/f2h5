joo.classLoader.prepare(


























"package com.salesforce.objects",












"public class LeadConvert extends mx.utils.ObjectProxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{accountId: undefined},
"public var",{contactId: undefined},
"public var",{convertedStatus: undefined},
"public var",{doNotCreateOpportunity: undefined},
"public var",{leadId: undefined},
"public var",{opportunityName: undefined},
"public var",{overwriteLeadSource: undefined},
"public var",{ownerId: undefined},
"public var",{sendNotificationEmail: undefined},

"public function LeadConvert",function(){
this[$super]();
},

"public function toXml",function(sobjectNs,name,writer)
{
writer.writeStartElement(name,sobjectNs);






















writer.writeEndElement(name,sobjectNs);
},
];},[],["mx.utils.ObjectProxy"]
);