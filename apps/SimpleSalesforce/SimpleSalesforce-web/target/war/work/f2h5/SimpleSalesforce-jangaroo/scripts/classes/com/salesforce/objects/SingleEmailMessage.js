joo.classLoader.prepare(/*
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
"package com.salesforce.objects",/*
{
	import mx.utils.ObjectProxy
	import mx.collections.ArrayCollection
	import com.salesforce.XmlWriter
	import flash.utils.**/
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
	"public dynamic class SingleEmailMessage extends com.salesforce.objects.BaseEmail",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 
	
		"public var",{ bccAddresses/*:String*/: undefined}, // array or comma seperated? the sample messages do not show an array
		"public var",{ toAddresses/*:String*/: undefined},
		"public var",{ ccAddresses/*:String*/: undefined},
		"public var",{ htmlBody/*:String*/: undefined},
		"public var",{ charset/*:String*/: undefined},
		"public var",{ plainTextBody/*:String*/: undefined},
		"public var",{ targetObjectId/*:String*/: undefined},
		
		"public function SingleEmailMessage",function $SingleEmailMessage(obj/*:ObjectProxy = null*/) {if(arguments.length<1){obj = null;}	
			this[$super](obj);
			for (var key/*:String*/ in obj) {
				this[key] = obj[key];
			}	
		},	
		
		/* soap message from a minimum working AJAX test
		
<se:Envelope xmlns:se="http://schemas.xmlsoap.org/soap/envelope/">
<se:Header xmlns:sfns="urn:partner.soap.sforce.com">
<sfns:SessionHeader><sessionId>aKt=</sessionId>
</sfns:SessionHeader></se:Header>
<se:Body><sendEmail xmlns="urn:partner.soap.sforce.com" xmlns:ns1="sobject.partner.soap.sforce.com">
<ns1:messages 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:type="SingleEmailMessage">
		<toAddresses>rhess@salesforce.com</toAddresses>
		<plainTextBody> body of the 
 message</plainTextBody>
 </ns1:messages>
 </sendEmail></se:Body></se:Envelope> 
 */
 
		/**
		 * @private
		 * 
		 */		
		"public function toXml",function toXml(sobjectNs/*:String*/, name/*:String*/, writer/*:XmlWriter*/)/*:void*/
  		{
    		writer.writeStartElement(name, sobjectNs);
    		writer.writeXsiType('SingleEmailMessage');  // need to apply our own xsi type

                /*
                // E4X not supported by Jangaroo

    		var classInfo:XML = describeType(this); // used to walk thru the variable names of this class
    		
    		for each (var v:XML in classInfo..variable) {
         		var propName:String = v.@name;
           		var propVal:Object = this[propName];
           		
           		if (!propVal) continue;			// skip empty properties
        		if (propVal is Array) {
            		for (var propArrayVal:String in propVal) {
                		writer.writeNameValueNode( propName, propVal[propArrayVal]);
            		}
        		} else {
        			writer.writeNameValueNode( propName , propVal);
        		}
        		
    		}
                */
    		
    		writer.writeEndElement(name, sobjectNs);
  		},	
  		
	];},[],["com.salesforce.objects.BaseEmail"]
);