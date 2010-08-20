package com.salesforce.objects
{
	import com.salesforce.XmlWriter;
	
	import flash.utils.describeType;
	
	import mx.logging.Log;
	import mx.utils.ObjectProxy;

	public class SoapObject extends ObjectProxy
	{
		public function toXml(objectNs:String, elementName:String, writer:XmlWriter):void
  		{
    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
			var name:String = classInfo.@name.toString();
			name = name.substr(name.indexOf("::") +2);
			if (name == "SF_Picklist") {
				name = "Picklist";
			}
    		writer.writeStartElement(elementName, objectNs);
    		writer.writeXsiType(name);  // need to apply our own xsi type
    		
    		for each (var v:XML in classInfo..accessor) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];

    			if (propName.indexOf("_") == 0) {
    				propName = propName.substr(1);
    			}
           		
           		if (propName == "displayFormat") {
           			Log.getLogger("com.salesforce.objects.SoapObject").debug("Stop here");
           		}
           		if (propVal == null || propName == "uid" || propVal == "") continue;			// skip empty properties
        		if (propVal is Array) {
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