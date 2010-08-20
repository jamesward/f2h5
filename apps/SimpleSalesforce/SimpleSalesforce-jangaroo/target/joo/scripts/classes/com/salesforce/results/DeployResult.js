joo.classLoader.prepare("package com.salesforce.results",/*
{
	import com.salesforce.metadata.DeployMessage
	
	import mx.collections.ArrayCollection*/
	
	"public class DeployResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.metadata.DeployMessage,mx.collections.ArrayCollection,com.salesforce.results.RetrieveResult,Array);},
	
	    "public var",{ id/*:String*/: undefined},/*
	    [ArrayElementType("DeployMessage")]*/
	    "public var",{ messages/*:ArrayCollection*/ :function(){return( new mx.collections.ArrayCollection());}},
	    "public var",{ retrieveResult/*:RetrieveResult*/: undefined},
	    "public var",{ runTestResult/*:RunTestsResult*/: undefined},
	    "public var",{ success/*:Boolean*/: undefined},
	    
	    "public function DeployResult",function $DeployResult(obj/*:Object*/) {this[$super]();this.messages=this.messages();
	    	this.id = obj.id;
	    	if ( is(obj.messages, Array) || is( obj.messages, mx.collections.ArrayCollection)) {
	    		var dm/*:Object*/;
	    		for/* each*/ (var $1 in obj.messages) {dm= obj.messages[$1];
	    			this.messages.addItem(new com.salesforce.metadata.DeployMessage(dm));
	    		}
	    	} else {
	    		this.messages.addItem(new com.salesforce.metadata.DeployMessage(obj.messages));
	    	}
	    	
	    	this.retrieveResult = new com.salesforce.results.RetrieveResult(obj.retrieveResult);
	    	this.runTestResult = obj.runTestResult/*as RunTestsResult*/;
	    	this.success = obj.success;
	    },
	];},[],["mx.collections.ArrayCollection","Array","com.salesforce.metadata.DeployMessage","com.salesforce.results.RetrieveResult"]
);