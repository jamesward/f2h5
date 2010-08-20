package com.salesforce
{
	import com.dynamicflash.util.Base64;
	import com.salesforce.events.SendEvent;
	import com.salesforce.metadata.DeployOptions;
	import com.salesforce.metadata.RetrieveRequest;
	import com.salesforce.objects.AsyncRequestState;
	import com.salesforce.objects.AsyncResult;
	import com.salesforce.objects.Parameter;
	import com.salesforce.results.LoginResult;
	
	import flash.events.TimerEvent;
	import flash.utils.ByteArray;
	import flash.utils.Timer;
	
	import mx.logging.Log;
	import mx.rpc.IResponder;
	import mx.utils.ObjectUtil;
	import mx.utils.URLUtil;
	
	use namespace salesforce_internal;
	
	public class MetaConnection extends AbsConnection
	{
		public function MetaConnection(conn:Connection2) {
			this.serverUrl = conn.serverUrl;
			var s:String = conn.getCurrentSessionid();
			this.sessionId = s;
			this.applicationUrl = this.serverUrl;
			setupLoginResult(conn.loginResult);
			addEventListener(SendEvent.SEND_REQUEST, conn.sendRequestHandler);			
		}
		public function setupLoginResult(loginRes:LoginResult):void {
	  		// If we got here we have a valid sessionId & serverUrl
	  		
	  		// Create a LoginResult to return
	  		var loginResult:LoginResult = loginRes;
	  		
	  		//loginResult.serverUrl = this.serverUrl;
	  		//loginResult.sessionId = this.sessionId;
	  		//loginResult.userId = userInfo.userId;
	  		//loginResult.userInfo = userInfo;
	  		
	  		// Set the connection properties
	  		this.organizationId = loginRes.userInfo.organizationId;
	  		this._loginResult = loginResult;
			this.isLoggingIn = false;
			this.isLoggedIn = true;
	  		
	  	}
	  	
		/**
		 * @private
		 */		
		private function getMetadataUrl():String {
	    	var tempUrl:String = URLUtil.getProtocol(serverUrl) + "//" + URLUtil.getServerName(serverUrl);
	    	return serverUrl.substr(tempUrl.length + 1).replace("/u", "/m");
		}
		
		/**
		 * @private
		 */		
		protected function cbCheckStatus_old(results:Object):void {
  			var d:Date = new Date();
	  		Log.getLogger("com.salesforce.MetaConnection").debug("Checking status [" + d.toString() + "]...");
	  		for (var i:int = 0;i<results.length;i++) {
	  			var result:AsyncResult = results[i] as AsyncResult;
	  			var stateString:String = result.state.toString();
	  			var statusString:String = result.statusCode.toString();
	  			Log.getLogger("com.salesforce.MetaConnection").debug("\tState is: " + stateString + "\n\tStatusCode is: " + statusString);
		  		if (result.state == AsyncRequestState.Completed) {
		  			(results.context as AsyncResponder).result(results);
		  		} else if (result.state == AsyncRequestState.Error) {
		  			throw(result.state + " - " + result.statusCode + "\n" + result.message);
		  		} else {
		  			var wait:int = result.secondsToWait;
		  			var t:Timer = new Timer(wait * 1000);
		  			
		  			Log.getLogger("com.salesforce.MetaConnection").debug("\t\tWait time is: " + wait);
		  			t.addEventListener(TimerEvent.TIMER, function(event:Object):void {
			  			var r:Object = result;
		  				//Need to send another status check
				  		checkStatus([result.id], new AsyncResponder(cbCheckStatus, (results.context as AsyncResponder).faultHandler, results.context));
				  		t.stop();
		  			} );
		  			t.start();
		  		}
		  	}
		}
		
		/**
		 * @private
		 */				
		protected function cbCheckStatus(results:Object):void {
  			var d:Date = new Date();
	  		Log.getLogger("com.salesforce.MetaConnection").debug("Checking status [" + d.toString() + "]...");
	  		for (var i:int = 0;i<results.length;i++) {
	  			if (results[i] is AsyncResult) {
		  			var result:AsyncResult = results[i] as AsyncResult;
		  			if (result.done == true) {
		  				//We are done, return the results
		  				if (results.context.hasOwnProperty("operation")) {
		  					var op:String = results.context.operation;
		  					if (op == "retrieve") {
		  						checkRetrieveStatus(result.id, (results.context.cb as AsyncResponder));
		  					} else if (op == "deploy") {
		  						checkDeployStatus(result.id, (results.context.cb as AsyncResponder));
		  					}
		  				} else {
			  				(results.context.cb as AsyncResponder).result(results);
			  			}
			  			
		  			} else {
			  			var stateString:String = result.state.toString();
			  			var statusString:String = result.statusCode.toString();
			  			Log.getLogger("com.salesforce.MetaConnection").debug("\tState is: " + stateString + "\n\tStatusCode is: " + statusString);
			  			var wait:int = result.secondsToWait + 1;
			  			var t:Timer = new Timer(wait * 1000);
				  			
			  			Log.getLogger("com.salesforce.MetaConnection").debug("\t\tWait time is: " + wait);
			  			t.addEventListener(TimerEvent.TIMER, function(event:Object):void {
				  			var r:Object = result;
			  				//Need to send another status check
					  		checkStatus([result.id], new AsyncResponder(cbCheckStatus, (results.context.cb as AsyncResponder).faultHandler, results.context));
					  		t.stop();
			  			} );
			  			t.start();
			  			
			  		}
		  		}
		  	}
		}
		
		private function createCallback(callback:IResponder):MetaSalesForceResponder {
			var cb:AsyncResponder = new AsyncResponder(cbCheckStatus, (callback as AsyncResponder).faultHandler, { cb:callback });
			var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, cb);
			return oCallBack;
		}
		public function create(customObjects:Array, callback:IResponder):void {
			//var cb:AsyncResponder = new AsyncResponder(cbCheckStatus, (callback as AsyncResponder).faultHandler, callback);
			//var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, cb);
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	invoke("create", [arg], true, createCallback(callback), [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}
		
		public function update(customObjects:Array, callback:IResponder):void {
			//var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	invoke("update", [arg], true, createCallback(callback), [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		public function deleteObject(customObjects:Array, callback:IResponder):void {
			//var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("metadata", customObjects, true);
	    	invoke("delete", [arg], true, createCallback(callback), [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		private function checkStatus(requestIds:Array, callback:IResponder):void {
			var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
			var arg:Parameter = new Parameter("asyncProcessId", requestIds, true);
			invoke("checkStatus", [arg], true, oCallBack, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}
	
		private function checkRetrieveStatus(requestIds:String, callback:IResponder):void {
			var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
			var arg:Parameter = new Parameter("asyncProcessId", requestIds, false);
			invoke("checkRetrieveStatus", [arg], true, oCallBack, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		private function checkDeployStatus(requestIds:String, callback:IResponder):void {
			var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
			var arg:Parameter = new Parameter("asyncProcessId", requestIds, false);
			invoke("checkDeployStatus", [arg], true, oCallBack, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		public function retrieve(retrieveRequest:RetrieveRequest, callback:IResponder):void {
			//var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
	    	var arg:Parameter = new Parameter("retrieveRequest", retrieveRequest, false);
	    	var responder:ISalesforceResponder = createCallback(callback);
	    	var obj:Object = (responder as MetaSalesForceResponder).context.context;
	    	(responder as MetaSalesForceResponder).context.context.operation = "retrieve";
	    	invoke("retrieve", [arg], true, responder, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}

		public function deploy(zipFile:ByteArray, deployOptions:DeployOptions, callback:IResponder):void {
	    	var arg:Parameter = new Parameter("zipFile", Base64.encodeByteArray(zipFile), false);
	    	var arg2:Parameter = new Parameter("deployOptions", deployOptions, false);
	    	var responder:ISalesforceResponder = createCallback(callback);
	    	var obj:Object = (responder as MetaSalesForceResponder).context.context;
	    	(responder as MetaSalesForceResponder).context.context.operation = "deploy";
	    	invoke("deploy", [arg, arg2], true, responder, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}
		public function describeMetadata(callback:IResponder):void {
			var oCallBack:MetaSalesForceResponder = new MetaSalesForceResponder(this, callback);
			invoke("describeMetadata", [], true, oCallBack, [{ns: metadataNs, prefix: null}], getMetadataUrl(), metadataNs, metadataNs);
		}
		
		/**
		 * @private
		 */		
	  	override public function writeHeader(writer:XmlWriter, headerNs:String):void {
	    	writer.startHeader();
	
	    	writer.writeNamespace(headerNs, "sfns");
	
	    	if (sessionId !== null) {
	        	writer.writeStartElement("SessionHeader", headerNs);
	        	writer.writeNameValueNode("sessionId", sessionId);
	        	writer.writeEndElement("SessionHeader", headerNs);
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
import com.salesforce.MetaConnection;
import com.salesforce.metadata.DescribeMetadataResult;


use namespace salesforce_internal;
/**
* @private
*/
class MetaSalesForceResponder extends AbsSalesforceResponder {

 	/**
 	 * This class is used to package up the results from raw xml into sobjects, queryResponses and other 
 	 * Apex specific structures 
 	 * @param connection
 	 * @param clientResponder
 	 * @return 
 	 * 
 	 */ 
 	public function MetaSalesForceResponder(connection:MetaConnection, clientResponder:IResponder) {
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
    		case "checkStatusResponse":
    	 	case "createResponse":
    	 	case "updateResponse":
    	 	case "deployResponse":
    	 	case "retrieveResponse":
    			resultObject = new Array();
    			if (response is ObjectProxy) {
    				resultObject.push(new AsyncResult(response));
    			} else {
    				for (i=0;i<response.length;i++) {
    					resultObject.push(new AsyncResult(response[i]));
    				}
    			}
    			break;
    		case "checkRetrieveStatusResponse":
    			resultObject = new RetrieveResult(response);
    			break;
    		case "checkDeploymentStatusResponse":
    			resultObject = new DeployResult(response);
    			break;
    		case "describeMetadataResponse":
    			resultObject = new DescribeMetadataResult(response);
    			break;
    		case "deleteResponse":
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
			case "deployResponse":
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
