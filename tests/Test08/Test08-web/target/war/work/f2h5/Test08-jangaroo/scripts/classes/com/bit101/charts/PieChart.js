joo.classLoader.prepare("package com.bit101.charts",/*
{
	import com.bit101.components.Label
	
	import flash.display.DisplayObjectContainer
	import flash.display.Sprite*/
	
	/**
	 * Note: the data parameter of the PieChart, like the other charts, is an array.
	 * It can be a simple array of Numbers where each number represents one slice of the pie.
	 * It can also be an array of objects.
	 * If objects are used, each object represents one slice of the pie and can contain three properties:
	 * - value: The numeric value to chart.
	 * - label: The label to display next to the slice.
	 * - color: The color to make the slice.
	 */
	"public class PieChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$drawChart=$$l+'drawChart';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Number,Math);},
	
		"protected var",{ _sprite/*:Sprite*/: undefined},
		"protected var",{ _beginningAngle/*:Number*/ : 0},
		"protected var",{ _colors/*:Array*/ :function(){return( [
			0xff9999, 0xffff99, 0x99ff99, 0x99ffff, 0x9999ff, 0xff99ff,
			0xffcccc, 0xffffcc, 0xccffcc, 0xccffff, 0xccccff, 0xffccff,
			0xff6666, 0xffff66, 0x99ff66, 0x66ffff, 0x6666ff, 0xff66ff,
			0xffffff
		]);}},
		
		
		
		/**
		 * Constructor
		 * @param parent The parent DisplayObjectContainer on which to add this Label.
		 * @param xpos The x position to place this component.
		 * @param ypos The y position to place this component.
		 * @param data The array of numeric values or objects to graph.
		 */
		"public function PieChart",function $PieChart(parent/*:DisplayObjectContainer=null*/, xpos/*:Number=0*/, ypos/*:Number=0*/, data/*:Array=null*/)
		{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
			this[$super](parent, xpos, ypos, data);this._colors=this._colors();
		},
		
		/**
		 * Initializes the component.
		 */
		"protected override function init",function init()/* : void*/
		{
			this[$init]();
			this.setSize(160, 120);
		},
		
		/**
		 * Creates and adds the child display objects of this component.
		 */
		"protected override function addChildren",function addChildren()/*:void*/
		{
			this[$addChildren]();
			this._sprite = new flash.display.Sprite();
			this._panel.content.addChild(this._sprite);
		},
		
		/**
		 * Graphs the numeric data in the chart.
		 */
		"protected override function drawChart",function drawChart()/* : void*/
		{
			var radius/*:Number*/ = Math.min(this.width - 40, this.height - 40) / 2;
			this._sprite.x = this.width / 2;
			this._sprite.y = this.height / 2;
			this._sprite.graphics.clear();
			this._sprite.graphics.lineStyle(0, 0x666666, 1);
			while(this._sprite.numChildren > 0) this._sprite.removeChildAt(0);
			
			var total/*:Number*/ = this.getDataTotal();			
			var startAngle/*:Number*/ = this._beginningAngle * Math.PI / 180;
			for(var i/*:int*/ = 0; i < this._data.length; i++)
			{
				var percent/*:Number*/ = this.getValueForData(i) / total;
				var endAngle/*:Number*/ = startAngle + Math.PI * 2 * percent;
				this.drawArc(startAngle, endAngle, radius, this.getColorForData(i));
				this.makeLabel((startAngle + endAngle) * 0.5, radius + 10, this.getLabelForData(i));
				startAngle = endAngle;
			}
		},
		
		/**
		 * Creates and positions a single label.
		 * @property angle The angle in degrees to position this label.
		 * @property radius The distance from the center to position this label.
		 * @property text The text of the label.
		 */ 
		"protected function makeLabel",function makeLabel(angle/*:Number*/, radius/*:Number*/, text/*:String*/)/*:void*/
		{
			var label/*:Label*/ = new com.bit101.components.Label(this._sprite, 0, 0, text);
			label.x = Math.cos(angle) * radius;
			label.y = Math.sin(angle) * radius - label.height / 2;
			if(label.x < 0)
			{
				label.x -= label.width;
			}
		},
		
		/**
		 * Draws one slice of the pie.
		 * @property startAngle The beginning angle of the arc.
		 * @property endAngle The ending angle of the arc.
		 * @property radius The radius of the arc.
		 * @property color The color to draw the arc.
		 */
		"protected function drawArc",function drawArc(startAngle/*:Number*/, endAngle/*:Number*/, radius/*:Number*/, color/*:uint*/)/*:void*/
		{
			this._sprite.graphics.beginFill(color);
			this._sprite.graphics.moveTo(0, 0);
			for(var i/*:Number*/ = startAngle; i < endAngle; i += .01)
			{
				this._sprite.graphics.lineTo(Math.cos(i) * radius, Math.sin(i) * radius);
			}
			this._sprite.graphics.lineTo(Math.cos(endAngle) * radius, Math.sin(endAngle) * radius);
			this._sprite.graphics.lineTo(0, 0);
			this._sprite.graphics.endFill();
		},
		
		/**
		 * Determines what label to use for the specified data.
		 * @property index The index of the data to get the label for.
		 */
		"protected function getLabelForData",function getLabelForData(index/*:int*/)/*:String*/
		{
			if(!( is(this._data[index], Number)) && this._data[index].label != null)
			{
				return this._data[index].label;
			}
			var value/*:Number*/ = Math.round(this.getValueForData(index) * Math.pow(10, this._labelPrecision)) / Math.pow(10, this._labelPrecision);
			return value.toString();
		},
		
		/**
		 * Determines what color to use for the specified data.
		 * @property index The index of the data to get the color for.
		 */
		"protected function getColorForData",function getColorForData(index/*:int*/)/*:uint*/
		{
			if(( is(!this._data[index], Number)) && this._data[index].color != null)
			{
				return this._data[index].color;
			}
			if(index < this._colors.length)
			{
				return this._colors[index];
			}
			return Math.random() * 0xffffff;
		},
		
		/**
		 * Determines what value to use for the specified data.
		 * @property index The index of the data to get the value for.
		 */
		"protected function getValueForData",function getValueForData(index/*:int*/)/*:Number*/
		{
			if( is(this._data[index], Number))
			{
				return this._data[index];
			}
			if(this._data[index].value != null)
			{
				return this._data[index].value;
			}
			return NaN;
		},
		
		/**
		 * Gets the sum of all the data values.
		 */
		"protected function getDataTotal",function getDataTotal()/*:Number*/
		{
			var total/*:Number*/ = 0;
			for(var i/*:int*/ = 0; i < this._data.length; i++)
			{
				total += this.getValueForData(i);
			}
			return total;
		},

		
		
		
		///////////////////////////////////
		// getter/setters
		///////////////////////////////////
		
		/**
		 * Sets/gets the default array of colors to use for each arc.
		 */
		"public function set colors",function set$colors(value/*:Array*/)/*:void*/
		{
			this._colors = value;
			this.invalidate();
		},
		"public function get colors",function get$colors()/*:Array*/
		{
			return this._colors;
		},

		/**
		 * Sets/gets the angle at which to start the first slice.
		 */
		"public function set beginningAngle",function set$beginningAngle(value/*:Number*/)/*:void*/
		{
			this._beginningAngle = value;
			this.invalidate();
		},
		"public function get beginningAngle",function get$beginningAngle()/*:Number*/
		{
			return this._beginningAngle;
		},


	];},[],["com.bit101.charts.Chart","flash.display.Sprite","Math","com.bit101.components.Label","Number"]
);