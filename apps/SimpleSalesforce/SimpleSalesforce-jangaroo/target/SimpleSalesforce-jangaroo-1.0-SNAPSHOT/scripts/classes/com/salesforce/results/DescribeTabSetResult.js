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
	import mx.utils.ObjectUtil*/
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
	"public dynamic class DescribeTabSetResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeTab,mx.utils.ObjectProxy,Array);},
	
		"public var",{ label/*:String*/: undefined},
		"public var",{ namespace/*:String*/: undefined},
		"public var",{ logoUrl/*:String*/: undefined},
		"public var",{ selected/*:Boolean*/: undefined},
		"public var",{ tabs/*:Array*/: undefined},// DescribeTab[];
		
		"public function DescribeTabSetResult",function $DescribeTabSetResult(obj/*:ObjectProxy*/) {this[$super]();
			for (var key/*:String*/ in obj) {
				var val/*:Object*/ = obj[key];
				if (key == "tabs") {
					this.tabs = new Array();
					if ( is(val, mx.utils.ObjectProxy)) {
						this.tabs.push( new com.salesforce.results.DescribeTab(val/*as ObjectProxy*/) );
					} else {
						for (var i/*:int*/ = 0;i<(val/*as ArrayCollection*/).length;i++) { 
							this.tabs.push( new com.salesforce.results.DescribeTab((val/*as ArrayCollection*/)[i]) );
						}
					}
				} else {
					this[key] = obj[key];
				}
			}
		},	
	];},[],["Array","mx.utils.ObjectProxy","com.salesforce.results.DescribeTab"]
);