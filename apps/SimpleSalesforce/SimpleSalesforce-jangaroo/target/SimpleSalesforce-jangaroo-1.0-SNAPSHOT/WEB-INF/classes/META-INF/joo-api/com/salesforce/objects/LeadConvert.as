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
	import com.salesforce.XmlWriter;
	import flash.utils.*;
  /**
   * Object to collect the paramaters required to perform connection.convertLead()
   * 
   * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_convertlead.htm Apex Developer Guide
   * 
   * @author rhess
   * 
   */	
  public class LeadConvert extends mx.utils.ObjectProxy
  {
    public var accountId:String;
    public var contactId:String;
    public var convertedStatus:String;
    public var doNotCreateOpportunity:Boolean;
    public var leadId:String;
    public var opportunityName:String;
    public var overwriteLeadSource:Boolean;
    public var ownerId:String;
    public var sendNotificationEmail:Boolean;
    
    public native function LeadConvert():void;
    
		public native function toXml(sobjectNs:String, name:String, writer:XmlWriter):void;
  }
}