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
	import mx.collections.ArrayCollection*/

	/**
	 * Class returned to the responder from connection.describeLayout() calls, contains details describing 
	 * the page layouts for edit and detail pages and various information about each record type for this object.
	 * 
	 * 
	 * @see com.salesforce.Connection#describeLayout()
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_describelayout.htm Apex Developer Guide
	 * 
	 * @author Ron Hess salesforce.com 
	 */		
	"public dynamic class DescribeLayoutItem",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.DescribeLayoutComponent,mx.collections.ArrayCollection,mx.utils.ObjectProxy);},
	
		"public var",{ editable/*:Boolean*/: undefined},
		
		"public var",{ layoutComponents/*:ArrayCollection*/: undefined},
		
		"public function DescribeLayoutItem",function $DescribeLayoutItem(obj/*:ObjectProxy*/) {this[$super]();
			for (var key/*:String*/ in obj) {
				var val/*:Object*/ = obj[key];	
				if (key == "layoutComponents") { 
					this[key] = new mx.collections.ArrayCollection();
					if ( is(val, mx.utils.ObjectProxy)) { 
						this[key].addItem( new com.salesforce.results.DescribeLayoutComponent( val/*as ObjectProxy*/) ); 
					} else {
						for (var i/*:int*/ = 0;i<(val/*as ArrayCollection*/).length;i++) { 
							this[key].addItem( new com.salesforce.results.DescribeLayoutComponent((val/*as ArrayCollection*/)[i]) );
						}	
					}
				} else {
					this[key] = obj[key];
				}
			}
		},	
	];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutComponent"]
);