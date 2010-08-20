package com.salesforce.results
{
	import com.salesforce.metadata.CodeLocation;
	
	import mx.collections.ArrayCollection;
	
	public class CodeCoverageResult
	{
		[ArrayElementType("CodeLocation")]
	    public var dmlInfo:ArrayCollection = new ArrayCollection();
	    public var id:String;
	    [ArrayElementType("CodeLocation")]
	    public var locationsNotCovered:ArrayCollection = new ArrayCollection();
	    [ArrayElementType("CodeLocation")]
	    public var methodInfo:ArrayCollection = new ArrayCollection();
	    public var name:String;
	    public var _namespace:String;
	    public var numLocations:Number;
	    public var numLocationsNotCovered:Number;
	    [ArrayElementType("CodeLocation")]
	    public var soqlInfo:ArrayCollection = new ArrayCollection();
	    public var type:String;
	    
	    public function CodeCoverageResult(obj:Object) {
	    	if (obj.dmlInfo is ArrayCollection) {
	    		var di:Object;
	    		for each (di in obj.dmlInfo) {
	    			dmlInfo.addItem(new CodeLocation(di));
	    		}
	    	}
	    	this.id = obj.id;
	    	if (obj.locationsNotCovered is ArrayCollection) {
	    		var lnc:Object;
	    		for each (lnc in obj.locationsNotCovered) {
	    			locationsNotCovered.addItem(new CodeLocation(lnc));
	    		}
	    	}
	    	if (obj.methodInfo is ArrayCollection) {
	    		var mi:Object
	    		for each (mi in obj.methodInfo) {
	    			methodInfo.addItem(new CodeLocation(mi));
	    		}
	    	}
	    	this.name = obj.name;
	    	this._namespace = obj.namespace;
	    	this.numLocations = obj.numLocations;
	    	this.numLocationsNotCovered = obj.numLocationsNotCovered;
	    	if (obj.soqlInfo is ArrayCollection) {
	    		var si:Object;
	    		for each (si in obj.soqlInfo) {
	    			soqlInfo.addItem(new CodeLocation(si));
	    		}
	    	}
	    	this.type = obj.type;
	    }
	}
}