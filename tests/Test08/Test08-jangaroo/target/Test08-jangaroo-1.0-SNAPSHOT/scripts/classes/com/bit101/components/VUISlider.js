joo.classLoader.prepare(/**
 * VUISlider.as
 * Keith Peters
 * version 0.9.5
 * 
 * A vertical Slider with a label and value label.
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

	"public class VUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$draw=$$l+'draw',$positionLabel=$$l+'positionLabel',$width=$$l+'width';return[function(){joo.classLoader.init(com.bit101.components.VSlider);},
	
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this VUISlider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The string to use as the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component.
		 */
		"public function VUISlider",function $VUISlider(parent/*:DisplayObjectContainer = null*/, x/*:Number = 0*/, y/*:Number = 0*/, label/*:String = ""*/, defaultEventHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}x = 0;}y = 0;}label = "";}defaultEventHandler = null;}
			this._sliderClass = com.bit101.components.VSlider;
			this[$super](parent, x, y, label, defaultEventHandler);
		},
		
		/**
		 * Initializes this component.
		 */
		"protected override function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(20, 146);
		},
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		"override public function draw",function draw()/*:void*/
		{
			this[$draw]();
			this._label.x = this.width / 2 - this._label.width / 2;
			
			this._slider.x = this.width / 2 - this._slider.width / 2;
			this._slider.y = this._label.height + 5;
			this._slider.height = this.height - this._label.height - this._valueLabel.height - 10;
			
			this._valueLabel.x = this.width / 2 - this._valueLabel.width / 2;
			this._valueLabel.y = this._slider.y + this._slider.height + 5;
		},
		
		"override protected function positionLabel",function positionLabel()/*:void*/
		{
			this._valueLabel.x = this.width / 2 - this._valueLabel.width / 2;
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		"override public function get width",function get$width()/*:Number*/
		{
			if(this._label == null) return this._width;
			return Math.max(this._width, this._label.width);
		},
		
	];},[],["com.bit101.components.UISlider","com.bit101.components.VSlider","Math"]
);