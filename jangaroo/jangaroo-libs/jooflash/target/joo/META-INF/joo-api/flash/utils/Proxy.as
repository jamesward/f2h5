package flash.utils
{

public class Proxy
{
  	
  protected native function callProperty(name:*, ... rest):*;
 	 	
  protected native function deleteProperty(name:*):Boolean;
 	 	
  protected native function getDescendants(name:*):*;
 	 	
  protected native function getProperty(name:*):*;
 	 	
  protected native function hasProperty(name:*):Boolean;
 	 	
  protected native function isAttribute(name:*):Boolean;
 	 	
  protected native function nextName(index:int):String;
 	 	
  protected native function nextNameIndex(index:int):int;
 	 	
  protected native function nextValue(index:int):*;
 	 	
  protected native function setProperty(name:*, value:*):void;

}
}