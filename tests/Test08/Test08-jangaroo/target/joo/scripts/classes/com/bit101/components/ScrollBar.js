joo.classLoader.prepare(/**
 * ScrollBar.as
 * Keith Peters
 * version 0.9.5
 * 
 * Base class for HScrollBar and VScrollBar
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
	import flash.display.Shape
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.events.TimerEvent
	import flash.utils.Timer*/

	"public class ScrollBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$init=$$l+'init',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.display.Shape,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,flash.utils.Timer,com.bit101.components.Style,com.bit101.components.Slider,com.bit101.components.ScrollSlider);},
	
		"protected const",{ DELAY_TIME/*:int*/ : 500},
		"protected const",{ REPEAT_TIME/*:int*/ : 100}, 
		"protected const",{ UP/*:String*/ : "up"},
		"protected const",{ DOWN/*:String*/ : "down"},
		
		"protected var",{ _upButton/*:PushButton*/: undefined},
		"protected var",{ _downButton/*:PushButton*/: undefined},
		"protected var",{ _scrollSlider/*:ScrollSlider*/: undefined},
		"protected var",{ _orientation/*:String*/: undefined},
		"protected var",{ _lineSize/*:int*/ : 1},
		"protected var",{ _delayTimer/*:Timer*/: undefined},
		"protected var",{ _repeatTimer/*:Timer*/: undefined},
		"protected var",{ _direction/*:String*/: undefined},
		"protected var",{ _shouldRepeat/*:Boolean*/ : false},
		
		/**
		 * Constructor
		 * @param orientation Whether this is a vertical or horizontal slider.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function ScrollBar",function $ScrollBar(orientation/*:String*/, parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler = null;}
			this._orientation = orientation;
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._scrollSlider = new com.bit101.components.ScrollSlider(this._orientation, this, 0, 10, $$bound(this,"onChange"));
			this._upButton = new com.bit101.components.PushButton(this, 0, 0, "");
			this._upButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onUpClick"));
			this._upButton.setSize(10, 10);
			var upArrow/*:Shape*/ = new flash.display.Shape();
			this._upButton.addChild(upArrow);
			
			this._downButton = new com.bit101.components.PushButton(this, 0, 0, "");
			this._downButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onDownClick"));
			this._downButton.setSize(10, 10);
			var downArrow/*:Shape*/ = new flash.display.Shape();
			this._downButton.addChild(downArrow);
			
			if(this._orientation == com.bit101.components.Slider.VERTICAL)
			{
				upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW, 0.5);
				upArrow.graphics.moveTo(5, 3);
				upArrow.graphics.lineTo(7, 6);
				upArrow.graphics.lineTo(3, 6);
				upArrow.graphics.endFill();
				
				downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW, 0.5);
				downArrow.graphics.moveTo(5, 7);
				downArrow.graphics.lineTo(7, 4);
				downArrow.graphics.lineTo(3, 4);
				downArrow.graphics.endFill();
			}
			else
			{
				upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW, 0.5);
				upArrow.graphics.moveTo(3, 5);
				upArrow.graphics.lineTo(6, 7);
				upArrow.graphics.lineTo(6, 3);
				upArrow.graphics.endFill();
				
				downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW, 0.5);
				downArrow.graphics.moveTo(7, 5);
				downArrow.graphics.lineTo(4, 7);
				downArrow.graphics.lineTo(4, 3);
				downArrow.graphics.endFill();
			}

			
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/*:void*/
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
			this._delayTimer = new flash.utils.Timer(this.DELAY_TIME, 1);
			this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE, $$bound(this,"onDelayComplete"));
			this._repeatTimer = new flash.utils.Timer(this.REPEAT_TIME);
			this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER, $$bound(this,"onRepeat"));
		},
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Convenience method to set the three main parameters in one shot.
		 * @param min The minimum value of the slider.
		 * @param max The maximum value of the slider.
		 * @param value The value of the slider.
		 */
		"public function setSliderParams",function setSliderParams(min/*:Number*/, max/*:Number*/, value/*:Number*/)/*:void*/
		{
			this._scrollSlider.setSliderParams(min, max, value);
		},
		
		/**
		 * Sets the percentage of the size of the thumb button.
		 */
		"public function setThumbPercent",function setThumbPercent(value/*:Number*/)/*:void*/
		{
			this._scrollSlider.setThumbPercent(value);
		},
		
		/**
		 * Draws the visual ui of the component.
		 */
		"override public function draw",function draw()/*:void*/
		{
			this[$draw]();
			if(this._orientation == com.bit101.components.Slider.VERTICAL)
			{
				this._scrollSlider.x = 0;
				this._scrollSlider.y = 10;
				this._scrollSlider.width = 10;
				this._scrollSlider.height = this._height - 20;
				this._downButton.x = 0;
				this._downButton.y = this._height - 10;
			}
			else
			{
				this._scrollSlider.x = 10;
				this._scrollSlider.y = 0;
				this._scrollSlider.width = this._width - 20;
				this._scrollSlider.height = this._height;
				this._downButton.x = this._width - 10;
				this._downButton.y = 0;
			}
			this._scrollSlider.draw();
		},

		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this scroll bar.
		 */
		"public function set value",function set$value(v/*:Number*/)/*:void*/
		{
			this._scrollSlider.value = v;
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._scrollSlider.value;
		},
		
		/**
		 * Sets / gets the minimum value of this scroll bar.
		 */
		"public function set minimum",function set$minimum(v/*:Number*/)/*:void*/
		{
			this._scrollSlider.minimum = v;
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._scrollSlider.minimum;
		},
		
		/**
		 * Sets / gets the maximum value of this scroll bar.
		 */
		"public function set maximum",function set$maximum(v/*:Number*/)/*:void*/
		{
			this._scrollSlider.maximum = v;
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._scrollSlider.maximum;
		},
		
		/**
		 * Sets / gets the amount the value will change when up or down buttons are pressed.
		 */
		"public function set lineSize",function set$lineSize(value/*:int*/)/*:void*/
		{
			this._lineSize = value;
		},
		"public function get lineSize",function get$lineSize()/*:int*/
		{
			return this._lineSize;
		},
		
		/**
		 * Sets / gets the amount the value will change when the back is clicked.
		 */
		"public function set pageSize",function set$pageSize(value/*:int*/)/*:void*/
		{
			this._scrollSlider.pageSize = value;
			this.invalidate();
		},
		"public function get pageSize",function get$pageSize()/*:int*/
		{
			return this._scrollSlider.pageSize;
		},
		

		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		"protected function onUpClick",function onUpClick(event/*:MouseEvent*/)/*:void*/
		{
			this.goUp();
			this._shouldRepeat = true;
			this._direction = this.UP;
			this._delayTimer.start();
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
				
		"protected function goUp",function goUp()/*:void*/
		{
			this._scrollSlider.value -= this._lineSize;
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		
		"protected function onDownClick",function onDownClick(event/*:MouseEvent*/)/*:void*/
		{
			this.goDown();
			this._shouldRepeat = true;
			this._direction = this.DOWN;
			this._delayTimer.start();
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		"protected function goDown",function goDown()/*:void*/
		{
			this._scrollSlider.value += this._lineSize;
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this._delayTimer.stop();
			this._repeatTimer.stop();
			this._shouldRepeat = false;
		},
		
		"protected function onChange",function onChange(event/*:Event*/)/*:void*/
		{
			this.dispatchEvent(event);
		},
		
		"protected function onDelayComplete",function onDelayComplete(event/*:TimerEvent*/)/*:void*/
		{
			if(this._shouldRepeat)
			{
				this._repeatTimer.start();
			}
		},
		
		"protected function onRepeat",function onRepeat(event/*:TimerEvent*/)/*:void*/
		{
			if(this._direction == this.UP)
			{
				this.goUp();
			}
			else
			{
				this.goDown();
			}
		},
		



	];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.ScrollSlider","com.bit101.components.PushButton","flash.events.MouseEvent","flash.display.Shape","com.bit101.components.Slider","com.bit101.components.Style","flash.utils.Timer","flash.events.TimerEvent"]
);