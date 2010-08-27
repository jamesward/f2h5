package com.salesforce
{
	import mx.collections.ArrayCollection;
	import mx.rpc.IResponder;
	
	public interface ISalesforceResponder extends IResponder
	{
		function getResponseType(result:Object):String;
		function getResponse(result:Object):Object;
		function ensureArray(result:Object):ArrayCollection;
		function createSaveResult(result:Object):Array;
 
	}
}