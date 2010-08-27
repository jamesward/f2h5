package flash.display
{
import flash.events.EventDispatcher;/*

[Event(name="complete", type="flash.events.Event.COMPLETE")]
[Event(name="httpStatus", type="flash.events.HTTPStatusEvent.HTTP_STATUS")]
[Event(name="init", type="flash.events.Event.INIT")]
[Event(name="ioError", type="flash.events.IOErrorEvent.IO_ERROR")]
[Event(name="open", type="flash.events.Event.OPEN")]
[Event(name="progress", type="flash.events.ProgressEvent.PROGRESS")]
[Event(name="unload", type="flash.events.Event.UNLOAD")]*/
public class LoaderInfo extends flash.events.EventDispatcher
{

public var actionScriptVersion : uint;
public var applicationDomain : ApplicationDomain;
public var bytes : ByteArray;
public var bytesLoaded : uint;
public var bytesTotal : uint;
public var childAllowsParent : Boolean;
public var content : DisplayObject;
public var contentType : String;
public var frameRate : Number;
public var height : int;
public var isURLInaccessible : Boolean;
public var loader : Loader;
public var loaderURL : String;
public var parameters : Object;
public var parentAllowsChild : Boolean;
public var sameDomain : Boolean;
public var sharedEvents : EventDispatcher;
public var swfVersion : uint;
public var uncaughtErrorEvents : UncaughtErrorEvents;
public var url : String;
public var width : int;

public static native function getLoaderInfoByDefinition(object:Object):LoaderInfo;

}

}