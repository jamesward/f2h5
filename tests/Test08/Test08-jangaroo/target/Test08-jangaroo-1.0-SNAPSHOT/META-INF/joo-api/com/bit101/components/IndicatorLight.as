/**
 * IndicatorLight.as
 * Keith Peters
 * version 0.9.5
 * 
 * An indicator light that can be turned on, off, or set to flash.
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
	import flash.display.GradientType;
	import flash.display.Shape;
	import flash.events.TimerEvent;
	import flash.geom.Matrix;
	import flash.utils.Timer;
	
	public class IndicatorLight extends com.bit101.components.Component
	{
		protected var _color:uint;
		protected var _lit:Boolean = false;
		protected var _label:Label;
		protected var _labelText:String = "";
		protected var _lite:Shape;
		protected var _timer:Timer;
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this CheckBox.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param color The color of this light.
		 * @param label String containing the label for this component.
		 */
		public native function IndicatorLight(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, color:uint = 0xff0000, label:String = "");

		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates the children for this component
		 */
		override protected native function addChildren():void;
		
		/**
		 * Draw the light.
		 */
		protected native function drawLite():void;
		
		
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal timer handler.
		 * @param event The TimerEvent passed by the system.
		 */
		protected native function onTimer(event:TimerEvent):void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;
		
		/**
		 * Causes the light to flash on and off at the specified interval (milliseconds). A value less than 1 stops the flashing.
		 */
		public native function flash(interval:int = 500):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets or gets whether or not the light is lit.
		 */
		public native function set isLit(value:Boolean):void;
		public native function get isLit():Boolean;
		
		/**
		 * Sets / gets the color of this light (when lit).
		 */
		public native function set color(value:uint):void;
		public native function get color():uint;
		
		/**
		 * Returns whether or not the light is currently flashing.
		 */
		public native function get isFlashing():Boolean;
		
		/**
		 * Sets / gets the label text shown on this component.
		 */
		public native function set label(str:String):void;
		public native function get label():String;
		

	}
}