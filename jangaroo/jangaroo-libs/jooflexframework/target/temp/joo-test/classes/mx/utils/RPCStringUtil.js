joo.classLoader.prepare(










"package mx.utils",











"public class RPCStringUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Array,RegExp);},
















"public static const",{VERSION:"4.1.0.16076"},






















"public static function trim",function(str)
{
if(str==null)return'';

var startIndex=0;
while(mx.utils.RPCStringUtil.isWhitespace(str.charAt(startIndex)))
++startIndex;

var endIndex=str.length-1;
while(mx.utils.RPCStringUtil.isWhitespace(str.charAt(endIndex)))
--endIndex;

if(endIndex>=startIndex)
return str.slice(startIndex,endIndex+1);
else
return"";
},

















"public static function trimArrayElements",function(value,delimiter)
{
if(value!=""&&value!=null)
{
var items=value.split(delimiter);

var len=items.length;
for(var i=0;i<len;i++)
{
items[i]=mx.utils.RPCStringUtil.trim(items[i]);
}

if(len>0)
{
value=items.join(delimiter);
}
}

return value;
},















"public static function isWhitespace",function(character)
{
switch(character)
{
case" ":
case"\t":
case"\r":
case"\n":
case"\f":
return true;

default:
return false;
}
},









































"public static function substitute",function(str)
{var rest=Array.prototype.slice.call(arguments,1);
if(str==null)return'';


var len=rest.length;
var args;
if(len==1&&is(rest[0],Array))
{
args=rest[0];
len=args.length;
}
else
{
args=rest;
}

for(var i=0;i<len;i++)
{
str=str.replace(new RegExp("\\{"+i+"\\}","g"),args[i]);
}

return str;
},
];},["trim","trimArrayElements","isWhitespace","substitute"],["Array","RegExp"]

);