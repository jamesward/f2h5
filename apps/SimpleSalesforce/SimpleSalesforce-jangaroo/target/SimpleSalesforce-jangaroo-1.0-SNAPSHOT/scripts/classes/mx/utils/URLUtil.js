joo.classLoader.prepare("package mx.utils",/*
{*/

"public class URLUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public static function getProtocol",function getProtocol(url/*:String*/)/*:String*/
  {
        var slash/*:int*/ = url.indexOf("/");
        var indx/*:int*/ = url.indexOf(":/");
        if (indx > -1 && indx < slash)
        {
            return url.substring(0, indx);
        }
        else
        {
            indx = url.indexOf("::");
            if (indx > -1 && indx < slash)
                return url.substring(0, indx);
        }

        return "";
  },

  "public static function getServerNameWithPort",function getServerNameWithPort(url/*:String*/)/*:String*/
  {
    // Find first slash; second is +1, start 1 after.
    var start/*:int*/ = url.indexOf("/") + 2;
    var length/*:int*/ = url.indexOf("/", start);
    return length == -1 ? url.substring(start) : url.substring(start, length);
  },

  "public static function getServerName",function getServerName(url/*:String*/)/*:String*/
  {
    var sp/*:String*/ = mx.utils.URLUtil.getServerNameWithPort(url);
        
    // If IPv6 is in use, start looking after the square bracket.
    var delim/*:int*/ = sp.indexOf("]");
    delim = (delim > -1)? sp.indexOf(":", delim) : sp.indexOf(":");   
                 
    if (delim > 0)
      sp = sp.substring(0, delim);
    return sp;
  },

];},["getProtocol","getServerNameWithPort","getServerName"],[]

);