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

// MM TODO: Add Update Table if Exists 



package com.salesforce
{
    import air.net.URLMonitor;
    
    import com.modelmetrics.CacheCompleteEvent;
    import com.salesforce.events.NetworkStatusChangeEvent;
    import com.salesforce.objects.LoginRequest;
    import com.salesforce.objects.SObject;
    import com.salesforce.results.DescribeSObjectResult;
    import com.salesforce.results.Fault;
    import com.salesforce.results.Field;
    import com.salesforce.results.LoginResult;
    import com.salesforce.results.QueryResult;
    import com.salesforce.results.SaveResult;
    
    import flash.data.SQLColumnSchema;
    import flash.data.SQLConnection;
    import flash.data.SQLMode;
    import flash.data.SQLResult;
    import flash.data.SQLSchemaResult;
    import flash.data.SQLStatement;
    import flash.data.SQLTableSchema;
    import flash.errors.SQLError;
    import flash.events.Event;
    import flash.events.IOErrorEvent;
    import flash.events.SQLErrorEvent;
    import flash.events.SQLEvent;
    import flash.events.StatusEvent;
    import flash.filesystem.File;
    import flash.net.SharedObject;
    import flash.net.URLRequest;
    import flash.net.registerClassAlias;
    import flash.utils.ByteArray;
    
    import mx.collections.ArrayCollection;
    import mx.controls.Alert;
    import mx.logging.ILogger;
    import mx.logging.Log;
    import mx.rpc.IResponder;
    import mx.utils.ObjectProxy;
    import mx.utils.ObjectUtil;
    import mx.utils.StringUtil;
    import mx.utils.UIDUtil;

	//temp
	/*import flash.utils.setInterval;
	import flash.utils.clearInterval;*/

    use namespace salesforce_internal;

    [Event(name="networkStatusChanged", type="com.salesforce.events.NetworkStatusChangeEvent")]
    
    [Event(name="initComplete")]
    
    [Event(name="startSyncingOfflineCreates")]
    [Event(name="updateSyncingOfflineCreates")]
    [Event(name="finishedSyncingOfflineCreates")]
    [Event(name="startSyncingOfflineUpdates")]
    [Event(name="updateSyncingOfflineUpdates")]
    [Event(name="finishedSyncingOfflineUpdates")]
    [Event(name="startSyncingOfflineDeletes")]
    [Event(name="updateSyncingOfflineDeletes")]
    [Event(name="finishedSyncingOfflineDeletes")]
    [Event(name="startLoggingIn")]
    [Event(name="finishedLoggingIn")]
	  [Event(name="dbCommit")]
	
    public class AIRConnection extends Connection implements IGeneralConnection {
        
        // OVERRIDES 
        /**
         * query the web service if we have webtone, if not, look for the data in our 
         * sqlite database
         * 
         * @param soql Salesforce SOQL statement
         * @param asyncCB  callbacks 
         * 
         */
        public var autoLogin:Boolean = true; 
        public var doCache:Boolean = true; // default to always cach queries
        public var oneTimeNoCache:Boolean=false; // when true the next (single) call is not cached     
        public var autoSyncEnabled:Boolean = true; // when true a sync will be performed upon any successful login or when connected and logged in state
        
        private var openDatabases:Object = new Object();
        
        private var _connected:Boolean;
        
        public var syncingOfflineCreates:Boolean = false;
        public var syncingOfflineUpdates:Boolean = false;
        public var syncingOfflineDeletes:Boolean = false;
        
        private var loginResultCallback:Function;
        
        private var loggingIn:Boolean = false;
      
        public var sql:SQLConnection;
        private var syncSQL:SQLConnection;
        
        private var _errors:ArrayCollection;
        
        private var logger:ILogger;
        
        private var loginRequest:LoginRequest;
        
        private const DESCRIBE_SOBJECT_TABLE:String = "_describe_sobject_cache";
        private const OFFLINE_DELETES_TABLE:String = "_offline_deletes";
        private const OFFLINE_UPDATES_TABLE:String = "_offline_updates";
        private const OFFLINE_CREATES_TABLE:String = "_offline_creates";
		private const PK_MAP_TABLE:String ="_pk_map";
        private const NEW_RECORD_TEMP_ID_PREFIX:String = "_new-";
        
        public const OFFLINE_CREATE_SUCCEEDED:String = 'the create succeeded offline';
        public const OFFLINE_UPDATE_SUCCEEDED:String = 'the update succeeded offline';
		
        private var inited:Boolean = false;
        
        public var offlineToOnlinePK:Object = new Object();
        
        public var treatAllOnlineQueriesAsOffline:Boolean = false;
        
        /**
         * Constructor for offline extension to Salesforce Connection class
         * open a database, load it when we are online
         * set a flag if we go off line
         * 
         * must read : 
         * http://livedocs.adobe.com/labs/flex/3/langref/localDatabaseSQLSupport.html
         * 
         * 
         */
        public function AIRConnection() {
            super();
            registerClassAlias("ByteArrayAlias",ByteArray);
            registerClassAlias("UserInfoAlias",com.salesforce.results.UserInfo);
            
            logger = Log.getLogger("com.salesforce.AIRConnection");
        
            // DATABASE is now opened by the login override so that we know the username
            initNetListener();
        }
        private function handleDBCommit(event:Event):void {
        	dispatchEvent(new Event("dbCommit"));
        }
        public function get syncConnection():SQLConnection {
        	return syncSQL;
        }
        public function get asyncConnection():SQLConnection {
        	return sql;
        }
        //TG: Since this is where the database is opened/created, I'm adding an optional
        //encryption key to the login method
        public override function login(lreq:LoginRequest,encryptionKey:ByteArray=null):void {
        	this.loginRequest = lreq;
          	loggingIn = true;
          	dispatchEvent(new Event("startLoggingIn"));
          
          	logger.info('logging in.  connected = ' + connected);

          	if ((lreq.username == null) || (lreq.username.length <= 0))	{
            	lreq.callback.fault(new mx.rpc.Fault("no username specified", "you must use a username and password with AIRConnection"));
            	return;
          	}
          
          	if (openDatabases[lreq.username] == undefined) 
          	{
            	if(encryptionKey==null)
            	{
            		openSQLiteDatabase(lreq.username);
            	}
            	else
            	{
            		//encrypt the db (or, if it exists, open it with the provided key)
            		openSQLiteDatabase(lreq.username,false,encryptionKey);
            	}
          	}
          
          	if (connected) {
            	// attemptNormal login - override the callback so that we can do a few more things before the caller gets called back
            	loginResultCallback = lreq.callback.result;
            	lreq.callback = new AsyncResponder(loginResultHandler, lreq.callback.fault);
            	super.login(lreq);
          	} else {
            	trace('offline but we will succeed at logging in anyways');
            	
            	// succeed no matter what
            	var so:SharedObject = SharedObject.getLocal("userInfo");
				var fakeLoginResult:LoginResult = new LoginResult();
				fakeLoginResult.userInfo = so.data.userInfo;
				_loginResult = fakeLoginResult;
				isLoggedIn=true;
            	lreq.callback.result(fakeLoginResult);
          	}
        }
        
        private function loginResultHandler(loginResult:LoginResult):void 
        {
        	//write down the userInfo object, so we can use it next time we log in offline
        	var so:SharedObject = SharedObject.getLocal("userInfo");
			so.data.userInfo= loginResult.userInfo;
			so.flush();
			
        	if (autoSyncEnabled == true) {
				autoSync();
        	}
        }
        
        public function autoSync():void {
        	if (canSync()) {
        		trace("Dispatching AutoSync Event");
        		dispatchEvent(new Event("autoSyncBeganEvent"));	
        		
				syncingOfflineCreates = true;
				syncingOfflineUpdates = true;
				syncingOfflineDeletes = true;
				  
				autoInsertNewRecords();
				autoUpdateRecords();
				autoDeleteRecords();
        	}
        }
        
        private function qMore(qr:QueryResult):void {
        	
        }
        
        //flush a particular table of data
        public override function flush(deleteTable:String):void
        {
        	//only flush if we're connected
        	if ( super.loginResult && connected)
        	{
	            try
	            {
	            	//only flush if we don't have any pending update/create/delete operations
	            	var flushOkay:Boolean=true;
	            	var createsDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	            	var updatesDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	            	var deletesDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	            	createsDbStatement.text="SELECT count(id) as recordCount FROM _offline_creates";
	            	updatesDbStatement.text="SELECT count(id) as recordCount FROM _offline_updates";
	            	deletesDbStatement.text="SELECT count(id) as recordCount FROM _offline_deletes";
	            	
	            	createsDbStatement.execute();
	            	var createsResult:SQLResult = createsDbStatement.getResult();
	            	updatesDbStatement.execute();
	            	var updatesResult:SQLResult = updatesDbStatement.getResult();
	            	deletesDbStatement.execute();
	            	var deletesResult:SQLResult = deletesDbStatement.getResult();
	            	
	            	if((createsResult.data == null || createsResult.data.length == 0 || createsResult.data[0].recordCount < 1) && (updatesResult.data == null || updatesResult.data.length == 0 || updatesResult.data[0].recordCount < 1) && (deletesResult.data == null || deletesResult.data.length == 0 || deletesResult.data[0].recordCount < 1))  
	            	{ 		                	
		           		var deleteDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	           			deleteDbStatement.text = "delete from " + deleteTable;
						deleteDbStatement.execute();
	            	}
	            }
	            catch(e:SQLError)
	            {
	            	//probably just the table doesn't actually exist yet. No big deal.	
	            }       	
	        }
        }
        
        //if we're offline, return info from local DB _describe_sobject_cache
        public override function describeGlobal(callback:IResponder):void
        {
        	if(connected)
        	{
        		super.describeGlobal(callback);
        	}
        	else
        	{
        		//get describe info from local database, return mx.utils.ObjectProxy with sobjects ArrayCollection of ObjectProxy objects
				var sqlStatement:SQLStatement = new SQLStatement();
				sqlStatement.text = "SELECT * FROM _describe_sobject_cache"; 
				sqlStatement.sqlConnection = syncConnection;
						
				sqlStatement.addEventListener(SQLErrorEvent.ERROR,handleSQLFault);
			
				sqlStatement.execute();	
				
				var describeResult:SQLResult = sqlStatement.getResult();
				
				if(describeResult != null && describeResult.data != null && describeResult.data.length > 0)
        		{
					var returnObject:ObjectProxy = new ObjectProxy();
					
					returnObject.sobjects = new ArrayCollection();
					for each(var describeRow:Object in describeResult.data)
					{
						returnObject.sobjects.addItem(new ObjectProxy(describeRow));					
					}
					
					callback.result(returnObject);    		
        		}
        		else
        		{
        			callback.result(null);	
        		}
        	}
        } 
              
        private function handleSQLFault(e:*):void
        {
        	Alert.show("Generic SQL Fault");	
        }
        
        //TG: Added queryLocal to force a query of the local DB rather than querying SFDC
        //TG: passThrough object is to allow something to be passed through to the callback (like a next step to take)
        //TG: flush: boolean that specifies whether or not we should delete all local data from this table prior to querying (assuming we're online, of course)
        public override function query(queryString:String, callback:IResponder, queryLocal:Boolean = false, passThrough:Object=null, flush:Boolean=false) :void {
            var cacheThisQuery:Boolean = this.doCache && !this.oneTimeNoCache ; // decide if this query will be cached
            this.oneTimeNoCache = false; // reset this one time flag
            var apex:Connection=super;
            
            var queryParts:Array = queryString.match(/SELECT\s+(.*)FROM\s+(\S*)\s*(.*)/i); //[full query, select, from, everything else]

        	var querySObject:String = trim(queryParts[2]); //after from

			

            if ( super.loginResult && connected && !queryLocal && ! treatAllOnlineQueriesAsOffline) {
                trace( 'query - online');
                //flush local data...
                if(flush)
                {
	                //get table name from query string
	                /*try
	                {
	                	//only flush if we don't have any pending update/create/delete operations
	                	var flushOkay:Boolean=true;
	                	var createsDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	var updatesDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	var deletesDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	createsDbStatement.text="SELECT count(id) as recordCount FROM _offline_creates";
	                	updatesDbStatement.text="SELECT count(id) as recordCount FROM _offline_updates";
	                	deletesDbStatement.text="SELECT count(id) as recordCount FROM _offline_deletes";
	                	
	                	createsDbStatement.execute();
	                	var createsResult:SQLResult = createsDbStatement.getResult();
	                	updatesDbStatement.execute();
	                	var updatesResult:SQLResult = updatesDbStatement.getResult();
	                	deletesDbStatement.execute();
	                	var deletesResult:SQLResult = deletesDbStatement.getResult();
	                	
	                	if((createsResult.data == null || createsResult.data.length == 0 || createsResult.data[0].recordCount < 1) && (updatesResult.data == null || updatesResult.data.length == 0 || updatesResult.data[0].recordCount < 1) && (deletesResult.data == null || deletesResult.data.length == 0 || deletesResult.data[0].recordCount < 1))  
	                	{ 		                	
				        	var queryParts:Array = queryString.match(/SELECT\s+(.*)FROM\s+(\S*)\s+(.*)/i); //[full query, select, from, everything else]
				        	var deleteTable:String = "`"+trim(queryParts[2])+"`"; //from
				        	
		    			              				
			           		var deleteDbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
		           			deleteDbStatement.text = "delete from " + deleteTable;
							deleteDbStatement.execute();
	                	}
	                }
	                catch(e:SQLError)
	                {
	                	//probably just the table doesn't actually exist yet. No big deal.	
	                }*/
                }
                				                
                /* call the super query, but hijack the callback, 
                 * cache the query, then proceed with the original applicaiton supplied 
                 * query callback
                 */             
                super.query(queryString, new AsyncResponder( 
                    function(qr:QueryResult) :void {   
                    	qr.passThrough=passThrough;                      
                        if (cacheThisQuery) { 
                            trace("cache this query result");
                            
                            cacheResult(qr,querySObject); // NOTE: this starts an async process
                        }
                        
                        callback.result(qr);         // call back the original method passed in
                    }, 
                    function (info:Object) :void { 
                        callback.fault(info);     // incase this was passed also
                    }  
                )); 
                
            } else {
                trace( 'query - offline');
                /* 
                 * here is where the offline fun begins, need to take the SOQL and build one or more
                 * SQL queries that we can use to pull from the sqlite offline db
                 * ? keep it simple , single table 
                 */
                if (!connected) { logger.debug( 'query made while offline'); }
                else if ( ! super.loginResult ) { logger.debug('query made after unsuccessful login'); }
                
                if ( !sql) { logger.debug("no open database to query()"); return }
                
                var dbStatement:SQLStatementExt = new SQLStatementExt(sql,    
                     {"asyncResponder": callback, "tableName": getTableName(queryString) } );
            
                dbStatement.text = SOQL_To_SQL(queryString);
                logger.debug(dbStatement.text);
            	
                dbStatement.addEventListener(SQLEvent.RESULT, sqlToQueryResult);
                dbStatement.addEventListener(SQLErrorEvent.ERROR, dbFault);
               	dbStatement.execute();
            }
        }
        
        public override function queryMore(queryLocator:Object, callback:IResponder, passThrough:Object=null, cacheThisQuery:Boolean = true):void 
        {	
        	trace("QUERYMORE CALLED");
        	//hijack the responder, so we can add in the passThrough object
			super.queryMore(queryLocator, new AsyncResponder( 
                    function(qr:QueryResult) :void {
                    	qr.passThrough=passThrough;  
						
						if (cacheThisQuery) { 
                            trace("cache this query result");
                            
                            cacheResult(qr);
                        }
                        
                        callback.result(qr);         // call back the original method passed in
                    }, 
                    function (info:Object) :void { 
                        callback.fault(info);     // incase this was passed also
                    }  
            ));
        }
        
        private function SOQL_To_SQL(soql:String):String {
        	//TG: We need to put back-ticks around the table names because Case is an SQL reserved word, which causes bad things.
        	//    We should probably eventually back-tick column names as well, but this is good enough until somebody names a
        	//    column with a reserved word, I guess.
			/*var sqlRegEx:RegExp = /FROM\s+(\S*)/gi;
			var sql:String = soql.replace( sqlRegEx, "FROM `$1`");*/
        	//var dateRegEx:RegExp = /\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}\-\d{2}\:\d{2}/gi;
        	
			//let's just ditch any subqueries, because they won't work anyway
        	//sql = sql.replace(/\(.*\)/g,"");
        	
        	//deal with lookups (__r) and subqueries...
        	
        		
        	//break the query down into 3 parts: the select clause, the from clause, and the rest
        	var queryParts:Array = soql.match(/SELECT\s+(.*)FROM\s+(\S*)\s*(.*)/i); //[full query, select, from, everything else]
        	
        	var finalQueryParts:Object = new Object();
        	finalQueryParts["select"] = new Array(); //select fields
        	
        	finalQueryParts["from"] = "`"+trim(queryParts[2])+"`"; //from
        	
        	finalQueryParts["join"] = new Object(); //joins (object used to prevent duplicates)
        	
        	var orderByParts:Array = queryParts[3].match(/(.*)ORDER\sBY(.*)/i)
        	if(orderByParts != null)
        	{
        		finalQueryParts["where"] = orderByParts[1]; 
        		finalQueryParts["orderby"] = orderByParts[2]; 	
        	}
        	else
        	{
        		finalQueryParts["where"] = queryParts[3]; //just the rest of the query, unchanged
        	}	

        	//should be enough...if you're joining more than 54 tables, perhaps you're doing something wrong...
        	var tableLetters:Array = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq','rr','ss','tt','uu','vv','ww','xx','yy','zz'];
        	
        	//subqueries
        	if(queryParts[1].search(/\(.*\)/) > -1)
        	{
        		//ditch subqueries for now
        		trace("WARNING: Subqueries are not supported in locally, and have been discarded!");	
        		queryParts[1] = queryParts[1].replace(/\(.*\)/g,"");
        	}

        	//first, let's loop through the SELECT clause fields...
        	var selectClause:Array = String(queryParts[1]).split(",");
        	var tableLetterIndex:Number=0;
        	var tableLetterMap:Object = new Object();
        	for(var i:Number=0;i<selectClause.length;i++)
        	{
        		if(trim(selectClause[i]).length < 1)
        		{
        			//discard	
        			trace("empty");
        		}
        		//lookup
        		else if(String(selectClause[i]).search(/\./i) > -1)
        		{
        			//first, we need to know what table this field points to, so get the describe info for this table
        			var soDescribe:DescribeSObjectResult = getCachedDescribeSObjectResultByType(queryParts[2]);
        			
        			//break the lookup field down into its two parts (relationship name and foreign field)
        			var lookupField:Array = String(selectClause[i]).split(".");
        			var foreignTable:String;
        			
        			//loop through the describe info, looking for this relationship
        			for(var field:String in soDescribe.fields)
        			{
        				if(soDescribe.fields[field].relationshipName != null && soDescribe.fields[field].relationshipName == trim(lookupField[0]))
        				{
        					foreignTable = soDescribe.fields[field].referenceTo;
        					break;
        				}	
        			} 
        			if(foreignTable != null)
        			{
        				var tableLetter:String;
        				if(tableLetterMap[trim(foreignTable)] != null)
        				{
        					tableLetter = tableLetterMap[trim(foreignTable)]
        				}
        				else
        				{
        					tableLetter = tableLetters[tableLetterIndex];
        					tableLetterIndex++;	
        					tableLetterMap[trim(foreignTable)] = tableLetter;
        					finalQueryParts["join"]["LEFT JOIN `"+trim(foreignTable)+"` "+tableLetter+" ON "+finalQueryParts["from"]+".`"+trim(field)+"`="+tableLetter+".`Id`"]=1;
        				}	
        				finalQueryParts["select"].push(tableLetter+".`"+trim(lookupField[1])+"` as "+lookupField[0]+lookupField[1]);
        				
        				
        			}
        		}
        		//regular field
        		else
        		{
        			finalQueryParts["select"].push(finalQueryParts["from"]+".`"+trim(selectClause[i])+"`");	
        		}
        		
        	}
        	var orderByClause:Array;
        	//order by
        	if(tableLetterIndex > 0 && finalQueryParts["orderby"] != null)
        	{
        		orderByClause = finalQueryParts["orderby"].split(",");
        		for(var i:Number = 0; i < orderByClause.length; i++)
        		{
        			if(String(orderByClause[i]).indexOf(".") < 0)
        				orderByClause[i] = finalQueryParts["from"]+"."+trim(orderByClause[i]);
        			else
        			{
        				//collapse the blah__r.blah__c to blah__rblah__c, because that's what is specified in the "as"
        				var orderByTableField:Array = trim(orderByClause[i]).split(".");
        				orderByClause[i] = trim(orderByTableField[0])+trim(orderByTableField[1]);
        			}
        		}	
        	}
        	
        	//build the SQL query
        	var sql:String = "SELECT ";
        	
        	//SELECT
        	for(i=0;i<finalQueryParts["select"].length;i++)
        	{
        		sql += finalQueryParts["select"][i]+",";
        	}
        	sql = sql.substr(0,sql.length-1); //remove last comma
        	
        	//FROM
        	sql += " FROM "+finalQueryParts["from"]+" ";
        	
        	//JOIN
        	for(var joinKey:String in finalQueryParts["join"])
        	{
        		sql += joinKey + " ";
        	}
        	
        	//WHERE
        	sql += finalQueryParts["where"];
        	

            
            //ORDER BY
            if(orderByClause != null && orderByClause.length > 0)
            {
            	sql += " ORDER BY ";
	            for each(var orderByField:String in orderByClause)
				{
					sql += orderByField + ",";
				}
				sql = sql.substr(0,sql.length-1);
           	}
           	else if(finalQueryParts["orderby"] != null)
           	{
           		sql += " ORDER BY "+finalQueryParts["orderby"];
           	}
            
            return sql;          
        }
        
        //trim whitespace from beginning and end of a string
        private function trim(aString:String):String
        {
        	return aString.replace(/\s*(\S*)\s*/,"$1");
        }
        
        private function sqlToQueryResult(event:SQLEvent):void {
            logger.debug(event.type);
            var qr:QueryResult = new QueryResult(null);
            qr.records = new ArrayCollection();
            qr.done = true;
            var dbs:SQLStatementExt = event.currentTarget as SQLStatementExt;
            var res:SQLResult = dbs.getResult();
            if (res.data != null) {
              qr.size = res.data.length;
            } else {
              qr.size = 0;
            }
            for (var i:int = 0;i<qr.size;i++) 
            {
                var obj:Object = res.data[i];
                //if we have any __r concat fields that were the result of a join, we need to build it out into an object, 
                //to mimic the results of a SOQL query
                for(var key:String in obj)
                {
                	var rLocation:Number = key.search(/__r/i);
                	if(rLocation > -1)
                	{
                		var relationship:String = key.substr(0,rLocation+3);
                		if(key == relationship)
                			continue;
                		var fieldName:String = key.substr(rLocation+3);
                		if(obj[relationship] == null)
                			obj[relationship] = new Object();
                		obj[relationship][fieldName] = obj[key]; 
                	}
                }
                var sobj:SObject = new SObject(obj);
                sobj.type = dbs.data.tableName;
                qr.records.addItem(sobj);
            }
            (dbs.data.asyncResponder as AsyncResponder).result(qr); //TG: this was .resultHandler, but I changed it to .result so we can send the context object
        }
        
        //TG: queryAfterCreate is used to automatically query the result from SFDC after the Create operation has
        //    completed. This is useful because not only do we pull down the Id of the newly created record, we also
        //    pull down any auto-filled fields.
        public override function create( sobjects:Array, callback:IResponder, queryAfterCreate:Boolean=false):void {
        	var apex:Connection=super;
        	
            if (super.loginResult && connected) 
            {
            	//TG: do we want to pull down the full record from SFDC after we create it? Default is false because that's how it comes from SFDC 
            	if(!queryAfterCreate)
            	{
            		//just do what the Flex lib normally does...
            		super.create(sobjects,callback);
            	}
            	else
            	{ 
	            	//TG: hijack the callback to grab the ID from SFDC, so we cache this record locally
	            	super.create(sobjects, new AsyncResponder( 
	                    function(result:Object):void 
	                    {
	                    	for(var i:Number=0;i<result.length;i++)
	                    	{                         
	                    		if(result[i].success)
	                    		{
			                    	//add the object type to the result object so the calling application knows what type of object to refresh
	                    			result[i]['type']=sobjects[i].type;

	                    			
		                            trace("cache this create result");
		                            //get the ID returned by SFDC, and create the local record
		                            sobjects[i].Id=result[i].id;
		                            
		                            //first, we need to get a list of fields to query from the _describe_sobject_cache table
		                            var queryStatement:SQLStatement = new SQLStatement();
		                            queryStatement.sqlConnection = syncSQL;
		                            queryStatement.text = "SELECT fieldsBytes FROM _describe_sobject_cache WHERE name = '"+sobjects[i].type+"'";
		                            queryStatement.execute();	                            
		                            
		                            var fieldsResult:Array = queryStatement.getResult().data;
		                          
		                            //
		                            if(fieldsResult && fieldsResult.length > 0)
		                            {
		                            	var fields:Object = fieldsResult[0].fieldsBytes.readObject();
		                            
		                            	//build a list of fields to select from SFDC for this object
			                            var soqlFieldList:String = "";
			                            var soqlFieldList2:String = "";
			                            for(var aField:String in fields)
			                            {
			                            	//is query length going to be more than 10000?
			                            	if(("SELECT Id,"+soqlFieldList+aField+","+" FROM "+sobjects[i].type+" WHERE Id = '"+result[i].id+"'").length<10000)
			                            	{
			                            		if(aField.toLowerCase() != "id") 
			                            			soqlFieldList+=aField + ",";
			                            	}
			                            	else
			                            	{
			                            		//query the rest...
				                            	if(("SELECT Id,"+soqlFieldList2+aField+","+" FROM "+sobjects[i].type+" WHERE Id = '"+result[i].id+"'").length<10000)
				                            	{
				                            		if(aField.toLowerCase() != "id")
			                            				soqlFieldList2+=aField + ",";
			                            		}
			                            		else
			                            		{
			                            			//TODO: make this recursive, so it's not limited to two queries...
			                            			break;
			                            		}			                            	
			                            	}
			                            }
			                            //remove the last comma
										soqlFieldList = soqlFieldList.substr(0,soqlFieldList.length-1);
			                            
			                            //assemble the soql query string
			                            var soqlQueryStatement:String = "SELECT Id, "+soqlFieldList+" FROM "+sobjects[i].type+" WHERE Id = '"+result[i].id+"'";
			                            
			                            var soqlQueryStatement2:String;
			                            if(soqlFieldList2.length > 0)
			                            {
											soqlFieldList2 = soqlFieldList2.substr(0,soqlFieldList2.length-1);
			                            	soqlQueryStatement2 = "SELECT Id, "+soqlFieldList2+" FROM "+sobjects[i].type+" WHERE Id = '"+result[i].id+"'";
			                            }
			                            
			                            //query SFDC for the complete record and then trigger the callback the user passed in
			                            query(soqlQueryStatement,new AsyncResponder(
			                            	function(queryResult:Object):void
			                            	{
			                            		//any more to query?
			                            		if(soqlFieldList2.length == 0)
			                            		{
				                            		// call back the original method passed in
			                            			callback.result(result);
			                            		}
			                            		else
			                            		{                         			
			                            			//more to do...
						                            query(soqlQueryStatement2,new AsyncResponder(
						                            	function(queryResult2:Object):void
						                            	{
					                            			callback.result(result);
						                            	},
						                            	function(queryResult2:Object):void
						                            	{
						                            		//the create worked okay, but the query failed, so the local data will be out of sync...
						                            		//maybe not the biggest deal in the world, so just return the create result
						                            		trace("Create Query Error: "+queryResult2.faultstring);
						                            		callback.result(result);	
						                            	}
						                            ),false);	
			                            		}         		
			                            	},
			                            	function(queryResult:Object):void
			                            	{
			                            		//the create worked okay, but the query failed, so the local data will be out of sync...
			                            		//maybe not the biggest deal in the world, so just return the create result
			                            		trace("Create Query Error: "+queryResult.fault.faultString);
			                            		callback.result(result);	
			                            	}
			                            ),false);
			                            
		                            }
		                            else
		                            {
		                            	//no fields to query from SFDC...dunno what happened, so just finish up and act like nothing happened.
		                            	trace("no fields to query from SFDC");
		                            	callback.result(result);	
		                            }
		    	                }
		    	                else
		    	                {
		    	                	callback.fault(result);	
		    	                }
	                    	}
	                        //callback.result(result);         // call back the original method passed in
	                    }, 
	                    function (info:Object) :void { 
	                        callback.fault(info);     // incase this was passed also
	                    }  
	                ));  
           		}
            } 
            else 
            { 
                // we are offline or not yet logged in
                if (!connected) { logger.debug( 'create made while offline'); }
                else if ( ! super.loginResult ) { logger.debug('user not yet logged in'); }
                
                if ( !syncSQL) { logger.debug("no open database to store into"); return }       
                
                //use a separate Array for the return object, so we can add data to it without messing up the SObject
                var offlineResults:Array = new Array();
                 
                if (sobjects.length > 0) {
					if (tableExists(sobjects[0].type)) { 
                    	
                    	
                    	
                    	for( var j:int=0; j<sobjects.length; j++ ) { 
                        	// toss objects in
                        	sobjects[j].Id = NEW_RECORD_TEMP_ID_PREFIX + UIDUtil.createUID();   // must be unique to the db
        					sobjects[j].id = sobjects[j].Id;
                        	syncSQL.begin();
                        	var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL, sobjects[j]);
                        	// create the insert statement
                       	 	dbStatement.text = buildInsertTableStatement(sobjects[j]);
                        	// write record to table ( assumes table exists)
                        	logger.debug(dbStatement.text);
                        	//trace(dbStatement.text);
                        	dbStatement.execute();
                
                        	var insertOfflineCreate:SQLStatementExt = new SQLStatementExt(syncSQL);
                        	insertOfflineCreate.text = "insert into " + OFFLINE_CREATES_TABLE + " (table_name, record_id, sobject) values (:table_name, :record_id, :sobject)";
                        	insertOfflineCreate.parameters[":table_name"] = sobjects[j].type;
                        	insertOfflineCreate.parameters[":record_id"] = sobjects[j].Id;
                            insertOfflineCreate.parameters[":sobject"] = serializeObject(sobjects[j]);
                        	logger.debug(insertOfflineCreate.text);
                        	insertOfflineCreate.execute();
                        	syncSQL.commit();
							
							var newSaveResult:SaveResult = new SaveResult();
							newSaveResult.success=true;
							newSaveResult.Id=sobjects[j].Id;
							newSaveResult.id=sobjects[j].Id;
							newSaveResult.errors=null;
							newSaveResult.type=sobjects[j].type;
							offlineResults.push(newSaveResult);
							
							//offlineResults.push(SaveResult({success:true, Id:sobjects[j].Id, id:sobjects[j].id,errors:null, type:sobjects[j].type}));
							//sobjects[j].success=true; //this borks SQLite... no column...                        
                        	dispatchEvent(new Event("updateSyncingOfflineCreates"));
                        	
        				}
        			}
                }
                
                // todo: return something more meaningful, but what?
                //(callback as AsyncResponder).resultHandler([{type:sobjects[0].type,message: OFFLINE_CREATE_SUCCEEDED}]);
                (callback as AsyncResponder).resultHandler(offlineResults);
            }
        }
        
        override public function update(sobjects:Array, callback:IResponder):void
        {
             logger.debug('updating ' + ObjectUtil.toString(sobjects));
             var apex:Connection=super;callback
        
             if (super.loginResult && connected) 
             {
             	//online 
				super.update(sobjects,new AsyncResponder( 
	                    function(result:Object):void 
	                    {  
			                //TG: cache the data locally too
			                //I thought of adding a switch to update so data isn't always cached locally, but I can't think of any reason to do so...
			                //may as well keep the local data in sync with the remote data. 
			                if ( !syncSQL) { logger.debug("no open database to store into"); return }        
			                if (result.length > 0) 
			                {
			                    for( var i:int=0; i<result.length; i++ ) 
			                    {
			                    	//add type info from sobject to result so the responder has it
			                    	result[i].type = sobjects[i].type;
			                    	
			                   		if(result[i].success)
                  					{
				                    	try
				                    	{
					                        syncSQL.begin();
					                        var dbCacheStatement:SQLStatementExt = new SQLStatementExt(syncSQL, sobjects[i]);
					                        // create the update statement
					                        dbCacheStatement.text = buildUpdateTableStatement(sobjects[i]);
					                        // write record to table ( assumes table exists)
					                        logger.debug(dbCacheStatement.text);
					                        dbCacheStatement.execute();  
					                        
					                        
					                        syncSQL.commit();
				                     	}
				                        catch(e:SQLError)
				            			{
				            				if(e != null && e.hasOwnProperty("message") && e.message != null)
				            					Alert.show(e.message);
				            				else
				            					Alert.show(e.toString(),e.message);
				            				
				            			}
                  					}
                              		else
                			  		{
			                  			trace("update not successful, not caching");	
                  					}
                  					
			                    }
			                
                  			}
                  			callback.result(result);

	                    },function (info:Object) :void { 
	                        callback.fault(info);     // incase this was passed also
	                    }  
					));  
	                    
             } 
             else 
             { 
             	//offline
                // we are offline or not yet logged in
                if (!connected) { logger.debug( 'create made while offline'); }
                else if ( ! super.loginResult ) { logger.debug('user not yet logged in'); }
                
                if ( !syncSQL) { logger.debug("no open database to store into"); return }   
                
                                
                //use a separate Array for the return object, so we can add data to it without messing up the SObject
                var offlineResults:Array = new Array();

                     
                if (sobjects.length > 0) {
                    for( var j:int=0; j<sobjects.length; j++ ) 
                    {
                    	try
                    	{
	                        syncSQL.begin();
	                        var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL, sobjects[j]);
	                        // create the update statement
	                        dbStatement.text = buildUpdateTableStatement(sobjects[j]);
	                        // write record to table ( assumes table exists)
	                        logger.debug(dbStatement.text);
	                        dbStatement.execute();
	        
	                        // do not add this to the OFFLINE_UPDATES_TABLE if this is a new record
	                        if ((sobjects[j].Id as String).indexOf(NEW_RECORD_TEMP_ID_PREFIX) != 0) {
								var insertOfflineUpdate:SQLStatementExt = new SQLStatementExt(syncSQL);
								insertOfflineUpdate.text = "insert into " + OFFLINE_UPDATES_TABLE + " (table_name, record_id, sobject) values (:table_name, :record_id, :sobject)";
								insertOfflineUpdate.parameters[":table_name"] = sobjects[j].type;
								insertOfflineUpdate.parameters[":record_id"] = sobjects[j].Id;
								insertOfflineUpdate.parameters[":sobject"] = serializeObject(sobjects[j]);
								logger.debug(insertOfflineUpdate.text);
								insertOfflineUpdate.execute();
	                        }
	                        
	                        syncSQL.commit();
	                        
	                       	var newSaveResult:SaveResult = new SaveResult();
							newSaveResult.success=true;
							newSaveResult.Id=sobjects[j].Id;
							newSaveResult.id=sobjects[j].Id;
							newSaveResult.errors=null;
							newSaveResult.type=sobjects[j].type;
							offlineResults.push(newSaveResult);
	                        
	                        //offlineResults.push(SaveResult({success:true, Id:sobjects[j].Id, id:sobjects[j].id,errors:null, type:sobjects[j].type}));
	                        
	                        dispatchEvent(new Event("updateSyncingOfflineUpdates"));
	                    }
	                    catch(e:SQLError)
            			{
            				if(e != null && e.hasOwnProperty("message") && e.message != null)
            					Alert.show(e.message)
            				else
            					Alert.show(e.toString(),e.message);
            			}
                    }
                }
                
                // todo: return something more meaningful, but what?
                //(callback as AsyncResponder).resultHandler({message: OFFLINE_UPDATE_SUCCEEDED });
                //(callback as AsyncResponder).resultHandler([{type:sobjects[0].type,message: OFFLINE_UPDATE_SUCCEEDED}]);
                (callback as AsyncResponder).resultHandler(offlineResults);
                
                
            }
        }
        
        
        /**
        * todo: implement cascading deletes to avoid problems when syncing child records for which their parent has been removed
        * 
        */        
		override public function deleteIds(ids:Array, callback:IResponder):void {
			if (super.loginResult && connected) 
			{
				//call the super delete 
            	super.deleteIds(ids,callback);
            	

        		//list the tables in the db
        	    syncSQL.loadSchema(); 
				var schemaResult:SQLSchemaResult = syncSQL.getSchemaResult();
				
				for each (var table:SQLTableSchema in schemaResult.tables)
				{
  					trace(table.name);
  					if(table.name != "_describe_sobject_cache")
  					{ 
	  					for( var j:int=0; j< ids.length; j++ ) 
	            		{
	                      	//try to delete locally too... we don't know what table this Id references, so try all of them...
			            	try
	        				{
			              		var tablename:String;
		              			syncSQL.begin();	
				           		var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
				           		if(table.name == "_offline_creates" && table.name == "_offline_updates" && table.name == "_offline_deletes")
				           		{
				           			dbStatement.text = "delete from " + table.name + " where record_id = :Id";
				           		}
				           		else
				           		{
					            	dbStatement.text = "delete from " + table.name + " where Id = :Id";
					            }
					            dbStatement.parameters[":Id"] = ids[j];
					            logger.debug(dbStatement.text);
					            dbStatement.execute();
					              
					            syncSQL.commit();
					        }
					        catch(e:SQLError)
		        			{
		        				trace("Delete exception Caught")
		        				//no great surprise...	
		        			}	
				       	}
					}
				}     
	        
 
          	} 
          	else {
            	// we are offline or not yet logged in
            	if (!connected) {
              		logger.debug( 'delete made while offline');
            	} else if ( ! super.loginResult ) {
              		logger.debug('user not yet logged in');
            	}
                
            	if ( !syncSQL) {
              		logger.debug("no open database to store into");
              		return;
            	}
            
            	if (ids.length == 0) {
              		logger.debug("no objects to delete");
              		return;
            	}
            
            	for(j=0; j< ids.length; j++ ) {
  
              		syncSQL.begin();
              
              		// if we are deleting a new record, just remove it from the OFFLINE_CREATES_TABLE
	              	if ((ids[j] as String).indexOf(NEW_RECORD_TEMP_ID_PREFIX) == 0) {
	                	var findTableName:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	findTableName.text = "select table_name from " + OFFLINE_CREATES_TABLE + " where record_id = :Id";
	                	findTableName.parameters[":Id"] = ids[j];
	                	logger.debug(findTableName.text);
	                	findTableName.execute();
	                
	                	var result:SQLResult = findTableName.getResult();
	                	tablename = result.data[0]["table_name"];
	                
	                	var deleteOfflineCreate:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	deleteOfflineCreate.text = "delete from " + OFFLINE_CREATES_TABLE + " where record_id = :Id";
	                	deleteOfflineCreate.parameters[":Id"] = ids[j];
	                	logger.debug(deleteOfflineCreate.text);
	                	deleteOfflineCreate.execute();
	              	} else {
	                	var keyPrefix:String = (ids[j] as String).substr(0,3);
	                	tablename = getCachedDescribeSObjectResultByKeyPrefix(keyPrefix).name;
	  
	                	var insertOfflineUpdate:SQLStatementExt = new SQLStatementExt(syncSQL);
	                	insertOfflineUpdate.text = "insert into " + OFFLINE_DELETES_TABLE + " (record_id) values (:Id)";
	                	insertOfflineUpdate.parameters[":Id"] = ids[j];
	                	logger.debug(insertOfflineUpdate.text);
	                	insertOfflineUpdate.execute();
	              	}
	              
	              	// for good measure remove any possible references to this object in the OFFLINE_UPDATES_TABLE
	              	var deleteOfflineUpdates:SQLStatementExt = new SQLStatementExt(syncSQL);
	              	deleteOfflineUpdates.text = "delete from " + OFFLINE_UPDATES_TABLE + " where record_id = :Id";
	              	deleteOfflineUpdates.parameters[":Id"] = ids[j];
	              	logger.debug(deleteOfflineUpdates.text);
	              	deleteOfflineUpdates.execute();
	              
	              	logger.debug("deleting " + ids[j] + " from " + tablename);
	              
	              	dbStatement = new SQLStatementExt(syncSQL);
	              	dbStatement.text = "delete from " + tablename + " where Id = :Id";
	              	dbStatement.parameters[":Id"] = ids[j];
	              	logger.debug(dbStatement.text);
	              	dbStatement.execute();
	              
	              	syncSQL.commit();
	              
	              	dispatchEvent(new Event("updateSyncingOfflineDeletes"));
	        	}
	
	            
	            // todo: return something more meaningful, but what?
	            (callback as AsyncResponder).resultHandler([{message: 'the delete succeeded offline'}]);
			}
        }
        
        override public function describeSObjects(types:Array,callback:IResponder):void {
        	if ( super.loginResult && connected) {
				logger.debug('describeSObject - online'); 
            	/* call the super query, but hijack the callback, 
             	* cache the query, then proceed with the original applicaiton supplied 
             	* query callback
             	*/
             	super.describeSObjects(types, new AsyncResponder( 
              		function(dr:Array):void {
              			for each (var d:DescribeSObjectResult in dr) {
	                		logger.debug("cache this describeSObject result");
	                		if (d && d.name) {
	                			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
                          		dbStatement.text = buildCreateTableStatement(d);
	                			dbStatement.execute();
	                			cacheDescribeSObjectResult(d);
	                		}
	                	}
                		callback.result(dr); // call back the original method passed in
              		},
              		function(event:com.salesforce.results.Fault):void {
			            trace('handleFaultDescribes ' + ObjectUtil.toString(event));
           				if(event != null && event.hasOwnProperty("faultString") && event.faultString != null)
            				Alert.show(event.faultString,"Error");
            			else
            				Alert.show('handleFaultDescribes ' + ObjectUtil.toString(event));
        			})
            	);
             	 
             } else {
                logger.debug('describeSObject - offline');
                /* 
                 * here is where the offline fun begins, need to take the SOQL and build one or more
                 * SQL queries that we can use to pull from the sqlite offline db
                 * ? keep it simple , single table 
                 */
                if (!connected) {
                  	logger.debug( 'query made while offline');
                } else if ( ! super.loginResult ) {
                  	logger.debug('query made after unsuccessful login');
                }
                
                if ( !syncSQL) {
                  	logger.debug("no open database to query()");
                  	return;
                }
                //MM TODO: ADD LOCAL RESULT
                for each (var type:String in types) {
                	callback.result(getCachedDescribeSObjectResultByType(type));
                }
                //callback.result(getCachedDescribeSObjectResultByType(type));
			}             
        }        
        
		override public function describeSObject(type:String, callback:IResponder):void {
			if ( super.loginResult && connected) {
				logger.debug('describeSObject - online'); 
            	/* call the super query, but hijack the callback, 
             	* cache the query, then proceed with the original applicaiton supplied 
             	* query callback
             	*/             
            	super.describeSObject(type, new AsyncResponder( 
              		function(d:DescribeSObjectResult):void {
                		logger.debug("cache this describeSObject result");
                		cacheDescribeSObjectResult(d);
                		callback.result(d); // call back the original method passed in
              		})
            	);
            } else {
                logger.debug('describeSObject - offline');
                /* 
                 * here is where the offline fun begins, need to take the SOQL and build one or more
                 * SQL queries that we can use to pull from the sqlite offline db
                 * ? keep it simple , single table 
                 */
                if (!connected) {
                  	logger.debug( 'query made while offline');
                } else if ( ! super.loginResult ) {
                  	logger.debug('query made after unsuccessful login');
                }
                
                if ( !syncSQL) {
                  	logger.debug("no open database to query()");
                  	return;
                }
                
                callback.result(getCachedDescribeSObjectResultByType(type));
			}
        }
        
        private function getCachedDescribeSObjectResultByType(type:String):DescribeSObjectResult {
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
            
          	dbStatement.text = "select * from " + DESCRIBE_SOBJECT_TABLE + " where name = :name";
          	logger.debug(dbStatement.text);
          	dbStatement.parameters[":name"] = type;
          	dbStatement.itemClass = DescribeSObjectResult;
          	dbStatement.execute();
          
          	var result:SQLResult = dbStatement.getResult();
          
          	if ((result != null) && (result.data != null) && (result.data.length > 0)) {
          		var dsr:DescribeSObjectResult = result.data[0];
          		
          		//TG deserialize:
          		dsr.fields = dsr.fieldsBytes.readObject();
          		dsr.childRelationships = dsr.childRelationshipsBytes.readObject();
          		dsr.recordTypeInfos = dsr.recordTypeInfosBytes.readObject();
          		
				if (dsr.fieldMap == null) {
					dsr.fieldMap = {};
					for each (var f:Object in dsr.fields) 
					{
						dsr.fieldMap[f.name] = f;
					}
				}          		
				return dsr;
          	}
          
          	return null;
        }
        
        private function getCachedDescribeSObjectResultByKeyPrefix(keyPrefix:String):DescribeSObjectResult {
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
          
          	dbStatement.text = "select * from " + DESCRIBE_SOBJECT_TABLE + " where keyPrefix = :keyPrefix";
          	logger.debug(dbStatement.text);
          	dbStatement.parameters[":keyPrefix"] = keyPrefix;
          	dbStatement.itemClass = DescribeSObjectResult;
          	dbStatement.execute();
          
          	var result:SQLResult = dbStatement.getResult();
          	if ((result != null) && (result.data != null) && (result.data.length > 0)) 
          	{
            	var dsr:DescribeSObjectResult = result.data[0];
          		
          		//TG deserialize:
          		dsr.fields = dsr.fieldsBytes.readObject();
          		dsr.childRelationships = dsr.childRelationshipsBytes.readObject();
          		dsr.recordTypeInfos = dsr.recordTypeInfosBytes.readObject();	
            	
            	return dsr;
          	}
          
          	return null;
        }
        
        private function cacheDescribeSObjectResult(d:DescribeSObjectResult):void 
        {
        	trace("CACHE DESCRIBE SOBJECT");
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
          
          	if (getCachedDescribeSObjectResultByType(d.name) != null) {
	            // update
            	dbStatement.text = "update " + DESCRIBE_SOBJECT_TABLE + " set activateable = :activateable, childRelationshipsBytes = :childRelationshipsBytes, " +
              		"createable = :createable, custom = :custom, deletable = :deletable, fieldsBytes = :fieldsBytes, keyPrefix = :keyPrefix, layoutable = :layoutable, " +
              		"label = :label, labelPlural = :labelPlural, mergeable = :mergeable, queryable = :queryable, recordTypeInfosBytes = :recordTypeInfosBytes, " +
              		"replicateable = :replicateable, retrieveable = :retrieveable, searchable = :searchable, undeletable = :undeletable, " +
              		"updateable = :updateable, urlDetail = :urlDetail, urlEdit = :urlEdit, urlNew = :urlNew  where name = :name";
          	} else {
            	// insert
            	dbStatement.text = "insert into " + DESCRIBE_SOBJECT_TABLE + " (activateable, childRelationshipsBytes, createable, custom, deletable, fieldsBytes, " +
              		"keyPrefix, layoutable, label, labelPlural, mergeable, name, queryable, recordTypeInfosBytes, replicateable, retrieveable, " +
              		"searchable, undeletable, updateable, urlDetail, urlEdit, urlNew) values (:activateable, :childRelationshipsBytes, :createable, :custom, :deletable, :fieldsBytes, " +
              		":keyPrefix, :layoutable, :label, :labelPlural, :mergeable, :name, :queryable, :recordTypeInfosBytes, :replicateable, :retrieveable, " +
              		":searchable, :undeletable, :updateable, :urlDetail, :urlEdit, :urlNew)";
          	}

          	
          	//TG: OSX AIR has a bug that makes the app crash about 80% of the time when you try to deserialize objects from the SQLite database.
          	//    To fix that, we're just serializing the data ourselves, and storing it in a BLOB for childRelationships, fieldsBytes, and recordTypeInfos.

         	dbStatement.parameters[":activateable"] = d.activateable;
          	
          	//serialize childRelationships
          	dbStatement.parameters[":childRelationshipsBytes"] = serializeObject(d.childRelationships);         	
          	dbStatement.parameters[":createable"] = d.createable;
          	dbStatement.parameters[":custom"] = d.custom;
          	dbStatement.parameters[":deletable"] = d.deletable;          	
          	//serialize fields
          	dbStatement.parameters[":fieldsBytes"] = serializeObject(d.fields);        	
          	dbStatement.parameters[":keyPrefix"] = d.keyPrefix;
          	dbStatement.parameters[":layoutable"] = d.layoutable;
          	dbStatement.parameters[":label"] = d.label;
          	dbStatement.parameters[":labelPlural"] = d.labelPlural;
          	dbStatement.parameters[":mergeable"] = d.mergeable;
          	dbStatement.parameters[":name"] = d.name;
          	dbStatement.parameters[":queryable"] = d.queryable;	
          	//serialize recordTypeInfos
          	dbStatement.parameters[":recordTypeInfosBytes"] = serializeObject(d.recordTypeInfos);         	
          	dbStatement.parameters[":replicateable"] = d.replicateable;
          	dbStatement.parameters[":retrieveable"] = d.retrieveable;
          	dbStatement.parameters[":searchable"] = d.searchable;
          	dbStatement.parameters[":undeletable"] = d.undeletable;
          	dbStatement.parameters[":updateable"] = d.updateable;
          	dbStatement.parameters[":urlDetail"] = d.urlDetail;
          	dbStatement.parameters[":urlEdit"] = d.urlEdit;
          	dbStatement.parameters[":urlNew"] = d.urlNew;
          	
          	logger.debug(dbStatement.text);
          
       		dbStatement.execute();

        }

		//serialize an object...
		//this is necessary because with the OSX version of AIR 1.5, apps will crash when you try to deserialize an object
		//from the SQLite database. 
		public function serializeObject(someObject:Object):ByteArray
		{
			var objectBytes:ByteArray = new ByteArray();
          	objectBytes.writeObject(someObject);
          	return objectBytes;
		}
		
		//deserialize an object
		//It's only one line, so it's not really needed, but it's the counterpart to the serializeObject method.
		public function deserializeObject(someByteArray:ByteArray):Object
		{
			return someByteArray.readObject();	
		}

        // NETWORK DETECTION
        private var connMonitor:URLMonitor = null; 

        public function set connected(_connected:Boolean):void {
          	this._connected = _connected;
          	dispatchEvent(new Event("connectedChanged"));
        }
        
        [Bindable(event="connectedChanged")] public function get connected():Boolean {
          	return _connected;
        }

        /*
         * todo: when the Connection's serverUrl changes we should change the connMonitor's url
         */
        private function initNetListener():void {
            logger.debug("init net service connection monitor for: " + _defaultServerUrl);
            
            connMonitor = new URLMonitor( new URLRequest(_defaultServerUrl), [200,202,204,205,206,400,405]);
            connMonitor.addEventListener( StatusEvent.STATUS, statusChanged );
            connMonitor.addEventListener( IOErrorEvent.IO_ERROR,  ioError);
            connMonitor.start();

            connected = connMonitor.available;
        }

		private function canSync():Boolean {
            if (super.loginResult == null || super.loginResult.sessionId == null || super.loginResult.sessionId.length < 1 || !connected) {
            	//If we are connected but not yet logged in, we should try to login
            	if (connected == true && this.loginRequest != null && autoLogin) {
            		login(this.loginRequest);
            		return false;
            	} else {
	                logger.debug('we are not online or not logged in so do not try this');
    	            return false;
    	        }
            }
          	if ( (syncSQL == null || !syncSQL.connected) || (sql == null || !sql.connected) )  {
                logger.debug('database is not open yet ' + syncSQL);
                finishedSyncingOfflineCreates();
                return false; 
            }   
			return true;
		}
        private function statusChanged(event:StatusEvent):void {
        	
            logger.debug("network status changed; url = " + connMonitor.urlRequest.url);
            
            // use event.currentTarget rather than connMonitor as the event is still bubbling when we get here
            var _mon:URLMonitor = event.currentTarget as URLMonitor;
            
            connected = _mon.available;
            
            if (_mon && _mon.running && _mon.available ) {            
                // we are connected
                logger.debug(" Network is connected.");
                dispatchEvent(new NetworkStatusChangeEvent(NetworkStatusChangeEvent.NETWORK_STATUS_CHANGE_EVENT, true ));
                if(autoSyncEnabled)
                	autoSync();
            } else {                    // going off the grid 
                logger.debug( event.code); 
                logger.debug("Network is disconnected :"+event.code);
                dispatchEvent(new NetworkStatusChangeEvent(NetworkStatusChangeEvent.NETWORK_STATUS_CHANGE_EVENT, false ));
            }
            if (inited == false) {
            	inited = true;
            	dispatchEvent(new Event("initComplete"));
            }
        }
        
        private function ioError(event:IOErrorEvent):void {
            // We may be disonnected since we had an io error
            logger.debug( event.text );
            dispatchEvent(new NetworkStatusChangeEvent(NetworkStatusChangeEvent.NETWORK_STATUS_CHANGE_EVENT, connected));       
        }

        public function forceNetworkStatusChange(available:Boolean):void {
            connMonitor.available = available;
            dispatchEvent(new NetworkStatusChangeEvent(NetworkStatusChangeEvent.NETWORK_STATUS_CHANGE_EVENT, available));
        }
    
        
        public function getNumberOfflineCreates():Number {
          	return getNumberRowsInTable(OFFLINE_CREATES_TABLE);
        }

        public function getNumberOfflineUpdates():Number {
          	return getNumberRowsInTable(OFFLINE_UPDATES_TABLE);
        }
        
        public function getNumberOfflineDeletes():Number {
          	return getNumberRowsInTable(OFFLINE_DELETES_TABLE);
        }
        
        private function getNumberRowsInTable(table:String):int {
          	if (!syncSQL) {
            	return 0;
          	}
          
          	try {
            	var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
            	dbStatement.text = "select count() from '" + table + "'";
            	dbStatement.execute();
            	var result:SQLResult = dbStatement.getResult();
            
            	if ((result != null) && (result.data != null) && (result.data.length > 0)) {
              		return result.data[0]["count()"];
            	}
          	} catch (e:Error) {
            	logger.error(e.message);
          	}
          
          	return 0;
        }
               
        public function SQLiteDatabaseExists(dbName:String):Boolean
        {
			var file:File = File.applicationStorageDirectory.resolvePath(dbName+ ".db");
        	
        	return file.exists;	
        }
             
        //close and re-open any database files
        //this is called after we create the database schema so both the async and sync connections
        //work. If we don't do this, only the async connection will work.  
        public function RefreshDatabase(dbName:String,encryptionKey:ByteArray=null):void
        {
        	openSQLiteDatabase(dbName,false,encryptionKey);	
        }
               
        //TG: modified method to include encryptionKey. If null (default), no encryption will be used
        //Note: the "sync" parameter isn't actually used in this method
        private function openSQLiteDatabase( dbName :String, sync:Boolean=false, encryptionKey:ByteArray=null):void 
        {      
            /* do we need this?*/
            //TG: Yes we do. We want to close and re-open the database connection after we create the schema
            //    because the schema is created with the async connection, and after it is created, the sync
            //    connection won't work anymore because the schema will have changed.  RefreshDatabase is the
            //    public method that does this.
            if (openDatabases[dbName])
            {
              sql.close();
              openDatabases[dbName] = false;
            }
            
           
            // DATABASE OPEN done after we are logged in so we can use a named database
            logger.debug('opening SQLLiteDatabase: ' + dbName);
            
            var file:File = File.applicationStorageDirectory.resolvePath(dbName+ ".db");
            logger.debug('db filename = ' + file.nativePath);        
            
            sql = new SQLConnection();
            
            sql.addEventListener(SQLErrorEvent.ERROR, 
                function (event:SQLErrorEvent):void    {
                    // logger.debug("missing db file " + dbFileName);
                    throw("could not open db file " + file.nativePath);
                });

			//TG: Note, we need to do the sync open before the async open because we can't guarantee
			//    that the async will be completed by the time the sync open is called (i.e. the database
			//    won't exist. This seems to mainly be a problem when using encryption. Alterately, we could
			//    use the openAsync responder, but re-ordering the two statements works fine.
            
            syncSQL = new SQLConnection();
            try
            {

	            if(encryptionKey != null)
	            	syncSQL.open(file, SQLMode.CREATE, false, 1024, encryptionKey);
	            else
	            	syncSQL.open(file);
            }
            catch(e:SQLError)
            {
            	if(e != null && e.hasOwnProperty("message") && e.message != null)
            		Alert.show(e.message,"SQL Error");
            	else
            		Alert.show(e.toString(),e.message);
            }
            
            try
            {
	            //open a second connection for asynchronous calls            
	            if(encryptionKey != null)
	            	sql.openAsync(file, SQLMode.CREATE, null, false, 1024, encryptionKey);
	            else
	            	sql.openAsync(file);
            }
            catch(e:SQLError)
            {
            	if(e != null && e.hasOwnProperty("message") && e.message != null)
            		Alert.show(e.message,"SQL Error");
            	else
            		Alert.show(e.toString(),e.message);
            }
            
            if( !sql.connected && !syncSQL.connected )
            {
            	Alert.show( 'There was an error connecting to the database' );
            	return;
            }
            
            syncSQL.addEventListener(SQLEvent.COMMIT, handleDBCommit);
            
            openDatabases[dbName] = true;
            
            var createOfflineCreatesTable:SQLStatementExt = new SQLStatementExt(syncSQL);
            createOfflineCreatesTable.text = "create table if not exists " + OFFLINE_CREATES_TABLE + " (id integer primary key autoincrement, table_name string, record_id string, sobject blob)";
            createOfflineCreatesTable.execute();
            
            var createOfflineUpdatesTable:SQLStatementExt = new SQLStatementExt(syncSQL);
            createOfflineUpdatesTable.text = "create table if not exists " + OFFLINE_UPDATES_TABLE + " (id integer primary key autoincrement, table_name string, record_id string, sobject blob)";
            createOfflineUpdatesTable.execute();
            
            var createOfflineDeletesTable:SQLStatementExt = new SQLStatementExt(syncSQL);
            createOfflineDeletesTable.text = "create table if not exists " + OFFLINE_DELETES_TABLE + " (id integer primary key autoincrement, record_id string)";
            createOfflineDeletesTable.execute();
            
            // try to create the cache table in case it doesn't exist
            var createDescribeSObjectCacheTable:SQLStatementExt = new SQLStatementExt(syncSQL);
            createDescribeSObjectCacheTable.text = "create table if not exists " + DESCRIBE_SOBJECT_TABLE + 
              " (id integer primary key autoincrement, activateable boolean, childRelationships text, childRelationshipsBytes blob, createable boolean, custom boolean, " +
              " deletable boolean, fields text, fieldsBytes blob, keyPrefix text, layoutable boolean, label text, labelPlural text, mergeable boolean, name text, queryable boolean, " +
              " recordTypeInfos text, recordTypeInfosBytes blob, replicateable boolean, retrieveable boolean, searchable boolean, undeletable boolean, updateable boolean, urlDetail text, " +
              " urlEdit text, urlNew text)";
            createDescribeSObjectCacheTable.execute();
        }

    	/** 
		 * create the table to track temp PK mapping to SFDC PKs
		 **/
		private function createPKMappingTable():void
		{
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
			dbStatement.text = "CREATE TABLE IF NOT EXISTS _pk_map (id integer primary key autoincrement, tempPk string, sfdcPk string)"; 
			
			try {
				dbStatement.execute();
			} catch (e:Error) {
				// ignore this since there may be tables which don't relate to the item
			}
			
		}
		
		
        private function autoInsertNewRecords() :void {
            logger.debug("autoInsertNewRecords");
			
			//create the PK mapping table if it doesn't exists
			createPKMappingTable();
			
            //reset pk mapping
            offlineToOnlinePK = new Object();
            
            dispatchEvent(new Event("startSyncingOfflineCreates"));
            
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
            dbStatement.text = "select * from " + OFFLINE_CREATES_TABLE + "";
            logger.debug(dbStatement.text);
            dbStatement.execute();
            
            var recordsToCreate:SQLResult = dbStatement.getResult();
            
            if ((recordsToCreate == null) || (recordsToCreate.data == null) || (recordsToCreate.data.length == 0)) {
				        logger.debug('no records to add');
              	finishedSyncingOfflineCreates();
              	return ;
            }
            
            logger.debug('found new to insert ' + recordsToCreate.data.length);
			
			//pass along an array collection of rows from the OFFLINE_CREATES_TABLE
			var pendingNewRecords:ArrayCollection = new ArrayCollection(recordsToCreate.data);
			createNewRecord(pendingNewRecords.getItemAt(0), pendingNewRecords);
		}
		
		//pendingNewRecors is the array of records from the OFFLINE_CREATES_TABLE
		//item is one object from that same array...I don't know why we don't just pass an index.
		private function createNewRecord(item:Object, pendingNewRecords:ArrayCollection):void {
			var canCreateNow:Boolean = true;
			    
			//TG: check if we can create this record now, or if there are children that must be recursed...
			for each (var o:Object in pendingNewRecords) {
				if (o.table_name != item.table_name) {
					
					//check if there's an "xxxxId" formatted record, like AccountId on the Contact object
			    	var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
              		dbStatement.text = "select count() as count from '" + item.table_name + "' where " + o.table_name + "Id = :parentId AND Id=:Id"; 
              		dbStatement.parameters[":parentId"] = o.record_id;
              		dbStatement.parameters[":Id"] = item.record_id;
              		logger.debug(dbStatement.text);
              		
              		try {
                		dbStatement.execute();
              		} catch (e:Error) {
                		// ignore this since there may be tables which don't relate to the item
              		}
              
              		var result:SQLResult = dbStatement.getResult();
            
              		if ((result != null) && (result.data != null) && (result.data.length > 0) && (result.data[0]['count']>0)) {
                		// there are children for this item
                		canCreateNow = false;
              		}
              		
              		if(canCreateNow)
              		{
	              		
	              		//check if there's an "xxxx__c" formatted record, like Foo__c.Bar__c, relating Bar__c to Foo__c 
				    	dbStatement = new SQLStatementExt(syncSQL);
	              		dbStatement.text = "select count() as count from '" + item.table_name + "' where " + o.table_name + " = :parentId AND Id=:Id"; 
	              		dbStatement.parameters[":parentId"] = o.record_id;
	              		dbStatement.parameters[":Id"] = item.record_id;
	              		logger.debug(dbStatement.text);
	              		
	              		try {
	                		dbStatement.execute();
	              		} catch (e:Error) {
	                		// ignore this since there may be tables which don't relate to the item
	              		}
	              
	              		result = dbStatement.getResult();
	            
	              		if ((result != null) && (result.data != null) && (result.data.length > 0) && (result.data[0]['count']>0)) {
	                		// there are children for this item
	                		canCreateNow = false;
	              		}
              		}
              		
              		//check for other fields that contain "_new" Ids... could be named anything, like Prospect_Account__c
              		if(canCreateNow)
              		{
	              		
	              		//load the table schema
	              		syncConnection.loadSchema(SQLTableSchema,item.table_name);
			 			var schemaResult:SQLSchemaResult = syncConnection.getSchemaResult();
			 			
			 			for each(var columnSchema:SQLColumnSchema in schemaResult.tables[0].columns)
			 			{
			 				//relationships are stored with VARCHAR(18) so just check those
			 				if(columnSchema.dataType == 'VARCHAR(18)' && columnSchema.name.toLowerCase() != 'id')	
			 				{
			 					dbStatement = new SQLStatementExt(syncSQL);
	              				dbStatement.text = "select count() as count from '" + item.table_name + "' where " + columnSchema.name + " = :parentId AND Id=:Id"; 
	              				dbStatement.parameters[":parentId"] = o.record_id;
	              				dbStatement.parameters[":Id"] = item.record_id;
			              		logger.debug(dbStatement.text);
	              			
	              				try {
	                				dbStatement.execute();
	              				} catch (e:Error) {
	                				// ignore this since there may be tables which don't relate to the item
	              				}
	              
	              				result = dbStatement.getResult();
	            
	              				if ((result != null) && (result.data != null) && (result.data.length > 0) && (result.data[0]['count']>0)) 
	              				{
		                			// there are children for this item
	                				canCreateNow = false;
	              				}
			 				}
			 			}
              		}
			              		
				}
			}
			    
			logger.debug(item.table_name + " canCreateNow = " + canCreateNow);
			    
			if (canCreateNow) {
			      doCreatePendingRecord(item, pendingNewRecords);
			} else {
				recurseNextPendingRecord(item, pendingNewRecords, false);
			}
		}
			  
		private function doCreatePendingRecord(item:Object, pendingNewRecords:Object):void {
			logger.debug('sync ' + ObjectUtil.toString(item));
            
          	var stmt:SQLStatementExt = new SQLStatementExt(syncSQL);
          	stmt.text = "select * from `" + item.table_name + "` where id = '" + item.record_id + "'";
          	stmt.execute();
          
          	var result:SQLResult = stmt.getResult();
          
          	if (result.data == null) {
				logger.debug("object disappeared from cache remove it's reference " + OFFLINE_CREATES_TABLE + "");
              	// todo remove the reference
				// TG: sigh... adding...
				var deleteStmt:SQLStatementExt = new SQLStatementExt(syncSQL);
				deleteStmt.text = "delete from `" + OFFLINE_CREATES_TABLE + "` where record_id = '" + item.record_id + "'";
				deleteStmt.execute();
				
				recurseNextPendingRecord(item, ArrayCollection(pendingNewRecords), true);
								
          	} else {
				if (result.data.length > 0) {
					//var so:SObject = new SObject(item.table_name);
					
					//TG: deserialize the SObject from the _OFFLINE_CREATES table
					//    This is necessary because otherwise we're going to end up trying to create an object
					//    with all fields from all record type page layouts for this object, rather than just the
					//    ones that make sense.
					var soData:Object = new Object;
					//var so:SObject = new SObject(item.table_name);
					var offlineSO:SObject = item.sobject.readObject();
					
					var sObjectFields:Array = offlineSO.getFields();
					soData.type = item.table_name;
					//need to remove the id from the sobject, so go ahead and recreate the object
					for(var i:Number=0;i<sObjectFields.length;i++)
					{
						if (result.data[0][sObjectFields[i]] != null) {
                  			// an id can't be specified on create (salesforce API restriction)
                  			if ((result.data[0][sObjectFields[i]] != "null") && (sObjectFields[i].toLowerCase() != "id")) {
                    			soData[sObjectFields[i]] = result.data[0][sObjectFields[i]];
                  			}
                  			
                  			//if this record references another record with a temp Id, we're going to have to replace it with the real Id
                  			//which, hopefully we have in offlineToOnlinePK at this point
							if(soData[sObjectFields[i]] is String)
							{
								soData[sObjectFields[i]] = replaceTempIdIfExists(soData[sObjectFields[i]]);
							}
							
      					}							
					}
					//var so:SObject = item.sobject.readObject();
					var so:SObject = new SObject(soData);
					
					//TG: if so is null for some reason, go ahead and populate it using the old method.
					if(so == null)
					{  
	              		for (var p:Object in result.data[0]) {
							if (result.data[0][p] != null) {
	                  			// an id can't be specified on create (salesforce API restriction)
	                  			if ((result.data[0][p] != "null") && (p != "id")) {
	                    			so[p] = result.data[0][p];
	                  			}
	               			}
	              		}
					}       
					
					       
					super.create([so], new AsyncResponder(handleResultCreateOfflineCreates, handleFaultCreateOfflineCreates, {item: item, pendingNewRecords: pendingNewRecords}));
				}
			}
		}
		
		/**
		 * Replace temp id if it exists
		 **/
		private function replaceTempIdIfExists(idToCheck:String):String
		{
			if(idToCheck.substr(0,5) == NEW_RECORD_TEMP_ID_PREFIX)
			{
				//if we have the Id in our hash map
				if(offlineToOnlinePK[idToCheck] != null)
				{
					idToCheck = offlineToOnlinePK[idToCheck];
				}
				//otherwise, see if it's in our DB cache
				else
				{
					idToCheck = findLostPk(idToCheck);	
				}
			}		
			return idToCheck;	
		}
		
		/**
		 * Search the _pk_map SQlite table for a lost SID
		 **/
		public function findLostPk(offlinePk:*):String
		{			
			//try to find the pk in the _pk_map table in SQLite
			var dbSearchStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
			dbSearchStatement.text = "SELECT sfdcPk FROM '" + PK_MAP_TABLE + "' where tempPk=:Pk LIMIT 1"; 
			dbSearchStatement.parameters[":Pk"] = offlinePk;
			logger.debug(dbSearchStatement.text);
			
			try {
				dbSearchStatement.execute();
			} catch (e:Error) {
				// ignore this since there may be tables which don't relate to the item
			}	
			
			var searchResult:SQLResult = dbSearchStatement.getResult();
			
			if ((searchResult != null) && (searchResult.data != null) && (searchResult.data.length > 0)) 
			{
				//SID found, so let's use it
				offlineToOnlinePK[offlinePk] = searchResult.data[0]['sfdcPk'];	
				return searchResult.data[0]['sfdcPk'];
			}
			else
			{
				//Not found. The relationship has been lost. Clear out the Id, so at least we don't throw an SFDC error on synch
				trace("Temporary mapping of ID to SID has failed. Relationship lost.");
				return "";
			}		
		}
		
		private function recurseNextPendingRecord(item:Object, pendingNewRecords:ArrayCollection, removeIt:Boolean):void {
			var i:int = pendingNewRecords.getItemIndex(item);
		      
		    if (removeIt) {
				pendingNewRecords.removeItemAt(i);
			} else {
		        i++;
			}
		      
		    if (pendingNewRecords.length == 0) {
		        finishedSyncingOfflineCreates();
			} else {
  		      	// if we reach the end then go back to the beginning
  		      	if (i == pendingNewRecords.length) {
  		        	i = 0;
  		      	}
		        createNewRecord(pendingNewRecords.getItemAt(i), pendingNewRecords);
			}
		}
			  
        private function handleResultCreateOfflineCreates(result:Object):void {
        	if(result[0].errors != null && result[0].errors.length > 0)
        	{
        		for(var i:Number = 0; i<result[0].errors.length; i++) 
        			Alert.show("Sync Error: "+result[0].errors[i].message);	
        	}
        	cacheOfflineToOnlinePK(result.context.item.record_id,result[0].id);
        	
			trace('handleResultCreateOfflineCreates ' + ObjectUtil.toString(result));
            // now remove the object from " + OFFLINE_CREATES_TABLE + "
            removeOfflineCreateItem(result[0].id, result.context.item, result.context.pendingNewRecords);
            
        }

        private function handleFaultCreateOfflineCreates(event:com.salesforce.results.Fault):void {
            trace('handleFaultCreateOfflineCreates ' + ObjectUtil.toString(event));
            if(event != null && event.hasOwnProperty("faultString") && event.faultString != null)
            	Alert.show(event.faultString,"Error");
            else
            	Alert.show('handleFaultCreateOfflineCreates ' + ObjectUtil.toString(event));
        }

		private function removeOfflineCreateItem(newPK:String, item:Object, pendingNewRecords:ArrayCollection):void {
	        //map the old PK to the new PK so we can update new records that might reference this one
            offlineToOnlinePK[item.record_id] = newPK;		
			
			syncSQL.begin();
		      
		    // update the children with the new pk
			      
			for each (var o:Object in pendingNewRecords) {
				if (o.table_name != item.table_name) {
			        var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
              		dbStatement.text = "update '" + o.table_name + "' set " + item.table_name + "Id = :newPK where " + item.table_name + "Id = :oldPK";
              		dbStatement.parameters[":newPK"] = newPK;
              		dbStatement.parameters[":oldPK"] = item.record_id;
              		logger.debug(dbStatement.text);
              
              		try {
                		dbStatement.execute();
              		} catch (e:Error) {
                		// ignore since not every pendingNewRecord will relate to the item
              		}
				}
			}
			
			
			
			// remove item from offline creates 
    		var stmt:SQLStatementExt = new SQLStatementExt(syncSQL);
    		stmt.text = "delete from " + OFFLINE_CREATES_TABLE + " where id = " + item.id;
    		stmt.execute();
    			
    		// remove the item from local cache
    		//stmt.text = "delete from " + item.table_name + " where Id = :Id";
    		if(newPK!=null)
    		{
    			stmt.text = "UPDATE "+item.table_name+" SET Id = '"+newPK+"' WHERE Id = :Id";
    			stmt.parameters[":Id"] = item.record_id;
    			stmt.execute();
    		}	
    		syncSQL.commit();  
    		dispatchEvent(new Event("updateSyncingOfflineCreates"));
    			
    		recurseNextPendingRecord(item, pendingNewRecords, true);
    	}
        
		/**
		 * Make a note of the this offline temp PK, and which real SFDC PK it maps to, 
		 * so if there was a synch problem, and we're stuck with an unmatched temp PK,
		 * we can figure out which SFDC PK to use.
		 **/
		private function cacheOfflineToOnlinePK(offline:String, online:String):void
		{
			var stmt:SQLStatementExt = new SQLStatementExt(syncSQL);
			stmt.text = "INSERT INTO " + PK_MAP_TABLE + " (tempPk, sfdcPk) VALUES ('"+offline+"','"+online+"')";
			try
			{
				stmt.execute();
			}
			catch(e:Error)
			{
				//ignore for now
			}
			
			
		}
		
        private function finishedSyncingOfflineCreates(o:Object=null):void {
          	logger.debug("finishedSyncingOfflineCreates");
          
          	syncingOfflineCreates = false;
          	dispatchEvent(new Event("finishedSyncingOfflineCreates"));
          	
          	if ((loggingIn) && (!syncingOfflineCreates) && (!syncingOfflineUpdates) && (!syncingOfflineDeletes)) {
            	loggingIn = false;
            	loginResultCallback(loginResult);
          	}
        }
        
        
        private function autoUpdateRecords() :void {
            logger.debug("autoUpdateRecords");
				
            dispatchEvent(new Event("startSyncingOfflineUpdates"));
            
            if (!super.loginResult || !connected) {
      				//If we are connected, we should try to login.
      				if (connected == true && this.loginRequest != null) {
      					login(this.loginRequest);
      				} else {
      					logger.debug('we are not online or not logged in so do not try this');
      					finishedSyncingOfflineUpdates();
      			 	}
      				return; 
      			}
      			
            // find all new records in need of updating
            var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
            dbStatement.text = "select * from " + OFFLINE_UPDATES_TABLE + "";
            logger.debug(dbStatement.text);
            dbStatement.execute();
            
            var recordsToUpdate:SQLResult = dbStatement.getResult();
			  
  			if ((recordsToUpdate == null) || (recordsToUpdate.data == null) || (recordsToUpdate.data.length == 0)) {
  				logger.debug('no records to updagte');
  				finishedSyncingOfflineUpdates();
  				return;
  			}
            
            logger.debug('found record(s) ' + + recordsToUpdate.data.length + ' to update ');

			//loop through each of the records from the OFFLINE_UPDATES_TABLE select statement
            for each ( var recordToUpdate:Object in recordsToUpdate.data )
            { 
                trace('sync ' + ObjectUtil.toString(recordToUpdate));
				
				//get the data for this record from the object table
                var stmt:SQLStatementExt = new SQLStatementExt(syncSQL, recordToUpdate);
                stmt.text = "select * from `" + recordToUpdate.table_name + "` where id = '" + recordToUpdate.record_id + "'";
                stmt.execute();
                
                var d:SQLResult = stmt.getResult();

                if (d.data == null ) {
                    logger.debug("object disappeared from cache remove it's reference " + OFFLINE_UPDATES_TABLE + "");
                    removeOfflineUpdateItem(recordToUpdate);
                    return;
                }
                
                //if we got data back from that object table, step through the fields, and create an update sobject
                if (d.data.length > 0)
                {
					//TG: There's a problem here in that the fields aren't filtered by layout for each record type. So we may be updating a bunch of fields
					//    that have nothing to do with this record type.
					
					//TG: Instead of getting the describe for the whole table, just get the fields that we actually want to update from the
					//    serialized SObject in the recordToUpdate. And, luckily, we're saving the data in the serialized SObject, so we don't
					//    have to do any looping.
					var so:SObject = recordToUpdate.sobject.readObject();
					//var so:SObject = new SObject(o.table_name);
					//logger.debug('d.data[0] = ' + ObjectUtil.toString(d.data[0]));	  
					    
					//TG: we don't want to loop through all of the fields for this object, because many of the fields may not be
					//    valid for this record type's layout. However, if so is null for some reason, we're going to have to, I guess
					if(so == null)
					{
						so = new SObject(recordToUpdate.table_name);
						//TG: old way of doing things... shouldn't ever get called, but who knows...
						for (var p:Object in d.data[0]) 
						{
							//trace("Loop: "+p);
							if (d.data[0][p] != null) 
							{
								//handle read-only properties with describeSObject
								if ((d.data[0][p] != "null") && isUpdateableField(recordToUpdate.table_name, p as String)) 
								{                        
									so[p] = d.data[0][p];
								}
							}
						}
					}
					//logger.debug('so = ' + ObjectUtil.toString(so));
					
					
					//make sure there are no _new records					
					var sObjectFields:Array = so.getFields();
					for(var i:Number=0;i<sObjectFields.length;i++)
					{
						if (so[sObjectFields[i]] != null) 
						{
                  			//if this record references another record with a temp Id, we're going to have to replace it with the real Id
                  			//which, hopefully we have in offlineToOnlinePK at this point
							if(so[sObjectFields[i]] is String)
							{
								so[sObjectFields[i]] = replaceTempIdIfExists(so[sObjectFields[i]]);
							}
      					}							
					}
					
					  
					//do the SFDC update
					super.update([so],
					      		 new AsyncResponder(handleResultCreateOfflineUpdates,
					          	 handleFaultCreateOfflineUpdates,
					          	 recordToUpdate));
				}
            }
            
        }

        private function handleResultCreateOfflineUpdates(event:Object):void {
            trace('handleResultCreateOfflineUpdates ' + ObjectUtil.toString(event));
            // now remove the object from " + OFFLINE_CREATES_TABLE + "
            removeOfflineUpdateItem(event.context);
            
        }

        private function handleFaultCreateOfflineUpdates(event:Object/*event:com.salesforce.results.Fault*/):void {
            trace('handleFaultCreateOfflineCreates ' + ObjectUtil.toString(event));
            if(event != null && event is com.salesforce.results.Fault && event.hasOwnProperty("faultString") && event.faultString != null)
            	Alert.show(event.faultString,"Error");
            else
            	Alert.show('handleFaultCreateOfflineCreates ' + ObjectUtil.toString(event));
        }

        private function removeOfflineUpdateItem(o:Object):void {
            var stmt:SQLStatementExt = new SQLStatementExt(syncSQL);
            stmt.text = "delete from " + OFFLINE_UPDATES_TABLE + " where id = " + o.id;
            stmt.execute();
            
            // todo update the local cache of the object ???
            
            dispatchEvent(new Event("updateSyncingOfflineUpdates"));
            
            if (syncingOfflineUpdates) {
              	// see if there are still more
              	if (getNumberOfflineUpdates() == 0) {
                	finishedSyncingOfflineUpdates();
              	}
            }
        }
        
        private function finishedSyncingOfflineUpdates(o:Object=null):void {
          	syncingOfflineUpdates = false;
          	dispatchEvent(new Event("finishedSyncingOfflineUpdates"));
          
          	if ((loggingIn) && (!syncingOfflineCreates) && (!syncingOfflineUpdates) && (!syncingOfflineDeletes)) {
            	loggingIn = false;
            	loginResultCallback(loginResult);
          	}
        }

    		private function isUpdateableField(objectName:String, fieldName:String):Boolean {
    			var dsr:DescribeSObjectResult = getCachedDescribeSObjectResultByType(objectName);
    			if (fieldName.toLowerCase() == "id") {
    				return true;
    			}
    			var f:Object = dsr.fieldMap[fieldName] as Object;
    			return f.updateable == true;
    		}


		private function autoDeleteRecords():void {
			trace("Starting offline deletes");
			logger.debug("autoDeleteRecords");
			  
			dispatchEvent(new Event("startSyncingOfflineDeletes"));
			  
			if (!super.loginResult || !connected) {
				//If we are connected, we should try to login.
				if (connected == true && this.loginRequest != null) {
					login(this.loginRequest);
				} else {
					logger.debug('we are not online or not logged in so do not try this');
					finishedSyncingOfflineDeletes();
			 	}
				return; 
			}
			  
			// find all records to be deleted
			var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
			dbStatement.text = "select * from " + OFFLINE_DELETES_TABLE + "";
			logger.debug(dbStatement.text);
			dbStatement.execute();
			  
			var recordsToDelete:SQLResult = dbStatement.getResult();
			  
			if ((recordsToDelete == null) || (recordsToDelete.data == null) || (recordsToDelete.data.length == 0)) {
				logger.debug('no records to delete');
				finishedSyncingOfflineDeletes();
				return;
			}
			  
			logger.debug('found records to delete: ' + recordsToDelete.data.length);
			  
			var deletes:Array = [];
			for each ( var o:Object in recordsToDelete.data ) { 
				deletes.push(o.record_id);
			}
			super.deleteIds(deletes,
				new AsyncResponder(handleResultDeleteOfflineDeletes,
					handleFaultDeleteOfflineDeletes,
					deletes));
		}

        private function handleResultDeleteOfflineDeletes(event:Object):void {
          	logger.debug('handleResultDeleteOfflineDeletes ' + ObjectUtil.toString(event));
          
          	// now remove the object from " + OFFLINE_DELETES_TABLE + "
          	var stmt:SQLStatementExt = new SQLStatementExt(syncSQL);
          	syncSQL.begin();
          	for (var i:int = 0;i<event.length;i++) {
	          	stmt.text = "delete from " + OFFLINE_DELETES_TABLE + " where record_id = :id";
	          	stmt.parameters[":id"] = event.context[i];
    	      	stmt.execute();
          	}
          	syncSQL.commit();
          
          	dispatchEvent(new Event("updateSyncingOfflineDeletes"));
          
          	if (syncingOfflineDeletes) {
            	// see if there are still more
            	if (getNumberOfflineDeletes() == 0) {
              		finishedSyncingOfflineDeletes();
            	}
				else
				{
					autoDeleteRecords();
				}
          	}
          	
        }

        private function handleFaultDeleteOfflineDeletes(event:com.salesforce.results.Fault):void {
            logger.error('handleFaultDeleteOfflineDeletes ' + ObjectUtil.toString(event));
        }
        
        private function finishedSyncingOfflineDeletes(o:Object=null):void {
          	logger.debug("finishedSyncingOfflineDeletes");
          
          	syncingOfflineDeletes = false;
          	dispatchEvent(new Event("finishedSyncingOfflineDeletes"));
          
          	if ((loggingIn) && (!syncingOfflineCreates) && (!syncingOfflineUpdates) && (!syncingOfflineDeletes)) {
            	loggingIn = false;
            	if (loginResultCallback != null) {
            		loginResultCallback(loginResult);
            	}
          	}
        }
        
		private function tableExists(tableName:String):Boolean {
			var s:SQLStatementExt = new SQLStatementExt(syncSQL);
			s.text = "Select count(*) From '" + tableName + "'";
			try {
				s.execute();
			} catch(e:SQLError) {
				return false;
			}
			return true;
		}
		
		private function getIds(qr:QueryResult):String {
			var l:Number = qr.records.length;
			var ids:String = "";
			for (var i:int = 0;i<l;i++) {
				ids += "'" + qr.records[i].Id + "', ";
			}
			return ids.substr(0, ids.length - 2);
		}
        /***********  Query Caching Functions *******************/
        /**
         * 
         * cacheResult() create or update the database using the results of a query.
         * If the table does not exist, it is created.  No attempt is made to keep the 
         * schema up to date.  This differs from refreshCache in that it will not delete
         * any records or drop any tables.  If the record exists, then the values on the
         * SObject are used to update the table.  If no record exists, then the record is 
         * created using the values on the SObject.
         * 
         */
        private function cacheResult(qr:QueryResult,querySObject:String = null):void 
        {
        	var tableMissing:Boolean=false;
			var responder:AsyncResponder;
            
            if (qr.size == 0) {
            	if(querySObject != null)
            	{
            		//check to see if SQLite table still needs to be created
            		syncConnection.loadSchema(SQLTableSchema);
		 			var schemaResult:SQLSchemaResult = syncConnection.getSchemaResult();
		 			var tableFound:Boolean=false;
		 			for each(var table:SQLTableSchema in schemaResult.tables)
		 			{
		 				if(table.name == querySObject)
		 				{
		 					tableFound = true;
		 					break;
		 				}	
		 			}
		 			if(!tableFound)
		 			{
		 				tableMissing=true;
		 				//if the table doesn't exist, create it
			 			responder = new AsyncResponder(
	                    // To create a table we need to run a describe on the object.  After the describe
	                    // returns, we create and run the createTable Statement. -- what about ALTER TABLE
	                    	function(d:DescribeSObjectResult):void {
	                        	var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL, qr);
	                          	dbStatement.text = buildCreateTableStatement(d);
	                          	logger.debug(dbStatement.text);
	                          	dbStatement.execute();
	                          	//table is created, so notify caller
	                          	dispatchEvent(new CacheCompleteEvent("cache complete",qr.passThrough));
	                      	}
	                  	);
	                  	responder.context = qr;
	                  	// note this assumes that the query contains exactly one table, does not check for related queryReslts
	                  	describeSObject(querySObject, responder);
		 			}
            	}
            } else {
            	dispatchEvent(new Event("cache begun"));
                var tName:String = qr.records[0].type;
                
                try {
                	//get the ID's for the QueryResult records from the current database...just so we can see if we need to do an insert or an update
                	var s:SQLStatementExt = new SQLStatementExt(syncSQL);
                	s.text = "select Id From '" + tName + "' where Id in (" + getIds(qr) + ")";
                	trace("caching this: "+s.text);
                	s.execute();
                	var sres:SQLResult = s.getResult();
                  	var dataStuff:Object = {};
                  	if (sres.data != null && sres.data.length > 0) {
                  		for each (var rec:Object in sres.data) {
                  			dataStuff[rec.id] = rec;
                  		}
                  	}
                  	var dataLen:Number = 0;
                  	if (sres.data != null) { dataLen = sres.data.length; }
                	logger.debug("Number of records in " + tName + " table: " + dataLen);
                  	
                  	syncSQL.begin();
                  	//loop through the QueryResult, caching each record contained within
                  	for each (var o:SObject in qr.records) 
                  	{
                  		var oId:String = o.Id;
                    	var stmt2:SQLStatementExt = new SQLStatementExt(syncSQL);
                  		if (dataStuff[oId] != null) {
                  			//Need to do an update here
                  			stmt2.text = buildUpdateTableStatement(o);
                  		} else {
	                    	stmt2.text = buildInsertTableStatement(o);
	                   }
                    	stmt2.execute();
                  	}
                  	//it's possible a recursed cacheResult has already called commit(),
                  	//so just call another begin(). If it's not needed, it'll be ignored.
                  	//This, unfortunately means that queries with __r fields will take longer
                  	//to cache if we're dealing with a lot of rows...TODO: fix that
                  	syncSQL.begin();
               		syncSQL.commit();

                  	

                } catch (e:SQLError) {
                	tableMissing=true;
                	// Error 3131 is a constraint violation meaning that the record being inserted exists.  This
                	// should be caught, and the statement changed to update.
                	trace("SQLite Error (cacheResult()): " + e.errorID + " - " + e.message);
                	trace("SQLite Error (cacheResult()): " + ObjectUtil.toString(e));
                	if(stmt2 != null)
                		trace("Botched SQLLite Query (cacheResult()): "+stmt2.text);
                	//e.errorID + " - " + e.message);
                  	if(e.detailID == 2036) //"no such column"
                  	{
                  		//find the type of this field
                  		super.describeSObject(qr.records[0].type, new AsyncResponder(function(d:DescribeSObjectResult):void
                  		{            			
                  			for(var i:Number = 0; i<d.context.e.detailArguments.length; i++) //I don't know why "for each" doesn't work here
                  			{
	                  			var missingColumn:String = d.context.e.detailArguments[i];
	                  			var columnType:String;
	                  			for each(var aField:Field in d.fields)
	                  			{
	                  				if(aField.name == missingColumn)
	                  				{
	                  					columnType = getSQLiteFieldType(aField);
	                  					break;
	                  				} 		
	                  			}
	                  			
	                  			if(columnType == null)
	                  			{
	                  				columnType = missingColumn + "VARCHAR(255)";
	                  			}
	                  			    			
	                  			var alterStatement:SQLStatementExt = new SQLStatementExt(syncSQL);
								alterStatement.text = "ALTER TABLE " + d.context.qr.records[0].type + " ADD " + columnType;
								alterStatement.addEventListener(SQLEvent.RESULT,function(result:SQLEvent):void {
									//alter table success, so go back to trying to cache this queryResult
									cacheResult(d.context.qr,querySObject);
								});
								alterStatement.addEventListener(SQLErrorEvent.ERROR,dbFault);
								alterStatement.execute();	
	                  		}
                  		},null,{"e":e,"qr":qr}));                  		
                  		
                  	}
                  	else if(e.errorID == 3119)
                  	{
						Alert.show(e.message,e.name);  
						this.syncConnection.rollback(null);
						this.asyncConnection.rollback(null);
					                			
                  	}
                  	else
                  	{
	                  	//Need to create the table.
	                  	
	                  	// TODO - This catches many types of errors and really only handles the case where the table does not exist.
	                  	//   		It should also handle the case where a field was added or removed.
	                  	responder = new AsyncResponder(
	                    // To create a table we need to run a describe on the object.  After the describe
	                    // returns, we create and run the createTable Statement. -- what about ALTER TABLE
	                    	function(d:DescribeSObjectResult):void {
	                        	var dbStatement:SQLStatementExt = new SQLStatementExt(syncSQL, qr);
	                          	dbStatement.text = buildCreateTableStatement(d);
	                          	logger.debug(dbStatement.text);
	                          	dbStatement.execute();
	                          	
	                          	cacheResult(qr);
	                      	}
	                  	);
	                  	responder.context = qr;
	                  	// note this assumes that the query contains exactly one table, does not check for related queryReslts
	                  	describeSObject(qr.records[0].type, responder);
					}
                }
                
            }
            if (qr.done != true && qr.queryLocator) {
            	/*this.queryMore(qr.queryLocator,new AsyncResponder(cacheResult,
            		function (info:Object) :void { 
                		logger.debug(ObjectUtil.toString(info));     // incase this was passed also	
            		}
            		),qr.passThrough);*/
            }
            else
            {
            	var tableName:String;
            	if(qr.size == 0)
            		tableName = "UNKNOWN";
            	else
            		tableName = qr.records[0].type;
            	
            	if(!tableMissing)
            	{
            		trace("CACHE OF THIS OBJECT IS COMPLETE: "+tableName);
            		dispatchEvent(new CacheCompleteEvent("cache complete",qr.passThrough));
            	}	
            }
            
        }
        

        /**
         * writeResultToCache() spools the query result to the database.  It first checks the
         * primary key (Id) to see if the record exists and if so, creates an update statement.
         * Otherwise it creates an insert statement.
         *
         */
         /*
        private function writeResultToCache(qr:QueryResult) : void { 
            logger.debug('writeResultToCache: QueryResult size: '+qr.size + ', records:'+qr.records.length);
            
            var stmt:SQLStatement = new SQLStatement();
            stmt.text = "delete from 
            
            // would be nice to do this in a transaction
            //sql.begin();
            for (var i:int = 0; i<qr.records.length; i++) {
                if (debugLevel>2 ) { logger.debug( i + ': '+ qr.records[i].Name ); }
                // insert this record into the sqlite db
                var obj:SObject = qr.records[i];
                var dbs:SQLStatementExt = new SQLStatementExt( sql, obj );
                
                dbs.text = "Select Id From " + obj.type + " Where Id = '" + obj.Id + "'";
                dbs.data = obj;
                dbs.addEventListener(SQLErrorEvent.ERROR, dbFault);
                dbs.addEventListener(SQLEvent.RESULT, 
                
                    function(event:SQLEvent):void {
                        var dbStatement:SQLStatement = new SQLStatement();
                        dbStatement.sqlConnection = sql;

                        if ((event.currentTarget as SQLStatement).getResult().data == null) {
                            
                        } else {
                            dbStatement.text = buildUpdateTableStatement(event.currentTarget.data); 
                        }

                        // logger.debug(dbStatement.text);
                        dbStatement.addEventListener(SQLErrorEvent.ERROR,dbFault);
                        dbStatement.addEventListener(SQLEvent.RESULT, dbTraceSQLResult );
                        dbStatement.execute();
                    }
                );
                dbs.execute();
            }
            //sql.commit();        
        }
        */

    /******************  End Query Caching Functions  *************************/ 

        /**
         * just dropped table, so recreate it now, first step is to 
         * describe the table as it exists in Salesforce
         * 
         */
         /*
        private function describeTable(event:Event) : void { 
            
            // get the current table field descriptions from Salesforce
            var soql:String = event.currentTarget.data as String;
            var tName : String = getTableName(soql);

            logger.debug('describeSObject : ' + tName);
            super.describeSObject(tName, new AsyncResponder( 
                
                function( d:DescribeSObjectResult ):void {
                    
                    var dbStatement:SQLStatementExt = new SQLStatementExt(sql,soql);
                    
                    // something like this : create table Account (id string primary key, name varchar(255));";
                    dbStatement.text = buildCreateTableStatement(d);                     
                    //logger.debug(dbStatement.text);
                    
                    dbStatement.addEventListener(SQLErrorEvent.ERROR,dbFault);
                    dbStatement.addEventListener(SQLEvent.RESULT, loadTable);
                    dbStatement.execute();
                }
            ));
        }
        
        
        private function loadTable(event:SQLEvent) : void { 
            var soql:String = event.currentTarget.data as String;
            logger.debug('super.query : '+ soql);
            
            // table is ready, query salesforce table to get data
                        
            super.query(soql,new AsyncResponder( writeOneResult_Refresh ));
        }

        private function writeOneResult_Refresh(qr:QueryResult) : void { 
            logger.debug('QueryResult size: '+qr.size + ', records:'+qr.records.length);
            
            for (var i:int = 0; i<qr.records.length; i++) {
                //logger.debug( i + ': '+ qr.records[i].Name );
                // insert this record into the sqlite db
                var dbStatement:SQLStatementExt = new SQLStatementExt(sql, qr);
                
                dbStatement.text = buildInsertTableStatement(qr.records[i]);
                // logger.debug(dbStatement.text);
                dbStatement.addEventListener(SQLErrorEvent.ERROR, dbFault);
                dbStatement.addEventListener(SQLEvent.RESULT, dbTraceSQLResult );
                
                dbStatement.execute();
            }
        }
        */
        
        /**
         * trace the result of a sqlEvent result, just outputs 
         * details about the statement that was executed, for tracing the insert / update 
         */        
        public var debugLevel:int = 0;  
        private function dbTraceSQLResult(event:SQLEvent):void {
            var dbs:SQLStatement = event.currentTarget as SQLStatement;
            if (debugLevel > 2) { 
                logger.debug("Statement: " + dbs.text);
                logger.debug(" Resulted in " + dbs.getResult().rowsAffected + " rows affected.");    
            }
        }
        
        private function dbFault(event:SQLErrorEvent):void {
			if (_errors == null)    {
                _errors = new ArrayCollection();
            }
            _errors.addItem(event.error);
            logger.debug( event.error +  "\n\t" + event.currentTarget.text);
            logger.debug(event.error +  "\n\t" + event.currentTarget.text);
            trace(event.error +  "\n\t" + event.currentTarget.text);
            trace(event.error +  "\n\t" + event.currentTarget.text);
            
            //still call the callback, otherwise we just stall out 
            var dbs:SQLStatementExt = event.currentTarget as SQLStatementExt;
            var qr:QueryResult = new QueryResult(null);
            qr.records = new ArrayCollection();
            qr.done = true;
            qr.size = 0;
            
            
            if( dbs.data.asyncResponder is AsyncResponder ){
            	(dbs.data.asyncResponder as AsyncResponder).resultHandler(qr);
            } else {
            	Alert.show( "Local Database Error: "+ObjectUtil.toString(event), "Error" );
            }
		}
         
       // HELPERS, PARSING
         
         /**
         * build a queryResult from this single SObject
         * @return QueryResult containing one record
         */
         private function buildQueryResult(rec:SObject):QueryResult
         {
         
         	var newQR:QueryResult = new QueryResult();
         	newQR.records = new ArrayCollection();
         	newQR.records.addItem(rec);
         	newQR.done=false;
         	newQR.size=1;
         	return newQR;
         }         
         
        /**
         * build a full sqlite create table statement using the fields
         * in the describe sobject result
         * @return string containg create statement
         * 
         */
        private function buildInsertTableStatement(rec:SObject):String {
            //    logger.debug("Inserting record: " + rec.Id);
           
            //JE change to replace to remove need for insert or update
//            var ret :String =  "replace into '" + rec.type + "' ( " ;
            var ret :String =  "insert into '" + rec.type + "' ( ";
       
//            for ( var k:String in rec) {
//            	if(k.search(/__r$/i) > -1 || k=="Profile")
			for ( var k:String in rec) {
				if(rec[k] is SObject)
            	{
           			//if it's an SObject, it's a relationship field queried with [something]__r.[something]
            		//If it's a QueryResult, it was queried with a subquery
            		//If the ID is null, there's nothing that we can do with it... the query has to specifically
            		//query the ID
            		if(rec[k] != null && (rec[k].Id == null || rec[k].Id is mx.utils.ObjectProxy))
            		{
            			throw("Relationship Id cannot be null");
            		}
            		if(rec[k] != null)
            			cacheResult(buildQueryResult(rec[k]));  		
            		continue;	
            	}
				else if (rec[k] is Array || rec[k] is ArrayCollection) {
					trace("Array returned");
				}
                if (typeof(rec[k]) == "object") { continue; }
                if (k=='type') { continue; }
                ret += k + ','; 
            }
            ret = String(ret).replace(/,$/,') '); //    logger.debug(ret);
            
            ret += ' VALUES ( ';
            for ( k in rec) {
                if (typeof(rec[k]) == "object") { continue; }
                if (k=='type') { continue; }

                var setVal:Object = (rec[k]!=null?rec[k]:'');
				 
                var singleQuote:RegExp = /'/g; //';
            	var doubleQuote:RegExp = /"/g; //";
				if (setVal != "''") {

					//rec[k] = (rec[k]?rec[k]:null);  
					
					if (rec[k] is String && (rec[k] as String).match(singleQuote)) {
						setVal = (setVal as String).replace(singleQuote,"\'\'"); //'
					}
					/*else
					{
						setVal = rec[k];
					}*/
				}
				if(setVal === false)
				{
					ret += null+',';
				}
				else
				{
					ret += '\'' + setVal + '\',';
				}
//                ret += '"' + (rec[k]?rec[k]:'') + '",'; 
            } 
            ret = String(ret).replace(/,$/,');'); // remove last comma			
			return ret;
		}
         
        private function buildUpdateTableStatement(rec:SObject):String {
            var ret:String = "update '" + rec.type + "' Set ";
            //var ret:String = "replace  " + rec.type + " Set ";
            var id:String;
            
            for ( var k:String in rec) 
            {   
				if(rec[k] is SObject)
            	{
            		//if it's an SObject, it's a relationship field queried with [something]__r.[something]
            		//If it's a QueryResult, it was queried with a subquery
            		//If the ID is null, there's nothing that we can do with it... the query has to specifically
            		//query the ID
            		if(rec[k] != null && (rec[k].Id == null || rec[k].Id is mx.utils.ObjectProxy))
            		{
            			throw("Relationship (__r) Id cannot be null");
            			Alert.show("Local Database Cache Failed. Relationship Id cannot be null.");
            		}
         
            		if(rec[k].Id != null)
            			cacheResult(buildQueryResult(rec[k] as SObject));  		
            		continue;	
            	}
				else if (rec[k] is Array || rec[k] is ArrayCollection) {
					trace("Array returned");
				}
            	//throw away some fields 
            	//type isn't actually a column
            	//Id is saved to use in the Where clause
           
                if (k=='type' || k == "Id")
                { 
                    if (k == "Id") {
                        id = rec[k].toString();
                    }
                    continue; 
                }
                
                //TG: we need to escape single quotes for obvious reasons...
            	
            	var singleRecord:String;
            	if(rec[k] === '')
            		rec[k] = null;
           		//singleRecord = (rec[k] != ''?rec[k]:null);           	            
			
				singleRecord = rec[k];
				if(singleRecord != null)
				{
					var quoteRegEx:RegExp = new RegExp("'","g");
					singleRecord = singleRecord.replace( quoteRegEx, "''");
					singleRecord = "'"+singleRecord+"'";
				}
			
                ret += k + " = " + singleRecord + ","; 
            }
            ret = String(ret).replace(/,$/,'') + " Where Id = '" + id + "';"; // remove last comma add where
            //trace(ret);
            logger.debug(ret);
            return ret;
        }
         
		private function buildCreateTableStatement(dso:DescribeSObjectResult):String {
			// CHANGED BY JE 02/26/09 - Added ' around dso.name to make 
			// sure reserved words don't crash create table
			//  
			var ret :String =  "create table if not exists '" + dso.name + "' ( " ;
            var fields:Array = new Array();
            for (var key:Object in dso.fields) { fields.push(dso.fields[key]); }
            fields.sort();
             
            for (var j:int=0;j<fields.length;j++ ) {
            	var f:com.salesforce.results.Field = fields[j];
                switch ( f.type ) {
                	case 'url' : 
                    case 'phone' : 
                    case 'textarea' : 
                    case 'picklist' : 
                    case 'multipicklist' :
                    case 'reference' : 
                    case 'string' : 
                    case 'datetime':
                    case 'date':
                    case 'boolean':
                    case 'email':
                    	if (f.length == 0) {
                    		ret += f.name +' VARCHAR('+50+'),'
                    	}
                    	else {
                    		ret += f.name +' VARCHAR('+f.length+'),'
                    	}
                        break;
                    case 'id' : 
                        ret += 'id string primary key,'
                        break;
                    case 'percent':
                    case 'currency':
                    case 'double':
                    	//TG: doubles in SFDC can equal '', but not in SQLite, so DOUB will cause "could not convert text value to numeric value." errors
                        //TG: Switched back 5-22-09...hopefully it works with the most recent version of the API
                        ret += f.name +' DOUB('+f.length+'),';
                        //ret += f.name + ' VARCHAR('+f.length+'),'; 
                        break;
                    case 'int':
                    	//TG: I'm just assuming INT will have the same problem, and I haven't found out yet
                        ret += f.name +' INT('+f.length+'),'
                        //ret += f.name + ' VARCHAR('+f.length+'),';
                        break;
                    default: 
                    	//TG: meh... 
                    	ret += f.name + ' VARCHAR('+f.length+'),';
                        trace('todo: ron forgot to implement this type ->'+f.type);
                        break;
				}
			}
            
            ret = String(ret).replace(/,$/,');'); // remove last comma, close statement
			//trace(ret);			
            return ret;
		}
		
		private function getSQLiteFieldType(sfdcField:com.salesforce.results.Field):String
		{
			switch ( sfdcField.type ) 
			{
                	case 'url' : 
                    case 'phone' : 
                    case 'textarea' : 
                    case 'picklist' : 
                    case 'multipicklist' :
                    case 'reference' : 
                    case 'string' : 
                    case 'datetime':
                    case 'date':
                    case 'boolean':
                    case 'email':
                    	if (sfdcField.length == 0) 
                    	{
                    		return sfdcField.name +' VARCHAR('+50+')'
                    	}
                    	else 
                    	{
                    		return sfdcField.name +' VARCHAR('+sfdcField.length+')'
                    	}
                        break;
                    case 'id' : 
                        return 'id string primary key'
                        break;
                    case 'percent':
                    case 'currency':
                    case 'double':
                    	//TG: doubles in SFDC can equal '', but not in SQLite, so DOUB will cause "could not convert text value to numeric value." errors
                        //TG: Switched back 5-22-09...hopefully it works with the most recent version of the API
                        return sfdcField +' DOUB('+sfdcField.length+')';
                        //ret += f.name + ' VARCHAR('+f.length+'),'; 
                        break;
                    case 'int':
                    	//TG: I'm just assuming INT will have the same problem, and I haven't found out yet
                        return sfdcField.name +' INT('+sfdcField.length+')'
                        //ret += f.name + ' VARCHAR('+f.length+'),';
                        break;
                    default: 
                    	//TG: meh... 
                    	return sfdcField.name + ' VARCHAR('+sfdcField.length+')';
                        trace('todo: ron forgot to implement this type ->'+f.type);
                        break;
				}			
		}
		
        /**
         * helpers to quick parse the SOQL, NOTE these only work on single 
         * table SOQL queries at the moment, TODO enhance later for relationship queries
         * 
         * @param soql
         * @return 
         * 
         */
        private function getTableName(soql:String): String { 
            soql = soql.replace( /.*from\W*/i,'');
            soql = soql.replace( /^\W*/g,'');
            soql = soql.replace( /\W*$/g,'');
            soql = StringUtil.trim(soql);
            soql = soql.split(" ")[0];
            //logger.debug('>'+soql+'<');
            return soql;
        }
        
        private function getFieldNames(soql:String): Array { 
            var a:Array  = soql.split(/[ ,]/i);
            //logger.debug(a)
            a =  a.slice(1);
            //logger.debug(a);
            var i:int;
            for(i=0; i < a.length;i++) {
                var tmp:String = a[i].toString().toLocaleLowerCase() ;
                // logger.debug(tmp);
                if (tmp == 'from') {    
                    break;
                }
            }
            a = a.slice(0,i);
            //logger.debug(a);
            return a;
        }
        
    }
    
    
}

// include this class here, it's only used if we are building for AIRConnection
// and gets in the way if it's a seperate file in the Flex build
import flash.data.SQLStatement;
import flash.data.SQLConnection;
import com.salesforce.salesforce_internal;
use namespace salesforce_internal;

class SQLStatementExt extends SQLStatement
{
    /**
     * extend normal statement by adding information (data) about the 
     * Salesforce task we are performing
     */
    public var data:Object; 
        
    public function SQLStatementExt( _sql:SQLConnection=null, _data:Object=null)
    { 
        super(); 
        if (_data)  { this.data = _data; }
        if (_sql) { this.sqlConnection = _sql; }
    }
}