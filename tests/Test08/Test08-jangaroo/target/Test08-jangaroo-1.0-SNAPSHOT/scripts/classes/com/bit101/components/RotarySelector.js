joo.classLoader.prepare(/**
 * RotarySelector.as
 * Keith Peters
 * version 0.9.5
 * 
 * A rotary selector component for choosing among different values.
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
	
	"public class RotarySelector extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},
	
		"public static const",{ ALPHABETIC/*:String*/ : "alphabetic"},
		"public static const",{ NUMERIC/*:String*/ : "numeric"},
		"public static const",{ NONE/*:String*/ : "none"},
		"public static const",{ ROMAN/*:String*/ : "roman"},
		
		
		"protected var",{ _label/*:Label*/: undefined},
		"protected var",{ _labelText/*:String*/ : ""},
		"protected var",{ _knob/*:Sprite*/: undefined},
		"protected var",{ _numChoices/*:int*/ : 2},
		"protected var",{ _choice/*:Number*/ : 0},
		"protected var",{ _labels/*:Sprite*/: undefined},
		"protected var",{ _labelMode/*:String*/ :function(){return( com.bit101.components.RotarySelector.ALPHABETIC);}},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this CheckBox.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label String containing the label for this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		"public function RotarySelector",function $RotarySelector(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, label/*:String = ""*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}label = "";}defaultHandler = null;}
			this._labelText = label;
			this[$super](parent, xpos, ypos);this._labelMode=this._labelMode();
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
			this.setSize(60, 60);
		},
		
		/**
		 * Creates the children for this component
		 */
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._knob = new flash.display.Sprite();
			this._knob.buttonMode = true;
			this._knob.useHandCursor = true;
			this.addChild(this._knob);
			
			this._label = new com.bit101.components.Label();
			this._label.autoSize = true;
			this.addChild(this._label);
			
			this._labels = new flash.display.Sprite();
			this.addChild(this._labels);
			
			this._knob.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onClick"));
		},
		
		/**
		 * Decrements the index of the current choice.
		 */
		"protected function decrement",function decrement()/*:void*/
		{
			if(this._choice > 0)
			{
				this._choice--;
				this.draw();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},
		
		/**
		 * Increments the index of the current choice.
		 */
		"protected function increment",function increment()/*:void*/
		{
			if(this._choice < this._numChoices - 1)
			{
				this._choice++;
				this.draw();
				this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			}
		},
		
		/**
		 * Removes old labels.
		 */
		"protected function resetLabels",function resetLabels()/*:void*/
		{
			while(this._labels.numChildren > 0)
			{
				this._labels.removeChildAt(0);
			}
			this._labels.x = this._width / 2 - 5;
			this._labels.y = this._height / 2 - 10;
		},
		
		/**
		 * Draw the knob at the specified radius.
		 * @param radius The radius with which said knob will be drawn.
		 */
		"protected function drawKnob",function drawKnob(radius/*:Number*/)/*:void*/
		{
			this._knob.graphics.clear();
			this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
			this._knob.graphics.drawCircle(0, 0, radius);
			this._knob.graphics.endFill();
			
			this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
			this._knob.graphics.drawCircle(0, 0, radius - 2);
			
			this._knob.x = this._width / 2;
			this._knob.y = this._height / 2;
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
			
			var radius/*:Number*/ = Math.min(this._width, this._height) / 2;
			this.drawKnob(radius);
			this.resetLabels();
			
			var arc/*:Number*/ = Math.PI * 1.5 / this._numChoices; // the angle between each choice
			var start/*:Number*/ = - Math.PI / 2 - arc * (this._numChoices - 1) / 2; // the starting angle for choice 0
			
			this.graphics.clear();
			this.graphics.lineStyle(4, com.bit101.components.Style.BACKGROUND, .5);
			for(var i/*:int*/ = 0; i < this._numChoices; i++)
			{
				var angle/*:Number*/ = start + arc * i;
				var sin/*:Number*/ = Math.sin(angle);
				var cos/*:Number*/ = Math.cos(angle);
				
				this.graphics.moveTo(this._knob.x, this._knob.y);
				this.graphics.lineTo(this._knob.x + cos * (radius + 2), this._knob.y + sin * (radius + 2));
				
				var lab/*:Label*/ = new com.bit101.components.Label(this._labels, cos * (radius + 10), sin * (radius + 10));
				lab.mouseEnabled = true;
				lab.buttonMode = true;
				lab.useHandCursor = true;
				lab.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onLabelClick"));
				if(this._labelMode == com.bit101.components.RotarySelector.ALPHABETIC)
				{
					lab.text = String.fromCharCode(65 + i);
				}
				else if(this._labelMode == com.bit101.components.RotarySelector.NUMERIC)
				{
					lab.text = (i + 1).toString();
				}
				else if(this._labelMode == com.bit101.components.RotarySelector.ROMAN)
				{
					var chars/*:Array*/ = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
					lab.text = chars[i];
				}
				if(i != this._choice)
				{
					lab.alpha = 0.5;
				}
			}
			
			angle = start + arc * this._choice;
			this.graphics.lineStyle(4, com.bit101.components.Style.LABEL_TEXT);
			this.graphics.moveTo(this._knob.x, this._knob.y);
			this.graphics.lineTo(this._knob.x + Math.cos(angle) * (radius + 2), this._knob.y + Math.sin(angle) * (radius + 2));
			
			
			this._label.text = this._labelText;
			this._label.draw();
			this._label.x = this._width / 2 - this._label.width / 2;
			this._label.y = this._height + 2;
		},
		
		
		
		///////////////////////////////////
		// event handler
		///////////////////////////////////
		
		/**
		 * Internal click handler.
		 * @param event The MouseEvent passed by the system.
		 */
		"protected function onClick",function onClick(event/*:MouseEvent*/)/*:void*/
		{
			if(this.mouseX < this._width / 2)
			{
				this.decrement();
			}
			else 
			{
				this.increment();
			}
		},
		
		"protected function onLabelClick",function onLabelClick(event/*:Event*/)/*:void*/
		{
			var lab/*:Label*/ = event.target/*as Label*/;
			this.choice = this._labels.getChildIndex(lab);
		},
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the number of available choices (maximum of 10).
		 */
		"public function set numChoices",function set$numChoices(value/*:uint*/)/*:void*/
		{
			this._numChoices = Math.min(value, 10);
			this.draw();
		},
		"public function get numChoices",function get$numChoices()/*:uint*/
		{
			return this._numChoices;
		},
		
		/**
		 * Gets / sets the current choice, keeping it in range of 0 to numChoices - 1.
		 */
		"public function set choice",function set$choice(value/*:uint*/)/*:void*/
		{
			this._choice = Math.max(0, Math.min(this._numChoices - 1, value));
			this.draw();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
		},
		"public function get choice",function get$choice()/*:uint*/
		{
			return this._choice;
		},
		
		/**
		 * Specifies what will be used as labels for each choice. Valid values are "alphabetic", "numeric", and "none".
		 */
		"public function set labelMode",function set$labelMode(value/*:String*/)/*:void*/
		{
			this._labelMode = value;
			this.draw();
		},
		"public function get labelMode",function get$labelMode()/*:String*/
		{
			return this._labelMode;
		},
	];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","com.bit101.components.Label","flash.events.MouseEvent","com.bit101.components.Style","Math","String"]
);