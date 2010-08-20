/**
 * ComboBox.as
 * Keith Peters
 * version 0.9.5
 * 
 * A button that exposes a list of choices and displays the chosen item. 
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
	import flash.display.Stage;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	public class ComboBox extends com.bit101.components.Component
	{
		public static const TOP:String = "top";
		public static const BOTTOM:String = "bottom";
		
		protected var _defaultLabel:String = "";
		protected var _dropDownButton:PushButton;
		protected var _items:Array;
		protected var _labelButton:PushButton;
		protected var _list:List;
		protected var _numVisibleItems:int = 6;
		protected var _open:Boolean = false;
		protected var _openPosition:String = com.bit101.components.ComboBox.BOTTOM;
		protected var _stage:Stage;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this List.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultLabel The label to show when no item is selected.
		 * @param items An array of items to display in the list. Either strings or objects with label property.
		 */
		public native function ComboBox(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, defaultLabel:String="", items:Array = null);
		
		/**
		 * Initilizes the component.
		 */
		protected override native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren():void;
		
		/**
		 * Determines what to use for the main button label and sets it.
		 */
		protected native function setLabelButtonLabel():void;
		
		/**
		 * Removes the list from the stage.
		 */
		protected native function removeList():void;
		

		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		public override native function draw():void;
		
		
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
		 * Called when one of the top buttons is pressed. Either opens or closes the list.
		 */
		protected native function onDropDown(event:MouseEvent):void;
		
		/**
		 * Called when the mouse is clicked somewhere outside of the combo box when the list is open. Closes the list.
		 */
		protected native function onStageClick(event:MouseEvent):void;
		
		/**
		 * Called when an item in the list is selected. Displays that item in the label button.
		 */
		protected native function onSelect(event:Event):void;
		
		/**
		 * Called when the component is added to the stage.
		 */
		protected native function onAddedToStage(event:Event):void;
		
		/**
		 * Called when the component is removed from the stage.
		 */
		protected native function onRemovedFromStage(event:Event):void;
		
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
		 * Sets / gets the position the list will open on: top or bottom.
		 */
		public native function set openPosition(value:String):void;
		public native function get openPosition():String;

		/**
		 * Sets / gets the label that will be shown if no item is selected.
		 */
		public native function set defaultLabel(value:String):void;
		public native function get defaultLabel():String;

		/**
		 * Sets / gets the number of visible items in the drop down list. i.e. the height of the list.
		 */
		public native function set numVisibleItems(value:int):void;
		public native function get numVisibleItems():int;

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