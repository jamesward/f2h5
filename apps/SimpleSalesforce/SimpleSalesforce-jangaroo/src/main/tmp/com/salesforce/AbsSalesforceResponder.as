package com.salesforce
{
	import com.salesforce.events.ReceivedEvent;
	
	import mx.collections.ArrayCollection;
	import mx.rpc.IResponder;
	import mx.rpc.events.ResultEvent;
	import mx.utils.ObjectProxy;
	import com.salesforce.results.SaveResult;
	import mx.logging.Log;
	
	use namespace salesforce_internal;
	
	dynamic public class AbsSalesforceResponder extends ObjectProxy implements ISalesforceResponder
	{
	  	protected var clientResponder:IResponder;
  		protected var connection:AbsConnection;
    	protected var _context:Object;

	  	public function AbsSalesforceResponder(connection:AbsConnection, clientResponder:IResponder) {
	    	this.connection = connection;
	    	this.clientResponder = clientResponder;
	        this._context = clientResponder;
	  	}
		
		public function get context():Object {
			return _context;
		}
  		public function getResponseType(result:Object):String
		{
			//Handle remoteFunction
			if (result.result.hasOwnProperty("Envelope")) {
				var response:ObjectProxy = result.result.Envelope.Body;
				var responseKey:String;
		    	for (var key:String in response) {
		    		responseKey = key;
		    		break;
		    	}
		    	return responseKey;
		  } else {
		  	return "remoteFunctionResponse";
		  }
		}
		
		public function getResponse(result:Object):Object
		{
			//Handle remote function
			if (result.result.hasOwnProperty("Envelope")) {
				//Soap Response	
			
				var response:Object = result.result.Envelope.Body;
		    	for (var key:String in response) {
	    			response = response[key].result;
	    			break;
	    		}
	    		return response;
	  		} else {
	  			return result.result;
	  		}
		}
		
		public function result(result:Object):void
		{
			var re:ResultEvent = result as ResultEvent;
			var bxml:XML = new XML(re.message.body.toString());
			var receivedEvent:ReceivedEvent = new ReceivedEvent(ReceivedEvent.RECEIVED_RESPONSE, bxml.toString(), this);
			connection.dispatchEvent(receivedEvent);
			/*Log.getLogger("com.salesforce.AbsSalesforceResponder").debug"Error : Subclass must override this method!");
    		throw new Error("Subclass must override this method!");*/
		}
		
		public function ensureArray(result:Object):ArrayCollection
		{
	  		if ( result is ArrayCollection ) {
	  			return result as ArrayCollection; // all is well
	  		}
	  		var resultArray:ArrayCollection = new ArrayCollection();
	  		resultArray.addItem( result ); 
	  		return resultArray;
		}
				
	  	public function createSaveResult(result:Object):Array {
	  		var rArray:ArrayCollection = new ArrayCollection();
	  	
	  		if (result is ArrayCollection) {
				rArray = result as ArrayCollection;
	  		} else {
	  			rArray.addItem(result);
	  		}
			var resultObject:Array = new Array();
			for (var i:int=0;i<rArray.length;i++) {
				resultObject[i] = new SaveResult(rArray[i] as ObjectProxy);
			}
			return resultObject;
	  	}
  	
		
		public function fault(fault:Object):void
		{
			Log.getLogger("com.salesforce.AbsConnection").error("Error : Subclass must override this method!");
    	throw new Error("Subclass must override this method!");
		}
		
	}
}