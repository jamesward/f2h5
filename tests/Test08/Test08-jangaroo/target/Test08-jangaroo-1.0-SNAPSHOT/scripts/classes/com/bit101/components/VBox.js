joo.classLoader.prepare(/**
 * VBox.as
 * Keith Peters
 * version 0.9.5
 * 
 * A layout container for vertically aligning other components.
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
    import flash.display.DisplayObject
    import flash.display.DisplayObject
	import flash.display.DisplayObjectContainer
	import flash.events.Event*/

	"public class VBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildAt=$$l+'addChildAt',$removeChild=$$l+'removeChild',$removeChildAt=$$l+'removeChildAt',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.events.Event);},
	
		"protected var",{ _spacing/*:Number*/ : 5},
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this PushButton.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function VBox",function $VBox(parent/*:DisplayObjectContainer = null*/, xpos/*:Number = 0*/, ypos/*:Number =  0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent = null;}xpos = 0;}ypos =  0;}
			this[$super](parent, xpos, ypos);
		},
		
		/**
		 * Override of addChild to force layout;
		 */
		"override public function addChildAt",function addChildAt(child/*:DisplayObject*/, index/*:int*/)/* : DisplayObject*/
		{
			this[$addChildAt](child, index);
			child.addEventListener(flash.events.Event.RESIZE, $$bound(this,"onResize"));
			this.invalidate();
			return child;
		},

        /**
         * Override of removeChild to force layout;
         */
        "override public function removeChild",function removeChild(child/*:DisplayObject*/)/*:DisplayObject*/
        {
            this[$removeChild](child);            
            child.removeEventListener(flash.events.Event.RESIZE, $$bound(this,"onResize"));
            this.invalidate();
            return child;
        },
		
        /**
         * Override of removeChild to force layout;
         */
        "override public function removeChildAt",function removeChildAt(index/*:int*/)/*:DisplayObject*/
        {
            var child/*:DisplayObject*/ = this.removeChildAt(index);
            child.removeEventListener(flash.events.Event.RESIZE, $$bound(this,"onResize"));
            this.invalidate();
            return child;
        },

		/**
		 * Internal handler for resize event of any attached component. Will redo the layout based on new size.
		 */
		"protected function onResize",function onResize(event/*:Event*/)/*:void*/
		{
			this.invalidate();
		},
		
		/**
		 * Draws the visual ui of the component, in this case, laying out the sub components.
		 */
		"override public function draw",function draw()/* : void*/
		{
			this._width = 0;
			this._height = 0;
			var ypos/*:Number*/ = 0;
			for(var i/*:int*/ = 0; i < this.numChildren; i++)
			{
				var child/*:DisplayObject*/ = this.getChildAt(i);
				child.y = ypos;
				ypos += child.height;
				ypos += this._spacing;
				this._height += child.height;
				this._width = Math.max(this._width, child.width);
			}
			this._height += this._spacing * (this.numChildren - 1);
			this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
		},
		
		/**
		 * Gets / sets the spacing between each sub component.
		 */
		"public function set spacing",function set$spacing(s/*:Number*/)/*:void*/
		{
			this._spacing = s;
			this.invalidate();
		},
		"public function get spacing",function get$spacing()/*:Number*/
		{
			return this._spacing;
		},
	];},[],["com.bit101.components.Component","flash.events.Event","Math"]
);