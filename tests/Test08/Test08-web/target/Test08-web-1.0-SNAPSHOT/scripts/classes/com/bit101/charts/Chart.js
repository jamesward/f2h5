joo.classLoader.prepare(/**
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

"package com.bit101.charts",/*
{
	
	import com.bit101.components.Component
	import com.bit101.components.Label
	import com.bit101.components.Panel
	
	import flash.display.DisplayObjectContainer
	import flash.display.Shape*/
	
	"public class Chart extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,com.bit101.components.Panel,Number,flash.display.Shape);},
	
		"protected var",{ _data/*:Array*/: undefined},
		"protected var",{ _chartHolder/*:Shape*/: undefined},
		"protected var",{ _maximum/*:Number*/ : 100},
		"protected var",{ _minimum/*:Number*/ : 0},
		"protected var",{ _autoScale/*:Boolean*/ : true},
		"protected var",{ _maxLabel/*:Label*/: undefined},
		"protected var",{ _minLabel/*:Label*/: undefined},
		"protected var",{ _showScaleLabels/*:Boolean*/ : false},
		"protected var",{ _labelPrecision/*:int*/ : 0},
		"protected var",{ _panel/*:Panel*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values to graph.
		 */
		"public function Chart",function $Chart(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, data/*:Array=null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
			this._data = data;
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.setSize(200, 100);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/* : void*/
		{
			this[$addChildren]();
			this._panel = new com.bit101.components.Panel(this);
			
			this._chartHolder = new flash.display.Shape();
			this._panel.content.addChild(this._chartHolder);
			
			this._maxLabel = new com.bit101.components.Label();
			this._minLabel = new com.bit101.components.Label();
		},
		
		/**
		 * Graphs the numeric data in the chart. Override in subclasses.
		 */
		"protected function drawChart",function drawChart()/*:void*/
		{
		},
		
		/**
		 * Gets the highest value of the numbers in the data array.
		 */
		"protected function getMaxValue",function getMaxValue()/*:Number*/
		{
			if(!this._autoScale) return this._maximum;
			var maxValue/*:Number*/ = Number.NEGATIVE_INFINITY;
			for(var i/*:int*/ = 0; i < this._data.length; i++)
			{
				if(this._data[i] != null)
				{
					maxValue = Math.max(this._data[i], maxValue);
				}
			}
			return maxValue;
		},
		
		/**
		 * Gets the lowest value of the numbers in the data array.
		 */
		"protected function getMinValue",function getMinValue()/*:Number*/
		{
			if(!this._autoScale) return this._minimum;
			var minValue/*:Number*/ = Number.POSITIVE_INFINITY;
			for(var i/*:int*/ = 0; i < this._data.length; i++)
			{
				if(this._data[i] != null)
				{
					minValue = Math.min(this._data[i], minValue);
				}
			}
			return minValue;
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"public override function draw",function draw()/* : void*/
		{
			this[$draw]();
			this._panel.setSize(this.width, this.height);
			this._panel.draw();
			this._chartHolder.graphics.clear();
			if(this._data != null)
			{
				this.drawChart();
			
				var mult/*:Number*/ = Math.pow(10, this._labelPrecision);
				var maxVal/*:Number*/ = Math.round(this.maximum * mult) / mult;
				this._maxLabel.text = maxVal.toString();
				this._maxLabel.draw();
				this._maxLabel.x = -this._maxLabel.width - 5;
				this._maxLabel.y = -this._maxLabel.height * 0.5; 
				
				var minVal/*:Number*/ = Math.round(this.minimum * mult) / mult;
				this._minLabel.text = minVal.toString();
				this._minLabel.draw();
				this._minLabel.x = -this._minLabel.width - 5;
				this._minLabel.y = this.height - this._minLabel.height * 0.5;
			}
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
				
		/**
		 * Sets/gets the data array.
		 */
		"public function set data",function set$data(value/*:Array*/)/*:void*/
		{
			this._data = value;
			this.invalidate();
		},
		"public function get data",function get$data()/*:Array*/
		{
			return this._data;
		},

		/**
		 * Sets/gets the maximum value of the graph. Only used if autoScale is false.
		 */
		"public function set maximum",function set$maximum(value/*:Number*/)/*:void*/
		{
			this._maximum = value;
			this.invalidate();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			if(this._autoScale) return this.getMaxValue();
			return this._maximum;
		},

		/**
		 * Sets/gets the minimum value of the graph. Only used if autoScale is false.
		 */
		"public function set minimum",function set$minimum(value/*:Number*/)/*:void*/
		{
			this._minimum = value;
			this.invalidate();
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			if(this._autoScale) return this.getMinValue();
			return this._minimum;
		},

		/**
		 * Sets/gets whether the graph will automatically set its own max and min values based on the data values.
		 */
		"public function set autoScale",function set$autoScale(value/*:Boolean*/)/*:void*/
		{
			this._autoScale = value;
			this.invalidate();
		},
		"public function get autoScale",function get$autoScale()/*:Boolean*/
		{
			return this._autoScale;
		},

		/**
		 * Sets/gets whether or not labels for max and min graph values will be shown.
		 * Note: these labels will be to the left of the x position of the chart. Chart position may need adjusting.
		 */
		"public function set showScaleLabels",function set$showScaleLabels(value/*:Boolean*/)/*:void*/
		{
			this._showScaleLabels = value;
			if(this._showScaleLabels )
			{
				this.addChild(this._maxLabel);
				this.addChild(this._minLabel);
			}
			else
			{
				if(this.contains(this._maxLabel)) this.removeChild(this._maxLabel);
				if(this.contains(this._minLabel)) this.removeChild(this._minLabel);
			}
		},
		"public function get showScaleLabels",function get$showScaleLabels()/*:Boolean*/
		{
			return this._showScaleLabels;
		},

		/**
		 * Sets/gets the amount of decimal places shown in the scale labels.
		 */
		"public function set labelPrecision",function set$labelPrecision(value/*:int*/)/*:void*/
		{
			this._labelPrecision = value;
			this.invalidate();
		},
		"public function get labelPrecision",function get$labelPrecision()/*:int*/
		{
			return this._labelPrecision;
		},

		/**
		 * Sets / gets the size of the grid.
		 */
		"public function set gridSize",function set$gridSize(value/*:int*/)/*:void*/
		{
			this._panel.gridSize = value;
			this.invalidate();
		},
		"public function get gridSize",function get$gridSize()/*:int*/
		{
			return this._panel.gridSize;
		},
		
		/**
		 * Sets / gets whether or not the grid will be shown.
		 */
		"public function set showGrid",function set$showGrid(value/*:Boolean*/)/*:void*/
		{
			this._panel.showGrid = value;
			this.invalidate();
		},
		"public function get showGrid",function get$showGrid()/*:Boolean*/
		{
			return this._panel.showGrid;
		},
		
		/**
		 * Sets / gets the color of the grid lines.
		 */
		"public function set gridColor",function set$gridColor(value/*:uint*/)/*:void*/
		{
			this._panel.gridColor = value;
			this.invalidate();
		},
		"public function get gridColor",function get$gridColor()/*:uint*/
		{
			return this._panel.gridColor;
		},
		

	];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.display.Shape","com.bit101.components.Label","Number","Math"]
);