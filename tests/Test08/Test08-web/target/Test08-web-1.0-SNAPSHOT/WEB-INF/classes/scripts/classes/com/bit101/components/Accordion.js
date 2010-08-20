joo.classLoader.prepare(/**
 * Accordion.as
 * Keith Peters
 * version 0.9.5
 * 
 * Essentially a VBox full of Windows. Only one Window will be expanded at any time.
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
	import flash.events.Event*/
	
	"public class Accordion extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$setSize=$$l+'setSize',$draw=$$l+'draw',$width=$$l+'width',$height=$$l+'height';return[function(){joo.classLoader.init(com.bit101.components.Window,com.bit101.components.VBox,Array,flash.events.Event);},
	
		"protected var",{ _windows/*:Array*/: undefined},
		"protected var",{ _winWidth/*:Number*/ : 100},
		"protected var",{ _winHeight/*:Number*/ : 100},
		"protected var",{ _vbox/*:VBox*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function Accordion",function $Accordion(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(100, 120);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/* : void*/
		{
			this._vbox = new com.bit101.components.VBox(this);
			this._vbox.spacing = 0;

			this._windows = new Array();
			for(var i/*:int*/ = 0; i < 2; i++)
			{
				var window/*:Window*/ = new com.bit101.components.Window(this._vbox, 0, 0, "Section " + (i + 1));
				window.grips.visible = false;
				window.draggable = false;
				window.addEventListener(flash.events.Event.SELECT, $$bound(this,"onWindowSelect"));
				if(i != 0) window.minimized = true;
				this._windows.push(window);
			}
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Adds a new window to the bottom of the accordion.
		 * @param title The title of the new window.
		 */
		"public function addWindow",function addWindow(title/*:String*/)/*:void*/
		{
			var window/*:Window*/ = new com.bit101.components.Window(this._vbox, 0, 0, title);
			window.minimized = true;
			window.draggable = false;
			window.grips.visible = false;
			window.addEventListener(flash.events.Event.SELECT, $$bound(this,"onWindowSelect"));
			this._windows.push(window);
			this._winHeight = this._height - (this._windows.length - 1) * 20;
			this.setSize(this._winWidth, this._winHeight);
		},
		
		/**
		 * Sets the size of the component.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		"override public function setSize",function setSize(w/*:Number*/, h/*:Number*/)/* : void*/
		{
			this[$setSize](w, h);
			this._winWidth = w;
			this._winHeight = h - (this._windows.length - 1) * 20;
			this.draw();
		},
		
		"override public function draw",function draw()/*:void*/
		{
			this._winHeight = Math.max(this._winHeight, 40);
			for(var i/*:int*/ = 0; i < this._windows.length; i++)
			{
				this._windows[i].setSize(this._winWidth, this._winHeight);
				this._vbox.draw();
			}
		},
		
		/**
		 * Returns the Window at the specified index.
		 * @param index The index of the Window you want to get access to.
		 */
		"public function getWindowAt",function getWindowAt(index/*:int*/)/*:Window*/
		{
			return this._windows[index];
		},

		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when any window is resized. If the window has been expanded, it closes all other windows.
		 */
		"protected function onWindowSelect",function onWindowSelect(event/*:Event*/)/*:void*/
		{
			var window/*:Window*/ = event.target/*as Window*/;
			if(window.minimized)
			{
				for(var i/*:int*/ = 0; i < this._windows.length; i++)
				{
					this._windows[i].minimized = true;
				}
				window.minimized = false;
			}
			this._vbox.draw();
		},
		
		"public override function set width",function set$width(w/*:Number*/)/*:void*/
		{
			this._winWidth = w;
			this[$width] = w;
		},
		
		"public override function set height",function set$height(h/*:Number*/)/*:void*/
		{
			this._winHeight = h - (this._windows.length - 1) * 20;
			this[$height] = h;
		},
		
	];},[],["com.bit101.components.Component","com.bit101.components.VBox","Array","com.bit101.components.Window","flash.events.Event","Math"]
);