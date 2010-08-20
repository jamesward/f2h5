joo.classLoader.prepare(/**
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
 
"package com.bit101.components",/*
{
	import flash.display.Bitmap
	import flash.display.BitmapData
	import flash.display.BlendMode
	import flash.display.DisplayObject
	import flash.display.DisplayObjectContainer
	import flash.display.GradientType
	import flash.display.Graphics
	import flash.display.InterpolationMethod
	import flash.display.SpreadMethod
	import flash.display.Sprite
	import flash.display.Stage
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.geom.Matrix
	import flash.geom.Point*/
	
	"public class ColorChooser extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.InputText,flash.display.Sprite,flash.display.InterpolationMethod,Math,flash.events.MouseEvent,flash.display.BlendMode,flash.display.BitmapData,flash.display.Bitmap,flash.geom.Matrix,flash.display.SpreadMethod,flash.display.GradientType,flash.events.Event,flash.geom.Point);},
	
		"public static const",{ TOP/*:String*/ : "top"},
		"public static const",{ BOTTOM/*:String*/ : "bottom"},
		
		"protected var",{ _colors/*:BitmapData*/: undefined},
		"protected var",{ _colorsContainer/*:Sprite*/: undefined},
		"protected var",{ _defaultModelColors/*:Array*/:function(){return([0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000,0xFFFFFF,0x000000]);}},
		"protected var",{ _input/*:InputText*/: undefined},
		"protected var",{ _model/*:DisplayObject*/: undefined},
		"protected var",{ _oldColorChoice/*:uint*/ :function(){return( this._value);}},
		"protected var",{ _popupAlign/*:String*/ :function(){return( com.bit101.components.ColorChooser.BOTTOM);}},
		"protected var",{ _stage/*:Stage*/: undefined},
		"protected var",{ _swatch/*:Sprite*/: undefined},
		"protected var",{ _tmpColorChoice/*:uint*/ :function(){return( this._value);}},
		"protected var",{ _usePopup/*:Boolean*/ : false},
		"protected var",{ _value/*:uint*/ : 0xff0000},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this ColorChooser.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param value The initial color value of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (change in this case).
		 */
		
		"public function ColorChooser",function $ColorChooser(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/, value/*:uint = 0xff0000*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}value = 0xff0000;}defaultHandler = null;}
			this._oldColorChoice = this._tmpColorChoice = this._value = value;
			
			this[$super](parent, xpos, ypos);this._defaultModelColors=this._defaultModelColors();this._oldColorChoice=this._oldColorChoice();this._popupAlign=this._popupAlign();this._tmpColorChoice=this._tmpColorChoice();
			
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

			this._width = 65;
			this._height = 15;
			this.value = this._value;
		},
		
		"override protected function addChildren",function addChildren()/*:void*/
		{
			this._input = new com.bit101.components.InputText();
			this._input.width = 45;
			this._input.restrict = "0123456789ABCDEFabcdef";
			this._input.maxChars = 6;
			this.addChild(this._input);
			this._input.addEventListener(flash.events.Event.CHANGE, $$bound(this,"onChange"));
			
			this._swatch = new flash.display.Sprite();
			this._swatch.x = 50;
			this._swatch.filters = [this.getShadow(2, true)];
			this.addChild(this._swatch);
			
			this._colorsContainer = new flash.display.Sprite();
			this._colorsContainer.addEventListener(flash.events.Event.ADDED_TO_STAGE, $$bound(this,"onColorsAddedToStage"));
			this._colorsContainer.addEventListener(flash.events.Event.REMOVED_FROM_STAGE, $$bound(this,"onColorsRemovedFromStage"));
			this._model = this.getDefaultModel();
			this.drawColors(this._model);
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
			this._swatch.graphics.clear();
			this._swatch.graphics.beginFill(this._value);
			this._swatch.graphics.drawRect(0, 0, 16, 16);
			this._swatch.graphics.endFill();
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Internal change handler.
		 * @param event The Event passed by the system.
		 */
		"protected function onChange",function onChange(event/*:Event*/)/*:void*/
		{
			event.stopImmediatePropagation();
			this._value = parseInt("0x" + this._input.text, 16);
			this._input.text = this._input.text.toUpperCase();
			this._oldColorChoice = this.value;
			this.invalidate();
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			
		},	
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the color value of this ColorChooser.
		 */
		"public function set value",function set$value(n/*:uint*/)/*:void*/
		{
			var str/*:String*/ = n.toString(16).toUpperCase();
			while(str.length < 6)
			{
				str = "0" + str;
			}
			this._input.text = str;
			this._value = parseInt("0x" + this._input.text, 16);
			this.invalidate();
		},
		"public function get value",function get$value()/*:uint*/
		{
			return this._value;
		},
		
		///////////////////////////////////
		// COLOR PICKER MODE SUPPORT
		///////////////////////////////////}
		
		
		"public function get model",function get$model()/*:DisplayObject*/ { return this._model; },
		"public function set model",function set$model(value/*:DisplayObject*/)/*:void*/ 
		{
			this._model = value;
			if (this._model!=null) {
				this.drawColors(this._model);
				if (!this.usePopup) this.usePopup = true;
			} else {
				this._model = this.getDefaultModel();
				this.drawColors(this._model);
				this.usePopup = false;
			}
		},
		
		"protected function drawColors",function drawColors(d/*:DisplayObject*/)/*:void*/{
			this._colors = new flash.display.BitmapData(d.width, d.height);
			this._colors.draw(d);
			while (this._colorsContainer.numChildren) this._colorsContainer.removeChildAt(0);
			this._colorsContainer.addChild(new flash.display.Bitmap(this._colors));
			this.placeColors();
		},
		
		"public function get popupAlign",function get$popupAlign()/*:String*/ { return this._popupAlign; },
		"public function set popupAlign",function set$popupAlign(value/*:String*/)/*:void*/ {
			this._popupAlign = value;
			this.placeColors();
		},
		
		"public function get usePopup",function get$usePopup()/*:Boolean*/ { return this._usePopup; },
		"public function set usePopup",function set$usePopup(value/*:Boolean*/)/*:void*/ {
			this._usePopup = value;
			
			this._swatch.buttonMode = true;
			this._colorsContainer.buttonMode = true;
			this._colorsContainer.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"browseColorChoice"));
			this._colorsContainer.addEventListener(flash.events.MouseEvent.MOUSE_OUT, $$bound(this,"backToColorChoice"));
			this._colorsContainer.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"setColorChoice"));
			this._swatch.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onSwatchClick"));
			
			if (!this._usePopup) {
				this._swatch.buttonMode = false;
				this._colorsContainer.buttonMode = false;
				this._colorsContainer.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, $$bound(this,"browseColorChoice"));
				this._colorsContainer.removeEventListener(flash.events.MouseEvent.MOUSE_OUT, $$bound(this,"backToColorChoice"));
				this._colorsContainer.removeEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"setColorChoice"));
				this._swatch.removeEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onSwatchClick"));
			}
		},
		
		/**
		 * The color picker mode Handlers 
		 */
		
		"protected function onColorsRemovedFromStage",function onColorsRemovedFromStage(e/*:Event*/)/*:void*/ {
			this._stage.removeEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onStageClick"));
		},
		
		"protected function onColorsAddedToStage",function onColorsAddedToStage(e/*:Event*/)/*:void*/ {
			this._stage = this.stage;
			this._stage.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onStageClick"));
		},
		
		"protected function onStageClick",function onStageClick(e/*:MouseEvent*/)/*:void*/ {
			this.displayColors();
		},
		 
		
		"protected function onSwatchClick",function onSwatchClick(event/*:MouseEvent*/)/*:void*/ 
		{
			event.stopImmediatePropagation();
			this.displayColors();
		},
		
		"protected function backToColorChoice",function backToColorChoice(e/*:MouseEvent*/)/*:void*/ 
		{
			this.value = this._oldColorChoice;
		},
		
		"protected function setColorChoice",function setColorChoice(e/*:MouseEvent*/)/*:void*/ {
			this.value = this._colors.getPixel(this._colorsContainer.mouseX, this._colorsContainer.mouseY);
			this._oldColorChoice = this.value;
			this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
			this.displayColors();
		},
		
		"protected function browseColorChoice",function browseColorChoice(e/*:MouseEvent*/)/*:void*/ 
		{
			this._tmpColorChoice = this._colors.getPixel(this._colorsContainer.mouseX, this._colorsContainer.mouseY);
			this.value = this._tmpColorChoice;
		},

		/**
		 * The color picker mode Display functions
		 */
		
		"protected function displayColors",function displayColors()/*:void*/ 
		{
			this.placeColors();
			if (this._colorsContainer.parent) this._colorsContainer.parent.removeChild(this._colorsContainer);
			else this.stage.addChild(this._colorsContainer);
		},		
		
		"protected function placeColors",function placeColors()/*:void*/{
			var point/*:Point*/ = new flash.geom.Point(this.x, this.y);
			if(this.parent) point = this.parent.localToGlobal(point);
			switch (this._popupAlign)
			{
				case com.bit101.components.ColorChooser.TOP : 
					this._colorsContainer.x = point.x;
					this._colorsContainer.y = point.y - this._colorsContainer.height - 4;
				break;
				case com.bit101.components.ColorChooser.BOTTOM : 
					this._colorsContainer.x = point.x;
					this._colorsContainer.y = point.y + 22;
				break;
				default: 
					this._colorsContainer.x = point.x;
					this._colorsContainer.y = point.y + 22;
				break;
			}
		},
		
		/**
		 * Create the default gradient Model
		 */

		"protected function getDefaultModel",function getDefaultModel()/*:Sprite*/ {	
			var w/*:Number*/ = 100;
			var h/*:Number*/ = 100;
			var bmd/*:BitmapData*/ = new flash.display.BitmapData(w, h);
			
			var g1/*:Sprite*/ = this.getGradientSprite(w, h, this._defaultModelColors);
			bmd.draw(g1);
					
			var blendmodes/*:Array*/ = [flash.display.BlendMode.MULTIPLY,flash.display.BlendMode.ADD];
			var nb/*:int*/ = blendmodes.length;
			var g2/*:Sprite*/ = this.getGradientSprite(h/nb, w, [0xFFFFFF, 0x000000]);		
			
			for (var i/*:int*/ = 0; i < nb; i++) {
				var blendmode/*:String*/ = blendmodes[i];
				var m/*:Matrix*/ = new flash.geom.Matrix();
				m.rotate(-Math.PI / 2);
				m.translate(0, h / nb * i + h/nb);
				bmd.draw(g2, m, null,blendmode);
			}
			
			var s/*:Sprite*/ = new flash.display.Sprite();
			var bm/*:Bitmap*/ = new flash.display.Bitmap(bmd);
			s.addChild(bm);
			return(s);
		},
		
		"protected function getGradientSprite",function getGradientSprite(w/*:Number*/, h/*:Number*/, ca/*:Array*/)/*:Sprite*/ 
		{
			var gc/*:Array*/ = ca;
			var gs/*:Sprite*/ = new flash.display.Sprite();
			var g/*:Graphics*/ = gs.graphics;
			var gn/*:int*/ = gc.length;
			var ga/*:Array*/ = [];
			var gr/*:Array*/ = [];
			var gm/*:Matrix*/ = new flash.geom.Matrix(); gm.createGradientBox(w, h, 0, 0, 0);
			for (var i/*:int*/ = 0; i < gn; i++) { ga.push(1); gr.push(0x00 + 0xFF / (gn - 1) * i); }
			g.beginGradientFill(flash.display.GradientType.LINEAR, gc, ga, gr, gm, flash.display.SpreadMethod.PAD,flash.display.InterpolationMethod.RGB);
			g.drawRect(0, 0, w, h);
			g.endFill();	
			return(gs);
		},
	];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.InputText","flash.display.Sprite","flash.display.BitmapData","flash.display.Bitmap","flash.events.MouseEvent","flash.geom.Point","flash.display.BlendMode","flash.geom.Matrix","Math","flash.display.GradientType","flash.display.SpreadMethod","flash.display.InterpolationMethod"]
);