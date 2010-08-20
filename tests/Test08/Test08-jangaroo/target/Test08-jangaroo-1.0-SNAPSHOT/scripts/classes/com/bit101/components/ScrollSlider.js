joo.classLoader.prepare(/**
 * ScrollSlider.as
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
import flash.events.Event
import flash.events.MouseEvent
import flash.geom.Rectangle
import com.bit101.components.Slider
import com.bit101.components.Style*/

/**
 * Helper class for the slider portion of the scroll bar.
 */
"class ScrollSlider extends com.bit101.components.Slider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$drawHandle=$$l+'drawHandle',$positionHandle=$$l+'positionHandle',$onBackClick=$$l+'onBackClick',$onDrag=$$l+'onDrag',$onSlide=$$l+'onSlide';return[function(){joo.classLoader.init(flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

	"protected var",{ _thumbPercent/*:Number*/ : 1.0},
	"protected var",{ _pageSize/*:int*/ : 1},
	
	/**
	 * Constructor
	 * @param orientation Whether this is a vertical or horizontal slider.
	 * @param parent The parent DisplayObjectContainer on which to add this Slider.
	 * @param xpos The x position to place this component.
	 * @param ypos The y position to place this component.
	 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
	 */
	"public function ScrollSlider",function $ScrollSlider(orientation/*:String*/, parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, defaultHandler/*:Function = null*/)
	{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler = null;}
		this[$super](orientation, parent, xpos, ypos);
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
		this.setSliderParams(1, 1, 0);
		this.backClick = true;
	},
	
	/**
	 * Draws the handle of the slider.
	 */
	"override protected function drawHandle",function drawHandle()/* : void*/
	{
		var size/*:Number*/;
		this._handle.graphics.clear();
		if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
		{
			size = Math.round(this._width * this._thumbPercent);
			size = Math.max(this._height, size);
			this._handle.graphics.beginFill(0, 0);
			this._handle.graphics.drawRect(0, 0, size, this._height);
			this._handle.graphics.endFill();
			this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._handle.graphics.drawRect(1, 1, size - 2, this._height - 2);
		}
		else
		{
			size = Math.round(this._height * this._thumbPercent);
			size = Math.max(this._width, size);
			this._handle.graphics.beginFill(0, 0);
			this._handle.graphics.drawRect(0, 0, this._width  - 2, size);
			this._handle.graphics.endFill();
			this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._handle.graphics.drawRect(1, 1, this._width - 2, size - 2);
		}
		this._handle.graphics.endFill();
		this.positionHandle();
	},
	
	/**
	 * Adjusts position of handle when value, maximum or minimum have changed.
	 * TODO: Should also be called when slider is resized.
	 */
	"protected override function positionHandle",function positionHandle()/*:void*/
	{
		var range/*:Number*/;
		if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
		{
			range = this.width - this._handle.width;
			this._handle.x = (this._value - this._min) / (this._max - this._min) * range;
		}
		else
		{
			range = this.height - this._handle.height;
			this._handle.y = (this._value - this._min) / (this._max - this._min) * range;
		}
	},
	
	
	
	///////////////////////////////////
	// public methods
	///////////////////////////////////
	
	/**
	 * Sets the percentage of the size of the thumb button.
	 */
	"public function setThumbPercent",function setThumbPercent(value/*:Number*/)/*:void*/
	{
		this._thumbPercent = Math.min(value, 1.0);
		this.invalidate();
	},
	
	
	
	
	
	///////////////////////////////////
	// event handlers
	///////////////////////////////////
	
	/**
	 * Handler called when user clicks the background of the slider, causing the handle to move to that point. Only active if backClick is true.
	 * @param event The MouseEvent passed by the system.
	 */
	"protected override function onBackClick",function onBackClick(event/*:MouseEvent*/)/*:void*/
	{
		if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
		{
			if(this.mouseX < this._handle.x)
			{
				if(this._max > this._min)
				{
					this._value -= this._pageSize;
				}
				else
				{
					this._value += this._pageSize;
				}
				this.correctValue();
			}
			else
			{
				if(this._max > this._min)
				{
					this._value += this._pageSize;
				}
				else
				{
					this._value -= this._pageSize;
				}
				this.correctValue();
			}
			this.positionHandle();
		}
		else
		{
			if(this.mouseY < this._handle.y)
			{
				if(this._max > this._min)
				{
					this._value -= this._pageSize;
				}
				else
				{
					this._value += this._pageSize;
				}
				this.correctValue();
			}
			else
			{
				if(this._max > this._min)
				{
					this._value += this._pageSize;
				}
				else
				{
					this._value -= this._pageSize;
				}
				this.correctValue();
			}
			this.positionHandle();
		}
		this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		
	},
	
	/**
	 * Internal mouseDown handler. Starts dragging the handle.
	 * @param event The MouseEvent passed by the system.
	 */
	"protected override function onDrag",function onDrag(event/*:MouseEvent*/)/*:void*/
	{
		this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
		this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onSlide"));
		if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
		{
			this._handle.startDrag(false, new flash.geom.Rectangle(0, 0, this._width - this._handle.width, 0));
		}
		else
		{
			this._handle.startDrag(false, new flash.geom.Rectangle(0, 0, 0, this._height - this._handle.height));
		}
	},
	
	/**
	 * Internal mouseMove handler for when the handle is being moved.
	 * @param event The MouseEvent passed by the system.
	 */
	"protected override function onSlide",function onSlide(event/*:MouseEvent*/)/*:void*/
	{
		var oldValue/*:Number*/ = this._value;
		if(this._orientation == com.bit101.components.Slider.HORIZONTAL)
		{
			if(this._width == this._handle.width)
			{
				this._value = this._min;
			}
			else
			{
				this._value = this._handle.x / (this._width - this._handle.width) * (this._max - this._min) + this._min;
			}
		}
		else
		{
			if(this._height == this._handle.height)
			{
				this._value = this._min;
			}
			else
			{
				this._value = this._handle.y / (this._height - this._handle.height) * (this._max - this._min) + this._min;
			}
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
	 * Sets / gets the amount the value will change when the back is clicked.
	 */
	"public function set pageSize",function set$pageSize(value/*:int*/)/*:void*/
	{
		this._pageSize = value;
		this.invalidate();
	},
	"public function get pageSize",function get$pageSize()/*:int*/
	{
		return this._pageSize;
	},
];},[],["com.bit101.components.Slider","flash.events.Event","Math","com.bit101.components.Style","flash.events.MouseEvent","flash.geom.Rectangle"]
);