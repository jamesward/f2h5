joo.classLoader.prepare("package flash.events",/*
{*/

"public class HTTPStatusEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ status/* : int*/: undefined},

  "public function HTTPStatusEvent",function $HTTPStatusEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = false*/, status/*:int = 0*/)
  {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}status = 0;}
    this[$super](type, bubbles, cancelable);
    this.status = status;
  },

  "public static const",{ HTTP_STATUS/* : String*/ : "httpStatus"},

];},[],["flash.events.Event"]

);