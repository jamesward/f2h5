joo.classLoader.prepare(/**
 * Component.as
 * Keith Peters
 * version 0.9.5
 * 
 * Base class for all components
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
 * 
 * 
 * 
 * Components with text make use of the font PF Ronda Seven by Yuusuke Kamiyamane
 * This is a free font obtained from http://www.dafont.com/pf-ronda-seven.font
 */
 
"package com.bit101.components",/*
{
	import flash.display.DisplayObjectContainer
	import flash.display.Sprite
	import flash.display.Stage
	import flash.display.StageAlign
	import flash.display.StageScaleMode
	import flash.events.Event
	import flash.filters.DropShadowFilter*/

	"public class Component extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$width=$$l+'width',$height=$$l+'height',$x=$$l+'x',$y=$$l+'y';return[function(){joo.classLoader.init(flash.display.StageScaleMode,flash.filters.DropShadowFilter,flash.display.StageAlign,flash.events.Event,com.bit101.components.Style);},
	/*
		// NOTE: Flex 4 introduces DefineFont4, which is used by default and does not work in native text fields.
		// Use the embedAsCFF="false" param to switch back to DefineFont4. In earlier Flex 4 SDKs this was cff="false".
		// So if you are using the Flex 3.x sdk compiler, switch the embed statment below to expose the correct version.
		
		// Flex 4.x sdk:
		[Embed(source="/assets/pf_ronda_seven.ttf", embedAsCFF="false", fontName="PF Ronda Seven", mimeType="application/x-font")]*/
		// Flex 3.x sdk:
//		[Embed(source="/assets/pf_ronda_seven.ttf", fontName="PF Ronda Seven", mimeType="application/x-font")]
		"protected var",{ Ronda/*:Class*/: undefined},
		
		"protected var",{ _width/*:Number*/ : 0},
		"protected var",{ _height/*:Number*/ : 0},
		"protected var",{ _tag/*:int*/ : -1},
		"protected var",{ _enabled/*:Boolean*/ : true},
		
		"public static const",{ DRAW/*:String*/ : "draw"},

		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function Component",function $Component(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}this[$super]();
			this.move(xpos, ypos);
			if(parent != null)
			{
				parent.addChild(this);
			}
			this.init();
		},
		
		/**
		 * Initilizes the component.
		 */
		"protected function init",function init()/*:void*/
		{
			this.addChildren();
			this.invalidate();
		},
		
		/**
		 * Overriden in subclasses to create child display objects.
		 */
		"protected function addChildren",function addChildren()/*:void*/
		{
			
		},
		
		/**
		 * DropShadowFilter factory method, used in many of the components.
		 * @param dist The distance of the shadow.
		 * @param knockout Whether or not to create a knocked out shadow.
		 */
		"protected function getShadow",function getShadow(dist/*:Number*/, knockout/*:Boolean = false*/)/*:DropShadowFilter*/
		{if(arguments.length<2){knockout = false;}
			return new flash.filters.DropShadowFilter(dist, 45, com.bit101.components.Style.DROPSHADOW, 1, dist, dist, .3, 1, knockout);
		},
		
		/**
		 * Marks the component to be redrawn on the next frame.
		 */
		"protected function invalidate",function invalidate()/*:void*/
		{
//			draw();
			this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onInvalidate"));
		},
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Utility method to set up usual stage align and scaling.
		 */
		"public static function initStage",function initStage(stage/*:Stage*/)/*:void*/
		{
			stage.align = flash.display.StageAlign.TOP_LEFT;
			stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		},
		
		/**
		 * Moves the component to the specified position.
		 * @param xpos the x position to move the component
		 * @param ypos the y position to move the component
		 */
		"public function move",function move(xpos/*:Number*/, ypos/*:Number*/)/*:void*/
		{
			this.x = Math.round(xpos);
			this.y = Math.round(ypos);
		},
		
		/**
		 * Sets the size of the component.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		"public function setSize",function setSize(w/*:Number*/, h/*:Number*/)/*:void*/
		{
			this._width = w;
			this._height = h;
			this.invalidate();
		},
		
		/**
		 * Abstract draw function.
		 */
		"public function draw",function draw()/*:void*/
		{
			this.dispatchEvent(new flash.events.Event(com.bit101.components.Component.DRAW));
		},
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called one frame after invalidate is called.
		 */
		"protected function onInvalidate",function onInvalidate(event/*:Event*/)/*:void*/
		{
			this.removeEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onInvalidate"));
			this.draw();
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the width of the component.
		 */
		"override public function set width",function set$width(w/*:Number*/)/*:void*/
		{
			this._width = w;
			this.invalidate();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
		},
		"override public function get width",function get$width()/*:Number*/
		{
			return this._width;
		},
		
		/**
		 * Sets/gets the height of the component.
		 */
		"override public function set height",function set$height(h/*:Number*/)/*:void*/
		{
			this._height = h;
			this.invalidate();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
		},
		"override public function get height",function get$height()/*:Number*/
		{
			return this._height;
		},
		
		/**
		 * Sets/gets in integer that can identify the component.
		 */
		"public function set tag",function set$tag(value/*:int*/)/*:void*/
		{
			this._tag = value;
		},
		"public function get tag",function get$tag()/*:int*/
		{
			return this._tag;
		},
		
		/**
		 * Overrides the setter for x to always place the component on a whole pixel.
		 */
		"override public function set x",function set$x(value/*:Number*/)/*:void*/
		{
			this[$x] = Math.round(value);
		},
		
		/**
		 * Overrides the setter for y to always place the component on a whole pixel.
		 */
		"override public function set y",function set$y(value/*:Number*/)/*:void*/
		{
			this[$y] = Math.round(value);
		},

		/**
		 * Sets/gets whether this component is enabled or not.
		 */
		"public function set enabled",function set$enabled(value/*:Boolean*/)/*:void*/
		{
			this._enabled = value;
			this.mouseEnabled = this.mouseChildren = this._enabled;
            this.tabEnabled = value;
			this.alpha = this._enabled ? 1.0 : 0.5;
		},
		"public function get enabled",function get$enabled()/*:Boolean*/
		{
			return this._enabled;
		},

	];},["initStage"],["flash.display.Sprite","flash.filters.DropShadowFilter","com.bit101.components.Style","flash.events.Event","flash.display.StageAlign","flash.display.StageScaleMode","Math"]
);