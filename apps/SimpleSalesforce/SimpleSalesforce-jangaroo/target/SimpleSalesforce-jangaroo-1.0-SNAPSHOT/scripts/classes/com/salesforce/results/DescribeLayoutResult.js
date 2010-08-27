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
	import mx.controls.List
	import mx.events.IndexChangedEvent

	import com.salesforce.results.**/
	
	/* this response requires a raft of new objects 
	DescribeLayoutSection
	RelatedList
	DescribeLayoutRow
	DescribeLayoutItem
	DescribeLayoutComponent
	DescribeLayoutComponentType
	RecordTypeMapping
	PicklistForRecordType
	RelatedList
	RelatedListColumn
	RelatedListSort
	*/
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
	"public dynamic class DescribeLayoutResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$i=$$l+'i';return[function(){joo.classLoader.init(mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.RecordTypeMapping,com.salesforce.results.DescribeLayout);},
	
		"public var",{ layouts/*:ArrayCollection*/: undefined},
		"public var",{ recordTypeMappings/*:ArrayCollection*/: undefined},
		"private var",{ i/*:int*/: undefined},
		
		"public function DescribeLayoutResult",function $DescribeLayoutResult(obj/*:ObjectProxy*/) {this[$super]();
			for (var key/*:String*/ in obj) {
				var val/*:Object*/ = obj[key];	
				if (key == "layouts") {
					this.layouts = new mx.collections.ArrayCollection();
					if ( is(val, mx.utils.ObjectProxy)) {
						this.layouts.addItem( new com.salesforce.results.DescribeLayout(val) );	
					} else {
						for (this[$i]=0;this[$i]<(val/*as ArrayCollection*/).length;this[$i]++) { 
							this.layouts.addItem( new com.salesforce.results.DescribeLayout((val/*as ArrayCollection*/)[this[$i]]) );
						}
					}								
				} else if (key == "recordTypeMappings") {						
					this.recordTypeMappings = new mx.collections.ArrayCollection();
					if ( is(val, mx.utils.ObjectProxy)) { 
						this.recordTypeMappings.addItem(new com.salesforce.results.RecordTypeMapping(val));
					} else {
						for (this[$i]= 0;this[$i]<(val/*as ArrayCollection*/).length;this[$i]++) { 
							this.recordTypeMappings.addItem( new com.salesforce.results.RecordTypeMapping((val/*as ArrayCollection*/)[this[$i]]) );
						}
					}
				} else {
					this[key] = obj[key];
				}
			}
		},
	];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","com.salesforce.results.DescribeLayout","com.salesforce.results.RecordTypeMapping"]
	/*
	public dynamic class DescribeLayoutSection {
		
	}
	
	public dynamic class RelatedList {
		
	}
	public dynamic class DescribeLayoutRow {
		
	}
	public dynamic class DescribeLayoutItem {
		
	}
	public dynamic class DescribeLayoutComponent {
		
	}	
	public dynamic class DescribeLayoutComponentType {
		
	}
	public dynamic class RecordTypeMapping {
		
	}
	public dynamic class PicklistForRecordType {
		
	}

	public dynamic class RelatedListColumn {
		
	}
	public dynamic class RelatedListSort {
		
	}
	*/
);