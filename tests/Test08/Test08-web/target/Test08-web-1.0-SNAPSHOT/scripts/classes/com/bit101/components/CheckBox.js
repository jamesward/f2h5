joo.classLoader.prepare(/**
 * CheckBox.as
 * Keith Peters
 * version 0.9.5
 * 
 * A basic CheckBox component.
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
	import flash.events.MouseEvent*/
	
	"public class CheckBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _button/*:Sprite*/: undefined},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _selected/*:Boolean*/ : false},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this CheckBox.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label String containing the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (click in this case).
		 */
		"public function CheckBox",function $CheckBox(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, label/*:String = ""*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}label = "";}defaultHandler = null;}
			this._labelText = label;
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.MouseEvent.CLICK, defaultHandler);
			}
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.buttonMode = true;
			this.useHandCursor = true;
			this.mouseChildren = false;
		},
		
		/**
		 * Creates the children for this component
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this.addChild(this._back);
			
			this._button = new flash.display.Sprite();
			this._button.filters = [this.getShadow(1)];
			this._button.visible = false;
			this.addChild(this._button);
			
			this._label = new com.bit101.components.Label(this, 0, 0, this._labelText);
			this.draw();
			
			this.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onClick"));
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
			this._back.graphics.clear();
			this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._back.graphics.drawRect(0, 0, 10, 10);
			this._back.graphics.endFill();
			
			this._button.graphics.clear();
			this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._button.graphics.drawRect(2, 2, 6, 6);
			
			this._label.text = this._labelText;
			this._label.draw();
			this._label.x = 12;
			this._label.y = (10 - this._label.height) / 2;
			this._width = this._label.width + 12;
			this._height = 10;
		},
		
		
		
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal click handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onClick",function onClick(event/*:MouseEvent*/)/*:void*/
		{
			this._selected = !this._selected;
			this._button.visible = this._selected;
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the label text shown on this CheckBox.
		 */
		"public function set label",function set$label(str/*:String*/)/*:void*/
		{
			this._labelText = str;
			this.invalidate();
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},
		
		/**
		 * Sets / gets the selected state of this CheckBox.
		 */
		"public function set selected",function set$selected(s/*:Boolean*/)/*:void*/
		{
			this._selected = s;
			this._button.visible = this._selected;
		},
		"public function get selected",function get$selected()/*:Boolean*/
		{
			return this._selected;
		},

		/**
		 * Sets/gets whether this component will be enabled or not.
		 */
		"public override function set enabled",function set$enabled(value/*:Boolean*/)/*:void*/
		{
			this[$enabled] = value;
			this.mouseChildren = false;
		},

	];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);