package com.salesforce.results
{
	import com.salesforce.metadata.DeployMessage;
	
	import mx.collections.ArrayCollection;
	
	public class DeployResult
	{
	    public var id:String;/*
	    [ArrayElementType("DeployMessage")]*/
	    public var messages:ArrayCollection = new mx.collections.ArrayCollection();
	    public var retrieveResult:RetrieveResult;
	    public var runTestResult:RunTestsResult;
	    public var success:Boolean;
	    
	    public native function DeployResult(obj:Object);
	}
}