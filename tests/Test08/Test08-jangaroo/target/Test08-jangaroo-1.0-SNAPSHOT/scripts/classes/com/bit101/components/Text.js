joo.classLoader.prepare(/**
 * Text.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Text component for displaying multiple lines of text.
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
	import flash.text.TextFieldType
	import flash.text.TextFormat*/
	
	"public class Text extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,com.bit101.components.Panel,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},
	
		"protected var",{ _tf/*:TextField*/: undefined},
		"protected var",{ _text/*:String*/ : ""},
		"protected var",{ _editable/*:Boolean*/ : true},
		"protected var",{ _panel/*:Panel*/: undefined},
		"protected var",{ _selectable/*:Boolean*/ : true},
		"protected var",{ _html/*:Boolean*/ : false},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The initial text to display in this component.
		 */
		"public function Text",function $Text(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, text/*:String = ""*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}text = "";}
			this.text = text;
			this[$super](parent, xpos, ypos);
			this.setSize(200, 100);
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._panel = new com.bit101.components.Panel(this);
			this._panel.color = 0xffffff;
			
			this._tf = new flash.text.TextField();
			this._tf.x = 2;
			this._tf.y = 2;
			this._tf.height = this._height;
			this._tf.embedFonts = com.bit101.components.Style.embedFonts;
			this._tf.multiline = true;
			this._tf.wordWrap = true;
			this._tf.selectable = true;
			this._tf.type = flash.text.TextFieldType.INPUT;
			this._tf.defaultTextFormat = new flash.text.TextFormat(com.bit101.components.Style.fontName, com.bit101.components.Style.fontSize, com.bit101.components.Style.LABEL_TEXT);
			this._tf.addEventListener(flash.events.Event.CHANGE, $$bound(this,"onChange"));			
			this.addChild(this._tf);
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
			
			this._panel.setSize(this._width, this._height);
			this._panel.draw();
			
			this._tf.width = this._width - 4;
			this._tf.height = this._height - 4;
			if(this._html)
			{
				this._tf.htmlText = this._text;
			}
			else
			{
				this._tf.text = this._text;
			}
			if(this._editable)
			{
				this._tf.mouseEnabled = true;
				this._tf.selectable = true;
				this._tf.type = flash.text.TextFieldType.INPUT;
			}
			else
			{
				this._tf.mouseEnabled = this._selectable;
				this._tf.selectable = this._selectable;
				this._tf.type = flash.text.TextFieldType.DYNAMIC;
			}
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the text in the text field is manually changed.
		 */
		"protected function onChange",function onChange(event/*:Event*/)/*:void*/
		{
			this._text = this._tf.text;
			this.dispatchEvent(event);
		},
		
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
		 * Returns a reference to the internal text field in the component.
		 */
		"public function get textField",function get$textField()/*:TextField*/
		{
			return this._tf;
		},
		
		/**
		 * Gets / sets whether or not this text component will be editable.
		 */
		"public function set editable",function set$editable(b/*:Boolean*/)/*:void*/
		{
			this._editable = b;
			this.invalidate();
		},
		"public function get editable",function get$editable()/*:Boolean*/
		{
			return this._editable;
		},
		
		/**
		 * Gets / sets whether or not this text component will be selectable. Only meaningful if editable is false.
		 */
		"public function set selectable",function set$selectable(b/*:Boolean*/)/*:void*/
		{
			this._selectable = b;
			this.invalidate();
		},
		"public function get selectable",function get$selectable()/*:Boolean*/
		{
			return this._selectable;
		},
		
		/**
		 * Gets / sets whether or not text will be rendered as HTML or plain text.
		 */
		"public function set html",function set$html(b/*:Boolean*/)/*:void*/
		{
			this._html = b;
			this.invalidate();
		},
		"public function get html",function get$html()/*:Boolean*/
		{
			return this._html;
		},

        /**
         * Sets/gets whether this component is enabled or not.
         */
        "public override function set enabled",function set$enabled(value/*:Boolean*/)/*:void*/
        {
            this[$enabled] = value;
            this._tf.tabEnabled = value;
        },

	];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","flash.events.Event"]
);