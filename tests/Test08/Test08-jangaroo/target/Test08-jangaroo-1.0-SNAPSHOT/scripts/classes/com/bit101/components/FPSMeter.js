joo.classLoader.prepare(/**
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
 
 "package com.bit101.components",/*
{
	import flash.display.DisplayObjectContainer
	import flash.events.Event
	import flash.utils.getTimer*/
	
	
	"public class FPSMeter extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.events.Event);},
	
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _startTime/*:int*/: undefined},
		"protected var",{ _frames/*:int*/: undefined},
		"protected var",{ _prefix/*:String*/ : ""},
		"protected var",{ _fps/*:int*/ : 0},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ColorChooser.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param prefix A string to put in front of the number value shown. Default is "FPS:".
		 */
		
		"public function FPSMeter",function $FPSMeter(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, prefix/*:String="FPS:"*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}prefix="FPS:";}
			this[$super](parent, xpos, ypos);
			this._prefix = prefix;
			this._frames = 0;
			this._startTime = flash.utils.getTimer();
			this.setSize(50, 20);
			if(this.stage != null)
			{
				this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onEnterFrame"));
			}
			this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE, $$bound(this,"onRemovedFromStage"));
		},
		
		"protected override function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._label = new com.bit101.components.Label(this, 0, 0);
		},
		
		
		"public override function draw",function draw()/*:void*/
		{
			this._label.text = this._prefix + this._fps.toString();
		},
		
		/**
		 * Internal enterFrame handler to measure fps and update label.
		 */
		"protected function onEnterFrame",function onEnterFrame(event/*:Event*/)/*:void*/
		{
			// Increment frame count each frame. When more than a second has passed, 
			// display number of accumulated frames and reset.
			// Thus FPS will only be calculated and displayed once per second.
			// There are more responsive methods that calculate FPS on every frame. 
			// This method is uses less CPU and avoids the "jitter" of those other methods.
			this._frames++;
			var time/*:int*/ = flash.utils.getTimer();
			var elapsed/*:int*/ = time - this._startTime;
			if(elapsed >= 1000)
			{
				this._fps = Math.round(this._frames * 1000 / elapsed);
				this._frames = 0;
				this._startTime = time;
				this.draw();
			}
		},
		
		/**
		 * Stops the meter if it is removed from stage.
		 */
		"protected function onRemovedFromStage",function onRemovedFromStage(event/*:Event*/)/*:void*/
		{
			this.stop();
		},
		
		/**
		 * Stops the meter by removing the enterFrame listener.
		 */
		"public function stop",function stop()/*:void*/
		{
			this.removeEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onEnterFrame"));
		},
		
		/**
		 * Starts the meter again if it has been stopped.
		 */
		"public function start",function start()/*:void*/
		{
			this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onEnterFrame"));
		},
		
		/**
		 * Sets or gets the prefix shown before the number. Defaults to "FPS:".
		 */
		"public function set prefix",function set$prefix(value/*:String*/)/*:void*/
		{
			this._prefix = value;
		},
		"public function get prefix",function get$prefix()/*:String*/
		{
			return this._prefix;
		},
		
		/**
		 * Returns the current calculated FPS.
		 */
		"public function get fps",function get$fps()/*:int*/
		{
			return this._fps;
		},
	];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.Label","Math"]
);