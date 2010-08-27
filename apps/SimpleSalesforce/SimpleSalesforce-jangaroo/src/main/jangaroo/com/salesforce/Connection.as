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
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.system.ApplicationDomain;
	import flash.system.Security;
	
	import mx.rpc.IResponder;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	import mx.utils.URLUtil;

	  
	use namespace salesforce_internal;
	/**
	* Event used internaly to collect responses and pass them back to the responder callbacks
	*/	
	[Event(name="sendRequest", type="com.salesforce.events.SendEvent")]
	
	/**
	* Event used to print out the SOAP messages used in the API transport methods
	*/
	[Event(name="debugEvent", type="com.salesforce.events.DebugEvent")]
	
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
	 * @author rhess @ salesforce.com, dcarroll @ saleforce.com, jaward @ adobe.com 
	 */	
	public class Connection extends EventDispatcher	{
	  /**
	  * @private
	  */	  
	  salesforce_internal var sessionId:String = null;
	  /**
	  * @private
	  */	  
	  salesforce_internal var _internalServerUrl:String;
	  /**
	  * @private
	  */	  
	  salesforce_internal var isLoggingIn:Boolean = false;
	  /**
	  * @private
	  */	  
	  salesforce_internal var isLoggedIn:Boolean = false;
	  /**
	  * @private
	  */	  
	  salesforce_internal var _loginResult:LoginResult = null;
	  
	  salesforce_internal var _loginCallback:IResponder = null;
	  /**
	  * @private
	  */	  
	  salesforce_internal var _applicationServerName:String = null;
	  /**
	  * @private
	  */	  
	  salesforce_internal var _applicationUrl:String = null;		// 9.0 or greater
	  /**
	  * @private
	  */
	  salesforce_internal var _applicationDomain:String = null;
	  /**
	  * @private
	  */
	  salesforce_internal var _protocol:String = 'https'; // also possible is http
	  
	  private var updateMru:String = null;
	  private var client:String = null;
	  private var _batchSize:Number;
	  private var organizationId:String = null;
	  private var emailHeader:Object = null;
	  private var assignmentRuleHeader:Object = null;
	  private var transferToUserId:String = null;
	  private var debuggingHeader:Object = null;
	  private var sforceNs:String = "urn:partner.soap.sforce.com";
	  private var sobjectNs:String = "sobject.partner.soap.sforce.com";
	  
	  private static var namespaceMap:Array = [
	    {ns: "urn:partner.soap.sforce.com", prefix: null},
	    {ns: "sobject.partner.soap.sforce.com", prefix: "ns1"}
	    ];
	  /**
	   * Use this method to determine if a connection has or has not been initialized by loginWithCredentials() or loginWithSessionId() via an scontrol
	   * 
	   * @return the session that was set upon login or load, or null if no session has been created, note this 
	   * sessionid will expire 
	   * 
	   */	  
        public function getCurrentSessionid():String {
	  	    return this.sessionId;
	    }

        /**
         * not documented or tested yet
         * @private
         *
         */
	  	public function getFrontDoorUrl():String {
	  		if (!isLoggedIn) {
	  			throw "You must be logged in to use the front door.";
	  		} else {
	  			var url:String = URLUtil.getProtocol(_internalServerUrl) + "://" + URLUtil.getServerName(_internalServerUrl);
	  			return url + "/secur/frontdoor.jsp?sid=" + this.sessionId;
	  		}
	  	} 

        /**
         * used to detect if we are running from inside a SControl on the hosted Apex platform
         * @return True if we are running from a SWF loaded onto Salesforce.com SControl , False if running from a localhost or local filesystem
         *
         */
        public function isSControl(): Boolean {
        	if ( this._applicationDomain == null ) 
        		return false;
            return this._applicationDomain.indexOf("salesforce") > 0;
        }
	  	
	  	/* begin PROPERTIES */
	  	public function get loginResult():LoginResult {
	  		return this._loginResult;
	  	}
	  	/**
	  	 * Host and Domain name parsed from the server url, or localhost
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public function get applicationDomain():String {
	  		return this._applicationDomain;
	  	}
	  	/**
	  	 * Server name parsed from the web services endpoint
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public function get applicationServerName():String {
	  		return this._applicationServerName;
	  	}
	  	/**
	  	 * URL web services endpoint, set in the login process
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public function get applicationUrl():String {
	  		return this._applicationUrl;
	  	}
	  	
		/**
	  	 * protocol to use, can be set to http, defaults to https
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public function get protocol():String {
	  		return this._protocol;
	  	}
		public function set protocol(prot:String):void {
	  		this._protocol = prot;
	  	}
	  	
	  	/**
	  	 * URL web services endpoint, set in the login process, no need to set this directly
	  	 * @param url 
	  	 * 
	  	 */	  	
	  	public function set applicationUrl(url:String):void {
	  		this._applicationUrl = url;
	  		this._applicationServerName = URLUtil.getServerName(url);
	  		var parts:Array = this._applicationServerName.split(".");
	  		if (parts.length === 3) {
	  			this._applicationDomain = parts[1] + "." + parts[2];
	  		} else {
	  			this._applicationDomain = this._applicationServerName;
	  		}
	  	}
		/**
		 * Set in the login process by connection.loginWithCredentials() or loginWithSessionId(()
		 * @param serverUrl normaly provided by the salesforce merge field used in SControls
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/index.htm Apex Developer Doc
		 */	  	
		public function set serverUrl(serverUrl:String):void {
			//Build a new url
			Util.debug(this, "App Domain = " + this._applicationDomain);
			var apiServerName:String = URLUtil.getServerName(serverUrl);
			Util.debug(this, "Api Server name = " + apiServerName);
			
			if (this._applicationDomain == "salesforce.com") {
				serverUrl = serverUrl.replace(apiServerName, this._applicationServerName);
			} 
			if ( this._protocol == 'http' && serverUrl.match("^https.*") ) {
				serverUrl = serverUrl.replace('https', 'http'); // allow specified http 
			}
	    	_internalServerUrl = serverUrl;
	    	Util.debug(this, "_internalServerUrl set to " + _internalServerUrl);

            /* 
             * load the policy file if our sandbox is remote and we are past login (www)
             *  normally happens after login when we are setting the server url for na1,na2,etc.
             */
            if (Security.sandboxType == Security.REMOTE && apiServerName != "www.salesforce.com" ) { 
	            var policyUrl:String = _internalServerUrl;
	            var s:String = "/services/Soap/u/";
	            var i:int = _internalServerUrl.indexOf(s);
	            policyUrl = _internalServerUrl.substr(0, (i + s.length));
	            policyUrl += "cross-domain.xml";
	            
	            Util.debug(this, "loading the policy file: " + policyUrl);
	            Security.loadPolicyFile(policyUrl);
	            
            } else { 
            	Util.debug(this, "set serverUrl: skip the policy file for sandboxType:" + Security.sandboxType + ' and server:' + apiServerName);
            }
	  	}
	  
	  	public function get serverUrl():String {
	    	return _internalServerUrl;
	  	}
	  	/**
	  	 * Change the default size of the batches returned from Query() and QueryMore(), the minimum size is 200, the maximum size is 2000
	  	 * the system will also reserve the right to return other sizes, this is a suggestion.
	  	 * @param num Number
	  	 * 
	  	 */	  	
	  	public function set batchSize(num:Number):void { this._batchSize = num;}

	    /* end PROPERTIES */

        /**
         * Constructor for Connection class, no arguments
         * @return
         *
         */
        public function Connection() {
        }

		/**
		 * Called rather than login if the applicaiton has access to the server and session information provided 
		 * by salesforce. Example is when running from inside an SControl, this may be called, passing the scontrol 
		 * merge fields
		 * 
		 * @param sessionId 
		 * @param serverUrl 
	  	 * @param callback
		 * 
	  	 */	
		public function loginWithSessionId(sessionId:String, serverUrl:String, callback:IResponder=null):void {
			Util.debug(this, "\nloginWithSessionId(\n sid: " + sessionId + "\n surl: " + serverUrl + '\n);' );
			this.applicationUrl = serverUrl;
			
			this.sessionId = sessionId;
		    this.serverUrl = serverUrl; 
	    	this.isLoggedIn = true;
	  	
            if (callback != null) {
            	
            	// Store the client callback so we can use it after we test the sessionId
            	_loginCallback = callback;
            	
                // respond with a callback here in case the user wants one
                // TODO should populate a userInfo object, just like the normal loginWithCredentials() does?!
                
                // Create our internal callback
                var oCallBack:AsyncResponder = new AsyncResponder(_resultGetUserInfo);
                
                // Call the getUserInfo function and pass in our callback
                invoke("getUserInfo", [], false, oCallBack);
            }
	  	}

	  	private function _resultGetUserInfo(userInfo:UserInfo):void
	  	{
	  		// Need to valid the results then build the
	  		// loginresults and return them to the client
	  		
	  		var loginResult:LoginResult = new LoginResult();
	  		loginResult.serverUrl = this.serverUrl;
	  		loginResult.sessionId = this.sessionId;
	  		loginResult.userId = userInfo.userId;
	  		loginResult.userInfo = userInfo;
	  		
	  		// Send the results to the client callback
	  		this._loginCallback.result(loginResult);
	  	}

	  	/**
	  	 * Normal login, used if running from a localhost
	  	 * @param username 
	  	 * @param password 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function loginWithCredentials(username:String, password:String, callback:IResponder):void {
            if (this.serverUrl == null)
            {
                this.serverUrl = "https://www.salesforce.com/services/Soap/u/9.0";
            }
	    	var arg1:Parameter = new Parameter("username", username, false);
			var arg2:Parameter = new Parameter("password", password, false);
	    	this.isLoggingIn = true;
	    	
	    	if (Security.sandboxType == Security.REMOTE ) { 
	    		// for a remote sandbox, pickup the crossdomain file to allow the login call
	    		var policyUrl:String = this._protocol + "://www.salesforce.com/services/crossdomain.xml";
				Util.debug(this, "loading the policy file: " + policyUrl);
	            Security.loadPolicyFile(policyUrl);
	    	} else { 
            	Util.debug(this, "loginWithCredentials: skip the policy file for sandboxType:" + Security.sandboxType);
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
		        	loginWithCredentials(loginRequest.username , loginRequest.password, loginRequest.callback);
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
	    	var arg:Parameter = new Parameter("queryString", queryString, false);
	    	invoke("query", [arg], false, callback);
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
	    	var arg:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("create", [arg], true, callback);
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
	    	var arg:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("update", [arg], true,  callback);
	  	}
	  	/**
	  	 * Delete a list of objects from salesforce.com database, the array contains just the id strings
	  	 * @param ids list of id strings for objects to be delted
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function deleteIds(ids:Array, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("ids", ids, true);
	    	invoke("delete", [arg], true, callback);
	  	}
	  	/**
	  	 * Used to execute Apex Code packages (Apex Code is currently in developer preview)
	  	 *  
	  	 * @param packageName
	  	 * @param method
	  	 * @param args
	  	 * @param callback
	  	 * @param isArray
	  	 * 
	  	 */	
	  	public function execute(packageName:String, method:String, args:Array, callback:IResponder, isArray:Boolean=false):void {
			//sforce.Apex.prototype.execute = function (package, method, args, callback, isArray) {

    		var sobjectNs:String = "http://soap.sforce.com/schemas/package/" + packageName;
    		
    		var nsmap:Array = [{ns:sobjectNs, prefix:""}];

    		if (!args) {
        		throw "args not specified";
    		}

    		var params:Array = [];
    		/*for (var field:String in args) {
        		var value:Object = args[field];
        		var arrayParam:Boolean = value === null ? false : (value is Array ? true : false);
        		var param:Parameter = new Parameter(field, value, arrayParam);
        		params.push(param);
    		}*/
    		for (var i:int = 0;i<args.length;i++) {
    			if (!args[i] is Parameter) {
    				throw "Apex arguments must of type Parameter.";
    			} else {
    				var param:Parameter = args[i] as Parameter;
    				if (param.value is Array) {
    					param.isArray = true;
    				} else {
    					param.isArray = false;
    				}
    				params.push(args[i]);
    			}
    		}

    		var isRealArray:Boolean = true;

    		if (isArray === false) {
        		isRealArray = false;
    		}
   
    		invoke(method, params, isRealArray, callback, nsmap, "/services/Soap/package/" + packageName, sobjectNs, sobjectNs);
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
	    	var arg1:Parameter = new Parameter("fieldList", fieldList, false);
	    	var arg2:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg3:Parameter = new Parameter("ids", ids, true);
	    	invoke("retrieve", [arg1, arg2, arg3], true,  callback);
	  	}
	
		public function getUserInfo(callback:IResponder):void {
	    	invoke("getUserInfo", [], false, callback);
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
	    	var arg1:Parameter = new Parameter("searchString", searchString, false);
	    	invoke("search", [arg1], false, callback);
	  	}
		/**
		 * use describeSObjects instead
		 * @param type
		 * @param callback
		 * 
		 */	
		public function describeSObject(type:String, callback:IResponder):void {
			var arg:Parameter = new Parameter("sObjectType", type, false);
			invoke("describeSObject", [arg], false, callback);
		}
		/**
		 * return the object description in detail for one or more salesforce custom or standard objects
		 *  
		 * @param types array of strings listing the types, ex: ["Account","Task"]
		 * @param callback
		 * 
		 */	
		public function describeSObjects(types:Array, callback:IResponder):void {
			var arg:Parameter = new Parameter("sObjectType", types, true);
			invoke("describeSObjects", [arg], true, callback);
		}
		/**
		 * returns a list of all valid objects (table names) in the salesforce database, used to check that a desired table 
		 * exists in a given database
		 * 
		 * @param callback
		 * 
		 */	
		public function describeGlobal(callback:IResponder):void {
	    	invoke("describeGlobal", [], false, callback);
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
	    	var arg1:Parameter = new Parameter("sObjectType", type, false);
		    if (!recordTypes) {
	       		recordTypes = [];
	    	}
	    	var arg2:Parameter = new Parameter("recordTypeIds", recordTypes, true);
	    	invoke("describeLayout", [arg1, arg2], false, callback);
	  	}
	  	/**
	  	 * responder will be called with a timestamp from the server, used to record when an getUpdated or getDeleted 
	  	 * call was last made, or to syncronize unrelated systems.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function getServerTimestamp(callback:IResponder):void {
	    	invoke("getServerTimestamp", [], false, callback);
	  	}
	
	  	/**
	  	 * callback receives a structure describing all installed AppExchange applications 
	  	 * for the current connection, including a list of object tabs for each application.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function describeTabs(callback:IResponder):void {
	    	invoke("describeTabs", [], true, callback);
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
	    	var arg1:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg2:Parameter = new Parameter("startDate", startDate, false);
	    	var arg3:Parameter = new Parameter("endDate", endDate, false);
	    	invoke("getDeleted", [arg1, arg2, arg3], false, callback);
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
	    	var arg1:Parameter = new Parameter("externalIDFieldName", externalIDFieldName, false);
	    	var arg2:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("upsert", [arg1, arg2], true, callback);
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
	    	var arg1:Parameter = new Parameter("sObjectType", sObjectType, false);
	    	var arg2:Parameter = new Parameter("startDate", startDate, false);
	    	var arg3:Parameter = new Parameter("endDate", endDate, false);
	    	invoke("getUpdated", [arg1, arg2, arg3], false, callback);
	  	}
	 	/**
	 	 * this version of query will include in it's scope the recycle bin as well as the live data
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */		
	 	public function queryAll(queryString:String, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("queryString", queryString, false);
	    	invoke("queryAll", [arg], false, callback);
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
	    	var arg:Parameter = new Parameter("queryLocator", queryLocator, false);
	    	invoke("queryMore", [arg], false, callback);
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
	    	var arg1:Parameter = new Parameter("messages", messgeList, false);
	    	invoke("sendEmail", [arg1], false, callback);
	  	}


	  	/**
	  	 * to be tested
	  	 * @param mergeRequest
	  	 * @param callback
	  	 * 
	  	 */		
	  	public function merge(mergeRequest:MergeRequest, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("request", mergeRequest, true);
	    	invoke("merge", [arg1], true, callback);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param ids
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function undelete(ids:Array, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("ids", ids, true);
	    	invoke("undelete", [arg1], true, callback);
	  	}
		/**
		 * to be tested
		 * @param leadConverts
		 * @param callback
		 * 
		 */
		public function convertLead(leadConverts:Array, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("leadConverts", leadConverts, true);
	    	invoke("convertLead", [arg1], true, callback);
	  	}
		/**
		 * to be tested
		 * @param userId
		 * @param callback
		 * 
		 */			
		public function resetPassword(userId:String, callback:IResponder):void {
	    	throw("not implemented");
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	invoke("resetPassword", [arg1], false, callback);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param userId
	  	 * @param password
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function setPassword(userId:String, password:String, callback:IResponder):void {
	    	throw("not implemented");
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	var arg2:Parameter = new Parameter("password", password, false);
	    	invoke("setPassword", [arg1, arg2], false, callback);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param actions
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function process(actions:Array, callback:IResponder):void {
	    	throw("not implemented");
	    	var arg1:Parameter = new Parameter("actions", actions, true);
	    	invoke("process", [arg1], true, callback);
	  	}

		/* END PUBLIC END PUBLIC end of public methods  */
	  	/**
	  	 * @private
	  	 * 
	  	 * @param writer
	  	 * @param headerNs
	  	 * 
	  	 */			
	  	private function writeHeader(writer:XmlWriter, headerNs:String):void {
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
		/**
		 * @private
		 * @param method
		 * @param args
		 * @param isArray
		 * @param responder
		 * @param nsMap
		 * @param intServerUrl
		 * @param sfNs
		 * @param sobjNs
		 * 
		 */	
		private function invoke(method:String, args:Array, isArray:Boolean, responder:IResponder, nsMap:Array=null, intServerUrl:String=null, sfNs:String=null, sobjNs:String=null):void {		
			// all responses go thru Saleforce Responder class to construct proper objects types
			var sf_responder:SalesForceResponder =  new SalesForceResponder(this, responder);
			if (nsMap == null) {
				nsMap = namespaceMap;
			}
			if (intServerUrl == null) {
                // Util.debug(this, "intServerUrl is null");
				intServerUrl = _internalServerUrl;
			} else {
				var proto:String = URLUtil.getProtocol(_internalServerUrl);
				var server:String = URLUtil.getServerName(_internalServerUrl);
				intServerUrl = proto + "://" + server + intServerUrl;
			}
            // Util.debug(this, "intServerUrl = " + intServerUrl);
			
			if (sfNs == null) {
				sfNs = sforceNs;
			}
			if (sobjNs == null) {
				sobjNs = sobjectNs;
			}
	    	return _invoke(method, args, isArray, sf_responder, nsMap, intServerUrl, sfNs, sobjNs);
	  	}

	
		// TODO refactor to remove isArray, appears that this is not used
		/**
		 * @private
		 * @param method
		 * @param args
		 * @param isArray
		 * @param responder
		 * @param namespaces
		 * @param url
		 * @param headerNs
		 * @param sobjectNs
		 * 
		 */		
		private function _invoke(method:String, args:Array, isArray:Boolean, responder:IResponder, namespaces:Array, url:String, headerNs:String, sobjectNs:String):void {
	    	var writer:XmlWriter = new XmlWriter();
	    	writer.startEnvelope();
	    	writeHeader(writer, headerNs);
	    	writer.startBody();
	    	writer.writeStartElement(method);
	
	    	for (var n:Object in namespaces) {
	      		writer.writeNamespace(namespaces[n].ns, namespaces[n].prefix);
	    	}
	
	    	for (var i:int = 0; i < args.length; i++) {
	      		var arg:Parameter = args[i];
	      		if (arg.value === null) {
	        		throw "arg " + i + " '" + arg.name + "' not specified";
	      		}
	      		if (arg.value is Array) {
	        		for (var j:int = 0; j < arg.value.length; j++) {
	          			var obj:Object = arg.value[j];
	          			if (!obj) {
	            			throw "Array element at " + j + " is null.";
	          			}
	          			writeOne(writer, arg.name, obj, sobjectNs);
	          		}
	      		} else {
	        		writeOne(writer, arg.name, arg.value, sobjectNs);
	      		}
	    	}
	    
	    	writer.writeEndElement(method);
	    	writer.endBody();
	    	writer.endEnvelope();
	   
	    	var transport:Transport = new Transport();
	    	transport.addEventListener(SendEvent.SEND_REQUEST, sendRequestHandler);
	    
            // Util.debug(this, "url = " + url); Util.debug(this, "serverUrl = " + serverUrl);
	    	var trans:String = URLUtil.getProtocol(serverUrl);
	    	var server:String = URLUtil.getServerName(serverUrl);
	    	
	    	var thisUrl:String;
	    	if (url != serverUrl) {
	    		thisUrl = url;
	    	} else {
	    		thisUrl = serverUrl;
	    	}
            
	    	if (isLoggedIn) {
	      		transport.url = thisUrl;
	    	} else {
	      		transport.url = thisUrl;
	    	}
            
            Util.debug(this, "transport.url = " + transport.url);
	    	
	    	transport.send(writer,responder);
	  	}

		/**
		 * @private
		 * @param writer
		 * @param name
		 * @param value
		 * @param sobjectNs
		 * 
		 */
		private function writeOne(writer:XmlWriter, name:String, value:Object, sobjectNs:String):void { 
	    	if (value is SObject || value is SingleEmailMessage || value is LeadConvert)
	    	{
	     		value.toXml(sobjectNs, name, writer);
	    	} else {
	     	 	writer.writeNameValueNode(name, value);
	    	}
	  	}
	  	/**
	  	 * @private
	  	 * @param event
	  	 * 
	  	 */		  
	  	private function sendRequestHandler(event:SendEvent):void {
	  		dispatchEvent(event);
	  	}
	  	/**
	  	 * @private
	  	 * @param event
	  	 * 
	  	 */	  	
	  	private function resultHandler(event:Event):void {
	    	dispatchEvent(event);
	  	}
	  	/**
	  	 * @private
	  	 * @param event
	  	 * 
	  	 */	  
	  	private function faultHandler(event:Event):void {
	    	dispatchEvent(event);
	  	}
	}
}
