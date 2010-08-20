package com.salesforce.metadata
{
	import com.salesforce.XmlWriter;
	import com.salesforce.objects.SoapObject;
	
	import flash.utils.*;
	
	import mx.collections.ArrayCollection;
	import mx.logging.Log;

	public class RetrieveRequest extends SoapObject
	{
		public var apiVersion:String = "14.0"; 
		[ArrayElementType("String")]
		public var packageNames:ArrayCollection = new ArrayCollection();
	    public var singlePackage:Boolean;
	    [ArrayElementType("String")]
	    private var _specificFiles:ArrayCollection = new ArrayCollection();
	    [ArrayElementType("Package")]
	    public var unpackaged:ArrayCollection = new ArrayCollection();
	    public var version:String;
	    
	    public function set specificFiles(fileNames:ArrayCollection):void {
	    	if (fileNames != null && fileNames.length > 0) {
	    		packageNames = new ArrayCollection();
	    		_specificFiles = new ArrayCollection(fileNames.toArray());
	    	} else {
	    		_specificFiles = new ArrayCollection();
	    	}
	    }
	    
/* 	    public function RetrieveRequest(packageName:ArrayCollection, singlePackage:Boolean, specificFile:ArrayCollection, unpackaged:Package) {
	    	this.packageName = packageName;
	    	this.singlePackage = singlePackage;
	    	this.specificFile = specificFile;
	    	this.unpackaged = unpackaged;
	    }
 */	
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