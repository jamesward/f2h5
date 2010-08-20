joo.classLoader.prepare(/**
 * Meter.as
 * Keith Peters
 * version 0.9.5
 * 
 * A meter component similar to a voltage meter, with a dial and a needle that indicates a value.
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
	import flash.display.Sprite
	import flash.events.Event
	import flash.filters.DropShadowFilter*/
	
	"public class Meter extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$setSize=$$l+'setSize';return[function(){joo.classLoader.init(flash.filters.DropShadowFilter,com.bit101.components.Label,flash.display.Sprite,Math,flash.events.Event,com.bit101.components.Style);},
	
		"protected var",{ _damp/*:Number*/ : .8},
		"protected var",{ _dial/*:Sprite*/: undefined},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/: undefined},
		"protected var",{ _maximum/*:Number*/ : 1.0},
		"protected var",{ _maxLabel/*:Label*/: undefined},
		"protected var",{ _minimum/*:Number*/ : 0.0},
		"protected var",{ _minLabel/*:Label*/: undefined},
		"protected var",{ _needle/*:Sprite*/: undefined},
		"protected var",{ _needleMask/*:Sprite*/: undefined},
		"protected var",{ _showValues/*:Boolean*/ : true},
		"protected var",{ _targetRotation/*:Number*/ : 0},
		"protected var",{ _value/*:Number*/ : 0.0},
		"protected var",{ _velocity/*:Number*/ : 0},
		
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Meter.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param text The string to use as the initial text in this component.
		 */
		"public function Meter",function $Meter(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, text/*:String = ""*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}text = "";}
			this._labelText = text;
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this._width = 200;
			this._height = 100;
		},
		
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{ 
			this._dial = new flash.display.Sprite();
			this.addChild(this._dial);

			this._needle = new flash.display.Sprite();
			this._needle.rotation = -50;
			this._dial.addChild(this._needle);
			
			this._needleMask = new flash.display.Sprite();
			this.addChild(this._needleMask);
			this._dial.mask = this._needleMask;
			
			this._minLabel = new com.bit101.components.Label(this);
			this._minLabel.text = this._minimum.toString();
			
			this._maxLabel = new com.bit101.components.Label(this);
			this._maxLabel.autoSize = true;
			this._maxLabel.text = this._maximum.toString();
			
			this._label = new com.bit101.components.Label(this);
			this._label.text = this._labelText;
		},
		
		 
		 
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the visual ui of the component.
		 */
		"override public function draw",function draw()/*:void*/
		{
			var startAngle/*:Number*/ = -140 * Math.PI / 180;
			var endAngle/*:Number*/ = -40 * Math.PI / 180;
			
			this.drawBackground();
			this.drawDial(startAngle, endAngle);
			this.drawTicks(startAngle, endAngle);
			this.drawNeedle();
			
			this._minLabel.move(10, this._height - this._minLabel.height - 4);
			this._maxLabel.move(this._width - this._maxLabel.width - 10, this._height - this._maxLabel.height - 4);
			this._label.move((this._width - this._label.width) / 2, this._height * .5);
			this.update();
		},
		
		/**
		 * Sets the size of the component. Adjusts height to be 1/2 width.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		"override public function setSize",function setSize(w/*:Number*/, h/*:Number*/)/*:void*/
		{
			this[$setSize](w, w / 2);
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Draws the background of the component.
		 */
		"protected function drawBackground",function drawBackground()/*:void*/
		{
			this.graphics.clear();
			this.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this.graphics.drawRect(0, 0, this._width, this._height);
			this.graphics.endFill();
			
			this.graphics.beginFill(com.bit101.components.Style.PANEL);
			this.graphics.drawRect(1, 1, this._width - 2, this._height - 2);
			this.graphics.endFill();
		},
		
		/**
		 * Draws the dial.
		 */
		"protected function drawDial",function drawDial(startAngle/*:Number*/, endAngle/*:Number*/)/*:void*/
		{
			this._dial.x = this._width / 2;
			this._dial.y = this._height * 1.25;
			this._dial.graphics.clear();
			this._dial.graphics.lineStyle(0, com.bit101.components.Style.BACKGROUND);
			this._dial.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			var r1/*:Number*/ = this._height * 1.05;
			var r2/*:Number*/ = this._height * 0.96;
			
			this._dial.graphics.moveTo(Math.cos(startAngle) * r1, Math.sin(startAngle) * r1);
			for(var i/*:Number*/ = startAngle; i < endAngle; i += .1)
			{
				this._dial.graphics.lineTo(Math.cos(i) * r1, Math.sin(i) * r1);
			}
			this._dial.graphics.lineTo(Math.cos(endAngle) * r1, Math.sin(endAngle) * r1);
			
			this._dial.graphics.lineTo(Math.cos(endAngle) * r2, Math.sin(endAngle) * r2);
			for(i = endAngle; i > startAngle; i -= .1)
			{
				this._dial.graphics.lineTo(Math.cos(i) * r2, Math.sin(i) * r2);
			}
			this._dial.graphics.lineTo(Math.cos(startAngle) * r2, Math.sin(startAngle) * r2);
			this._dial.graphics.lineTo(Math.cos(startAngle) * r1, Math.sin(startAngle) * r1);
			
		},
		
		/**
		 * Draws the tick marks on the dial.
		 */
		"protected function drawTicks",function drawTicks(startAngle/*:Number*/, endAngle/*:Number*/)/*:void*/
		{
			var r1/*:Number*/ = this._height * 1.05;
			var r2/*:Number*/ = this._height * 0.96;
			var r3/*:Number*/ = this._height * 1.13;
			var tick/*:Number*/ = 0;
			for(var i/*:int*/ = 0; i < 9; i++)
			{
				var angle/*:Number*/ = startAngle + i * (endAngle - startAngle) / 8;
				this._dial.graphics.moveTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
				if(tick++ % 2 == 0)
				{
					this._dial.graphics.lineTo(Math.cos(angle) * r3, Math.sin(angle) * r3);
				}
				else
				{
					this._dial.graphics.lineTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
				}
			}
		},
		
		/**
		 * Draws the needle.
		 */
		"protected function drawNeedle",function drawNeedle()/*:void*/
		{
			this._needle.graphics.clear();
			this._needle.graphics.beginFill(0xff0000);
			this._needle.graphics.drawRect(-0.5, -this._height * 1.10, 1, this._height * 1.10);
			this._needle.filters = [new flash.filters.DropShadowFilter(4, 0, 0, 1, 3, 3, .2)];
			
			this._needleMask.graphics.clear();
			this._needleMask.graphics.beginFill(0);
			this._needleMask.graphics.drawRect(0, 0, this._width, this._height);
			this._needleMask.graphics.endFill();
		},
		
		/**
		 * Updates the target rotation of the needle and starts an enterframe handler to spring it to that point.
		 */
		"protected function update",function update()/*:void*/
		{
			this._value = Math.max(this._value, this._minimum);
			this._value = Math.min(this._value, this._maximum);
			this._targetRotation = -50 + this._value / (this._maximum - this._minimum) * 100;
			this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onEnterFrame"));
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Handles the enterFrame event to spring the needle to the target rotation.
		 */
		"protected function onEnterFrame",function onEnterFrame(event/*:Event*/)/*:void*/
		{
			var dist/*:Number*/ = this._targetRotation - this._needle.rotation;
			this._velocity += dist * .05;
			this._velocity *= this._damp;
			if(Math.abs(this._velocity) < .1 && Math.abs(dist) < .1)
			{
				this._needle.rotation = this._targetRotation;
				this.removeEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,"onEnterFrame"));
			}
			else
			{
				this._needle.rotation += this._velocity;
			}
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the maximum value for the meter.
		 */
		"public function set maximum",function set$maximum(value/*:Number*/)/*:void*/
		{
			this._maximum = value;
			this._maxLabel.text = this._maximum.toString();
			this.update();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._maximum;
		},
		
		/**
		 * Gets / sets the minimum value for the meter.
		 */
		"public function set minimum",function set$minimum(value/*:Number*/)/*:void*/
		{
			this._minimum = value;
			this._minLabel.text = this._minimum.toString();
			this.update();
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._minimum;
		},
		
		/**
		 * Gets / sets the current value for the meter.
		 */
		"public function set value",function set$value(val/*:Number*/)/*:void*/
		{
			this._value = val;
			this.update();
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._value;
		},
		
		/**
		 * Gets / sets the label shown on the meter.
		 */
		"public function set label",function set$label(value/*:String*/)/*:void*/
		{
			this._labelText = value;
			this._label.text = this._labelText;
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},
		
		/**
		 * Gets / sets whether or not value labels will be shown for max and min values.
		 */
		"public function set showValues",function set$showValues(value/*:Boolean*/)/*:void*/
		{
			this._showValues = value;
			this._minLabel.visible = this._showValues;
			this._maxLabel.visible = this._showValues;
		},
		"public function get showValues",function get$showValues()/*:Boolean*/
		{
			return this._showValues;
		},

		/**
		 * Gets / sets the damping value for the meter.
		 */
		"public function set damp",function set$damp(value/*:Number*/)/*:void*/
		{
			this._damp = value;
		},
		"public function get damp",function get$damp()/*:Number*/
		{
			return this._damp;
		},

	];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Label","Math","com.bit101.components.Style","flash.filters.DropShadowFilter","flash.events.Event"]
);