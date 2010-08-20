joo.classLoader.prepare(/**
 * TextArea.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Text component for displaying multiple lines of text with a scrollbar.
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
	import flash.events.MouseEvent*/
	
	"public class TextArea extends com.bit101.components.Text",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$onChange=$$l+'onChange',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.VScrollBar,flash.events.MouseEvent,flash.events.Event);},
	
		"protected var",{ _scrollbar/*:VScrollBar*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The initial text to display in this component.
		 */
		"public function TextArea",function $TextArea(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, text/*:String=""*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
			this[$super](parent, xpos, ypos, text);
		},
		
		/**
		 * Initilizes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL, $$bound(this,"onMouseWheel"));
		},
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._scrollbar = new com.bit101.components.VScrollBar(this, 0, 0, $$bound(this,"onScrollbarScroll"));
			this._tf.addEventListener(flash.events.Event.SCROLL, $$bound(this,"onTextScroll"));
		},
		
		/**
		 * Changes the thumb percent of the scrollbar based on how much text is shown in the text area.
		 */
		"protected function updateScrollbar",function updateScrollbar()/*:void*/
		{
			var visibleLines/*:int*/ = this._tf.numLines - this._tf.maxScrollV + 1;
			var percent/*:Number*/ = visibleLines / this._tf.numLines;
			this._scrollbar.setSliderParams(1, this._tf.maxScrollV, this._tf.scrollV);
			this._scrollbar.setThumbPercent(percent);
			this._scrollbar.pageSize = visibleLines;
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
			
			this._tf.width = this._width - this._scrollbar.width - 4;
			this._scrollbar.x = this._width - this._scrollbar.width;
			this._scrollbar.height = this._height;
			this._scrollbar.draw();
			this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onTextScrollDelay"));
		},
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Waits one more frame before updating scroll bar.
		 * It seems that numLines and maxScrollV are not valid immediately after changing a TextField's size.
		 */
		"protected function onTextScrollDelay",function onTextScrollDelay(event/*:Event*/)/*:void*/
		{
			this.removeEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onTextScrollDelay"));
			this.updateScrollbar();
		},
		
		/**
		 * Called when the text in the text field is manually changed.
		 */
		"protected override function onChange",function onChange(event/*:Event*/)/*:void*/
		{
			this[$onChange](event);
			this.updateScrollbar();
		},
		
		/**
		 * Called when the scroll bar is moved. Scrolls text accordingly.
		 */
		"protected function onScrollbarScroll",function onScrollbarScroll(event/*:Event*/)/*:void*/
		{
			this._tf.scrollV = Math.round(this._scrollbar.value);
		},
		
		/**
		 * Called when the text is scrolled manually. Updates the position of the scroll bar.
		 */
		"protected function onTextScroll",function onTextScroll(event/*:Event*/)/*:void*/
		{
			this._scrollbar.value = this._tf.scrollV;
			this.updateScrollbar();
		},
		
		/**
		 * Called when the mouse wheel is scrolled over the component.
		 */
		"protected function onMouseWheel",function onMouseWheel(event/*:MouseEvent*/)/*:void*/
		{
			this._scrollbar.value -= event.delta;
		},

        /**
         * Sets/gets whether this component is enabled or not.
         */
        "public override function set enabled",function set$enabled(value/*:Boolean*/)/*:void*/
        {
            this[$enabled] = value;
            this._tf.tabEnabled = value;
        },
	];},[],["com.bit101.components.Text","flash.events.MouseEvent","com.bit101.components.VScrollBar","flash.events.Event","Math"]
);