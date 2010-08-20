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
	
	import flash.utils.ByteArray;
	
	import mx.rpc.IResponder;
	use namespace salesforce_internal;

	public interface IGeneralConnection 
	{
		function get IsLoggedIn():Boolean;
			  	  
		/**
		 * Use this method to determine if a connection has or has not been initialized by loginWithCredentials() or loginWithSessionId() via an scontrol
		 * 
		 * @return the session that was set upon login or load, or null if no session has been created, note this 
		 * sessionid will expire 
		 * 
		 */	  
		function getCurrentSessionid():String;
		
		/**
		 * not documented or tested yet
		 *
		 */
		function getFrontDoorUrl():String;
		
		/**
		 * used to detect if we are running from inside a SControl on the hosted Apex platform
		 * @return True if we are running from a SWF loaded onto Salesforce.com SControl , False if running from a localhost or local filesystem
		 *
		 */
		function isSControl():Boolean;
		  	 
		function get loginResult():LoginResult;
		/**
		 * Host and Domain name parsed from the server url, or localhost
		 * @return String
		 * 
		 */	  	
		function get applicationDomain():String;
		/**
		 * Server name parsed from the web services endpoint
		 * @return String
		 * 
		 */	  	
		function get applicationServerName():String;
		  
		/**
		 * protocol to use, can be set to http, defaults to https
		 * @return String
		 * 
		 */	  	
		function get protocol():String;
		
		function set protocol(value:String):void;
		  
		/**
		 * URL web services endpoint, set in the login process
		 * @return String
		 * 
		 */	  	
		function get applicationUrl():String;
		
		/**
		 * URL web services endpoint, set in the login process, no need to set this directly
		 * @param url 
		 * 
		 */	  	
		function set applicationUrl(url:String):void;
		  
		/**
		 * Set in the login process by connection.loginWithCredentials() or loginWithSessionId(()
		 * @param serverUrl normaly provided by the salesforce merge field used in SControls
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/index.htm Apex Developer Doc
		 */	  	
		function set serverUrl(serverUrl:String):void;
		  
		function get serverUrl():String;
		
		  
		/**
		 * Change the default size of the batches returned from Query() and QueryMore(), the minimum size is 200, the maximum size is 2000
		 * the system will also reserve the right to return other sizes, this is a suggestion.
		 * @param num Number
		 * 
		 */	  	
		function set batchSize(num:Number):void;
		  
		
		/**
		 * Explicitly set the Organization ID to allow portal users to log in
		 * @param value String
		 */
		function set organizationId(value:String):void;
		  
		
		/**
		 * get the organization ID
		 */
		function get organizationId():String;
		  
		/**
		 * Explicitly set the Portal ID to allow portal users to log in
		 * @param value String
		 */
		function set portalId(value:String):void;
		  
		/**
		 * get the portal ID
		 */
		function get portalId():String;
		  
		/**
		 * Sets the API token to be used for this session.
		 * @param value String
		 */
		function set client(value:String):void;
				
		/**
		 * unified login request, will perform one of loginWithSessionId, or loginWithCredentials depending on 
		 * the information provided in the request structure 
		 * 
		 * @param loginRequest
		 * 
		 */
		function login( loginRequest:LoginRequest, encryptionKey:ByteArray=null ):void;
		
		function flush(deleteTable:String):void;
		
		
		/**
		 * Query table or table and related tables using Salesforce SOQL language strings, the responder
		 * will return the results asynchronously to the callback functions (response,fault)
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_soql.htm#topic-title Apex SOQL Reference
		 * @param queryString
		 * @param callback
		 * 
		 */	
		
		function query(queryString:String, callback:IResponder, queryLocal:Boolean = false, passThrough:Object=null, flush:Boolean=false):void;
		  
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
		
		function create(sobjects:Array, callback:IResponder, queryAfterCreate:Boolean=false):void;
		
		function createObject(customObjects:Array, callback:IResponder):void;
			
		function updateObject(customObjects:Array, callback:IResponder):void;
		
		function deleteObject(customObjects:Array, callback:IResponder):void;
		
		function checkStatus(requestIds:Array, callback:IResponder):void;
			
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
		function update(sobjects:Array, callback:IResponder):void;
		/**
		 * Delete a list of objects from salesforce.com database, the array contains just the id strings
		 * @param ids list of id strings for objects to be delted
		 * @param callback
		 * 
		 */	
		function deleteIds(ids:Array, callback:IResponder):void;
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
		function execute(packageName:String, method:String, args:Array, callback:IResponder, apexNamespace:String = null, isArray:Boolean=false):void;
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
		function retrieve(fieldList:String, sObjectType:String, ids:Array, callback:IResponder):void;
		
		/**
		 * Retrieves personal information for the user associated with the current session.
		 * 
		 * @param callback
		 */
		function getUserInfo(callback:IResponder):void;
		/**
		 * search for objects in one or more tables within the salesforce database
		 * 
		 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_search.htm Apex Developer Doc
		 * @see http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_calls_sosl.htm#topic-title SOSL Search Language
		 * @param searchString
		 * @param callback
		 * 
		 */	
		function search(searchString:String, callback:IResponder):void;
		/**
		 * use describeSObjects instead
		 * @param type
		 * @param callback
		 * 
		 */	
		function describeSObject(type:String, callback:IResponder):void;
		/**
		 * return the object description in detail for one or more salesforce custom or standard objects
		 *  
		 * @param types array of strings listing the types, ex: ["Account","Task"]
		 * @param callback
		 * 
		 */	
		function describeSObjects(types:Array, callback:IResponder):void;
		/**
		 * returns a list of all valid objects (table names) in the salesforce database, used to check that a desired table 
		 * exists in a given database
		 * 
		 * @param callback
		 * 
		 */	
		function describeGlobal(callback:IResponder):void;
		
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
		function describeLayout(type:String, recordTypes:Array, callback:IResponder):void;
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
		function getServerTimestamp(callback:IResponder):void;
		
		/**
		 * callback receives a structure describing all installed AppExchange applications 
		 * for the current connection, including a list of object tabs for each application.
		 * 
		 * @param callback
		 * 
		 */	
		function describeTabs(callback:IResponder):void;
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
		function getDeleted(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void;
		/**
		 * utility function that will perform a create or update depending on the presence of an existing record
		 * that matches the provided external key field 
		 * @param externalIDFieldName external field, if no matching record found, new record is created otherwise performs an update
		 * @param sobjects list of objects to update or create
		 * @param callback
		 * 
		 */	
		function upsert(externalIDFieldName:String, sobjects:Array, callback:IResponder):void;
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
		function getUpdated(sObjectType:String, startDate:Date, endDate:Date, callback:IResponder):void;
		/**
		* this version of query will include in it's scope the recycle bin as well as the live data
		* 
		* @param queryString
		* @param callback
		* 
		*/		
		function queryAll(queryString:String, callback:IResponder):void;
		/**
		* looping portion of the query() queryMore() method for accessing large data sets
		* @see com.salesforce.QueryResultIterator
		* 
		* @param queryString
		* @param callback
		* 
		*/			
		function queryMore(queryLocator:Object, callback:IResponder,passThrough:Object=null,cacheThisQuery:Boolean = false):void;
		
		
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
		function sendEmail(messgeList:Array,callback:IResponder):void;
		
		
		/**
		 * to be tested
		 * @param mergeRequest
		 * @param callback
		 * 
		 */		
		function merge(mergeRequest:MergeRequest, callback:IResponder):void;
		/**
		 * to be tested
		 * @param ids
		 * @param callback
		 * 
		 */	
		function undelete(ids:Array, callback:IResponder):void;
		/**
		 * to be tested
		 * @param leadConverts
		 * @param callback
		 * 
		 */
		function convertLead(leadConverts:Array, callback:IResponder):void;
		/**
		 * Changes a user’s password to a temporary, system-generated value.
		 * @param userId
		 * @param callback
		 * 
		 */			
		function resetPassword(userId:String, callback:IResponder):void;
		/**
		 * Sets the specified user’s password to the specified value.
		 * @param userId
		 * @param password
		 * @param callback
		 * 
		 */	
		function setPassword(userId:String, password:String, callback:IResponder):void;
		/**
		 * to be tested
		 * @param actions
		 * @param callback
		 * 
		 */	
		function process(actions:Array, callback:IResponder):void;
	}
}