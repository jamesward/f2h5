joo.classLoader.prepare("package flash.system",/*
{*/

"public class LoaderContext",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ allowCodeImport/* : Boolean*/: undefined},
  "public var",{ applicationDomain/* : ApplicationDomain*/ : null},
  "public var",{ checkPolicyFile/* : Boolean*/ : false},
  "public var",{ securityDomain/* : SecurityDomain*/ : null},

  "public function LoaderContext",function $LoaderContext(checkPolicyFile/*:Boolean = false*/, applicationDomain/*:ApplicationDomain = null*/, securityDomain/*:SecurityDomain = null*/)
  {if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){checkPolicyFile = false;}applicationDomain = null;}securityDomain = null;}this[$super]();

  },

];},[],[]

);