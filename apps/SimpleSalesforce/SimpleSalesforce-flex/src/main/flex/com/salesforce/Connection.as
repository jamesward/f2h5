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
	import flash.system.Security;
	import flash.utils.ByteArray;
	
	import mx.logging.ILogger;
	import mx.logging.Log;
	import mx.rpc.IResponder;
	import mx.utils.ObjectProxy;
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
	 * @author rhess @ salesforce.com, dcarroll @ saleforce.com, jaward @ adobe.com, jdavies @ 360vantage.com
	 */	
	public class Connection extends EventDispatcher	implements IGeneralConnection{
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
	  
	  public function get IsLoggedIn():Boolean { return isLoggedIn;}
	  
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
	  
	  public static var PROTOCOL_HTTP:String = "http";
	  
	  private var updateMru:String;
	  private var _client:String;
	  private var _batchSize:Number;
	  private var _organizationId:String; //TG 11-26-2008 - Added the underscore and accessor functions below
	  private var _portalId:String //TG 11-26-2008 - Added portalId so we can log in portal users
	  private var emailHeader:Object;
	  private var assignmentRuleHeader:Object;
	  private var transferToUserId:String;
	  private var debuggingHeader:Object;
	  private var sforceNs:String = "urn:partner.soap.sforce.com";
	  private var sobjectNs:String = "sobject.partner.soap.sforce.com";
	  private var metadataNs:String = "http://soap.sforce.com/2006/04/metadata";
	  salesforce_internal var _defaultServerUrl:String = "https://www.salesforce.com/services/Soap/u/15.0"; // default endpoint to this
	  private var logger:ILogger;
       
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
	  	 * protocol to use, can be set to http, defaults to https
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public function get protocol():String {
	  		return this._protocol;
	  	}

		public function set protocol(value:String):void { 
	  		this._protocol = value;
	  		/* if protocol is set after serverUrl is set, we need to fix the serverUrl to match 
	  		 * the specified protocol.  Normally this is only used when running the flex 
	  		 * app on a webserver that is not hosted on https (like localhost)
	  		 */
	  		if ( this._protocol == 'http' && _internalServerUrl && _internalServerUrl.match("^https.*") ) {
				serverUrl = serverUrl.replace('https', 'http'); 
				
			}
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
			logger.debug("App Domain = " + this._applicationDomain);
			var apiServerName:String = URLUtil.getServerName(serverUrl);
			logger.debug("Api Server name = " + apiServerName);
			
			if (this._applicationDomain == "salesforce.com") {
				serverUrl = serverUrl.replace(apiServerName, this._applicationServerName);
			}
			 
			if ( this._protocol == 'http' && serverUrl.match("^https.*") ) {
				serverUrl = serverUrl.replace('https', 'http'); // allow specified http 
			}
			
	    _internalServerUrl = serverUrl;
	    
	    logger.debug('_internalServerUrl = ' + _internalServerUrl);
	    
	    //logger.debug("_internalServerUrl set to " + _internalServerUrl);

      /* 
       * load the policy file if our sandbox is remote and we are past login (www)
       *  normally happens after login when we are setting the server url for na1,na2,etc.
       */
      
      if (Security.sandboxType == Security.REMOTE
      	&& apiServerName != "www.salesforce.com" 
      	&& apiServerName != "test.salesforce.com" ) { 
          var policyUrl:String = _internalServerUrl;
          
          var s:String = "/services/Soap/";
          var i:int = _internalServerUrl.indexOf(s);
          policyUrl = _internalServerUrl.substr(0, (i + s.length));
          policyUrl += "cross-domain.xml";

          loadPolicyFile(policyUrl);
          
          
      }
      else { 
        logger.debug("set serverUrl: skip the policy file for sandboxType:" + Security.sandboxType + ' and server:' + apiServerName);
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
  	public function set batchSize(num:Number):void {
  	  this._batchSize = num;
  	}
  	
  	//TG 11-26-2008
  	/**
  	 * Explicitly set the Organization ID to allow portal users to log in
  	 * @param value String
  	 */
  	public function set organizationId(value:String):void
 	{
 		_organizationId = value;	
 	}
  	
  	//TG 11-26-2008
  	/**
  	 * get the organization ID
  	 */
 	public function get organizationId():String
 	{
 		return _organizationId;	
 	}
  	
  	//TG 11-26-2008
  	/**
  	 * Explicitly set the Portal ID to allow portal users to log in
  	 * @param value String
  	 */
  	public function set portalId(value:String):void
  	{
  		_portalId = value;	
  	}
  	
  	//TG 11-26-2008
  	/**
  	 * get the portal ID
  	 */
  	public function get portalId():String
  	{
  		return _portalId;	
  	}
  	
  	/**
  	 * Sets the API token to be used for this session.
  	 * @param value String
  	 */
  	public function set client(value:String):void {
  		_client = value;
  	}

    /* end PROPERTIES */

    /**
     * Constructor for Connection class, no arguments
     * @return
     *
     */
    public function Connection() {
      logger = Log.getLogger("com.salesforce.Connection");
    }
    
    /*
     * Flash Player will not load the crossdomain file from an https server if the application is not also running on an https server
     */
    private function loadPolicyFile(url:String):void
  	{
  	  logger.debug("loading the policy file: " + url);
  	  if (protocol == "https")
  	  {
  	    logger.info("Your application must be running on a https server in order to use https to communicate with salesforce.com!");
  	  }
      Security.loadPolicyFile(url);
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
		private function loginWithSessionId(sessionId:String, serverUrl:String, callback:IResponder=null):void {
			logger.debug("\nloginWithSessionId(\n sid: " + sessionId + "\n surl: " + serverUrl + '\n);' );
			
			this.applicationUrl = serverUrl;
	    	this.sessionId = sessionId;
		  	this.serverUrl = serverUrl; 
	  		
      // Store the client callback so we can use it after we test the sessionId
      _loginCallback = callback;
        	
			// Create our internal callback
			var oCallBack:AsyncResponder = new AsyncResponder(_resultGetUserInfo, callback.fault );
			            
			// Call the getUserInfo function and pass in our callback
			invoke("getUserInfo", [], oCallBack);
		}

	  	/**
		 * @private
		 * @param userInfo
		 * 
		 */
	  	private function _resultGetUserInfo(userInfo:UserInfo):void
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
	  	private function loginWithCredentials(username:String, password:String, callback:IResponder):void 	
	  	{
        logger.debug('login with creds');
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
	    		loadPolicyFile(policyUrl);
	    	} 
            
	    	invoke("login", [arg1, arg2], callback);
	  	}

		/**
		 * unified login request, will perform one of loginWithSessionId, or loginWithCredentials depending on 
		 * the information provided in the request structure 
		 * 
		 * @param loginRequest
		 * 
		 */
		 //TG: The encryptionKey isn't used here, but it is used in the AIRConnection override
		 //    of this method, and the parameter list has to match
		public function login( loginRequest:LoginRequest, encryptionKey:ByteArray=null ) :void {
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
		
		//not used in Connection.as, but overridden in AIRConnection
		public function flush(deleteTable:String):void
		{
			
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
	  	 //TG: Added queryLocal. It's not used here, but it is used in the AIRConnection override of this
	  	 //    method.
	  	public function query(queryString:String, callback:IResponder, queryLocal:Boolean = false, passThrough:Object=null, flush:Boolean=false):void {
	    	var arg:Parameter = new Parameter("queryString", queryString, false);
	    	invoke("query", [arg], callback);
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
	  	 //TG: queryAfterCreate is used by AIRConnection
	  	public function create(sobjects:Array, callback:IResponder, queryAfterCreate:Boolean=false):void {
	    	var arg:Parameter = new Parameter("sObjects", sobjects, true);
	    	invoke("create", [arg], callback);
	  	}
	
		private function getMetadataUrl():String {
	    	var tempUrl:String = URLUtil.getProtocol(serverUrl) + "//" + URLUtil.getServerName(serverUrl);
	    	return serverUrl.substr(tempUrl.length + 1).replace("/u", "/m");
		}
		
		public function createObject(customObjects:Array, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	var tempUrl:String = URLUtil.getProtocol(serverUrl) + "//" + URLUtil.getServerName(serverUrl);
	    	tempUrl = serverUrl.substr(tempUrl.length + 1).replace("/u", "/m");
	    	invoke("create", [arg], callback, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}
		
		public function updateObject(customObjects:Array, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	invoke("update", [arg], callback, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		public function deleteObject(customObjects:Array, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	invoke("delete", [arg], callback, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		public function checkStatus(requestIds:Array, callback:IResponder):void {
			var arg:Parameter = new Parameter("asyncProcessId", requestIds, true);
			invoke("checkStatus", [arg], callback, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
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
	    	invoke("update", [arg], callback);
	  	}
	  	/**
	  	 * Delete a list of objects from salesforce.com database, the array contains just the id strings
	  	 * @param ids list of id strings for objects to be delted
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function deleteIds(ids:Array, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("ids", ids, true);
	    	invoke("delete", [arg], callback);
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

   			var endpoint:String = "/services/Soap/class/";
   			var sobjectNs:String = "http://soap.sforce.com/schemas/class/";
   			
   			if (apexNamespace != null && apexNamespace != "") {
   				endpoint += apexNamespace + "/";
   				sobjectNs += apexNamespace + "/";
   			}
   			endpoint += packageName;
   			sobjectNs += packageName;
   			
   			// logger.debug(endpoint); 		logger.debug(sobjectNs);
    		//var sobjectNs:String = "http://soap.sforce.com/schemas/class/<namespace>/<className>" 
    		//var endpoint:String = "/services/Soap/class/<namespace>/<className>"
    		
    		var nsmap:Array = [{ns:sobjectNs, prefix:""}];

    		if (!args) {
        		throw "args not specified";
    		}

    		var params:Array = [];

    		for (var i:int = 0;i<args.length;i++) {
    			if (args[i] is Parameter) {
    				logger.debug("argument is a parameter type");
    				var param:Parameter = args[i] as Parameter;
    				if (param.value is Array) {
    					param.isArray = true;
    				} else {
    					param.isArray = false;
    				}
    				params.push(args[i]);
    			} else {
    				logger.debug("argument is NOT a parameter type");
    				throw "Apex arguments must be Array of type Parameter.";
    			}
    		}
   			
    		invoke(method, params, callback, nsmap, endpoint, sobjectNs, sobjectNs);
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
	    	invoke("retrieve", [arg1, arg2, arg3], callback);
	  	}
	
	  	/**
	  	 * Retrieves personal information for the user associated with the current session.
	  	 * 
	  	 * @param callback
	  	 */
		public function getUserInfo(callback:IResponder):void {
	    	invoke("getUserInfo", [], callback);
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
	    	invoke("search", [arg1], callback);
	  	}
		/**
		 * use describeSObjects instead
		 * @param type
		 * @param callback
		 * 
		 */	
		public function describeSObject(type:String, callback:IResponder):void {
			var arg:Parameter = new Parameter("sObjectType", type, false);
			invoke("describeSObject", [arg], callback);
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
			invoke("describeSObjects", [arg], callback);
		}
		/**
		 * returns a list of all valid objects (table names) in the salesforce database, used to check that a desired table 
		 * exists in a given database
		 * 
		 * @param callback
		 * 
		 */	
		public function describeGlobal(callback:IResponder):void {
	    	invoke("describeGlobal", [], callback);
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
	    	invoke("describeLayout", [arg1, arg2], callback);
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
	    	invoke("getServerTimestamp", [], callback);
	  	}
	
	  	/**
	  	 * callback receives a structure describing all installed AppExchange applications 
	  	 * for the current connection, including a list of object tabs for each application.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function describeTabs(callback:IResponder):void {
	    	invoke("describeTabs", [], callback);
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
	    	invoke("getDeleted", [arg1, arg2, arg3], callback);
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
	    	invoke("upsert", [arg1, arg2], callback);
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
	    	invoke("getUpdated", [arg1, arg2, arg3], callback);
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
	    	invoke("queryAll", [arg], callback);
	  	}
	 	/**
	 	 * looping portion of the query() queryMore() method for accessing large data sets
	 	 * @see com.salesforce.QueryResultIterator
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */			
	  	public function queryMore(queryLocator:Object, callback:IResponder,passThrough:Object=null,cacheThisQuery:Boolean = false):void {
	    	var arg:Parameter = new Parameter("queryLocator", queryLocator, false);
	    	invoke("queryMore", [arg], callback);
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
	    	invoke("sendEmail", [arg1], callback);
	  	}


	  	/**
	  	 * to be tested
	  	 * @param mergeRequest
	  	 * @param callback
	  	 * 
	  	 */		
	  	public function merge(mergeRequest:MergeRequest, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("request", mergeRequest, true);
	    	invoke("merge", [arg1], callback);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param ids
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function undelete(ids:Array, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("ids", ids, true);
	    	invoke("undelete", [arg1], callback);
	  	}
		/**
		 * to be tested
		 * @param leadConverts
		 * @param callback
		 * 
		 */
		public function convertLead(leadConverts:Array, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("leadConverts", leadConverts, true);
	    	invoke("convertLead", [arg1], callback);
	  	}
		/**
		 * Changes a user’s password to a temporary, system-generated value.
		 * @param userId
		 * @param callback
		 * 
		 */			
		public function resetPassword(userId:String, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	invoke("resetPassword", [arg1], callback);
	  	}
	  	/**
	  	 * Sets the specified user’s password to the specified value.
	  	 * @param userId
	  	 * @param password
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function setPassword(userId:String, password:String, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("userId", userId, false);
	    	var arg2:Parameter = new Parameter("password", password, false);
	    	invoke("setPassword", [arg1, arg2], callback);
	  	}
	  	/**
	  	 * to be tested
	  	 * @param actions
	  	 * @param callback
	  	 * 
	  	 */	
	  	public function process(actions:Array, callback:IResponder):void {
	    	var arg1:Parameter = new Parameter("actions", actions, true);
	    	invoke("process", [arg1], callback);
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
	    
	    	//TG Modified 11-26-2008 to include portalId in the LoginScopeHeader
	    	if (organizationId !== null || portalId !== null) 
	    	{
	        	writer.writeStartElement("LoginScopeHeader", headerNs);
	        	if (organizationId !== null)
	        		writer.writeNameValueNode("organizationId", organizationId);
	        	if (portalId !== null)
	        		writer.writeNameValueNode("portalId", portalId);	
	        	writer.writeEndElement("LoginScopeHeader", headerNs);
	    	}
	    		    
	    	if (_client !== null) {
	        	writer.writeStartElement("CallOptions", headerNs);
	        	writer.writeNameValueNode("client", _client);
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
		 * @param responder
		 * @param nsMap
		 * @param intServerUrl
		 * @param sfNs
		 * @param sobjNs
		 * 
		 */	
		private function invoke(method:String, args:Array, responder:IResponder, nsMap:Array=null, intServerUrl:String=null, sfNs:String=null, sobjNs:String=null):void {		
			// all responses go thru Saleforce Responder class to construct proper objects types
			logger.debug("invoke " + method);
			
			var sf_responder:SalesForceResponder =  new SalesForceResponder(this, responder);
			if (nsMap == null) {
				nsMap = namespaceMap;
			}
			if (intServerUrl == null) {
        logger.debug("intServerUrl is null");
				intServerUrl = _internalServerUrl;
			} else {
				var proto:String = URLUtil.getProtocol(_internalServerUrl);
				var server:String = URLUtil.getServerName(_internalServerUrl);
				intServerUrl = proto + "://" + server + intServerUrl;
			}
			
      logger.debug("intServerUrl = " + intServerUrl);
			
			if (sfNs == null) {
				sfNs = sforceNs;
			}
			if (sobjNs == null) {
				sobjNs = sobjectNs;
			}
			
	    return _invoke(method, args, sf_responder, nsMap, intServerUrl, sfNs, sobjNs);
    }


		/**
		 * @private
		 * @param method
		 * @param args
		 * @param responder
		 * @param namespaces
		 * @param url
		 * @param headerNs
		 * @param sobjectNs
		 * 
		 */		
		private function _invoke(method:String, args:Array, responder:IResponder, namespaces:Array, url:String, headerNs:String, sobjectNs:String):void {
		    logger.debug("_invoke " + method);
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
	      		writeArg(writer, arg.value, arg.name, sobjectNs);
	    	}
	    
	    	writer.writeEndElement(method);
	    	writer.endBody();
	    	writer.endEnvelope();
	   
	    	var transport:Transport = new Transport();
	    	transport.addEventListener(SendEvent.SEND_REQUEST, sendRequestHandler);
	    
            // logger.debug("url = " + url); logger.debug("serverUrl = " + serverUrl);
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
			
	
            // logger.debug("transport.url = " + transport.url);
	    	
	    	transport.send(writer,responder);
	  	}
		
		private function writeArg(writer:XmlWriter, argValue:Object, argName:String, sobjectNs:String):void {
      		if (argValue is Array) {
        		for (var j:int = 0; j < argValue.length; j++) {
          			var obj:Object = argValue[j];
          			if (!obj) {
            			throw "Array element at " + j + " is null.";
          			}
          			if (obj is ObjectProxy) {
          				writeArg(writer, obj, argName, sobjectNs);
          			} else {
          				writeOne(writer, argName, obj, sobjectNs);
          			}
          		}
      		} else if ( argValue is ObjectProxy && !(argValue is SObject)
      					&& !argValue.hasOwnProperty("toXml") ) {
      			writer.writeStartElement(argName);
      			for (var key:String in argValue) {
      				writeArg(writer, argValue[key], key, sobjectNs);
      				//writeOne(writer, key, argValue[key], sobjectNs);
      			}
      			writer.writeEndElement(argName);
      		} else {
        		writeOne(writer, argName, argValue, sobjectNs);
      		}
			
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
		    if (value == null)
		    {
		      value = "";
		    }
		    
	    	if (value.hasOwnProperty("toXml"))  // is SObject || value is SingleEmailMessage)
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
