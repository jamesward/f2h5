package flight.utils
{
	import flash.utils.Proxy;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	
	/**
	 * Global method for getting an objects type.
	 * 
	 * @param	value			The object being evaluated. If the object is a
	 * 							class it will be returned as the type and not
	 * 							the type Class.
	 */
	public function getType(value:Object):Class
	{
		if (value is Class) {
			return value as Class;
		} else if (value is Proxy) {
			return getDefinitionByName( getQualifiedClassName(value) ) as Class;
		} else {
			return value.constructor as Class;
		}
	}
}