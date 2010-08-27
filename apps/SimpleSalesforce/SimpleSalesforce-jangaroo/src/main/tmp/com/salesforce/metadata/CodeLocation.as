package com.salesforce.metadata
{
	public class CodeLocation
	{
	    public var column:Number;
	    public var line:Number;
	    public var numExecutions:Number;
	    public var time:Number;
	    
	    public function CodeLocation(obj:Object) {
	    	this.column = obj.column;
	    	this.line = obj.line;
	    	this.numExecutions = obj.numExecutions;
	    	this.time = obj.time;
	    }
	}
}