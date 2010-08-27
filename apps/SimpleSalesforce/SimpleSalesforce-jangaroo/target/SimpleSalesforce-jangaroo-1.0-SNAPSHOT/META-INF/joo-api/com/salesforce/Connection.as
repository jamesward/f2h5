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

	  
	"use namespace salesforce_internal",;/*
	/**
	* Event used internaly to collect responses and pass them back to the responder callbacks
	* /	
	[Event(name="sendRequest", type="com.salesforce.events.SendEvent")]
	
	/**
	* Event used to print out the SOAP messages used in the API transport methods
	* /
	[Event(name="debugEvent", type="com.salesforce.events.DebugEvent")]*/
	
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
	public class Connection extends flash.events.EventDispatcher	{
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
	  salesforce_internal var _protocol:String = 'https';
	  /**
	   * Use this method to determine if a connection has or has not been initialized by loginWithCredentials() or loginWithSessionId() via an scontrol
	   * 
	   * @return the session that was set upon login or load, or null if no session has been created, note this 
	   * sessionid will expire 
	   * 
	   */	  
        public native function getCurrentSessionid():String;

        /**
         * not documented or tested yet
         * @private
         *
         */
	  	public native function getFrontDoorUrl():String; 

        /**
         * used to detect if we are running from inside a SControl on the hosted Apex platform
         * @return True if we are running from a SWF loaded onto Salesforce.com SControl , False if running from a localhost or local filesystem
         *
         */
        public native function isSControl(): Boolean;
	  	
	  	/* begin PROPERTIES */
	  	public native function get loginResult():LoginResult;
	  	/**
	  	 * Host and Domain name parsed from the server url, or localhost
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public native function get applicationDomain():String;
	  	/**
	  	 * Server name parsed from the web services endpoint
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public native function get applicationServerName():String;
	  	/**
	  	 * URL web services endpoint, set in the login process
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public native function get applicationUrl():String;
	  	
		/**
	  	 * protocol to use, can be set to http, defaults to https
	  	 * @return String
	  	 * 
	  	 */	  	
	  	public native function get protocol():String;
		public native function set protocol(prot:String):void;
	  	
	  	/**
	  	 * URL web services endpoint, set in the login process, no need to set this directly
	  	 * @param url 
	  	 * 
	  	 */	  	
	  	public native function set applicationUrl(url:String):void;
		/**
		 * Set in the login process by connection.loginWithCredentials() or loginWithSessionId(()
		 * @param serverUrl normaly provided by the salesforce merge field used in SControls
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/index.htm Apex Developer Doc
		 */	  	
		public native function set serverUrl(serverUrl:String):void;
	  
	  	public native function get serverUrl():String;
	  	/**
	  	 * Change the default size of the batches returned from Query() and QueryMore(), the minimum size is 200, the maximum size is 2000
	  	 * the system will also reserve the right to return other sizes, this is a suggestion.
	  	 * @param num Number
	  	 * 
	  	 */	  	
	  	public native function set batchSize(num:Number):void;

	    /* end PROPERTIES */

        /**
         * Constructor for Connection class, no arguments
         * @return
         *
         */
        public native function Connection();

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
		public native function loginWithSessionId(sessionId:String, serverUrl:String, callback:IResponder=null):void;

	  	/**
	  	 * Normal login, used if running from a localhost
	  	 * @param username 
	  	 * @param password 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function loginWithCredentials(username:String, password:String, callback:IResponder):void;

		/**
		 * unified login request, will perform one of loginWithSessionId, or loginWithCredentials depending on 
		 * the information provided in the request structure 
		 * 
		 * @param loginRequest
		 * 
		 */
		public native function login( loginRequest:LoginRequest ) :void;	
		
	  	/**
	  	 * Query table or table and related tables using Salesforce SOQL language strings, the responder
	  	 * will return the results asynchronously to the callback functions (response,fault)
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_soql.htm#topic-title Apex SOQL Reference
	  	 * @param queryString
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function query(queryString:String, callback:IResponder):void;
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
	  	public native function create(sobjects:Array, callback:IResponder):void;
	
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
	  	public native function update(sobjects:Array, callback:IResponder):void;
	  	/**
	  	 * Delete a list of objects from salesforce.com database, the array contains just the id strings
	  	 * @param ids list of id strings for objects to be delted
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function deleteIds(ids:Array, callback:IResponder):void;
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
	  	public native function execute(packageName:String, method:String, args:Array, callback:IResponder, isArray:Boolean=false):void;
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
		public native function retrieve(fieldList:String, sObjectType:String, ids:Array, callback:IResponder):void;
	
		public native function getUserInfo(callback:IResponder):void;
	  	/**
	  	 * search for objects in one or more tables within the salesforce database
	  	 * 
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_search.htm Apex Developer Doc
	  	 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_sosl.htm#topic-title SOSL Search Language
	  	 * @param searchString
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function search(searchString:String, callback:IResponder):void;
		/**
		 * use describeSObjects instead
		 * @param type
		 * @param callback
		 * 
		 */	
		public native function describeSObject(type:String, callback:IResponder):void;
		/**
		 * return the object description in detail for one or more salesforce custom or standard objects
		 *  
		 * @param types array of strings listing the types, ex: ["Account","Task"]
		 * @param callback
		 * 
		 */	
		public native function describeSObjects(types:Array, callback:IResponder):void;
		/**
		 * returns a list of all valid objects (table names) in the salesforce database, used to check that a desired table 
		 * exists in a given database
		 * 
		 * @param callback
		 * 
		 */	
		public native function describeGlobal(callback:IResponder):void;

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
		public native function describeLayout(type:String, recordTypes:Array, callback:IResponder):void;
	  	/**
	  	 * responder will be called with a timestamp from the server, used to record when an getUpdated or getDeleted 
	  	 * call was last made, or to syncronize unrelated systems.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function getServerTimestamp(callback:IResponder):void;
	
	  	/**
	  	 * callback receives a structure describing all installed AppExchange applications 
	  	 * for the current connection, including a list of object tabs for each application.
	  	 * 
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function describeTabs(callback:IResponder):void;
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
	  	public native function getDeleted(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void;
	  	/**
	  	 * utility function that will perform a create or update depending on the presence of an existing record
	  	 * that matches the provided external key field 
	  	 * @param externalIDFieldName external field, if no matching record found, new record is created otherwise performs an update
	  	 * @param sobjects list of objects to update or create
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function upsert(externalIDFieldName:String, sobjects:Array, callback:IResponder):void;
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
		public native function getUpdated(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void;
	 	/**
	 	 * this version of query will include in it's scope the recycle bin as well as the live data
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */		
	 	public native function queryAll(queryString:String, callback:IResponder):void;
	 	/**
	 	 * looping portion of the query() queryMore() method for accessing large data sets
	 	 * @see com.salesforce.QueryResultIterator
	 	 * 
	 	 * @param queryString
	 	 * @param callback
	 	 * 
	 	 */			
	  	public native function queryMore(queryLocator:Object, callback:IResponder):void;
	

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
	  	public native function sendEmail(messgeList:Array,callback:IResponder):void;


	  	/**
	  	 * to be tested
	  	 * @param mergeRequest
	  	 * @param callback
	  	 * 
	  	 */		
	  	public native function merge(mergeRequest:MergeRequest, callback:IResponder):void;
	  	/**
	  	 * to be tested
	  	 * @param ids
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function undelete(ids:Array, callback:IResponder):void;
		/**
		 * to be tested
		 * @param leadConverts
		 * @param callback
		 * 
		 */
		public native function convertLead(leadConverts:Array, callback:IResponder):void;
		/**
		 * to be tested
		 * @param userId
		 * @param callback
		 * 
		 */			
		public native function resetPassword(userId:String, callback:IResponder):void;
	  	/**
	  	 * to be tested
	  	 * @param userId
	  	 * @param password
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function setPassword(userId:String, password:String, callback:IResponder):void;
	  	/**
	  	 * to be tested
	  	 * @param actions
	  	 * @param callback
	  	 * 
	  	 */	
	  	public native function process(actions:Array, callback:IResponder):void;
	}
}