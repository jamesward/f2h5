/**
 * Panel.as
 * Keith Peters
 * version 0.9.5
 * 
 * A rectangular panel. Can be used as a container for other components.
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
	import flash.display.Shape;
	import flash.display.Sprite;
	
	public class Panel extends com.bit101.components.Component
	{
		protected var _mask:Sprite;
		protected var _background:Sprite;
		protected var _color:int = -1;
		protected var _shadow:Boolean = true;
		protected var _gridSize:int = 10;
		protected var _showGrid:Boolean = false;
		protected var _gridColor:uint = 0xd0d0d0;
		
		
		/**
		 * Container for content added to this panel. This is masked, so best to add children to content, rather than directly to the panel.
		 */
		public var content:Sprite;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function Panel(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0);
		
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		override protected native function addChildren():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;
		
		protected native function drawGrid():void;
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets whether or not this Panel will have an inner shadow.
		 */
		public native function set shadow(b:Boolean):void;
		public native function get shadow():Boolean;
		
		/**
		 * Gets / sets the backgrond color of this panel.
		 */
		public native function set color(c:int):void;
		public native function get color():int;

		/**
		 * Sets / gets the size of the grid.
		 */
		public native function set gridSize(value:int):void;
		public native function get gridSize():int;

		/**
		 * Sets / gets whether or not the grid will be shown.
		 */
		public native function set showGrid(value:Boolean):void;
		public native function get showGrid():Boolean;

		/**
		 * Sets / gets the color of the grid lines.
		 */
		public native function set gridColor(value:uint):void;
		public native function get gridColor():uint;
	}
}