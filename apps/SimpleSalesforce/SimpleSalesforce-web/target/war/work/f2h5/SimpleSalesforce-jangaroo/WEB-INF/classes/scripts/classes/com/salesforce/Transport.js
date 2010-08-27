joo.classLoader.prepare(/*
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
"package com.salesforce",/*
{
import flash.events.Event
import flash.events.EventDispatcher
import flash.net.URLLoader
import flash.net.URLRequest
import flash.net.URLRequestHeader
import flash.net.URLRequestMethod

import mx.rpc.IResponder
import mx.collections.ArrayCollection

import com.salesforce.events.SendEvent

[Event(name="sendRequest", type="com.salesforce.events.SendEvent")]*/
/**
 * 
 * @private
 * 
 */	
"public class Transport extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$connection=$$l+'connection',$responder=$$l+'responder',$newConnection=$$l+'newConnection',$handleComplete=$$l+'handleComplete',$parseXML=$$l+'parseXML';return[function(){joo.classLoader.init(com.salesforce.events.SendEvent,flash.net.URLRequestMethod,flash.net.URLRequestHeader,mx.collections.ArrayCollection,Array,flash.events.Event,flash.net.URLLoader,Object,flash.net.URLRequest);},

  
  "public var",{ url/*:String*/: undefined},
  "private var",{ connection/*:URLLoader*/: undefined},
  "private var",{ responder/*:IResponder*/: undefined},
  

  "public function Transport",function $Transport(url/*:String=null*/)
  {if(arguments.length<1){url=null;}this[$super]();
    if (url != null)
    {
      this.url = url;
    }
  },
  
  "private function newConnection",function newConnection()/*:void*/
  { 
    this[$connection] = new flash.net.URLLoader();
  },

  	"public function send",function send(envelope/*:XmlWriter*/,responder/*:IResponder*/)/*:void*/
  	{
    	this[$newConnection]();
        this[$responder] = responder;
        var request/*:URLRequest*/ = new flash.net.URLRequest();

        request.method = flash.net.URLRequestMethod.POST;
	request.url = this.url;
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
          new flash.net.URLRequestHeader("SOAPAction", "\"\""),
          new flash.net.URLRequestHeader("Accept", "text/xml"),
          new flash.net.URLRequestHeader("X-Salesforce-No-500-SC", "true")
        );

        request.data = envelope.toString();
        this[$connection].dataFormat = "xml";
        this[$connection].addEventListener(flash.events.Event.COMPLETE, $$bound(this,$handleComplete));
        this[$connection].load(request);

        //connection.addEventListener(FaultEvent.FAULT, myFault, true);
        
        //var token:AsyncToken = connection.send(envelope.toString());
        //token.addResponder(responder);
    	
    	this.dispatchEvent(new com.salesforce.events.SendEvent(com.salesforce.events.SendEvent.SEND_REQUEST, envelope.toString()));
  	},
  
  "public function myFault",function myFault(event/*:Event*/)/*:void*/ {
    trace(event.toString());
  },

  "private function handleComplete",function handleComplete(event/*:Event*/)/*:void*/
  {
    if (this[$responder] != null)
    {
      this[$responder].result({result: this[$parseXML](event.target.data)});
    }
  },

  "private function parseXML",function parseXML(xml/*:Object*/)/*:Object*/
  {
    // comment node
    if (xml.nodeType == 7)
    {
      return null;
    }

    var o/*:Object*/ = new Object();

    // add properties to data
    if (xml.attributes != null)
    {
      for (var i/*:int*/ = 0; i < xml.attributes.length; i++)
      {
        o[xml.attributes[i].localName] = xml.attributes[i].nodeValue;
      }
    }

    if (xml.childNodes != null)
    {
      var nameExists/*:Object*/ = new Object();
      for (var j/*:int*/ = 0; j < xml.childNodes.length; j++)
      {
        var n/*:String*/ = xml.childNodes[j].localName;
        if ((nameExists[n] != undefined) && (o[n] == undefined))
        {
          o[n] = new mx.collections.ArrayCollection();
        }
        else
        {
          nameExists[n] = true;
        }
      }

      for (var k/*:int*/ = 0; k < xml.childNodes.length; k++)
      {
        // text node
        if (xml.childNodes[k].nodeType == 3 || xml.childNodes[k].nodeType == 4)
        {
          return xml.childNodes[k].nodeValue;
        }

        var ln/*:String*/ = xml.childNodes[k].localName;

        if ( is(o[ln], mx.collections.ArrayCollection))
        {
          o[ln].addItem(this[$parseXML](xml.childNodes[k]));
        }
        else
        {
          o[ln] = this[$parseXML](xml.childNodes[k]);
        }
      }
    }

    return o;
  },
];},[],["flash.events.EventDispatcher","flash.net.URLLoader","flash.net.URLRequest","flash.net.URLRequestMethod","Array","flash.net.URLRequestHeader","flash.events.Event","com.salesforce.events.SendEvent","Object","mx.collections.ArrayCollection"]
);