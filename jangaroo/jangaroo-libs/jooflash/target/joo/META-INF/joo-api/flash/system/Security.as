package flash.system
{

public class Security
{
public static var exactSettings : Boolean;
public static var sandboxType : String;

public static native function allowDomain(... domains):void;

public static native function allowInsecureDomain(... domains):void;

public static native function loadPolicyFile(url:String):void;

public static native function showSettings(panel:String = "default"):void;

public static const LOCAL_TRUSTED : String = "localTrusted";
public static const LOCAL_WITH_FILE : String = "localWithFile";
public static const LOCAL_WITH_NETWORK : String = "localWithNetwork";
public static const REMOTE : String = "remote";

}

}