package com.salesforce.objects
{
	import mx.collections.ArrayCollection;
	

	public class TreatBlanksAs 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
		
	    private static var _BlankAsBlank:String = "BlankAsBlank";
	    private static var _BlankAsZero:String = "BlankAsZero";

	    public static const BlankAsBlank:TreatBlanksAs = new TreatBlanksAs(_BlankAsBlank);
	    public static const BlankAsZero:TreatBlanksAs = new TreatBlanksAs(_BlankAsZero);
	    
	    public function TreatBlanksAs(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public static function fromValue(value:String):TreatBlanksAs {
	        var enumeration:TreatBlanksAs = _table_[value] as TreatBlanksAs;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
	}
}