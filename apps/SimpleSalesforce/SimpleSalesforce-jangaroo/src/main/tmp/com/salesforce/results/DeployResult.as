package com.salesforce.results
{
	import com.salesforce.metadata.DeployMessage;
	
	import mx.collections.ArrayCollection;
	
	public class DeployResult
	{
	    public var id:String;
	    [ArrayElementType("DeployMessage")]
	    public var messages:ArrayCollection = new ArrayCollection();
	    public var retrieveResult:RetrieveResult;
	    public var runTestResult:RunTestsResult;
	    public var success:Boolean;
	    
	    public function DeployResult(obj:Object) {
	    	this.id = obj.id;
	    	if (obj.messages is Array || obj.messages is ArrayCollection) {
	    		var dm:Object;
	    		for each (dm in obj.messages) {
	    			messages.addItem(new DeployMessage(dm));
	    		}
	    	} else {
	    		messages.addItem(new DeployMessage(obj.messages));
	    	}
	    	
	    	this.retrieveResult = new RetrieveResult(obj.retrieveResult);
	    	this.runTestResult = obj.runTestResult as RunTestsResult;
	    	this.success = obj.success;
	    }
	}
}