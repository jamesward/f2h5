/**
 * Meter.as
 * Keith Peters
 * version 0.9.5
 * 
 * A meter component similar to a voltage meter, with a dial and a needle that indicates a value.
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
	import flash.filters.DropShadowFilter;
	
	public class Meter extends com.bit101.components.Component
	{
		protected var _damp:Number = .8;
		protected var _dial:Sprite;
		protected var _label:Label;
		protected var _labelText:String;
		protected var _maximum:Number = 1.0;
		protected var _maxLabel:Label;
		protected var _minimum:Number = 0.0;
		protected var _minLabel:Label;
		protected var _needle:Sprite;
		protected var _needleMask:Sprite;
		protected var _showValues:Boolean = true;
		protected var _targetRotation:Number = 0;
		protected var _value:Number = 0.0;
		protected var _velocity:Number = 0;
		
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Meter.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The string to use as the initial text in this component.
		 */
		public native function Meter(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, text:String = "");
		
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
		
		/**
		 * Sets the size of the component. Adjusts height to be 1/2 width.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		override public native function setSize(w:Number, h:Number):void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the background of the component.
		 */
		protected native function drawBackground():void;
		
		/**
		 * Draws the dial.
		 */
		protected native function drawDial(startAngle:Number, endAngle:Number):void;
		
		/**
		 * Draws the tick marks on the dial.
		 */
		protected native function drawTicks(startAngle:Number, endAngle:Number):void;
		
		/**
		 * Draws the needle.
		 */
		protected native function drawNeedle():void;
		
		/**
		 * Updates the target rotation of the needle and starts an enterframe handler to spring it to that point.
		 */
		protected native function update():void;
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Handles the enterFrame event to spring the needle to the target rotation.
		 */
		protected native function onEnterFrame(event:Event):void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the maximum value for the meter.
		 */
		public native function set maximum(value:Number):void;
		public native function get maximum():Number;
		
		/**
		 * Gets / sets the minimum value for the meter.
		 */
		public native function set minimum(value:Number):void;
		public native function get minimum():Number;
		
		/**
		 * Gets / sets the current value for the meter.
		 */
		public native function set value(val:Number):void;
		public native function get value():Number;
		
		/**
		 * Gets / sets the label shown on the meter.
		 */
		public native function set label(value:String):void;
		public native function get label():String;
		
		/**
		 * Gets / sets whether or not value labels will be shown for max and min values.
		 */
		public native function set showValues(value:Boolean):void;
		public native function get showValues():Boolean;

		/**
		 * Gets / sets the damping value for the meter.
		 */
		public native function set damp(value:Number):void;
		public native function get damp():Number;

	}
}