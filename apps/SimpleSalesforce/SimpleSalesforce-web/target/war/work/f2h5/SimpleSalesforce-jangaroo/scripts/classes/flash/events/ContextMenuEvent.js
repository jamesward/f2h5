joo.classLoader.prepare("package flash.events",/*
{*/

"public class ContextMenuEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


  "public var",{ contextMenuOwner/* : InteractiveObject*/: undefined},

  "public var",{ isMouseTargetInaccessible/* : Boolean*/: undefined},
 
  "public var",{ mouseTarget/* : InteractiveObject*/: undefined},

  "public function ContextMenuEvent",function $ContextMenuEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = false*/, mouseTarget/*:InteractiveObject = null*/, contextMenuOwner/*:InteractiveObject = null*/)
  {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}mouseTarget = null;}contextMenuOwner = null;}
    this[$super](type, bubbles, cancelable);
    this.mouseTarget = mouseTarget;
    this.contextMenuOwner = contextMenuOwner;
    this.isMouseTargetInaccessible = this.isMouseTargetInaccessible;
  },

  "public static const",{ MENU_ITEM_SELECT/* : String*/ : "menuItemSelect"},
  "public static const",{ MENU_SELECT/* : String*/ : "menuSelect"},

];},[],["flash.events.Event"]
);