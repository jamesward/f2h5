package com.salesforce.metadata
{
	import com.salesforce.XmlWriter;
	import com.salesforce.objects.SoapObject;
	
	import flash.utils.describeType;
	
	import mx.collections.ArrayCollection;
	import mx.logging.Log;

	public class Package extends SoapObject
	{
    	public var apiAccessLevel:String;
    	public var description:String;
    	public var fullName:String;
    	public var namespacePrefix:String;
    	[ArrayElementType("ProfileObjectPermissions")]
    	public var objectPermissions:ArrayCollection;
    	public var setupWeblink:String;
		[ArrayElementType("PackageTypeMembers")]
		public var types:ArrayCollection = new ArrayCollection();
    	public var version:String;
    	
    	public function Package() {
    	}
 		override public function toXml(objectNs:String, elementName:String, writer:XmlWriter):void
  		{
    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
			var name:String = classInfo.@name.toString();
			name = name.substr(name.indexOf("::") +2);
			if (name == "SF_Picklist") {
				name = "Picklist";
			}
    		writer.writeStartElement(elementName, null);
    		//writer.writeXsiType(name);  // need to apply our own xsi type
    		
    		for each (var v:XML in classInfo..variable) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];

    			if (propName.indexOf("_") == 0) {
    				propName = propName.substr(1);
    			}
           		
           		if (propName == "displayFormat") {
           			Log.getLogger("com.salesforce.metadata.RetrieveRequest").debug("Stop here");
           		}
           		if (propVal == null || propName == "uid" || propVal == "") continue;			// skip empty properties
        		if (propVal is Array || propVal is ArrayCollection) {
            		for (var propArrayVal:String in propVal) {
            			if (propVal[propArrayVal] is SoapObject) {
            				propVal[propArrayVal].toXml(objectNs, propName, writer);
	              		} else {
	                		writer.writeNameValueNode( propName, propVal[propArrayVal]);
	              		}
            		}
          		} else if (propVal is SoapObject) {
          			propVal.toXml(objectNs, propName, writer);
        		} else {
        			writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
    		
    		writer.writeEndElement(elementName, objectNs);
  		}

	}
}