joo.classLoader.prepare(/**
 * RadioButton.as
 * Keith Peters
 * version 0.9.5
 * 
 * A basic radio button component, meant to be used in groups, where only one button in the group can be selected.
 * Currently only one group can be created.
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
	
	"public class RadioButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Array,flash.events.MouseEvent,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _button/*:Sprite*/: undefined},
		"protected var",{ _selected/*:Boolean*/ : false},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _groupName/*:String*/ : "defaultRadioGroup"},
		
		"protected static var",{ buttons/*:Array*/: undefined},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this RadioButton.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The string to use for the initial label of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (click in this case).
		 */
		"public function RadioButton",function $RadioButton(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, label/*:String = ""*/, checked/*:Boolean = false*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}label = "";}checked = false;}defaultHandler = null;}
			com.bit101.components.RadioButton.addButton(this);
			this._selected = checked;
			this._labelText = label;
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.MouseEvent.CLICK, defaultHandler);
			}
		},
		
		/**
		 * Static method to add the newly created RadioButton to the list of buttons in the group.
		 * @param rb The RadioButton to add.
		 */
		"protected static function addButton",function addButton(rb/*:RadioButton*/)/*:void*/
		{
			if(com.bit101.components.RadioButton.buttons == null)
			{
				com.bit101.components.RadioButton.buttons = new Array();
			}
			com.bit101.components.RadioButton.buttons.push(rb);
		},
		
		/**
		 * Unselects all RadioButtons in the group, except the one passed.
		 * This could use some rethinking or better naming.
		 * @param rb The RadioButton to remain selected.
		 */
		"protected static function clear",function clear(rb/*:RadioButton*/)/*:void*/
		{
			for(var i/*:uint*/ = 0; i < com.bit101.components.RadioButton.buttons.length; i++)
			{
				if(com.bit101.components.RadioButton.buttons[i] != rb && com.bit101.components.RadioButton.buttons[i].groupName == rb.groupName)
				{
					com.bit101.components.RadioButton.buttons[i].selected = false;
				}
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
			
			this.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onClick"), false, 1);
			this.selected = this._selected;
		},
		
		/**
		 * Creates and adds the child display objects of this component.
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
			
			this.mouseChildren = false;
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
			this._back.graphics.drawCircle(5, 5, 5);
			this._back.graphics.endFill();
			
			this._button.graphics.clear();
			this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._button.graphics.drawCircle(5, 5, 3);
			
			this._label.x = 12;
			this._label.y = (10 - this._label.height) / 2;
			this._label.text = this._labelText;
			this._label.draw();
			this._width = this._label.width + 12;
			this._height = 10;
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal click handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onClick",function onClick(event/*:MouseEvent*/)/*:void*/
		{
			this.selected = true;
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the selected state of this CheckBox.
		 */
		"public function set selected",function set$selected(s/*:Boolean*/)/*:void*/
		{
			this._selected = s;
			this._button.visible = this._selected;
			if(this._selected)
			{
				com.bit101.components.RadioButton.clear(this);
			}
		},
		"public function get selected",function get$selected()/*:Boolean*/
		{
			return this._selected;
		},

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
		 * Sets / gets the group name, which allows groups of RadioButtons to function seperately.
		 */
		"public function get groupName",function get$groupName()/*:String*/
		{
			return this._groupName;
		},

		"public function set groupName",function set$groupName(value/*:String*/)/*:void*/
		{
			this._groupName = value;
		},

		
	];},[],["com.bit101.components.Component","flash.events.MouseEvent","Array","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);