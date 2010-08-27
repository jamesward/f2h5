joo.classLoader.prepare(


























"package com.salesforce.events",














"public class QueryEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[


"public function QueryEvent",function(type,queryResult){

this[$super](type);


this.queryResult=queryResult;
},


"public static const",{QUERY_EVENT:"queryCompleteEvent"},


"public var",{queryResult: undefined},


"override public function clone",function(){
return new com.salesforce.events.QueryEvent(this.type,this.queryResult);
},
];},[],["flash.events.Event"]
);