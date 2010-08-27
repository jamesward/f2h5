package mx.core
{

public interface IUID
{
  native function get uid():String;
    
  native function set uid(value:String):void;
}
}