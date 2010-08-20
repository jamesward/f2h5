/**
 * WheelMenu.as
 * Keith Peters
 * version 0.9.5
 * 
 * A radial menu that pops up around the mouse.
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
 * 
 * 
 * 
 * Components with text make use of the font PF Ronda Seven by Yuusuke Kamiyamane
 * This is a free font obtained from http://www.dafont.com/pf-ronda-seven.font
 */
 
package com.bit101.components
{
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filters.DropShadowFilter;

	public class WheelMenu extends com.bit101.components.Component
	{
		protected var _borderColor:uint = 0xcccccc;
		protected var _buttons:Array;
		protected var _color:uint = 0xffffff;
		protected var _highlightColor:uint = 0xeeeeee;
		protected var _iconRadius:Number;
		protected var _innerRadius:Number;
		protected var _items:Array;
		protected var _numButtons:int;
		protected var _outerRadius:Number;
		protected var _selectedIndex:int = -1;
		protected var _startingAngle:Number = -90;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param numButtons The number of segments in the menu
		 * @param outerRadius The radius of the menu as a whole.
		 * @parem innerRadius The radius of the inner circle at the center of the menu.
		 * @param defaultHandler The event handling function to handle the default event for this component (select in this case).
		 */
		public native function WheelMenu(parent:DisplayObjectContainer, numButtons:int, outerRadius:Number = 80, iconRadius:Number = 60, innerRadius:Number = 10, defaultHandler:Function = null);
			
		///////////////////////////////////
		// protected methods
		///////////////////////////////////
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates the buttons that make up the wheel menu.
		 */
		protected native function makeButtons():void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Hides the menu.
		 */
		public native function hide():void;
		
		/**
		 * Sets the icon / text and data for a specific menu item.
		 * @param index The index of the item to set icon/text and data for.
		 * @iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
		 * @data Any data to associate with the item.
		 */
		public native function setItem(index:int, iconOrLabel:Object, data:Object = null):void;
		
		/**
		 * Shows the menu - placing it on top level of parent and centering around mouse.
		 */
		public native function show():void;
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the component is added to the stage. Adds mouse listeners to the stage.
		 */
		protected native function onAddedToStage(event:Event):void;
		
		/**
		 * Called when the component is removed from the stage. Removes mouse listeners from stage.
		 */
		protected native function onRemovedFromStage(event:Event):void;
		
		/**
		 * Called when one of the buttons is selected. Sets selected index and dispatches select event.
		 */
		protected native function onSelect(event:Event):void;
		
		/**
		 * Called when mouse is released. Hides menu.
		 */
		protected native function onStageMouseUp(event:MouseEvent):void;
		
		///////////////////////////////////
		// getter / setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the color of the border around buttons.
		 */
		public native function set borderColor(value:uint):void;
		public native function get borderColor():uint;
		
		/**
		 * Gets / sets the base color of buttons.
		 */
		public native function set color(value:uint):void;
		public native function get color():uint;
		
		/**
		 * Gets / sets the highlighted color of buttons.
		 */
		public native function set highlightColor(value:uint):void;
		public native function get highlightColor():uint;
		
		/**
		 * Gets the selected index.
		 */
		public native function get selectedIndex():int;
		
		/**
		 * Gets the selected item.
		 */
		public native function get selectedItem():Object;
		
	
		
	}
}