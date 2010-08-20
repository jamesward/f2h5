/**
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

package com.bit101.components
{

import flash.display.DisplayObjectContainer;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Rectangle;
import com.bit101.components.Slider;
import com.bit101.components.Style;

/**
 * Helper class for the slider portion of the scroll bar.
 */
class ScrollSlider extends Slider
{
	protected var _thumbPercent:Number = 1.0;
	protected var _pageSize:int = 1;
	
	/**
	 * Constructor
	 * @param orientation Whether this is a vertical or horizontal slider.
	 * @param parent The parent DisplayObjectContainer on which to add this Slider.
	 * @param xpos The x position to place this component.
	 * @param ypos The y position to place this component.
	 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
	 */
	public function ScrollSlider(orientation:String, parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, defaultHandler:Function = null)
	{
		super(orientation, parent, xpos, ypos);
		if(defaultHandler != null)
		{
			addEventListener(Event.CHANGE, defaultHandler);
		}
	}
	
	/**
	 * Initializes the component.
	 */
	protected override function init():void
	{
		super.init();
		setSliderParams(1, 1, 0);
		backClick = true;
	}
	
	/**
	 * Draws the handle of the slider.
	 */
	override protected function drawHandle() : void
	{
		var size:Number;
		_handle.graphics.clear();
		if(_orientation == HORIZONTAL)
		{
			size = Math.round(_width * _thumbPercent);
			size = Math.max(_height, size);
			_handle.graphics.beginFill(0, 0);
			_handle.graphics.drawRect(0, 0, size, _height);
			_handle.graphics.endFill();
			_handle.graphics.beginFill(Style.BUTTON_FACE);
			_handle.graphics.drawRect(1, 1, size - 2, _height - 2);
		}
		else
		{
			size = Math.round(_height * _thumbPercent);
			size = Math.max(_width, size);
			_handle.graphics.beginFill(0, 0);
			_handle.graphics.drawRect(0, 0, _width  - 2, size);
			_handle.graphics.endFill();
			_handle.graphics.beginFill(Style.BUTTON_FACE);
			_handle.graphics.drawRect(1, 1, _width - 2, size - 2);
		}
		_handle.graphics.endFill();
		positionHandle();
	}
	
	/**
	 * Adjusts position of handle when value, maximum or minimum have changed.
	 * TODO: Should also be called when slider is resized.
	 */
	protected override function positionHandle():void
	{
		var range:Number;
		if(_orientation == HORIZONTAL)
		{
			range = width - _handle.width;
			_handle.x = (_value - _min) / (_max - _min) * range;
		}
		else
		{
			range = height - _handle.height;
			_handle.y = (_value - _min) / (_max - _min) * range;
		}
	}
	
	
	
	///////////////////////////////////
	// public methods
	///////////////////////////////////
	
	/**
	 * Sets the percentage of the size of the thumb button.
	 */
	public function setThumbPercent(value:Number):void
	{
		_thumbPercent = Math.min(value, 1.0);
		invalidate();
	}
	
	
	
	
	
	///////////////////////////////////
	// event handlers
	///////////////////////////////////
	
	/**
	 * Handler called when user clicks the background of the slider, causing the handle to move to that point. Only active if backClick is true.
	 * @param event The MouseEvent passed by the system.
	 */
	protected override function onBackClick(event:MouseEvent):void
	{
		if(_orientation == HORIZONTAL)
		{
			if(mouseX < _handle.x)
			{
				if(_max > _min)
				{
					_value -= _pageSize;
				}
				else
				{
					_value += _pageSize;
				}
				correctValue();
			}
			else
			{
				if(_max > _min)
				{
					_value += _pageSize;
				}
				else
				{
					_value -= _pageSize;
				}
				correctValue();
			}
			positionHandle();
		}
		else
		{
			if(mouseY < _handle.y)
			{
				if(_max > _min)
				{
					_value -= _pageSize;
				}
				else
				{
					_value += _pageSize;
				}
				correctValue();
			}
			else
			{
				if(_max > _min)
				{
					_value += _pageSize;
				}
				else
				{
					_value -= _pageSize;
				}
				correctValue();
			}
			positionHandle();
		}
		dispatchEvent(new Event(Event.CHANGE));
		
	}
	
	/**
	 * Internal mouseDown handler. Starts dragging the handle.
	 * @param event The MouseEvent passed by the system.
	 */
	protected override function onDrag(event:MouseEvent):void
	{
		stage.addEventListener(MouseEvent.MOUSE_UP, onDrop);
		stage.addEventListener(MouseEvent.MOUSE_MOVE, onSlide);
		if(_orientation == HORIZONTAL)
		{
			_handle.startDrag(false, new Rectangle(0, 0, _width - _handle.width, 0));
		}
		else
		{
			_handle.startDrag(false, new Rectangle(0, 0, 0, _height - _handle.height));
		}
	}
	
	/**
	 * Internal mouseMove handler for when the handle is being moved.
	 * @param event The MouseEvent passed by the system.
	 */
	protected override function onSlide(event:MouseEvent):void
	{
		var oldValue:Number = _value;
		if(_orientation == HORIZONTAL)
		{
			if(_width == _handle.width)
			{
				_value = _min;
			}
			else
			{
				_value = _handle.x / (_width - _handle.width) * (_max - _min) + _min;
			}
		}
		else
		{
			if(_height == _handle.height)
			{
				_value = _min;
			}
			else
			{
				_value = _handle.y / (_height - _handle.height) * (_max - _min) + _min;
			}
		}
		if(_value != oldValue)
		{
			dispatchEvent(new Event(Event.CHANGE));
		}
	}
	
	
	
	
	
	///////////////////////////////////
	// getter/setters
	///////////////////////////////////
		
	/**
	 * Sets / gets the amount the value will change when the back is clicked.
	 */
	public function set pageSize(value:int):void
	{
		_pageSize = value;
		invalidate();
	}
	public function get pageSize():int
	{
		return _pageSize;
	}
}
}
