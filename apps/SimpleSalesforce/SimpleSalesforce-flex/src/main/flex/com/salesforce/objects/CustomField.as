package com.salesforce.objects
{
	

	[Bindable]
	public class CustomField extends Metadata
	{
	    public var caseSensitive:Boolean;
	    public var defaultValue:String;
	    public var description:String;
	    public var displayFormat:String;
	    public var externalId:Boolean;
	    public var formula:String;
	    public var formulaTreatBlanksAs:TreatBlanksAs;
	    public var label:String;
	    public var _length:int;
	    public var picklist:SF_Picklist;
	    public var populateExistingRows:Boolean;
	    public var precision:int;
	    public var referenceTo:String;
	    public var relationshipName:String;
	    public var required:Boolean;
	    public var scale:int;
	    public var startingNumber:int;
	    private var _type:FieldType;
	    public var unique:Boolean;
	    public var visibleLines:int;
		
		public function clone():CustomField {
			var f:CustomField = new CustomField();
			f.caseSensitive = caseSensitive;
			f.defaultValue = defaultValue;
			f.description = description;
			f.displayFormat = displayFormat;
			f.externalId = externalId;
			f.formula = formula;
			f.formulaTreatBlanksAs = formulaTreatBlanksAs;
			f.fullName = fullName;
			f.label = label;
			f._length = _length;
			f.picklist = picklist;
			f.populateExistingRows = populateExistingRows;
			f.precision = precision;
			f.referenceTo = referenceTo;
			f.relationshipName = relationshipName;
			f.required = required;
			f.scale = scale;
			f.startingNumber = startingNumber;
			f._type = _type;
			f.unique = unique;
			f.visibleLines = visibleLines;
			return f;
		}
		public function get type():FieldType {
			if (formula != null ) {
				if (formula.length > 0) {
					return FieldType.Formula;
				} else {
					return _type;
				}
			} else {
				return _type;
			}
		}
		public function set type(ftype:FieldType):void {
			_type = ftype;
		}
		public function getActualType():FieldType {
			return _type;
		}
		/*public function toXml(objectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, objectNs);
    		writer.writeXsiType('CustomField');  // need to apply our own xsi type

    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
    		
    		for each (var v:XML in classInfo..accessor) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];
           		
           		if (propVal == null || propName == "uid") continue;			// skip empty properties
        		if (propVal is Array) {
            		for (var propArrayVal:String in propVal) {
                		writer.writeNameValueNode( propName, propVal[propArrayVal]);
            		}
        		} else {
        			if (propName == "_length") { propName = "length"; }
        			writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
    		
    		writer.writeEndElement(name, objectNs);
  		}*/
	    
	}
}