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

class ArcButton extends flash.display.Sprite
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
	public native function ArcButton(arc:Number, outerRadius:Number, iconRadius:Number, innerRadius:Number);
	
	///////////////////////////////////
	// protected methods
	///////////////////////////////////
	
	/**
	 * Draws an arc of the specified color.
	 * @param color The color to draw the arc.
	 */
	protected native function drawArc(color:uint):void;
	
	///////////////////////////////////
	// public methods
	///////////////////////////////////
	
	/**
	 * Sets the icon or label of this button.
	 * @param iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
	 */
	public native function setIcon(iconOrLabel:Object):void;
	
	
	///////////////////////////////////
	// event handlers
	///////////////////////////////////
	
	/**
	 * Called when mouse moves over this button. Draws highlight.
	 */
	protected native function onMouseOver(event:MouseEvent):void;
	
	/**
	 * Called when mouse moves out of this button. Draw base color.
	 */
	protected native function onMouseOut(event:MouseEvent):void;
	
	/**
	 * Called when mouse is released over this button. Dispatches select event.
	 */
	protected native function onMouseUp(event:MouseEvent):void;

	
	///////////////////////////////////
	// getter / setters
	///////////////////////////////////
	
	/**
	 * Sets / gets border color.
	 */
	public native function set borderColor(value:uint):void;
	public native function get borderColor():uint;
	
	/**
	 * Sets / gets base color.
	 */
	public native function set color(value:uint):void;
	public native function get color():uint;
	
	/**
	 * Sets / gets highlight color.
	 */
	public native function set highlightColor(value:uint):void;
	public native function get highlightColor():uint;
	
	/**
	 * Overrides rotation by rotating arc only, allowing label / icon to be unrotated.
	 */
	override public native function set rotation(value:Number):void;
	override public native function get rotation():Number;
	
}
}