package com.salesforce.objects
{
	import mx.rpc.IResponder;
	
	public class RemoteFunctionRequest extends SoapObject
	{
		public var url:String; 
  		public var callback:IResponder;
  		public var method:String = "GET"; 
  		public var mimeType:String = "text/plain";
  		public var requestHeaders:Object;
  		public var requestData:Object;
  		public var cache:Boolean;
  		
  		
	}
}