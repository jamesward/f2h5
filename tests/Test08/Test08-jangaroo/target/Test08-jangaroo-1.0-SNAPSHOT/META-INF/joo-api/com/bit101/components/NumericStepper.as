/**
 * NumericStepper.as
 * Keith Peters
 * version 0.9.5
 * 
 * A component allowing for entering a numeric value with the keyboard, or by pressing up/down buttons.
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
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
	public class NumericStepper extends com.bit101.components.Component
	{
		protected const DELAY_TIME:int = 500;
		protected const UP:String = "up";
        protected const DOWN:String = "down";
		protected var _minusBtn:PushButton;

        protected var _repeatTime:int = 100;
        protected var _plusBtn:PushButton;
		protected var _valueText:InputText;
		protected var _value:Number = 0;
		protected var _step:Number = 1;
		protected var _labelPrecision:int = 1;
		protected var _maximum:Number = Number.POSITIVE_INFINITY;
		protected var _minimum:Number = Number.NEGATIVE_INFINITY;
		protected var _delayTimer:Timer;
		protected var _repeatTimer:Timer;
		protected var _direction:String;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function NumericStepper(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, defaultHandler:Function = null);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren():void;
		
		protected native function increment():void;
		
		protected native function decrement():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		public override native function draw():void;
		
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the minus button is pressed. Decrements the value by the step amount.
		 */
		protected native function onMinus(event:MouseEvent):void;
		
		/**
		 * Called when the plus button is pressed. Increments the value by the step amount.
		 */
		protected native function onPlus(event:MouseEvent):void;
		
		protected native function onMouseUp(event:MouseEvent):void;
		
		/**
		 * Called when the value is changed manually.
		 */
		protected native function onValueTextChange(event:Event):void;

		protected native function onDelayComplete(event:TimerEvent):void;

		protected native function onRepeat(event:TimerEvent):void;
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this component.
		 */
		public native function set value(val:Number):void;
		public native function get value():Number;

		/**
		 * Sets / gets the amount the value will change when the up or down button is pressed. Must be zero or positive.
		 */
		public native function set step(value:Number):void;
		public native function get step():Number;

		/**
		 * Sets / gets how many decimal points of precision will be shown.
		 */
		public native function set labelPrecision(value:int):void;
		public native function get labelPrecision():int;

		/**
		 * Sets / gets the maximum value for this component.
		 */
		public native function set maximum(value:Number):void;
		public native function get maximum():Number;

		/**
		 * Sets / gets the maximum value for this component.
		 */
		public native function set minimum(value:Number):void;
		public native function get minimum():Number;

        /**
         * Gets/sets the update rate that the stepper will change its value if a button is held down.
         */
        public native function get repeatTime():int;

        public native function set repeatTime(value:int):void;
    }
}