joo.classLoader.prepare(/**
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
 
"package com.bit101.components",/*
{
import flash.display.DisplayObject
import flash.display.Sprite
import flash.events.Event
import flash.events.MouseEvent
import flash.utils.getDefinitionByName
import flash.display.Shape
import com.bit101.components.Label*/

"class ArcButton extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$rotation=$$l+'rotation';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.display.DisplayObject,String,Class,Math,flash.events.MouseEvent,flash.display.Shape,flash.events.Event);},

	"public var",{ id/*:int*/: undefined},
	
	"protected var",{ _arc/*:Number*/: undefined},
	"protected var",{ _bg/*:Shape*/: undefined},
	"protected var",{ _borderColor/*:uint*/ : 0xcccccc},
	"protected var",{ _color/*:uint*/ : 0xffffff},
	"protected var",{ _highlightColor/*:uint*/ : 0xeeeeee},
	"protected var",{ _icon/*:DisplayObject*/: undefined},
	"protected var",{ _iconHolder/*:Sprite*/: undefined},
	"protected var",{ _iconRadius/*:Number*/: undefined},
	"protected var",{ _innerRadius/*:Number*/: undefined},
	"protected var",{ _outerRadius/*:Number*/: undefined},
	
	/**
	 * Constructor.
	 * @param arc The radians of the arc to draw.
	 * @param outerRadius The outer radius of the arc. 
	 * @param innerRadius The inner radius of the arc.
	 */
	"public function ArcButton",function $ArcButton(arc/*:Number*/, outerRadius/*:Number*/, iconRadius/*:Number*/, innerRadius/*:Number*/)
	{this[$super]();
		this._arc = arc;
		this._outerRadius = outerRadius;
		this._iconRadius = iconRadius;
		this._innerRadius = innerRadius;
		
		this._bg = new flash.display.Shape();
		this.addChild(this._bg);
		
		this._iconHolder = new flash.display.Sprite();
		this.addChild(this._iconHolder);
		
		this.drawArc(0xffffff);
		this.addEventListener(flash.events.MouseEvent.MOUSE_OVER, $$bound(this,"onMouseOver"));
		this.addEventListener(flash.events.MouseEvent.MOUSE_OUT, $$bound(this,"onMouseOut"));
		this.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
	},
	
	///////////////////////////////////
	// protected methods
	///////////////////////////////////
	
	/**
	 * Draws an arc of the specified color.
	 * @param color The color to draw the arc.
	 */
	"protected function drawArc",function drawArc(color/*:uint*/)/*:void*/
	{
		this._bg.graphics.clear();
		this._bg.graphics.lineStyle(2, this._borderColor);
		this._bg.graphics.beginFill(color);
		this._bg.graphics.moveTo(this._innerRadius, 0);
		this._bg.graphics.lineTo(this._outerRadius, 0);
		for(var i/*:Number*/ = 0; i < this._arc; i += .05)
		{
			this._bg.graphics.lineTo(Math.cos(i) * this._outerRadius, Math.sin(i) * this._outerRadius);
		}
		this._bg.graphics.lineTo(Math.cos(this._arc) * this._outerRadius, Math.sin(this._arc) * this._outerRadius);
		this._bg.graphics.lineTo(Math.cos(this._arc) * this._innerRadius, Math.sin(this._arc) * this._innerRadius);
		for(i = this._arc; i > 0; i -= .05)
		{
			this._bg.graphics.lineTo(Math.cos(i) * this._innerRadius, Math.sin(i) * this._innerRadius);
		}
		this._bg.graphics.lineTo(this._innerRadius, 0);
		
		this.graphics.endFill();
	},
	
	///////////////////////////////////
	// public methods
	///////////////////////////////////
	
	/**
	 * Sets the icon or label of this button.
	 * @param iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
	 */
	"public function setIcon",function setIcon(iconOrLabel/*:Object*/)/*:void*/
	{
		if(iconOrLabel == null) return;
		while(this._iconHolder.numChildren > 0) this._iconHolder.removeChildAt(0);
		if( is(iconOrLabel, Class))
		{
			this._icon = new iconOrLabel()/*as DisplayObject*/;
		}
		else if( is(iconOrLabel, flash.display.DisplayObject))
		{
			this._icon = iconOrLabel/*as DisplayObject*/;
		}
		else if( is(iconOrLabel, String))
		{
			this._icon = new com.bit101.components.Label(null, 0, 0, iconOrLabel/*as String*/);
			(this._icon/*as Label*/).draw();
		}
		if(this._icon != null)
		{
			var angle/*:Number*/ = this._bg.rotation * Math.PI / 180;
			this._icon.x = Math.round(-this._icon.width / 2);
			this._icon.y = Math.round(-this._icon.height / 2);
			this._iconHolder.addChild(this._icon);
			this._iconHolder.x = Math.round(Math.cos(angle + this._arc / 2) * this._iconRadius);
			this._iconHolder.y = Math.round(Math.sin(angle + this._arc / 2) * this._iconRadius);
		}
	},
	
	
	///////////////////////////////////
	// event handlers
	///////////////////////////////////
	
	/**
	 * Called when mouse moves over this button. Draws highlight.
	 */
	"protected function onMouseOver",function onMouseOver(event/*:MouseEvent*/)/*:void*/
	{
		this.drawArc(this._highlightColor);
	},
	
	/**
	 * Called when mouse moves out of this button. Draw base color.
	 */
	"protected function onMouseOut",function onMouseOut(event/*:MouseEvent*/)/*:void*/
	{
		this.drawArc(this._color);
	},
	
	/**
	 * Called when mouse is released over this button. Dispatches select event.
	 */
	"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
	{
		this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
	},

	
	///////////////////////////////////
	// getter / setters
	///////////////////////////////////
	
	/**
	 * Sets / gets border color.
	 */
	"public function set borderColor",function set$borderColor(value/*:uint*/)/*:void*/
	{
		this._borderColor = value;
		this.drawArc(this._color);
	},
	"public function get borderColor",function get$borderColor()/*:uint*/
	{
		return this._borderColor;
	},
	
	/**
	 * Sets / gets base color.
	 */
	"public function set color",function set$color(value/*:uint*/)/*:void*/
	{
		this._color = value;
		this.drawArc(this._color);
	},
	"public function get color",function get$color()/*:uint*/
	{
		return this._color;
	},
	
	/**
	 * Sets / gets highlight color.
	 */
	"public function set highlightColor",function set$highlightColor(value/*:uint*/)/*:void*/
	{
		this._highlightColor = value;
	},
	"public function get highlightColor",function get$highlightColor()/*:uint*/
	{
		return this._highlightColor;
	},
	
	/**
	 * Overrides rotation by rotating arc only, allowing label / icon to be unrotated.
	 */
	"override public function set rotation",function set$rotation(value/*:Number*/)/*:void*/
	{
		this._bg.rotation = value;
	},
	"override public function get rotation",function get$rotation()/*:Number*/
	{
		return this._bg.rotation;
	},
	
];},[],["flash.display.Sprite","flash.display.Shape","flash.events.MouseEvent","Math","Class","flash.display.DisplayObject","String","com.bit101.components.Label","flash.events.Event"]
);