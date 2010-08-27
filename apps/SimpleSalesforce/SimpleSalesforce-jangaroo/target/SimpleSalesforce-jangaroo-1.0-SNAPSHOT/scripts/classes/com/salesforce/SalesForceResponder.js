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
"package com.salesforce",/*
{
import mx.rpc.IResponder
import mx.utils.ObjectProxy
import mx.utils.ObjectUtil
import mx.collections.ArrayCollection
 
import com.salesforce.salesforce_internal
import com.salesforce.results.*
import com.salesforce.objects.*
import com.salesforce.Util
import com.salesforce.Connection
//import mx.rpc.Fault;


"use namespace salesforce_internal",*/
/**
* @private
*/
"class SalesForceResponder implements mx.rpc.IResponder",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clientResponder=$$l+'clientResponder',$connection=$$l+'connection',$_context=$$l+'_context',$getResponseType=$$l+'getResponseType',$getResponse=$$l+'getResponse',$ensureArray=$$l+'ensureArray',$createSaveResult=$$l+'createSaveResult';return[function(){joo.classLoader.init(com.salesforce.results.DescribeSObjectResult,com.salesforce.results.DeletedResponse,com.salesforce.objects.SObject,com.salesforce.results.SaveResult,mx.collections.ArrayCollection,mx.utils.ObjectProxy,com.salesforce.results.QueryResult,Array,com.salesforce.results.LoginResult,com.salesforce.results.GetServerTimestampResult,com.salesforce.results.UpdatedResponse,com.salesforce.results.Fault,com.salesforce.results.UserInfo,com.salesforce.results.UpsertResult,com.salesforce.results.DescribeLayoutResult,com.salesforce.results.DescribeTabSetResult,com.salesforce.results.SearchResult,com.salesforce.results.SendEmailResult);}, 

 	/**
 	 * This class is used to package up the results from raw xml into sobjects, queryResponses and other 
 	 * Apex specific structures 
 	 * @param connection
 	 * @param clientResponder
 	 * @return 
 	 * 
 	 */ 
 	"public function SalesForceResponder",function $SalesForceResponder(connection/*:Connection*/, clientResponder/*:IResponder*/) {this[$super]();
    	this[$connection] = connection;
    	this[$clientResponder] = clientResponder;
        this[$_context] = clientResponder;
  	},
  
  	"private var",{ clientResponder/*:IResponder*/: undefined},
  	"private var",{ connection/*:Connection*/: undefined},
    "private var",{ _context/*:Object*/: undefined},
  
  	"private function getResponseType",function getResponseType(result/*:Object*/)/*:String*/ {
		var response/*:ObjectProxy*/ = result.result.Envelope.Body;
		var responseKey/*:String*/;
    	for (var key/*:String*/ in response) {
    		responseKey = key;
    		break;
    	}
    	return responseKey;
  	},
  	
  	"private function getResponse",function getResponse(result/*:Object*/)/*:Object*/ {
		var response/*:Object*/ = result.result.Envelope.Body;
    	for (var key/*:String*/ in response) {
    		response = response[key].result;
    		break;
    	}
    	return response;
  	},
  	
  	"public function result",function result(result/*:Object*/)/*:void*/ {    
    	var resultObject/*:Object*/;
    	var response/*:Object*/ = this[$getResponse](result);
    	var responseType/*:String*/ = this[$getResponseType](result);
    	var i/*:int*/;
    	
    	com.salesforce.Util.debug(this[$connection], "responseType: " + responseType);
    	switch (responseType) {
    		case "loginResponse": 
    			this[$connection]._loginResult = new com.salesforce.results.LoginResult(result);
    			resultObject = this[$connection].loginResult;
      			this[$connection].sessionId = resultObject.sessionId;
      			//connection.serverUrl = resultObject.serverUrl;
      			this[$connection].isLoggingIn = false;
      			this[$connection].isLoggedIn = true;
    			break;
    			
    		case "describeSObjectsResponse": // describe an array of one or more sobject results
    			resultObject = new Array();
				response = this[$ensureArray](response);
				for (i=0; i<response.length;i++) {
					resultObject.push( new com.salesforce.results.DescribeSObjectResult(response[i]/*as ObjectProxy*/) );
				}
    			break; 
    			
    		case "describeSObjectResponse": // obsolete, use describeSObjects with one element in the array 
    			resultObject = new com.salesforce.results.DescribeSObjectResult(response/*as ObjectProxy*/);
    			break;
    			
    		case "searchResponse":
     			resultObject = new com.salesforce.results.SearchResult(response/*as ObjectProxy*/);
    			break;
    			
    		case "queryMoreResponse":	
       		case "queryAllResponse":
       		case "queryResponse":
    			resultObject = new com.salesforce.results.QueryResult(response/*as ObjectProxy*/);
    			break;
    		
    		case "deleteResponse":
    		case "createResponse":
    		case "updateResponse":
    			resultObject = this[$createSaveResult](response);
    			break; 
    		
    		case "upsertResponse": 
    			resultObject = new Array();
    			response = this[$ensureArray](response); // if we have a single object, make an array of one
				for (i=0;i<response.length;i++) {
					resultObject.push( new com.salesforce.results.UpsertResult(response[i]/*as ObjectProxy*/) );
				} 
    			break;
    			
       		case "retrieveResponse":
    			resultObject = new Array();
				response = this[$ensureArray](response);
				for (i=0;i<response.length;i++) {
					resultObject.push( new com.salesforce.objects.SObject(response[i]/*as ObjectProxy*/) );
				} 
				break;
				
    		case "getServerTimestampResponse":
    			resultObject = new com.salesforce.results.GetServerTimestampResult(response/*as ObjectProxy*/);
    			break;
    		case "getUpdatedResponse":
    			resultObject = new com.salesforce.results.UpdatedResponse(response/*as ObjectProxy*/);
    			break;
			case "getDeletedResponse":
				resultObject = new com.salesforce.results.DeletedResponse(response/*as ObjectProxy*/);
				break;
			case "describeGlobalResponse":
			 	resultObject = response;	// in this case simple is fine
			 	break;
			case "describeLayoutResponse":
				resultObject = new com.salesforce.results.DescribeLayoutResult(response/*as ObjectProxy*/);
				break;
			case "sendEmailResponse":
				resultObject = new com.salesforce.results.SendEmailResult(response/*as ObjectProxy*/);
				break;
			case "describeTabsResponse":
				resultObject = new Array();
				response = this[$ensureArray](response);
				for (i=0;i<response.length;i++) {
					resultObject.push( new com.salesforce.results.DescribeTabSetResult(response[i]/*as ObjectProxy*/) );
				}
				break;
			case "getUserInfoResponse":
				resultObject = new com.salesforce.results.UserInfo(response/*as ObjectProxy*/);
				break;

			case "Fault": 
				var fault/*:Object*/ = new mx.utils.ObjectProxy(result.result.Envelope.Body.Fault);
				try { 					
					resultObject = new com.salesforce.results.Fault(fault/*as ObjectProxy*/);
					com.salesforce.Util.debug(this[$connection], "Saleforce Soap Fault: " + resultObject.faultcode + '\n' + resultObject.faultstring);
				} catch(e/*:**/) { 
					// could not convert rpc fault to salesforce fault, just leave it
					resultObject = fault; 
					com.salesforce.Util.debug(this[$connection], "Other Fault: " + resultObject.toString());
				}
				break;

			default:
				resultObject = response/*as Object*/;
				break;
    	}  
    	
        //resultObject.context = this._context;
        if (responseType == 'Fault') {
        	this[$clientResponder].fault(resultObject);	
        } else {
        	this[$clientResponder].result(resultObject);
        }
  	},
  	
  	// make an object into an array of one element
  	"private function ensureArray",function ensureArray(result/*:Object*/)/*:ArrayCollection*/ {
  		if ( is( result, mx.collections.ArrayCollection) ) {
  			return result/*as ArrayCollection*/; // all is well
  		}
  		var resultArray/*:ArrayCollection*/ = new mx.collections.ArrayCollection();
  		resultArray.addItem( result ); 
  		return resultArray;
  	},
  	
  	"private function createSaveResult",function createSaveResult(result/*:Object*/)/*:Array*/ {
  		var rArray/*:ArrayCollection*/ = new mx.collections.ArrayCollection();
  	
  		if ( is(result, mx.collections.ArrayCollection)) {
			rArray = result/*as ArrayCollection*/;
  		} else {
  			rArray.addItem(result);
  		}
		var resultObject/*:Array*/ = new Array();
		for (var i/*:int*/ =0;i<rArray.length;i++) {
			resultObject[i] = new com.salesforce.results.SaveResult(rArray[i]/*as ObjectProxy*/);
		}
		return resultObject;
  	},
  	
  	"public function fault",function fault(fault/*:Object*/)/*:void*/ {
    	// do logging here
    	this[$clientResponder].fault(fault);
  	},
];},[],["mx.rpc.IResponder","com.salesforce.Util","com.salesforce.results.LoginResult","Array","com.salesforce.results.DescribeSObjectResult","com.salesforce.results.SearchResult","com.salesforce.results.QueryResult","com.salesforce.results.UpsertResult","com.salesforce.objects.SObject","com.salesforce.results.GetServerTimestampResult","com.salesforce.results.UpdatedResponse","com.salesforce.results.DeletedResponse","com.salesforce.results.DescribeLayoutResult","com.salesforce.results.SendEmailResult","com.salesforce.results.DescribeTabSetResult","com.salesforce.results.UserInfo","mx.utils.ObjectProxy","com.salesforce.results.Fault","mx.collections.ArrayCollection","com.salesforce.results.SaveResult"]
);