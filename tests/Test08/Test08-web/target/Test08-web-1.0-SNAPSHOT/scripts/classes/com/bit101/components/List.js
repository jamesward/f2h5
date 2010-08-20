joo.classLoader.prepare(/**
 * List.as
 * Keith Peters
 * version 0.9.5
 * 
 * A scrolling list of selectable items. 
 * 
 * Copyright (c) 2010 Keith Peters
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

"package com.bit101.components",/*
{
	import flash.display.DisplayObjectContainer
	import flash.display.Sprite
	import flash.events.Event
	import flash.events.MouseEvent*/
	
	"public class List extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Panel,com.bit101.components.VScrollBar,Array,flash.events.MouseEvent,com.bit101.components.ListItem,flash.events.Event);},
	
		"protected var",{ _items/*:Array*/: undefined},
		"protected var",{ _itemHolder/*:Sprite*/: undefined},
		"protected var",{ _panel/*:Panel*/: undefined},
		"protected var",{ _listItemHeight/*:Number*/ : 20},
		"protected var",{ _listItemClass/*:Class*/ :function(){return(com.bit101.components.ListItem);}},
		"protected var",{ _scrollbar/*:VScrollBar*/: undefined},
		"protected var",{ _selectedIndex/*:int*/ : -1},
		"protected var",{ _defaultColor/*:uint*/ : 0xffffff},
		"protected var",{ _alternateColor/*:uint*/ : 0xf3f3f3},
		"protected var",{ _selectedColor/*:uint*/ : 0xcccccc},
		"protected var",{ _rolloverColor/*:uint*/ : 0xdddddd},
		"protected var",{ _alternateRows/*:Boolean*/ : false},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this List.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param items An array of items to display in the list. Either strings or objects with label property.
		 */
		"public function List",function $List(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, items/*:Array=null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}items=null;}
			if(items != null)
			{
				this._items = items;
			}
			else
			{
				this._items = new Array();
			}
			this[$super](parent, xpos, ypos);this._listItemClass=this._listItemClass();
		},
		
		/**
		 * Initilizes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.setSize(100, 100);
			this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL, $$bound(this,"onMouseWheel"));
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/* : void*/
		{
			this[$addChildren]();
			this._panel = new com.bit101.components.Panel(this, 0, 0);
			this._panel.color = this._defaultColor;
			this._itemHolder = new flash.display.Sprite();
			this._panel.content.addChild(this._itemHolder);
			this._scrollbar = new com.bit101.components.VScrollBar(this, 0, 0, $$bound(this,"onScroll"));
		},
		
		/**
		 * Creates all the list items based on data.
		 */
		"protected function makeListItems",function makeListItems()/*:void*/
		{
			while(this._itemHolder.numChildren > 0) this._itemHolder.removeChildAt(0);

			for(var i/*:int*/ = 0; i < this._items.length; i++)
			{
//				var label:String = "";
//				if(_items[i] is String)
//				{
//					label = _items[i];
//				}
//				else if(_items[i].label is String)
//				{
//					label = _items[i].label;
//				}
				var item/*:ListItem*/ = new this._listItemClass(this._itemHolder, 0, i * this._listItemHeight, this._items[i]);
				item.setSize(this.width, this._listItemHeight);
				item.defaultColor = this._defaultColor;
				if(this._alternateRows)
				{
					item.defaultColor = (i % 2 == 0) ? this._defaultColor : this._alternateColor;
				}
				else
				{
					item.defaultColor = this._defaultColor;
				}
				item.selectedColor = this._selectedColor;
				item.rolloverColor = this._rolloverColor;
				item.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onSelect"));
				if(i == this._selectedIndex)
				{
					item.selected = true;
				}
			}
		},
		
		/**
		 * If the selected item is not in view, scrolls the list to make the selected item appear in the view.
		 */
		"protected function scrollToSelection",function scrollToSelection()/*:void*/
		{
			if(this._selectedIndex != -1)
			{
				var itemTop/*:Number*/ = this._itemHolder.y + this._selectedIndex * this._listItemHeight;
				var itemBottom/*:Number*/ = itemTop + this._listItemHeight;
				// if selected item is not in view...
				// move holder to put item in view
				// and update scrollbar
				if(itemTop < 0)
				{
					this._itemHolder.y = -this._selectedIndex * this._listItemHeight;
				}
				else if(itemBottom > this._height)
				{
					this._itemHolder.y = -this._selectedIndex * this._listItemHeight - this._listItemHeight + this._height;
				}
			}
		},
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"public override function draw",function draw()/* : void*/
		{
			this[$draw]();
			
			this._selectedIndex = Math.min(this._selectedIndex, this._items.length - 1);

			// list items
			this.makeListItems();
			this.scrollToSelection();
			
			// panel
			this._panel.setSize(this._width, this._height);
			this._panel.color = this._defaultColor;
			this._panel.draw();
			
			// scrollbar
			this._scrollbar.x = this._width - 10;
			var contentHeight/*:Number*/ = this._items.length * this._listItemHeight;
			this._scrollbar.setThumbPercent(this._height / contentHeight); 
			var pageSize/*:Number*/ = this._height / this._listItemHeight;
			this._scrollbar.setSliderParams(0, Math.max(0, this._items.length - pageSize), this._itemHolder.y / this._listItemHeight);
			this._scrollbar.pageSize = pageSize;
			this._scrollbar.height = this._height;
			this._scrollbar.draw();
		},
		
		/**
		 * Adds an item to the list.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 */
		"public function addItem",function addItem(item/*:Object*/)/*:void*/
		{
			this._items.push(item);
			this.invalidate();
		},
		
		/**
		 * Adds an item to the list at the specified index.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 * @param index The index at which to add the item.
		 */
		"public function addItemAt",function addItemAt(item/*:Object*/, index/*:int*/)/*:void*/
		{
			index = Math.max(0, index);
			index = Math.min(this._items.length, index);
			this._items.splice(index, 0, item);
			this.invalidate();
		},
		
		/**
		 * Removes the referenced item from the list.
		 * @param item The item to remove. If a string, must match the item containing that string. If an object, must be a reference to the exact same object.
		 */
		"public function removeItem",function removeItem(item/*:Object*/)/*:void*/
		{
			var index/*:int*/ = this._items.indexOf(item);
			this.removeItemAt(index);
		},
		
		/**
		 * Removes the item from the list at the specified index
		 * @param index The index of the item to remove.
		 */
		"public function removeItemAt",function removeItemAt(index/*:int*/)/*:void*/
		{
			if(index < 0 || index >= this._items.length) return;
			this._items.splice(index, 1);
			this.invalidate();
		},
		
		/**
		 * Removes all items from the list.
		 */
		"public function removeAll",function removeAll()/*:void*/
		{
			this._items.length = 0;
			this.invalidate();
		},
		
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when a user selects an item in the list.
		 */
		"protected function onSelect",function onSelect(event/*:Event*/)/*:void*/
		{
			if(! ( is(event.target, com.bit101.components.ListItem))) return;
			
			for(var i/*:int*/ = 0; i < this._itemHolder.numChildren; i++)
			{
				if(this._itemHolder.getChildAt(i) == event.target) this._selectedIndex = i;/*
				com.bit101.components.ListItem*/(this._itemHolder.getChildAt(i)).selected = false;
			}/*
			com.bit101.components.ListItem*/(event.target).selected = true;
			this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
		},
		
		/**
		 * Called when the user scrolls the scroll bar.
		 */
		"protected function onScroll",function onScroll(event/*:Event*/)/*:void*/
		{
			this._itemHolder.y = -this._scrollbar.value * this._listItemHeight;
		},
		
		/**
		 * Called when the mouse wheel is scrolled over the component.
		 */
		"protected function onMouseWheel",function onMouseWheel(event/*:MouseEvent*/)/*:void*/
		{
			this._scrollbar.value -= event.delta;
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the index of the selected list item.
		 */
		"public function set selectedIndex",function set$selectedIndex(value/*:int*/)/*:void*/
		{
			if(value >= 0 && value < this._items.length)
			{
				this._selectedIndex = value;
				this._scrollbar.value = this._selectedIndex;
				this.invalidate();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
			}
		},
		"public function get selectedIndex",function get$selectedIndex()/*:int*/
		{
			return this._selectedIndex;
		},
		
		/**
		 * Sets / gets the item in the list, if it exists.
		 */
		"public function set selectedItem",function set$selectedItem(item/*:Object*/)/*:void*/
		{
			var index/*:int*/ = this._items.indexOf(item);
			if(index != -1)
			{
				this.selectedIndex = index;
				this.invalidate();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
			}
		},
		"public function get selectedItem",function get$selectedItem()/*:Object*/
		{
			if(this._selectedIndex >= 0 && this._selectedIndex < this._items.length)
			{
				return this._items[this._selectedIndex];
			}
			return null;
		},

		/**
		 * Sets/gets the default background color of list items.
		 */
		"public function set defaultColor",function set$defaultColor(value/*:uint*/)/*:void*/
		{
			this._defaultColor = value;
			this.invalidate();
		},
		"public function get defaultColor",function get$defaultColor()/*:uint*/
		{
			return this._defaultColor;
		},

		/**
		 * Sets/gets the selected background color of list items.
		 */
		"public function set selectedColor",function set$selectedColor(value/*:uint*/)/*:void*/
		{
			this._selectedColor = value;
			this.invalidate();
		},
		"public function get selectedColor",function get$selectedColor()/*:uint*/
		{
			return this._selectedColor;
		},

		/**
		 * Sets/gets the rollover background color of list items.
		 */
		"public function set rolloverColor",function set$rolloverColor(value/*:uint*/)/*:void*/
		{
			this._rolloverColor = value;
			this.invalidate();
		},
		"public function get rolloverColor",function get$rolloverColor()/*:uint*/
		{
			return this._rolloverColor;
		},

		/**
		 * Sets the height of each list item.
		 */
		"public function set listItemHeight",function set$listItemHeight(value/*:Number*/)/*:void*/
		{
			this._listItemHeight = value;
			this.invalidate();
		},
		"public function get listItemHeight",function get$listItemHeight()/*:Number*/
		{
			return this._listItemHeight;
		},

		/**
		 * Sets / gets the list of items to be shown.
		 */
		"public function set items",function set$items(value/*:Array*/)/*:void*/
		{
			this._items = value;
			this.invalidate();
		},
		"public function get items",function get$items()/*:Array*/
		{
			return this._items;
		},

		/**
		 * Sets / gets the class used to render list items. Must extend ListItem.
		 */
		"public function set listItemClass",function set$listItemClass(value/*:Class*/)/*:void*/
		{
			this._listItemClass = value;
			this.invalidate();
		},
		"public function get listItemClass",function get$listItemClass()/*:Class*/
		{
			return this._listItemClass;
		},

		/**
		 * Sets / gets the color for alternate rows if alternateRows is set to true.
		 */
		"public function set alternateColor",function set$alternateColor(value/*:uint*/)/*:void*/
		{
			this._alternateColor = value;
			this.invalidate();
		},
		"public function get alternateColor",function get$alternateColor()/*:uint*/
		{
			return this._alternateColor;
		},
		
		/**
		 * Sets / gets whether or not every other row will be colored with the alternate color.
		 */
		"public function set alternateRows",function set$alternateRows(value/*:Boolean*/)/*:void*/
		{
			this._alternateRows = value;
			this.invalidate();
		},
		"public function get alternateRows",function get$alternateRows()/*:Boolean*/
		{
			return this._alternateRows;
		},

		
	];},[],["com.bit101.components.Component","com.bit101.components.ListItem","Array","flash.events.MouseEvent","com.bit101.components.Panel","flash.display.Sprite","com.bit101.components.VScrollBar","Math","flash.events.Event"]
);