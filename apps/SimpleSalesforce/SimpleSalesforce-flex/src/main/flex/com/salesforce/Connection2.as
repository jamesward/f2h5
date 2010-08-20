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
	import com.salesforce.events.*;
	import com.salesforce.objects.*;
	import com.salesforce.results.*;
	
	import flash.system.Security;
	
	import mx.collections.ArrayCollection;
	import mx.rpc.IResponder;
	import mx.utils.ObjectProxy;
	import mx.utils.URLUtil;
	import mx.logging.Log;
	
	  
	use namespace salesforce_internal;
	/**
	* Event used internaly to collect responses and pass them back to the responder callbacks
	*/	
	//[Event(name="sendRequest", type="com.salesforce.events.SendEvent")]
	
	/**
	* Event used to print out the SOAP messages used in the API transport methods
	*/
	//[Event(name="debugEvent", type="com.salesforce.events.DebugEvent")]
	
	/**
	 * Main Salesforce ActionScript Connection object: 
	 * query, create, update and delete Salesforce Database objects from ActionScript Flex2 applications. 
	 * Create one connection object for each salesforce.com orginization that your Flex application will communicate with, 
	 * normally just one connection object is needed.  The connection object can be easily created in your appilcation 
	 * using MXML markup as shown below.  A Connection object can also be created using new Connection(), inside an action script
	 * source file.  In the example below, sendRequest is just for debugging the soap messages, it is not required.
	 * 
	 * @tag Tag text
	 * @example &lt;salesforce:Connection debugEvent="echoToDebugLog(event)"  id="apexConn"
	 *  sendRequest="sendRequestListener(event)"/>
	 * 
	 * 
	 * @see http://www.salesforce.com/us/developer/docs/api/index.htm Apex Developer Doc
	 * 
	 * @author rhess @ salesforce.com, dcarroll @ saleforce.com, jaward @ adobe.com, jdavies @ 360vantage.com
	 */	
	public class Connection2 extends AbsConnection { // implements IConnection	{

		private var _metaConn:MetaConnection;


        /**
         * Constructor for Connection class, no arguments
         * @return
         *
         */
        public function Connection2() {
        }

		public function get metaConnection():MetaConnection {
			var conn:Connection2 = this;
			if (this.isLoggedIn) {
				if (_metaConn == null) {
					_metaConn = new MetaConnection(this);
					//_metaConn.addEventListener(ReceivedEvent.RECEIVED_RESPONSE, function(event:ReceivedEvent):void {
					//	dispatchEvent(event);
					//});
				}
				return _metaConn;
			} else {
				throw("You need to authenticate before accessing the Meta Connection.");
				return null;
			}
		}
		
		/**
		 * Called rather than login if the applicaiton has access to the server and session information provided 
		 * by salesforce. Example is when running from inside an SControl, this may be called, passing the scontrol 
		 * merge fields
		 * 
		 * @private
		 * @param sessionId 
		 * @param serverUrl 
	  	 * @param callback
		 * 
	  	 */	
		salesforce_internal function loginWithSessionId(sessionId:String, serverUrl:String, callback:IResponder=null):void {
			Util.debug(this, "\nloginWithSessionId(\n sid: " + sessionId + "\n surl: " + serverUrl + '\n);' );
			
			this.applicationUrl = serverUrl;
	    		this.sessionId = sessionId;
		    	this.serverUrl = serverUrl; 
	  		
        	// Store the client callback so we can use it after we test the sessionId
        	_loginCallback = callback;
        	
            // Create our internal callback
            //var oCallBack:AsyncResponder = new AsyncResponder(_resultGetUserInfo);
            var oCallBack:SalesForceResponder = new SalesForceResponder(this, new AsyncResponder(_resultGetUserInfo));
            // Call the getUserInfo function and pass in our callback
            invoke("getUserInfo", [], false, oCallBack);
	  		}

	  	/**
		 * @private
		 * @param userInfo
		 * 
		 */
	  	salesforce_internal function _resultGetUserInfo(userInfo:UserInfo):void
	  	{
	  		// If we got here we have a valid sessionId & serverUrl
	  		
	  		// Create a LoginResult to return
	  		var loginResult:LoginResult = new LoginResult();
	  		
	  		loginResult.serverUrl = this.serverUrl;
	  		loginResult.sessionId = this.sessionId;
	  		loginResult.userId = userInfo.userId;
	  		loginResult.userInfo = userInfo;
	  		
	  		// Set the connection properties
	  		this.organizationId = userInfo.organizationId;
	  		this._loginResult = loginResult;
			this.isLoggingIn = false;
			this.isLoggedIn = true;
	  		
	  		// Check to see if we need to send the callback
	  		if (this._loginCallback != null)
	  		{
		  		// Send the results to the client callback
		  		this._loginCallback.result(loginResult);
            }
	  	}

	  	/**
	  	 * This function is used to login with a username and password.  If the Server URL is not set
	  	 * it will be defaulted to https://www.salesforce.com/services/Soap/u/10.0
	  	 * 
	  	 * @private
	  	 * @param username 
	  	 * @param password 
	  	 * @param callback
	  	 * 
	  	 */	
	  	private function loginWithCredentials(username:String, password:String, callback:ISalesforceResponder):void 	
	  	{
            if (this.serverUrl == null) 
            {
				this.serverUrl = this._defaultServerUrl;
            }
	    	var arg1:Parameter = new Parameter("username", username, false);
			var arg2:Parameter = new Parameter("password", password, false);
	    	this.isLoggingIn = true;
	    	
	    	/* get the security (sandbox) settings correct for any flex app not running inside salesforce 
	    	 * hosted frame, ie: scontrol's dont need this.
	    	 * epxect that it may be a salesforce sandbox ( test or tapp0 ), or some other server
	    	 * need to find and load the policy file from saleforce servers which will permit the login call
	    	 */
	    	if (Security.sandboxType == Security.REMOTE ) 
	    	{ 
	    		var sn:String = URLUtil.getServerName(this.serverUrl); // don't assume WWW.salesforce.com
	    		var policyUrl:String = this._protocol + "://" + sn + "/services/crossdomain.xml";
	    		Log.getLogger("com.salesforce.Connection2").debug("loading the policy file: " + policyUrl);
	            Security.loadPolicyFile(policyUrl);
	    	} 
            
	    	invoke("login", [arg1, arg2], false, callback);
	  	}

		/**
		 * unified login request, will perform one of loginWithSessionId, or loginWithCredentials depending on 
		 * the information provided in the request structure 
		 * 
		 * @param loginRequest
		 * 
		 */
		public function login( loginRequest:LoginRequest ) :void {
			try { 

				if ((loginRequest.session_id != null) && (loginRequest.server_url != null )) {
					/* when running from a salesforce server, no need to login, just load the session details */ 
					loginWithSessionId(loginRequest.session_id, loginRequest.server_url, loginRequest.callback);
					
		        } else {
		        	/* localhost or local filesystem, accept user and pass to login*/
		        	if ( loginRequest.username == null || loginRequest.password == null ) {
		        		throw('missing username or password to login request');
		        	}	
		        	if ( loginRequest.username == '' || loginRequest.password == '' ) {
		        		throw('empty username or password to login request');
		        	}
			  		var oCallBack:SalesForceResponder = new SalesForceResponder(this, loginRequest.callback);
		        	loginWithCredentials(loginRequest.username , loginRequest.password, oCallBack);
		        }
		 	} catch(e:*) { 
		 		if (loginRequest.callback != null ) 
		 			loginRequest.callback.fault(e); // should never get here
		 	}
		}	
		
	  	/**
	  	 * Query table or table and related tables using Salesforce SOQL language strings, the responder
	  	 * will return the results asynchronously to the callback functions (response,fault)
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_soql.htm#topic-title Apex SOQL Reference
	  	 * @param queryString
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function query(queryString:String, callback:IResponder):void {
	  		var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("queryString", queryString, false);
	    	invoke("query", [arg], false, oCallBack);
	  	}
	  	/**
	  	 * Create new records in the salesforce database, pass in an array of SObjects, and a responder callback pair of functions
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_create.htm Apex Developer Guide
	  	 * @see com.salesforce.objects.SObject  
	  	 * 
	  	 * @param sobjects array of SObjects
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function create(sobjects:Array, callback:IResponder):void {
	        var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("create", [arg], true, oCallBack);
	  	}
	
	  	/**
	  	 * Update existing records in the salesforce database, the array of sobjects must have a valid ID filled in for
	  	 * each record to be updated
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_update.htm Apex Developer Guide
	  	 * @see com.salesforce.objects.SObject  
	  	 * 
	  	 * 
	  	 * @param sobjects array of SObjects
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function update(sobjects:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("update", [arg], true,  oCallBack);
	  	}
	  	/**
	  	 * Delete a list of objects from salesforce.com database, the array contains just the id strings
	  	 * @param ids list of id strings for objects to be delted
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function deleteIds(ids:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("ids", ids, true);
	    	invoke("delete", [arg], true, oCallBack);
	  	}
	  	
		/*public function remoteFunction1(args:RemoteFunctionRequest):void {
		    if (!args.url) {
		        throw "url not defined";
		    }
		    if (!args.callback) {
		        throw "onSuccess method not defined";
		    }
		
		    if (!args.method) {
		        args.method = "GET";
		    }
		    if (!args.mimeType) {
		        args.mimeType = "text/plain";
		    }
		
		    if (!(args.mimeType == "text/plain" ||
		          args.mimeType == "text/xml")) {
		        throw "Unknown mime type " + args.mimeType;
		    }
		
			
		    var request = new sforce.Transport().newConnection();
		    request.open(args.method, "/services/proxy", args.async);
		
		    if (args.requestHeaders) {
		        for (var k in args.requestHeaders) {
		            request.setRequestHeader(k, args.requestHeaders[k]);
		        }
		    }
		
		    request.setRequestHeader("SalesforceProxy-Endpoint", args.url);
		    request.setRequestHeader("SalesforceProxy-SID", this.sessionId);
		
		    if (args.async) {
		        request.onreadystatechange = _remoteFunctionCallback;
		    }
		
		    if (sforce.debug.trace) {
		        sforce.debug.log("Sending ...");
		    }
		
		    if (args.requestData) {
		        request.send(args.requestData);
		    } else {
		        request.send(null);
		    }
		
		    if (sforce.debug.trace) {
		        sforce.debug.log("Done Sending ...");
		    }
		
		    if (!args.async) {
		        _remoteFunctionCallback();
		    }
		};	  	*/
	  	public function remoteFunction(request:RemoteFunctionRequest):void {
			//sforce.Apex.prototype.execute = function (package, method, args, callback, isArray) {

			var oCallBack:SalesForceResponder = new SalesForceResponder(this, request.callback);

    		var args:ArrayCollection = new ArrayCollection();
			
			args.addItem(new Parameter("url", request.url));
			args.addItem(new Parameter("method", request.method));
			args.addItem(new Parameter("mimeType", request.mimeType));
			args.addItem(new Parameter("requestHeaders", request.requestHeaders));
			args.addItem(new Parameter("requestData", request.requestData));
			args.addItem(new Parameter("cache", request.cache));
			
			var endpoint:String = "/services/proxy";
    		var params:Array = [];
			toString()
    		for (var i:int = 0;i<args.length;i++) {
    			if (args[i] is Parameter) {
    				
    				Log.getLogger("com.salesforce.Connection2").debug("argument is a parameter type");
    				var param:Parameter = args[i] as Parameter;
    				if (param.value is Array) {
    					param.isArray = true;
    				} else {
    					param.isArray = false;
    				}
    				params.push(args[i]);
    			} else {
    				Log.getLogger("com.salesforce.Connection2").debug("argument is NOT a parameter type");
    				throw "Apex arguments must of type Parameter.";
    			}
    		}

    		invoke("remoteFunction", params, false, oCallBack, null, endpoint, sobjectNs, sobjectNs, { url:request.url, sid:this.getCurrentSessionid() });
		}
	  	
	  	/**
	  	 * Used to execute Apex Code packages (Apex Code is currently in developer preview)
	  	 *  
	  	 * @param packageName
	  	 * @param method
	  	 * @param args - needs to be an array of Parameter objects
	  	 * @param callback
	  	 * @param isArray
	  	 * 
	  	 */	
	  	public function execute(packageName:String, method:String, args:Array, callback:IResponder, apexNamespace:String = null, isArray:Boolean=false):void {
			//sforce.Apex.prototype.execute = function (package, method, args, callback, isArray) {

			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
   			var endpoint:String = "/services/Soap/class/";
   			var sobjectNs:String = "http://soap.sforce.com/schemas/class/";
   			
   			if (apexNamespace != null) {
   				endpoint += apexNamespace + "/";
   				sobjectNs += apexNamespace + "/";
   			}
   			endpoint += packageName;
   			sobjectNs += packageName;
   			
    		//var sobjectNs:String = "http://soap.sforce.com/schemas/class/<namespace>/<className>" 
    		//var endpoint:String = "/services/Soap/class/<namespace>/<className>"
    		
    		var nsmap:Array = [{ns:sobjectNs, prefix:""}];
toString()
    		if (!args) {
        		throw "args not specified";
    		}

    		var params:Array = [];

    		for (var i:int = 0;i<args.length;i++) {
    			if (args[i] is Parameter) {
    				Log.getLogger("com.salesforce.Connection2").debug("argument is a parameter type");
    				var param:Parameter = args[i] as Parameter;
    				if (param.value is Array) {
    					param.isArray = true;
    				} else {
    					param.isArray = false;
    				}
    				params.push(args[i]);
    			} else {
    				Log.getLogger("com.salesforce.Connection2").debug("argument is NOT a parameter type");
    				throw "Apex arguments must of type Parameter.";
    			}
    		}

    		var isRealArray:Boolean = true;

    		if (isArray === false) {
        		isRealArray = false;
    		}
   			
    		invoke(method, params, isRealArray, oCallBack, nsmap, endpoint, sobjectNs, sobjectNs);
		}
		/**
		 * Retrieve a list of sobjects given an array of object ids
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_retrieve.htm Apex Developer Doc
		 * @param fieldList string which lists the api names for fields to return to the responder
		 * @param sObjectType name of the object in the database
		 * @param ids list of object ids (strings)
		 * @param callback
		 * 
		 */		
		public function retrieve(fieldList:String, sObjectType:String, ids:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("fieldList", fieldList, false);
	    	var arg2:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg3:Parameter = new Parameter("ids", ids, true);
	    	invoke("retrieve", [arg1, arg2, arg3], true,  oCallBack);
	  	}
	
	  	/**
	  	 * Retrieves personal information for the user associated with the current session.
	  	 * 
	  	 * @param callbacktoString()
	  	 */
		public function getUserInfo(callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	invoke("getUserInfo", [], false, oCallBack);
	  	}
	  	/**
	  	 * search for objects in one or more tables within the salesforce database
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_search.htm Apex Developer Doc
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_sosl.htm#topic-title SOSL Search Language
	  	 * @param searchString
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function search(searchString:String, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("searchString", searchString, false);
	    	invoke("search", [arg1], false, oCallBack);
	  	}
		/**
		 * use describeSObjects instead
		 * @param type
		 * @param callback
		 * 
		 */	
		public function describeSObject(type:String, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
			var arg:Parameter = new Parameter("sObjectType", type, false);
			invoke("describeSObject", [arg], false, oCallBack);
		}
		/**
		 * return the object description in detail for one or more salesforce custom or standard objects
		 *  
		 * @param types array of strings listing the types, ex: ["Account","Task"]
		 * @param callback
		 * 
		 */	
		public function describeSObjects(types:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
			var arg:Parameter = new Parameter("sObjectType", types, true);
			invoke("describeSObjects", [arg], true, oCallBack);
		}
		/**
		 * returns a list of all valid objects (table names) in the salesforce database, used to check that a desired table 
		 * exists in a given database
		 * 
		 * @param callback
		 * 
		 */	
		public function describeGlobal(callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	invoke("describeGlobal", [], false, oCallBack);
	  	}

		/**
		 * callback receives a complex data class
		 * desribing the meta-data used to layout a page for view or edit, you may specify an 
		 * array of record type IDs to limit the amount of data returned if your object has many fields or record types.
		 * 
		 * @param type
		 * @param recordTypes
		 * @param callback
		 * 
		 */
		public function describeLayout(type:String, recordTypes:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("sObjectType", type, false);
		    if (!recordTypes) {
	       		recordTypes = [];
	    	}
	    	var arg2:Parameter = new Parameter("recordTypeIds", recordTypes, true);
	    	invoke("describeLayout", [arg1, arg2], false, oCallBack);
	  	}
	  	/**
	  	 * Retrieves the current system timestamp
	  	 * (Greenwich Mean Time (GMT) or Coordinated Universal Time (UTC) time zone) from the API.
	  	 * 
	  	 * responder will be called with a timestamp from the server, used to record when an getUpdated or getDeleted 
	  	 * call was last made, or to syncronize unrelated systems.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function getServerTimestamp(callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	invoke("getServerTimestamp", [], false, oCallBack);
	  	}
	
	  	/**
	  	 * callback receives a structure describing all installed AppExchange applications 
	  	 * for the current connection, including a list of object tabs for each application.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function describeTabs(callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	invoke("describeTabs", [], true, oCallBack);
	  	}
	  	/**
	  	 * given a time range, returns a list of records ( of any type) that were deleted in that time 
	  	 * window, resulting IDs can be passed into undelete, or used to purge remote systems of records 
	  	 * that are deleted in the salesforce system
	  	 * 
	  	 * @param sObjectType
	  	 * @param startDate
	  	 * @param endDate
	  	 * @param callback
	  	 * 
	  	 */		
	  	public function getDeleted(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg2:Parameter = new Parameter("startDate", startDate, false);
	    	var arg3:Parameter = new Parameter("endDate", endDate, false);
	    	invoke("getDeleted", [arg1, arg2, arg3], false, oCallBack);
	  	}
	  	/**
	  	 * utility function that will perform a create or update depending on the presence of an existing record
	  	 * that matches the provided external key field 
	  	 * @param externalIDFieldName external field, if no matching record found, new record is created otherwise performs an update
	  	 * @param sobjects list of objects to update or create
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function upsert(externalIDFieldName:String, sobjects:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("externalIDFieldName", externalIDFieldName, false);
	    	var arg2:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("upsert", [arg1, arg2], true, oCallBack);
	  	}
		/**
		 * list the objects that have been updated by the system in the time windows passed in
		 * @see com.salesforce.results.UpdatedResponse
		 * 
		 * @param sObjectType
		 * @param startDate
		 * @param endDate
		 * @param callback
		 * 
		 */
		public function getUpdated(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg2:Parameter = new Parameter("startDate", startDate, false);
	    	var arg3:Parameter = new Parameter("endDate", endDate, false);
	    	invoke("getUpdated", [arg1, arg2, arg3], false, oCallBack);
	  	}
	 	/**
	 	 * this version of query will include in it's scope the recycle bin as well as the live data
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */		
	 	public function queryAll(queryString:String, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("queryString", queryString, false);
	    	invoke("queryAll", [arg], false, oCallBack);
	  	}
	 	/**
	 	 * looping portion of the query() queryMore() method for accessing large data sets
	 	 * @see com.salesforce.QueryResultIterator
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */			
	  	public function queryMore(queryLocator:Object, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("queryLocator", queryLocator, false);
	    	invoke("queryMore", [arg], false, oCallBack);
	  	}
	

	  	// new call for 9.0 -- sendEmail
	  	/**
	  	 * send an email or mass email from the system
	  	 * 
	  	 * @see com.objects.SingleEmailMessage
	  	 * 
	  	 * @param messgeList
	  	 * @param callback
	  	 * 
	  	 */	  	
	  	public function sendEmail(messgeList:Array,callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("messages", messgeList, false);
	    	invoke("sendEmail", [arg1], false, oCallBack);
	  	}


	  	/**
	  	 * to be tested
	  	 * @param mergeRequest
	  	 * @param callback
	  	 * 
	  	 */		
	  	public function merge(mergeRequest:MergeRequest, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("request", mergeRequest, true);
	    	invoke("merge", [arg1], true, oCallBack);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param ids
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function undelete(ids:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("ids", ids, true);
	    	invoke("undelete", [arg1], true, oCallBack);
	  	}
		/**
		 * to be tested
		 * @param leadConverts
		 * @param callback
		 * 
		 */
		public function convertLead(leadConverts:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("leadConverts", leadConverts, true);
	    	invoke("convertLead", [arg1], true, oCallBack);
	  	}
		/**
		 * Changes a user’s password to a temporary, system-generated value.
		 * @param userId
		 * @param callback
		 * 
		 */			
		public function resetPassword(userId:String, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	invoke("resetPassword", [arg1], false, oCallBack);
	  	}
	  	/**
	  	 * Sets the specified user’s password to the specified value.
	  	 * @param userId
	  	 * @param password
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function setPassword(userId:String, password:String, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	var arg2:Parameter = new Parameter("password", password, false);
	    	invoke("setPassword", [arg1, arg2], false, oCallBack);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param actions
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function process(actions:Array, callback:IResponder):void {
			var oCallBack:SalesForceResponder = new SalesForceResponder(this, callback);
	    	//throw("not implemented");
	    	var arg1:Parameter = new Parameter("actions", actions, true);
	    	invoke("process", [arg1], true, oCallBack);
	  	}

	  	/**
	  	 * @private
	  	 * 
	  	 * @param writer
	  	 * @param headerNs
	  	 * 
	  	 */			
	  	override public function writeHeader(writer:XmlWriter, headerNs:String):void {
	    	writer.startHeader();
	
	    	writer.writeNamespace(headerNs, "sfns");
	
	    	if (sessionId !== null) {
	        	writer.writeStartElement("SessionHeader", headerNs);
	        	writer.writeNameValueNode("sessionId", sessionId);
	        	writer.writeEndElement("SessionHeader", headerNs);
	    	}
	    
	    	if (organizationId !== null) {
	        	writer.writeStartElement("LoginScopeHeader", headerNs);
	        	writer.writeNameValueNode("organizationId", organizationId);
	        	writer.writeEndElement("LoginScopeHeader", headerNs);
	    	}
	    
	    	if (client !== null) {
	        	writer.writeStartElement("CallOptions", headerNs);
	        	writer.writeNameValueNode("client", client);
	        	writer.writeEndElement("CallOptions", headerNs);
	    	}
	    
	    	if (!(isNaN(_batchSize))) {
	        	writer.writeStartElement("QueryOptions", headerNs);
	        	writer.writeNameValueNode("batchSize", _batchSize);
	        	writer.writeEndElement("QueryOptions", headerNs);
	    	}
	    
	    	if (updateMru !== null) {
	        	writer.writeStartElement("MruHeader", headerNs);
	        	writer.writeNameValueNode("updateMru", updateMru);
	        	writer.writeEndElement("MruHeader", headerNs);
	    	}
	    
	    	if (emailHeader !== null) {
	      		writer.writeStartElement("EmailHeader", headerNs);
	      		if (emailHeader.triggerAutoResponseEmail) {
	        		writer.writeNameValueNode("triggerAutoResponseEmail", emailHeader.triggerAutoResponseEmail);
	      		}
	      		if (emailHeader.triggerOtherEmail) {
	        		writer.writeNameValueNode("triggerOtherEmail", emailHeader.triggerOtherEmail);
	      		}
	      		if (emailHeader.triggerUserEmail) {
	        		writer.writeNameValueNode("triggerUserEmail", emailHeader.triggerUserEmail);
	      		}
	      		writer.writeEndElement("EmailHeader", headerNs);
	    	}
	    
	    	if (assignmentRuleHeader !== null) {
	      		writer.writeStartElement("AssignmentRuleHeader", headerNs);
	      		if (assignmentRuleHeader.assignmentRuleId) {
	        		writer.writeNameValueNode("assignmentRuleId", assignmentRuleHeader.assignmentRuleId);
	      		}
	      
	      		if (assignmentRuleHeader.useDefaultRule) {
	        		writer.writeNameValueNode("useDefaultRule", assignmentRuleHeader.useDefaultRule);
	      		}
	      		writer.writeEndElement("AssignmentRuleHeader", headerNs);
	    	}
	    
	    	if (transferToUserId !== null) {
	      		writer.writeStartElement("UserTerritoryDeleteHeader", headerNs);
	      		writer.writeNameValueNode("transferToUserId", transferToUserId);
	      		writer.writeEndElement("UserTerritoryDeleteHeader", headerNs);
	    	}
	
			if (debuggingHeader !== null) {
	      		writer.writeStartElement("DebuggingHeader", headerNs);
	      		writer.writeNameValueNode("debugLevel", debuggingHeader.debugLevel);
	      		writer.writeEndElement("DebuggingHeader", headerNs);
	    	}
	
	    	writer.endHeader();
	  	}
	}
}

import mx.rpc.IResponder;
import mx.utils.ObjectProxy;
import mx.utils.ObjectUtil;
import mx.collections.ArrayCollection;
 
import com.salesforce.salesforce_internal;
import com.salesforce.results.*;
import com.salesforce.objects.*;
import com.salesforce.Util;
import com.salesforce.Connection2;
import mx.rpc.Fault;
import com.salesforce.AbsSalesforceResponder;
import mx.rpc.events.ResultEvent;


use namespace salesforce_internal;
/**
* @private
*/
class SalesForceResponder extends AbsSalesforceResponder {

 	/**
 	 * This class is used to package up the results from raw xml into sobjects, queryResponses and other 
 	 * Apex specific structures 
 	 * @param connection
 	 * @param clientResponder
 	 * @return 
 	 * 
 	 */ 
 	public function SalesForceResponder(connection:Connection2, clientResponder:IResponder) {
 		super(connection, clientResponder);
  	}
  
  	override public function result(result:Object):void {  
  		super.result(result);  
    	var resultObject:Object;
    	var response:Object = getResponse(result);
    	var responseType:String = getResponseType(result);
    	var i:int;
    	
    	
    	Util.debug(connection, "responseType: " + responseType);
    	switch (responseType) {
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
			case "remoteFunctionResponse":
				var re:ResultEvent = result as ResultEvent;
				resultObject = response as Object;
				resultObject.xml = re.message.body;
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
  	
  	override public function fault(fault:Object):void {
    	// do logging here
    	clientResponder.fault(fault);
  	}
}
