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
import mx.rpc.IResponder;
import mx.utils.ObjectProxy;
import mx.utils.ObjectUtil;
import mx.collections.ArrayCollection;
 
import com.salesforce.salesforce_internal;
import com.salesforce.results.*;
import com.salesforce.objects.*;
import com.salesforce.Util;
import com.salesforce.Connection;
//import mx.rpc.Fault;


"use namespace salesforce_internal",;
/**
* @private
*/
class SalesForceResponder implements mx.rpc.IResponder {

 	/**
 	 * This class is used to package up the results from raw xml into sobjects, queryResponses and other 
 	 * Apex specific structures 
 	 * @param connection
 	 * @param clientResponder
 	 * @return 
 	 * 
 	 */ 
 	public native function SalesForceResponder(connection:Connection, clientResponder:IResponder);
  	
  	public native function result(result:Object):void;
  	
  	public native function fault(fault:Object):void;
}
}