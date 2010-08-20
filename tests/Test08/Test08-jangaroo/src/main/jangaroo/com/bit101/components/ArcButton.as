/**
 * ArcButton.as
 * Keith Peters
 * version 0.9.5
 * 
 * A radial menu that pops up around the mouse.
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
 * 
 * 
 * 
 * Components with text make use of the font PF Ronda Seven by Yuusuke Kamiyamane
 * This is a free font obtained from http://www.dafont.com/pf-ronda-seven.font
 */
 
package com.bit101.components
{
import flash.display.DisplayObject;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.utils.getDefinitionByName;
import flash.display.Shape;
import com.bit101.components.Label;

class ArcButton extends Sprite
{
	public var id:int;
	
	protected var _arc:Number;
	protected var _bg:Shape;
	protected var _borderColor:uint = 0xcccccc;
	protected var _color:uint = 0xffffff;
	protected var _highlightColor:uint = 0xeeeeee;
	protected var _icon:DisplayObject;
	protected var _iconHolder:Sprite;
	protected var _iconRadius:Number;
	protected var _innerRadius:Number;
	protected var _outerRadius:Number;
	
	/**
	 * Constructor.
	 * @param arc The radians of the arc to draw.
	 * @param outerRadius The outer radius of the arc. 
	 * @param innerRadius The inner radius of the arc.
	 */
	public function ArcButton(arc:Number, outerRadius:Number, iconRadius:Number, innerRadius:Number)
	{
		_arc = arc;
		_outerRadius = outerRadius;
		_iconRadius = iconRadius;
		_innerRadius = innerRadius;
		
		_bg = new Shape();
		addChild(_bg);
		
		_iconHolder = new Sprite();
		addChild(_iconHolder);
		
		drawArc(0xffffff);
		addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
		addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
		addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
	}
	
	///////////////////////////////////
	// protected methods
	///////////////////////////////////
	
	/**
	 * Draws an arc of the specified color.
	 * @param color The color to draw the arc.
	 */
	protected function drawArc(color:uint):void
	{
		_bg.graphics.clear();
		_bg.graphics.lineStyle(2, _borderColor);
		_bg.graphics.beginFill(color);
		_bg.graphics.moveTo(_innerRadius, 0);
		_bg.graphics.lineTo(_outerRadius, 0);
		for(var i:Number = 0; i < _arc; i += .05)
		{
			_bg.graphics.lineTo(Math.cos(i) * _outerRadius, Math.sin(i) * _outerRadius);
		}
		_bg.graphics.lineTo(Math.cos(_arc) * _outerRadius, Math.sin(_arc) * _outerRadius);
		_bg.graphics.lineTo(Math.cos(_arc) * _innerRadius, Math.sin(_arc) * _innerRadius);
		for(i = _arc; i > 0; i -= .05)
		{
			_bg.graphics.lineTo(Math.cos(i) * _innerRadius, Math.sin(i) * _innerRadius);
		}
		_bg.graphics.lineTo(_innerRadius, 0);
		
		graphics.endFill();
	}
	
	///////////////////////////////////
	// public methods
	///////////////////////////////////
	
	/**
	 * Sets the icon or label of this button.
	 * @param iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
	 */
	public function setIcon(iconOrLabel:Object):void
	{
		if(iconOrLabel == null) return;
		while(_iconHolder.numChildren > 0) _iconHolder.removeChildAt(0);
		if(iconOrLabel is Class)
		{
			_icon = new iconOrLabel() as DisplayObject;
		}
		else if(iconOrLabel is DisplayObject)
		{
			_icon = iconOrLabel as DisplayObject;
		}
		else if(iconOrLabel is String)
		{
			_icon = new Label(null, 0, 0, iconOrLabel as String);
			(_icon as Label).draw();
		}
		if(_icon != null)
		{
			var angle:Number = _bg.rotation * Math.PI / 180;
			_icon.x = Math.round(-_icon.width / 2);
			_icon.y = Math.round(-_icon.height / 2);
			_iconHolder.addChild(_icon);
			_iconHolder.x = Math.round(Math.cos(angle + _arc / 2) * _iconRadius);
			_iconHolder.y = Math.round(Math.sin(angle + _arc / 2) * _iconRadius);
		}
	}
	
	
	///////////////////////////////////
	// event handlers
	///////////////////////////////////
	
	/**
	 * Called when mouse moves over this button. Draws highlight.
	 */
	protected function onMouseOver(event:MouseEvent):void
	{
		drawArc(_highlightColor);
	}
	
	/**
	 * Called when mouse moves out of this button. Draw base color.
	 */
	protected function onMouseOut(event:MouseEvent):void
	{
		drawArc(_color);
	}
	
	/**
	 * Called when mouse is released over this button. Dispatches select event.
	 */
	protected function onMouseUp(event:MouseEvent):void
	{
		dispatchEvent(new Event(Event.SELECT));
	}

	
	///////////////////////////////////
	// getter / setters
	///////////////////////////////////
	
	/**
	 * Sets / gets border color.
	 */
	public function set borderColor(value:uint):void
	{
		_borderColor = value;
		drawArc(_color);
	}
	public function get borderColor():uint
	{
		return _borderColor;
	}
	
	/**
	 * Sets / gets base color.
	 */
	public function set color(value:uint):void
	{
		_color = value;
		drawArc(_color);
	}
	public function get color():uint
	{
		return _color;
	}
	
	/**
	 * Sets / gets highlight color.
	 */
	public function set highlightColor(value:uint):void
	{
		_highlightColor = value;
	}
	public function get highlightColor():uint
	{
		return _highlightColor;
	}
	
	/**
	 * Overrides rotation by rotating arc only, allowing label / icon to be unrotated.
	 */
	override public function set rotation(value:Number):void
	{
		_bg.rotation = value;
	}
	override public function get rotation():Number
	{
		return _bg.rotation;
	}
	
}
}
