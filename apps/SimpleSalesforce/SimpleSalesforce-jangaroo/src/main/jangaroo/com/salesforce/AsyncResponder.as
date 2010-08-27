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
import mx.rpc.IResponder;
import mx.rpc.events.ResultEvent;
import mx.rpc.events.FaultEvent;
import mx.utils.ObjectUtil;
/**
 * Simple responder class, extends IResponder, calls the success or fault functions with data or data from an event, 
 * used in all calls to the salesforce API.
 * 
 * If the second argument is null or omitted, a simple default fault handler will be 
 * installed to alert the user to the fault message. If you need to do processing upon fault, 
 * be sure to create this object and specify your fault function.
 * 
 * @example var ar:AsyncResponder = new AsyncResponder( successfunc, faultfunc);<br> 
 * connection.query("select id from account", ar); 
 * 
 * @author James Ward Adobe
 * 
 */
public class AsyncResponder implements IResponder
{
  private var _resultHandler:Function;
  private var _faultHandler:Function;
  private var _context:Object;
  
  public function AsyncResponder(result:Function, fault:Function = null, context:Object = null)
  {
    super();
    _resultHandler = result;
    if ( fault == null ) { 
    	fault = defaultFault; // handy default if none provided
    }
    _faultHandler = fault;
    _context = context;
  }
  public function get resultHandler():Function {
  	return _resultHandler;
  }
  public function get faultHandler():Function {
  	return _faultHandler;
  }
  public function set context(value:Object):void {
  	_context = context;
  }
  public function get context():Object {
  	return _context;
  }
  public function result(data:Object):void
  {
    if (data is ResultEvent)
    {
    	var res:Object = (data as ResultEvent).result;
    	res.context = _context;
      _resultHandler((data as ResultEvent).result);
    }
    else
    {
    	try {data.context = _context;} catch(e:Error) {}
      _resultHandler(data);
    }
  }
  
  public function fault(data:Object):void
  {
    if (data is FaultEvent)
    {
      _faultHandler((data as FaultEvent).fault);
    }
    else
    {
      _faultHandler(data);
    }
  }
  
  private function defaultFault (fault:Object):void {
    //Alert.show(ObjectUtil.toString(fault));
  }
}
}
