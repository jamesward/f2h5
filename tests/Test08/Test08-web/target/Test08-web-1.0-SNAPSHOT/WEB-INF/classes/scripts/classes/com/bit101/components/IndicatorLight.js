joo.classLoader.prepare(/**
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

"package com.bit101.components",/*
{
	import flash.display.DisplayObjectContainer
	import flash.display.GradientType
	import flash.display.Shape
	import flash.events.TimerEvent
	import flash.geom.Matrix
	import flash.utils.Timer*/
	
	"public class IndicatorLight extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.geom.Matrix,flash.display.GradientType,flash.display.Shape,flash.events.TimerEvent,flash.utils.Timer);},
	
		"protected var",{ _color/*:uint*/: undefined},
		"protected var",{ _lit/*:Boolean*/ : false},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _lite/*:Shape*/: undefined},
		"protected var",{ _timer/*:Timer*/: undefined},
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this CheckBox.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param color The color of this light.
		 * @param label String containing the label for this component.
		 */
		"public function IndicatorLight",function $IndicatorLight(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, color/*:uint = 0xff0000*/, label/*:String = ""*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}color = 0xff0000;}label = "";}
			this._color = color;
			this._labelText = label;
			this[$super](parent, xpos, ypos);
		},

		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this._timer = new flash.utils.Timer(500);
			this._timer.addEventListener(flash.events.TimerEvent.TIMER, $$bound(this,"onTimer"));
		},
		
		/**
		 * Creates the children for this component
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._lite = new flash.display.Shape();
			this.addChild(this._lite);
			
			this._label = new com.bit101.components.Label(this, 0, 0, this._labelText);
			this.draw();
		},
		
		/**
		 * Draw the light.
		 */
		"protected function drawLite",function drawLite()/*:void*/
		{
			var colors/*:Array*/;
			if(this._lit)
			{
				colors = [0xffffff, this._color];
			}
			else
			{
				colors = [0xffffff, 0];
			}
			
			this._lite.graphics.clear();
			var matrix/*:Matrix*/ = new flash.geom.Matrix();
			matrix.createGradientBox(10, 10, 0, -2.5, -2.5);
			this._lite.graphics.beginGradientFill(flash.display.GradientType.RADIAL, colors, [1, 1], [0, 255], matrix);
			this._lite.graphics.drawCircle(5, 5, 5);
			this._lite.graphics.endFill();
		},
		
		
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal timer handler.
		 * @param event The TimerEvent passed by the system.
		 */
		"protected function onTimer",function onTimer(event/*:TimerEvent*/)/*:void*/
		{
			this._lit = !this._lit;
			this.draw();
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
			this.drawLite();
			
			this._label.text = this._labelText;
			this._label.x = 12;
			this._label.y = (10 - this._label.height) / 2;
			this._width = this._label.width + 12;
			this._height = 10;
		},
		
		/**
		 * Causes the light to flash on and off at the specified interval (milliseconds). A value less than 1 stops the flashing.
		 */
		"public function flash",function flash(interval/*:int = 500*/)/*:void*/
		{if(arguments.length<1){interval = 500;}
			if(interval < 1)
			{
				this._timer.stop();
				this.isLit = false;
				return;
			}
			this._timer.delay = interval;
			this._timer.start();
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets or gets whether or not the light is lit.
		 */
		"public function set isLit",function set$isLit(value/*:Boolean*/)/*:void*/
		{
			this._timer.stop();
			this._lit = value;
			this.drawLite();
		},
		"public function get isLit",function get$isLit()/*:Boolean*/
		{
			return this._lit;
		},
		
		/**
		 * Sets / gets the color of this light (when lit).
		 */
		"public function set color",function set$color(value/*:uint*/)/*:void*/
		{
			this._color = value;
			this.draw();
		},
		"public function get color",function get$color()/*:uint*/
		{
			return this._color;
		},
		
		/**
		 * Returns whether or not the light is currently flashing.
		 */
		"public function get isFlashing",function get$isFlashing()/*:Boolean*/
		{
			return this._timer.running;
		},
		
		/**
		 * Sets / gets the label text shown on this component.
		 */
		"public function set label",function set$label(str/*:String*/)/*:void*/
		{
			this._labelText = str;
			this.draw();
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},
		

	];},[],["com.bit101.components.Component","flash.utils.Timer","flash.events.TimerEvent","flash.display.Shape","com.bit101.components.Label","flash.geom.Matrix","flash.display.GradientType"]
);