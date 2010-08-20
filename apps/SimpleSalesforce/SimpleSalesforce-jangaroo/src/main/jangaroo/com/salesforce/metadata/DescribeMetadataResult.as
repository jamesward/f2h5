package com.salesforce.metadata
{
	import com.salesforce.objects.SoapObject;
	
	import mx.collections.ArrayCollection;
	
	public class DescribeMetadataResult extends SoapObject
	{
		[ArrayElementType("DescribeMetadataObject")]
	    public var metadataObjects:ArrayCollection = new ArrayCollection(); //DescribeMetadataObject[] metadataObjects;
    	public var organizationNamespace:String;
    	public var partialSaveAllowed:Boolean;
    	public var testRequired:Boolean;

		public function DescribeMetadataResult(object:Object) {
			if (object.metadataObjects is ArrayCollection) {
				var o:Object;
				for each (o in object.metadataObjects) {
					metadataObjects.addItem(new DescribeMetadataObject(o));
				}
			}
			//metadataObjects = object.metadataObjects;
			if (object.organizationNamespace is String) {
				organizationNamespace = object.organizationNamespace;
			} else {
				organizationNamespace = null;
			}
			partialSaveAllowed = object.partialSaveAllowed;
			testRequired = object.testRequired;
		}
	}
}