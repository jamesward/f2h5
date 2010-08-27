package com.salesforce.objects
{
	public class AsyncRequestState
	{
		private var _value_:String;
		private static var _table_:Object = new Object();

	    private static var _Queued:String = "Queued";
	    private static var _InProgress:String = "InProgress";
	    private static var _Completed:String = "Completed";
	    private static var _Error:String = "Error";
	    
	    public static const Queued:AsyncRequestState = new AsyncRequestState(_Queued);
	    public static const InProgress:AsyncRequestState = new AsyncRequestState(_InProgress);
	    public static const Completed:AsyncRequestState = new AsyncRequestState(_Completed);
	    public static const Error:AsyncRequestState = new AsyncRequestState(_Error);
	    
	    public function AsyncRequestState(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public function fromValue(value:String):AsyncRequestState {
	        var enumeration:AsyncRequestState = _table_[value] as AsyncRequestState;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
	}
}