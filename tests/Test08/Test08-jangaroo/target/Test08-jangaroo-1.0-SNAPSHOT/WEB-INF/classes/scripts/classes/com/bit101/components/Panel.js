joo.classLoader.prepare(/**
 * Panel.as
 * Keith Peters
 * version 0.9.5
 * 
 * A rectangular panel. Can be used as a container for other components.
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
	import flash.display.Sprite*/
	
	"public class Panel extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},
	
		"protected var",{ _mask/*:Sprite*/: undefined},
		"protected var",{ _background/*:Sprite*/: undefined},
		"protected var",{ _color/*:int*/ : -1},
		"protected var",{ _shadow/*:Boolean*/ : true},
		"protected var",{ _gridSize/*:int*/ : 10},
		"protected var",{ _showGrid/*:Boolean*/ : false},
		"protected var",{ _gridColor/*:uint*/ : 0xd0d0d0},
		
		
		/**
		 * Container for content added to this panel. This is masked, so best to add children to content, rather than directly to the panel.
		 */
		"public var",{ content/*:Sprite*/: undefined},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Panel.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function Panel",function $Panel(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}
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
			this._background = new flash.display.Sprite();
			this.addChild(this._background);
			
			this._mask = new flash.display.Sprite();
			this._mask.mouseEnabled = false;
			this.addChild(this._mask);
			
			this.content = new flash.display.Sprite();
			this.addChild(this.content);
			this.content.mask = this._mask;
			
			this.filters = [this.getShadow(2, true)];
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
			this._background.graphics.clear();
			this._background.graphics.lineStyle(1, 0, 0.1);
			if(this._color == -1)
			{
				this._background.graphics.beginFill(com.bit101.components.Style.PANEL);
			}
			else
			{
				this._background.graphics.beginFill(this._color);
			}
			this._background.graphics.drawRect(0, 0, this._width, this._height);
			this._background.graphics.endFill();
			
			this.drawGrid();
			
			this._mask.graphics.clear();
			this._mask.graphics.beginFill(0xff0000);
			this._mask.graphics.drawRect(0, 0, this._width, this._height);
			this._mask.graphics.endFill();
		},
		
		"protected function drawGrid",function drawGrid()/*:void*/
		{
			if(!this._showGrid) return;
			
			this._background.graphics.lineStyle(0, this._gridColor);
			for(var i/*:int*/ = 0; i < this._width; i += this._gridSize)
			{
				this._background.graphics.moveTo(i, 0);
				this._background.graphics.lineTo(i, this._height);
			}
			for(i = 0; i < this._height; i += this._gridSize)
			{
				this._background.graphics.moveTo(0, i);
				this._background.graphics.lineTo(this._width, i);
			}
		},
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets whether or not this Panel will have an inner shadow.
		 */
		"public function set shadow",function set$shadow(b/*:Boolean*/)/*:void*/
		{
			this._shadow = b;
			if(this._shadow)
			{
				this.filters = [this.getShadow(2, true)];
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
		 * Gets / sets the backgrond color of this panel.
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
		 * Sets / gets the size of the grid.
		 */
		"public function set gridSize",function set$gridSize(value/*:int*/)/*:void*/
		{
			this._gridSize = value;
			this.invalidate();
		},
		"public function get gridSize",function get$gridSize()/*:int*/
		{
			return this._gridSize;
		},

		/**
		 * Sets / gets whether or not the grid will be shown.
		 */
		"public function set showGrid",function set$showGrid(value/*:Boolean*/)/*:void*/
		{
			this._showGrid = value;
			this.invalidate();
		},
		"public function get showGrid",function get$showGrid()/*:Boolean*/
		{
			return this._showGrid;
		},

		/**
		 * Sets / gets the color of the grid lines.
		 */
		"public function set gridColor",function set$gridColor(value/*:uint*/)/*:void*/
		{
			this._gridColor = value;
			this.invalidate();
		},
		"public function get gridColor",function get$gridColor()/*:uint*/
		{
			return this._gridColor;
		},
	];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style"]
);