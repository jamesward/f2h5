package com.salesforce.objects
{
	import mx.utils.ObjectProxy;
	
	public class AsyncResult extends ObjectProxy
	{
	   	public var done:Boolean;
	    public var id:String;
	    public var message:String;
	    public var secondsToWait:int;
	    public var state:AsyncRequestState = AsyncRequestState.InProgress;
	    public var statusCode:StatusCode = StatusCode.ALREADY_IN_PROCESS;
	    private var success:Boolean;
	    
	    public function AsyncResult(result:Object) {
	    	for (var key:String in result) {
	    		if (this[key] != null && this[key].hasOwnProperty("getValue")) {
	    			this[key] = this[key].fromValue(result[key]);
	    		} else {
		    		this[key] = result[key];
		    	}
	    	}
	    }
	    
	}
}
