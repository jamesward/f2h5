package com.salesforce.results
{
	import com.salesforce.metadata.CodeCoverageWarning;
	import com.salesforce.metadata.RunTestFailure;
	import com.salesforce.metadata.RunTestSuccess;
	
	import mx.collections.ArrayCollection;
	
	public class RunTestsResult
	{
		[ArrayElementType("CodeCoverageResult")]
	    public var codeCoverage:ArrayCollection = new ArrayCollection();
	    [ArrayElementType("CodeCoverageWarning")]
	    public var codeCoverageWarnings:ArrayCollection = new ArrayCollection();
	    [ArrayElementType("RunTestFailure")]
	    public var failures:ArrayCollection = new ArrayCollection();
	    public var numFailures:Number;
	    public var numTestsRun:Number;
	    [ArrayElementType("RunTestSuccess")]
	    public var successes:ArrayCollection = new ArrayCollection();
	    public var totalTime:Number;
	    
	    public function RunTestsResult(obj:Object) {
	    	if (obj.codeCoverage is ArrayCollection) {
	    		var cc:Object;
	    		for each (cc in obj.codeCoverage) {
	    			codeCoverage.addItem(new CodeCoverageResult(cc));
	    		}
	    	}
	    	if (obj.codeCoverageWarnings is ArrayCollection) {
	    		var ccw:Object;
	    		for each (ccw in obj.codeCoverageWarnings) {
	    			codeCoverageWarnings.addItem(new CodeCoverageWarning(ccw));
	    		}
	    	}
	    	if (obj.failures is ArrayCollection) {
	    		var f:Object;
	    		for each (f in obj.failures) {
	    			failures.addItem(new RunTestFailure(f));
	    		}
	    	}
	    	this.numFailures = obj.numFailures;
	    	this.numTestsRun = obj.numTestsRun;
	    	if (obj.successes is ArrayCollection) {
	    		var s:Object;
	    		for each (s in obj.successes) {
	    			successes.addItem(new RunTestSuccess(s));
	    		}
	    	}
	    	this.totalTime = obj.totalTime;
	    }
	}
}