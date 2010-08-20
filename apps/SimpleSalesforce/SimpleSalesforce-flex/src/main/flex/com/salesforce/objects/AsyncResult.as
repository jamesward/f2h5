package com.salesforce.objects
{
	import mx.utils.ObjectProxy;
	
	public class AsyncResult extends ObjectProxy
	{
		[Bindable]
	   	public var done:Boolean;
		[Bindable]
	    public var id:String;
		[Bindable]
	    public var message:String;
		[Bindable]
	    public var secondsToWait:int;
		[Bindable]
	    public var state:AsyncRequestState = AsyncRequestState.InProgress;
		[Bindable]
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