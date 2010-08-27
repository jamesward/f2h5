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
  
  public native function XmlWriter();
  
  public native function writeStartElement(name:String, nspace:String=null, prefix:String=null):void;

  public native function writeEndElement(name:String, nspace:String=null):void;

  public native function writeNamespace(nspace:String, prefix:String):void;

  public native function writeText(text:String):void;

  public native function writeXsiType(xsiType:String):void;

  public native function writeAttribute(name:String, value:String):void;

  public native function getPrefix(nspace:String):String;

  public native function toString():String;


  public native function startEnvelope():void;

  public native function endEnvelope():void;

  public native function startHeader():void;

  public native function endHeader():void;

  public native function startBody():void;

  public native function endBody():void;

  public native function writeNameValueNode(name:String, value:Object):void;
  
}
}