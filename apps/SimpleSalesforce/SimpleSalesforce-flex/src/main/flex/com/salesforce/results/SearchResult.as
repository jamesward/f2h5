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
package com.salesforce.results
{
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectProxy;
	
	import com.salesforce.objects.SObject;
	
	/**
	 * Class returned as a result of the call to connection.Search(), response contains a property 'searchRecords' which is an array of SObjects.
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_search.htm Apex Developer Doc
	 * 
	 * @author rhess
	 * 
	 */	

	public dynamic class SearchResult
	{
		public var searchRecords:ArrayCollection;
		
		public function SearchResult(result:ObjectProxy) {
			
			for (var i:String in result) {
				var val:Object = result[i];
				if (i != "xsi:type") {
					if (i == "searchRecords") {
						//This might be the array of records.
						//If so, we need to loop 
						var records:ArrayCollection = val as ArrayCollection;
						var sobjects:ArrayCollection = new ArrayCollection(null);
						// When only a single record is returned, it's not actually
						// an arraycollection, so we need to force it.
						if (records == null) {
							records = new ArrayCollection();
							records.addItem(val);
						}
						for (var x:int = 0;x<records.length;x++) {
							sobjects.addItem(new SObject(records[x]));
						}
						this[i] = sobjects;
					} else if (val is ObjectProxy) {
						if (val.hasOwnProperty("xsi:nil")) {
							this[i] = null;
						}
					} else {
						this[i] = val;
					}
				}
			}
		}
	}
}

