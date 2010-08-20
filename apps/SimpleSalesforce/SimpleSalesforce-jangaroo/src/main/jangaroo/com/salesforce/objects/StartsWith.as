package com.salesforce.objects
{
	import mx.collections.ArrayCollection;
	

	public class StartsWith 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
		
	    public static const _Consonant:String = "Consonant";
	    public static const _Vowel:String = "Vowel";
	    public static const _Special:String = "Special";

	    public static const Consonant:StartsWith = new StartsWith(_Consonant);
	    public static const Vowel:StartsWith = new StartsWith(_Vowel);
	    public static const Special:StartsWith = new StartsWith(_Special);

	    public function StartsWith(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public static function fromValue(value:String):StartsWith {
	        var enumeration:StartsWith = _table_[value] as StartsWith;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }

	}
}