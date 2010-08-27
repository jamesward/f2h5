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
"package com.salesforce.results",/*
{
	import mx.collections.ArrayCollection
	import mx.utils.ObjectProxy
	import com.salesforce.results.*
	import com.salesforce.objects.SObject*/
	
	"public dynamic class LoginResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,com.salesforce.results.UserInfo,mx.utils.ObjectProxy);},
	
		"public var",{ passwordExpired/*:Boolean*/: undefined},
		"public var",{ serverUrl/*:String*/: undefined},
		"public var",{ sessionId/*:String*/: undefined},
		"public var",{ userId/*:String*/: undefined},
		"public var",{ userInfo/*:UserInfo*/: undefined},
		
		"public function LoginResult",function $LoginResult(result/*:Object=null*/) {if(arguments.length<1){result=null;}
			this[$super]();
			
			if (result != null)
			{
				var response/*:Object*/ = result.result.Envelope.Body.loginResponse.result;
				for (var i/*:String*/ in response) {
					var value/*:Object*/ = response[i];
					if ( is(value, mx.utils.ObjectProxy)) {
						//This is the userInfo bit
						this[i] = new com.salesforce.results.UserInfo(value/*as ObjectProxy*/);
					} else {
						this[i] = response[i];
					}
				}
			}
			else
			{
				this.passwordExpired = false;
				this.serverUrl = '';
				this.sessionId = '';
				this.userId = '';
				this.userInfo = null;
			}
		},
		
		"public function toDebugString",function toDebugString()/*:String*/
		{
			var ret/*:String*/ = 'LoginResult\n';
			for (var key/*:String*/ in this) { 
				var val/*:Object*/ = this[key];
				if ( is(val, mx.collections.ArrayCollection)) {
					var vArray/*:ArrayCollection*/ = val/*as ArrayCollection*/;
					for (var i/*:int*/ =0;i<vArray.length;i++) {
						var vVal/*:Object*/ = vArray[i];
						if ( is(vVal, com.salesforce.objects.SObject)) {
							ret += (vVal/*as SObject*/).toDebugString();
						} else {
							ret += ' ' + key + ':' + vVal + '\n';
						}
					}
				} else if ( is(val, com.salesforce.objects.SObject)) {
					ret += (val/*as SObject*/).toDebugString();
				} else if ( is(val, com.salesforce.results.UserInfo)) {
					ret += key + "\n" + (val/*as UserInfo*/).toDebugString();
				} else {
					ret += ' ' + key + ':' + val + '\n';
				}
			}
			return ret;
		},
	];},[],["mx.utils.ObjectProxy","com.salesforce.results.UserInfo","mx.collections.ArrayCollection","com.salesforce.objects.SObject"]
);