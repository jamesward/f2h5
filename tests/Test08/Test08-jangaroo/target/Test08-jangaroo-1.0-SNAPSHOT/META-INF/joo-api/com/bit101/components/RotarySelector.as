/**
 * RotarySelector.as
 * Keith Peters
 * version 0.9.5
 * 
 * A rotary selector component for choosing among different values.
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
	import flash.events.MouseEvent;
	
	public class RotarySelector extends com.bit101.components.Component
	{
		public static const ALPHABETIC:String = "alphabetic";
		public static const NUMERIC:String = "numeric";
		public static const NONE:String = "none";
		public static const ROMAN:String = "roman";
		
		
		protected var _label:Label;
		protected var _labelText:String = "";
		protected var _knob:Sprite;
		protected var _numChoices:int = 2;
		protected var _choice:Number = 0;
		protected var _labels:Sprite;
		protected var _labelMode:String = com.bit101.components.RotarySelector.ALPHABETIC;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this CheckBox.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label String containing the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function RotarySelector(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, label:String = "", defaultHandler:Function = null);
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates the children for this component
		 */
		override protected native function addChildren():void;
		
		/**
		 * Decrements the index of the current choice.
		 */
		protected native function decrement():void;
		
		/**
		 * Increments the index of the current choice.
		 */
		protected native function increment():void;
		
		/**
		 * Removes old labels.
		 */
		protected native function resetLabels():void;
		
		/**
		 * Draw the knob at the specified radius.
		 * @param radius The radius with which said knob will be drawn.
		 */
		protected native function drawKnob(radius:Number):void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;
		
		
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal click handler.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onClick(event:MouseEvent):void;
		
		protected native function onLabelClick(event:Event):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the number of available choices (maximum of 10).
		 */
		public native function set numChoices(value:uint):void;
		public native function get numChoices():uint;
		
		/**
		 * Gets / sets the current choice, keeping it in range of 0 to numChoices - 1.
		 */
		public native function set choice(value:uint):void;
		public native function get choice():uint;
		
		/**
		 * Specifies what will be used as labels for each choice. Valid values are "alphabetic", "numeric", and "none".
		 */
		public native function set labelMode(value:String):void;
		public native function get labelMode():String;
	}
}