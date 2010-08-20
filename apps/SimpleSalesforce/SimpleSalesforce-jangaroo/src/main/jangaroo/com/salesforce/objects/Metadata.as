package com.salesforce.objects
{
	import flash.utils.describeType;

	public class Metadata extends SoapObject
	{
		[Bindable]
	    public var fullName:String;
	    
		public function toString():String
  		{
			var output:String = "";
			
    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
    		
    		for each (var v:XML in classInfo..accessor) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];
           		
           		if (propVal == null || propName == "uid") continue;			// skip empty properties
        		if (propVal is Array) {
            		for (var propArrayVal:String in propVal) {
            			output += propName + ": " + propVal[propArrayVal] + "\n";
                		//writer.writeNameValueNode( propName, propVal[propArrayVal]);
            		}
          		} else if (propVal is Metadata) {
          			output += propVal.toString();
        		} else {
        			output += propName + ": " + propVal + "\n";
        			//writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
    		
    		return output;
  		}
 

		private var exists:Boolean = false;
		public function setExists(val:Boolean):void {
			exists = val;
		}
		public function getExists():Boolean {
			return exists;
		}
  		
	}
}