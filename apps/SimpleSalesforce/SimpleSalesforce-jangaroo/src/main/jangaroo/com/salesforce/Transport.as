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
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.net.URLLoader;
import flash.net.URLRequest;
import flash.net.URLRequestHeader;
import flash.net.URLRequestMethod;

import mx.rpc.IResponder;
import mx.collections.ArrayCollection;

import com.salesforce.events.SendEvent;

[Event(name="sendRequest", type="com.salesforce.events.SendEvent")]
/**
 * 
 * @private
 * 
 */	
public class Transport extends EventDispatcher
{
  
  public var url:String;
  private var connection:URLLoader;
  private var responder:IResponder;
  

  public function Transport(url:String=null)
  {
    if (url != null)
    {
      this.url = url;
    }
  }
  
  private function newConnection():void
  { 
    connection = new URLLoader();
  }

  	public function send(envelope:XmlWriter,responder:IResponder):void
  	{
    	newConnection();
        this.responder = responder;
        var request:URLRequest = new URLRequest();

        request.method = URLRequestMethod.POST;
	request.url = url;
        request.contentType = "text/xml; charset=UTF-8";

    	/*
    	 * append the flag to ensure Apex API will return errors under the 200 OK status rather than 500 normally specified for faults
		 * otherwise fault bodies are hidden from Flex 
		 * add user agent to allow tracking 
		 * UPDATE -- Cannot set the user header when runnning a flex app from a browser.  
		 * 			need an alternative logging solution.
		 */
    	//var headers:Object = {SOAPAction: "\"\"", Accept: "text/xml", "X-Salesforce-No-500-SC":"true"}; //, "User-Agent": "SFFLEX 1.0"};
    	//connection.headers = headers;
        request.requestHeaders = new Array(
          new URLRequestHeader("SOAPAction", "\"\""),
          new URLRequestHeader("Accept", "text/xml"),
          new URLRequestHeader("X-Salesforce-No-500-SC", "true")
        );

        request.data = envelope.toString();
        connection.dataFormat = "xml";
        connection.addEventListener(Event.COMPLETE, handleComplete);
        connection.load(request);

        //connection.addEventListener(FaultEvent.FAULT, myFault, true);
        
        //var token:AsyncToken = connection.send(envelope.toString());
        //token.addResponder(responder);
    	
    	dispatchEvent(new SendEvent(SendEvent.SEND_REQUEST, envelope.toString()));
  	}
  
  public function myFault(event:Event):void {
    trace(event.toString());
  }

  private function handleComplete(event:Event):void
  {
    if (responder != null)
    {
      responder.result({result: parseXML(event.target.data)});
    }
  }

  private function parseXML(xml:Object):Object
  {
    // comment node
    if (xml.nodeType == 7)
    {
      return null;
    }

    var o:Object = new Object();

    // add properties to data
    if (xml.attributes != null)
    {
      for (var i:int = 0; i < xml.attributes.length; i++)
      {
        o[xml.attributes[i].localName] = xml.attributes[i].nodeValue;
      }
    }

    if (xml.childNodes != null)
    {
      var nameExists:Object = new Object();
      for (var j:int = 0; j < xml.childNodes.length; j++)
      {
        var n:String = xml.childNodes[j].localName;
        if ((nameExists[n] != undefined) && (o[n] == undefined))
        {
          o[n] = new ArrayCollection();
        }
        else
        {
          nameExists[n] = true;
        }
      }

      for (var k:int = 0; k < xml.childNodes.length; k++)
      {
        // text node
        if (xml.childNodes[k].nodeType == 3 || xml.childNodes[k].nodeType == 4)
        {
          return xml.childNodes[k].nodeValue;
        }

        var ln:String = xml.childNodes[k].localName;

        if (o[ln] is ArrayCollection)
        {
          o[ln].addItem(parseXML(xml.childNodes[k]));
        }
        else
        {
          o[ln] = parseXML(xml.childNodes[k]);
        }
      }
    }

    return o;
  }
}
}
