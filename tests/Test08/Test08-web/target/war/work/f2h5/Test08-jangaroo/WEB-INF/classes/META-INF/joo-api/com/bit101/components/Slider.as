/**
 * Slider.as
 * Keith Peters
 * version 0.9.5
 * 
 * Abstract base slider class for HSlider and VSlider.
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
	
	public class Slider extends com.bit101.components.Component
	{
		protected var _handle:Sprite;
		protected var _back:Sprite;
		protected var _backClick:Boolean = true;
		protected var _value:Number = 0;
		protected var _max:Number = 100;
		protected var _min:Number = 0;
		protected var _orientation:String;
		protected var _tick:Number = 1;
		
		public static const HORIZONTAL:String = "horizontal";
		public static const VERTICAL:String = "vertical";
		
		/**
		 * Constructor
		 * @param orientation Whether the slider will be horizontal or vertical.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		public native function Slider(orientation:String = com.bit101.components.Slider.HORIZONTAL, parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, defaultHandler:Function = null);
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		override protected native function addChildren():void;
		
		/**
		 * Draws the back of the slider.
		 */
		protected native function drawBack():void;
		
		/**
		 * Draws the handle of the slider.
		 */
		protected native function drawHandle():void;
		
		/**
		 * Adjusts value to be within minimum and maximum.
		 */
		protected native function correctValue():void;
		
		/**
		 * Adjusts position of handle when value, maximum or minimum have changed.
		 * TODO: Should also be called when slider is resized.
		 */
		protected native function positionHandle():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
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
		 * Handler called when user clicks the background of the slider, causing the handle to move to that point. Only active if backClick is true.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onBackClick(event:MouseEvent):void;
		
		/**
		 * Internal mouseDown handler. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onDrag(event:MouseEvent):void;
		
		/**
		 * Internal mouseUp handler. Stops dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onDrop(event:MouseEvent):void;
		
		/**
		 * Internal mouseMove handler for when the handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onSlide(event:MouseEvent):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets whether or not a click on the background of the slider will move the handler to that position.
		 */
		public native function set backClick(b:Boolean):void;
		public native function get backClick():Boolean;
		
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
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		public native function set tick(t:Number):void;
		public native function get tick():Number;
		
	}
}