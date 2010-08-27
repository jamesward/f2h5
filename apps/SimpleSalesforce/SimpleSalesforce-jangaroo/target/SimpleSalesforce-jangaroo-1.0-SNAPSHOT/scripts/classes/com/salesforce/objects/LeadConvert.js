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
	import com.salesforce.XmlWriter
	import flash.utils.**/
  /**
   * Object to collect the paramaters required to perform connection.convertLead()
   * 
   * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_convertlead.htm Apex Developer Guide
   * 
   * @author rhess
   * 
   */	
  "public class LeadConvert extends mx.utils.ObjectProxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
  
    "public var",{ accountId/*:String*/: undefined},
    "public var",{ contactId/*:String*/: undefined},
    "public var",{ convertedStatus/*:String*/: undefined},
    "public var",{ doNotCreateOpportunity/*:Boolean*/: undefined},
    "public var",{ leadId/*:String*/: undefined},
    "public var",{ opportunityName/*:String*/: undefined},
    "public var",{ overwriteLeadSource/*:Boolean*/: undefined},
    "public var",{ ownerId/*:String*/: undefined},
    "public var",{ sendNotificationEmail/*:Boolean*/: undefined},
    
    "public function LeadConvert",function $LeadConvert()/*:void*/ {
    	this[$super]();
    },
    
		"public function toXml",function toXml(sobjectNs/*:String*/, name/*:String*/, writer/*:XmlWriter*/)/*:void*/
  		{
    		writer.writeStartElement(name, sobjectNs);
    		//writer.writeXsiType('SingleEmailMessage');  // need to apply our own xsi type

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
  ];},[],["mx.utils.ObjectProxy"]
);