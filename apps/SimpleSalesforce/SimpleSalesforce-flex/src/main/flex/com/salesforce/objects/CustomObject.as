package com.salesforce.objects
{
	import mx.utils.ObjectProxy;
	import com.salesforce.XmlWriter;
	import flash.utils.describeType;
	import mx.collections.ArrayCollection;

	[Bindable]
	public class CustomObject extends Metadata
	{
	    public var deploymentStatus:DeploymentStatus;
	    public var description:String;
	    public var enableActivities:Boolean;
	    public var enableDivisions:Boolean;
	    public var enableHistory:Boolean;
	    public var enableReports:Boolean;
	    public var gender:Gender;
	    public var label:String;
	    public var nameField:CustomField;
	    public var pluralLabel:String;
	    public var sharingModel:SharingModel;
	    public var startsWith:StartsWith;		
		private var fields:ArrayCollection = new ArrayCollection();
		
		/*public function toXml(objectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, objectNs);
    		writer.writeXsiType('CustomObject');  // need to apply our own xsi type

    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
    		
    		for each (var v:XML in classInfo..accessor) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];
           		
           		if (propVal == null || propName == "uid") continue;			// skip empty properties
        		if (propVal is Array) {
            		for (var propArrayVal:String in propVal) {
                		writer.writeNameValueNode( propName, propVal[propArrayVal]);
            		}
          		} else if (propVal is CustomField) {
          			propVal.toXml(objectNs, propName, writer);
        		} else {
        			writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
    		
    		writer.writeEndElement(name, objectNs);
  		}*/
		
		public function addField(field:CustomField):void {
			fields.addItem(field);
		}
		public function getFields():ArrayCollection {
			return fields;
		}
	}
}