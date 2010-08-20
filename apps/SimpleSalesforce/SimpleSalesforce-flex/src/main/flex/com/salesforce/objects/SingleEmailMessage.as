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
	 * SingleEmailMessage, fill out the paramaters of this object to pass to the connection.sendEmail() method
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_sendemail.htm#SingleEmailMessage Developer Doc
	 * 
	 * @example This example is just about the minimum fields to fill out before calling 
	 * sendEmail(). <code>var single: SingleEmailMessage = new SingleEmailMessage();<br/>
	 * single.subject = 'test email';<br/>
  	 * single.toAddresses = 'info at salesforce.com';<br/>
  	 * single.plainTextBody = 'body of email ';<br/>
  	 * single.emailPriority = 'Low';</code>
  	 * 
	 * @author Ron Hess Salesforce.com
	 * 
	 */
	public dynamic class SingleEmailMessage extends BaseEmail 
	{
		public var bccAddresses:Array; // array or comma seperated? the sample messages do not show an array
		public var ccAddresses:Array;
		public var charset:String;
	    public var documentAttachments:Array; // 11.0
	    public var fileAttachments:Array; // array of EmailFileAttachment 
		public var htmlBody:String;
		public var plainTextBody:String;

		/**
		 * targetObjectId - Optional. The object ID of the contact, lead, or user the email will be sent to. 
		 * The object ID you enter sets the context and ensures that merge fields in the template contain the correct data. 
		 * At least one value must be specified in the toAddresses, 
		 * ccAddresses, bccAddresses, targetObjectId, or targetObjectIds field.
		*/
		public var targetObjectId:String;    
		public var toAddresses:Array;
		
		/**
		* whatId -- Optional if you specify a contact for the targetObjectId field, 
			you can specify a whatId as well. This helps to further ensure that merge fields in the template contain the correct data. 
			The value must be one of the following types:	Account, Asset, Campaign, Case, Contract, Opportunity, Order, Product, Solution
			or Custom object
		*/
		public var whatId:String; 
		
    	/**
    	* possible priority values for emailPriority, also found in EmailPriority.as
    	*/    	
    	public static const HIGHETS:String = "Highest";
    	public static const HIGH:String = "High";
    	public static const NORMAL:String = "Normal";
    	public static const LOW:String = "Low";
    	public static const LOWEST:String = "Lowest";


		public function SingleEmailMessage(obj:ObjectProxy = null) {	
			super(obj);
			for (var key:String in obj) {
				this[key] = obj[key];
			}	
		}	
		
		/* soap message from a minimum working AJAX test
		
<se:Envelope xmlns:se="http://schemas.xmlsoap.org/soap/envelope/">
<se:Header xmlns:sfns="urn:partner.soap.sforce.com">
<sfns:SessionHeader><sessionId>aKt=</sessionId>
</sfns:SessionHeader></se:Header>
<se:Body><sendEmail xmlns="urn:partner.soap.sforce.com" xmlns:ns1="sobject.partner.soap.sforce.com">
<ns1:messages 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:type="SingleEmailMessage">
		<toAddresses>bbb@salesforce.com</toAddresses>
		<plainTextBody> body of the 
 message</plainTextBody>
 </ns1:messages>
 </sendEmail></se:Body></se:Envelope> 
 */
 
		/**
		 * @private
		 * 
		 */		
		public function toXml(sobjectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, sobjectNs);
    		writer.writeXsiType('SingleEmailMessage');  // need to apply our own xsi type

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