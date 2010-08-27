joo.classLoader.prepare(


























"package com.salesforce",










"public class Util",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Date,Number,String,com.salesforce.events.DebugEvent);},

"public static const",{millisecondsPerMinute:1000*60},
"public static const",{millisecondsPerHour:1000*60*60},
"public static const",{millisecondsPerDay:1000*60*60*24},












"public static function dateToString",function(theDate){

var today=theDate;
var year=today.getFullYear();
var month=today.getMonth()+1;
var day=today.getDate();
var monthString=new String();
var dayString=new String();

if(month<=9)
{
monthString="0"+month;
}
else
{
monthString=month.toString();
}

if(day<=9)
{
dayString="0"+day;
}
else
{
dayString=day.toString();
}
return year+"-"+monthString+"-"+dayString;
},
"public static function debug",function(obj,message){
obj.dispatchEvent(new com.salesforce.events.DebugEvent(com.salesforce.events.DebugEvent.DEBUG_EVENT,message));
},



"public static function dateTimeToString",function(theDate)
{
var today=theDate;
var year=today.getFullYear();
var month=today.getMonth()+1;
var day=today.getDate();
var hour=today.getHours();
var hourUTC=today.getUTCHours();
var diff=hour-hourUTC;

if(diff>12)
{
diff=diff-24;
}

var hourdifference=Math.abs(diff);
var minute=today.getMinutes();
var minuteUTC=today.getUTCMinutes();
var minutedifference=Math.abs(minute-minuteUTC);
var second=today.getSeconds();

var secondString=new String();
var monthString=new String();
var dayString=new String();
var hourString=new String();
var minuteString=new String();
var minutedifferenceString=new String();

if(second<=9)
{
secondString="0"+second.toString();
}
else
{
secondString=second.toString();
}

var milli=today.getMilliseconds().toString();

if(milli!="0")
{
milli="."+milli;
if(milli.length>4)
{
milli=milli.substring(0,4);
}
secondString=secondString+milli;
}

var timezone;
var pm;

if(hourdifference+minutedifference===0)
{
timezone="Z";
}
else
{
if(diff>0)
{
pm="+";
}
else
{
pm="-";
}

if(minutedifference<10)
{
minutedifferenceString="0"+minutedifference.toString();
}
else
{
minutedifferenceString=minutedifference.toString();
}

if(hourdifference<10)
{
timezone=pm+"0"+hourdifference+":"+minutedifferenceString;
}
else
{
timezone=pm+hourdifference+":"+minutedifferenceString;
}
}

if(month<=9)
{
monthString="0"+month;
}
else
{
monthString=month.toString();
}

if(day<=9)
{
dayString="0"+day;
}
else
{
dayString=day.toString();
}

if(hour<=9)
{
hourString="0"+hour;
}
else
{
hourString=hour.toString();
}

if(minute<=9)
{
minuteString="0"+minute;
}
else
{
minuteString=minute.toString();
}

return year+"-"+monthString+"-"+dayString+"T"+hourString+":"+minuteString+":"+secondString+timezone;
},


"public static function stringToDate",function(source)
{
var bc=false;
if(source===null||source.length===0){
throw"Unable to parse dateTime";
}

if(source.charAt(0)=='+'){
source=source.substring(1);
}

if(source.charAt(0)=='-'){
source=source.substring(1);
bc=true;
}





if(source.charAt(4)!='-'||source.charAt(7)!='-'){
throw("Unable to parse date");
}

var year=source.substring(0,4);
var month=source.substring(5,7);
var day=source.substring(8,10);
var date=new Date(year,month,day);
date.setFullYear(year);
date.setDate(day);
var m=new Number(month);
m=m-1;
date.setMonth(m.toString());







return date;
},


"public static function stringToDateTime",function(source)
{
var bc=false;
if(source===null||source.length===0){
throw"Unable to parse dateTime";
}

if(source.charAt(0)=='+'){
source=source.substring(1);
}
if(source.charAt(0)=='-'){
source=source.substring(1);
bc=true;
}

if(source.length<19){
throw("Unable to parse dateTime");
}

if(source.charAt(4)!='-'||source.charAt(7)!='-'||
source.charAt(10)!='T'){
throw("Unable to parse dateTime");
}

if(source.charAt(13)!=':'||source.charAt(16)!=':'){
throw("Unable to parse dateTime");
}

var date=new Date();
var year=source.substring(0,4);
var month=source.substring(5,7);
var day=source.substring(8,10);
var hour=source.substring(11,13);
var min=source.substring(14,16);
var sec=source.substring(17,19);

date.setFullYear(year);
date.setDate(day);
var xyz=new Number(month);
xyz=xyz-1;
var mmonth=new String(xyz);
date.setMonth(mmonth);
date.setHours(hour);
date.setMinutes(min);
date.setSeconds(sec);

var pos=19;


if(pos<source.length&&source.charAt(pos)=='.'){
var milliseconds=0;
var start=++pos;
while(pos<source.length&&$$private.isDigit(source.charAt(pos))){
pos++;
}
var decimal=source.substring(start,pos);
if(decimal.length==3){
milliseconds=decimal;
}else if(decimal.length<3){
milliseconds=((decimal+"000").substring(0,3));
}else{
milliseconds=decimal.substring(0,3);
if(decimal.charAt(3)>='5'){
milliseconds++;;
}
}

date.setMilliseconds(milliseconds.toString());
}

var offset=date.getTimezoneOffset()*60000;



if(pos+5<source.length&&
(source.charAt(pos)=='+'||(source.charAt(pos)=='-'))){
if(!$$private.isDigit(source.charAt(pos+1))||
!$$private.isDigit(source.charAt(pos+2))||
source.charAt(pos+3)!=':'||
!$$private.isDigit(source.charAt(pos+4))||
!$$private.isDigit(source.charAt(pos+5))){
throw"Unable to parse dateTime";
}
var hours=(new Number(source.charAt(pos+1)))*10+(new Number(source.charAt(pos+2)));
var mins=(new Number(source.charAt(pos+4)))*10+(new Number(source.charAt(pos+5)));
var mseconds=(hours*60+mins)*60*1000;


if(source.charAt(pos)=='+'){
mseconds=-mseconds;
}

date=new Date(date.getTime()-offset+mseconds);
pos+=6;
}

if(pos<source.length&&source.charAt(pos)=='Z'){
pos++;
date=new Date(date.getTime()-offset);
}





return date;
},


"private static function isDigit",function(ch)
{

if(ch=='0'||ch=='1'||ch=='2'||ch=='3'||ch=='4'||
ch=='5'||ch=='6'||ch=='7'||ch=='8'||ch=='9'){
return true;
}else{
return false;
}
},

];},["dateToString","debug","dateTimeToString","stringToDate","stringToDateTime"],["String","com.salesforce.events.DebugEvent","Math","Date","Number"]
);