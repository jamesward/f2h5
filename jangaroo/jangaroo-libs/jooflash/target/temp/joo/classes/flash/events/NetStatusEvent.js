joo.classLoader.prepare("package flash.events",


"public class NetStatusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{info: undefined},

"public function NetStatusEvent",function(type,bubbles,cancelable,info)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}info=null;}
this[$super](type,bubbles,cancelable);
this.info=info;
},

"public static const",{NET_STATUS:"netStatus"},

];},[],["flash.events.Event"]

);