package com.salesforce.metadata
{
	public class RunTestFailure
	{
	    public var id:String;
	    public var message:String;
	    public var methodName:String;
	    public var name:String;
	    public var _namespace:String;
	    public var packageName:String;
	    public var stackTrace:String;
	    public var time:Number;
	    public var type:String;

		public function RunTestFailure(obj:Object) {
			this.id = obj.id;
			this.message = obj.message;
			this.methodName = obj.methodName;
			this.name = obj.name;
			this._namespace = obj.namespace;
			this.packageName = obj.packageName;
			this.stackTrace = obj.stackTrace;
			this.time = obj.time;
			this.type = obj.type;
			
		}
	}
}