/**
 * ColorChooser.as
 * Keith Peters
 * version 0.9.5
 * 
 * A Color Chooser component, allowing textual input, a default gradient, or custom image.
 * 
 * Copyright (c) 2010 Keith Peters
 * 
 * popup color choosing code by Rashid Ghassempouri
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
 
package com.bit101.components
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.BlendMode;
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.GradientType;
	import flash.display.Graphics;
	import flash.display.InterpolationMethod;
	import flash.display.SpreadMethod;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Matrix;
	import flash.geom.Point;
	
	public class ColorChooser extends com.bit101.components.Component
	{
		public static const TOP:String = "top";
		public static const BOTTOM:String = "bottom";
		
		protected var _colors:BitmapData;
		protected var _colorsContainer:Sprite;
		protected var _defaultModelColors:Array=[0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000,0xFFFFFF,0x000000];
		protected var _input:InputText;
		protected var _model:DisplayObject;
		protected var _oldColorChoice:uint = this._value;
		protected var _popupAlign:String = com.bit101.components.ColorChooser.BOTTOM;
		protected var _stage:Stage;
		protected var _swatch:Sprite;
		protected var _tmpColorChoice:uint = this._value;
		protected var _usePopup:Boolean = false;
		protected var _value:uint = 0xff0000;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ColorChooser.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param value The initial color value of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		
		public native function ColorChooser(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, value:uint = 0xff0000, defaultHandler:Function = null);		
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		override protected native function addChildren():void;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		override public native function draw():void;
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal change handler.
		 * @param event The Event passed by the system.
		 */
		protected native function onChange(event:Event):void;	
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the color value of this ColorChooser.
		 */
		public native function set value(n:uint):void;
		public native function get value():uint;
		
		///////////////////////////////////
		// COLOR PICKER MODE SUPPORT
		///////////////////////////////////}
		
		
		public native function get model():DisplayObject;
		public native function set model(value:DisplayObject):void;
		
		protected native function drawColors(d:DisplayObject):void;
		
		public native function get popupAlign():String;
		public native function set popupAlign(value:String):void;
		
		public native function get usePopup():Boolean;
		public native function set usePopup(value:Boolean):void;
		
		/**
		 * The color picker mode Handlers 
		 */
		
		protected native function onColorsRemovedFromStage(e:Event):void;
		
		protected native function onColorsAddedToStage(e:Event):void;
		
		protected native function onStageClick(e:MouseEvent):void;
		 
		
		protected native function onSwatchClick(event:MouseEvent):void;
		
		protected native function backToColorChoice(e:MouseEvent):void;
		
		protected native function setColorChoice(e:MouseEvent):void;
		
		protected native function browseColorChoice(e:MouseEvent):void;

		/**
		 * The color picker mode Display functions
		 */
		
		protected native function displayColors():void;		
		
		protected native function placeColors():void;
		
		/**
		 * Create the default gradient Model
		 */

		protected native function getDefaultModel():Sprite;
		
		protected native function getGradientSprite(w:Number, h:Number, ca:Array):Sprite;
	}
}