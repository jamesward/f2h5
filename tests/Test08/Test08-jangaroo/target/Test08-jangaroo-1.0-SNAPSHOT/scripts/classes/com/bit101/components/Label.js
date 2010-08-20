joo.classLoader.prepare(/**
 * Label.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Label component for displaying a single line of text.
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
	import flash.text.TextField
	import flash.text.TextFieldAutoSize
	import flash.text.TextFormat*/
	
	"public class Label extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.text.TextFieldAutoSize,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},
	
		"protected var",{ _autoSize/*:Boolean*/ : true},
		"protected var",{ _text/*:String*/ : ""},
		"protected var",{ _tf/*:TextField*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The string to use as the initial text in this component.
		 */
		"public function Label",function $Label(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, text/*:String = ""*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}text = "";}
			this.text = text;
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.mouseEnabled = false;
			this.mouseChildren = false;
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._height = 18;
			this._tf = new flash.text.TextField();
			this._tf.height = this._height;
			this._tf.embedFonts = com.bit101.components.Style.embedFonts;
			this._tf.selectable = false;
			this._tf.mouseEnabled = false;
			this._tf.defaultTextFormat = new flash.text.TextFormat(com.bit101.components.Style.fontName, com.bit101.components.Style.fontSize, com.bit101.components.Style.LABEL_TEXT);
			this._tf.text = this._text;			
			this.addChild(this._tf);
			this.draw();
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
			this._tf.text = this._text;
			if(this._autoSize)
			{
				this._tf.autoSize = flash.text.TextFieldAutoSize.LEFT;
				this._width = this._tf.width;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
			}
			else
			{
				this._tf.autoSize = flash.text.TextFieldAutoSize.NONE;
				this._tf.width = this._width;
			}
			this._height = this._tf.height = 18;
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the text of this Label.
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
		 * Gets / sets whether or not this Label will autosize.
		 */
		"public function set autoSize",function set$autoSize(b/*:Boolean*/)/*:void*/
		{
			this._autoSize = b;
		},
		"public function get autoSize",function get$autoSize()/*:Boolean*/
		{
			return this._autoSize;
		},
		
		/**
		 * Gets the internal TextField of the label if you need to do further customization of it.
		 */
		"public function get textField",function get$textField()/*:TextField*/
		{
			return this._tf;
		},
	];},[],["com.bit101.components.Component","flash.text.TextField","com.bit101.components.Style","flash.text.TextFormat","flash.text.TextFieldAutoSize","flash.events.Event"]
);