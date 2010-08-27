package com.salesforce.objects
{
	import mx.collections.ArrayCollection;
	

	public class FieldType 
	{
		private var _value_:String;
		private static var _table_:Object = new Object();
		
	    private static var _AutoNumber:String = "AutoNumber";
	    private static var _Lookup:String = "Lookup";
	    private static var _MasterDetail:String = "MasterDetail";
	    private static var _Checkbox:String = "Checkbox";
	    private static var _Currency:String = "Currency";
	    private static var _Date:String = "Date";
	    private static var _DateTime:String = "DateTime";
	    private static var _Email:String = "Email";
	    private static var _Number:String = "Number";
	    private static var _Percent:String = "Percent";
	    private static var _Phone:String = "Phone";
	    private static var _Picklist:String = "Picklist";
	    private static var _MultiselectPicklist:String = "MultiselectPicklist";
	    private static var _Text:String = "Text";
	    private static var _TextArea:String = "TextArea";
	    private static var _LongTextArea:String = "LongTextArea";
	    private static var _Url:String = "Url";
	    private static var _Formula:String = "Formula";
	    
	    public static const AutoNumber:FieldType = new FieldType(_AutoNumber);
	    public static const Text:FieldType = new FieldType(_Text);
	    public static const Lookup:FieldType = new FieldType(_Lookup);
	    public static const MasterDetail:FieldType = new FieldType(_MasterDetail);
	    public static const Checkbox:FieldType = new FieldType(_Checkbox);
	    public static const Currency:FieldType = new FieldType(_Currency);
	    public static const Date:FieldType = new FieldType(_Date);
	    public static const DateTime:FieldType = new FieldType(_DateTime);
	    public static const Email:FieldType = new FieldType(_Email);
	    public static const Number:FieldType = new FieldType(_Number);
	    public static const Percent:FieldType = new FieldType(_Percent);
	    public static const Phone:FieldType = new FieldType(_Phone);
	    public static const Picklist:FieldType = new FieldType(_Picklist);
	    public static const MultiselectPicklist:FieldType = new FieldType(_MultiselectPicklist);
	    public static const TextArea:FieldType = new FieldType(_TextArea);
	    public static const LongTextArea:FieldType = new FieldType(_LongTextArea);
	    public static const Url:FieldType = new FieldType(_Url);
	    public static const Formula:FieldType = new FieldType(_Formula);
	    
	    public function FieldType(type:String) {
	    	_value_ = type;
	    	_table_[type] = this;
	    }

		public static function getAllEnums():ArrayCollection {
			var v:ArrayCollection = new ArrayCollection();
			for (var key:String in _table_) {
				v.addItem(_table_[key]);
			}
			return v;
		}
		public static function getAllValues():ArrayCollection {
			var v:ArrayCollection = new ArrayCollection();
			for (var key:String in _table_) {
				v.addItem(key);
			}
			return v;
		}
	    public static function fromValue(value:String):FieldType {
	        var enumeration:FieldType = _table_[value] as FieldType;
	        if (enumeration==null) throw "Illegal Argument (" + value + " is not a valid enum value.)";
	        return enumeration;
	    }
	    
	    public function getValue():String { return _value_; }
	    public function toString():String { return _value_; }
	}
}