/**
 * BarChart.as
 * Keith Peters
 * version 0.9.5
 * 
 * A chart component for graphing an array of numeric data as a bar graph.
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
	import flash.display.DisplayObjectContainer;
	
	public class BarChart extends com.bit101.charts.Chart
	{
		protected var _spacing:Number = 2;
		protected var _barColor:uint = 0x999999;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values to graph.
		 */
		public native function BarChart(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, data:Array=null);
		
		/**
		 * Graphs the numeric data in the chart.
		 */
		protected override native function drawChart():void;

		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the amount of space shown between each bar. If this is too wide, bars may become invisible.
		 */
		public native function set spacing(value:Number):void;
		public native function get spacing():Number;

		/**
		 * Sets/gets the color of the bars.
		 */
		public native function set barColor(value:uint):void;
		public native function get barColor():uint;


	}
}