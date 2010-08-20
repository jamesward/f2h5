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
	import flash.utils.ByteArray;
	import com.salesforce.XmlWriter;
	import flash.utils.describeType;
	
	public final class EmailFileAttachment
	{
    	public var fileName:String;
    	public var body:String;  // base64 binary
    	
    	public function EmailFileAttachment(fileName:String=null,body:String=null) {
    		if (fileName!=null) { this.fileName  = fileName; } 
    		if (body!=null) { this.body  = body; } 		 
		}
		
		/**
		 * private
		 * seralize this object to xml, taken from sobject.toxml()
		 */
		public function toXml(sobjectNs:String, name:String, writer:XmlWriter):void
  		{
    		writer.writeStartElement(name, sobjectNs);
    		writer.writeXsiType('EmailFileAttachment');  // need to apply our own xsi type

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
    		
    		writer.writeEndElement(name, sobjectNs);
  		}	
	}
}