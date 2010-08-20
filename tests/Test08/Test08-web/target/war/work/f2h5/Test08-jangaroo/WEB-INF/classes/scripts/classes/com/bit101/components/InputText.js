joo.classLoader.prepare(/**
 * InputText.as
 * Keith Peters
 * version 0.9.5
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
	import flash.events.Event
	import flash.text.TextField
	import flash.text.TextFieldType
	import flash.text.TextFormat*/
	
	"public class InputText extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,flash.display.Sprite,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _password/*:Boolean*/ : false},
		"protected var",{ _text/*:String*/ : ""},
		"protected var",{ _tf/*:TextField*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this InputText.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The string containing the initial text of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function InputText",function $InputText(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, text/*:String = ""*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}text = "";}defaultHandler = null;}
			this.text = text;
			this[$super](parent, xpos, ypos);
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(100, 16);
		},
		
		/**
		 * Creates and adds child display objects.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this.addChild(this._back);
			
			this._tf = new flash.text.TextField();
			this._tf.embedFonts = com.bit101.components.Style.embedFonts;
			this._tf.selectable = true;
			this._tf.type = flash.text.TextFieldType.INPUT;
			this._tf.defaultTextFormat = new flash.text.TextFormat(com.bit101.components.Style.fontName, com.bit101.components.Style.fontSize, com.bit101.components.Style.INPUT_TEXT);
			this.addChild(this._tf);
			this._tf.addEventListener(flash.events.Event.CHANGE, $$bound(this,"onChange"));
			
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
			
			this._tf.displayAsPassword = this._password;
			
			if(this._text != null)
			{
				this._tf.text = this._text;
			}
			else 
			{
				this._tf.text = "";
			}
			this._tf.width = this._width - 4;
			if(this._tf.text == "")
			{
				this._tf.text = "X";
				this._tf.height = Math.min(this._tf.textHeight + 4, this._height);
				this._tf.text = "";
			}
			else
			{
				this._tf.height = Math.min(this._tf.textHeight + 4, this._height);
			}
			this._tf.x = 2;
			this._tf.y = Math.round(this._height / 2 - this._tf.height / 2);
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal change handler.
		 * @param event The Event passed by the system.
		 */
		"protected function onChange",function onChange(event/*:Event*/)/*:void*/
		{
			this._text = this._tf.text;
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the text shown in this InputText.
		 */
		"public function set text",function set$text(t/*:String*/)/*:void*/
		{
			this._text = t;
			if(this._text == null) this._text = "";
			this.invalidate();
		},
		"public function get text",function get$text()/*:String*/
		{
			return this._text;
		},
		
		/**
		 * Returns a reference to the internal text field in the component.
		 */
		"public function get textField",function get$textField()/*:TextField*/
		{
			return this._tf;
		},
		
		/**
		 * Gets / sets the list of characters that are allowed in this TextInput.
		 */
		"public function set restrict",function set$restrict(str/*:String*/)/*:void*/
		{
			this._tf.restrict = str;
		},
		"public function get restrict",function get$restrict()/*:String*/
		{
			return this._tf.restrict;
		},
		
		/**
		 * Gets / sets the maximum number of characters that can be shown in this InputText.
		 */
		"public function set maxChars",function set$maxChars(max/*:int*/)/*:void*/
		{
			this._tf.maxChars = max;
		},
		"public function get maxChars",function get$maxChars()/*:int*/
		{
			return this._tf.maxChars;
		},
		
		/**
		 * Gets / sets whether or not this input text will show up as password (asterisks).
		 */
		"public function set password",function set$password(b/*:Boolean*/)/*:void*/
		{
			this._password = b;
			this.invalidate();
		},
		"public function get password",function get$password()/*:Boolean*/
		{
			return this._password;
		},

        /**
         * Sets/gets whether this component is enabled or not.
         */
        "public override function set enabled",function set$enabled(value/*:Boolean*/)/*:void*/
        {
            this[$enabled] = value;
            this._tf.tabEnabled = value;
        },

	];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","Math"]
);