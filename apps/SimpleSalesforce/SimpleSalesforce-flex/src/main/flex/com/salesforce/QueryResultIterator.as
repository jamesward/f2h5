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
package com.salesforce
{
	import com.salesforce.events.QueryEvent;
  	import com.salesforce.results.QueryResult;
  	
  	import com.salesforce.AsyncResponder;
  	import mx.utils.ObjectUtil;
  	import com.salesforce.objects.SObject;
 
  /**
   * Simple interface to combine query() and queryMore() when traversing large query return sets. 
   * Uses an event to wait for each subsequent queryMore() call to complete.  Calls the provided function once with each 
   * sobject from the query result set.  
   * The provided function should return true to continue processing or false to quit the looping.
   * The forEach function can be provided in the constructor or by calling object.forEach() and passing the 
   * reference to the function that should be used.
   * 
   * @example <code>var d:QueryResultIterator = new QueryResultIterator(conn, "select id , name from Account");<br />
   * d.forEach(	function (so:SObject):Boolean { 
   *		output.text += so.Name + '\n'; 
   *		return true;
   *  } );</code>
   * 
   * @example <code>d = new QueryResultIterator(c);
   *  d.soql = "select id , name from Account";
   *  d.forEach( function ); 
   * 
   * @author rhess
   * 
   */  		
  public class QueryResultIterator
  {
  	/*
  	 * provide a simple interface to query + queryMore combination
  	 * prefetch batches, allow access to the results using a 'next' method
  	 * requires an event unless there is a better way
  	 *
  	 */
  	private var _soql:String;
 	private var _foreach:Function; // pass in a function returning boolean which operates on each record
 	private var _connection:Connection; // the connection we will employ
 	private var _qr: QueryResult = null;
 	private var _index:int;
 	
	public function QueryResultIterator (apexConnection:Connection,soql:String="",forEachSobject:Function=null) {
		this._soql = soql;
		this._connection = apexConnection;
		this._index = 0;
		
		if ( forEachSobject != null ) {
			this.forEach(forEachSobject); // go into the main query loop
		}
	}
	public function set soql(s:String):void { this._soql = s;}
	public function get soql():String { return this._soql;}
	
	public function queryResult():QueryResult { return this._qr;}
	public function lastSobject():Boolean { 
		return ( this._qr.done && this._index == this._qr.records.length-1);
	}
	
	public function forEach(forEachSobject:Function):void { 
		if (forEachSobject== null || !(forEachSobject is Function)) throw ('forEach expected function argument'); 
		if ( this._soql == "") throw ("empty SOQL statement on this object"); 
		
		this._foreach = forEachSobject; 
		_connection.addEventListener(QueryEvent.QUERY_EVENT, queryMoreProcessBatch); // add an listener for the async event : query complete
		_connection.query(this._soql, new AsyncResponder(this.sendQueryComplete, this.genericFault) );
	}
	
	// PRIVATE below here
    private function queryMoreProcessBatch(event:QueryEvent):void {
	  	this._qr = event.queryResult;
	  	var userDone:Boolean = false;

	  	if (this._qr.size > 0) { // size is 0 if query found no records
		  	for (this._index = 0; this._index < this._qr.records.length; this._index++) { 
		  		// make the callback 
		  		if ( ! this._foreach( this._qr.records[this._index] ) ) { 
		  			userDone = true; // user's function returned false, stop processing 
		  			break;
		  		}
		  	}
	  	}
	  	/* the above breaks the batch nature of the queryResult
	  	 * TODO implement a batch wise callback function as an alternative method
	  	 */ 
	  	/* 
	  	 * if (this._dobatch) {
	  	 *   this._foreac_bhatch ( qr.records ) or break; 
	  	 * } 
	  	 */
	  	  	
	  	// setup for another event if we are not done
	  	if ( userDone == false && this._qr.done == false ) {  
	  		this._connection.queryMore( this._qr.queryLocator, new AsyncResponder(sendQueryComplete, this.genericFault ));
	  	} else {
	  		_connection.removeEventListener(QueryEvent.QUERY_EVENT, queryMoreProcessBatch);  // all done, clean up
	  	}	
  	}
  	
	private function sendQueryComplete(qr:QueryResult): void  {  _connection.dispatchEvent(new QueryEvent(QueryEvent.QUERY_EVENT, qr));	 }
	private function genericFault(fault:Object):void { throw ( 'fault from operation query()/queryMore(): ' + ObjectUtil.toString(fault) );	}
	
  }
}