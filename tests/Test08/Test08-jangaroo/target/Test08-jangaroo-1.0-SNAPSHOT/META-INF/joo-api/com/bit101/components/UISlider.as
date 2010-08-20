/**
 * UISlider.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Slider with a label and value label. Abstract base class for VUISlider and HUISlider
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

	public class UISlider extends com.bit101.components.Component
	{
		protected var _label:Label;
		protected var _valueLabel:Label;
		protected var _slider:Slider;
		protected var _precision:int = 1;
		protected var _sliderClass:Class;
		protected var _labelText:String;
		protected var _tick:Number = 1;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this UISlider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The initial string to display as this component's label.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function UISlider(parent:DisplayObjectContainer = null, x:Number = 0, y:Number = 0, label:String = "", defaultEventHandler:Function = null);
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		override protected native function addChildren():void;
		
		/**
		 * Formats the value of the slider to a string based on the current level of precision.
		 */
		protected native function formatValueLabel():void;
		
		/**
		 * Positions the label when it has changed. Implemented in child classes.
		 */
		protected native function positionLabel():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of this component.
		 */
		override public native function draw():void;
		
		/**
		 * Convenience method to set the three main parameters in one shot.
		 * @param min The minimum value of the slider.
		 * @param max The maximum value of the slider.
		 * @param value The value of the slider.
		 */
		public native function setSliderParams(min:Number, max:Number, value:Number):void;
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Handler called when the slider's value changes.
		 * @param event The Event passed by the slider.
		 */
		protected native function onSliderChange(event:Event):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this slider.
		 */
		public native function set value(v:Number):void;
		public native function get value():Number;
		
		/**
		 * Gets / sets the maximum value of this slider.
		 */
		public native function set maximum(m:Number):void;
		public native function get maximum():Number;
		
		/**
		 * Gets / sets the minimum value of this slider.
		 */
		public native function set minimum(m:Number):void;
		public native function get minimum():Number;
		
		/**
		 * Gets / sets the number of decimals to format the value label. Does not affect the actual value of the slider, just the number shown.
		 */
		public native function set labelPrecision(decimals:int):void;
		public native function get labelPrecision():int;
		
		/**
		 * Gets / sets the text shown in this component's label.
		 */
		public native function set label(str:String):void;
		public native function get label():String;
		
		/**
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		public native function set tick(t:Number):void;
		public native function get tick():Number;
		

	}
}