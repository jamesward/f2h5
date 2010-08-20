joo.classLoader.prepare(/**
 * PushButton.as
 * Keith Peters
 * version 0.9.5
 * 
 * A basic button component with a label.
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

	"public class PushButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _face/*:Sprite*/: undefined},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _over/*:Boolean*/ : false},
		"protected var",{ _down/*:Boolean*/ : false},
		"protected var",{ _selected/*:Boolean*/ : false},
		"protected var",{ _toggle/*:Boolean*/ : false},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this PushButton.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The string to use for the initial label of this component.
 		 * @param defaultHandler The event handling function to handle the default event for this component (click in this case).
		 */
		"public function PushButton",function $PushButton(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, label/*:String = ""*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}label = "";}defaultHandler = null;}
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.MouseEvent.CLICK, defaultHandler);
			}
			this.label = label;
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.buttonMode = true;
			this.useHandCursor = true;
			this.setSize(100, 20);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this._back.mouseEnabled = false;
			this.addChild(this._back);
			
			this._face = new flash.display.Sprite();
			this._face.mouseEnabled = false;
			this._face.filters = [this.getShadow(1)];
			this._face.x = 1;
			this._face.y = 1;
			this.addChild(this._face);
			
			this._label = new com.bit101.components.Label();
			this.addChild(this._label);
			
			this.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER, $$bound(this,"onMouseOver"));
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
			this._back.graphics.drawRect(0, 0, this._width, this._height);
			this._back.graphics.endFill();
			
			this._face.graphics.clear();
			this._face.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._face.graphics.drawRect(0, 0, this._width - 2, this._height - 2);
			this._face.graphics.endFill();
			
			this._label.autoSize = true;
			this._label.text = this._labelText;
			if(this._label.width > this._width - 4)
			{
				this._label.autoSize = false;
				this._label.width = this._width - 4;
			}
			else
			{
				this._label.autoSize = true;
			}
			this._label.draw();
			this._label.move(this._width / 2 - this._label.width / 2, this._height / 2 - this._label.height / 2);
			
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal mouseOver handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseOver",function onMouseOver(event/*:MouseEvent*/)/*:void*/
		{
			this._over = true;
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT, $$bound(this,"onMouseOut"));
		},
		
		/**
		 * Internal mouseOut handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseOut",function onMouseOut(event/*:MouseEvent*/)/*:void*/
		{
			this._over = false;
			if(!this._down)
			{
				this._face.filters = [this.getShadow(1)];
			}
			this.removeEventListener(flash.events.MouseEvent.ROLL_OUT, $$bound(this,"onMouseOut"));
		},
		
		/**
		 * Internal mouseOut handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseDown",function onMouseDown(event/*:MouseEvent*/)/*:void*/
		{
			this._down = true;
			this._face.filters = [this.getShadow(1, true)];
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		/**
		 * Internal mouseUp handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			if(this._toggle  && this._over)
			{
				this._selected = !this._selected;
			}
			this._down = this._selected;
			this._face.filters = [this.getShadow(1, this._selected)];
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the label text shown on this Pushbutton.
		 */
		"public function set label",function set$label(str/*:String*/)/*:void*/
		{
			this._labelText = str;
			this.draw();
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},
		
		"public function set selected",function set$selected(value/*:Boolean*/)/*:void*/
		{
			if(!this._toggle)
			{
				value = false;
			}
			
			this._selected = value;
			this._down = this._selected;
			this._face.filters = [this.getShadow(1, this._selected)];
		},
		"public function get selected",function get$selected()/*:Boolean*/
		{
			return this._selected;
		},
		
		"public function set toggle",function set$toggle(value/*:Boolean*/)/*:void*/
		{
			this._toggle = value;
		},
		"public function get toggle",function get$toggle()/*:Boolean*/
		{
			return this._toggle;
		},
		
		
	];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);