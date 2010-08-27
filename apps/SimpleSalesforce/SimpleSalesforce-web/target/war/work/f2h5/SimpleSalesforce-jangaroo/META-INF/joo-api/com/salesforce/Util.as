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
	import com.salesforce.events.DebugEvent;
	
	import mx.core.Application;
/**
 * Utility Date routines to transform UTC dates from their SOAP style to and from Action Script dates and date times
 * 
 * @author rhess
 * 
 */	
public class Util
{
  	public static const millisecondsPerMinute:int = 1000 * 60;
	public static const millisecondsPerHour:int = 1000 * 60 * 60;
	public static const millisecondsPerDay:int = 1000 * 60 * 60 * 24;
	
  /*
  public static function dateToString(theDate:Date):String
  {
    var today = theDate;
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    return  year + "-" + month + "-" + day;
  }
  */
	
	public static native function dateToString(theDate:Date):String;
	public static native function debug(obj:Object, message:String):void;
  /*
   * todo: convert to Flex's DateFormatter
   */
  public static native function dateTimeToString(theDate:Date):String;
  
  
  public static native function stringToDate(source:String):Date;


  public static native function stringToDateTime(source:String):Date; 
  
}
}