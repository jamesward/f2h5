joo.classLoader.prepare("package flash.system",/*
{*/

"public class Security",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static var",{ exactSettings/* : Boolean*/: undefined},
"public static var",{ sandboxType/* : String*/: undefined},

"public static function allowDomain",function allowDomain(/*... domains*/)/*:void*/
{var domains=arguments;

},

"public static function allowInsecureDomain",function allowInsecureDomain(/*... domains*/)/*:void*/
{var domains=arguments;

},

"public static function loadPolicyFile",function loadPolicyFile(url/*:String*/)/*:void*/
{

},

"public static function showSettings",function showSettings(panel/*:String = "default"*/)/*:void*/
{if(arguments.length<1){panel = "default";}

},

"public static const",{ LOCAL_TRUSTED/* : String*/ : "localTrusted"},
"public static const",{ LOCAL_WITH_FILE/* : String*/ : "localWithFile"},
"public static const",{ LOCAL_WITH_NETWORK/* : String*/ : "localWithNetwork"},
"public static const",{ REMOTE/* : String*/ : "remote"},

];},["allowDomain","allowInsecureDomain","loadPolicyFile","showSettings"],[]

);