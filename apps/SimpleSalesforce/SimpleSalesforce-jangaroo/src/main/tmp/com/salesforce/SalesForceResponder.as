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
package com.salesforce
{
import mx.rpc.IResponder;
import mx.utils.ObjectProxy;
import mx.utils.ObjectUtil;
import mx.collections.ArrayCollection;
 
import com.salesforce.salesforce_internal;
import com.salesforce.results.*;
import com.salesforce.objects.*;
import com.salesforce.Util;
import com.salesforce.Connection;
import mx.rpc.Fault;


use namespace salesforce_internal;
/**
* @private
*/
class SalesForceResponder implements IResponder {

 	/**
 	 * This class is used to package up the results from raw xml into sobjects, queryResponses and other 
 	 * Apex specific structures 
 	 * @param connection
 	 * @param clientResponder
 	 * @return 
 	 * 
 	 */ 
 	public function SalesForceResponder(connection:Connection, clientResponder:IResponder) {
    	this.connection = connection;
    	this.clientResponder = clientResponder;
        this._context = clientResponder;
  	}
  
  	private var clientResponder:IResponder;
  	private var connection:Connection;
    private var _context:Object;
  
  	private function getResponseType(result:Object):String {
		var response:ObjectProxy = result.result.Envelope.Body;
		var responseKey:String;
    	for (var key:String in response) {
    		responseKey = key;
    		break;
    	}
    	return responseKey;
  	}
  	
  	private function getResponse(result:Object):Object {
		var response:Object = result.result.Envelope.Body;
    	try { 
	    	for (var key:String in response) {
	    		response = response[key].result;
	    		break;
	    	} 
    	} catch (e:Object) {
    		return null; // when a webservice is set to return void we end up here
    	} 
    	return response;
  	}
  	
  	public function result(result:Object):void {    
    	var resultObject:Object;
    	var response:Object = getResponse(result);
    	var responseType:String = getResponseType(result);
    	var i:int;
    	
    	Util.debug(connection, "responseType: " + responseType);
    	switch (responseType) {
    		case "checkStatusResponse":
    /* TODO createResponse on Meta API
     * TODO this response type is overloaded, needs testing with API and Meta API
     * TODO for now leave the API code active and comment out this one
     */
    //	 	case "createResponse":
    			resultObject = new Array();
    			if (response is ObjectProxy) {
    				resultObject.push(new AsyncResult(response));
    			} else {
    				for (i=0;i<response.length;i++) {
    					resultObject.push(new AsyncResult(response[i]));
    				}
    			}
    			break;
    		case "loginResponse": 
    			connection._loginResult = new LoginResult(result);
    			resultObject = connection.loginResult;
      			connection.sessionId = resultObject.sessionId;
      			connection.serverUrl = resultObject.serverUrl;
      			connection.isLoggingIn = false;
      			connection.isLoggedIn = true;
    			break;
    			
    		case "describeSObjectsResponse": // describe an array of one or more sobject results
    			resultObject = new Array();
				response = ensureArray(response);
				for (i=0; i<response.length;i++) {
					resultObject.push( new DescribeSObjectResult(response[i] as ObjectProxy) );
				}
    			break; 
    			
    		case "describeSObjectResponse": // obsolete, use describeSObjects with one element in the array 
    			resultObject = new DescribeSObjectResult(response as ObjectProxy);
    			break;
    			
    		case "searchResponse":
     			resultObject = new SearchResult(response as ObjectProxy);
    			break;
    			
    		case "queryMoreResponse":	
       		case "queryAllResponse":
       		case "queryResponse":
    			resultObject = new QueryResult(response as ObjectProxy);
    			break;
    		
    		case "deleteResponse":
    		case "createResponse":
    		case "updateResponse":
    			resultObject = createSaveResult(response);
    			break; 
    		
    		case "upsertResponse": 
    			resultObject = new Array();
    			response = ensureArray(response); // if we have a single object, make an array of one
				for (i=0;i<response.length;i++) {
					resultObject.push( new UpsertResult(response[i] as ObjectProxy) );
				} 
    			break;
    			
       		case "retrieveResponse":
    			resultObject = new Array();
				response = ensureArray(response);
				for (i=0;i<response.length;i++) {
					resultObject.push( new SObject(response[i] as ObjectProxy) );
				} 
				break;
				
    		case "getServerTimestampResponse":
    			resultObject = new GetServerTimestampResult(response as ObjectProxy);
    			break;
    		case "getUpdatedResponse":
    			resultObject = new UpdatedResponse(response as ObjectProxy);
    			break;
			case "getDeletedResponse":
				resultObject = new DeletedResponse(response as ObjectProxy);
				break;
			case "describeGlobalResponse":
			 	resultObject = response;	// in this case simple is fine
			 	break;
			case "describeLayoutResponse":
				resultObject = new DescribeLayoutResult(response as ObjectProxy);
				break;
			case "sendEmailResponse":
				resultObject = new SendEmailResult(response as ObjectProxy);
				break;
			case "describeTabsResponse":
				resultObject = new Array();
				response = ensureArray(response);
				for (i=0;i<response.length;i++) {
					resultObject.push( new DescribeTabSetResult(response[i] as ObjectProxy) );
				}
				break;
			case "getUserInfoResponse":
				resultObject = new UserInfo(response as ObjectProxy);
				break;
			case "setPasswordResponse":
				resultObject = new SetPasswordResponse(response as ObjectProxy);
				break;
			case "resetPasswordResponse":
				resultObject = new ResetPasswordResponse(response as ObjectProxy);
				break;

			case "Fault": 
				var fault:Object = new ObjectProxy(result.result.Envelope.Body.Fault);
				try { 					
					resultObject = new com.salesforce.results.Fault(fault as ObjectProxy);
					Util.debug(connection, "Saleforce Soap Fault: " + resultObject.faultcode + '\n' + resultObject.faultstring);
				} catch(e:*) { 
					// could not convert rpc fault to salesforce fault, just leave it
					resultObject = fault; 
					Util.debug(connection, "Other Fault: " + resultObject.toString());
				}
				break;

			default:
				resultObject = response as Object;
				break;
    	}  
    	
        // Make sure the user gave us a callback to work with
        if (clientResponder != null) {
	        if (responseType == 'Fault') {
	        	clientResponder.fault(resultObject);
	        } else {
	        	clientResponder.result(resultObject);
	        }
  		}
  	}
  	
  	// make an object into an array of one element
  	private function ensureArray(result:Object):ArrayCollection {
  		if ( result is ArrayCollection ) {
  			return result as ArrayCollection; // all is well
  		}
  		var resultArray:ArrayCollection = new ArrayCollection();
  		resultArray.addItem( result ); 
  		return resultArray;
  	}
  	
  	private function createSaveResult(result:Object):Array {
  		var rArray:ArrayCollection = new ArrayCollection();
  	
  		if (result is ArrayCollection) {
			rArray = result as ArrayCollection;
  		} else {
  			rArray.addItem(result);
  		}
		var resultObject:Array = new Array();
		for (var i:int=0;i<rArray.length;i++) {
			resultObject[i] = new SaveResult(rArray[i] as ObjectProxy);
		}
		return resultObject;
  	}
  	
  	public function fault(fault:Object):void {
    	// do logging here
    	clientResponder.fault(fault);
  	}
}
}
