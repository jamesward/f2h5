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
	import com.salesforce.results.**/
  /**
   * Returned in the response to describeLayout(), contains detailed information on the custom or standard object page layout
   * 
   * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_describelayout.htm Apex Developer Guide
   * 
   * @author rhess
   * 
   */	
	"public dynamic class DescribeLayout",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RelatedList,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.DescribeLayoutSection);},
	
		"public var",{ detailLayoutSections/*:ArrayCollection*/: undefined},
		"public var",{ editLayoutSections/*:ArrayCollection*/: undefined},
		"public var",{ relatedLists/*:ArrayCollection*/: undefined},
		
		"public function DescribeLayout",function $DescribeLayout(obj/*:Object*/) {this[$super]();
			for (var key/*:String*/ in obj) {
				var val/*:Object*/ = obj[key];	
				if ( is(val, mx.collections.ArrayCollection) || is( val, mx.utils.ObjectProxy)) {
					// one of detailLayoutSections, editLayoutSections, relatedList
					if (key == "detailLayoutSections" || key == "editLayoutSections") {
						this[key] = new mx.collections.ArrayCollection();
						for (var i/*:int*/ = 0;i<(val/*as ArrayCollection*/).length;i++) { 
							this[key].addItem( new com.salesforce.results.DescribeLayoutSection((val/*as ArrayCollection*/)[i]) );
						}		
					} else if (key == "relatedLists") {
						this[key] = new mx.collections.ArrayCollection();
						for (var i2/*:int*/ = 0;i2<(val/*as ArrayCollection*/).length;i2++) { 
							this[key].addItem( new com.salesforce.results.RelatedList( (val/*as ArrayCollection*/)[i2])  );
						}	
					} else {
						this[key] = val;
					}
					
				} else { this[key] = val;	}
			
			}
		},
	];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayoutSection","com.salesforce.results.RelatedList"]
);