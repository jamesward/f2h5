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
{*/
/**
 * 
 * @private
 * 
 */	
"public class XmlWriter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$buffer=$$l+'buffer',$nspaces=$$l+'nspaces',$prefixCount=$$l+'prefixCount',$writingStartElement=$$l+'writingStartElement',$append=$$l+'append';return[function(){joo.classLoader.init(Date,String,Array,Boolean,Object);},

  "private var",{ buffer/*:String*/: undefined},
  "private var",{ nspaces/*:Object*/: undefined},
  "private var",{ prefixCount/*:int*/ : 0},
  "private var",{ writingStartElement/*:Boolean*/: undefined},
  
  "private static var",{ soapNS/*:String*/ : "http://schemas.xmlsoap.org/soap/envelope/"},
  
  "public function XmlWriter",function $XmlWriter()
  {this[$super]();
    this[$buffer] = new String("");
    this[$nspaces] = new Object();
    this[$prefixCount] = 0;
    this[$writingStartElement] = false;
  },
  
  "public function writeStartElement",function writeStartElement(name/*:String*/, nspace/*:String=null*/, prefix/*:String=null*/)/*:void*/
  {if(arguments.length<3){if(arguments.length<2){nspace=null;}prefix=null;}
    if (this[$writingStartElement]) {
        this[$append](">");
    }
    this[$append]("<");
    var newns/*:Boolean*/ = false;
    if (nspace) {
        if (!this[$nspaces][nspace] && this[$nspaces][nspace] !== "") {
            newns = true;
        }
        if (!prefix) {
            prefix = this.getPrefix(nspace);
        }
        if (prefix !== null && prefix !== "") {
           this[$append](prefix);
           this[$append](":");
        }
    }

    this[$append](name);
    if (newns === true) {
        this.writeNamespace(nspace, prefix);
    }
    this[$writingStartElement] = true;
  },

  "public function writeEndElement",function writeEndElement(name/*:String*/, nspace/*:String=null*/)/*:void*/
  {if(arguments.length<2){nspace=null;}
    if (this[$writingStartElement]) {
        this[$append]("/>");
    } else {
        this[$append]("</");
        if (nspace) {
            var prefix/*:String*/ = this.getPrefix(nspace);
            if (prefix && prefix !== "") {
              this[$append](prefix);
              this[$append](":");
            }
        }
        this[$append](name);
        this[$append](">");
    }
    this[$writingStartElement] = false;
  },

  "public function writeNamespace",function writeNamespace(nspace/*:String*/, prefix/*:String*/)/*:void*/
  {
    if (prefix && "" !== prefix) {
        this[$nspaces][nspace] = prefix;
        this[$append](" ");
        this[$append]("xmlns:");
        this[$append](prefix);
    } else {
        this[$nspaces][nspace] = "";
        this[$append](" ");
        this[$append]("xmlns");
    }
    this[$append]("=\"");
    this[$append](nspace);
    this[$append]("\"");
  },

  "public function writeText",function writeText(text/*:String*/)/*:void*/
  {
    if (this[$writingStartElement]) {
        this[$append](">");
        this[$writingStartElement] = false;
    } else {
        throw "Can only write text after a start element";
    }
    if (typeof text == 'string') {
        text = text.replace(/&/g, '&amp;');
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');
    }

    this[$append](text);
  },

  "public function writeXsiType",function writeXsiType(xsiType/*:String*/)/*:void*/
  {
    this.writeNamespace("http://www.w3.org/2001/XMLSchema-instance", "xsi");
    this.writeAttribute("xsi:type", xsiType);
  },

  "public function writeAttribute",function writeAttribute(name/*:String*/, value/*:String*/)/*:void*/
  {
    this[$append](" " + name + "=\"" + value + "\"");
  },

  "public function getPrefix",function getPrefix(nspace/*:String*/)/*:String*/
  {
    var prefix/*:String*/ = this[$nspaces][nspace];
    //sforce.debug.log("--------");
    //sforce.debug.log(nspace + ":" + (prefix === null ? "null":prefix) + ":");
    if (!prefix && prefix !== "") {
        prefix = "ns" + this[$prefixCount];
        this[$prefixCount]++;
        this[$nspaces][nspace] = prefix;
        return prefix;
    }
    return prefix;
  },

  "public function toString",function toString()/*:String*/
  {
    return this[$buffer];
  },


  "public function startEnvelope",function startEnvelope()/*:void*/
  {
    this.writeStartElement("Envelope", $$private.soapNS, "se");
  },

  "public function endEnvelope",function endEnvelope()/*:void*/
  {
    this.writeEndElement("Envelope", $$private.soapNS);
  },

  "public function startHeader",function startHeader()/*:void*/
  {
    this.writeStartElement("Header", $$private.soapNS, "se");
  },

  "public function endHeader",function endHeader()/*:void*/
  {
    this.writeEndElement("Header", $$private.soapNS);
  },

  "public function startBody",function startBody()/*:void*/
  {
    this.writeStartElement("Body", $$private.soapNS, "se");
  },

  "public function endBody",function endBody()/*:void*/
  {
    this.writeEndElement("Body", $$private.soapNS);
  },

  "public function writeNameValueNode",function writeNameValueNode(name/*:String*/, value/*:Object*/)/*:void*/
  {

    if ( is(value, Date))
    {
        this.writeStartElement(name);
        this.writeText(com.salesforce.Util.dateTimeToString(value/*as Date*/));
        this.writeEndElement(name);
    }
    else if ( is(value, Boolean))
    {
        // boolean 'false' values get joined in string buffer,
        // so convert to strings:
        var textValue/*:String*/ = value ? "true" : "false";
        this.writeStartElement(name);
        this.writeText(textValue);
        this.writeEndElement(name);
    }
    else if (value && ( is(value, Array)))
    {
        for (var v/*:Object*/ in value)
        {
            this.writeStartElement(name);
            this.writeText(value[v]);
            this.writeEndElement(name);
        }
    }
    else
    {
      this.writeStartElement(name);
      this.writeText(value.toString());
      this.writeEndElement(name);
    }
  },

  /* private to this class 
   * add a string to the buffer we are building
   */
  "private function append",function append(s/*:String*/)/*:void*/ 
  { 
  	this[$buffer] = this[$buffer].concat(s);
  },
  
];},[],["String","Object","Date","com.salesforce.Util","Boolean","Array"]
);