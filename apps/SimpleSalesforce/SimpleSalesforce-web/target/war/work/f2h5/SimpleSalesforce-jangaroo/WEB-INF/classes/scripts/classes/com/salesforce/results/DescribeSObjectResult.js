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
	import mx.events.ChildExistenceChangedEvent*/
	
  /**
   * Returned in the response to describeSObject(), contains detailed information on the custom or standard object
   * 
   * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_describesobjects_describesobjectresult.htm Apex Developer Guide
   * 
   * @author rhess
   * 
   */		
	"public dynamic class DescribeSObjectResult",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.salesforce.results.RecordTypeInfo,com.salesforce.results.Field,mx.collections.ArrayCollection,com.salesforce.results.ChildRelationship,mx.utils.ObjectProxy,Array);},
	
		"public function DescribeSObjectResult",function $DescribeSObjectResult(obj/*:ObjectProxy*/) {this[$super]();
			for (var key/*:String*/ in obj) {
				var val/*:Object*/ = obj[key];
				if ( is(val, mx.collections.ArrayCollection) || is( val, mx.utils.ObjectProxy)) {
					if (key == "fields") {
						var fieldArray/*:Array*/ = new Array();
						for (var i/*:int*/ = 0;i<(val/*as ArrayCollection*/).length;i++) {
							var field/*:Field*/ = new com.salesforce.results.Field((val/*as ArrayCollection*/)[i]);
							fieldArray[field.name] = field;
						}
						this[key] = fieldArray;
					} else if (key == "childRelationships") {
						var crArray/*:Array*/ = new Array();
						var cr/*:ChildRelationship*/;
						if ( is(!val, mx.utils.ObjectProxy)) {
							cr = new com.salesforce.results.ChildRelationship(val/*as ObjectProxy*/);
							crArray[cr.relationshipName] = cr;
						} else {
							for (var i2/*:int*/ = 0;i2<(val/*as ArrayCollection*/).length;i2++) {
								cr = new com.salesforce.results.ChildRelationship((val/*as ArrayCollection*/)[i2]);
								crArray[cr.relationshipName] = cr;
							}
						}
						this[key] = crArray;
					} else if (key == "recordTypeInfos") {
						var rtArray/*:Array*/ = new Array();
						var rt/*:RecordTypeInfo*/;
						if ( is(val, mx.utils.ObjectProxy)) {
							rt = new com.salesforce.results.RecordTypeInfo(val/*as ObjectProxy*/);
							rtArray[rt.name] = rt;
						} else {
							for (var i3/*:int*/ =0;i3<(val/*as ArrayCollection*/).length;i3++) {
								rt = new com.salesforce.results.RecordTypeInfo((val/*as ArrayCollection*/)[i3]);
								rtArray[rt.name] = rt;
							}
						}
						this[key] = rtArray;
					}
				} else {
					this[key] = obj[key];
				}
			}
		},
	];},[],["mx.collections.ArrayCollection","mx.utils.ObjectProxy","Array","com.salesforce.results.Field","com.salesforce.results.ChildRelationship","com.salesforce.results.RecordTypeInfo"]
);