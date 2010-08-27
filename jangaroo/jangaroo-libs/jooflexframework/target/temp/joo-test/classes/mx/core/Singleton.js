joo.classLoader.prepare(










"package mx.core",



























"public class Singleton",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},
















"public static const",{VERSION:"4.1.0.16076"},















"private static var",{classMap:function(){return({});}},














"public static function registerClass",function(interfaceName,
clazz)
{
var c=$$private.classMap[interfaceName];
if(!c)
$$private.classMap[interfaceName]=clazz;
},









"public static function getClass",function(interfaceName)
{
return $$private.classMap[interfaceName];
},











"public static function getInstance",function(interfaceName)
{
var c=$$private.classMap[interfaceName];
if(!c)
{
throw new Error("No class registered for interface '"+
interfaceName+"'.");
}
return c["getInstance"]();
},
];},["registerClass","getClass","getInstance"],["Error"]

);