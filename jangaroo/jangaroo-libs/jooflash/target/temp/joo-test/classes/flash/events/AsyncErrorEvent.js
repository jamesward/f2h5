joo.classLoader.prepare("package flash.events",


"public class AsyncErrorEvent extends flash.events.ErrorEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{error: undefined},

"public function AsyncErrorEvent",function(type,bubbles,cancelable,text,error)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}text="";}error=null;}
this[$super](type,bubbles,cancelable);
this.text=text;
this.error=error;
},

"public static const",{ASYNC_ERROR:"asyncError"},

];},[],["flash.events.ErrorEvent"]

);