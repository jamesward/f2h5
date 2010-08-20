/**
 * InputText.as
 * Keith Peters
 * version 0.9.5
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
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	
	public class InputText extends com.bit101.components.Component
	{
		protected var _back:Sprite;
		protected var _password:Boolean = false;
		protected var _text:String = "";
		protected var _tf:TextField;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this InputText.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The string containing the initial text of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function InputText(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, text:String = "", defaultHandler:Function = null);
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates and adds child display objects.
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
		 * Internal change handler.
		 * @param event The Event passed by the system.
		 */
		protected native function onChange(event:Event):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the text shown in this InputText.
		 */
		public native function set text(t:String):void;
		public native function get text():String;
		
		/**
		 * Returns a reference to the internal text field in the component.
		 */
		public native function get textField():TextField;
		
		/**
		 * Gets / sets the list of characters that are allowed in this TextInput.
		 */
		public native function set restrict(str:String):void;
		public native function get restrict():String;
		
		/**
		 * Gets / sets the maximum number of characters that can be shown in this InputText.
		 */
		public native function set maxChars(max:int):void;
		public native function get maxChars():int;
		
		/**
		 * Gets / sets whether or not this input text will show up as password (asterisks).
		 */
		public native function set password(b:Boolean):void;
		public native function get password():Boolean;

        /**
         * Sets/gets whether this component is enabled or not.
         */
        public override native function set enabled(value:Boolean):void;

	}
}