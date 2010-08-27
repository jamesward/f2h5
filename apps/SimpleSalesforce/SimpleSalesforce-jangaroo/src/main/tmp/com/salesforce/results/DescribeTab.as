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
package com.salesforce.results
{
	import mx.utils.ObjectProxy;
	/**
	 * Class returned to the responder from connection.describeTabs() calls, contains details describing 
	 * the tabs for each appexchange application, standard and custom.
	 * 
	 * 
	 * @see com.salesforce.Connection#describeTabs()
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_describetabs_describetabsetresult.htm Apex Developer Guide
	 * 
	 * @author Ron Hess salesforce.com
	 */	
	public dynamic class DescribeTab
	{
		public var custom:Boolean;
		public var label:String;
		public var namespace:String;
		public var sobjectName:String;
		public var url:String;
		
		public function DescribeTab(obj:ObjectProxy) {
			this.custom = obj.custom;
			this.label = obj.label;
			this.namespace = obj.namespace;
			this.sobjectName = obj.sobjectName;
			this.url = obj.url;
		}
	}
}