package com.salesforce.metadata
{
	import com.salesforce.Util;
	
	public class FileProperties
	{
	    public var createdById:String;
	    public var createdByName:String;
	    public var createdDate:Date;
	    public var fileName:String;
	    public var fullName:String;
	    public var id:String;
	    public var lastModifiedById:String;
	    public var lastModifiedByName:String;
	    public var lastModifiedDate:Date;
	    public var manageableState:String;
	    public var namespacePrefix:String;
	    public var type:String;

		public function FileProperties(obj:Object) {
			this.createdById = obj.createdById;
			this.createdByName = obj.createdByName;
			this.createdDate = Util.stringToDateTime(obj.createdDate);
			this.fileName = obj.fileName;
			this.id	 = obj.id;
			this.lastModifiedById = obj.lastModifiedById;
			this.lastModifiedByName = obj.lastModifiedByName;
			this.lastModifiedDate = Util.stringToDateTime(obj.lastModifiedDate);
			this.manageableState = obj.manageableState;
			this.namespacePrefix = obj.namespacePrefix;
			this.fullName = obj.fullName;
			this.type = obj.type;
		}
	}
}