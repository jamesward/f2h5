package com.salesforce.metadata
{
	public class CodeCoverageWarning
	{
	    public var id:String;
	    public var message:String;
	    public var name:String;
	    public var _namespace:String;
	    
	    public function CodeCoverageWarning(obj:Object) {
	    	this.id = obj.id;
	    	this.message = obj.message;
	    	this.name = obj.name;
	    	this._namespace = obj.namespace;
	    }
	}
}