package com.salesforce.objects
{
	import mx.collections.ArrayCollection;

	public class DeploymentStatus 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
		
		private static var _InDevelopment:String = "InDevelopment";
	    private static var _Deployed:String = "Deployed";

		public static const InDevelopment:DeploymentStatus = new DeploymentStatus(_InDevelopment);
	    public static const Deployed:DeploymentStatus = new DeploymentStatus(_Deployed);
	    
	    public function DeploymentStatus(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public static function fromValue(value:String):DeploymentStatus {
	        var enumeration:DeploymentStatus = _table_[value] as DeploymentStatus;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
	}
}