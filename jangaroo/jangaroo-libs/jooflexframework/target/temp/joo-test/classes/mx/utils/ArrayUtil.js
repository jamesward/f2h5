joo.classLoader.prepare(










"package mx.utils",









"public class ArrayUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Array);},


















"mx_internal static const",{VERSION:"3.3.0.4852"},
























"public static function toArray",function(obj)
{
if(!obj)
return[];

else if(is(obj,Array))
return obj;

else
return[obj];
},













"public static function getItemIndex",function(item,source)
{
var n=source.length;
for(var i=0;i<n;i++)
{
if(source[i]===item)
return i;
}

return-1;
},
];},["toArray","getItemIndex"],["Array"]

);