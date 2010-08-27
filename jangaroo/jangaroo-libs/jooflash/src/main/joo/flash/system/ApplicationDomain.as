package flash.system
{

public final class ApplicationDomain 
{

public static var currentDomain : ApplicationDomain;
public var domainMemory : ByteArray;
public static var MIN_DOMAIN_MEMORY_LENGTH : uint
public var parentDomain : ApplicationDomain

  public function getDefinition(name:String):Object
  {
    return {};
  }

  public function hasDefinition(name:String):Boolean
  {
    return false;
  }

}
}
