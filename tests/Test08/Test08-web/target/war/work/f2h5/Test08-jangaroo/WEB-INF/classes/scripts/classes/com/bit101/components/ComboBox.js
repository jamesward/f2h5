joo.classLoader.prepare(/**
 * ComboBox.as
 * Keith Peters
 * version 0.9.5
 * 
 * A button that exposes a list of choices and displays the chosen item. 
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
	import flash.display.Stage
	import flash.events.Event
	import flash.events.MouseEvent
	import flash.geom.Point
	import flash.geom.Rectangle*/
	
	"public class ComboBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.geom.Rectangle,String,com.bit101.components.List,flash.events.MouseEvent,flash.events.Event,flash.geom.Point);},
	
		"public static const",{ TOP/*:String*/ : "top"},
		"public static const",{ BOTTOM/*:String*/ : "bottom"},
		
		"protected var",{ _defaultLabel/*:String*/ : ""},
		"protected var",{ _dropDownButton/*:PushButton*/: undefined},
		"protected var",{ _items/*:Array*/: undefined},
		"protected var",{ _labelButton/*:PushButton*/: undefined},
		"protected var",{ _list/*:List*/: undefined},
		"protected var",{ _numVisibleItems/*:int*/ : 6},
		"protected var",{ _open/*:Boolean*/ : false},
		"protected var",{ _openPosition/*:String*/ :function(){return( com.bit101.components.ComboBox.BOTTOM);}},
		"protected var",{ _stage/*:Stage*/: undefined},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this List.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param defaultLabel The label to show when no item is selected.
		 * @param items An array of items to display in the list. Either strings or objects with label property.
		 */
		"public function ComboBox",function $ComboBox(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, defaultLabel/*:String=""*/, items/*:Array = null*/)
		{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultLabel="";}items = null;}
			this._defaultLabel = defaultLabel;
			this._items = items;
			this.addEventListener(flash.events.Event.ADDED_TO_STAGE, $$bound(this,"onAddedToStage"));
			this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE, $$bound(this,"onRemovedFromStage"));
			this[$super](parent, xpos, ypos);this._openPosition=this._openPosition();
		},
		
		/**
		 * Initilizes the component.
		 */
		"protected override function init",function init()/*:void*/
		{
			this[$init]();
			this.setSize(100, 20);
			this.setLabelButtonLabel();
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._list = new com.bit101.components.List(null, 0, 0, this._items);
			this._list.addEventListener(flash.events.Event.SELECT, $$bound(this,"onSelect"));
			
			this._labelButton = new com.bit101.components.PushButton(this, 0, 0, "", $$bound(this,"onDropDown"));
			this._dropDownButton = new com.bit101.components.PushButton(this, 0, 0, "+", $$bound(this,"onDropDown"));
		},
		
		/**
		 * Determines what to use for the main button label and sets it.
		 */
		"protected function setLabelButtonLabel",function setLabelButtonLabel()/*:void*/
		{
			if(this.selectedItem == null)
			{
				this._labelButton.label = this._defaultLabel;
			}
			else if( is(this.selectedItem, String))
			{
				this._labelButton.label = this.selectedItem/*as String*/;
			}
			else if( is(this.selectedItem.label, String))
			{
				this._labelButton.label = this.selectedItem.label;
			}
			else
			{
				this._labelButton.label = this.selectedItem.toString();
			}
		},
		
		/**
		 * Removes the list from the stage.
		 */
		"protected function removeList",function removeList()/*:void*/
		{
			if(this._stage.contains(this._list)) this._stage.removeChild(this._list);
			this._stage.removeEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onStageClick"));
			this._dropDownButton.label = "+";			
		},
		

		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		"public override function draw",function draw()/*:void*/
		{
			this[$draw]();
			this._labelButton.setSize(this._width - this._height + 1, this._height);
			this._labelButton.draw();
			
			this._dropDownButton.setSize(this._height, this._height);
			this._dropDownButton.draw();
			this._dropDownButton.x = this._width - this.height;
			
			this._list.setSize(this._width, this._numVisibleItems * this._list.listItemHeight);
		},
		
		
		/**
		 * Adds an item to the list.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 */
		"public function addItem",function addItem(item/*:Object*/)/*:void*/
		{
			this._list.addItem(item);
		},
		
		/**
		 * Adds an item to the list at the specified index.
		 * @param item The item to add. Can be a string or an object containing a string property named label.
		 * @param index The index at which to add the item.
		 */
		"public function addItemAt",function addItemAt(item/*:Object*/, index/*:int*/)/*:void*/
		{
			this._list.addItemAt(item, index);
		},
		
		/**
		 * Removes the referenced item from the list.
		 * @param item The item to remove. If a string, must match the item containing that string. If an object, must be a reference to the exact same object.
		 */
		"public function removeItem",function removeItem(item/*:Object*/)/*:void*/
		{
			this._list.removeItem(item);
		},
		
		/**
		 * Removes the item from the list at the specified index
		 * @param index The index of the item to remove.
		 */
		"public function removeItemAt",function removeItemAt(index/*:int*/)/*:void*/
		{
			this._list.removeItemAt(index);
		},
		
		/**
		 * Removes all items from the list.
		 */
		"public function removeAll",function removeAll()/*:void*/
		{
			this._list.removeAll();
		},
	
		
		
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Called when one of the top buttons is pressed. Either opens or closes the list.
		 */
		"protected function onDropDown",function onDropDown(event/*:MouseEvent*/)/*:void*/
		{
			this._open = !this._open;
			if(this._open)
			{
				var point/*:Point*/ = new flash.geom.Point();
				if(this._openPosition == com.bit101.components.ComboBox.BOTTOM)
				{
					point.y = this._height;
				}
				else
				{
					point.y = -this._numVisibleItems * this._list.listItemHeight;
				}
				point = this.localToGlobal(point);
				this._list.move(point.x, point.y);
				this._stage.addChild(this._list);
				this._stage.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onStageClick"));
				this._dropDownButton.label = "-";
			}
			else
			{
				this.removeList();
			}
		},
		
		/**
		 * Called when the mouse is clicked somewhere outside of the combo box when the list is open. Closes the list.
		 */
		"protected function onStageClick",function onStageClick(event/*:MouseEvent*/)/*:void*/
		{
			// ignore clicks within buttons or list
			if(event.target == this._dropDownButton || event.target == this._labelButton) return;
			if(new flash.geom.Rectangle(this._list.x, this._list.y, this._list.width, this._list.height).contains(event.stageX, event.stageY)) return;
			
			this._open = false;
			this.removeList();
		},
		
		/**
		 * Called when an item in the list is selected. Displays that item in the label button.
		 */
		"protected function onSelect",function onSelect(event/*:Event*/)/*:void*/
		{
			this._open = false;
			this._dropDownButton.label = "+";
			if(this.stage != null && this.stage.contains(this._list))
			{
				this.stage.removeChild(this._list);
			}
			this.setLabelButtonLabel();
			this.dispatchEvent(event);
		},
		
		/**
		 * Called when the component is added to the stage.
		 */
		"protected function onAddedToStage",function onAddedToStage(event/*:Event*/)/*:void*/
		{
			this._stage = this.stage;
		},
		
		/**
		 * Called when the component is removed from the stage.
		 */
		"protected function onRemovedFromStage",function onRemovedFromStage(event/*:Event*/)/*:void*/
		{
			this.removeList();
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets / gets the index of the selected list item.
		 */
		"public function set selectedIndex",function set$selectedIndex(value/*:int*/)/*:void*/
		{
			this._list.selectedIndex = value;
			this.setLabelButtonLabel();
		},
		"public function get selectedIndex",function get$selectedIndex()/*:int*/
		{
			return this._list.selectedIndex;
		},
		
		/**
		 * Sets / gets the item in the list, if it exists.
		 */
		"public function set selectedItem",function set$selectedItem(item/*:Object*/)/*:void*/
		{
			this._list.selectedItem = item;
			this.setLabelButtonLabel();
		},
		"public function get selectedItem",function get$selectedItem()/*:Object*/
		{
			return this._list.selectedItem;
		},
		
		/**
		 * Sets/gets the default background color of list items.
		 */
		"public function set defaultColor",function set$defaultColor(value/*:uint*/)/*:void*/
		{
			this._list.defaultColor = value;
		},
		"public function get defaultColor",function get$defaultColor()/*:uint*/
		{
			return this._list.defaultColor;
		},
		
		/**
		 * Sets/gets the selected background color of list items.
		 */
		"public function set selectedColor",function set$selectedColor(value/*:uint*/)/*:void*/
		{
			this._list.selectedColor = value;
		},
		"public function get selectedColor",function get$selectedColor()/*:uint*/
		{
			return this._list.selectedColor;
		},
		
		/**
		 * Sets/gets the rollover background color of list items.
		 */
		"public function set rolloverColor",function set$rolloverColor(value/*:uint*/)/*:void*/
		{
			this._list.rolloverColor = value;
		},
		"public function get rolloverColor",function get$rolloverColor()/*:uint*/
		{
			return this._list.rolloverColor;
		},
		
		/**
		 * Sets the height of each list item.
		 */
		"public function set listItemHeight",function set$listItemHeight(value/*:Number*/)/*:void*/
		{
			this._list.listItemHeight = value;
			this.invalidate();
		},
		"public function get listItemHeight",function get$listItemHeight()/*:Number*/
		{
			return this._list.listItemHeight;
		},

		/**
		 * Sets / gets the position the list will open on: top or bottom.
		 */
		"public function set openPosition",function set$openPosition(value/*:String*/)/*:void*/
		{
			this._openPosition = value;
		},
		"public function get openPosition",function get$openPosition()/*:String*/
		{
			return this._openPosition;
		},

		/**
		 * Sets / gets the label that will be shown if no item is selected.
		 */
		"public function set defaultLabel",function set$defaultLabel(value/*:String*/)/*:void*/
		{
			this._defaultLabel = value;
			this.setLabelButtonLabel();
		},
		"public function get defaultLabel",function get$defaultLabel()/*:String*/
		{
			return this._defaultLabel;
		},

		/**
		 * Sets / gets the number of visible items in the drop down list. i.e. the height of the list.
		 */
		"public function set numVisibleItems",function set$numVisibleItems(value/*:int*/)/*:void*/
		{
			this._numVisibleItems = value;
			this.invalidate();
		},
		"public function get numVisibleItems",function get$numVisibleItems()/*:int*/
		{
			return this._numVisibleItems;
		},

		/**
		 * Sets / gets the list of items to be shown.
		 */
		"public function set items",function set$items(value/*:Array*/)/*:void*/
		{
			this._list.items = value;
		},
		"public function get items",function get$items()/*:Array*/
		{
			return this._list.items;
		},
		
		/**
		 * Sets / gets the class used to render list items. Must extend ListItem.
		 */
		"public function set listItemClass",function set$listItemClass(value/*:Class*/)/*:void*/
		{
			this._list.listItemClass = value;
		},
		"public function get listItemClass",function get$listItemClass()/*:Class*/
		{
			return this._list.listItemClass;
		},
		
		
		/**
		 * Sets / gets the color for alternate rows if alternateRows is set to true.
		 */
		"public function set alternateColor",function set$alternateColor(value/*:uint*/)/*:void*/
		{
			this._list.alternateColor = value;
		},
		"public function get alternateColor",function get$alternateColor()/*:uint*/
		{
			return this._list.alternateColor;
		},
		
		/**
		 * Sets / gets whether or not every other row will be colored with the alternate color.
		 */
		"public function set alternateRows",function set$alternateRows(value/*:Boolean*/)/*:void*/
		{
			this._list.alternateRows = value;
		},
		"public function get alternateRows",function get$alternateRows()/*:Boolean*/
		{
			return this._list.alternateRows;
		},
	];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.List","com.bit101.components.PushButton","String","flash.events.MouseEvent","flash.geom.Point","flash.geom.Rectangle"]
);