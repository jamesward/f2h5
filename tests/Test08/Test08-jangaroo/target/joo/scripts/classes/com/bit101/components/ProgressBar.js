joo.classLoader.prepare(/**
 * ProgressBar.as
 * Keith Peters
 * version 0.9.5
 * 
 * A progress bar component for showing a changing value in relation to a total.
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
	import flash.display.Sprite*/
	
	"public class ProgressBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _bar/*:Sprite*/: undefined},
		"protected var",{ _value/*:Number*/ : 0},
		"protected var",{ _max/*:Number*/ : 1},

		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ProgressBar.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function ProgressBar",function $ProgressBar(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}
			this[$super](parent, xpos, ypos);
		},
		
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(100, 10);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this.addChild(this._back);
			
			this._bar = new flash.display.Sprite();
			this._bar.x = 1;
			this._bar.y = 1;
			this._bar.filters = [this.getShadow(1)];
			this.addChild(this._bar);
		},
		
		/**
		 * Updates the size of the progress bar based on the current value.
		 */
		"protected function update",function update()/*:void*/
		{
			this._bar.scaleX = this._value / this._max;
		},

		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"override public function draw",function draw()/*:void*/
		{
			this[$draw]();
			this._back.graphics.clear();
			this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._back.graphics.drawRect(0, 0, this._width, this._height);
			this._back.graphics.endFill();
			
			this._bar.graphics.clear();
			this._bar.graphics.beginFill(com.bit101.components.Style.PROGRESS_BAR);
			this._bar.graphics.drawRect(0, 0, this._width - 2, this._height - 2);
			this._bar.graphics.endFill();
			this.update();
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the maximum value of the ProgressBar.
		 */
		"public function set maximum",function set$maximum(m/*:Number*/)/*:void*/
		{
			this._max = m;
			this._value = Math.min(this._value, this._max);
			this.update();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._max;
		},
		
		/**
		 * Gets / sets the current value of the ProgressBar.
		 */
		"public function set value",function set$value(v/*:Number*/)/*:void*/
		{
			this._value = Math.min(v, this._max);
			this.update();
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._value;
		},
		
	];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style","Math"]
);