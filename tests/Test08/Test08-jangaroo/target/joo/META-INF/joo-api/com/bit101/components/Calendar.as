/**
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

package com.bit101.components
{
	import flash.display.DisplayObjectContainer;
	import flash.display.Shape;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	public class Calendar extends com.bit101.components.Panel
	{
		protected var _dateLabel:Label;
		protected var _day:int;
		protected var _dayButtons:Array = new Array();
		protected var _month:int;
		protected var _monthNames:Array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		protected var _selection:Shape;
		protected var _year:int;
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this component.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 */
		public native function Calendar(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init() : void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren() : void;
		
		/**
		 * Gets the last day of the specfied month and year. Needed by layout.
		 * @param month The month to get the last day of.
		 * @param year The year in which the month is in (needed for leap years).
		 * @return The last day of the month.
		 */
		protected native function getEndDay(month:int, year:int):int;
		
		///////////////////////////////////
		// public methods
		///////////////////////////////////
		
		/**
		 * Displays specified date in calendar by drawing that month and year and highlighting the day.
		 * @param date The date to display.
		 */
		public native function setDate(date:Date):void;
		
		/**
		 * Displays specified date in calendar by drawing that month and year and highlighting the day.
		 * @param year The year to display.
		 * @param month The month to display.
		 * @param day The day to display.
		 */
		public native function setYearMonthDay(year:int, month:int, day:int):void;
		
		///////////////////////////////////
		// event handlers
		///////////////////////////////////
		
		/**
		 * Advances the month forward by one.
		 */
		protected native function onNextMonth(event:MouseEvent):void;
		
		/**
		 * Moves the month back by one.
		 */
		protected native function onPrevMonth(event:MouseEvent):void;
		
		/**
		 * Advances the year forward by one.
		 */
		protected native function onNextYear(event:MouseEvent):void;
		
		/**
		 * Moves the year back by one.
		 */
		protected native function onPrevYear(event:MouseEvent):void;
		
		/**
		 * Called when a date button is clicked. Selects that date.
		 */
		protected native function onDayClick(event:MouseEvent):void;
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Gets the currently selected Date.
		 */
		public native function get selectedDate():Date;

		/**
		 * Gets the current month.
		 */
		public native function get month():int;

		/**
		 * Gets the current year.
		 */
		public native function get year():int;

		/**
		 * Gets the current day.
		 */
		public native function get day():int;
	}
}