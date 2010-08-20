package com.salesforce.metadata
{
	public class DeployMessage
	{
	    public var changed:Boolean;
	    public var columnNumber:Number;
	    public var created:Boolean;
	    public var deleted:Boolean;
	    public var fileName:String;
	    public var fullName:String;
	    public var id:String;
	    public var lineNumber:Number;
	    public var problem:String;
	    public var success:Boolean;

		public function DeployMessage(obj:Object) {
			this.changed = obj.changed;
			this.columnNumber = obj.columnNumber;
			this.created = obj.created;
			this.deleted = obj.deleted;
			this.fileName = obj.fileName;
			this.fullName = obj.fullName;
			this.id = obj.id;
			this.lineNumber = obj.lineNumber;
			this.problem = obj.problem;
			this.success = obj.success;
		}
	}
}