joo.classLoader.prepare(/**
 * WheelMenu.as
 * Keith Peters
 * version 0.9.5
 * 
 * A radial menu that pops up around the mouse.
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
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.filters.DropShadowFilter*/

	"public class WheelMenu extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init';return[function(){joo.classLoader.init(flash.filters.DropShadowFilter,com.bit101.components.ArcButton,Math,Array,flash.events.MouseEvent,flash.events.Event);},
	
		"protected var",{ _borderColor/*:uint*/ : 0xcccccc},
		"protected var",{ _buttons/*:Array*/: undefined},
		"protected var",{ _color/*:uint*/ : 0xffffff},
		"protected var",{ _highlightColor/*:uint*/ : 0xeeeeee},
		"protected var",{ _iconRadius/*:Number*/: undefined},
		"protected var",{ _innerRadius/*:Number*/: undefined},
		"protected var",{ _items/*:Array*/: undefined},
		"protected var",{ _numButtons/*:int*/: undefined},
		"protected var",{ _outerRadius/*:Number*/: undefined},
		"protected var",{ _selectedIndex/*:int*/ : -1},
		"protected var",{ _startingAngle/*:Number*/ : -90},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param numButtons The number of segments in the menu
		 * @param outerRadius The radius of the menu as a whole.
		 * @parem innerRadius The radius of the inner circle at the center of the menu.
		 * @param defaultHandler The event handling function to handle the default event for this component (select in this case).
		 */
		"public function WheelMenu",function $WheelMenu(parent/*:DisplayObjectContainer*/, numButtons/*:int*/, outerRadius/*:Number = 80*/, iconRadius/*:Number = 60*/, innerRadius/*:Number = 10*/, defaultHandler/*:Function = null*/)
		{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){outerRadius = 80;}iconRadius = 60;}innerRadius = 10;}defaultHandler = null;}
			this._numButtons = numButtons;
			this._outerRadius = outerRadius;
			this._iconRadius = iconRadius;
			this._innerRadius = innerRadius;
			this.addEventListener(flash.events.Event.ADDED_TO_STAGE, $$bound(this,"onAddedToStage"));
			this[$super](parent);
			
			if(defaultHandler != null)
			{
				this.addEventListener(flash.events.Event.SELECT, defaultHandler);
			}
		},
			
		///////////////////////////////////
		// protected methods
		///////////////////////////////////
		
		/**
		 * Initializes the component.
		 */
		"override protected function init",function init()/*:void*/
		{
			this[$init]();
			this._items = new Array();
			this.makeButtons();

			this.filters = [new flash.filters.DropShadowFilter(4, 45, 0, 1, 4, 4, .2, 4)];
		},
		
		/**
		 * Creates the buttons that make up the wheel menu.
		 */
		"protected function makeButtons",function makeButtons()/*:void*/
		{
			this._buttons = new Array();
			for(var i/*:int*/ = 0; i < this._numButtons; i++)
			{
				var btn/*:ArcButton*/ = new com.bit101.components.ArcButton(Math.PI * 2 / this._numButtons, this._outerRadius, this._iconRadius, this._innerRadius);
				btn.id = i;
				btn.rotation = this._startingAngle + 360 / this._numButtons * i;
				btn.addEventListener(flash.events.Event.SELECT, $$bound(this,"onSelect"));
				this.addChild(btn);
				this._buttons.push(btn);
			}
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Hides the menu.
		 */
		"public function hide",function hide()/*:void*/
		{
			this.visible = false;
			if(this.stage != null)
			{
				this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onStageMouseUp"));
			}
		},
		
		/**
		 * Sets the icon / text and data for a specific menu item.
		 * @param index The index of the item to set icon/text and data for.
		 * @iconOrLabel Either a display object instance, a class that extends DisplayObject, or text to show in a label.
		 * @data Any data to associate with the item.
		 */
		"public function setItem",function setItem(index/*:int*/, iconOrLabel/*:Object*/, data/*:Object = null*/)/*:void*/
		{if(arguments.length<3){data = null;}
			this._buttons[index].setIcon(iconOrLabel);
			this._items[index] = data;
		},
		
		/**
		 * Shows the menu - placing it on top level of parent and centering around mouse.
		 */
		"public function show",function show()/*:void*/
		{
			this.parent.addChild(this);
			this.x = Math.round(this.parent.mouseX);
			this.y = Math.round(this.parent.mouseY);
			this._selectedIndex = -1;
			this.visible = true;
			this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onStageMouseUp"), true);
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when the component is added to the stage. Adds mouse listeners to the stage.
		 */
		"protected function onAddedToStage",function onAddedToStage(event/*:Event*/)/*:void*/
		{
			this.hide();
			this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE, $$bound(this,"onRemovedFromStage"));
		},
		
		/**
		 * Called when the component is removed from the stage. Removes mouse listeners from stage.
		 */
		"protected function onRemovedFromStage",function onRemovedFromStage(event/*:Event*/)/*:void*/
		{
			this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, $$bound(this,"onStageMouseUp"));
			this.removeEventListener(flash.events.Event.REMOVED_FROM_STAGE, $$bound(this,"onRemovedFromStage"));
		},
		
		/**
		 * Called when one of the buttons is selected. Sets selected index and dispatches select event.
		 */
		"protected function onSelect",function onSelect(event/*:Event*/)/*:void*/
		{
			this._selectedIndex = event.target.id;
			this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
		},
		
		/**
		 * Called when mouse is released. Hides menu.
		 */
		"protected function onStageMouseUp",function onStageMouseUp(event/*:MouseEvent*/)/*:void*/
		{
			this.hide();
		},
		
		///////////////////////////////////
		// getter / setters
		///////////////////////////////////
		
		/**
		 * Gets / sets the color of the border around buttons.
		 */
		"public function set borderColor",function set$borderColor(value/*:uint*/)/*:void*/
		{
			this._borderColor = value;
			for(var i/*:int*/ = 0; i < this._numButtons; i++)
			{
				this._buttons[i].borderColor = this._borderColor;
			}
		},
		"public function get borderColor",function get$borderColor()/*:uint*/
		{
			return this._borderColor;
		},
		
		/**
		 * Gets / sets the base color of buttons.
		 */
		"public function set color",function set$color(value/*:uint*/)/*:void*/
		{
			this._color = value;
			for(var i/*:int*/ = 0; i < this._numButtons; i++)
			{
				this._buttons[i].color = this._color;
			}
		},
		"public function get color",function get$color()/*:uint*/
		{
			return this._color;
		},
		
		/**
		 * Gets / sets the highlighted color of buttons.
		 */
		"public function set highlightColor",function set$highlightColor(value/*:uint*/)/*:void*/
		{
			this._highlightColor = value;
			for(var i/*:int*/ = 0; i < this._numButtons; i++)
			{
				this._buttons[i].highlightColor = this._highlightColor;
			}
		},
		"public function get highlightColor",function get$highlightColor()/*:uint*/
		{
			return this._highlightColor;
		},
		
		/**
		 * Gets the selected index.
		 */
		"public function get selectedIndex",function get$selectedIndex()/*:int*/
		{
			return this._selectedIndex;
		},
		
		/**
		 * Gets the selected item.
		 */
		"public function get selectedItem",function get$selectedItem()/*:Object*/
		{
			return this._items[this._selectedIndex];
		},
		
	
		
	];},[],["com.bit101.components.Component","flash.events.Event","Array","flash.filters.DropShadowFilter","com.bit101.components.ArcButton","Math","flash.events.MouseEvent"]
);