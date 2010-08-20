joo.classLoader.prepare(/**
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
 
"package com.bit101.components",/*
{
	import flash.display.DisplayObjectContainer
	import flash.events.Event*/

	"public class UISlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.events.Event);},
	
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _valueLabel/*:Label*/: undefined},
		"protected var",{ _slider/*:Slider*/: undefined},
		"protected var",{ _precision/*:int*/ : 1},
		"protected var",{ _sliderClass/*:Class*/: undefined},
		"protected var",{ _labelText/*:String*/: undefined},
		"protected var",{ _tick/*:Number*/ : 1},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this UISlider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The initial string to display as this component's label.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function UISlider",function $UISlider(parent/*:DisplayObjectContainer = null*/, x/*:Number = 0*/, y/*:Number = 0*/, label/*:String = ""*/, defaultEventHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}x = 0;}y = 0;}label = "";}defaultEventHandler = null;}
			this._labelText = label;
			this[$super](parent, x, y);
			if(defaultEventHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultEventHandler);
			}
			this.formatValueLabel();
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._label = new com.bit101.components.Label(this, 0, 0);
			this._slider = new this._sliderClass(this, 0, 0, $$bound(this,"onSliderChange"));
			this._valueLabel = new com.bit101.components.Label(this);
		},
		
		/**
		 * Formats the value of the slider to a string based on the current level of precision.
		 */
		"protected function formatValueLabel",function formatValueLabel()/*:void*/
		{
			var mult/*:Number*/ = Math.pow(10, this._precision);
			var val/*:String*/ = (Math.round(this._slider.value * mult) / mult).toString();
			var parts/*:Array*/ = val.split(".");
			if(parts[1] == null)
			{ 
				if(this._precision > 0)
				{
					val += ".";
				}
				for(var i/*:uint*/ = 0; i < this._precision; i++)
				{
					val += "0";
				}
			}
			else if(parts[1].length < this._precision)
			{
				for(i = 0; i < this._precision - parts[1].length; i++)
				{
					val += "0";
				}
			}
			this._valueLabel.text = val;
			this.positionLabel();
		},
		
		/**
		 * Positions the label when it has changed. Implemented in child classes.
		 */
		"protected function positionLabel",function positionLabel()/*:void*/
		{
			
		},
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of this component.
		 */
		"override public function draw",function draw()/*:void*/
		{
			this[$draw]();
			this._label.text = this._labelText;
			this._label.draw();
			this.formatValueLabel();
		},
		
		/**
		 * Convenience method to set the three main parameters in one shot.
		 * @param min The minimum value of the slider.
		 * @param max The maximum value of the slider.
		 * @param value The value of the slider.
		 */
		"public function setSliderParams",function setSliderParams(min/*:Number*/, max/*:Number*/, value/*:Number*/)/*:void*/
		{
			this._slider.setSliderParams(min, max, value);
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Handler called when the slider's value changes.
		 * @param event The Event passed by the slider.
		 */
		"protected function onSliderChange",function onSliderChange(event/*:Event*/)/*:void*/
		{
			this.formatValueLabel();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this slider.
		 */
		"public function set value",function set$value(v/*:Number*/)/*:void*/
		{
			this._slider.value = v;
			this.formatValueLabel();
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._slider.value;
		},
		
		/**
		 * Gets / sets the maximum value of this slider.
		 */
		"public function set maximum",function set$maximum(m/*:Number*/)/*:void*/
		{
			this._slider.maximum = m;
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._slider.maximum;
		},
		
		/**
		 * Gets / sets the minimum value of this slider.
		 */
		"public function set minimum",function set$minimum(m/*:Number*/)/*:void*/
		{
			this._slider.minimum = m;
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._slider.minimum;
		},
		
		/**
		 * Gets / sets the number of decimals to format the value label. Does not affect the actual value of the slider, just the number shown.
		 */
		"public function set labelPrecision",function set$labelPrecision(decimals/*:int*/)/*:void*/
		{
			this._precision = decimals;
		},
		"public function get labelPrecision",function get$labelPrecision()/*:int*/
		{
			return this._precision;
		},
		
		/**
		 * Gets / sets the text shown in this component's label.
		 */
		"public function set label",function set$label(str/*:String*/)/*:void*/
		{
			this._labelText = str;
//			invalidate();
			this.draw();
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},
		
		/**
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		"public function set tick",function set$tick(t/*:Number*/)/*:void*/
		{
			this._tick = t;
			this._slider.tick = this._tick;
		},
		"public function get tick",function get$tick()/*:Number*/
		{
			return this._tick;
		},
		

	];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.Label","Math"]
);