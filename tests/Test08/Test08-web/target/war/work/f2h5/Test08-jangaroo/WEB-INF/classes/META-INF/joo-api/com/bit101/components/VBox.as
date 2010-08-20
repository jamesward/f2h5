/**
 * VBox.as
 * Keith Peters
 * version 0.9.5
 * 
 * A layout container for vertically aligning other components.
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
    import flash.display.DisplayObject;
    import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.events.Event;

	public class VBox extends com.bit101.components.Component
	{
		protected var _spacing:Number = 5;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this PushButton.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function VBox(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0);
		
		/**
		 * Override of addChild to force layout;
		 */
		override public native function addChildAt(child:DisplayObject, index:int) : DisplayObject;

        /**
         * Override of removeChild to force layout;
         */
        override public native function removeChild(child:DisplayObject):DisplayObject;
		
        /**
         * Override of removeChild to force layout;
         */
        override public native function removeChildAt(index:int):DisplayObject;

		/**
		 * Internal handler for resize event of any attached component. Will redo the layout based on new size.
		 */
		protected native function onResize(event:Event):void;
		
		/**
		 * Draws the visual ui of the component, in this case, laying out the sub components.
		 */
		override public native function draw() : void;
		
		/**
		 * Gets / sets the spacing between each sub component.
		 */
		public native function set spacing(s:Number):void;
		public native function get spacing():Number;
	}
}