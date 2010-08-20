package com.salesforce.metadata
{
	public class RunTestSuccess
	{
	    public var id:String;
	    public var methodName:String;
	    public var name:String;
	    public var _namespace:String;
	    public var time:Number;
	    
	    public function RunTestSuccess(obj:Object) {
	    	this.id = obj.id;
	    	this.methodName = obj.methodName;
	    	this.name = obj.name;
	    	this._namespace = obj.namespace;
	    	this.time = obj.time;
	    }
	}
}