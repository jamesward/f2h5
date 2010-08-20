/**
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

package com.bit101.components
{
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	public class List extends com.bit101.components.Component
	{
		protected var _items:Array;
		protected var _itemHolder:Sprite;
		protected var _panel:Panel;
		protected var _listItemHeight:Number = 20;
		protected var _listItemClass:Class =com.bit101.components.ListItem;
		protected var _scrollbar:VScrollBar;
		protected var _selectedIndex:int = -1;
		protected var _defaultColor:uint = 0xffffff;
		protected var _alternateColor:uint = 0xf3f3f3;
		protected var _selectedColor:uint = 0xcccccc;
		protected var _rolloverColor:uint = 0xdddddd;
		protected var _alternateRows:Boolean = false;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this List.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param items An array of items to display in the list. Either strings or objects with label property.
		 */
		public native function List(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, items:Array=null);
		
		/**
		 * Initilizes the component.
		 */
		protected override native function init() : void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren() : void;
		
		/**
		 * Creates all the list items based on data.
		 */
		protected native function makeListItems():void;
		
		/**
		 * If the selected item is not in view, scrolls the list to make the selected item appear in the view.
		 */
		protected native function scrollToSelection():void;
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		public override native function draw() : void;
		
		/**
		 * Adds an item to the list.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 */
		public native function addItem(item:Object):void;
		
		/**
		 * Adds an item to the list at the specified index.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 * @param index The index at which to add the item.
		 */
		public native function addItemAt(item:Object, index:int):void;
		
		/**
		 * Removes the referenced item from the list.
		 * @param item The item to remove. If a string, must match the item containing that string. If an object, must be a reference to the exact same object.
		 */
		public native function removeItem(item:Object):void;
		
		/**
		 * Removes the item from the list at the specified index
		 * @param index The index of the item to remove.
		 */
		public native function removeItemAt(index:int):void;
		
		/**
		 * Removes all items from the list.
		 */
		public native function removeAll():void;
		
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when a user selects an item in the list.
		 */
		protected native function onSelect(event:Event):void;
		
		/**
		 * Called when the user scrolls the scroll bar.
		 */
		protected native function onScroll(event:Event):void;
		
		/**
		 * Called when the mouse wheel is scrolled over the component.
		 */
		protected native function onMouseWheel(event:MouseEvent):void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the index of the selected list item.
		 */
		public native function set selectedIndex(value:int):void;
		public native function get selectedIndex():int;
		
		/**
		 * Sets / gets the item in the list, if it exists.
		 */
		public native function set selectedItem(item:Object):void;
		public native function get selectedItem():Object;

		/**
		 * Sets/gets the default background color of list items.
		 */
		public native function set defaultColor(value:uint):void;
		public native function get defaultColor():uint;

		/**
		 * Sets/gets the selected background color of list items.
		 */
		public native function set selectedColor(value:uint):void;
		public native function get selectedColor():uint;

		/**
		 * Sets/gets the rollover background color of list items.
		 */
		public native function set rolloverColor(value:uint):void;
		public native function get rolloverColor():uint;

		/**
		 * Sets the height of each list item.
		 */
		public native function set listItemHeight(value:Number):void;
		public native function get listItemHeight():Number;

		/**
		 * Sets / gets the list of items to be shown.
		 */
		public native function set items(value:Array):void;
		public native function get items():Array;

		/**
		 * Sets / gets the class used to render list items. Must extend ListItem.
		 */
		public native function set listItemClass(value:Class):void;
		public native function get listItemClass():Class;

		/**
		 * Sets / gets the color for alternate rows if alternateRows is set to true.
		 */
		public native function set alternateColor(value:uint):void;
		public native function get alternateColor():uint;
		
		/**
		 * Sets / gets whether or not every other row will be colored with the alternate color.
		 */
		public native function set alternateRows(value:Boolean):void;
		public native function get alternateRows():Boolean;

		
	}
}