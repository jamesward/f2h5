package com.salesforce.objects
{
	import mx.collections.ArrayCollection;

	public class SharingModel 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
				
	    private static var _Private:String = "Private";
	    private static var _Read:String = "Read";
	    private static var _ReadWrite:String = "ReadWrite";

	    public static const Private:SharingModel = new SharingModel(_Private);
	    public static const Read:SharingModel = new SharingModel(_Read);
	    public static const ReadWrite:SharingModel = new SharingModel(_ReadWrite);
	    
	    public function SharingModel(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

	    public static function fromValue(value:String):SharingModel {
	        var enumeration:SharingModel = _table_[value] as SharingModel;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
	    
	}
}