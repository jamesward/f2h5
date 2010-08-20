joo.classLoader.prepare(



























"package com.bit101.components",








"public class ComboBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.geom.Rectangle,String,com.bit101.components.List,flash.events.MouseEvent,flash.events.Event,flash.geom.Point);},

"public static const",{TOP:"top"},
"public static const",{BOTTOM:"bottom"},

"protected var",{_defaultLabel:""},
"protected var",{_dropDownButton: undefined},
"protected var",{_items: undefined},
"protected var",{_labelButton: undefined},
"protected var",{_list: undefined},
"protected var",{_numVisibleItems:6},
"protected var",{_open:false},
"protected var",{_openPosition:function(){return(com.bit101.components.ComboBox.BOTTOM);}},
"protected var",{_stage: undefined},










"public function ComboBox",function(parent,xpos,ypos,defaultLabel,items)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultLabel="";}items=null;}
this._defaultLabel=defaultLabel;
this._items=items;
this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$$bound(this,"onAddedToStage"));
this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
this[$super](parent,xpos,ypos);this._openPosition=this._openPosition();
},




"protected override function init",function()
{
this[$init]();
this.setSize(100,20);
this.setLabelButtonLabel();
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._list=new com.bit101.components.List(null,0,0,this._items);
this._list.addEventListener(flash.events.Event.SELECT,$$bound(this,"onSelect"));

this._labelButton=new com.bit101.components.PushButton(this,0,0,"",$$bound(this,"onDropDown"));
this._dropDownButton=new com.bit101.components.PushButton(this,0,0,"+",$$bound(this,"onDropDown"));
},




"protected function setLabelButtonLabel",function()
{
if(this.selectedItem==null)
{
this._labelButton.label=this._defaultLabel;
}
else if(is(this.selectedItem,String))
{
this._labelButton.label=this.selectedItem;
}
else if(is(this.selectedItem.label,String))
{
this._labelButton.label=this.selectedItem.label;
}
else
{
this._labelButton.label=this.selectedItem.toString();
}
},




"protected function removeList",function()
{
if(this._stage.contains(this._list))this._stage.removeChild(this._list);
this._stage.removeEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
this._dropDownButton.label="+";
},







"public override function draw",function()
{
this[$draw]();
this._labelButton.setSize(this._width-this._height+1,this._height);
this._labelButton.draw();

this._dropDownButton.setSize(this._height,this._height);
this._dropDownButton.draw();
this._dropDownButton.x=this._width-this.height;

this._list.setSize(this._width,this._numVisibleItems*this._list.listItemHeight);
},






"public function addItem",function(item)
{
this._list.addItem(item);
},






"public function addItemAt",function(item,index)
{
this._list.addItemAt(item,index);
},





"public function removeItem",function(item)
{
this._list.removeItem(item);
},





"public function removeItemAt",function(index)
{
this._list.removeItemAt(index);
},




"public function removeAll",function()
{
this._list.removeAll();
},











"protected function onDropDown",function(event)
{
this._open=!this._open;
if(this._open)
{
var point=new flash.geom.Point();
if(this._openPosition==com.bit101.components.ComboBox.BOTTOM)
{
point.y=this._height;
}
else
{
point.y=-this._numVisibleItems*this._list.listItemHeight;
}
point=this.localToGlobal(point);
this._list.move(point.x,point.y);
this._stage.addChild(this._list);
this._stage.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
this._dropDownButton.label="-";
}
else
{
this.removeList();
}
},




"protected function onStageClick",function(event)
{

if(event.target==this._dropDownButton||event.target==this._labelButton)return;
if(new flash.geom.Rectangle(this._list.x,this._list.y,this._list.width,this._list.height).contains(event.stageX,event.stageY))return;

this._open=false;
this.removeList();
},




"protected function onSelect",function(event)
{
this._open=false;
this._dropDownButton.label="+";
if(this.stage!=null&&this.stage.contains(this._list))
{
this.stage.removeChild(this._list);
}
this.setLabelButtonLabel();
this.dispatchEvent(event);
},




"protected function onAddedToStage",function(event)
{
this._stage=this.stage;
},




"protected function onRemovedFromStage",function(event)
{
this.removeList();
},








"public function set selectedIndex",function(value)
{
this._list.selectedIndex=value;
this.setLabelButtonLabel();
},
"public function get selectedIndex",function()
{
return this._list.selectedIndex;
},




"public function set selectedItem",function(item)
{
this._list.selectedItem=item;
this.setLabelButtonLabel();
},
"public function get selectedItem",function()
{
return this._list.selectedItem;
},




"public function set defaultColor",function(value)
{
this._list.defaultColor=value;
},
"public function get defaultColor",function()
{
return this._list.defaultColor;
},




"public function set selectedColor",function(value)
{
this._list.selectedColor=value;
},
"public function get selectedColor",function()
{
return this._list.selectedColor;
},




"public function set rolloverColor",function(value)
{
this._list.rolloverColor=value;
},
"public function get rolloverColor",function()
{
return this._list.rolloverColor;
},




"public function set listItemHeight",function(value)
{
this._list.listItemHeight=value;
this.invalidate();
},
"public function get listItemHeight",function()
{
return this._list.listItemHeight;
},




"public function set openPosition",function(value)
{
this._openPosition=value;
},
"public function get openPosition",function()
{
return this._openPosition;
},




"public function set defaultLabel",function(value)
{
this._defaultLabel=value;
this.setLabelButtonLabel();
},
"public function get defaultLabel",function()
{
return this._defaultLabel;
},




"public function set numVisibleItems",function(value)
{
this._numVisibleItems=value;
this.invalidate();
},
"public function get numVisibleItems",function()
{
return this._numVisibleItems;
},




"public function set items",function(value)
{
this._list.items=value;
},
"public function get items",function()
{
return this._list.items;
},




"public function set listItemClass",function(value)
{
this._list.listItemClass=value;
},
"public function get listItemClass",function()
{
return this._list.listItemClass;
},





"public function set alternateColor",function(value)
{
this._list.alternateColor=value;
},
"public function get alternateColor",function()
{
return this._list.alternateColor;
},




"public function set alternateRows",function(value)
{
this._list.alternateRows=value;
},
"public function get alternateRows",function()
{
return this._list.alternateRows;
},
];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.List","com.bit101.components.PushButton","String","flash.events.MouseEvent","flash.geom.Point","flash.geom.Rectangle"]
);