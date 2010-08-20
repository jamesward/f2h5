/**
 * TextArea.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Text component for displaying multiple lines of text with a scrollbar.
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
	import flash.events.MouseEvent;
	
	public class TextArea extends com.bit101.components.Text
	{
		protected var _scrollbar:VScrollBar;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The initial text to display in this component.
		 */
		public native function TextArea(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, text:String="");
		
		/**
		 * Initilizes the component.
		 */
		protected override native function init() : void;
		/**
		 * Creates and adds the child display objects of this component.
		 */
		override protected native function addChildren():void;
		
		/**
		 * Changes the thumb percent of the scrollbar based on how much text is shown in the text area.
		 */
		protected native function updateScrollbar():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Waits one more frame before updating scroll bar.
		 * It seems that numLines and maxScrollV are not valid immediately after changing a TextField's size.
		 */
		protected native function onTextScrollDelay(event:Event):void;
		
		/**
		 * Called when the text in the text field is manually changed.
		 */
		protected override native function onChange(event:Event):void;
		
		/**
		 * Called when the scroll bar is moved. Scrolls text accordingly.
		 */
		protected native function onScrollbarScroll(event:Event):void;
		
		/**
		 * Called when the text is scrolled manually. Updates the position of the scroll bar.
		 */
		protected native function onTextScroll(event:Event):void;
		
		/**
		 * Called when the mouse wheel is scrolled over the component.
		 */
		protected native function onMouseWheel(event:MouseEvent):void;

        /**
         * Sets/gets whether this component is enabled or not.
         */
        public override native function set enabled(value:Boolean):void;
	}
}