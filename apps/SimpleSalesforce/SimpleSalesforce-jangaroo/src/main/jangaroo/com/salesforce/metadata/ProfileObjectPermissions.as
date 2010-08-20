package com.salesforce.metadata
{
	import com.salesforce.XmlWriter;
	import com.salesforce.objects.SoapObject;
	import flash.utils.describeType;

	public class ProfileObjectPermissions extends SoapObject
	{
		public var allowCreate:Boolean = true;
		public var allowDelete:Boolean = true;
		public var allowEdit:Boolean = true;
		public var allowRead:Boolean = true;
		public var object:String;
		
		
		public function ProfileObjectPermissions(objectName:String, canCreate:Boolean = true, canDelete:Boolean = true, canEdit:Boolean = true, canRead:Boolean = true) {
			super();
			allowCreate = canCreate;
			allowDelete = canDelete;
			allowEdit = canEdit;
			allowRead = canRead;
			object = objectName;
		}

 		override public function toXml(objectNs:String, elementName:String, writer:XmlWriter):void
  		{
    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
			var name:String = classInfo.@name.toString();
			name = name.substr(name.indexOf("::") +2);
    		writer.writeStartElement(elementName, null);
    		
    		for each (var v:XML in classInfo..variable) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];

    			if (propName.indexOf("_") == 0) {
    				propName = propName.substr(1);
    			}
           		
           		if (propVal == null || propName == "uid" || propVal == "") continue;			// skip empty properties
       			writer.writeNameValueNode( propName , propVal);
    		}
    		
    		writer.writeEndElement(elementName, objectNs);
  		}
		
	}
}