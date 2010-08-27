joo.classLoader.prepare(










"package mx.events",













"public class Request extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[
















"public static const",{VERSION:"4.1.0.16076"},














"public static const",{GET_PARENT_FLEX_MODULE_FACTORY_REQUEST:"getParentFlexModuleFactoryRequest"},




























"public function Request",function(type,bubbles,
cancelable,
value)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}value=null;}
this[$super](type,bubbles,cancelable);

this.value=value;
},



















"public var",{value: undefined},










"override public function clone",function()
{
var cloneEvent=new mx.events.Request(this.type,this.bubbles,this.cancelable,
this.value);

return cloneEvent;
},

];},[],["flash.events.Event"]

);