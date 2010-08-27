joo.classLoader.prepare(


























"package com.salesforce.events",







"public class NetworkStatusChangeEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function NetworkStatusChangeEvent",function(type,connected){

this[$super](type);


this.connected=connected;
},


"public static const",{NETWORK_STATUS_CHANGE_EVENT:"networkStatusChanged"},


"public var",{connected: undefined},


"override public function clone",function(){
return new com.salesforce.events.NetworkStatusChangeEvent(this.type,this.connected);
},
];},[],["flash.events.Event"]
);