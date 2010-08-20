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
	import mx.utils.ObjectProxy;
	import mx.collections.ArrayCollection;
	import com.salesforce.XmlWriter;
	import flash.utils.*;
	/**
	 * MassEmailMessage, fill out the paramaters of this object to pass to the connection.sendEmail() method
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_sendemail.htm#MassEmailMessage Developer Doc
	 * 
	 * @example This example is not written
  	 * 
	 * @author Ron Hess Salesforce.com
	 * 
	 */
	public dynamic class MassEmailMessage extends BaseEmail 
	{
		/**
		 * targetObjectIds - Optional. The object ID of the contact, lead, or user the email will be sent to. 
		 * The object ID you enter sets the context and ensures that merge fields in the template contain the correct data. 
		 * At least one value must be specified in the toAddresses, 
		 * ccAddresses, bccAddresses, targetObjectId, or targetObjectIds field.
		*/
		public var targetObjectIds:Array;
		
		
		/**
		* whatIds -- Optional if you specify a contact for the targetObjectId field, 
			you can specify a whatId as well. This helps to further ensure that merge fields in the template contain the correct data. 
			The value must be one of the following types:	Account, Asset, Campaign, Case, Contract, Opportunity, Order, Product, Solution
			or Custom object
		*/
		public var whatIds:Array;


		public function MassEmailMessage(obj:ObjectProxy = null) {	
			super(obj);
			for (var key:String in obj) {
				this[key] = obj[key];
			}	
		}	
		
		/* soap message from a minimum working AJAX test
		TODO
 */
 
		/**
		 * @private
		 * 
		 */		
		public function toXml(sobjectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, sobjectNs);
    		writer.writeXsiType('MassEmailMessage');  // need to apply our own xsi type

    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
    		
    		for each (var v:XML in classInfo..variable) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];
           		
           		// skip empty properties, unless they are boolean, thus seralized false.
           		if (!propVal && typeof(this[propName])!='boolean' ) {
           			continue;			
           		} 
           			
        		if (propVal is Array) {
            		for (var propArrayVal:Object in propVal) {
            			if ( propVal[propArrayVal] is EmailFileAttachment) 
            			   propVal[propArrayVal].toXml(sobjectNs,propName,writer);
            			else 
                		   writer.writeNameValueNode( propName, propVal[propArrayVal]);
            		}
        		} else {
        			writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
    		
    		writer.writeEndElement(name, sobjectNs);
  		}	
  		
	}
}