/**
 * RangeSlider.as
 * Keith Peters
 * version 0.9.5
 * 
 * Abstract base class for HRangeSlider and VRangeSlider.
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
	import flash.geom.Rectangle;
	
	public class RangeSlider extends com.bit101.components.Component
	{
		protected var _back:Sprite;
		protected var _highLabel:Label;
		protected var _highValue:Number = 100;
		protected var _labelMode:String = com.bit101.components.RangeSlider.ALWAYS;
		protected var _labelPosition:String;
		protected var _labelPrecision:int = 0;
		protected var _lowLabel:Label;
		protected var _lowValue:Number = 0;
		protected var _maximum:Number = 100;
		protected var _maxHandle:Sprite;
		protected var _minimum:Number = 0;
		protected var _minHandle:Sprite;
		protected var _orientation:String = com.bit101.components.RangeSlider.VERTICAL;
		protected var _tick:Number = 1;
		
		public static const ALWAYS:String = "always";
		public static const BOTTOM:String = "bottom";
		public static const HORIZONTAL:String = "horizontal";
		public static const LEFT:String = "left";
		public static const MOVE:String = "move";
		public static const NEVER:String = "never";
		public static const RIGHT:String = "right";
		public static const TOP:String = "top";
		public static const VERTICAL:String = "vertical";
		
		
		
		/**
		 * Constructor
		 * @param orientation Whether the slider will be horizontal or vertical.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function RangeSlider(orientation:String, parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, defaultHandler:Function = null);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren():void;
		
		/**
		 * Draws the back of the slider.
		 */
		protected native function drawBack():void;
		
		/**
		 * Draws the handles of the slider.
		 */
		protected native function drawHandles():void;
		
		/**
		 * Adjusts positions of handles when value, maximum or minimum have changed.
		 * TODO: Should also be called when slider is resized.
		 */
		protected native function positionHandles():void;
		
		/**
		 * Sets the text and positions the labels.
		 */
		protected native function updateLabels():void;

		/**
		 * Generates a label string for the given value.
		 * @param value The number to create a label for.
		 */
		protected native function getLabelForValue(value:Number):String;
		
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
		 * Internal mouseDown handler for the low value handle. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onDragMin(event:MouseEvent):void;
		
		/**
		 * Internal mouseDown handler for the high value handle. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onDragMax(event:MouseEvent):void;
		
		/**
		 * Internal mouseUp handler. Stops dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onDrop(event:MouseEvent):void;
		
		/**
		 * Internal mouseMove handler for when the low value handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onMinSlide(event:MouseEvent):void;

		/**
		 * Internal mouseMove handler for when the high value handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onMaxSlide(event:MouseEvent):void;
		
		/**
		 * Gets / sets the minimum value of the slider.
		 */
		public native function set minimum(value:Number):void;
		public native function get minimum():Number;

		/**
		 * Gets / sets the maximum value of the slider.
		 */
		public native function set maximum(value:Number):void;
		public native function get maximum():Number;

		/**
		 * Gets / sets the low value of this slider.
		 */
		public native function set lowValue(value:Number):void;
		public native function get lowValue():Number;

		/**
		 * Gets / sets the high value for this slider.
		 */
		public native function set highValue(value:Number):void;
		public native function get highValue():Number;

		/**
		 * Sets / gets when the labels will appear. Can be "never", "move", or "always"
		 */
		public native function set labelMode(value:String):void;
		public native function get labelMode():String;

		/**
		 * Sets / gets where the labels will appear. "left" or "right" for vertical sliders, "top" or "bottom" for horizontal.
		 */
		public native function set labelPosition(value:String):void;
		public native function get labelPosition():String;

		/**
		 * Sets / gets how many decimal points of precisions will be displayed on the labels.
		 */
		public native function set labelPrecision(value:int):void;
		public native function get labelPrecision():int;

		/**
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		public native function set tick(value:Number):void;
		public native function get tick():Number;


	}
}