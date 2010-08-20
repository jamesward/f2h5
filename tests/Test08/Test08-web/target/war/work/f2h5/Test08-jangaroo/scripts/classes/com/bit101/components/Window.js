joo.classLoader.prepare(/**
 * Window.as
 * Keith Peters
 * version 0.9.5
 * 
 * A draggable window. Can be used as a container for other components.
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
	import flash.display.Sprite
	import flash.events.Event
	import flash.events.MouseEvent*/

	"public class Window extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$height=$$l+'height';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,com.bit101.components.PushButton,com.bit101.components.Panel,flash.display.Shape,flash.events.MouseEvent,flash.events.Event);},
	
		"protected var",{ _title/*:String*/: undefined},
		"protected var",{ _titleBar/*:Panel*/: undefined},
		"protected var",{ _titleLabel/*:Label*/: undefined},
		"protected var",{ _panel/*:Panel*/: undefined},
		"protected var",{ _color/*:int*/ : -1},
		"protected var",{ _shadow/*:Boolean*/ : true},
		"protected var",{ _draggable/*:Boolean*/ : true},
		"protected var",{ _minimizeButton/*:Sprite*/: undefined},
		"protected var",{ _hasMinimizeButton/*:Boolean*/ : false},
		"protected var",{ _minimized/*:Boolean*/ : false},
		"protected var",{ _hasCloseButton/*:Boolean*/: undefined},
		"protected var",{ _closeButton/*:PushButton*/: undefined},
		"protected var",{ _grips/*:Shape*/: undefined},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param title The string to display in the title bar.
		 */
		"public function Window",function $Window(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, title/*:String="Window"*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}title="Window";}
			this._title = title;
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(100, 100);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._titleBar = new com.bit101.components.Panel(this);
			this._titleBar.filters = [];
			this._titleBar.buttonMode = true;
			this._titleBar.useHandCursor = true;
			this._titleBar.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
			this._titleBar.height = 20;
			this._titleLabel = new com.bit101.components.Label(this._titleBar.content, 5, 1, this._title);
			
			this._grips = new flash.display.Shape();
			for(var i/*:int*/ = 0; i < 4; i++)
			{
				this._grips.graphics.lineStyle(1, 0xffffff, .55);
				this._grips.graphics.moveTo(0, 3 + i * 4);
				this._grips.graphics.lineTo(100, 3 + i * 4);
				this._grips.graphics.lineStyle(1, 0, .125);
				this._grips.graphics.moveTo(0, 4 + i * 4);
				this._grips.graphics.lineTo(100, 4 + i * 4);
			}
			this._titleBar.content.addChild(this._grips);
			this._grips.visible = false;
			
			this._panel = new com.bit101.components.Panel(this, 0, 20);
			this._panel.visible = !this._minimized;
			
			this._minimizeButton = new flash.display.Sprite();
			this._minimizeButton.graphics.beginFill(0, 0);
			this._minimizeButton.graphics.drawRect(-10, -10, 20, 20);
			this._minimizeButton.graphics.endFill();
			this._minimizeButton.graphics.beginFill(0, .35);
			this._minimizeButton.graphics.moveTo(-5, -3);
			this._minimizeButton.graphics.lineTo(5, -3);
			this._minimizeButton.graphics.lineTo(0, 4);
			this._minimizeButton.graphics.lineTo(-5, -3);
			this._minimizeButton.graphics.endFill();
			this._minimizeButton.x = 10;
			this._minimizeButton.y = 10;
			this._minimizeButton.useHandCursor = true;
			this._minimizeButton.buttonMode = true;
			this._minimizeButton.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onMinimize"));
			
			this._closeButton = new com.bit101.components.PushButton(null, 86, 6, "", $$bound(this,"onClose"));
			this._closeButton.setSize(8, 8);
			
			this.filters = [this.getShadow(4, false)];
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
			this._titleBar.color = this._color;
			this._panel.color = this._color;
			this._titleBar.width = this.width;
			this._titleBar.draw();
			this._titleLabel.x = this._hasMinimizeButton ? 20 : 5;
			this._closeButton.x = this._width - 14;
			this._grips.x = this._titleLabel.x + this._titleLabel.width;
			if(this._hasCloseButton)
			{
				this._grips.width = this._closeButton.x - this._grips.x - 2;
			}
			else
			{
				this._grips.width = this._width - this._grips.x - 2;
			}
			this._panel.setSize(this._width, this._height - 20);
			this._panel.draw();
		},


		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal mouseDown handler. Starts a drag.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseDown",function onMouseDown(event/*:MouseEvent*/)/*:void*/
		{
			if(this._draggable)
			{
				this.startDrag();
				this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
				this.parent.addChild(this); // move to top
			}
			this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
		},
		
		/**
		 * Internal mouseUp handler. Stops the drag.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this.stopDrag();
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		"protected function onMinimize",function onMinimize(event/*:MouseEvent*/)/*:void*/
		{
			this.minimized = !this.minimized;
		},
		
		"protected function onClose",function onClose(event/*:MouseEvent*/)/*:void*/
		{
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CLOSE));
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets whether or not this Window will have a drop shadow.
		 */
		"public function set shadow",function set$shadow(b/*:Boolean*/)/*:void*/
		{
			this._shadow = b;
			if(this._shadow)
			{
				this.filters = [this.getShadow(4, false)];
			}
			else
			{
				this.filters = [];
			}
		},
		"public function get shadow",function get$shadow()/*:Boolean*/
		{
			return this._shadow;
		},
		
		/**
		 * Gets / sets the background color of this panel.
		 */
		"public function set color",function set$color(c/*:int*/)/*:void*/
		{
			this._color = c;
			this.invalidate();
		},
		"public function get color",function get$color()/*:int*/
		{
			return this._color;
		},
		
		/**
		 * Gets / sets the title shown in the title bar.
		 */
		"public function set title",function set$title(t/*:String*/)/*:void*/
		{
			this._title = t;
			this._titleLabel.text = this._title;
		},
		"public function get title",function get$title()/*:String*/
		{
			return this._title;
		},
		
		/**
		 * Container for content added to this panel. This is just a reference to the content of the internal Panel, which is masked, so best to add children to content, rather than directly to the window.
		 */
		"public function get content",function get$content()/*:DisplayObjectContainer*/
		{
			return this._panel.content;
		},
		
		/**
		 * Sets / gets whether or not the window will be draggable by the title bar.
		 */
		"public function set draggable",function set$draggable(b/*:Boolean*/)/*:void*/
		{
			this._draggable = b;
			this._titleBar.buttonMode = this._draggable;
			this._titleBar.useHandCursor = this._draggable;
		},
		"public function get draggable",function get$draggable()/*:Boolean*/
		{
			return this._draggable;
		},
		
		/**
		 * Gets / sets whether or not the window will show a minimize button that will toggle the window open and closed. A closed window will only show the title bar.
		 */
		"public function set hasMinimizeButton",function set$hasMinimizeButton(b/*:Boolean*/)/*:void*/
		{
			this._hasMinimizeButton = b;
			if(this._hasMinimizeButton)
			{
				this.addChild(this._minimizeButton);
			}
			else if(this.contains(this._minimizeButton))
			{
				this.removeChild(this._minimizeButton);
			}
			this.invalidate();
		},
		"public function get hasMinimizeButton",function get$hasMinimizeButton()/*:Boolean*/
		{
			return this._hasMinimizeButton;
		},
		
		/**
		 * Gets / sets whether the window is closed. A closed window will only show its title bar.
		 */
		"public function set minimized",function set$minimized(value/*:Boolean*/)/*:void*/
		{
			this._minimized = value;
//			_panel.visible = !_minimized;
			if(this._minimized)
			{
				if(this.contains(this._panel)) this.removeChild(this._panel);
				this._minimizeButton.rotation = -90;
			}
			else
			{
				if(!this.contains(this._panel)) this.addChild(this._panel);
				this._minimizeButton.rotation = 0;
			}
			this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
		},
		"public function get minimized",function get$minimized()/*:Boolean*/
		{
			return this._minimized;
		},
		
		/**
		 * Gets the height of the component. A minimized window's height will only be that of its title bar.
		 */
		"override public function get height",function get$height()/*:Number*/
		{
			if(this.contains(this._panel))
			{
				return this[$height];
			}
			else
			{
				return 20;
			}
		},

		/**
		 * Sets / gets whether or not the window will display a close button.
		 * Close button merely dispatches a CLOSE event when clicked. It is up to the developer to handle this event.
		 */
		"public function set hasCloseButton",function set$hasCloseButton(value/*:Boolean*/)/*:void*/
		{
			this._hasCloseButton = value;
			if(this._hasCloseButton)
			{
				this._titleBar.content.addChild(this._closeButton);
			}
			else if(this._titleBar.content.contains(this._closeButton))
			{
				this._titleBar.content.removeChild(this._closeButton);
			}
			this.invalidate();
		},
		"public function get hasCloseButton",function get$hasCloseButton()/*:Boolean*/
		{
			return this._hasCloseButton;
		},

		/**
		 * Returns a reference to the title bar for customization.
		 */
		"public function get titleBar",function get$titleBar()/*:Panel*/
		{
			return this._titleBar;
		},
		"public function set titleBar",function set$titleBar(value/*:Panel*/)/*:void*/
		{
			this._titleBar = value;
		},

		/**
		 * Returns a reference to the shape showing the grips on the title bar. Can be used to do custom drawing or turn them invisible.
		 */		
		"public function get grips",function get$grips()/*:Shape*/
		{
			return this._grips;
		},


	];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.events.MouseEvent","com.bit101.components.Label","flash.display.Shape","flash.display.Sprite","com.bit101.components.PushButton","flash.events.Event"]
);