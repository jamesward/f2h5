/**
 * Accordion.as
 * Keith Peters
 * version 0.9.5
 * 
 * Essentially a VBox full of Windows. Only one Window will be expanded at any time.
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
	import flash.events.Event;
	
	public class Accordion extends com.bit101.components.Component
	{
		protected var _windows:Array;
		protected var _winWidth:Number = 100;
		protected var _winHeight:Number = 100;
		protected var _vbox:VBox;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function Accordion(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren() : void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Adds a new window to the bottom of the accordion.
		 * @param title The title of the new window.
		 */
		public native function addWindow(title:String):void;
		
		/**
		 * Sets the size of the component.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		override public native function setSize(w:Number, h:Number) : void;
		
		override public native function draw():void;
		
		/**
		 * Returns the Window at the specified index.
		 * @param index The index of the Window you want to get access to.
		 */
		public native function getWindowAt(index:int):Window;

		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when any window is resized. If the window has been expanded, it closes all other windows.
		 */
		protected native function onWindowSelect(event:Event):void;
		
		public override native function set width(w:Number):void;
		
		public override native function set height(h:Number):void;
		
	}
}