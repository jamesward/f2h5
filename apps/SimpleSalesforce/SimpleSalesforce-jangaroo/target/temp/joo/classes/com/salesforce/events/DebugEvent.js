joo.classLoader.prepare(


























"package com.salesforce.events",







"public class DebugEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent);},


"public function DebugEvent",function(type,debugString){if(arguments.length<2){debugString="empty";}

this[$super](type);


this.debugString=debugString;
},


"public static const",{DEBUG_EVENT:"debugEvent"},


"public var",{debugString: undefined},


"override public function clone",function(){
return new com.salesforce.events.SendEvent(this.type,this.debugString);
},
];},[],["flash.events.Event","com.salesforce.events.SendEvent"]
);