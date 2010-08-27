package com.salesforce.objects
{
	import mx.collections.ArrayCollection;
	

	public class Gender 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
		
	    private static var _Neuter:String = "Neuter";
    	private static var _Masculine:String = "Masculine";
    	private static var _Feminine:String = "Feminine";

	    public static const Neuter:Gender = new Gender(_Neuter);
    	public static const Masculine:Gender = new Gender(_Masculine);
    	public static const Feminine:Gender = new Gender(_Feminine);
    	
	    public function Gender(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public static function fromValue(value:String):Gender {
	        var enumeration:Gender = _table_[value] as Gender;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
    	
	}
}