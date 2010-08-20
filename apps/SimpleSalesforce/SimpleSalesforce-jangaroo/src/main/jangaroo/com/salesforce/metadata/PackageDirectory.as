package com.salesforce.metadata
{
	import com.salesforce.objects.SoapObject;
	
	import mx.collections.ArrayCollection;

	public class PackageDirectory extends SoapObject
	{
		[ArrayElementType("String")]
	    public var member:ArrayCollection = new ArrayCollection();
	    public var name:String;
	    
	    public function PackageDirectory(memberArray:ArrayCollection, name:String) {
	    	this.member = memberArray;
	    	this.name = name;
	    }
	}
}