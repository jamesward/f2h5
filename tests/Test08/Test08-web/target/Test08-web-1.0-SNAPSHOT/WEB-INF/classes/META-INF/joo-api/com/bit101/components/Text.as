/**
 * Text.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Text component for displaying multiple lines of text.
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
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	
	public class Text extends com.bit101.components.Component
	{
		protected var _tf:TextField;
		protected var _text:String = "";
		protected var _editable:Boolean = true;
		protected var _panel:Panel;
		protected var _selectable:Boolean = true;
		protected var _html:Boolean = false;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The initial text to display in this component.
		 */
		public native function Text(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, text:String = "");
		
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
		 * Called when the text in the text field is manually changed.
		 */
		protected native function onChange(event:Event):void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the text of this Label.
		 */
		public native function set text(t:String):void;
		public native function get text():String;
		
		/**
		 * Returns a reference to the internal text field in the component.
		 */
		public native function get textField():TextField;
		
		/**
		 * Gets / sets whether or not this text component will be editable.
		 */
		public native function set editable(b:Boolean):void;
		public native function get editable():Boolean;
		
		/**
		 * Gets / sets whether or not this text component will be selectable. Only meaningful if editable is false.
		 */
		public native function set selectable(b:Boolean):void;
		public native function get selectable():Boolean;
		
		/**
		 * Gets / sets whether or not text will be rendered as HTML or plain text.
		 */
		public native function set html(b:Boolean):void;
		public native function get html():Boolean;

        /**
         * Sets/gets whether this component is enabled or not.
         */
        public override native function set enabled(value:Boolean):void;

	}
}