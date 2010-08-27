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
	import mx.utils.ObjectProxy
	import mx.collections.ArrayCollection
	import com.salesforce.objects.SObject*/
	
	"public dynamic class UserInfo",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.objects.SObject,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},
	
		"public function UserInfo",function $UserInfo(obj/*:ObjectProxy*/) {this[$super]();
			for (var prop/*:String*/ in obj) {
				if ( is(obj[prop], mx.utils.ObjectProxy)) {
					if (obj[prop].hasOwnProperty("xsi:nil")) {
						this[prop] = null;
					} else {
						this[prop] = obj[prop];
					}
				}
				this[prop] = obj[prop];
			}
		},
		
		"public function toDebugString",function toDebugString()/*:String*/
		{
			var ret/*:String*/ = '';
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
				} else {
					ret += ' ' + key + ':' + val + '\n';
				}
			}
			return ret;
		},
	];},[],["mx.utils.ObjectProxy","mx.collections.ArrayCollection","com.salesforce.objects.SObject"]
);