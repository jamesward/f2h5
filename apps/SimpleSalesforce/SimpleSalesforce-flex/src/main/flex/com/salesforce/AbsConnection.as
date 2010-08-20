package com.salesforce
{
	import com.salesforce.events.SendEvent;
	import com.salesforce.objects.Parameter;
	import com.salesforce.objects.SoapObject;
	import com.salesforce.results.LoginResult;
	
	import flash.events.EventDispatcher;
	import flash.system.Security;
	
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
	 * Event used internally to collect responses and pass them back to the responder callbacks
	 */
	[Event(name="receivedResponse", type="com.salesforce.events.ReceivedEvent")]
	 
	/**
	* Event used to print out the SOAP messages used in the API transport methods
	*/
	[Event(name="debugEvent", type="com.salesforce.events.DebugEvent")]
	
	public class AbsConnection extends EventDispatcher implements IConnection
	{
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
	
	  protected var updateMru:String;
	  protected var client:String;
	  protected var _batchSize:Number;
	  protected var organizationId:String;
	  protected var emailHeader:Object;
	  protected var assignmentRuleHeader:Object;
	  protected var transferToUserId:String;
	  protected var debuggingHeader:Object;
	  protected var sforceNs:String = "urn:partner.soap.sforce.com";
	  protected var sobjectNs:String = "sobject.partner.soap.sforce.com";
	  protected var metadataNs:String = "http://soap.sforce.com/2006/04/metadata";
	  protected var _defaultServerUrl:String = "https://www.salesforce.com/services/Soap/u/10.0"; // default endpoint to this
       
	  protected static var namespaceMap:Array = [
	    {ns: "urn:partner.soap.sforce.com", prefix: null},
	    {ns: "sobject.partner.soap.sforce.com", prefix: "ns1"}
	    ];
		
		
        public function getCurrentSessionid():String {
	  	    return sessionId;
	    }
		public function writeHeader(writer:XmlWriter, headerNs:String):void {
			Log.getLogger("com.salesforce.AbsConnection").debug("Error : Subclass must override this method!");
    		throw new Error("Subclass must override this method!");
		}
		public function invoke(method:String, args:Array, isArray:Boolean, responder:ISalesforceResponder, nsMap:Array=null, intServerUrl:String=null, sfNs:String=null, sobjNs:String=null, remote:Object = null):void {		
			// all responses go thru Saleforce Responder class to construct proper objects types
			//var sf_responder:AbsSalesforceResponder =  new AbsSalesforceResponder(this, responder);
			if (nsMap == null) {
				nsMap = namespaceMap;
			}
			if (intServerUrl == null) {
                // Util.debug(this, "intServerUrl is null");
				intServerUrl = _internalServerUrl;
			} else {
				var proto:String = URLUtil.getProtocol(_internalServerUrl);
				var server:String = URLUtil.getServerName(_internalServerUrl);
				var port:Number = URLUtil.getPort(_internalServerUrl);
				if (URLUtil.getPort(_internalServerUrl) != 0) {
					intServerUrl = proto + "://" + server + ":" + URLUtil.getPort(_internalServerUrl) + intServerUrl;
				} else {
					intServerUrl = proto + "://" + server + intServerUrl;
				}
			}
            // Util.debug(this, "intServerUrl = " + intServerUrl);
			
			if (sfNs == null) {
				sfNs = sforceNs;
			}
			if (sobjNs == null) {
				sobjNs = sobjectNs;
			}
	    	return _invoke(method, args, isArray, responder, nsMap, intServerUrl, sfNs, sobjNs, remote);
		}
		
		public function _invoke(method:String, args:Array, isArray:Boolean, responder:ISalesforceResponder, namespaces:Array, url:String, headerNs:String, sobjectNs:String, remote:Object= null):void {
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
	      			Log.getLogger("com.salesforce.AbsConnection").debug("Null arg: " + arg.name);
	        		//throw "arg " + i + " '" + arg.name + "' not specified";
	      		} else {
	      			writeArg(writer, arg.value, arg.name, sobjectNs);
	      		}
	    	}
	    
	    	writer.writeEndElement(method);
	    	writer.endBody();
	    	writer.endEnvelope();
	   
	    	var transport:Transport = new Transport();
	    	transport.addEventListener(SendEvent.SEND_REQUEST, sendRequestHandler);
	    
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
            
	    	transport.send(writer,responder, remote);
	  	}
		
		private function writeArg(writer:XmlWriter, argValue:Object, argName:String, sobjectNs:String):void {
			var argValueType:Object = typeof(argValue);
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
      		//} else if ( typeof(argValue) == "ObjectProxy" ) {
      		} else if (argValue is ObjectProxy ) {
      			if (argValue is SoapObject) {
      				writeOne(writer, argName, argValue, sobjectNs);
      			} else {
	      			writer.writeStartElement(argName);
	      			for (var key:String in argValue) {
	      				writeArg(writer, argValue[key], key, sobjectNs);
	      				//writeOne(writer, key, argValue[key], sobjectNs);
	      			}
	      			writer.writeEndElement(argName);
      			}
      		} else {
        		writeOne(writer, argName, argValue, sobjectNs);
      		}
			
		}
		
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
		
	  	public function sendRequestHandler(event:SendEvent):void {
	  		dispatchEvent(event);
	  	}
		
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
	    	//Util.debug(this, "_internalServerUrl set to " + _internalServerUrl);

            /* 
             * load the policy file if our sandbox is remote and we are past login (www)
             *  normally happens after login when we are setting the server url for na1,na2,etc.
             */
            if (Security.sandboxType == Security.REMOTE 
            	&& apiServerName != "www.salesforce.com" 
            	&& apiServerName != "test.salesforce.com" ) { 
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

	  	public function getFrontDoorUrl():String {
	  		if (!isLoggedIn) {
	  			throw "You must be logged in to use the front door.";
	  		} else {
	  			var url:String = URLUtil.getProtocol(_internalServerUrl) + "://" + URLUtil.getServerName(_internalServerUrl);
	  			return url + "/secur/frontdoor.jsp?sid=" + this.sessionId;
	  		}
	  	} 

        public function isSControl(): Boolean {
        	if ( this._applicationDomain == null ) 
        		return false;
            return this._applicationDomain.indexOf("salesforce") > 0;
        }

	  	public function get loginResult():LoginResult {
	  		return this._loginResult;
	  	}

	  	public function get applicationDomain():String {
	  		return this._applicationDomain;
	  	}

	  	public function get applicationServerName():String {
	  		return this._applicationServerName;
	  	}

	  	public function get protocol():String {
	  		return this._protocol;
	  	}

 		public function set protocol(prot:String):void {
	  		this._protocol = prot;
	  		/* if protocol is set after serverUrl is set, we need to fix the serverUrl to match 
	  		 * the specified protocol.  Normally this is only used when running the flex 
	  		 * app on a webserver that is not hosted on https (like localhost)
	  		 */
	  		if ( this._protocol == 'http') { // && _internalServerUrl.match("^https.*") ) {
				serverUrl = serverUrl.replace('https', 'http'); 
			}
	  	}

	  	public function get applicationUrl():String {
	  		return this._applicationUrl;
	  	}

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

	  	public function set batchSize(num:Number):void { this._batchSize = num;}



		
		
	}
}

