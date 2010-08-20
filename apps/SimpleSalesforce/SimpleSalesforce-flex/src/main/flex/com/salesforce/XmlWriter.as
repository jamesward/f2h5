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
/**
 * 
 * @private
 * 
 */	
public class XmlWriter
{
  private var buffer:String;
  private var nspaces:Object;
  private var prefixCount:int = 0;
  private var writingStartElement:Boolean;
  
  private static var soapNS:String = "http://schemas.xmlsoap.org/soap/envelope/";
  
  public function XmlWriter()
  {
    buffer = new String("");
    nspaces = new Object();
    prefixCount = 0;
    writingStartElement = false;
  }
  
  public function writeStartElement(name:String, nspace:String=null, prefix:String=null):void
  {
    if (writingStartElement) {
        append(">");
    }
    append("<");
    var newns:Boolean = false;
    if (nspace) {
        if (!nspaces[nspace] && nspaces[nspace] !== "") {
            newns = true;
        }
        if (!prefix) {
            prefix = getPrefix(nspace);
        }
        if (prefix !== null && prefix !== "") {
           append(prefix);
           append(":");
        }
    }

    append(name);
    if (newns === true) {
        writeNamespace(nspace, prefix);
    }
    writingStartElement = true;
  }

  public function writeEndElement(name:String, nspace:String=null):void
  {
    if (writingStartElement) {
        append("/>");
    } else {
        append("</");
        if (nspace) {
            var prefix:String = getPrefix(nspace);
            if (prefix && prefix !== "") {
              append(prefix);
              append(":");
            }
        }
        append(name);
        append(">");
    }
    writingStartElement = false;
  }

  public function writeNamespace(nspace:String, prefix:String):void
  {
    if (prefix && "" !== prefix) {
        nspaces[nspace] = prefix;
        append(" ");
        append("xmlns:");
        append(prefix);
    } else {
        nspaces[nspace] = "";
        append(" ");
        append("xmlns");
    }
    append("=\"");
    append(nspace);
    append("\"");
  }

  public function writeText(text:String):void
  {
    if (writingStartElement) {
        append(">");
        writingStartElement = false;
    } else {
        throw "Can only write text after a start element";
    }
    if (typeof text == 'string') {
        text = text.replace(/&/g, '\&amp;');
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');
    }

    append(text);
  }

  public function writeXsiType(xsiType:String):void
  {
    writeNamespace("http://www.w3.org/2001/XMLSchema-instance", "xsi");
    writeAttribute("xsi:type", xsiType);
  }

  public function writeAttribute(name:String, value:String):void
  {
    append(" " + name + "=\"" + value + "\"");
  }

  public function getPrefix(nspace:String):String
  {
    var prefix:String = nspaces[nspace];
    //sforce.debug.log("--------");
    //sforce.debug.log(nspace + ":" + (prefix === null ? "null":prefix) + ":");
    if (!prefix && prefix !== "") {
        prefix = "ns" + prefixCount;
        prefixCount++;
        nspaces[nspace] = prefix;
        return prefix;
    }
    return prefix;
  }

  public function toString():String
  {
    return buffer;
  }


  public function startEnvelope():void
  {
    writeStartElement("Envelope", soapNS, "se");
  }

  public function endEnvelope():void
  {
    writeEndElement("Envelope", soapNS);
  }

  public function startHeader():void
  {
    writeStartElement("Header", soapNS, "se");
  }

  public function endHeader():void
  {
    writeEndElement("Header", soapNS);
  }

  public function startBody():void
  {
    writeStartElement("Body", soapNS, "se");
  }

  public function endBody():void
  {
    writeEndElement("Body", soapNS);
  }

  public function writeNameValueNode(name:String, value:Object):void
  {

    if (value is Date)
    {
        writeStartElement(name);
        writeText(Util.dateTimeToString(value as Date));
        writeEndElement(name);
    }
    else if (value is Boolean)
    {
        // boolean 'false' values get joined in string buffer,
        // so convert to strings:
        var textValue:String = value ? "true" : "false";
        writeStartElement(name);
        writeText(textValue);
        writeEndElement(name);
    }
    else if (value && (value is Array))
    {
        for (var v:Object in value)
        {
            writeStartElement(name);
            writeText(value[v]);
            writeEndElement(name);
        }
    }
    else
    {
      writeStartElement(name);
      writeText(value.toString());
      writeEndElement(name);
    }
  }

  /* private to this class 
   * add a string to the buffer we are building
   */
  private function append(s:String):void 
  { 
  	this.buffer = this.buffer.concat(s);
  }
  
}
}