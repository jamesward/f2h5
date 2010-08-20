joo.classLoader.prepare(/**
 * HUISlider.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Horizontal slider with a label and a value label.
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

	"public class HUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$positionLabel=$$l+'positionLabel',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.HSlider);},
	
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this HUISlider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The string to use as the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component.
		 */
		"public function HUISlider",function $HUISlider(parent/*:DisplayObjectContainer = null*/, x/*:Number = 0*/, y/*:Number = 0*/, label/*:String = ""*/, defaultEventHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}x = 0;}y = 0;}label = "";}defaultEventHandler = null;}
			this._sliderClass = com.bit101.components.HSlider;
			this[$super](parent, x, y, label, defaultEventHandler);
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(200, 18);
		},
		
		/**
		 * Centers the label when label text is changed.
		 */
		"override protected function positionLabel",function positionLabel()/*:void*/
		{
			this._valueLabel.x = this._slider.x + this._slider.width + 5;
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
			this._slider.x = this._label.width + 5;
			this._slider.y = this.height / 2 - this._slider.height / 2;
			this._slider.width = this.width - this._label.width - 50 - 10;
			
			this._valueLabel.x = this._slider.x + this._slider.width + 5;
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
	];},[],["com.bit101.components.UISlider","com.bit101.components.HSlider"]
);