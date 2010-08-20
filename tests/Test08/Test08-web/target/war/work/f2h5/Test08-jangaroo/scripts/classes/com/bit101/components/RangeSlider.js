joo.classLoader.prepare(/**
 * RangeSlider.as
 * Keith Peters
 * version 0.9.5
 * 
 * Abstract base class for HRangeSlider and VRangeSlider.
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
	import flash.events.MouseEvent
	import flash.geom.Rectangle*/
	
	"public class RangeSlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},
	
		"protected var",{ _back/*:Sprite*/: undefined},
		"protected var",{ _highLabel/*:Label*/: undefined},
		"protected var",{ _highValue/*:Number*/ : 100},
		"protected var",{ _labelMode/*:String*/ :function(){return( com.bit101.components.RangeSlider.ALWAYS);}},
		"protected var",{ _labelPosition/*:String*/: undefined},
		"protected var",{ _labelPrecision/*:int*/ : 0},
		"protected var",{ _lowLabel/*:Label*/: undefined},
		"protected var",{ _lowValue/*:Number*/ : 0},
		"protected var",{ _maximum/*:Number*/ : 100},
		"protected var",{ _maxHandle/*:Sprite*/: undefined},
		"protected var",{ _minimum/*:Number*/ : 0},
		"protected var",{ _minHandle/*:Sprite*/: undefined},
		"protected var",{ _orientation/*:String*/ :function(){return( com.bit101.components.RangeSlider.VERTICAL);}},
		"protected var",{ _tick/*:Number*/ : 1},
		
		"public static const",{ ALWAYS/*:String*/ : "always"},
		"public static const",{ BOTTOM/*:String*/ : "bottom"},
		"public static const",{ HORIZONTAL/*:String*/ : "horizontal"},
		"public static const",{ LEFT/*:String*/ : "left"},
		"public static const",{ MOVE/*:String*/ : "move"},
		"public static const",{ NEVER/*:String*/ : "never"},
		"public static const",{ RIGHT/*:String*/ : "right"},
		"public static const",{ TOP/*:String*/ : "top"},
		"public static const",{ VERTICAL/*:String*/ : "vertical"},
		
		
		
		/**
		 * Constructor
		 * @param orientation Whether the slider will be horizontal or vertical.
		 * @param parent The parent DisplayObjectContainer on which to add this Slider.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function RangeSlider",function $RangeSlider(orientation/*:String*/, parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler = null;}
			this._orientation = orientation;
			this[$super](parent, xpos, ypos);this._labelMode=this._labelMode();this._orientation=this._orientation();
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.CHANGE, defaultHandler);
			}
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/*:void*/
		{
			this[$init]();
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this.setSize(110, 10);
				this._labelPosition = com.bit101.components.RangeSlider.TOP;
			}
			else
			{
				this.setSize(10, 110);
				this._labelPosition = com.bit101.components.RangeSlider.RIGHT;
			}
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._back = new flash.display.Sprite();
			this._back.filters = [this.getShadow(2, true)];
			this.addChild(this._back);
			
			this._minHandle = new flash.display.Sprite();
			this._minHandle.filters = [this.getShadow(1)];
			this._minHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onDragMin"));
			this._minHandle.buttonMode = true;
			this._minHandle.useHandCursor = true;
			this.addChild(this._minHandle);
			
			this._maxHandle = new flash.display.Sprite();
			this._maxHandle.filters = [this.getShadow(1)];
			this._maxHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, $$bound(this,"onDragMax"));
			this._maxHandle.buttonMode = true;
			this._maxHandle.useHandCursor = true;
			this.addChild(this._maxHandle);			
			
			this._lowLabel = new com.bit101.components.Label(this);
			this._highLabel = new com.bit101.components.Label(this);
			this._lowLabel.visible = (this._labelMode == com.bit101.components.RangeSlider.ALWAYS);
		},
		
		/**
		 * Draws the back of the slider.
		 */
		"protected function drawBack",function drawBack()/*:void*/
		{
			this._back.graphics.clear();
			this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._back.graphics.drawRect(0, 0, this._width, this._height);
			this._back.graphics.endFill();
		},
		
		/**
		 * Draws the handles of the slider.
		 */
		"protected function drawHandles",function drawHandles()/*:void*/
		{	
			this._minHandle.graphics.clear();
			this._minHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._maxHandle.graphics.clear();
			this._maxHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this._minHandle.graphics.drawRect(1, 1, this._height - 2, this._height - 2);
				this._maxHandle.graphics.drawRect(1, 1, this._height - 2, this._height - 2);
			}
			else
			{
				this._minHandle.graphics.drawRect(1, 1, this._width - 2, this._width - 2);
				this._maxHandle.graphics.drawRect(1, 1, this._width - 2, this._width - 2);
			}
			this._minHandle.graphics.endFill();
			this.positionHandles();
		},
		
		/**
		 * Adjusts positions of handles when value, maximum or minimum have changed.
		 * TODO: Should also be called when slider is resized.
		 */
		"protected function positionHandles",function positionHandles()/*:void*/
		{
			var range/*:Number*/;
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				range = this._width - this._height * 2;
				this._minHandle.x = (this._lowValue - this._minimum) / (this._maximum - this._minimum) * range;
				this._maxHandle.x = this._height + (this._highValue - this._minimum) / (this._maximum - this._minimum) * range;
			}
			else
			{
				range = this._height - this._width * 2;
				this._minHandle.y = this._height - this._width - (this._lowValue - this._minimum) / (this._maximum - this._minimum) * range;
				this._maxHandle.y = this._height - this._width * 2 - (this._highValue - this._minimum) / (this._maximum - this._minimum) * range;
			}
			this.updateLabels();
		},
		
		/**
		 * Sets the text and positions the labels.
		 */
		"protected function updateLabels",function updateLabels()/*:void*/
		{
			this._lowLabel.text = this.getLabelForValue(this.lowValue);
			this._highLabel.text = this.getLabelForValue(this.highValue);
			this._lowLabel.draw();
			this._highLabel.draw();

			if(this._orientation == com.bit101.components.RangeSlider.VERTICAL)
			{
				this._lowLabel.y = this._minHandle.y + (this._width - this._lowLabel.height) * 0.5;
				this._highLabel.y = this._maxHandle.y + (this._width - this._highLabel.height) * 0.5;
				if(this._labelPosition == com.bit101.components.RangeSlider.LEFT)
				{
					this._lowLabel.x = -this._lowLabel.width - 5;
					this._highLabel.x = -this._highLabel.width - 5;
				}
				else
				{
					this._lowLabel.x = this._width + 5;
					this._highLabel.x = this._width + 5;
				}
			}
			else
			{
				this._lowLabel.x = this._minHandle.x - this._lowLabel.width + this._height;
				this._highLabel.x = this._maxHandle.x;
				if(this._labelPosition == com.bit101.components.RangeSlider.BOTTOM)
				{
					this._lowLabel.y = this._height + 2;
					this._highLabel.y = this._height + 2;
				}
				else
				{
					this._lowLabel.y = -this._lowLabel.height;
					this._highLabel.y = -this._highLabel.height;
				}
				
			}
		},

		/**
		 * Generates a label string for the given value.
		 * @param value The number to create a label for.
		 */
		"protected function getLabelForValue",function getLabelForValue(value/*:Number*/)/*:String*/
		{
			var str/*:String*/ = (Math.round(value * Math.pow(10, this._labelPrecision)) / Math.pow(10, this._labelPrecision)).toString();
			if(this._labelPrecision > 0)
			{
				var decimal/*:String*/ = str.split(".")[1] || "";
				if(decimal.length == 0) str += ".";
				for(var i/*:int*/ = decimal.length; i < this._labelPrecision; i++)
				{
					str += "0";
				}
			}
			return str;
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
			this.drawBack();
			this.drawHandles();
		},
		

		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal mouseDown handler for the low value handle. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onDragMin",function onDragMin(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMinSlide"));
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this._minHandle.startDrag(false, new flash.geom.Rectangle(0, 0, this._maxHandle.x - this._height, 0));
			}
			else
			{
				this._minHandle.startDrag(false, new flash.geom.Rectangle(0, this._maxHandle.y + this._width, 0, this._height - this._maxHandle.y - this._width * 2));
			}
			if(this._labelMode == com.bit101.components.RangeSlider.MOVE)
			{
				this._lowLabel.visible = true;
				this._highLabel.visible = true;
			}
		},
		
		/**
		 * Internal mouseDown handler for the high value handle. Starts dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onDragMax",function onDragMax(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMaxSlide"));
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this._maxHandle.startDrag(false, new flash.geom.Rectangle(this._minHandle.x + this._height, 0, this._width - this._height - this._minHandle.x - this._height, 0));
			}
			else
			{
				this._maxHandle.startDrag(false, new flash.geom.Rectangle(0, 0, 0, this._minHandle.y - this._width));
			}
			if(this._labelMode == com.bit101.components.RangeSlider.MOVE)
			{
				this._lowLabel.visible = true;
				this._highLabel.visible = true;
			}
		},
		
		/**
		 * Internal mouseUp handler. Stops dragging the handle.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onDrop",function onDrop(event/*:MouseEvent*/)/*:void*/
		{
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onDrop"));
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMinSlide"));
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"onMaxSlide"));
			this.stopDrag();
			if(this._labelMode == com.bit101.components.RangeSlider.MOVE)
			{
				this._lowLabel.visible = false;
				this._highLabel.visible = false;
			}
		},
		
		/**
		 * Internal mouseMove handler for when the low value handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMinSlide",function onMinSlide(event/*:MouseEvent*/)/*:void*/
		{
			var oldValue/*:Number*/ = this._lowValue;
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this._lowValue = this._minHandle.x / (this._width - this._height * 2) * (this._maximum - this._minimum) + this._minimum;
			}
			else
			{
				this._lowValue = (this._height - this._width - this._minHandle.y) / (this.height - this._width * 2) * (this._maximum - this._minimum) + this._minimum;
			}
			if(this._lowValue != oldValue)
			{
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
			this.updateLabels();
		},

		/**
		 * Internal mouseMove handler for when the high value handle is being moved.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onMaxSlide",function onMaxSlide(event/*:MouseEvent*/)/*:void*/
		{
			var oldValue/*:Number*/ = this._highValue;
			if(this._orientation == com.bit101.components.RangeSlider.HORIZONTAL)
			{
				this._highValue = (this._maxHandle.x - this._height) / (this._width - this._height * 2) * (this._maximum - this._minimum) + this._minimum;
			}
			else
			{
				this._highValue = (this._height - this._width * 2 - this._maxHandle.y) / (this._height - this._width * 2) * (this._maximum - this._minimum) + this._minimum;
			}
			if(this._highValue != oldValue)
			{
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
			this.updateLabels();
		},
		
		/**
		 * Gets / sets the minimum value of the slider.
		 */
		"public function set minimum",function set$minimum(value/*:Number*/)/*:void*/
		{
			this._minimum = value;
			this._maximum = Math.max(this._maximum, this._minimum);
			this._lowValue = Math.max(this._lowValue, this._minimum);
			this._highValue = Math.max(this._highValue, this._minimum);
			this.positionHandles();
		},
		"public function get minimum",function get$minimum()/*:Number*/
		{
			return this._minimum;
		},

		/**
		 * Gets / sets the maximum value of the slider.
		 */
		"public function set maximum",function set$maximum(value/*:Number*/)/*:void*/
		{
			this._maximum = value;
			this._minimum = Math.min(this._minimum, this._maximum);
			this._lowValue = Math.min(this._lowValue, this._maximum);
			this._highValue = Math.min(this._highValue, this._maximum);
			this.positionHandles();
		},
		"public function get maximum",function get$maximum()/*:Number*/
		{
			return this._maximum;
		},

		/**
		 * Gets / sets the low value of this slider.
		 */
		"public function set lowValue",function set$lowValue(value/*:Number*/)/*:void*/
		{
			this._lowValue = value;
			this._lowValue = Math.min(this._lowValue, this._highValue);
			this._lowValue = Math.max(this._lowValue, this._minimum);
			this.positionHandles();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		"public function get lowValue",function get$lowValue()/*:Number*/
		{
			return Math.round(this._lowValue / this._tick) * this._tick;
		},

		/**
		 * Gets / sets the high value for this slider.
		 */
		"public function set highValue",function set$highValue(value/*:Number*/)/*:void*/
		{
			this._highValue = value;
			this._highValue = Math.max(this._highValue, this._lowValue);
			this._highValue = Math.min(this._highValue, this._maximum);
			this.positionHandles();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		"public function get highValue",function get$highValue()/*:Number*/
		{
			return Math.round(this._highValue / this._tick) * this._tick;
		},

		/**
		 * Sets / gets when the labels will appear. Can be "never", "move", or "always"
		 */
		"public function set labelMode",function set$labelMode(value/*:String*/)/*:void*/
		{
			this._labelMode = value;
			this._highLabel.visible = (this._labelMode == com.bit101.components.RangeSlider.ALWAYS);
			this._lowLabel.visible = (this._labelMode == com.bit101.components.RangeSlider.ALWAYS);
		},
		"public function get labelMode",function get$labelMode()/*:String*/
		{
			return this._labelMode;
		},

		/**
		 * Sets / gets where the labels will appear. "left" or "right" for vertical sliders, "top" or "bottom" for horizontal.
		 */
		"public function set labelPosition",function set$labelPosition(value/*:String*/)/*:void*/
		{
			this._labelPosition = value;
			this.updateLabels();
		},
		"public function get labelPosition",function get$labelPosition()/*:String*/
		{
			return this._labelPosition;
		},

		/**
		 * Sets / gets how many decimal points of precisions will be displayed on the labels.
		 */
		"public function set labelPrecision",function set$labelPrecision(value/*:int*/)/*:void*/
		{
			this._labelPrecision = value;
			this.updateLabels();
		},
		"public function get labelPrecision",function get$labelPrecision()/*:int*/
		{
			return this._labelPrecision;
		},

		/**
		 * Gets / sets the tick value of this slider. This round the value to the nearest multiple of this number. 
		 */
		"public function set tick",function set$tick(value/*:Number*/)/*:void*/
		{
			this._tick = value;
			this.updateLabels();
		},
		"public function get tick",function get$tick()/*:Number*/
		{
			return this._tick;
		},


	];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);