package flash.utils
{

public interface IExternalizable
{

  public native function readExternal(input:IDataInput):void;
 	 	
  public native function writeExternal(output:IDataOutput):void;

}

}