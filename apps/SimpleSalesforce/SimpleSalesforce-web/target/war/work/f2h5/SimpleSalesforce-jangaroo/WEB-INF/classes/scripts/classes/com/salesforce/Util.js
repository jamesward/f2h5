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
	import com.salesforce.events.DebugEvent
	
	import mx.core.Application*/
/**
 * Utility Date routines to transform UTC dates from their SOAP style to and from Action Script dates and date times
 * 
 * @author rhess
 * 
 */	
"public class Util",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Date,Number,String,com.salesforce.events.DebugEvent);},

  	"public static const",{ millisecondsPerMinute/*:int*/ : 1000 * 60},
	"public static const",{ millisecondsPerHour/*:int*/ : 1000 * 60 * 60},
	"public static const",{ millisecondsPerDay/*:int*/ : 1000 * 60 * 60 * 24},
	
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
	
	"public static function dateToString",function dateToString(theDate/*:Date*/)/*:String*/ {
		
    var today/*:Date*/ = theDate;
    var year/*:Number*/ = today.getFullYear();
    var month/*:Number*/ = today.getMonth() + 1;
    var day/*:Number*/ = today.getDate();
    var monthString/*:String*/ = new String();
    var dayString/*:String*/ = new String();

    if (month <= 9)
    {
        monthString = "0" + month;
    }
    else
    {
        monthString = month.toString();
    }
    
    if (day <= 9)
    {
        dayString = "0" + day;
    }
    else
    {
        dayString = day.toString();
    }
    return  year + "-" + monthString + "-" + dayString;
  },
	"public static function debug",function debug(obj/*:Object*/, message/*:String*/)/*:void*/ {
		obj.dispatchEvent(new com.salesforce.events.DebugEvent(com.salesforce.events.DebugEvent.DEBUG_EVENT, message));
	},
  /*
   * todo: convert to Flex's DateFormatter
   */
  "public static function dateTimeToString",function dateTimeToString(theDate/*:Date*/)/*:String*/
  {
    var today/*:Date*/ = theDate;
    var year/*:Number*/ = today.getFullYear();
    var month/*:Number*/ = today.getMonth() + 1;
    var day/*:Number*/ = today.getDate();
    var hour/*:Number*/ = today.getHours();
    var hourUTC/*:Number*/ = today.getUTCHours();
    var diff/*:Number*/ = hour - hourUTC;
    
    if (diff > 12)
    {
        diff = diff - 24;
    }
    
    var hourdifference/*:Number*/ = Math.abs(diff);
    var minute/*:Number*/ = today.getMinutes();
    var minuteUTC/*:Number*/ = today.getUTCMinutes();
    var minutedifference/*:Number*/ = Math.abs(minute - minuteUTC);
    var second/*:Number*/ = today.getSeconds();
    
    var secondString/*:String*/ = new String();
    var monthString/*:String*/ = new String();
    var dayString/*:String*/ = new String();
    var hourString/*:String*/ = new String();
    var minuteString/*:String*/ = new String();
    var minutedifferenceString/*:String*/ = new String();
    
    if (second <= 9)
    {
        secondString = "0" + second.toString();
    }
    else
    {
        secondString = second.toString();
    }

    var milli/*:String*/ = today.getMilliseconds().toString();
    
    if (milli != "0")
    {
        milli = "." + milli;
        if (milli.length > 4)
        {
            milli = milli.substring(0, 4);
        }
        secondString = secondString + milli;
    }

    var timezone/*:String*/;
    var pm/*:String*/;

    if (hourdifference + minutedifference === 0)
    {
        timezone = "Z";
    }
    else
    {
        if (diff > 0)
        {
            pm = "+";
        }
        else
        {
            pm = "-";
        }
        
        if (minutedifference < 10)
        {
            minutedifferenceString = "0" + minutedifference.toString();
        }
        else
        {
            minutedifferenceString = minutedifference.toString();
        }
        
        if (hourdifference < 10)
        {
            timezone = pm + "0" + hourdifference + ":" + minutedifferenceString;
        }
        else
        {
            timezone = pm + hourdifference + ":" + minutedifferenceString;
        }
    }

    if (month <= 9)
    {
        monthString = "0" + month;
    }
    else
    {
        monthString = month.toString();
    }
    
    if (day <= 9)
    {
        dayString = "0" + day;
    }
    else
    {
        dayString = day.toString();
    }
    
    if (hour <= 9)
    {
        hourString = "0" + hour;
    }
    else
    {
        hourString = hour.toString();
    }
    
    if (minute <= 9)
    {
        minuteString = "0" + minute;
    }
    else
    {
        minuteString = minute.toString();
    }

    return  year + "-" + monthString + "-" + dayString + "T" + hourString + ":" + minuteString + ":" + secondString + timezone;
  },
  
  
  "public static function stringToDate",function stringToDate(source/*:String*/)/*:Date*/
  {
    var bc/*:Boolean*/ = false;
    if (source === null || source.length === 0) {
        throw "Unable to parse dateTime";
    }

    if (source.charAt(0) == '+') {
        source = source.substring(1);
    }

    if (source.charAt(0) == '-') {
        source = source.substring(1);
        bc = true;
    }

    /*if (source.length != 10) {
        throw ("Unable to parse date, " + source + " length != 10");
    }*/

    if (source.charAt(4) != '-' || source.charAt(7) != '-') {
        throw ("Unable to parse date");
    }

    var year/*:String*/ = source.substring(0, 4);
    var month/*:String*/ = source.substring(5, 7);
    var day/*:String*/ = source.substring(8, 10);
    var date/*:Date*/ = new Date(year, month/*as int*/, day/*as int*/);
	date.setFullYear(year);
	date.setDate(day);
	var m/*:Number*/ = new Number(month);
	m = m - 1;
	date.setMonth(m.toString());
    //date.setFullYear(year as Number);

    //date.setHours(0);
    //date.setMinutes(0);
    //date.setSeconds(0);
    //date.setMilliseconds(0);

    return date;
  },


  "public static function stringToDateTime",function stringToDateTime(source/*:String*/)/*:Date*/
  {
    var bc/*:Boolean*/ = false;
    if (source === null || source.length === 0) {
        throw "Unable to parse dateTime";
    }

    if (source.charAt(0) == '+') {
        source = source.substring(1);
    }
    if (source.charAt(0) == '-') {
        source = source.substring(1);
        bc = true;
    }

    if (source.length < 19) {
        throw ("Unable to parse dateTime");
    }

    if (source.charAt(4) != '-' || source.charAt(7) != '-' ||
        source.charAt(10) != 'T') {
        throw ("Unable to parse dateTime");
    }

    if (source.charAt(13) != ':' || source.charAt(16) != ':') {
        throw ("Unable to parse dateTime");
    }

    var date/*:Date*/ = new Date();
    var year/*:String*/ = source.substring(0, 4);
    var month/*:String*/ = source.substring(5, 7);
    var day/*:String*/ = source.substring(8, 10);
    var hour/*:String*/ = source.substring(11, 13);
    var min/*:String*/ = source.substring(14, 16);
    var sec/*:String*/ = source.substring(17, 19);

    date.setFullYear(year);//.setYear(year as Number);
    date.setDate(day);
    var xyz/*:Number*/ = new Number(month);
    xyz = xyz - 1;
    var mmonth/*:String*/ = new String(xyz);
    date.setMonth(mmonth);
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(sec);

    var pos/*:int*/ = 19;

    // parse optional milliseconds
    if (pos < source.length && source.charAt(pos) == '.') {
        var milliseconds/*:int*/ = 0;
        var start/*:int*/ = ++pos;
        while (pos < source.length && $$private.isDigit(source.charAt(pos))) {
            pos++;
        }
        var decimal/*:String*/ = source.substring(start, pos);
        if (decimal.length == 3) {
            milliseconds = decimal/*as int*/;
        } else if (decimal.length < 3) {
            milliseconds = ((decimal + "000").substring(0, 3))/*as int*/;
        } else {
            milliseconds = decimal.substring(0, 3)/*as int*/;
            if (decimal.charAt(3) >= '5') {
                milliseconds++;;
            }
        }

        date.setMilliseconds(milliseconds.toString());
    }

    var offset/*:int*/ = date.getTimezoneOffset() * 60000;
    //offset in milli;

    // parse optional timezone
    if (pos + 5 < source.length &&
        (source.charAt(pos) == '+' || (source.charAt(pos) == '-'))) {
        if (!$$private.isDigit(source.charAt(pos + 1)) ||
            !$$private.isDigit(source.charAt(pos + 2)) ||
            source.charAt(pos + 3) != ':' ||
            !$$private.isDigit(source.charAt(pos + 4)) ||
            !$$private.isDigit(source.charAt(pos + 5))) {
            throw "Unable to parse dateTime";
        }
        var hours/*:int*/ = (new Number(source.charAt(pos + 1))) * 10 + (new Number(source.charAt(pos + 2)));
        var mins/*:int*/ = (new Number(source.charAt(pos + 4))) * 10 + (new Number(source.charAt(pos + 5)));
        var mseconds/*:int*/ = (hours * 60 + mins) * 60 * 1000;

        // subtract milliseconds from current date to obtain GMT
        if (source.charAt(pos) == '+') {
            mseconds = -mseconds;
        }

        date = new Date(date.getTime() - offset + mseconds);
        pos += 6;
    }

    if (pos < source.length && source.charAt(pos) == 'Z') {
        pos++;
        date = new Date(date.getTime() - offset);
    }

   // if (pos < source.length) {
   //     throw ("Unable to parse dateTime");
   // }

    return date;
  },


  "private static function isDigit",function isDigit(ch/*:String*/)/*:Boolean*/
  {
  	
    if (ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' ||
        ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9') {
        return true;
    } else {
        return false;
    }
  }, 
  
];},["dateToString","debug","dateTimeToString","stringToDate","stringToDateTime"],["String","com.salesforce.events.DebugEvent","Math","Date","Number"]
);