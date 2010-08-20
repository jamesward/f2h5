joo.classLoader.prepare(/**
 * Knob.as
 * Keith Peters
 * version 0.9.5
 * 
 * A knob component for choosing a numerical value.
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
	import flash.events.MouseEvent*/
	
	"public class Knob extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},
	
		"public static const",{ VERTICAL/*:String*/ : "vertical"},
		"public static const",{ HORIZONTAL/*:String*/ : "horizontal"},
		"public static const",{ ROTATE/*:String*/ : "rotate"},
		
		"protected var",{ _knob/*:Sprite*/: undefined},
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _max/*:Number*/ : 100},
		"protected var",{ _min/*:Number*/ : 0},
		"protected var",{ _mode/*:String*/ :function(){return( com.bit101.components.Knob.VERTICAL);}},
		"protected var",{ _mouseRange/*:Number*/ : 100},
		"protected var",{ _precision/*:int*/ : 1},
		"protected var",{ _radius/*:Number*/ : 20},
		"protected var",{ _startX/*:Number*/: undefined},
		"protected var",{ _startY/*:Number*/: undefined},
		"protected var",{ _value/*:Number*/ : 0},
		"protected var",{ _valueLabel/*:Label*/: undefined},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Knob.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label String containing the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function Knob",function $Knob(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, label/*:String = ""*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}label = "";}defaultHandler = null;}
			this._labelText = label;
			this[$super](parent, xpos, ypos);this._mode=this._mode();
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},

		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
		},
		
		/**
		 * Creates the children for this component
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._knob = new flash.display.Sprite();
			this._knob.buttonMode = true;
			this._knob.useHandCursor = true;
			this._knob.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onMouseDown"));
			this.addChild(this._knob);
			
			this._label = new com.bit101.components.Label();
			this._label.autoSize = true;
			this.addChild(this._label);
			
			this._valueLabel = new com.bit101.components.Label();
			this._valueLabel.autoSize = true;
			this.addChild(this._valueLabel);
		},
		
		/**
		 * Draw the knob at the specified radius.
		 */
		"protected function drawKnob",function drawKnob()/*:void*/
		{
			this._knob.graphics.clear();
			this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._knob.graphics.drawCircle(0, 0, this._radius);
			this._knob.graphics.endFill();
			
			this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._knob.graphics.drawCircle(0, 0, this._radius - 2);
			this._knob.graphics.endFill();
			
			this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			var s/*:Number*/ = this._radius * .1;
			this._knob.graphics.drawRect(this._radius, -s, s*1.5, s * 2);
			this._knob.graphics.endFill();
			
			this._knob.x = this._radius;
			this._knob.y = this._radius + 20;
			this.updateKnob();
		},
		
		/**
		 * Updates the rotation of the knob based on the value, then formats the value label.
		 */
		"protected function updateKnob",function updateKnob()/*:void*/
		{
			this._knob.rotation = -225 + (this._value - this._min) / (this._max - this._min) * 270;
			this.formatValueLabel();
		},
		
		/**
		 * Adjusts value to be within minimum and maximum.
		 */
		"protected function correctValue",function correctValue()/*:void*/
		{
			if(this._max > this._min)
			{
				this._value = Math.min(this._value, this._max);
				this._value = Math.max(this._value, this._min);
			}
			else
			{
				this._value = Math.max(this._value, this._max);
				this._value = Math.min(this._value, this._min);
			}
		},
		
		/**
		 * Formats the value of the knob to a string based on the current level of precision.
		 */
		"protected function formatValueLabel",function formatValueLabel()/*:void*/
		{
			var mult/*:Number*/ = Math.pow(10, this._precision);
			var val/*:String*/ = (Math.round(this._value * mult) / mult).toString();
			var parts/*:Array*/ = val.split(".");
			if(parts[1] == null)
			{ 
				if(this._precision > 0)
				{
					val += ".";
				}
				for(var i/*:uint*/ = 0; i < this._precision; i++)
				{
					val += "0";
				}
			}
			else if(parts[1].length < this._precision)
			{
				for(i = 0; i < this._precision - parts[1].length; i++)
				{
					val += "0";
				}
			}
			this._valueLabel.text = val;
			this._valueLabel.draw();
			this._valueLabel.x = this.width / 2 - this._valueLabel.width / 2;
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
			
			this.drawKnob();
			
			this._label.text = this._labelText;
			this._label.draw();
			this._label.x = this._radius - this._label.width / 2;
			this._label.y = 0;
			
			this.formatValueLabel();
			this._valueLabel.x = this._radius - this._valueLabel.width / 2;
			this._valueLabel.y = this._radius * 2 + 20;
			
			this._width = this._radius * 2;
			this._height = this._radius * 2 + 40;
		},
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal handler for when user clicks on the knob. Starts tracking up/down motion of the mouse.
		 */
		"protected function onMouseDown",function onMouseDown(event/*:MouseEvent*/)/*:void*/
		{
			this._startX = this.mouseX;
			this._startY = this.mouseY;
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMouseMove"));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		/**
		 * Internal handler for mouse move event. Updates value based on how far mouse has moved up or down.
		 */
		"protected function onMouseMove",function onMouseMove(event/*:MouseEvent*/)/*:void*/
		{
			if(this._mode == com.bit101.components.Knob.ROTATE)
			{
				var angle/*:Number*/ = Math.atan2(this.mouseY - this._knob.y, this.mouseX - this._knob.x);
				var rot/*:Number*/ = angle * 180 / Math.PI - 135;
				while(rot > 360) rot -= 360;
				while(rot < 0) rot += 360;
				if(rot > 270 && rot < 315) rot = 270;
				if(rot >= 315 && rot <= 360) rot = 0;
				this._value = rot / 270 * (this._max - this._min) + this._min;
				
				this._knob.rotation = rot + 135;
				this.formatValueLabel();
			}
			else if(this._mode == com.bit101.components.Knob.VERTICAL)
			{
				var oldValue/*:Number*/ = this._value;
				var diff/*:Number*/ = this._startY - this.mouseY;
				var range/*:Number*/ = this._max - this._min;
				var percent/*:Number*/ = range / this._mouseRange;
				this._value += percent * diff;
				this.correctValue();
				if(this._value != oldValue)
				{
					this.updateKnob();
					this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
				}
				this._startY = this.mouseY;
			}
			else if(this._mode == com.bit101.components.Knob.HORIZONTAL)
			{
				oldValue = this._value;
				diff = this._startX - this.mouseX;
				range = this._max - this._min;
				percent = range / this._mouseRange;
				this._value -= percent * diff;
				this.correctValue();
				if(this._value != oldValue)
				{
					this.updateKnob();
					this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
				}
				this._startX = this.mouseX;
			}
		},
		
		/**
		 * Internal handler for mouse up event. Stops mouse tracking.
		 */
		"protected function onMouseUp",function onMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMouseMove"));
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onMouseUp"));
		},
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the maximum value of this knob.
		 */
		"public function set maximum",function set$maximum(m/*:Number*/)/*:void*/
		{
			this._max = m;
			this.correctValue();
			this.updateKnob();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._max;
		},
		
		/**
		 * Gets / sets the minimum value of this knob.
		 */
		"public function set minimum",function set$minimum(m/*:Number*/)/*:void*/
		{
			this._min = m;
			this.correctValue();
			this.updateKnob();
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._min;
		},
		
		/**
		 * Sets / gets the current value of this knob.
		 */
		"public function set value",function set$value(v/*:Number*/)/*:void*/
		{
			this._value = v;
			this.correctValue();
			this.updateKnob();
		},
		"public function get value",function get$value()/*:Number*/
		{
			return this._value;
		},
		
		/**
		 * Sets / gets the number of pixels the mouse needs to move to make the value of the knob go from min to max.
		 */
		"public function set mouseRange",function set$mouseRange(value/*:Number*/)/*:void*/
		{
			this._mouseRange = value;
		},
		"public function get mouseRange",function get$mouseRange()/*:Number*/
		{
			return this._mouseRange;
		},
		
		/**
		 * Gets / sets the number of decimals to format the value label.
		 */
		"public function set labelPrecision",function set$labelPrecision(decimals/*:int*/)/*:void*/
		{
			this._precision = decimals;
		},
		"public function get labelPrecision",function get$labelPrecision()/*:int*/
		{
			return this._precision;
		},
		
		/**
		 * Gets / sets whether or not to show the value label.
		 */
		"public function set showValue",function set$showValue(value/*:Boolean*/)/*:void*/
		{
			this._valueLabel.visible = value;
		},
		"public function get showValue",function get$showValue()/*:Boolean*/
		{
			return this._valueLabel.visible;
		},
		
		/**
		 * Gets / sets the text shown in this component's label.
		 */
		"public function set label",function set$label(str/*:String*/)/*:void*/
		{
			this._labelText = str;
			this.draw();
		},
		"public function get label",function get$label()/*:String*/
		{
			return this._labelText;
		},

		"public function set mode",function set$mode(value/*:String*/)/*:void*/
		{
			this._mode = value;
		},
		"public function get mode",function get$mode()/*:String*/
		{
			return this._mode;
		},

        "public function get radius",function get$radius()/*:Number*/
        {
            return this._radius;
        },

        "public function set radius",function set$radius(value/*:Number*/)/*:void*/
        {
            this._radius = value;
            this.invalidate();
        },
    ];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math"]
);