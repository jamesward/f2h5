/**
 * Window.as
 * Keith Peters
 * version 0.9.5
 * 
 * A draggable window. Can be used as a container for other components.
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
	import flash.events.Event;
	import flash.events.MouseEvent;

	public class Window extends com.bit101.components.Component
	{
		protected var _title:String;
		protected var _titleBar:Panel;
		protected var _titleLabel:Label;
		protected var _panel:Panel;
		protected var _color:int = -1;
		protected var _shadow:Boolean = true;
		protected var _draggable:Boolean = true;
		protected var _minimizeButton:Sprite;
		protected var _hasMinimizeButton:Boolean = false;
		protected var _minimized:Boolean = false;
		protected var _hasCloseButton:Boolean;
		protected var _closeButton:PushButton;
		protected var _grips:Shape;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param title The string to display in the title bar.
		 */
		public native function Window(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, title:String="Window");
		
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


		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal mouseDown handler. Starts a drag.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onMouseDown(event:MouseEvent):void;
		
		/**
		 * Internal mouseUp handler. Stops the drag.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onMouseUp(event:MouseEvent):void;
		
		protected native function onMinimize(event:MouseEvent):void;
		
		protected native function onClose(event:MouseEvent):void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets whether or not this Window will have a drop shadow.
		 */
		public native function set shadow(b:Boolean):void;
		public native function get shadow():Boolean;
		
		/**
		 * Gets / sets the background color of this panel.
		 */
		public native function set color(c:int):void;
		public native function get color():int;
		
		/**
		 * Gets / sets the title shown in the title bar.
		 */
		public native function set title(t:String):void;
		public native function get title():String;
		
		/**
		 * Container for content added to this panel. This is just a reference to the content of the internal Panel, which is masked, so best to add children to content, rather than directly to the window.
		 */
		public native function get content():DisplayObjectContainer;
		
		/**
		 * Sets / gets whether or not the window will be draggable by the title bar.
		 */
		public native function set draggable(b:Boolean):void;
		public native function get draggable():Boolean;
		
		/**
		 * Gets / sets whether or not the window will show a minimize button that will toggle the window open and closed. A closed window will only show the title bar.
		 */
		public native function set hasMinimizeButton(b:Boolean):void;
		public native function get hasMinimizeButton():Boolean;
		
		/**
		 * Gets / sets whether the window is closed. A closed window will only show its title bar.
		 */
		public native function set minimized(value:Boolean):void;
		public native function get minimized():Boolean;
		
		/**
		 * Gets the height of the component. A minimized window's height will only be that of its title bar.
		 */
		override public native function get height():Number;

		/**
		 * Sets / gets whether or not the window will display a close button.
		 * Close button merely dispatches a CLOSE event when clicked. It is up to the developer to handle this event.
		 */
		public native function set hasCloseButton(value:Boolean):void;
		public native function get hasCloseButton():Boolean;

		/**
		 * Returns a reference to the title bar for customization.
		 */
		public native function get titleBar():Panel;
		public native function set titleBar(value:Panel):void;

		/**
		 * Returns a reference to the shape showing the grips on the title bar. Can be used to do custom drawing or turn them invisible.
		 */		
		public native function get grips():Shape;


	}
}