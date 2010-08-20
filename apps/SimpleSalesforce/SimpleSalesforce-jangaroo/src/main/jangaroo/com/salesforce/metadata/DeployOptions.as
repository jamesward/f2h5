package com.salesforce.metadata
{
	import com.salesforce.XmlWriter;
	import com.salesforce.objects.SoapObject;
	
	import flash.utils.*;
	
	import mx.collections.ArrayCollection;
	import mx.logging.Log;
	
	public class DeployOptions extends SoapObject
	{
	    public var autoUpdatePackage:Boolean = false;
	    public var checkOnly:Boolean = false;
	    public var partialSave:Boolean = false;
	    public var performRetrieve:Boolean = false;
	    public var runAllTests:Boolean = true;
	    [ArrayElementType("String")]
	    public var runTests:ArrayCollection;
	    public var saveWithErrors:Boolean = false;
	    public var singlePackage:Boolean = false;
		
		
		
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
           			Log.getLogger("com.salesforce.metadata.DeployOptions").debug("Stop here");
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