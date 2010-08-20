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
	import mx.collections.ArrayCollection;
	import com.salesforce.objects.SObject;
	
	public dynamic class SetPasswordResponse
	{
		public function SetPasswordResponse(obj:ObjectProxy) {
			for (var prop:String in obj) {
				if (obj[prop] is ObjectProxy) {
					if (obj[prop].hasOwnProperty("xsi:nil")) {
						this[prop] = null;
					} else {
						this[prop] = obj[prop];
					}
				}
				this[prop] = obj[prop];
			}
		}
		
		public function toDebugString():String
		{
			var ret:String = '';
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
	}
}