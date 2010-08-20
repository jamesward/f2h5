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

	public class WheelMenu extends Component
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
		public function WheelMenu(parent:DisplayObjectContainer, numButtons:int, outerRadius:Number = 80, iconRadius:Number = 60, innerRadius:Number = 10, defaultHandler:Function = null)
		{
			_numButtons = numButtons;
			_outerRadius = outerRadius;
			_iconRadius = iconRadius;
			_innerRadius = innerRadius;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			super(parent);
			
			if(defaultHandler != null)
			{
				addEventListener(Event.SELECT, defaultHandler);
			}
		}
			
		///////////////////////////////////
		// protected methods
		///////////////////////////////////
		
		/**
		 * Initializes the component.
		 */
		override protected function init():void
		{
			super.init();
			_items = new Array();
			makeButtons();

			filters = [new DropShadowFilter(4, 45, 0, 1, 4, 4, .2, 4)];
		}
		
		/**
		 * Creates the buttons that make up the wheel menu.
		 */
		protected function makeButtons():void
		{
			_buttons = new Array();
			for(var i:int = 0; i < _numButtons; i++)
			{
				var btn:ArcButton = new ArcButton(Math.PI * 2 / _numButtons, _outerRadius, _iconRadius, _innerRadius);
				btn.id = i;
				btn.rotation = _startingAngle + 360 / _numButtons * i;
				btn.addEventListener(Event.SELECT, onSelect);
				addChild(btn);
				_buttons.push(btn);
			}
		}
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Hides the menu.
		 */
		public function hide():void
		{
			visible = false;
			if(stage != null)
			{
				stage.removeEventListener(MouseEvent.MOUSE_UP, onStageMouseUp);
			}
		}
		
		/**
		 * Sets the icon / text and data for a specific menu item.
		 * @param index The index of the item to set icon/text and data for.
		 * @iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
		 * @data Any data to associate with the item.
		 */
		public function setItem(index:int, iconOrLabel:Object, data:Object = null):void
		{
			_buttons[index].setIcon(iconOrLabel);
			_items[index] = data;
		}
		
		/**
		 * Shows the menu - placing it on top level of parent and centering around mouse.
		 */
		public function show():void
		{
			parent.addChild(this);
			x = Math.round(parent.mouseX)
			y = Math.round(parent.mouseY);
			_selectedIndex = -1;
			visible = true;
			stage.addEventListener(MouseEvent.MOUSE_UP, onStageMouseUp, true);
		}
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the component is added to the stage. Adds mouse listeners to the stage.
		 */
		protected function onAddedToStage(event:Event):void
		{
			hide();
			addEventListener(Event.REMOVED_FROM_STAGE, onRemovedFromStage);
		}
		
		/**
		 * Called when the component is removed from the stage. Removes mouse listeners from stage.
		 */
		protected function onRemovedFromStage(event:Event):void
		{
			stage.removeEventListener(MouseEvent.MOUSE_UP, onStageMouseUp);
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemovedFromStage);
		}
		
		/**
		 * Called when one of the buttons is selected. Sets selected index and dispatches select event.
		 */
		protected function onSelect(event:Event):void
		{
			_selectedIndex = event.target.id;
			dispatchEvent(new Event(Event.SELECT));
		}
		
		/**
		 * Called when mouse is released. Hides menu.
		 */
		protected function onStageMouseUp(event:MouseEvent):void
		{
			hide();
		}
		
		///////////////////////////////////
		// getter / setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the color of the border around buttons.
		 */
		public function set borderColor(value:uint):void
		{
			_borderColor = value;
			for(var i:int = 0; i < _numButtons; i++)
			{
				_buttons[i].borderColor = _borderColor;
			}
		}
		public function get borderColor():uint
		{
			return _borderColor;
		}
		
		/**
		 * Gets / sets the base color of buttons.
		 */
		public function set color(value:uint):void
		{
			_color = value;
			for(var i:int = 0; i < _numButtons; i++)
			{
				_buttons[i].color = _color;
			}
		}
		public function get color():uint
		{
			return _color;
		}
		
		/**
		 * Gets / sets the highlighted color of buttons.
		 */
		public function set highlightColor(value:uint):void
		{
			_highlightColor = value;
			for(var i:int = 0; i < _numButtons; i++)
			{
				_buttons[i].highlightColor = _highlightColor;
			}
		}
		public function get highlightColor():uint
		{
			return _highlightColor;
		}
		
		/**
		 * Gets the selected index.
		 */
		public function get selectedIndex():int
		{
			return _selectedIndex;
		}
		
		/**
		 * Gets the selected item.
		 */
		public function get selectedItem():Object
		{
			return _items[_selectedIndex];
		}
		
	
		
	}
}
