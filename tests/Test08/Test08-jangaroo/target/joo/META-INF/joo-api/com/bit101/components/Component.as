/**
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
 
package com.bit101.components
{
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.filters.DropShadowFilter;

	public class Component extends flash.display.Sprite
	{/*
		// NOTE: Flex 4 introduces DefineFont4, which is used by default and does not work in native text fields.
		// Use the embedAsCFF="false" param to switch back to DefineFont4. In earlier Flex 4 SDKs this was cff="false".
		// So if you are using the Flex 3.x sdk compiler, switch the embed statment below to expose the correct version.
		
		// Flex 4.x sdk:
		[Embed(source="/assets/pf_ronda_seven.ttf", embedAsCFF="false", fontName="PF Ronda Seven", mimeType="application/x-font")]*/
		// Flex 3.x sdk:
//		[Embed(source="/assets/pf_ronda_seven.ttf", fontName="PF Ronda Seven", mimeType="application/x-font")]
		protected var Ronda:Class;
		
		protected var _width:Number = 0;
		protected var _height:Number = 0;
		protected var _tag:int = -1;
		protected var _enabled:Boolean = true;
		
		public static const DRAW:String = "draw";

		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function Component(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0);
		
		/**
		 * Initilizes the component.
		 */
		protected native function init():void;
		
		/**
		 * Overriden in subclasses to create child display objects.
		 */
		protected native function addChildren():void;
		
		/**
		 * DropShadowFilter factory method, used in many of the components.
		 * @param dist The distance of the shadow.
		 * @param knockout Whether or not to create a knocked out shadow.
		 */
		protected native function getShadow(dist:Number, knockout:Boolean = false):DropShadowFilter;
		
		/**
		 * Marks the component to be redrawn on the next frame.
		 */
		protected native function invalidate():void;
		
		
		
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Utility method to set up usual stage align and scaling.
		 */
		public static native function initStage(stage:Stage):void;
		
		/**
		 * Moves the component to the specified position.
		 * @param xpos the x position to move the component
		 * @param ypos the y position to move the component
		 */
		public native function move(xpos:Number, ypos:Number):void;
		
		/**
		 * Sets the size of the component.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		public native function setSize(w:Number, h:Number):void;
		
		/**
		 * Abstract draw function.
		 */
		public native function draw():void;
		
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called one frame after invalidate is called.
		 */
		protected native function onInvalidate(event:Event):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the width of the component.
		 */
		override public native function set width(w:Number):void;
		override public native function get width():Number;
		
		/**
		 * Sets/gets the height of the component.
		 */
		override public native function set height(h:Number):void;
		override public native function get height():Number;
		
		/**
		 * Sets/gets in integer that can identify the component.
		 */
		public native function set tag(value:int):void;
		public native function get tag():int;
		
		/**
		 * Overrides the setter for x to always place the component on a whole pixel.
		 */
		override public native function set x(value:Number):void;
		
		/**
		 * Overrides the setter for y to always place the component on a whole pixel.
		 */
		override public native function set y(value:Number):void;

		/**
		 * Sets/gets whether this component is enabled or not.
		 */
		public native function set enabled(value:Boolean):void;
		public native function get enabled():Boolean;

	}
}