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
 	
	public native function QueryResultIterator (apexConnection:Connection,soql:String="",forEachSobject:Function=null);
	public native function set soql(s:String):void;
	public native function get soql():String;
	
	public native function queryResult():QueryResult;
	public native function lastSobject():Boolean;
	
	public native function forEach(forEachSobject:Function):void;
	
  }
}