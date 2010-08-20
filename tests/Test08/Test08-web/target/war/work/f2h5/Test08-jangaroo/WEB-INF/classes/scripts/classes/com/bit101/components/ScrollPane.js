joo.classLoader.prepare(/**
 * ScrollPane.as
 * Keith Peters
 * version 0.9.5
 * 
 * A panel with scroll bars for scrolling content that is larger.
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
	import flash.display.Shape
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.geom.Rectangle*/
	
	"public class ScrollPane extends com.bit101.components.Panel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.geom.Rectangle,com.bit101.components.VScrollBar,flash.display.Shape,com.bit101.components.HScrollBar,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},
	
		"protected var",{ _vScrollbar/*:VScrollBar*/: undefined},
		"protected var",{ _hScrollbar/*:HScrollBar*/: undefined},
		"protected var",{ _corner/*:Shape*/: undefined},
		"protected var",{ _dragContent/*:Boolean*/ : true},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ScrollPane.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function ScrollPane",function $ScrollPane(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes this component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.addEventListener(flash.events.Event.RESIZE, $$bound(this,"onResize"));
			this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
			this._background.useHandCursor = true;
			this._background.buttonMode = true;
			this.setSize(100, 100);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._vScrollbar = new com.bit101.components.VScrollBar(this, this.width - 10, 0, $$bound(this,"onScroll"));
			this._hScrollbar = new com.bit101.components.HScrollBar(this, 0, this.height - 10, $$bound(this,"onScroll"));
			this._corner = new flash.display.Shape();
			this._corner.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._corner.graphics.drawRect(0, 0, 10, 10);
			this._corner.graphics.endFill();
			this.addChild(this._corner);
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
			this._vScrollbar.x = this.width - 10;
			this._vScrollbar.height = this.height - 10;
			this._hScrollbar.y = this.height - 10;
			this._hScrollbar.width = this.width - 10;
			
			this._vScrollbar.setThumbPercent((this._height - 10) / this.content.height);
			this._vScrollbar.maximum = Math.max(0, this.content.height - this._height + 10);
			this._vScrollbar.pageSize = this._height - 10;
			
			this._hScrollbar.setThumbPercent((this._width - 10) / this.content.width);
			this._hScrollbar.maximum = Math.max(0, this.content.width - this._width + 10);
			this._hScrollbar.pageSize = this._width - 10;
			
			this._corner.x = this.width - 10;
			this._corner.y = this.height - 10;
			this.content.x = -this._hScrollbar.value;
			this.content.y = -this._vScrollbar.value;
		},
		
		/**
		 * Updates the scrollbars when content is changed. Needs to be done manually.
		 */
		"public function update",function update()/*:void*/
		{
			this.invalidate();
		},
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when either scroll bar is scrolled.
		 */
		"protected function onScroll",function onScroll(event/*:Event*/)/*:void*/
		{
			this.content.x = -this._hScrollbar.value;
			this.content.y = -this._vScrollbar.value;
		},
		
		"protected function onResize",function onResize(event/*:Event*/)/*:void*/
		{
			this.invalidate();
		},
		
		"protected function onMouseDown",function onMouseDown(event/*:MouseEvent*/)/*:void*/
		{
			this.content.startDrag(false, new flash.geom.Rectangle(0, 0, Math.min(0, this._width - this.content.width - 10), Math.min(0, this._height - this.content.height - 10)));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMouseMove"));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		"protected function onMouseMove",function onMouseMove(event/*:MouseEvent*/)/*:void*/
		{
			this._hScrollbar.value = -this.content.x;
			this._vScrollbar.value = -this.content.y;
		},
		
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this.content.stopDrag();
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMouseMove"));
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},

		"public function set dragContent",function set$dragContent(value/*:Boolean*/)/*:void*/
		{
			this._dragContent = value;
			if(this._dragContent)
			{
				this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
				this._background.useHandCursor = true;
				this._background.buttonMode = true;
			}
			else
			{
				this._background.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
				this._background.useHandCursor = false;
				this._background.buttonMode = false;
			}
		},
		"public function get dragContent",function get$dragContent()/*:Boolean*/
		{
			return this._dragContent;
		},

		
	];},[],["com.bit101.components.Panel","flash.events.Event","flash.events.MouseEvent","com.bit101.components.VScrollBar","com.bit101.components.HScrollBar","flash.display.Shape","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);