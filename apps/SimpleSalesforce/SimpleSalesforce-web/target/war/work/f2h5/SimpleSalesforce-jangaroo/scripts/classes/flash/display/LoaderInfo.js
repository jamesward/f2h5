joo.classLoader.prepare("package flash.display",/*
{
import flash.events.EventDispatcher

[Event(name="complete", type="flash.events.Event.COMPLETE")]
[Event(name="httpStatus", type="flash.events.HTTPStatusEvent.HTTP_STATUS")]
[Event(name="init", type="flash.events.Event.INIT")]
[Event(name="ioError", type="flash.events.IOErrorEvent.IO_ERROR")]
[Event(name="open", type="flash.events.Event.OPEN")]
[Event(name="progress", type="flash.events.ProgressEvent.PROGRESS")]
[Event(name="unload", type="flash.events.Event.UNLOAD")]*/
"public class LoaderInfo extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public var",{ actionScriptVersion/* : uint*/: undefined},
"public var",{ applicationDomain/* : ApplicationDomain*/: undefined},
"public var",{ bytes/* : ByteArray*/: undefined},
"public var",{ bytesLoaded/* : uint*/: undefined},
"public var",{ bytesTotal/* : uint*/: undefined},
"public var",{ childAllowsParent/* : Boolean*/: undefined},
"public var",{ content/* : DisplayObject*/: undefined},
"public var",{ contentType/* : String*/: undefined},
"public var",{ frameRate/* : Number*/: undefined},
"public var",{ height/* : int*/: undefined},
"public var",{ isURLInaccessible/* : Boolean*/: undefined},
"public var",{ loader/* : Loader*/: undefined},
"public var",{ loaderURL/* : String*/: undefined},
"public var",{ parameters/* : Object*/: undefined},
"public var",{ parentAllowsChild/* : Boolean*/: undefined},
"public var",{ sameDomain/* : Boolean*/: undefined},
"public var",{ sharedEvents/* : EventDispatcher*/: undefined},
"public var",{ swfVersion/* : uint*/: undefined},
"public var",{ uncaughtErrorEvents/* : UncaughtErrorEvents*/: undefined},
"public var",{ url/* : String*/: undefined},
"public var",{ width/* : int*/: undefined},

"public static function getLoaderInfoByDefinition",function getLoaderInfoByDefinition(object/*:Object*/)/*:LoaderInfo*/
{
  return null;
},

];},["getLoaderInfoByDefinition"],["flash.events.EventDispatcher"]

);