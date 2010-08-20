joo.classLoader.prepare(/**
 * LineChart.as
 * Keith Peters
 * version 0.9.5
 * 
 * A chart component for graphing an array of numeric data as a line graph.
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

"package com.bit101.charts",/*
{
	import flash.display.DisplayObjectContainer*/
	
	"public class LineChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$drawChart=$$l+'drawChart';return[
	
		"protected var",{ _lineWidth/*:Number*/ : 1},
		"protected var",{ _lineColor/*:uint*/ : 0x999999},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values to graph.
		 */
		"public function LineChart",function $LineChart(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, data/*:Array=null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
			this[$super](parent, xpos, ypos, data);
		},
		
		/**
		 * Graphs the numeric data in the chart.
		 */
		"protected override function drawChart",function drawChart()/*:void*/
		{
			var border/*:Number*/ = 2;
			var lineWidth/*:Number*/ = (this._width - border) / (this._data.length - 1);
			var chartHeight/*:Number*/ = this._height - border;
			this._chartHolder.x = 0;
			this._chartHolder.y = this._height;
			var xpos/*:Number*/ = border;
			var max/*:Number*/ = this.getMaxValue();
			var min/*:Number*/ = this.getMinValue();
			var scale/*:Number*/ = chartHeight / (max - min);
			this._chartHolder.graphics.lineStyle(this._lineWidth, this._lineColor);
			this._chartHolder.graphics.moveTo(xpos, (this._data[0] - min) * -scale);
			xpos += lineWidth;
			for(var i/*:int*/ = 1; i < this._data.length; i++)
			{
				if(this._data[i] != null)
				{
					this._chartHolder.graphics.lineTo(xpos, (this._data[i] - min) * -scale);
				}
				xpos += lineWidth;
			}
		},

		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		/**
		 * Sets/gets the width of the line in the graph.
		 */
		"public function set lineWidth",function set$lineWidth(value/*:Number*/)/*:void*/
		{
			this._lineWidth = value;
			this.invalidate();
		},
		"public function get lineWidth",function get$lineWidth()/*:Number*/
		{
			return this._lineWidth;
		},

		/**
		 * Sets/gets the color of the line in the graph.
		 */
		"public function set lineColor",function set$lineColor(value/*:uint*/)/*:void*/
		{
			this._lineColor = value;
			this.invalidate();
		},
		"public function get lineColor",function get$lineColor()/*:uint*/
		{
			return this._lineColor;
		},


	];},[],["com.bit101.charts.Chart"]
);