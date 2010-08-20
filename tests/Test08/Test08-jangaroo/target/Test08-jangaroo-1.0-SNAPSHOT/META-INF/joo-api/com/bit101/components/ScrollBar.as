/**
 * ScrollBar.as
 * Keith Peters
 * version 0.9.5
 * 
 * Base class for HScrollBar and VScrollBar
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
	import flash.events.TimerEvent;
	import flash.utils.Timer;

	public class ScrollBar extends com.bit101.components.Component
	{
		protected const DELAY_TIME:int = 500;
		protected const REPEAT_TIME:int = 100; 
		protected const UP:String = "up";
		protected const DOWN:String = "down";
		
		protected var _upButton:PushButton;
		protected var _downButton:PushButton;
		protected var _scrollSlider:ScrollSlider;
		protected var _orientation:String;
		protected var _lineSize:int = 1;
		protected var _delayTimer:Timer;
		protected var _repeatTimer:Timer;
		protected var _direction:String;
		protected var _shouldRepeat:Boolean = false;
		
		/**
		 * Constructor
		 * @param orientation Whether this is a vertical or horizontal slider.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function ScrollBar(orientation:String, parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, defaultHandler:Function = null);
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		override protected native function addChildren():void;
		
		/**
		 * Initializes the component.
		 */
		protected override native function init():void;
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Convenience method to set the three main parameters in one shot.
		 * @param min The minimum value of the slider.
		 * @param max The maximum value of the slider.
		 * @param value The value of the slider.
		 */
		public native function setSliderParams(min:Number, max:Number, value:Number):void;
		
		/**
		 * Sets the percentage of the size of the thumb button.
		 */
		public native function setThumbPercent(value:Number):void;
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;

		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this scroll bar.
		 */
		public native function set value(v:Number):void;
		public native function get value():Number;
		
		/**
		 * Sets / gets the minimum value of this scroll bar.
		 */
		public native function set minimum(v:Number):void;
		public native function get minimum():Number;
		
		/**
		 * Sets / gets the maximum value of this scroll bar.
		 */
		public native function set maximum(v:Number):void;
		public native function get maximum():Number;
		
		/**
		 * Sets / gets the amount the value will change when up or down buttons are pressed.
		 */
		public native function set lineSize(value:int):void;
		public native function get lineSize():int;
		
		/**
		 * Sets / gets the amount the value will change when the back is clicked.
		 */
		public native function set pageSize(value:int):void;
		public native function get pageSize():int;
		

		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		protected native function onUpClick(event:MouseEvent):void;
				
		protected native function goUp():void;
		
		protected native function onDownClick(event:MouseEvent):void;
		
		protected native function goDown():void;
		
		protected native function onMouseUp(event:MouseEvent):void;
		
		protected native function onChange(event:Event):void;
		
		protected native function onDelayComplete(event:TimerEvent):void;
		
		protected native function onRepeat(event:TimerEvent):void;
		



	}
}