package com.salesforce.metadata
{
	public class RetrieveMessage
	{
	    public var fileName:String;
    	public var problem:String;
    	
    	public function RetrieveMessage(obj:Object) {
    		this.fileName = obj.fileName;
    		this.problem = obj.problem;
    	}
	}
}