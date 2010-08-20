package com.salesforce.metadata
{
	import com.salesforce.objects.SoapObject;
	
	public class DescribeMetadataObject extends SoapObject
	{
		public var directoryName:String;
   		public var inFolder:Boolean;
	    public var metaFile:Boolean;
	    public var parent:String;
	    public var suffix:String;
	    public var xmlName:String;
	    
	    public function DescribeMetadataObject(object:Object) {
	    	directoryName = object.directoryName;
	    	inFolder = object.inFolder;
	    	metaFile = object.metaFile;
	    	parent = object.parent;
	    	suffix = object.suffix;
	    	xmlName = object.xmlName;
	    }
	}
}