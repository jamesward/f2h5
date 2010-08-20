joo.classLoader.prepare(/**
 * Slider.as
 * Keith Peters
 * version 0.9.5
 * 
 * Abstract base slider class for HSlider and VSlider.
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
	import flash.display.Sprite
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.geom.Rectangle*/
	
	"public class Slider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},
	
		"protected var",{ _handle/*:Sprite*/: undefined},
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _backClick/*:Boolean*/ : true},
		"protected var",{ _value/*:Number*/ : 0},
		"protected var",{ _max/*:Number*/ : 100},
		"protected var",{ _min/*:Number*/ : 0},
		"protected var",{ _orientation/*:String*/: undefined},
		"protected var",{ _tick/*:Number*/ : 1},
		
		"public static const",{ HORIZONTAL/*:String*/ : "horizontal"},
		"public static const",{ VERTICAL/*:String*/ : "vertical"},
		
		/**
		 * Constructor
		 * @param orientation Whether the slider will be horizontal or vertical.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function Slider",function $Slider(orientation/*:String = com.bit101.components.Slider.HORIZONTAL*/, parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){orientation = com.bit101.components.Slider.HORIZONTAL;}parent = null;}xpos = 0;}ypos =  0;}defaultHandler = null;}
			this._orientation = orientation;
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();

			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				this.setSize(100, 10);
			}
			else
			{
				this.setSize(10, 100);
			}
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this.addChild(this._back);
			
			this._handle = new flash.display.Sprite();
			this._handle.filters = [this.getShadow(1)];
			this._handle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onDrag"));
			this._handle.buttonMode = true;
			this._handle.useHandCursor = true;
			this.addChild(this._handle);
		},
		
		/**
		 * Draws the back of the slider.
		 */
		"protected function drawBack",function drawBack()/*:void*/
		{
			this._back.graphics.clear();
			this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._back.graphics.drawRect(0, 0, this._width, this._height);
			this._back.graphics.endFill();

			if(this._backClick)
			{
				this._back.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onBackClick"));
			}
			else
			{
				this._back.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onBackClick"));
			}
		},
		
		/**
		 * Draws the handle of the slider.
		 */
		"protected function drawHandle",function drawHandle()/*:void*/
		{	
			this._handle.graphics.clear();
			this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				this._handle.graphics.drawRect(1, 1, this._height - 2, this._height - 2);
			}
			else
			{
				this._handle.graphics.drawRect(1, 1, this._width - 2, this._width - 2);
			}
			this._handle.graphics.endFill();
			this.positionHandle();
		},
		
		/**
		 * Adjusts value to be within minimum and maximum.
		 */
		"protected function correctValue",function correctValue()/*:void*/
		{
			if(this._max > this._min)
			{
				this._value = Math.min(this._value, this._max);
				this._value = Math.max(this._value, this._min);
			}
			else
			{
				this._value = Math.max(this._value, this._max);
				this._value = Math.min(this._value, this._min);
			}
		},
		
		/**
		 * Adjusts position of handle when value, maximum or minimum have changed.
		 * TODO: Should also be called when slider is resized.
		 */
		"protected function positionHandle",function positionHandle()/*:void*/
		{
			var range/*:Number*/;
			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				range = this._width - this._height;
				this._handle.x = (this._value - this._min) / (this._max - this._min) * range;
			}
			else
			{
				range = this._height - this._width;
				this._handle.y = this._height - this._width - (this._value - this._min) / (this._max - this._min) * range;
			}
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
			this.drawBack();
			this.drawHandle();
		},
		
		/**
		 * Convenience method to set the three main parameters in one shot.
		 * @param min The minimum value of the slider.
		 * @param max The maximum value of the slider.
		 * @param value The value of the slider.
		 */
		"public function setSliderParams",function setSliderParams(min/*:Number*/, max/*:Number*/, value/*:Number*/)/*:void*/
		{
			this.minimum = min;
			this.maximum = max;
			this.value = value;
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Handler called when user clicks the background of the slider, causing the handle to move to that point. Only active if backClick is true.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onBackClick",function onBackClick(event/*:MouseEvent*/)/*:void*/
		{
			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				this._handle.x = this.mouseX - this._height / 2;
				this._handle.x = Math.max(this._handle.x, 0);
				this._handle.x = Math.min(this._handle.x, this._width - this._height);
				this._value = this._handle.x / (this.width - this._height) * (this._max - this._min) + this._min;
			}
			else
			{
				this._handle.y = this.mouseY - this._width / 2;
				this._handle.y = Math.max(this._handle.y, 0);
				this._handle.y = Math.min(this._handle.y, this._height - this._width);
				this._value = (this._height - this._width - this._handle.y) / (this.height - this._width) * (this._max - this._min) + this._min;
			}
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			
		},
		
		/**
		 * Internal mouseDown handler. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onDrag",function onDrag(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onSlide"));
			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				this._handle.startDrag(false, new flash.geom.Rectangle(0, 0, this._width - this._height, 0));
			}
			else
			{
				this._handle.startDrag(false, new flash.geom.Rectangle(0, 0, 0, this._height - this._width));
			}
		},
		
		/**
		 * Internal mouseUp handler. Stops dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onDrop",function onDrop(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onSlide"));
			this.stopDrag();
		},
		
		/**
		 * Internal mouseMove handler for when the handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onSlide",function onSlide(event/*:MouseEvent*/)/*:void*/
		{
			var oldValue/*:Number*/ = this._value;
			if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
			{
				this._value = this._handle.x / (this.width - this._height) * (this._max - this._min) + this._min;
			}
			else
			{
				this._value = (this._height - this._width - this._handle.y) / (this.height - this._width) * (this._max - this._min) + this._min;
			}
			if(this._value != oldValue)
			{
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets whether or not a click on the background of the slider will move the handler to that position.
		 */
		"public function set backClick",function set$backClick(b/*:Boolean*/)/*:void*/
		{
			this._backClick = b;
			this.invalidate();
		},
		"public function get backClick",function get$backClick()/*:Boolean*/
		{
			return this._backClick;
		},
		
		/**
		 * Sets / gets the current value of this slider.
		 */
		"public function set value",function set$value(v/*:Number*/)/*:void*/
		{
			this._value = v;
			this.correctValue();
			this.positionHandle();
			
		},
		"public function get value",function get$value()/*:Number*/
		{
			return Math.round(this._value / this._tick) * this._tick;
		},
		
		/**
		 * Gets / sets the maximum value of this slider.
		 */
		"public function set maximum",function set$maximum(m/*:Number*/)/*:void*/
		{
			this._max = m;
			this.correctValue();
			this.positionHandle();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._max;
		},
		
		/**
		 * Gets / sets the minimum value of this slider.
		 */
		"public function set minimum",function set$minimum(m/*:Number*/)/*:void*/
		{
			this._min = m;
			this.correctValue();
			this.positionHandle();
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._min;
		},
		
		/**
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		"public function set tick",function set$tick(t/*:Number*/)/*:void*/
		{
			this._tick = t;
		},
		"public function get tick",function get$tick()/*:Number*/
		{
			return this._tick;
		},
		
	];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);