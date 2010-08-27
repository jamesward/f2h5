package mx.utils
{
import flash.utils.Proxy;
import flash.utils.IExternalizable;
import mx.core.IPropertyChangeNotifier;

public dynamic class ObjectProxy extends flash.utils.Proxy implements flash.utils.IExternalizable, mx.core.IPropertyChangeNotifier
{

  public var uid : String;

  protected var dispatcher : EventDispatcher;
  protected var notifiers : Object;
  protected var object : Object;
  protected var propertyList : Array;
  protected var proxyClass : Class;

}

}