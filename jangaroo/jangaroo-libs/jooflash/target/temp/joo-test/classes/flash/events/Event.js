joo.classLoader.prepare("package flash.events",
"public class Event extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$defaultPrevented=$$l+'defaultPrevented',$propagationStopped=$$l+'propagationStopped',$immediatePropagationStopped=$$l+'immediatePropagationStopped';return[


"public function Event",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}this[$super]();
this.type=type;
this.bubbles=bubbles;
this.cancelable=cancelable;
},

"public var",{type: undefined},

"public var",{bubbles: undefined},

"public var",{cancelable: undefined},

"public var",{eventPhase: undefined},

"public var",{target: undefined},

"public var",{currentTarget: undefined},

"public function preventDefault",function(){
if(this.cancelable){
this[$defaultPrevented]=true;
}
},

"public function isDefaultPrevented",function(){
return this[$defaultPrevented];
},

"public function formatToString",function(className){var rest=Array.prototype.slice.call(arguments,1);
var sb=["[",className," "];
for(var i=0;i<rest.length;++i){
sb.push(rest[i],"=",this[rest[i]]," ");
}
sb.push("]");
return sb.join("");
},

"public function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase");
},

"public function stopPropagation",function(){
this[$propagationStopped]=true;
},

"public function isPropagationStopped",function(){
return this[$propagationStopped];
},

"public function stopImmediatePropagation",function(){
this[$immediatePropagationStopped]=true;
},

"public function isImmediatePropagationStopped",function(){
return this[$immediatePropagationStopped];
},

"public function clone",function(){
return new flash.events.Event(this.type,this.bubbles,this.cancelable);
},

"static public const",{ENTER_FRAME:"enterFrame"},

"static public const",{ID3:"id3"},
"static public const",{SOUND_COMPLETE:"soundComplete"},
"static public const",{INIT:"init"},
"static public const",{RENDER:"render"},
"static public const",{TAB_ENABLED_CHANGE:"tabEnabledChange"},

"static public const",{ADDED_TO_STAGE:"addedToStage"},
"static public const",{TAB_CHILDREN_CHANGE:"tabChildrenChange"},
"static public const",{RESIZE:"resize"},
"static public const",{CHANGE:"change"},
"static public const",{COMPLETE:"complete"},

"static public const",{FULLSCREEN:"fullScreen"},
"static public const",{REMOVED:"removed"},
"static public const",{CONNECT:"connect"},
"static public const",{SCROLL:"scroll"},
"static public const",{OPEN:"open"},

"static public const",{CLOSE:"close"},
"static public const",{MOUSE_LEAVE:"mouseLeave"},
"static public const",{ADDED:"added"},
"static public const",{TAB_INDEX_CHANGE:"tabIndexChange"},
"static public const",{REMOVED_FROM_STAGE:"removedFromStage"},

"static public const",{ACTIVATE:"activate"},
"static public const",{DEACTIVATE:"deactivate"},
"static public const",{CANCEL:"cancel"},
"static public const",{SELECT:"select"},
"static public const",{UNLOAD:"unload"},

"private var",{defaultPrevented:false},
"private var",{propagationStopped: undefined},
"private var",{immediatePropagationStopped: undefined},
];},[],["Object"]
);