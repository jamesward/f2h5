joo.classLoader.prepare(/**
 * ListItem.as
 * Keith Peters
 * version 0.9.5
 * 
 * A single item in a list. 
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
	import flash.events.MouseEvent*/
	
	"public class ListItem extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,String,flash.events.MouseEvent);},
	
		"protected var",{ _data/*:Object*/: undefined},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _defaultColor/*:uint*/ : 0xffffff},
		"protected var",{ _selectedColor/*:uint*/ : 0xdddddd},
		"protected var",{ _rolloverColor/*:uint*/ : 0xeeeeee},
		"protected var",{ _selected/*:Boolean*/: undefined},
		"protected var",{ _mouseOver/*:Boolean*/ : false},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ListItem.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The text to show in this item.
		 */
		"public function ListItem",function $ListItem(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, data/*:Object = null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data = null;}
			this._data = data;
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initilizes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.addEventListener(flash.events.MouseEvent.MOUSE_OVER, $$bound(this,"onMouseOver"));
			this.setSize(100, 20);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/* : void*/
		{
			this[$addChildren]();
			this._label = new com.bit101.components.Label(this, 5, 0);
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"public override function draw",function draw()/* : void*/
		{
			this[$draw]();
			this.graphics.clear();
			if(this._selected)
			{
				this.graphics.beginFill(this._selectedColor);
			}
			else if(this._mouseOver)
			{
				this.graphics.beginFill(this._rolloverColor);
			}
			else
			{
				this.graphics.beginFill(this._defaultColor);
			}
			this.graphics.drawRect(0, 0, this.width, this.height);
			this.graphics.endFill();
			if( is(this._data, String))
			{
				this._label.text = this._data/*as String*/;
			}
			else if( is(this._data.label, String))
			{
				this._label.text = this._data.label;
			}
			else
			{
				this._label.text = this._data.toString();
			}
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the user rolls the mouse over the item. Changes the background color.
		 */
		"protected function onMouseOver",function onMouseOver(event/*:MouseEvent*/)/*:void*/
		{
			this.addEventListener(flash.events.MouseEvent.MOUSE_OUT, $$bound(this,"onMouseOut"));
			this._mouseOver = true;
			this.invalidate();
		},
		
		/**
		 * Called when the user rolls the mouse off the item. Changes the background color.
		 */
		"protected function onMouseOut",function onMouseOut(event/*:MouseEvent*/)/*:void*/
		{
			this.removeEventListener(flash.events.MouseEvent.MOUSE_OUT, $$bound(this,"onMouseOut"));
			this._mouseOver = false;
			this.invalidate();
		},
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the string that appears in this item.
		 */
		"public function set data",function set$data(value/*:Object*/)/*:void*/
		{
			this._data = value;
			this.invalidate();
		},
		"public function get data",function get$data()/*:Object*/
		{
			return this._data;
		},
		
		/**
		 * Sets/gets whether or not this item is selected.
		 */
		"public function set selected",function set$selected(value/*:Boolean*/)/*:void*/
		{
			this._selected = value;
			this.invalidate();
		},
		"public function get selected",function get$selected()/*:Boolean*/
		{
			return this._selected;
		},
		
		/**
		 * Sets/gets the default background color of list items.
		 */
		"public function set defaultColor",function set$defaultColor(value/*:uint*/)/*:void*/
		{
			this._defaultColor = value;
			this.invalidate();
		},
		"public function get defaultColor",function get$defaultColor()/*:uint*/
		{
			return this._defaultColor;
		},
		
		/**
		 * Sets/gets the selected background color of list items.
		 */
		"public function set selectedColor",function set$selectedColor(value/*:uint*/)/*:void*/
		{
			this._selectedColor = value;
			this.invalidate();
		},
		"public function get selectedColor",function get$selectedColor()/*:uint*/
		{
			return this._selectedColor;
		},
		
		/**
		 * Sets/gets the rollover background color of list items.
		 */
		"public function set rolloverColor",function set$rolloverColor(value/*:uint*/)/*:void*/
		{
			this._rolloverColor = value;
			this.invalidate();
		},
		"public function get rolloverColor",function get$rolloverColor()/*:uint*/
		{
			return this._rolloverColor;
		},
		
	];},[],["com.bit101.components.Component","flash.events.MouseEvent","com.bit101.components.Label","String"]
);