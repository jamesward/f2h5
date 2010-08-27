joo.classLoader.prepare("package flash.events",/*
{*/

"public class AsyncErrorEvent extends flash.events.ErrorEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ error/* : Error*/: undefined},

  "public function AsyncErrorEvent",function $AsyncErrorEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = false*/, text/*:String = ""*/, error/*:Error = null*/)
  {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}text = "";}error = null;}
    this[$super](type, bubbles, cancelable);
    this.text = text;
    this.error = error;
  },

  "public static const",{ ASYNC_ERROR/* : String*/ : "asyncError"},

];},[],["flash.events.ErrorEvent"]

);