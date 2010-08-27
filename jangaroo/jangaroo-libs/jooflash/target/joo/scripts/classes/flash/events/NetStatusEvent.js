joo.classLoader.prepare("package flash.events",/*
{*/

"public class NetStatusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ info/* : Object*/: undefined},

  "public function NetStatusEvent",function $NetStatusEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = false*/, info/*:Object = null*/)
  {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}info = null;}
    this[$super](type, bubbles, cancelable);
    this.info = info;
  },

  "public static const",{ NET_STATUS/* : String*/ : "netStatus"},

];},[],["flash.events.Event"]

);