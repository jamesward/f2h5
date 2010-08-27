package com.salesforce.metadata
{
	import com.salesforce.XmlWriter;
	import com.salesforce.objects.SoapObject;
	
	import flash.utils.describeType;
	
	import mx.collections.ArrayCollection;
	import mx.logging.Log;

	public class PackageTypeMembers extends SoapObject
	{
		[ArrayElementType("String")]
	    public var members:String; //:ArrayCollection = new ArrayCollection();
	    public var name:String;
	    
	    public function PackageTypeMembers(members:String, name:String) {
	    	this.members = members;
	    	this.name = name;
	    }
		
 		override public function toXml(objectNs:String, elementName:String, writer:XmlWriter):void
  		{
    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
			var name_x:String = classInfo.@name.toString();
			name_x = name_x.substr(name.indexOf("::") +2);
			if (name_x == "SF_Picklist") {
				name_x = "Picklist";
			}
    		writer.writeStartElement(elementName, null);
    		//writer.writeXsiType(name);  // need to apply our own xsi type
    		writer.writeNameValueNode("members", members);
    		writer.writeNameValueNode("name", name);
    		
    		/*for each (var v:XML in classInfo..variable) {
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
        		
    		}*/
    		
    		writer.writeEndElement(elementName, objectNs);
  		}


	}
}