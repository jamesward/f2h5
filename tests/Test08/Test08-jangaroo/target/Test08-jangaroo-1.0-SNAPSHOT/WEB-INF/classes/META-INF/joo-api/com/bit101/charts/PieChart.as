package com.bit101.charts
{
	import com.bit101.components.Label;
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	
	/**
	 * Note: the data parameter of the PieChart, like the other charts, is an array.
	 * It can be a simple array of Numbers where each number represents one slice of the pie.
	 * It can also be an array of objects.
	 * If objects are used, each object represents one slice of the pie and can contain three properties:
	 * - value: The numeric value to chart.
	 * - label: The label to display next to the slice.
	 * - color: The color to make the slice.
	 */
	public class PieChart extends com.bit101.charts.Chart
	{
		protected var _sprite:Sprite;
		protected var _beginningAngle:Number = 0;
		protected var _colors:Array = [
			0xff9999, 0xffff99, 0x99ff99, 0x99ffff, 0x9999ff, 0xff99ff,
			0xffcccc, 0xffffcc, 0xccffcc, 0xccffff, 0xccccff, 0xffccff,
			0xff6666, 0xffff66, 0x99ff66, 0x66ffff, 0x6666ff, 0xff66ff,
			0xffffff
		];
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values or objects to graph.
		 */
		public native function PieChart(parent:DisplayObjectContainer=null, xpos:Number=0, ypos:Number=0, data:Array=null);
		
		/**
		 * Initializes the component.
		 */
		protected override native function init() : void;
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		protected override native function addChildren():void;
		
		/**
		 * Graphs the numeric data in the chart.
		 */
		protected override native function drawChart() : void;
		
		/**
		 * Creates and positions a single label.
		 * @property angle The angle in degrees to position this label.
		 * @property radius The distance from the center to position this label.
		 * @property text The text of the label.
		 */ 
		protected native function makeLabel(angle:Number, radius:Number, text:String):void;
		
		/**
		 * Draws one slice of the pie.
		 * @property startAngle The beginning angle of the arc.
		 * @property endAngle The ending angle of the arc.
		 * @property radius The radius of the arc.
		 * @property color The color to draw the arc.
		 */
		protected native function drawArc(startAngle:Number, endAngle:Number, radius:Number, color:uint):void;
		
		/**
		 * Determines what label to use for the specified data.
		 * @property index The index of the data to get the label for.
		 */
		protected native function getLabelForData(index:int):String;
		
		/**
		 * Determines what color to use for the specified data.
		 * @property index The index of the data to get the color for.
		 */
		protected native function getColorForData(index:int):uint;
		
		/**
		 * Determines what value to use for the specified data.
		 * @property index The index of the data to get the value for.
		 */
		protected native function getValueForData(index:int):Number;
		
		/**
		 * Gets the sum of all the data values.
		 */
		protected native function getDataTotal():Number;

		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the default array of colors to use for each arc.
		 */
		public native function set colors(value:Array):void;
		public native function get colors():Array;

		/**
		 * Sets/gets the angle at which to start the first slice.
		 */
		public native function set beginningAngle(value:Number):void;
		public native function get beginningAngle():Number;


	}
}