/**
 * Chart.as
 * Keith Peters
 * version 0.9.5
 * 
 * A base chart component for graphing an array of numeric data.
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

package com.bit101.charts
{
	
	import com.bit101.components.Component;
	import com.bit101.components.Label;
	import com.bit101.components.Panel;
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Shape;
	
	public class Chart extends com.bit101.components.Component
	{
		protected var _data:Array;
		protected var _chartHolder:Shape;
		protected var _maximum:Number = 100;
		protected var _minimum:Number = 0;
		protected var _autoScale:Boolean = true;
		protected var _maxLabel:Label;
		protected var _minLabel:Label;
		protected var _showScaleLabels:Boolean = false;
		protected var _labelPrecision:int = 0;
		protected var _panel:Panel;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values to graph.
		 */
		public native function Chart(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, data:Array=null);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init() : void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren() : void;
		
		/**
		 * Graphs the numeric data in the chart. Override in subclasses.
		 */
		protected native function drawChart():void;
		
		/**
		 * Gets the highest value of the numbers in the data array.
		 */
		protected native function getMaxValue():Number;
		
		/**
		 * Gets the lowest value of the numbers in the data array.
		 */
		protected native function getMinValue():Number;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		public override native function draw() : void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
				
		/**
		 * Sets/gets the data array.
		 */
		public native function set data(value:Array):void;
		public native function get data():Array;

		/**
		 * Sets/gets the maximum value of the graph. Only used if autoScale is false.
		 */
		public native function set maximum(value:Number):void;
		public native function get maximum():Number;

		/**
		 * Sets/gets the minimum value of the graph. Only used if autoScale is false.
		 */
		public native function set minimum(value:Number):void;
		public native function get minimum():Number;

		/**
		 * Sets/gets whether the graph will automatically set its own max and min values based on the data values.
		 */
		public native function set autoScale(value:Boolean):void;
		public native function get autoScale():Boolean;

		/**
		 * Sets/gets whether or not labels for max and min graph values will be shown.
		 * Note: these labels will be to the left of the x position of the chart. Chart position may need adjusting.
		 */
		public native function set showScaleLabels(value:Boolean):void;
		public native function get showScaleLabels():Boolean;

		/**
		 * Sets/gets the amount of decimal places shown in the scale labels.
		 */
		public native function set labelPrecision(value:int):void;
		public native function get labelPrecision():int;

		/**
		 * Sets / gets the size of the grid.
		 */
		public native function set gridSize(value:int):void;
		public native function get gridSize():int;
		
		/**
		 * Sets / gets whether or not the grid will be shown.
		 */
		public native function set showGrid(value:Boolean):void;
		public native function get showGrid():Boolean;
		
		/**
		 * Sets / gets the color of the grid lines.
		 */
		public native function set gridColor(value:uint):void;
		public native function get gridColor():uint;
		

	}
}