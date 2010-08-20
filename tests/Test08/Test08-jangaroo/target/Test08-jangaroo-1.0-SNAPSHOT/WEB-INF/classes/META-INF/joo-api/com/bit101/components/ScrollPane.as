/**
 * ScrollPane.as
 * Keith Peters
 * version 0.9.5
 * 
 * A panel with scroll bars for scrolling content that is larger.
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
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	
	public class ScrollPane extends com.bit101.components.Panel
	{
		protected var _vScrollbar:VScrollBar;
		protected var _hScrollbar:HScrollBar;
		protected var _corner:Shape;
		protected var _dragContent:Boolean = true;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ScrollPane.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function ScrollPane(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0);
		
		/**
		 * Initializes this component.
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
		
		/**
		 * Updates the scrollbars when content is changed. Needs to be done manually.
		 */
		public native function update():void;
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when either scroll bar is scrolled.
		 */
		protected native function onScroll(event:Event):void;
		
		protected native function onResize(event:Event):void;
		
		protected native function onMouseDown(event:MouseEvent):void;
		
		protected native function onMouseMove(event:MouseEvent):void;
		
		protected native function onMouseUp(event:MouseEvent):void;

		public native function set dragContent(value:Boolean):void;
		public native function get dragContent():Boolean;

		
	}
}