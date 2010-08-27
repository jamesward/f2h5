package flash.net
{
import flash.events.EventDispatcher;

public class NetConnection extends flash.events.EventDispatcher
{

  public var client : Object;
  public var connected : Boolean;
  public var connectedProxyType : String;
  public static var defaultObjectEncoding : uint;
  public var farID : String;
  public var farNonce : String;
  public var maxPeerConnections : uint;
  public var nearID : String;
  public var nearNonce : String;
  public var objectEncoding : uint;
  public var protocol : String;
  public var proxyType : String;
  public var unconnectedPeerStreams : Array;
  public var uri : String;
  public var usingTLS : Boolean;

  public native function addHeader(operation:String, mustUnderstand:Boolean = false, param:Object = null):void;

  public native function call(command:String, responder:Responder, ... arguments):void;

  public native function close():void;

  public native function connect(command:String, ... arguments):void;

  

}

}