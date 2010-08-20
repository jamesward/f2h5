/*
Copyright (c) 2007 salesforce.com, inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// ActionScript file
package com.salesforce.results
{
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectProxy;
	/**
	 * A Fault contains information about an error that occurred during a create, 
	 * merge, process, update, upsert, delete, or undelete call.
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_concepts_core_data_objects.htm#i1421521 Apex Developer Guide
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_concepts_errorhandling.htm#topic-title Error Handling
	 * 
	 * @author rhess
	 * 
	 */	
	public dynamic class Fault 
	{
		public var faultcode:String;
		public var faultstring:String;
		public var detail:ObjectProxy;
		import flash.utils.ByteArray;
		
		public function Fault(result:ObjectProxy)
		{
			for (var i:String in result) {
				var val:Object = result[i];
				if (val is ObjectProxy) {
					this[i] = clone( val ); // deep copy
				
				} else this[i] = val;
			}
		}
		
		/**
		 * 
		 * @private
		 * The following example defines a function named clone() that does deep copying. The algorithm is borrowed from a 
		 * common Java programming technique. The function creates a deep copy by 
		 * serializing the obj into an instance of the ByteArray class, and then reading the obj back into a new obj. 
		 * This function accepts an object so that it can be used with any of objects,  
		 * indexed arrays and associative arrays:
		 */		
		private function clone(source:Object):*
		{
		    var myBA:ByteArray = new ByteArray();
		    myBA.writeObject(source);
		    myBA.position = 0;
		    return(myBA.readObject());
		}
	}
}