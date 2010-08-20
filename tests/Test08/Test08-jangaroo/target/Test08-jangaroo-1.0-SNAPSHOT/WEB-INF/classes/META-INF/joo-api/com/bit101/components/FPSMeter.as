/**
 * FPSMeter.as
 * Keith Peters
 * version 0.9.5
 * 
 * An simple component showing the frames per second the current movie is running at.
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
 
 package com.bit101.components
{
	import flash.display.DisplayObjectContainer;
	import flash.events.Event;
	import flash.utils.getTimer;
	
	
	public class FPSMeter extends com.bit101.components.Component
	{
		protected var _label:Label;
		protected var _startTime:int;
		protected var _frames:int;
		protected var _prefix:String = "";
		protected var _fps:int = 0;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ColorChooser.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param prefix A string to put in front of the number value shown. Default is "FPS:".
		 */
		
		public native function FPSMeter(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, prefix:String="FPS:");
		
		protected override native function addChildren():void;
		
		
		public override native function draw():void;
		
		/**
		 * Internal enterFrame handler to measure fps and update label.
		 */
		protected native function onEnterFrame(event:Event):void;
		
		/**
		 * Stops the meter if it is removed from stage.
		 */
		protected native function onRemovedFromStage(event:Event):void;
		
		/**
		 * Stops the meter by removing the enterFrame listener.
		 */
		public native function stop():void;
		
		/**
		 * Starts the meter again if it has been stopped.
		 */
		public native function start():void;
		
		/**
		 * Sets or gets the prefix shown before the number. Defaults to "FPS:".
		 */
		public native function set prefix(value:String):void;
		public native function get prefix():String;
		
		/**
		 * Returns the current calculated FPS.
		 */
		public native function get fps():int;
	}
}