package com.salesforce
{
	
	
	
	
	use namespace salesforce_internal;

	public interface IConnection 
	{
		function getCurrentSessionid():String;
		function writeHeader(writer:XmlWriter, headerNs:String):void;
		function invoke(method:String, args:Array, isArray:Boolean, responder:ISalesforceResponder, nsMap:Array=null, intServerUrl:String=null, sfNs:String=null, sobjNs:String=null, remote:Object = null):void;		
		function _invoke(method:String, args:Array, isArray:Boolean, responder:ISalesforceResponder, namespaces:Array, url:String, headerNs:String, sobjectNs:String, remote:Object=null):void;
	}
}