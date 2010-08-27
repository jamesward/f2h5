package flash.net
{
import flash.events.EventDispatcher;

public class NetConnection extends EventDispatcher
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

  public function addHeader(operation:String, mustUnderstand:Boolean = false, param:Object = null):void
  {

  }

  public function call(command:String, responder:Responder, ... arguments):void
  {

  }

  public function close():void
  {

  }

  public function connect(command:String, ... arguments):void
  {

  }

  

}

}
