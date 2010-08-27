joo.classLoader.prepare("package flash.net",/*
{
import flash.events.EventDispatcher*/

"public class NetConnection extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ client/* : Object*/: undefined},
  "public var",{ connected/* : Boolean*/: undefined},
  "public var",{ connectedProxyType/* : String*/: undefined},
  "public static var",{ defaultObjectEncoding/* : uint*/: undefined},
  "public var",{ farID/* : String*/: undefined},
  "public var",{ farNonce/* : String*/: undefined},
  "public var",{ maxPeerConnections/* : uint*/: undefined},
  "public var",{ nearID/* : String*/: undefined},
  "public var",{ nearNonce/* : String*/: undefined},
  "public var",{ objectEncoding/* : uint*/: undefined},
  "public var",{ protocol/* : String*/: undefined},
  "public var",{ proxyType/* : String*/: undefined},
  "public var",{ unconnectedPeerStreams/* : Array*/: undefined},
  "public var",{ uri/* : String*/: undefined},
  "public var",{ usingTLS/* : Boolean*/: undefined},

  "public function addHeader",function addHeader(operation/*:String*/, mustUnderstand/*:Boolean = false*/, param/*:Object = null*/)/*:void*/
  {if(arguments.length<3){if(arguments.length<2){mustUnderstand = false;}param = null;}

  },

  "public function call",function call(command/*:String*/, responder/*:Responder, ... arguments*/)/*:void*/
  {var arguments=Array.prototype.slice.call(arguments,2);

  },

  "public function close",function close()/*:void*/
  {

  },

  "public function connect",function connect(command/*:String, ... arguments*/)/*:void*/
  {var arguments=Array.prototype.slice.call(arguments,1);

  },

  

];},[],["flash.events.EventDispatcher"]

);