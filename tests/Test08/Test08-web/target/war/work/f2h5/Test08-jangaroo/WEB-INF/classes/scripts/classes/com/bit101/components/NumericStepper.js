joo.classLoader.prepare(/**
 * NumericStepper.as
 * Keith Peters
 * version 0.9.5
 * 
 * A component allowing for entering a numeric value with the keyboard, or by pressing up/down buttons.
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
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.events.TimerEvent
	import flash.utils.Timer*/
	
	"public class NumericStepper extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.InputText,com.bit101.components.PushButton,Number,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,Error,flash.utils.Timer);},
	
		"protected const",{ DELAY_TIME/*:int*/ : 500},
		"protected const",{ UP/*:String*/ : "up"},
        "protected const",{ DOWN/*:String*/ : "down"},
		"protected var",{ _minusBtn/*:PushButton*/: undefined},

        "protected var",{ _repeatTime/*:int*/ : 100},
        "protected var",{ _plusBtn/*:PushButton*/: undefined},
		"protected var",{ _valueText/*:InputText*/: undefined},
		"protected var",{ _value/*:Number*/ : 0},
		"protected var",{ _step/*:Number*/ : 1},
		"protected var",{ _labelPrecision/*:int*/ : 1},
		"protected var",{ _maximum/*:Number*/ :function(){return( Number.POSITIVE_INFINITY);}},
		"protected var",{ _minimum/*:Number*/ :function(){return( Number.NEGATIVE_INFINITY);}},
		"protected var",{ _delayTimer/*:Timer*/: undefined},
		"protected var",{ _repeatTimer/*:Timer*/: undefined},
		"protected var",{ _direction/*:String*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function NumericStepper",function $NumericStepper(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler = null;}
			this[$super](parent, xpos, ypos);this._maximum=this._maximum();this._minimum=this._minimum();
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(80, 16);
			this._delayTimer = new flash.utils.Timer(this.DELAY_TIME, 1);
			this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE, $$bound(this,"onDelayComplete"));
			this._repeatTimer = new flash.utils.Timer(this._repeatTime);
			this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER, $$bound(this,"onRepeat"));
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/*:void*/
		{
			this._valueText = new com.bit101.components.InputText(this, 0, 0, "0", $$bound(this,"onValueTextChange"));
			this._valueText.restrict = "-0123456789.";
			this._minusBtn = new com.bit101.components.PushButton(this, 0, 0, "-");
			this._minusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMinus"));
			this._minusBtn.setSize(16, 16);
			this._plusBtn = new com.bit101.components.PushButton(this, 0, 0, "+");
			this._plusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onPlus"));
			this._plusBtn.setSize(16, 16);
		},
		
		"protected function increment",function increment()/*:void*/
		{
			if(this._value + this._step <= this._maximum)
			{
				this._value += this._step;
				this.invalidate();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},
		
		"protected function decrement",function decrement()/*:void*/
		{
			if(this._value - this._step >= this._minimum)
			{
				this._value -= this._step;
				this.invalidate();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"public override function draw",function draw()/*:void*/
		{
			this._plusBtn.x = this._width - 16;
			this._minusBtn.x = this._width - 32;
			this._valueText.text = (Math.round(this._value * Math.pow(10, this._labelPrecision)) / Math.pow(10, this._labelPrecision)).toString();
			this._valueText.width = this._width - 32;
			this._valueText.draw();
		},
		
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the minus button is pressed. Decrements the value by the step amount.
		 */
		"protected function onMinus",function onMinus(event/*:MouseEvent*/)/*:void*/
		{
			this.decrement();
			this._direction = this.DOWN;
			this._delayTimer.start();
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		/**
		 * Called when the plus button is pressed. Increments the value by the step amount.
		 */
		"protected function onPlus",function onPlus(event/*:MouseEvent*/)/*:void*/
		{
			this.increment();
			this._direction = this.UP;
			this._delayTimer.start();
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this._delayTimer.stop();
			this._repeatTimer.stop();
		},
		
		/**
		 * Called when the value is changed manually.
		 */
		"protected function onValueTextChange",function onValueTextChange(event/*:Event*/)/*:void*/
		{
			var newVal/*:Number*/ =/* Number*/(this._valueText.text);
			if(newVal <= this._maximum && newVal >= this._minimum)
			{
				this._value = newVal;
				this.invalidate();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},

		"protected function onDelayComplete",function onDelayComplete(event/*:TimerEvent*/)/*:void*/
		{
			this._repeatTimer.start();
		},

		"protected function onRepeat",function onRepeat(event/*:TimerEvent*/)/*:void*/
		{
			if(this._direction == this.UP)
			{
				this.increment();
			}
			else
			{
				this.decrement();
			}
		},
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the current value of this component.
		 */
		"public function set value",function set$value(val/*:Number*/)/*:void*/
		{
			if(val <= this._maximum && val >= this._minimum)
			{
				this._value = val;
				this.invalidate();
			}
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._value;
		},

		/**
		 * Sets / gets the amount the value will change when the up or down button is pressed. Must be zero or positive.
		 */
		"public function set step",function set$step(value/*:Number*/)/*:void*/
		{
			if(value < 0) 
			{
				throw new Error("NumericStepper step must be positive.");
			}
			this._step = value;
		},
		"public function get step",function get$step()/*:Number*/
		{
			return this._step;
		},

		/**
		 * Sets / gets how many decimal points of precision will be shown.
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
		 * Sets / gets the maximum value for this component.
		 */
		"public function set maximum",function set$maximum(value/*:Number*/)/*:void*/
		{
			this._maximum = value;
			if(this._value > this._maximum)
			{
				this._value = this._maximum;
				this.invalidate();
			}
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._maximum;
		},

		/**
		 * Sets / gets the maximum value for this component.
		 */
		"public function set minimum",function set$minimum(value/*:Number*/)/*:void*/
		{
			this._minimum = value;
			if(this._value < this._minimum)
			{
				this._value = this._minimum;
				this.invalidate();
			}
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._minimum;
		},

        /**
         * Gets/sets the update rate that the stepper will change its value if a button is held down.
         */
        "public function get repeatTime",function get$repeatTime()/*:int*/
        {
            return this._repeatTime;
        },

        "public function set repeatTime",function set$repeatTime(value/*:int*/)/*:void*/
        {
            // shouldn't be any need to set it faster than 10 ms. guard against negative.
            this._repeatTime = Math.max(value, 10);
            this._repeatTimer.delay = this._repeatTime;
        },
    ];},[],["com.bit101.components.Component","Number","flash.events.Event","flash.utils.Timer","flash.events.TimerEvent","com.bit101.components.InputText","com.bit101.components.PushButton","flash.events.MouseEvent","Math","Error"]
);