joo.classLoader.prepare(










"package mx.events",










"public class CollectionEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$toString=$$l+'toString',$clone=$$l+'clone';return[
















"public static const",{VERSION:"4.1.0.16076"},












































"public static const",{COLLECTION_CHANGE:"collectionChange"},









































"public function CollectionEvent",function(type,bubbles,
cancelable,
kind,location,
oldLocation,items)
{if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}kind=null;}location=-1;}oldLocation=-1;}items=null;}
this[$super](type,bubbles,cancelable);

this.kind=kind;
this.location=location;
this.oldLocation=oldLocation;
this.items=items?items:[];
},





















"public var",{kind: undefined},























"public var",{items: undefined},

















"public var",{location: undefined},












"public var",{oldLocation: undefined},










"override public function toString",function()
{
return this.formatToString("CollectionEvent","kind","location",
"oldLocation","type","bubbles",
"cancelable","eventPhase");
},










"override public function clone",function()
{
return new mx.events.CollectionEvent(this.type,this.bubbles,this.cancelable,this.kind,this.location,this.oldLocation,this.items);
},
];},[],["flash.events.Event"]

);