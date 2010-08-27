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
	 * A single section of a page edit or detail pages.
	 * 
	 * 
	 * @see com.salesforce.Connection#describeLayout()
	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_describelayout.htm Apex Developer Guide
	 * 
	 * @author Ron Hess salesforce.com 
	 */	
		/**
	 * A single section of a page, edit or detail, has a heading sometimes
	 * contains one or two columns
	 * 
	 * @author rhess
	 * 
	 */
	/* can be an edit section or a detail section 
	 * 
	 */
	"public dynamic class DescribeLayoutSection",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutRow);},
	
		"public var",{ layoutRows/*:ArrayCollection*/: undefined},
		"public var",{ useHeading/*:Boolean*/: undefined},
		"public var",{ heading/*:String*/: undefined},
		"public var",{ rows/*:Number*/: undefined},
		"public var",{ useCollapsibleSection/*:Boolean*/: undefined},
		
		
		"public function DescribeLayoutSection",function $DescribeLayoutSection(result/*:Object*/) {this[$super]();
			for (var key/*:String*/ in result) {
				var val/*:Object*/ = result[key];
				
				if ( is(val, mx.collections.ArrayCollection) || is( val, mx.utils.ObjectProxy)) {
					// layout rows
					if (key == "layoutRows") {
						this[key] = new mx.collections.ArrayCollection();
						if ( is(val, mx.utils.ObjectProxy)) {
							this[key].addItem( new com.salesforce.results.DescribeLayoutRow( val/*as ObjectProxy*/) );	
						} else {
							for (var i/*:int*/ = 0;i<(val/*as ArrayCollection*/).length;i++) { 
								this[key].addItem( new com.salesforce.results.DescribeLayoutRow((val/*as ArrayCollection*/)[i]) );
							}
						}
					}
				} else {
					this[key] = val;
				}
			}
		},
	];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutRow"]
);