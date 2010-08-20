/**
 * RadioButton.as
 * Keith Peters
 * version 0.9.5
 * 
 * A basic radio button component, meant to be used in groups, where only one button in the group can be selected.
 * Currently only one group can be created.
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
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	public class RadioButton extends com.bit101.components.Component
	{
		protected var _back:Sprite;
		protected var _button:Sprite;
		protected var _selected:Boolean = false;
		protected var _label:Label;
		protected var _labelText:String = "";
		protected var _groupName:String = "defaultRadioGroup";
		
		protected static var buttons:Array;
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this RadioButton.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param label The string to use for the initial label of this component.
		 * @param defaultHandler The event handling function to handle the default event for this component (click in this case).
		 */
		public native function RadioButton(parent:DisplayObjectContainer = null, xpos:Number = 0, ypos:Number =  0, label:String = "", checked:Boolean = false, defaultHandler:Function = null);
		
		/**
		 * Static method to add the newly created RadioButton to the list of buttons in the group.
		 * @param rb The RadioButton to add.
		 */
		protected static native function addButton(rb:RadioButton):void;
		
		/**
		 * Unselects all RadioButtons in the group, except the one passed.
		 * This could use some rethinking or better naming.
		 * @param rb The RadioButton to remain selected.
		 */
		protected static native function clear(rb:RadioButton):void;
		
		/**
		 * Initializes the component.
		 */
		override protected native function init():void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
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
		 * Internal click handler.
		 * @param event The MouseEvent passed by the system.
		 */
		protected native function onClick(event:MouseEvent):void;
		
		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the selected state of this CheckBox.
		 */
		public native function set selected(s:Boolean):void;
		public native function get selected():Boolean;

		/**
		 * Sets / gets the label text shown on this CheckBox.
		 */
		public native function set label(str:String):void;
		public native function get label():String;

		/**
		 * Sets / gets the group name, which allows groups of RadioButtons to function seperately.
		 */
		public native function get groupName():String;

		public native function set groupName(value:String):void;

		
	}
}