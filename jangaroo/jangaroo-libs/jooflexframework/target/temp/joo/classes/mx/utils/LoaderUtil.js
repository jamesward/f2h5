joo.classLoader.prepare(










"package mx.utils",

















"public class LoaderUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

















"public static const",{VERSION:"4.1.0.16076"},


































"public static var",{urlFilters:function(){return(
[
{searchString:"/[[DYNAMIC]]/",filterFunction:$$private.dynamicURLFilter},
{searchString:"/[[IMPORT]]/",filterFunction:$$private.importURLFilter}
]);}},



























"public static function normalizeURL",function(loaderInfo)
{
var url=loaderInfo.url;
var index;
var searchString;
var urlFilter;
var n=mx.utils.LoaderUtil.urlFilters.length;

for(var i=0;i<n;i++)
{
searchString=mx.utils.LoaderUtil.urlFilters[i].searchString;
if((index=url.indexOf(searchString))!=-1)
{
urlFilter=mx.utils.LoaderUtil.urlFilters[i].filterFunction;
url=urlFilter(url,index);
}
}




if($$private.isMac())
return encodeURI(url);

return url;
},


























"public static function createAbsoluteURL",function(rootURL,url)
{
var absoluteURL=url;


if(rootURL&&
!(url.indexOf(":")>-1||url.indexOf("/")==0||url.indexOf("\\")==0))
{

var index;

if((index=rootURL.indexOf("?"))!=-1)
rootURL=rootURL.substring(0,index);

if((index=rootURL.indexOf("#"))!=-1)
rootURL=rootURL.substring(0,index);





var lastIndex=Math.max(rootURL.lastIndexOf("\\"),rootURL.lastIndexOf("/"));
if(url.indexOf("./")==0)
{
url=url.substring(2);
}
else
{
while(url.indexOf("../")==0)
{
url=url.substring(3);
lastIndex=Math.max(rootURL.lastIndexOf("\\",lastIndex-1),
rootURL.lastIndexOf("/",lastIndex-1));
}
}

if(lastIndex!=-1)
absoluteURL=rootURL.substr(0,lastIndex+1)+url;
}

return absoluteURL;
},




"private static function isMac",function()
{
return flash.system.Capabilities.os.substring(0,3)=="Mac";
},






"private static function dynamicURLFilter",function(url,index)
{
return url.substring(0,index);
},






"private static function importURLFilter",function(url,index)
{
var protocolIndex=url.indexOf("://");
return url.substring(0,protocolIndex+3)+url.substring(index+12);
},

];},["normalizeURL","createAbsoluteURL"],["Math","flash.system.Capabilities"]
);