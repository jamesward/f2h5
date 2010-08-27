joo.classLoader.prepare("package mx.utils",


"public class URLUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static function getProtocol",function(url)
{
var slash=url.indexOf("/");
var indx=url.indexOf(":/");
if(indx>-1&&indx<slash)
{
return url.substring(0,indx);
}
else
{
indx=url.indexOf("::");
if(indx>-1&&indx<slash)
return url.substring(0,indx);
}

return"";
},

"public static function getServerNameWithPort",function(url)
{

var start=url.indexOf("/")+2;
var length=url.indexOf("/",start);
return length==-1?url.substring(start):url.substring(start,length);
},

"public static function getServerName",function(url)
{
var sp=mx.utils.URLUtil.getServerNameWithPort(url);


var delim=sp.indexOf("]");
delim=(delim>-1)?sp.indexOf(":",delim):sp.indexOf(":");

if(delim>0)
sp=sp.substring(0,delim);
return sp;
},

];},["getProtocol","getServerNameWithPort","getServerName"],[]

);