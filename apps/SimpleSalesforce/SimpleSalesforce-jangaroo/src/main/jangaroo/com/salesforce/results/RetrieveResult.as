package com.salesforce.results
{
	import com.salesforce.metadata.FileProperties;
	import com.salesforce.metadata.RetrieveMessage;
	import com.salesforce.objects.Base64;
	
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;
	
	public class RetrieveResult
	{
		[ArrayElementType("com.salesforce.metadata.FileProperties")]
		public var fileProperties:ArrayCollection = new ArrayCollection();
    	public var id:String;
    	[ArrayElementType("com.salesforce.metadata.RetrieveMessage")]
    	public var messages:ArrayCollection = new ArrayCollection();
    	public var zipFile:ByteArray; 
    	
    	public function RetrieveResult(obj:Object) {
    		if (obj.fileProperties is ArrayCollection) {
    			var fp:Object;
    			for each (fp in obj.fileProperties) {
    				fileProperties.addItem(new FileProperties(fp));
    			}
    		}
    		this.id = obj.id;
    		if (obj.messages is ArrayCollection) {
    			var msg:Object;
    			for each (msg in obj.messages) {
    				messages.addItem(new RetrieveMessage(msg));
    			}
    		}
    		zipFile = Base64.decode(obj.zipFile);
    	}
	}
}