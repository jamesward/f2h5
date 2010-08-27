joo.classLoader.prepare(










"package mx.events",




















"public class PropertyChangeEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone';return[function(){joo.classLoader.init(mx.events.PropertyChangeEventKind);},
















"public static const",{VERSION:"4.1.0.16076"},












































"public static const",{PROPERTY_CHANGE:"propertyChange"},






























"public static function createUpdateEvent",function(
source,
property,
oldValue,
newValue)
{
var event=
new mx.events.PropertyChangeEvent(mx.events.PropertyChangeEvent.PROPERTY_CHANGE);

event.kind=mx.events.PropertyChangeEventKind.UPDATE;
event.oldValue=oldValue;
event.newValue=newValue;
event.source=source;
event.property=property;

return event;
},




































"public function PropertyChangeEvent",function(type,bubbles,
cancelable,
kind,
property,
oldValue,
newValue,
source)
{if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}kind=null;}property=null;}oldValue=null;}newValue=null;}source=null;}
this[$super](type,bubbles,cancelable);

this.kind=kind;
this.property=property;
this.oldValue=oldValue;
this.newValue=newValue;
this.source=source;
},





















"public var",{kind: undefined},













"public var",{newValue: undefined},













"public var",{oldValue: undefined},













"public var",{property: undefined},













"public var",{source: undefined},










"override public function clone",function()
{
return new mx.events.PropertyChangeEvent(this.type,this.bubbles,this.cancelable,this.kind,
this.property,this.oldValue,this.newValue,this.source);
},
];},["createUpdateEvent"],["flash.events.Event","mx.events.PropertyChangeEventKind"]

);