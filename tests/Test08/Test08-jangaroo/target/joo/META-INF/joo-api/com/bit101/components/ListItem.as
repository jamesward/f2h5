/**
 * ListItem.as
 * Keith Peters
 * version 0.9.5
 * 
 * A single item in a list. 
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
	import flash.events.MouseEvent;
	
	public class ListItem extends com.bit101.components.Component
	{
		protected var _data:Object;
		protected var _label:Label;
		protected var _defaultColor:uint = 0xffffff;
		protected var _selectedColor:uint = 0xdddddd;
		protected var _rolloverColor:uint = 0xeeeeee;
		protected var _selected:Boolean;
		protected var _mouseOver:Boolean = false;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ListItem.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The text to show in this item.
		 */
		public native function ListItem(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, data:Object = null);
		
		/**
		 * Initilizes the component.
		 */
		protected override native function init() : void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren() : void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		public override native function draw() : void;
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the user rolls the mouse over the item. Changes the background color.
		 */
		protected native function onMouseOver(event:MouseEvent):void;
		
		/**
		 * Called when the user rolls the mouse off the item. Changes the background color.
		 */
		protected native function onMouseOut(event:MouseEvent):void;
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the string that appears in this item.
		 */
		public native function set data(value:Object):void;
		public native function get data():Object;
		
		/**
		 * Sets/gets whether or not this item is selected.
		 */
		public native function set selected(value:Boolean):void;
		public native function get selected():Boolean;
		
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
		
	}
}