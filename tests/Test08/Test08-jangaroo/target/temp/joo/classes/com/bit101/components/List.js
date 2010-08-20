joo.classLoader.prepare(



























"package com.bit101.components",






"public class List extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Panel,com.bit101.components.VScrollBar,Array,flash.events.MouseEvent,com.bit101.components.ListItem,flash.events.Event);},

"protected var",{_items: undefined},
"protected var",{_itemHolder: undefined},
"protected var",{_panel: undefined},
"protected var",{_listItemHeight:20},
"protected var",{_listItemClass:function(){return(com.bit101.components.ListItem);}},
"protected var",{_scrollbar: undefined},
"protected var",{_selectedIndex:-1},
"protected var",{_defaultColor:0xffffff},
"protected var",{_alternateColor:0xf3f3f3},
"protected var",{_selectedColor:0xcccccc},
"protected var",{_rolloverColor:0xdddddd},
"protected var",{_alternateRows:false},








"public function List",function(parent,xpos,ypos,items)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}items=null;}
if(items!=null)
{
this._items=items;
}
else
{
this._items=new Array();
}
this[$super](parent,xpos,ypos);this._listItemClass=this._listItemClass();
},




"protected override function init",function()
{
this[$init]();
this.setSize(100,100);
this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL,$$bound(this,"onMouseWheel"));
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._panel=new com.bit101.components.Panel(this,0,0);
this._panel.color=this._defaultColor;
this._itemHolder=new flash.display.Sprite();
this._panel.content.addChild(this._itemHolder);
this._scrollbar=new com.bit101.components.VScrollBar(this,0,0,$$bound(this,"onScroll"));
},




"protected function makeListItems",function()
{
while(this._itemHolder.numChildren>0)this._itemHolder.removeChildAt(0);

for(var i=0;i<this._items.length;i++)
{









var item=new this._listItemClass(this._itemHolder,0,i*this._listItemHeight,this._items[i]);
item.setSize(this.width,this._listItemHeight);
item.defaultColor=this._defaultColor;
if(this._alternateRows)
{
item.defaultColor=(i%2==0)?this._defaultColor:this._alternateColor;
}
else
{
item.defaultColor=this._defaultColor;
}
item.selectedColor=this._selectedColor;
item.rolloverColor=this._rolloverColor;
item.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onSelect"));
if(i==this._selectedIndex)
{
item.selected=true;
}
}
},




"protected function scrollToSelection",function()
{
if(this._selectedIndex!=-1)
{
var itemTop=this._itemHolder.y+this._selectedIndex*this._listItemHeight;
var itemBottom=itemTop+this._listItemHeight;



if(itemTop<0)
{
this._itemHolder.y=-this._selectedIndex*this._listItemHeight;
}
else if(itemBottom>this._height)
{
this._itemHolder.y=-this._selectedIndex*this._listItemHeight-this._listItemHeight+this._height;
}
}
},










"public override function draw",function()
{
this[$draw]();

this._selectedIndex=Math.min(this._selectedIndex,this._items.length-1);


this.makeListItems();
this.scrollToSelection();


this._panel.setSize(this._width,this._height);
this._panel.color=this._defaultColor;
this._panel.draw();


this._scrollbar.x=this._width-10;
var contentHeight=this._items.length*this._listItemHeight;
this._scrollbar.setThumbPercent(this._height/contentHeight);
var pageSize=this._height/this._listItemHeight;
this._scrollbar.setSliderParams(0,Math.max(0,this._items.length-pageSize),this._itemHolder.y/this._listItemHeight);
this._scrollbar.pageSize=pageSize;
this._scrollbar.height=this._height;
this._scrollbar.draw();
},





"public function addItem",function(item)
{
this._items.push(item);
this.invalidate();
},






"public function addItemAt",function(item,index)
{
index=Math.max(0,index);
index=Math.min(this._items.length,index);
this._items.splice(index,0,item);
this.invalidate();
},





"public function removeItem",function(item)
{
var index=this._items.indexOf(item);
this.removeItemAt(index);
},





"public function removeItemAt",function(index)
{
if(index<0||index>=this._items.length)return;
this._items.splice(index,1);
this.invalidate();
},




"public function removeAll",function()
{
this._items.length=0;
this.invalidate();
},












"protected function onSelect",function(event)
{
if(!(is(event.target,com.bit101.components.ListItem)))return;

for(var i=0;i<this._itemHolder.numChildren;i++)
{
if(this._itemHolder.getChildAt(i)==event.target)this._selectedIndex=i;
(this._itemHolder.getChildAt(i)).selected=false;
}
(event.target).selected=true;
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},




"protected function onScroll",function(event)
{
this._itemHolder.y=-this._scrollbar.value*this._listItemHeight;
},




"protected function onMouseWheel",function(event)
{
this._scrollbar.value-=event.delta;
},








"public function set selectedIndex",function(value)
{
if(value>=0&&value<this._items.length)
{
this._selectedIndex=value;
this._scrollbar.value=this._selectedIndex;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
}
},
"public function get selectedIndex",function()
{
return this._selectedIndex;
},




"public function set selectedItem",function(item)
{
var index=this._items.indexOf(item);
if(index!=-1)
{
this.selectedIndex=index;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
}
},
"public function get selectedItem",function()
{
if(this._selectedIndex>=0&&this._selectedIndex<this._items.length)
{
return this._items[this._selectedIndex];
}
return null;
},




"public function set defaultColor",function(value)
{
this._defaultColor=value;
this.invalidate();
},
"public function get defaultColor",function()
{
return this._defaultColor;
},




"public function set selectedColor",function(value)
{
this._selectedColor=value;
this.invalidate();
},
"public function get selectedColor",function()
{
return this._selectedColor;
},




"public function set rolloverColor",function(value)
{
this._rolloverColor=value;
this.invalidate();
},
"public function get rolloverColor",function()
{
return this._rolloverColor;
},




"public function set listItemHeight",function(value)
{
this._listItemHeight=value;
this.invalidate();
},
"public function get listItemHeight",function()
{
return this._listItemHeight;
},




"public function set items",function(value)
{
this._items=value;
this.invalidate();
},
"public function get items",function()
{
return this._items;
},




"public function set listItemClass",function(value)
{
this._listItemClass=value;
this.invalidate();
},
"public function get listItemClass",function()
{
return this._listItemClass;
},




"public function set alternateColor",function(value)
{
this._alternateColor=value;
this.invalidate();
},
"public function get alternateColor",function()
{
return this._alternateColor;
},




"public function set alternateRows",function(value)
{
this._alternateRows=value;
this.invalidate();
},
"public function get alternateRows",function()
{
return this._alternateRows;
},


];},[],["com.bit101.components.Component","com.bit101.components.ListItem","Array","flash.events.MouseEvent","com.bit101.components.Panel","flash.display.Sprite","com.bit101.components.VScrollBar","Math","flash.events.Event"]
);