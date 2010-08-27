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
package com.salesforce.objects
{
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectProxy;
	import com.salesforce.XmlWriter;
	import com.salesforce.results.*;
	import flash.events.EventDispatcher;
	import mx.binding.utils.BindingUtils;
	import flash.utils.ByteArray;
	
	/**
	 * The basic object that holds all salesforce.com record data.  Created by the toolkit as a response 
	 * to a query or retrieve method, this can also be created by an application that wishes to create() a new record in 
	 * a salesforce database.  An SObject that is created by the toolkit and returned as a result of a query 
	 * or retrieve can be modified by the application and then passed into an update() method.
	 * 
	 * @example <code>var acc:SObject = new SObject('Account');<br/>
	 * acc.Name = 'new account name here';<br/>
	 * conn.create([acc], new AsyncResponder(createResultFunc, genericFaultFunc));</code>
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_objects_list.htm#topic-title Apex Developer Doc Standard Objects
	 * 
	 * @author  Dave Carroll saleforce.com
	 * 
	 */	
    //[Bindable]
	public dynamic class SObject extends mx.utils.ObjectProxy
	{
	
		/**
		 * Generic constructor for a normal SObject, used by an application to create an empty object
		 * or passed to the application with data filled in from an API request.
		 * When the obj is an ObjectProxy, this object is being created from server data (query or retrieve).
		 * When the obj is a String, the object is being created from code (new SObject("Account")).
		 * 
		 */ 	
		public native function SObject(obj:Object);
	
		/**
		 * An sobject will consist of key/value pairs and possible related children, this will 
		 * render the given SObject as XML, used to prepare the object for SOAP transport
		 * 
		 * We don't have to worry about including typing info in the soap message.
		 * 
		 * We do have to worry about date formats.
		 * 
		 */
		public native function toXml(sobjectNs:String, name:String, writer:XmlWriter):void;
  
  		/**
  		 * Loads the SObject object given the SOAP response for connection.query() or connection.retrieve()
  		 */
		public native function loadSObject(obj:ObjectProxy):void;
		
		/**
		 * return a string representation of this SObject, does pretty printing with new lines
		 * @return String
		 * 
		 */		
		public native function toDebugString():String;
		
		/**
		 * Method used to decode Body properties returned by the API, normaly transmited as BinaryBase64, these 
		 * can be converted back into their original string or image data
		 * @param field byte array of the decodeed field contents
		 * 
		 * @return ByteArray 
		 * @exampple var str:ByteArray = sobject.decodeBase64('Body');  
		 * 
		 */		
		public native function decodeBase64(field:String):ByteArray;
		
	}	
}