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
	import com.salesforce.XmlWriter;
	import com.salesforce.results.*;
	
	import flash.net.registerClassAlias;
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;
	import mx.core.IUID;
	import mx.utils.ObjectProxy;
	import mx.utils.UIDUtil;
	
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
  [Bindable]
    [RemoteClass(alias="com.salesforce.objects.SObject")]
	public dynamic class SObject extends ObjectProxy implements IUID
	{	  
	  override public function get uid():String
	  {
	    if (this.Id != undefined)
	    {
	      return this.Id;
	    }
	    return UIDUtil.createUID(); 
	  }
	  
	  override public function set uid(uid:String):void
	  {
	    this.Id = uid;
	  }
	  
		/**
		 * Generic constructor for a normal SObject, used by an application to create an empty object
		 * or passed to the application with data filled in from an API request.
		 * When the obj is an ObjectProxy, this object is being created from server data (query or retrieve).
		 * When the obj is a String, the object is being created from code (new SObject("Account")).
		 * 
		 */ 	
		public function SObject(obj:Object=null) {
			if (obj is String) {
				this.type = obj as String;
			} else if (obj is ObjectProxy) {
				loadSObject(obj as ObjectProxy);
			} else {
				loadSObject(new ObjectProxy(obj));
			}
		}
	
		/**
		 * An sobject will consist of key/value pairs and possible related children, this will 
		 * render the given SObject as XML, used to prepare the object for SOAP transport
		 * 
		 * We don't have to worry about including typing info in the soap message.
		 * 
		 * We do have to worry about date formats.
		 * 
		 */
		public function toXml(sobjectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, sobjectNs);
			this.writeValue(sobjectNs, writer, "type", this["type"]);
    		for (var f:String in this) {
           		var val:Object = this[f];
        		if (val is Array) {
            		for (var aval:String in val) {
                		this.writeValue(sobjectNs, writer, f, val[aval]);
            		}
        		} else {
        			if (f != "type") {
	            		this.writeValue(sobjectNs, writer, f, val);
	          		}
        		}
    		}
    		writer.writeEndElement(name, sobjectNs);
  		}
  		
  		public function getFields():Array
  		{
  			var fieldArray:Array = new Array()
  			for (var f:String in this) 
  			{
  				fieldArray.push(f);
  			}
  			return fieldArray;
  		}
  		
		private function writeValue(sobjectNs:String, writer:XmlWriter, name:String, val:Object):void
  		{
    		if (val == null)
    		{
        		writer.writeNameValueNode("fieldsToNull", name);
        		return;
    		}
    		if (val is SObject) {
        		val.toXml(sobjectNs, name, writer);
    		} else {
        		writer.writeNameValueNode(name, val);
    		}
  		}
  
  		/**
  		 * Loads the SObject object given the SOAP response for connection.query() or connection.retrieve()
  		 */
		public function loadSObject(obj:ObjectProxy):void {
			for (var i:String in obj) {
				var key:String = i;
				var val:Object = obj[i];
				if (i != "xsi:type") {
					if (i.toLowerCase() == "id") {
						if (val is ArrayCollection) {
							this["Id"] = (val as ArrayCollection)[0];
						} else {
							this["Id"] = val;
						}
					} else if (val is ObjectProxy) {
						//This could be a parent record (SObject) or
						//child records, QueryResult, or a xsi:nil
						if (val.hasOwnProperty("xsi:nil")) {
							this[i] = null;
						} else {
							var xsiType:String = val["xsi:type"];
							if (xsiType == "sf:sObject") {
								this[i] = new SObject(val as ObjectProxy);
							} else {
								this[i] = new QueryResult(val as ObjectProxy);
							}
						}
					} else {
						this[i] = val;
					}
				}
			}
		}
		
		/**
		 * return a string representation of this SObject, does pretty printing with new lines
		 * @return String
		 * 
		 */		
		public function toDebugString():String
		{
			var ret:String = 'SObject\n';
			for (var key:String in this) { 
				var val:Object = this[key];
				if (val is ArrayCollection) {
					var vArray:ArrayCollection = val as ArrayCollection;
					for (var i:int=0;i<vArray.length;i++) {
						var vVal:Object = vArray[i];
						if (vVal is SObject) {
							ret += (vVal as SObject).toDebugString();
						} else {
							ret += ' ' + key + ':' + vVal + '\n';
						}
					}
				} else if (val is SObject) {
					ret += (val as SObject).toDebugString();
				} else {
					ret += ' ' + key + ':' + val + '\n';
				}
			}
			return ret;
		}
		
		/**
		 * Method used to decode Body properties returned by the API, normaly transmited as BinaryBase64, these 
		 * can be converted back into their original string or image data
		 * @param field byte array of the decodeed field contents
		 * 
		 * @return ByteArray 
		 * @exampple var str:ByteArray = sobject.decodeBase64('Body');  
		 * 
		 */		
		public function decodeBase64(field:String):ByteArray {
			return Base64.decode( this[field] );
		}
		
		//TG: added so we can clone SObjects
		public function clone():SObject
		{
			registerClassAlias("SObjectAlias", SObject);
			var bytes : ByteArray = new ByteArray();
			bytes.writeObject( this );
			bytes.position = 0;
			return bytes.readObject() as SObject;
		}
	}	
}
