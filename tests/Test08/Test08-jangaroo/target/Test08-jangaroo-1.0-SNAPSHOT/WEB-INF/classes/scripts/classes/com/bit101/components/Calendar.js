joo.classLoader.prepare(/**
 * Component.as
 * Keith Peters
 * version 0.9.5
 * 
 * Calendar component for showing and selecting a date.
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
	import flash.display.Shape
	import flash.events.Event
	import flash.events.MouseEvent*/
	
	"public class Calendar extends com.bit101.components.Panel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren';return[function(){joo.classLoader.init(com.bit101.components.Label,com.bit101.components.PushButton,Date,Array,flash.display.Shape,flash.events.MouseEvent,flash.events.Event);},
	
		"protected var",{ _dateLabel/*:Label*/: undefined},
		"protected var",{ _day/*:int*/: undefined},
		"protected var",{ _dayButtons/*:Array*/ :function(){return( new Array());}},
		"protected var",{ _month/*:int*/: undefined},
		"protected var",{ _monthNames/*:Array*/ :function(){return( ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);}},
		"protected var",{ _selection/*:Shape*/: undefined},
		"protected var",{ _year/*:int*/: undefined},
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		"public function Calendar",function $Calendar(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/)
		{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
			this[$super](parent, xpos, ypos);this._dayButtons=this._dayButtons();this._monthNames=this._monthNames();
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.setSize(140, 140);
			var today/*:Date*/ = new Date();
			this.setDate(today);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/* : void*/
		{
			this[$addChildren]();
			for(var i/*:int*/ = 0; i < 6; i++)
			{
				for(var j/*:int*/ = 0; j < 7; j++)
				{
					var btn/*:PushButton*/ = new com.bit101.components.PushButton(this.content, j * 20, 20 + i * 20);
					btn.setSize(19, 19);
					btn.addEventListener(flash.events.MouseEvent.CLICK, $$bound(this,"onDayClick"));
                                        if (this._dayButtons.push != undefined)
                                        {
					  this._dayButtons.push(btn);
                                        }
				}
			}
			
			this._dateLabel = new com.bit101.components.Label(this.content, 25, 0);
			this._dateLabel.autoSize = true;
			
			var prevYearBtn/*:PushButton*/ = new com.bit101.components.PushButton(this.content, 2, 2, "«", $$bound(this,"onPrevYear"));
			prevYearBtn.setSize(14, 14);
			
			var prevMonthBtn/*:PushButton*/ = new com.bit101.components.PushButton(this.content, 17, 2, "<", $$bound(this,"onPrevMonth"));
			prevMonthBtn.setSize(14, 14);
			
			var nextMonthBtn/*:PushButton*/ = new com.bit101.components.PushButton(this.content, 108, 2, ">", $$bound(this,"onNextMonth"));
			nextMonthBtn.setSize(14, 14);
			
			var nextYearBtn/*:PushButton*/ = new com.bit101.components.PushButton(this.content, 124, 2, "»", $$bound(this,"onNextYear"));
			nextYearBtn.setSize(14, 14);
			
			this._selection = new flash.display.Shape();
			this._selection.graphics.beginFill(0, 0.15);
			this._selection.graphics.drawRect(1, 1, 18, 18);
			this.content.addChild(this._selection);
		},
		
		/**
		 * Gets the last day of the specfied month and year. Needed by layout.
		 * @param month The month to get the last day of.
		 * @param year The year in which the month is in (needed for leap years).
		 * @return The last day of the month.
		 */
		"protected function getEndDay",function getEndDay(month/*:int*/, year/*:int*/)/*:int*/
		{
			switch(month)
			{
				case 0:		// jan
				case 2:		// mar
				case 4:		// may
				case 6:		// july
				case 7:		// aug
				case 9:		// oct
				case 11:	// dec
					return 31;
					break;
				
				case 1:		// feb
					if((this._year % 400 == 0) ||  ((this._year % 100 != 0) && (this._year % 4 == 0))) return 29;
					return 28;
					break;
				
				default:	
					break;
			}
			// april, june, sept, nov.
			return 30;
		},
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Displays specified date in calendar by drawing that month and year and highlighting the day.
		 * @param date The date to display.
		 */
		"public function setDate",function setDate(date/*:Date*/)/*:void*/
		{
			this._year = date.fullYear;
			this._month = date.month;
			this._day = date.date;
			var startDay/*:int*/ = new Date(this._year, this._month, 1).day;
			var endDay/*:int*/ = this.getEndDay(this._month, this._year);
			for(var i/*:int*/ = 0; i < 42; i++)
			{
				if (this._dayButtons[i] != undefined)
                                {
				  this._dayButtons[i].visible = false;
                                }
			}
			for(i = 0; i < endDay; i++)
			{
				var btn/*:PushButton*/ = this._dayButtons[i + startDay];
                                if (btn != undefined)
                                {
				btn.visible = true;
				btn.label = (i + 1).toString();
				btn.tag = i + 1;
				if(i + 1 == this._day)
				{
					this._selection.x = btn.x;
					this._selection.y = btn.y;
				}
                                }
			}
			
			this._dateLabel.text = this._monthNames[this._month] + "  " + this._year;
			this._dateLabel.draw();
			this._dateLabel.x = (this.width - this._dateLabel.width) / 2;
		},
		
		/**
		 * Displays specified date in calendar by drawing that month and year and highlighting the day.
		 * @param year The year to display.
		 * @param month The month to display.
		 * @param day The day to display.
		 */
		"public function setYearMonthDay",function setYearMonthDay(year/*:int*/, month/*:int*/, day/*:int*/)/*:void*/
		{
			this.setDate(new Date(year, month, day));
		},
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Advances the month forward by one.
		 */
		"protected function onNextMonth",function onNextMonth(event/*:MouseEvent*/)/*:void*/
		{
			this._month++;
			if(this._month > 11)
			{
				this._month = 0;
				this._year++;
			}
			this._day = Math.min(this._day,this.getEndDay(this._month,this._year));
			this.setYearMonthDay(this._year, this._month, this._day);
		},
		
		/**
		 * Moves the month back by one.
		 */
		"protected function onPrevMonth",function onPrevMonth(event/*:MouseEvent*/)/*:void*/
		{
			this._month--;
			if(this._month < 0)
			{
				this._month = 11;
				this._year--;
			}
			this._day = Math.min(this._day,this.getEndDay(this._month,this._year));
			this.setYearMonthDay(this._year, this._month, this._day);
		},
		
		/**
		 * Advances the year forward by one.
		 */
		"protected function onNextYear",function onNextYear(event/*:MouseEvent*/)/*:void*/
		{
			this._year++;
			this._day = Math.min(this._day,this.getEndDay(this._month,this._year));
			this.setYearMonthDay(this._year, this._month, this._day);
		},
		
		/**
		 * Moves the year back by one.
		 */
		"protected function onPrevYear",function onPrevYear(event/*:MouseEvent*/)/*:void*/
		{
			this._year--;
			this._day = Math.min(this._day,this.getEndDay(this._month,this._year));
			this.setYearMonthDay(this._year, this._month, this._day);
		},
		
		/**
		 * Called when a date button is clicked. Selects that date.
		 */
		"protected function onDayClick",function onDayClick(event/*:MouseEvent*/)/*:void*/
		{
			this._day = event.target.tag;
			this.setYearMonthDay(this._year, this._month, this._day);
			this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
		},
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets the currently selected Date.
		 */
		"public function get selectedDate",function get$selectedDate()/*:Date*/
		{
			return new Date(this._year, this._month, this._day);
		},

		/**
		 * Gets the current month.
		 */
		"public function get month",function get$month()/*:int*/
		{
			return this._month;
		},

		/**
		 * Gets the current year.
		 */
		"public function get year",function get$year()/*:int*/
		{
			return this._year;
		},

		/**
		 * Gets the current day.
		 */
		"public function get day",function get$day()/*:int*/
		{
			return this._day;
		},
	];},[],["com.bit101.components.Panel","Array","Date","com.bit101.components.PushButton","flash.events.MouseEvent","com.bit101.components.Label","flash.display.Shape","Math","flash.events.Event"]
);