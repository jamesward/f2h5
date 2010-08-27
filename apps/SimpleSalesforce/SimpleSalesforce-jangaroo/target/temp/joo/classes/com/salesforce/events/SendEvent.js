joo.classLoader.prepare(


























"package com.salesforce.events",









"public class SendEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function SendEvent",function(type,soapRequest){if(arguments.length<2){soapRequest="empty";}

this[$super](type);


this.soapRequest=soapRequest;
},


"public static const",{SEND_REQUEST:"sendRequest"},


"public var",{soapRequest: undefined},


"override public function clone",function(){
return new com.salesforce.events.SendEvent(this.type,this.soapRequest);
},

];},[],["flash.events.Event"]
);