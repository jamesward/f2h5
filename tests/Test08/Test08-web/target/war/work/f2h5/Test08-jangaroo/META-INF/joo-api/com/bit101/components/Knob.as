/**
 * Knob.as
 * Keith Peters
 * version 0.9.5
 * 
 * A knob component for choosing a numerical value.
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
	
	public class Knob extends com.bit101.components.Component
	{
		public static const VERTICAL:String = "vertical";
		public static const HORIZONTAL:String = "horizontal";
		public static const ROTATE:String = "rotate";
		
		protected var _knob:Sprite;
		protected var _label:Label;
		protected var _labelText:String = "";
		protected var _max:Number = 100;
		protected var _min:Number = 0;
		protected var _mode:String = com.bit101.components.Knob.VERTICAL;
		protected var _mouseRange:Number = 100;
		protected var _precision:int = 1;
		protected var _radius:Number = 20;
		protected var _startX:Number;
		protected var _startY:Number;
		protected var _value:Number = 0;
		protected var _valueLabel:Label;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Knob.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label String containing the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function Knob(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, label:String = "", defaultHandler:Function = null);

		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates the children for this component
		 */
		override protected native function addChildren():void;
		
		/**
		 * Draw the knob at the specified radius.
		 */
		protected native function drawKnob():void;
		
		/**
		 * Updates the rotation of the knob based on the value, then formats the value label.
		 */
		protected native function updateKnob():void;
		
		/**
		 * Adjusts value to be within minimum and maximum.
		 */
		protected native function correctValue():void;
		
		/**
		 * Formats the value of the knob to a string based on the current level of precision.
		 */
		protected native function formatValueLabel():void;
		
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
		 * Internal handler for when user clicks on the knob. Starts tracking up/down motion of the mouse.
		 */
		protected native function onMouseDown(event:MouseEvent):void;
		
		/**
		 * Internal handler for mouse move event. Updates value based on how far mouse has moved up or down.
		 */
		protected native function onMouseMove(event:MouseEvent):void;
		
		/**
		 * Internal handler for mouse up event. Stops mouse tracking.
		 */
		protected native function onMouseUp(event:MouseEvent):void;
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the maximum value of this knob.
		 */
		public native function set maximum(m:Number):void;
		public native function get maximum():Number;
		
		/**
		 * Gets / sets the minimum value of this knob.
		 */
		public native function set minimum(m:Number):void;
		public native function get minimum():Number;
		
		/**
		 * Sets / gets the current value of this knob.
		 */
		public native function set value(v:Number):void;
		public native function get value():Number;
		
		/**
		 * Sets / gets the number of pixels the mouse needs to move to make the value of the knob go from min to max.
		 */
		public native function set mouseRange(value:Number):void;
		public native function get mouseRange():Number;
		
		/**
		 * Gets / sets the number of decimals to format the value label.
		 */
		public native function set labelPrecision(decimals:int):void;
		public native function get labelPrecision():int;
		
		/**
		 * Gets / sets whether or not to show the value label.
		 */
		public native function set showValue(value:Boolean):void;
		public native function get showValue():Boolean;
		
		/**
		 * Gets / sets the text shown in this component's label.
		 */
		public native function set label(str:String):void;
		public native function get label():String;

		public native function set mode(value:String):void;
		public native function get mode():String;

        public native function get radius():Number;

        public native function set radius(value:Number):void;
    }
}