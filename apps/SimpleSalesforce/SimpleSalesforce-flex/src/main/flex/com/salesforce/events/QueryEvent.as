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
package com.salesforce.events
{
	import flash.events.Event;

	import com.salesforce.results.QueryResult;
	
	/**
	 * Event used to wait for the completion of query() or queryMore() methods, used internaly  
	 * when looping across an extended query result set using QueryResultIterator()
	 * 
	 * @see com.salesforce.QueryResultIterator#forEach()
	 * 
	 * @author rhess
	 * 
	 */
	public class QueryEvent extends Event
	{
        // Public constructor.
        public function QueryEvent(type:String, queryResult:QueryResult) {
			// Call the constructor of the superclass.
            super(type);
    
            // Set the new property.
            this.queryResult = queryResult;
        }

        // Define static constant.
        public static const QUERY_EVENT:String = "queryCompleteEvent";

        // Define static constant.
		public var queryResult:QueryResult;
		
        // Override the inherited clone() method.
        override public function clone():Event {
            return new QueryEvent(type,queryResult);
        }
	}
}