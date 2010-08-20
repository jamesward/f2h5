// class flash.text.TextFieldType
joo.classLoader.prepare("package flash.text",

"public class TextFieldType",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{DYNAMIC:"dynamic"},
"public static const",{INPUT:"input"},

];},[],[]
);
// class flash.text.TextFieldAutoSize
joo.classLoader.prepare("package flash.text",


"public class TextFieldAutoSize",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public static const",{CENTER:"center"},
"public static const",{LEFT:"left"},
"public static const",{NONE:"none"},
"public static const",{RIGHT:"right"},

];},[],[]
);
// class flash.display.BlendMode
joo.classLoader.prepare("package flash.display",

"public class BlendMode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{ADD:"add"},
"public static const",{ALPHA:"alpha"},
"public static const",{DARKEN:"darken"},
"public static const",{DIFFERENCE:"difference"},
"public static const",{ERASE:"erase"},
"public static const",{HARDLIGHT:"hardlight"},
"public static const",{INVERT:"invert"},
"public static const",{LAYER:"layer"},
"public static const",{LIGHTEN:"lighten"},
"public static const",{MULTIPLY:"multiply"},
"public static const",{NORMAL:"normal"},
"public static const",{OVERLAY:"overlay"},
"public static const",{SCREEN:"screen"},
"public static const",{SHADER:"shader"},
"public static const",{SUBTRACT:"subtract"},
];},[],[]
);
// class flash.display.StageAlign
joo.classLoader.prepare("package flash.display",

"public class StageAlign",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{BOTTOM:"B"},
"public static const",{BOTTOM_LEFT:"BL"},
"public static const",{BOTTOM_RIGHT:"BR"},
"public static const",{LEFT:"L"},
"public static const",{RIGHT:"R"},
"public static const",{TOP:"T"},
"public static const",{TOP_LEFT:"TL"},
"public static const",{TOP_RIGHT:"TR"},
];},[],[]
);
// class flash.display.StageScaleMode
joo.classLoader.prepare("package flash.display",

"public class StageScaleMode",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{EXACT_FIT:"exactFit"},
"public static const",{NO_BORDER:"noBorder"},
"public static const",{NO_SCALE:"noScale"},
"public static const",{SHOW_ALL:"showAll"},
];},[],[]
);
// class flash.filters.BitmapFilter
joo.classLoader.prepare("package flash.filters",


"public class BitmapFilter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


];},[],[]
);
// class flash.filters.DropShadowFilter
joo.classLoader.prepare("package flash.filters",


"public class DropShadowFilter extends flash.filters.BitmapFilter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[


"public function DropShadowFilter",function(distance,angle,color,alpha,blurX,blurY,strength,quality,inner,knockout,hideObject)
{if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){distance=4.0;}angle=45;}color=0;}alpha=1.0;}blurX=4.0;}blurY=4.0;}strength=1.0;}quality=1;}inner=false;}knockout=false;}hideObject=false;}this[$super]();

},
];},[],["flash.filters.BitmapFilter"]
);
// class com.bit101.charts.LineChart
joo.classLoader.prepare(



























"package com.bit101.charts",



"public class LineChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$drawChart=$$l+'drawChart';return[

"protected var",{_lineWidth:1},
"protected var",{_lineColor:0x999999},








"public function LineChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);
},




"protected override function drawChart",function()
{
var border=2;
var lineWidth=(this._width-border)/(this._data.length-1);
var chartHeight=this._height-border;
this._chartHolder.x=0;
this._chartHolder.y=this._height;
var xpos=border;
var max=this.getMaxValue();
var min=this.getMinValue();
var scale=chartHeight/(max-min);
this._chartHolder.graphics.lineStyle(this._lineWidth,this._lineColor);
this._chartHolder.graphics.moveTo(xpos,(this._data[0]-min)*-scale);
xpos+=lineWidth;
for(var i=1;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
this._chartHolder.graphics.lineTo(xpos,(this._data[i]-min)*-scale);
}
xpos+=lineWidth;
}
},









"public function set lineWidth",function(value)
{
this._lineWidth=value;
this.invalidate();
},
"public function get lineWidth",function()
{
return this._lineWidth;
},




"public function set lineColor",function(value)
{
this._lineColor=value;
this.invalidate();
},
"public function get lineColor",function()
{
return this._lineColor;
},


];},[],["com.bit101.charts.Chart"]
);
// class com.bit101.charts.PieChart
joo.classLoader.prepare("package com.bit101.charts",















"public class PieChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$drawChart=$$l+'drawChart';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Number,Math);},

"protected var",{_sprite: undefined},
"protected var",{_beginningAngle:0},
"protected var",{_colors:function(){return([
0xff9999,0xffff99,0x99ff99,0x99ffff,0x9999ff,0xff99ff,
0xffcccc,0xffffcc,0xccffcc,0xccffff,0xccccff,0xffccff,
0xff6666,0xffff66,0x99ff66,0x66ffff,0x6666ff,0xff66ff,
0xffffff
]);}},










"public function PieChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);this._colors=this._colors();
},




"protected override function init",function()
{
this[$init]();
this.setSize(160,120);
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._sprite=new flash.display.Sprite();
this._panel.content.addChild(this._sprite);
},




"protected override function drawChart",function()
{
var radius=Math.min(this.width-40,this.height-40)/2;
this._sprite.x=this.width/2;
this._sprite.y=this.height/2;
this._sprite.graphics.clear();
this._sprite.graphics.lineStyle(0,0x666666,1);
while(this._sprite.numChildren>0)this._sprite.removeChildAt(0);

var total=this.getDataTotal();
var startAngle=this._beginningAngle*Math.PI/180;
for(var i=0;i<this._data.length;i++)
{
var percent=this.getValueForData(i)/total;
var endAngle=startAngle+Math.PI*2*percent;
this.drawArc(startAngle,endAngle,radius,this.getColorForData(i));
this.makeLabel((startAngle+endAngle)*0.5,radius+10,this.getLabelForData(i));
startAngle=endAngle;
}
},







"protected function makeLabel",function(angle,radius,text)
{
var label=new com.bit101.components.Label(this._sprite,0,0,text);
label.x=Math.cos(angle)*radius;
label.y=Math.sin(angle)*radius-label.height/2;
if(label.x<0)
{
label.x-=label.width;
}
},








"protected function drawArc",function(startAngle,endAngle,radius,color)
{
this._sprite.graphics.beginFill(color);
this._sprite.graphics.moveTo(0,0);
for(var i=startAngle;i<endAngle;i+=.01)
{
this._sprite.graphics.lineTo(Math.cos(i)*radius,Math.sin(i)*radius);
}
this._sprite.graphics.lineTo(Math.cos(endAngle)*radius,Math.sin(endAngle)*radius);
this._sprite.graphics.lineTo(0,0);
this._sprite.graphics.endFill();
},





"protected function getLabelForData",function(index)
{
if(!(is(this._data[index],Number))&&this._data[index].label!=null)
{
return this._data[index].label;
}
var value=Math.round(this.getValueForData(index)*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision);
return value.toString();
},





"protected function getColorForData",function(index)
{
if((is(!this._data[index],Number))&&this._data[index].color!=null)
{
return this._data[index].color;
}
if(index<this._colors.length)
{
return this._colors[index];
}
return Math.random()*0xffffff;
},





"protected function getValueForData",function(index)
{
if(is(this._data[index],Number))
{
return this._data[index];
}
if(this._data[index].value!=null)
{
return this._data[index].value;
}
return NaN;
},




"protected function getDataTotal",function()
{
var total=0;
for(var i=0;i<this._data.length;i++)
{
total+=this.getValueForData(i);
}
return total;
},











"public function set colors",function(value)
{
this._colors=value;
this.invalidate();
},
"public function get colors",function()
{
return this._colors;
},




"public function set beginningAngle",function(value)
{
this._beginningAngle=value;
this.invalidate();
},
"public function get beginningAngle",function()
{
return this._beginningAngle;
},


];},[],["com.bit101.charts.Chart","flash.display.Sprite","Math","com.bit101.components.Label","Number"]
);
// class com.bit101.charts.Chart
joo.classLoader.prepare(



























"package com.bit101.charts",









"public class Chart extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,com.bit101.components.Panel,Number,flash.display.Shape);},

"protected var",{_data: undefined},
"protected var",{_chartHolder: undefined},
"protected var",{_maximum:100},
"protected var",{_minimum:0},
"protected var",{_autoScale:true},
"protected var",{_maxLabel: undefined},
"protected var",{_minLabel: undefined},
"protected var",{_showScaleLabels:false},
"protected var",{_labelPrecision:0},
"protected var",{_panel: undefined},








"public function Chart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this._data=data;
this[$super](parent,xpos,ypos);
},




"protected override function init",function()
{
this[$init]();
this.setSize(200,100);
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._panel=new com.bit101.components.Panel(this);

this._chartHolder=new flash.display.Shape();
this._panel.content.addChild(this._chartHolder);

this._maxLabel=new com.bit101.components.Label();
this._minLabel=new com.bit101.components.Label();
},




"protected function drawChart",function()
{
},




"protected function getMaxValue",function()
{
if(!this._autoScale)return this._maximum;
var maxValue=Number.NEGATIVE_INFINITY;
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
maxValue=Math.max(this._data[i],maxValue);
}
}
return maxValue;
},




"protected function getMinValue",function()
{
if(!this._autoScale)return this._minimum;
var minValue=Number.POSITIVE_INFINITY;
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
minValue=Math.min(this._data[i],minValue);
}
}
return minValue;
},








"public override function draw",function()
{
this[$draw]();
this._panel.setSize(this.width,this.height);
this._panel.draw();
this._chartHolder.graphics.clear();
if(this._data!=null)
{
this.drawChart();

var mult=Math.pow(10,this._labelPrecision);
var maxVal=Math.round(this.maximum*mult)/mult;
this._maxLabel.text=maxVal.toString();
this._maxLabel.draw();
this._maxLabel.x=-this._maxLabel.width-5;
this._maxLabel.y=-this._maxLabel.height*0.5;

var minVal=Math.round(this.minimum*mult)/mult;
this._minLabel.text=minVal.toString();
this._minLabel.draw();
this._minLabel.x=-this._minLabel.width-5;
this._minLabel.y=this.height-this._minLabel.height*0.5;
}
},








"public function set data",function(value)
{
this._data=value;
this.invalidate();
},
"public function get data",function()
{
return this._data;
},




"public function set maximum",function(value)
{
this._maximum=value;
this.invalidate();
},
"public function get maximum",function()
{
if(this._autoScale)return this.getMaxValue();
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
this.invalidate();
},
"public function get minimum",function()
{
if(this._autoScale)return this.getMinValue();
return this._minimum;
},




"public function set autoScale",function(value)
{
this._autoScale=value;
this.invalidate();
},
"public function get autoScale",function()
{
return this._autoScale;
},





"public function set showScaleLabels",function(value)
{
this._showScaleLabels=value;
if(this._showScaleLabels)
{
this.addChild(this._maxLabel);
this.addChild(this._minLabel);
}
else
{


}
},
"public function get showScaleLabels",function()
{
return this._showScaleLabels;
},




"public function set labelPrecision",function(value)
{
this._labelPrecision=value;
this.invalidate();
},
"public function get labelPrecision",function()
{
return this._labelPrecision;
},




"public function set gridSize",function(value)
{
this._panel.gridSize=value;
this.invalidate();
},
"public function get gridSize",function()
{
return this._panel.gridSize;
},




"public function set showGrid",function(value)
{
this._panel.showGrid=value;
this.invalidate();
},
"public function get showGrid",function()
{
return this._panel.showGrid;
},




"public function set gridColor",function(value)
{
this._panel.gridColor=value;
this.invalidate();
},
"public function get gridColor",function()
{
return this._panel.gridColor;
},


];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.display.Shape","com.bit101.components.Label","Number","Math"]
);
// class com.bit101.charts.BarChart
joo.classLoader.prepare(



























"package com.bit101.charts",



"public class BarChart extends com.bit101.charts.Chart",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$drawChart=$$l+'drawChart';return[

"protected var",{_spacing:2},
"protected var",{_barColor:0x999999},








"public function BarChart",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this[$super](parent,xpos,ypos,data);
},




"protected override function drawChart",function()
{
var border=2;
var totalSpace=this._spacing*this._data.length;
var barWidth=(this._width-border-totalSpace)/this._data.length;
var chartHeight=this._height-border;
this._chartHolder.x=0;
this._chartHolder.y=this._height;
var xpos=border;
var max=this.getMaxValue();
var min=this.getMinValue();
var scale=chartHeight/(max-min);
for(var i=0;i<this._data.length;i++)
{
if(this._data[i]!=null)
{
this._chartHolder.graphics.beginFill(this._barColor);
this._chartHolder.graphics.drawRect(xpos,0,barWidth,(this._data[i]-min)*-scale);
this._chartHolder.graphics.endFill();
}
xpos+=barWidth+this._spacing;
}
},










"public function set spacing",function(value)
{
this._spacing=value;
this.invalidate();
},
"public function get spacing",function()
{
return this._spacing;
},




"public function set barColor",function(value)
{
this._barColor=value;
this.invalidate();
},
"public function get barColor",function()
{
return this._barColor;
},


];},[],["com.bit101.charts.Chart"]
);
// class com.bit101.components.ProgressBar
joo.classLoader.prepare(



























"package com.bit101.components",




"public class ProgressBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_bar: undefined},
"protected var",{_value:0},
"protected var",{_max:1},







"public function ProgressBar",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},





"override protected function init",function()
{
this[$init]();
this.setSize(100,10);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._bar=new flash.display.Sprite();
this._bar.x=1;
this._bar.y=1;

this.addChild(this._bar);
},




"protected function update",function()
{
this._bar.scaleX=this._value/this._max;
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._bar.graphics.clear();
this._bar.graphics.beginFill(com.bit101.components.Style.PROGRESS_BAR);
this._bar.graphics.drawRect(0,0,this._width-2,this._height-2);
this._bar.graphics.endFill();
this.update();
},















"public function set maximum",function(m)
{
this._max=m;
this._value=Math.min(this._value,this._max);
this.update();
},
"public function get maximum",function()
{
return this._max;
},




"public function set value",function(v)
{
this._value=Math.min(v,this._max);
this.update();
},
"public function get value",function()
{
return this._value;
},

];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style","Math"]
);
// class com.bit101.components.FPSMeter
joo.classLoader.prepare(



























"package com.bit101.components",






"public class FPSMeter extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.events.Event);},

"protected var",{_label: undefined},
"protected var",{_startTime: undefined},
"protected var",{_frames: undefined},
"protected var",{_prefix:""},
"protected var",{_fps:0},









"public function FPSMeter",function(parent,xpos,ypos,prefix)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}prefix="FPS:";}
this[$super](parent,xpos,ypos);
this._prefix=prefix;
this._frames=0;
this._startTime=flash.utils.getTimer();
this.setSize(50,20);
if(this.stage!=null)
{
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
}
this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
},

"protected override function addChildren",function()
{
this[$addChildren]();
this._label=new com.bit101.components.Label(this,0,0);
},


"public override function draw",function()
{
this._label.text=this._prefix+this._fps.toString();
},




"protected function onEnterFrame",function(event)
{





this._frames++;
var time=flash.utils.getTimer();
var elapsed=time-this._startTime;
if(elapsed>=1000)
{
this._fps=Math.round(this._frames*1000/elapsed);
this._frames=0;
this._startTime=time;
this.draw();
}
},




"protected function onRemovedFromStage",function(event)
{
this.stop();
},




"public function stop",function()
{
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
},




"public function start",function()
{
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
},




"public function set prefix",function(value)
{
this._prefix=value;
},
"public function get prefix",function()
{
return this._prefix;
},




"public function get fps",function()
{
return this._fps;
},
];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.Label","Math"]
);
// class com.bit101.components.RadioButton
joo.classLoader.prepare(




























"package com.bit101.components",





"public class RadioButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Array,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_button: undefined},
"protected var",{_selected:false},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_groupName:"defaultRadioGroup"},

"protected static var",{buttons: undefined},










"public function RadioButton",function(parent,xpos,ypos,label,checked,defaultHandler)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}checked=false;}defaultHandler=null;}
com.bit101.components.RadioButton.addButton(this);
this._selected=checked;
this._labelText=label;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
},





"protected static function addButton",function(rb)
{
if(com.bit101.components.RadioButton.buttons==null)
{
com.bit101.components.RadioButton.buttons=new Array();
}
com.bit101.components.RadioButton.buttons.push(rb);
},






"protected static function clear",function(rb)
{
for(var i=0;i<com.bit101.components.RadioButton.buttons.length;i++)
{
if(com.bit101.components.RadioButton.buttons[i]!=rb&&com.bit101.components.RadioButton.buttons[i].groupName==rb.groupName)
{
com.bit101.components.RadioButton.buttons[i].selected=false;
}
}
},




"override protected function init",function()
{
this[$init]();




this.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"),false,1);
this.selected=this._selected;
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._button=new flash.display.Sprite();


this.addChild(this._button);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();


},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawCircle(5,5,5);
this._back.graphics.endFill();

this._button.graphics.clear();
this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._button.graphics.drawCircle(5,5,3);

this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._label.text=this._labelText;
this._label.draw();
this._width=this._label.width+12;
this._height=10;
},












"protected function onClick",function(event)
{
this.selected=true;
},











"public function set selected",function(s)
{
this._selected=s;
this._button.visible=this._selected;
if(this._selected)
{
com.bit101.components.RadioButton.clear(this);
}
},
"public function get selected",function()
{
return this._selected;
},




"public function set label",function(str)
{
this._labelText=str;
this.invalidate();
},
"public function get label",function()
{
return this._labelText;
},




"public function get groupName",function()
{
return this._groupName;
},

"public function set groupName",function(value)
{
this._groupName=value;
},


];},[],["com.bit101.components.Component","flash.events.MouseEvent","Array","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);
// class com.bit101.components.Accordion
joo.classLoader.prepare(




























"package com.bit101.components",




"public class Accordion extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$setSize=$$l+'setSize',$draw=$$l+'draw',$width=$$l+'width',$height=$$l+'height';return[function(){joo.classLoader.init(com.bit101.components.Window,com.bit101.components.VBox,Array,flash.events.Event);},

"protected var",{_windows: undefined},
"protected var",{_winWidth:100},
"protected var",{_winHeight:100},
"protected var",{_vbox: undefined},







"public function Accordion",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"protected override function init",function()
{
this[$init]();
this.setSize(100,120);
},




"protected override function addChildren",function()
{
this._vbox=new com.bit101.components.VBox(this);
this._vbox.spacing=0;

this._windows=new Array();
for(var i=0;i<2;i++)
{
var window=new com.bit101.components.Window(this._vbox,0,0,"Section "+(i+1));
window.grips.visible=false;
window.draggable=false;
window.addEventListener(flash.events.Event.SELECT,$$bound(this,"onWindowSelect"));
if(i!=0)window.minimized=true;
this._windows.push(window);
}
},









"public function addWindow",function(title)
{
var window=new com.bit101.components.Window(this._vbox,0,0,title);
window.minimized=true;
window.draggable=false;
window.grips.visible=false;
window.addEventListener(flash.events.Event.SELECT,$$bound(this,"onWindowSelect"));
this._windows.push(window);
this._winHeight=this._height-(this._windows.length-1)*20;
this.setSize(this._winWidth,this._winHeight);
},






"override public function setSize",function(w,h)
{
this[$setSize](w,h);
this._winWidth=w;
this._winHeight=h-(this._windows.length-1)*20;
this.draw();
},

"override public function draw",function()
{
this._winHeight=Math.max(this._winHeight,40);
for(var i=0;i<this._windows.length;i++)
{
this._windows[i].setSize(this._winWidth,this._winHeight);
this._vbox.draw();
}
},





"public function getWindowAt",function(index)
{
return this._windows[index];
},









"protected function onWindowSelect",function(event)
{
var window=event.target;
if(window.minimized)
{
for(var i=0;i<this._windows.length;i++)
{
this._windows[i].minimized=true;
}
window.minimized=false;
}
this._vbox.draw();
},

"public override function set width",function(w)
{
this._winWidth=w;
this[$width]=w;
},

"public override function set height",function(h)
{
this._winHeight=h-(this._windows.length-1)*20;
this[$height]=h;
},

];},[],["com.bit101.components.Component","com.bit101.components.VBox","Array","com.bit101.components.Window","flash.events.Event","Math"]
);
// class com.bit101.components.HRangeSlider
joo.classLoader.prepare("package com.bit101.components",



"public class HRangeSlider extends com.bit101.components.RangeSlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function HRangeSlider",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.RangeSlider.HORIZONTAL,parent,xpos,ypos,defaultHandler);
},
];},[],["com.bit101.components.RangeSlider"]
);
// class com.bit101.components.RotarySelector
joo.classLoader.prepare(



























"package com.bit101.components",






"public class RotarySelector extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"public static const",{ALPHABETIC:"alphabetic"},
"public static const",{NUMERIC:"numeric"},
"public static const",{NONE:"none"},
"public static const",{ROMAN:"roman"},


"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_knob: undefined},
"protected var",{_numChoices:2},
"protected var",{_choice:0},
"protected var",{_labels: undefined},
"protected var",{_labelMode:function(){return(com.bit101.components.RotarySelector.ALPHABETIC);}},










"public function RotarySelector",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);this._labelMode=this._labelMode();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.setSize(60,60);
},




"override protected function addChildren",function()
{
this._knob=new flash.display.Sprite();
this._knob.buttonMode=true;
this._knob.useHandCursor=true;
this.addChild(this._knob);

this._label=new com.bit101.components.Label();
this._label.autoSize=true;
this.addChild(this._label);

this._labels=new flash.display.Sprite();
this.addChild(this._labels);

this._knob.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"));
},




"protected function decrement",function()
{
if(this._choice>0)
{
this._choice--;
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},




"protected function increment",function()
{
if(this._choice<this._numChoices-1)
{
this._choice++;
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},




"protected function resetLabels",function()
{
while(this._labels.numChildren>0)
{
this._labels.removeChildAt(0);
}
this._labels.x=this._width/2-5;
this._labels.y=this._height/2-10;
},





"protected function drawKnob",function(radius)
{
this._knob.graphics.clear();
this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._knob.graphics.drawCircle(0,0,radius);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._knob.graphics.drawCircle(0,0,radius-2);

this._knob.x=this._width/2;
this._knob.y=this._height/2;
},








"override public function draw",function()
{
this[$draw]();

var radius=Math.min(this._width,this._height)/2;
this.drawKnob(radius);
this.resetLabels();

var arc=Math.PI*1.5/this._numChoices;
var start=-Math.PI/2-arc*(this._numChoices-1)/2;

this.graphics.clear();
this.graphics.lineStyle(4,com.bit101.components.Style.BACKGROUND,.5);
for(var i=0;i<this._numChoices;i++)
{
var angle=start+arc*i;
var sin=Math.sin(angle);
var cos=Math.cos(angle);

this.graphics.moveTo(this._knob.x,this._knob.y);
this.graphics.lineTo(this._knob.x+cos*(radius+2),this._knob.y+sin*(radius+2));

var lab=new com.bit101.components.Label(this._labels,cos*(radius+10),sin*(radius+10));



lab.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onLabelClick"));
if(this._labelMode==com.bit101.components.RotarySelector.ALPHABETIC)
{
lab.text=String.fromCharCode(65+i);
}
else if(this._labelMode==com.bit101.components.RotarySelector.NUMERIC)
{
lab.text=(i+1).toString();
}
else if(this._labelMode==com.bit101.components.RotarySelector.ROMAN)
{
var chars=["I","II","III","IV","V","VI","VII","VIII","IX","X"];
lab.text=chars[i];
}
if(i!=this._choice)
{
lab.alpha=0.5;
}
}

angle=start+arc*this._choice;
this.graphics.lineStyle(4,com.bit101.components.Style.LABEL_TEXT);
this.graphics.moveTo(this._knob.x,this._knob.y);
this.graphics.lineTo(this._knob.x+Math.cos(angle)*(radius+2),this._knob.y+Math.sin(angle)*(radius+2));


this._label.text=this._labelText;
this._label.draw();
this._label.x=this._width/2-this._label.width/2;
this._label.y=this._height+2;
},











"protected function onClick",function(event)
{








},

"protected function onLabelClick",function(event)
{
var lab=event.target;
this.choice=this._labels.getChildIndex(lab);
},











"public function set numChoices",function(value)
{
this._numChoices=Math.min(value,10);
this.draw();
},
"public function get numChoices",function()
{
return this._numChoices;
},




"public function set choice",function(value)
{
this._choice=Math.max(0,Math.min(this._numChoices-1,value));
this.draw();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get choice",function()
{
return this._choice;
},




"public function set labelMode",function(value)
{
this._labelMode=value;
this.draw();
},
"public function get labelMode",function()
{
return this._labelMode;
},
];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","com.bit101.components.Label","flash.events.MouseEvent","com.bit101.components.Style","Math","String"]
);
// class com.bit101.components.Slider
joo.classLoader.prepare(



























"package com.bit101.components",







"public class Slider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_handle: undefined},
"protected var",{_back: undefined},
"protected var",{_backClick:true},
"protected var",{_value:0},
"protected var",{_max:100},
"protected var",{_min:0},
"protected var",{_orientation: undefined},
"protected var",{_tick:1},

"public static const",{HORIZONTAL:"horizontal"},
"public static const",{VERTICAL:"vertical"},









"public function Slider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){orientation=com.bit101.components.Slider.HORIZONTAL;}parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();

if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this.setSize(100,10);
}
else
{
this.setSize(10,100);
}
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._handle=new flash.display.Sprite();

this._handle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDrag"));


this.addChild(this._handle);
},




"protected function drawBack",function()
{
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

if(this._backClick)
{
this._back.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onBackClick"));
}
else
{
this._back.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onBackClick"));
}
},




"protected function drawHandle",function()
{
this._handle.graphics.clear();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.graphics.drawRect(1,1,this._height-2,this._height-2);
}
else
{
this._handle.graphics.drawRect(1,1,this._width-2,this._width-2);
}
this._handle.graphics.endFill();
this.positionHandle();
},




"protected function correctValue",function()
{
if(this._max>this._min)
{
this._value=Math.min(this._value,this._max);
this._value=Math.max(this._value,this._min);
}
else
{
this._value=Math.max(this._value,this._max);
this._value=Math.min(this._value,this._min);
}
},





"protected function positionHandle",function()
{
var range;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
range=this._width-this._height;
this._handle.x=(this._value-this._min)/(this._max-this._min)*range;
}
else
{
range=this._height-this._width;
this._handle.y=this._height-this._width-(this._value-this._min)/(this._max-this._min)*range;
}
},











"override public function draw",function()
{
this[$draw]();
this.drawBack();
this.drawHandle();
},







"public function setSliderParams",function(min,max,value)
{
this.minimum=min;
this.maximum=max;
this.value=value;
},












"protected function onBackClick",function(event)
{
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{


this._handle.x=Math.max(this._handle.x,0);
this._handle.x=Math.min(this._handle.x,this._width-this._height);
this._value=this._handle.x/(this.width-this._height)*(this._max-this._min)+this._min;
}
else
{


this._handle.y=Math.max(this._handle.y,0);
this._handle.y=Math.min(this._handle.y,this._height-this._width);
this._value=(this._height-this._width-this._handle.y)/(this.height-this._width)*(this._max-this._min)+this._min;
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));

},





"protected function onDrag",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,this._width-this._height,0));
}
else
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._height-this._width));
}
},





"protected function onDrop",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));

},





"protected function onSlide",function(event)
{
var oldValue=this._value;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._value=this._handle.x/(this.width-this._height)*(this._max-this._min)+this._min;
}
else
{
this._value=(this._height-this._width-this._handle.y)/(this.height-this._width)*(this._max-this._min)+this._min;
}
if(this._value!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},











"public function set backClick",function(b)
{
this._backClick=b;
this.invalidate();
},
"public function get backClick",function()
{
return this._backClick;
},




"public function set value",function(v)
{
this._value=v;
this.correctValue();
this.positionHandle();

},
"public function get value",function()
{
return Math.round(this._value/this._tick)*this._tick;
},




"public function set maximum",function(m)
{
this._max=m;
this.correctValue();
this.positionHandle();
},
"public function get maximum",function()
{
return this._max;
},




"public function set minimum",function(m)
{
this._min=m;
this.correctValue();
this.positionHandle();
},
"public function get minimum",function()
{
return this._min;
},




"public function set tick",function(t)
{
this._tick=t;
},
"public function get tick",function()
{
return this._tick;
},

];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);
// class com.bit101.components.Component
joo.classLoader.prepare(
































"package com.bit101.components",









"public class Component extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$width=$$l+'width',$height=$$l+'height',$x=$$l+'x',$y=$$l+'y';return[function(){joo.classLoader.init(flash.display.StageScaleMode,flash.filters.DropShadowFilter,flash.display.StageAlign,flash.events.Event,com.bit101.components.Style);},









"protected var",{Ronda: undefined},

"protected var",{_width:0},
"protected var",{_height:0},
"protected var",{_tag:-1},
"protected var",{_enabled:true},

"public static const",{DRAW:"draw"},







"public function Component",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}this[$super]();
this.move(xpos,ypos);
if(parent!=null)
{
parent.addChild(this);
}
this.init();
},




"protected function init",function()
{
this.addChildren();
this.invalidate();
},




"protected function addChildren",function()
{

},






"protected function getShadow",function(dist,knockout)
{if(arguments.length<2){knockout=false;}
return new flash.filters.DropShadowFilter(dist,45,com.bit101.components.Style.DROPSHADOW,1,dist,dist,.3,1,knockout);
},




"protected function invalidate",function()
{

this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onInvalidate"));
},











"public static function initStage",function(stage)
{
stage.align=flash.display.StageAlign.TOP_LEFT;
stage.scaleMode=flash.display.StageScaleMode.NO_SCALE;
},






"public function move",function(xpos,ypos)
{
this.x=Math.round(xpos);
this.y=Math.round(ypos);
},






"public function setSize",function(w,h)
{
this._width=w;
this._height=h;
this.invalidate();
},




"public function draw",function()
{
this.dispatchEvent(new flash.events.Event(com.bit101.components.Component.DRAW));
},











"protected function onInvalidate",function(event)
{
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onInvalidate"));
this.draw();
},











"override public function set width",function(w)
{
this._width=w;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"override public function get width",function()
{
return this._width;
},




"override public function set height",function(h)
{
this._height=h;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"override public function get height",function()
{
return this._height;
},




"public function set tag",function(value)
{
this._tag=value;
},
"public function get tag",function()
{
return this._tag;
},




"override public function set x",function(value)
{
this[$x]=Math.round(value);
},




"override public function set y",function(value)
{
this[$y]=Math.round(value);
},




"public function set enabled",function(value)
{
this._enabled=value;
this.mouseEnabled=this.mouseChildren=this._enabled;
this.tabEnabled=value;
this.alpha=this._enabled?1.0:0.5;
},
"public function get enabled",function()
{
return this._enabled;
},

];},["initStage"],["flash.display.Sprite","flash.filters.DropShadowFilter","com.bit101.components.Style","flash.events.Event","flash.display.StageAlign","flash.display.StageScaleMode","Math"]
);
// class com.bit101.components.ColorChooser
joo.classLoader.prepare(





























"package com.bit101.components",

















"public class ColorChooser extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.InputText,flash.display.Sprite,flash.display.InterpolationMethod,Math,flash.events.MouseEvent,flash.display.BlendMode,flash.display.BitmapData,flash.display.Bitmap,flash.geom.Matrix,flash.display.SpreadMethod,flash.display.GradientType,flash.events.Event,flash.geom.Point);},

"public static const",{TOP:"top"},
"public static const",{BOTTOM:"bottom"},

"protected var",{_colors: undefined},
"protected var",{_colorsContainer: undefined},
"protected var",{_defaultModelColors:function(){return([0xFF0000,0xFFFF00,0x00FF00,0x00FFFF,0x0000FF,0xFF00FF,0xFF0000,0xFFFFFF,0x000000]);}},
"protected var",{_input: undefined},
"protected var",{_model: undefined},
"protected var",{_oldColorChoice:function(){return(this._value);}},
"protected var",{_popupAlign:function(){return(com.bit101.components.ColorChooser.BOTTOM);}},
"protected var",{_stage: undefined},
"protected var",{_swatch: undefined},
"protected var",{_tmpColorChoice:function(){return(this._value);}},
"protected var",{_usePopup:false},
"protected var",{_value:0xff0000},











"public function ColorChooser",function(parent,xpos,ypos,value,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}value=0xff0000;}defaultHandler=null;}
this._oldColorChoice=this._tmpColorChoice=this._value=value;

this[$super](parent,xpos,ypos);this._defaultModelColors=this._defaultModelColors();this._oldColorChoice=this._oldColorChoice();this._popupAlign=this._popupAlign();this._tmpColorChoice=this._tmpColorChoice();

if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}

},




"override protected function init",function()
{

this[$init]();

this._width=65;
this._height=15;
this.value=this._value;
},

"override protected function addChildren",function()
{
this._input=new com.bit101.components.InputText();
this._input.width=45;
this._input.restrict="0123456789ABCDEFabcdef";
this._input.maxChars=6;
this.addChild(this._input);
this._input.addEventListener(flash.events.Event.CHANGE,$$bound(this,"onChange"));

this._swatch=new flash.display.Sprite();
this._swatch.x=50;

this.addChild(this._swatch);

this._colorsContainer=new flash.display.Sprite();
this._colorsContainer.addEventListener(flash.events.Event.ADDED_TO_STAGE,$$bound(this,"onColorsAddedToStage"));
this._colorsContainer.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onColorsRemovedFromStage"));
this._model=this.getDefaultModel();
this.drawColors(this._model);
},








"override public function draw",function()
{
this[$draw]();
this._swatch.graphics.clear();
this._swatch.graphics.beginFill(this._value);
this._swatch.graphics.drawRect(0,0,16,16);
this._swatch.graphics.endFill();
},









"protected function onChange",function(event)
{
event.stopImmediatePropagation();
this._value=parseInt("0x"+this._input.text,16);
this._input.text=this._input.text.toUpperCase();
this._oldColorChoice=this.value;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));

},








"public function set value",function(n)
{
var str=n.toString(16).toUpperCase();
while(str.length<6)
{
str="0"+str;
}
this._input.text=str;
this._value=parseInt("0x"+this._input.text,16);
this.invalidate();
},
"public function get value",function()
{
return this._value;
},






"public function get model",function(){return this._model;},
"public function set model",function(value)
{
this._model=value;
if(this._model!=null){
this.drawColors(this._model);
if(!this.usePopup)this.usePopup=true;
}else{
this._model=this.getDefaultModel();
this.drawColors(this._model);
this.usePopup=false;
}
},

"protected function drawColors",function(d){
this._colors=new flash.display.BitmapData(d.width,d.height);
this._colors.draw(d);
while(this._colorsContainer.numChildren)this._colorsContainer.removeChildAt(0);
this._colorsContainer.addChild(new flash.display.Bitmap(this._colors));
this.placeColors();
},

"public function get popupAlign",function(){return this._popupAlign;},
"public function set popupAlign",function(value){
this._popupAlign=value;
this.placeColors();
},

"public function get usePopup",function(){return this._usePopup;},
"public function set usePopup",function(value){
this._usePopup=value;

this._swatch.buttonMode=true;
this._colorsContainer.buttonMode=true;
this._colorsContainer.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"browseColorChoice"));
this._colorsContainer.addEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"backToColorChoice"));
this._colorsContainer.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"setColorChoice"));
this._swatch.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onSwatchClick"));

if(!this._usePopup){
this._swatch.buttonMode=false;
this._colorsContainer.buttonMode=false;
this._colorsContainer.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"browseColorChoice"));
this._colorsContainer.removeEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"backToColorChoice"));
this._colorsContainer.removeEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"setColorChoice"));
this._swatch.removeEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onSwatchClick"));
}
},





"protected function onColorsRemovedFromStage",function(e){
this._stage.removeEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
},

"protected function onColorsAddedToStage",function(e){
this._stage=this.stage;
this._stage.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
},

"protected function onStageClick",function(e){
this.displayColors();
},


"protected function onSwatchClick",function(event)
{
event.stopImmediatePropagation();
this.displayColors();
},

"protected function backToColorChoice",function(e)
{
this.value=this._oldColorChoice;
},

"protected function setColorChoice",function(e){

this._oldColorChoice=this.value;
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
this.displayColors();
},

"protected function browseColorChoice",function(e)
{

this.value=this._tmpColorChoice;
},





"protected function displayColors",function()
{
this.placeColors();
if(this._colorsContainer.parent)this._colorsContainer.parent.removeChild(this._colorsContainer);
else this.stage.addChild(this._colorsContainer);
},

"protected function placeColors",function(){
var point=new flash.geom.Point(this.x,this.y);
if(this.parent)point=this.parent.localToGlobal(point);
switch(this._popupAlign)
{
case com.bit101.components.ColorChooser.TOP:
this._colorsContainer.x=point.x;
this._colorsContainer.y=point.y-this._colorsContainer.height-4;
break;
case com.bit101.components.ColorChooser.BOTTOM:
this._colorsContainer.x=point.x;
this._colorsContainer.y=point.y+22;
break;
default:
this._colorsContainer.x=point.x;
this._colorsContainer.y=point.y+22;
break;
}
},





"protected function getDefaultModel",function(){
var w=100;
var h=100;
var bmd=new flash.display.BitmapData(w,h);

var g1=this.getGradientSprite(w,h,this._defaultModelColors);
bmd.draw(g1);

var blendmodes=[flash.display.BlendMode.MULTIPLY,flash.display.BlendMode.ADD];
var nb=blendmodes.length;
var g2=this.getGradientSprite(h/nb,w,[0xFFFFFF,0x000000]);

for(var i=0;i<nb;i++){
var blendmode=blendmodes[i];
var m=new flash.geom.Matrix();
m.rotate(-Math.PI/2);
m.translate(0,h/nb*i+h/nb);
bmd.draw(g2,m,null,blendmode);
}

var s=new flash.display.Sprite();
var bm=new flash.display.Bitmap(bmd);
s.addChild(bm);
return(s);
},

"protected function getGradientSprite",function(w,h,ca)
{
var gc=ca;
var gs=new flash.display.Sprite();
var g=gs.graphics;
var gn=gc.length;
var ga=[];
var gr=[];
var gm=new flash.geom.Matrix();gm.createGradientBox(w,h,0,0,0);
for(var i=0;i<gn;i++){ga.push(1);gr.push(0x00+0xFF/(gn-1)*i);}
g.beginGradientFill(flash.display.GradientType.LINEAR,gc,ga,gr,gm,flash.display.SpreadMethod.PAD,flash.display.InterpolationMethod.RGB);
g.drawRect(0,0,w,h);
g.endFill();
return(gs);
},
];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.InputText","flash.display.Sprite","flash.display.BitmapData","flash.display.Bitmap","flash.events.MouseEvent","flash.geom.Point","flash.display.BlendMode","flash.geom.Matrix","Math","flash.display.GradientType","flash.display.SpreadMethod","flash.display.InterpolationMethod"]
);
// class com.bit101.components.Style
joo.classLoader.prepare(




























"package com.bit101.components",

"public class Style",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static var",{BACKGROUND:0xCCCCCC},
"public static var",{BUTTON_FACE:0xFFFFFF},
"public static var",{INPUT_TEXT:0x333333},
"public static var",{LABEL_TEXT:0x666666},
"public static var",{DROPSHADOW:0x000000},
"public static var",{PANEL:0xF3F3F3},
"public static var",{PROGRESS_BAR:0xFFFFFF},

"public static var",{embedFonts:true},
"public static var",{fontName:"PF Ronda Seven"},
"public static var",{fontSize:8},
];},[],[]
);
// class com.bit101.components.ArcButton
joo.classLoader.prepare(
































"package com.bit101.components",













"class ArcButton extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$rotation=$$l+'rotation';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.display.DisplayObject,String,Class,Math,flash.events.MouseEvent,flash.display.Shape,flash.events.Event);},

"public var",{id: undefined},

"protected var",{_arc: undefined},
"protected var",{_bg: undefined},
"protected var",{_borderColor:0xcccccc},
"protected var",{_color:0xffffff},
"protected var",{_highlightColor:0xeeeeee},
"protected var",{_icon: undefined},
"protected var",{_iconHolder: undefined},
"protected var",{_iconRadius: undefined},
"protected var",{_innerRadius: undefined},
"protected var",{_outerRadius: undefined},







"public function ArcButton",function(arc,outerRadius,iconRadius,innerRadius)
{this[$super]();
this._arc=arc;
this._outerRadius=outerRadius;
this._iconRadius=iconRadius;
this._innerRadius=innerRadius;

this._bg=new flash.display.Shape();
this.addChild(this._bg);

this._iconHolder=new flash.display.Sprite();
this.addChild(this._iconHolder);

this.drawArc(0xffffff);
this.addEventListener(flash.events.MouseEvent.MOUSE_OVER,$$bound(this,"onMouseOver"));
this.addEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"onMouseOut"));
this.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},









"protected function drawArc",function(color)
{
this._bg.graphics.clear();
this._bg.graphics.lineStyle(2,this._borderColor);
this._bg.graphics.beginFill(color);
this._bg.graphics.moveTo(this._innerRadius,0);
this._bg.graphics.lineTo(this._outerRadius,0);
for(var i=0;i<this._arc;i+=.05)
{
this._bg.graphics.lineTo(Math.cos(i)*this._outerRadius,Math.sin(i)*this._outerRadius);
}
this._bg.graphics.lineTo(Math.cos(this._arc)*this._outerRadius,Math.sin(this._arc)*this._outerRadius);
this._bg.graphics.lineTo(Math.cos(this._arc)*this._innerRadius,Math.sin(this._arc)*this._innerRadius);
for(i=this._arc;i>0;i-=.05)
{
this._bg.graphics.lineTo(Math.cos(i)*this._innerRadius,Math.sin(i)*this._innerRadius);
}
this._bg.graphics.lineTo(this._innerRadius,0);

this.graphics.endFill();
},









"public function setIcon",function(iconOrLabel)
{
if(iconOrLabel==null)return;
while(this._iconHolder.numChildren>0)this._iconHolder.removeChildAt(0);
if(is(iconOrLabel,Class))
{
this._icon=new iconOrLabel();
}
else if(is(iconOrLabel,flash.display.DisplayObject))
{
this._icon=iconOrLabel;
}
else if(is(iconOrLabel,String))
{
this._icon=new com.bit101.components.Label(null,0,0,iconOrLabel);
(this._icon).draw();
}
if(this._icon!=null)
{
var angle=this._bg.rotation*Math.PI/180;
this._icon.x=Math.round(-this._icon.width/2);
this._icon.y=Math.round(-this._icon.height/2);
this._iconHolder.addChild(this._icon);
this._iconHolder.x=Math.round(Math.cos(angle+this._arc/2)*this._iconRadius);
this._iconHolder.y=Math.round(Math.sin(angle+this._arc/2)*this._iconRadius);
}
},









"protected function onMouseOver",function(event)
{
this.drawArc(this._highlightColor);
},




"protected function onMouseOut",function(event)
{
this.drawArc(this._color);
},




"protected function onMouseUp",function(event)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},









"public function set borderColor",function(value)
{
this._borderColor=value;
this.drawArc(this._color);
},
"public function get borderColor",function()
{
return this._borderColor;
},




"public function set color",function(value)
{
this._color=value;
this.drawArc(this._color);
},
"public function get color",function()
{
return this._color;
},




"public function set highlightColor",function(value)
{
this._highlightColor=value;
},
"public function get highlightColor",function()
{
return this._highlightColor;
},




"override public function set rotation",function(value)
{
this._bg.rotation=value;
},
"override public function get rotation",function()
{
return this._bg.rotation;
},

];},[],["flash.display.Sprite","flash.display.Shape","flash.events.MouseEvent","Math","Class","flash.display.DisplayObject","String","com.bit101.components.Label","flash.events.Event"]
);
// class com.bit101.components.HScrollBar
joo.classLoader.prepare(



























"package com.bit101.components",










"public class HScrollBar extends com.bit101.components.ScrollBar",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Slider);},

"public function HScrollBar",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.Slider.HORIZONTAL,parent,xpos,ypos,defaultHandler);
},
];},[],["com.bit101.components.ScrollBar","com.bit101.components.Slider"]
);
// class com.bit101.components.NumericStepper
joo.classLoader.prepare(



























"package com.bit101.components",








"public class NumericStepper extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.InputText,com.bit101.components.PushButton,Number,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,Error,flash.utils.Timer);},

"protected const",{DELAY_TIME:500},
"protected const",{UP:"up"},
"protected const",{DOWN:"down"},
"protected var",{_minusBtn: undefined},

"protected var",{_repeatTime:100},
"protected var",{_plusBtn: undefined},
"protected var",{_valueText: undefined},
"protected var",{_value:0},
"protected var",{_step:1},
"protected var",{_labelPrecision:1},
"protected var",{_maximum:function(){return(Number.POSITIVE_INFINITY);}},
"protected var",{_minimum:function(){return(Number.NEGATIVE_INFINITY);}},
"protected var",{_delayTimer: undefined},
"protected var",{_repeatTimer: undefined},
"protected var",{_direction: undefined},








"public function NumericStepper",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](parent,xpos,ypos);this._maximum=this._maximum();this._minimum=this._minimum();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
this.setSize(80,16);
this._delayTimer=new flash.utils.Timer(this.DELAY_TIME,1);
this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE,$$bound(this,"onDelayComplete"));
this._repeatTimer=new flash.utils.Timer(this._repeatTime);
this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onRepeat"));
},




"protected override function addChildren",function()
{
this._valueText=new com.bit101.components.InputText(this,0,0,"0",$$bound(this,"onValueTextChange"));
this._valueText.restrict="-0123456789.";
this._minusBtn=new com.bit101.components.PushButton(this,0,0,"-");
this._minusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMinus"));
this._minusBtn.setSize(16,16);
this._plusBtn=new com.bit101.components.PushButton(this,0,0,"+");
this._plusBtn.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onPlus"));
this._plusBtn.setSize(16,16);
},

"protected function increment",function()
{
if(this._value+this._step<=this._maximum)
{
this._value+=this._step;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},

"protected function decrement",function()
{
if(this._value-this._step>=this._minimum)
{
this._value-=this._step;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},











"public override function draw",function()
{
this._plusBtn.x=this._width-16;
this._minusBtn.x=this._width-32;
this._valueText.text=(Math.round(this._value*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision)).toString();
this._valueText.width=this._width-32;
this._valueText.draw();
},












"protected function onMinus",function(event)
{
this.decrement();
this._direction=this.DOWN;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},




"protected function onPlus",function(event)
{
this.increment();
this._direction=this.UP;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMouseUp",function(event)
{
this._delayTimer.stop();
this._repeatTimer.stop();
},




"protected function onValueTextChange",function(event)
{
var newVal=(this._valueText.text);
if(newVal<=this._maximum&&newVal>=this._minimum)
{
this._value=newVal;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},

"protected function onDelayComplete",function(event)
{
this._repeatTimer.start();
},

"protected function onRepeat",function(event)
{
if(this._direction==this.UP)
{
this.increment();
}
else
{
this.decrement();
}
},










"public function set value",function(val)
{
if(val<=this._maximum&&val>=this._minimum)
{
this._value=val;
this.invalidate();
}
},
"public function get value",function()
{
return this._value;
},




"public function set step",function(value)
{
if(value<0)
{
throw new Error("NumericStepper step must be positive.");
}
this._step=value;
},
"public function get step",function()
{
return this._step;
},




"public function set labelPrecision",function(value)
{
this._labelPrecision=value;
this.invalidate();
},
"public function get labelPrecision",function()
{
return this._labelPrecision;
},




"public function set maximum",function(value)
{
this._maximum=value;
if(this._value>this._maximum)
{
this._value=this._maximum;
this.invalidate();
}
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
if(this._value<this._minimum)
{
this._value=this._minimum;
this.invalidate();
}
},
"public function get minimum",function()
{
return this._minimum;
},




"public function get repeatTime",function()
{
return this._repeatTime;
},

"public function set repeatTime",function(value)
{

this._repeatTime=Math.max(value,10);
this._repeatTimer.delay=this._repeatTime;
},
];},[],["com.bit101.components.Component","Number","flash.events.Event","flash.utils.Timer","flash.events.TimerEvent","com.bit101.components.InputText","com.bit101.components.PushButton","flash.events.MouseEvent","Math","Error"]
);
// class com.bit101.components.PushButton
joo.classLoader.prepare(



























"package com.bit101.components",





"public class PushButton extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_face: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_over:false},
"protected var",{_down:false},
"protected var",{_selected:false},
"protected var",{_toggle:false},









"public function PushButton",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
this.label=label;
},




"override protected function init",function()
{
this[$init]();


this.setSize(100,20);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();


this.addChild(this._back);

this._face=new flash.display.Sprite();


this._face.x=1;
this._face.y=1;
this.addChild(this._face);

this._label=new com.bit101.components.Label();
this.addChild(this._label);

this.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this.addEventListener(flash.events.MouseEvent.ROLL_OVER,$$bound(this,"onMouseOver"));
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._face.graphics.clear();
this._face.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._face.graphics.drawRect(0,0,this._width-2,this._height-2);
this._face.graphics.endFill();

this._label.autoSize=true;
this._label.text=this._labelText;
if(this._label.width>this._width-4)
{
this._label.autoSize=false;
this._label.width=this._width-4;
}
else
{
this._label.autoSize=true;
}
this._label.draw();
this._label.move(this._width/2-this._label.width/2,this._height/2-this._label.height/2);

},












"protected function onMouseOver",function(event)
{
this._over=true;
this.addEventListener(flash.events.MouseEvent.ROLL_OUT,$$bound(this,"onMouseOut"));
},





"protected function onMouseOut",function(event)
{
this._over=false;
if(!this._down)
{

}
this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,$$bound(this,"onMouseOut"));
},





"protected function onMouseDown",function(event)
{
this._down=true;

this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},





"protected function onMouseUp",function(event)
{
if(this._toggle&&this._over)
{
this._selected=!this._selected;
}
this._down=this._selected;

this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},











"public function set label",function(str)
{
this._labelText=str;
this.draw();
},
"public function get label",function()
{
return this._labelText;
},

"public function set selected",function(value)
{
if(!this._toggle)
{
value=false;
}

this._selected=value;
this._down=this._selected;

},
"public function get selected",function()
{
return this._selected;
},

"public function set toggle",function(value)
{
this._toggle=value;
},
"public function get toggle",function()
{
return this._toggle;
},


];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);
// class com.bit101.components.UISlider
joo.classLoader.prepare(



























"package com.bit101.components",




"public class UISlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.events.Event);},

"protected var",{_label: undefined},
"protected var",{_valueLabel: undefined},
"protected var",{_slider: undefined},
"protected var",{_precision:1},
"protected var",{_sliderClass: undefined},
"protected var",{_labelText: undefined},
"protected var",{_tick:1},










"public function UISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._labelText=label;
this[$super](parent,x,y);
if(defaultEventHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultEventHandler);
}
this.formatValueLabel();
},




"override protected function addChildren",function()
{
this._label=new com.bit101.components.Label(this,0,0);
this._slider=new this._sliderClass(this,0,0,$$bound(this,"onSliderChange"));
this._valueLabel=new com.bit101.components.Label(this);
},




"protected function formatValueLabel",function()
{
var mult=Math.pow(10,this._precision);
var val=(Math.round(this._slider.value*mult)/mult).toString();
var parts=val.split(".");
if(parts[1]==null)
{
if(this._precision>0)
{
val+=".";
}
for(var i=0;i<this._precision;i++)
{
val+="0";
}
}
else if(parts[1].length<this._precision)
{
for(i=0;i<this._precision-parts[1].length;i++)
{
val+="0";
}
}
this._valueLabel.text=val;
this.positionLabel();
},




"protected function positionLabel",function()
{

},











"override public function draw",function()
{
this[$draw]();
this._label.text=this._labelText;
this._label.draw();
this.formatValueLabel();
},







"public function setSliderParams",function(min,max,value)
{
this._slider.setSliderParams(min,max,value);
},












"protected function onSliderChange",function(event)
{
this.formatValueLabel();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},











"public function set value",function(v)
{
this._slider.value=v;
this.formatValueLabel();
},
"public function get value",function()
{
return this._slider.value;
},




"public function set maximum",function(m)
{
this._slider.maximum=m;
},
"public function get maximum",function()
{
return this._slider.maximum;
},




"public function set minimum",function(m)
{
this._slider.minimum=m;
},
"public function get minimum",function()
{
return this._slider.minimum;
},




"public function set labelPrecision",function(decimals)
{
this._precision=decimals;
},
"public function get labelPrecision",function()
{
return this._precision;
},




"public function set label",function(str)
{
this._labelText=str;

this.draw();
},
"public function get label",function()
{
return this._labelText;
},




"public function set tick",function(t)
{
this._tick=t;
this._slider.tick=this._tick;
},
"public function get tick",function()
{
return this._tick;
},


];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.Label","Math"]
);
// class com.bit101.components.IndicatorLight
joo.classLoader.prepare(



























"package com.bit101.components",








"public class IndicatorLight extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.geom.Matrix,flash.display.GradientType,flash.display.Shape,flash.events.TimerEvent,flash.utils.Timer);},

"protected var",{_color: undefined},
"protected var",{_lit:false},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_lite: undefined},
"protected var",{_timer: undefined},











"public function IndicatorLight",function(parent,xpos,ypos,color,label)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}color=0xff0000;}label="";}
this._color=color;
this._labelText=label;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this._timer=new flash.utils.Timer(500);
this._timer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onTimer"));
},




"override protected function addChildren",function()
{
this._lite=new flash.display.Shape();
this.addChild(this._lite);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();
},




"protected function drawLite",function()
{
var colors;
if(this._lit)
{
colors=[0xffffff,this._color];
}
else
{
colors=[0xffffff,0];
}

this._lite.graphics.clear();
var matrix=new flash.geom.Matrix();
matrix.createGradientBox(10,10,0,-2.5,-2.5);
this._lite.graphics.beginGradientFill(flash.display.GradientType.RADIAL,colors,[1,1],[0,255],matrix);
this._lite.graphics.drawCircle(5,5,5);
this._lite.graphics.endFill();
},











"protected function onTimer",function(event)
{
this._lit=!this._lit;
this.draw();
},











"override public function draw",function()
{
this[$draw]();
this.drawLite();

this._label.text=this._labelText;
this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._width=this._label.width+12;
this._height=10;
},




"public function flash",function(interval)
{if(arguments.length<1){interval=500;}
if(interval<1)
{
this._timer.stop();
this.isLit=false;
return;
}
this._timer.delay=interval;
this._timer.start();
},











"public function set isLit",function(value)
{
this._timer.stop();
this._lit=value;
this.drawLite();
},
"public function get isLit",function()
{
return this._lit;
},




"public function set color",function(value)
{
this._color=value;
this.draw();
},
"public function get color",function()
{
return this._color;
},




"public function get isFlashing",function()
{
return this._timer.running;
},




"public function set label",function(str)
{
this._labelText=str;
this.draw();
},
"public function get label",function()
{
return this._labelText;
},


];},[],["com.bit101.components.Component","flash.utils.Timer","flash.events.TimerEvent","flash.display.Shape","com.bit101.components.Label","flash.geom.Matrix","flash.display.GradientType"]
);
// class com.bit101.components.CheckBox
joo.classLoader.prepare(



























"package com.bit101.components",





"public class CheckBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.events.MouseEvent,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_button: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_selected:false},










"public function CheckBox",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.MouseEvent.CLICK,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.buttonMode=true;
this.useHandCursor=true;
this.mouseChildren=false;
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();
this._back.filters=[this.getShadow(2,true)];
this.addChild(this._back);

this._button=new flash.display.Sprite();
this._button.filters=[this.getShadow(1)];
this._button.visible=false;
this.addChild(this._button);

this._label=new com.bit101.components.Label(this,0,0,this._labelText);
this.draw();

this.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onClick"));
},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,10,10);
this._back.graphics.endFill();

this._button.graphics.clear();
this._button.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._button.graphics.drawRect(2,2,6,6);

this._label.text=this._labelText;
this._label.draw();
this._label.x=12;
this._label.y=(10-this._label.height)/2;
this._width=this._label.width+12;
this._height=10;
},












"protected function onClick",function(event)
{
this._selected=!this._selected;
this._button.visible=this._selected;
},











"public function set label",function(str)
{
this._labelText=str;
this.invalidate();
},
"public function get label",function()
{
return this._labelText;
},




"public function set selected",function(s)
{
this._selected=s;
this._button.visible=this._selected;
},
"public function get selected",function()
{
return this._selected;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this.mouseChildren=false;
},

];},[],["com.bit101.components.Component","flash.events.MouseEvent","flash.display.Sprite","com.bit101.components.Label","com.bit101.components.Style"]
);
// class com.bit101.components.Knob
joo.classLoader.prepare(



























"package com.bit101.components",






"public class Knob extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"public static const",{VERTICAL:"vertical"},
"public static const",{HORIZONTAL:"horizontal"},
"public static const",{ROTATE:"rotate"},

"protected var",{_knob: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText:""},
"protected var",{_max:100},
"protected var",{_min:0},
"protected var",{_mode:function(){return(com.bit101.components.Knob.VERTICAL);}},
"protected var",{_mouseRange:100},
"protected var",{_precision:1},
"protected var",{_radius:20},
"protected var",{_startX: undefined},
"protected var",{_startY: undefined},
"protected var",{_value:0},
"protected var",{_valueLabel: undefined},










"public function Knob",function(parent,xpos,ypos,label,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}label="";}defaultHandler=null;}
this._labelText=label;
this[$super](parent,xpos,ypos);this._mode=this._mode();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
},




"override protected function addChildren",function()
{
this._knob=new flash.display.Sprite();
this._knob.buttonMode=true;
this._knob.useHandCursor=true;
this._knob.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this.addChild(this._knob);

this._label=new com.bit101.components.Label();
this._label.autoSize=true;
this.addChild(this._label);

this._valueLabel=new com.bit101.components.Label();
this._valueLabel.autoSize=true;
this.addChild(this._valueLabel);
},




"protected function drawKnob",function()
{
this._knob.graphics.clear();
this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._knob.graphics.drawCircle(0,0,this._radius);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._knob.graphics.drawCircle(0,0,this._radius-2);
this._knob.graphics.endFill();

this._knob.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
var s=this._radius*.1;
this._knob.graphics.drawRect(this._radius,-s,s*1.5,s*2);
this._knob.graphics.endFill();

this._knob.x=this._radius;
this._knob.y=this._radius+20;
this.updateKnob();
},




"protected function updateKnob",function()
{
this._knob.rotation=-225+(this._value-this._min)/(this._max-this._min)*270;
this.formatValueLabel();
},




"protected function correctValue",function()
{
if(this._max>this._min)
{
this._value=Math.min(this._value,this._max);
this._value=Math.max(this._value,this._min);
}
else
{
this._value=Math.max(this._value,this._max);
this._value=Math.min(this._value,this._min);
}
},




"protected function formatValueLabel",function()
{
var mult=Math.pow(10,this._precision);
var val=(Math.round(this._value*mult)/mult).toString();
var parts=val.split(".");
if(parts[1]==null)
{
if(this._precision>0)
{
val+=".";
}
for(var i=0;i<this._precision;i++)
{
val+="0";
}
}
else if(parts[1].length<this._precision)
{
for(i=0;i<this._precision-parts[1].length;i++)
{
val+="0";
}
}
this._valueLabel.text=val;
this._valueLabel.draw();
this._valueLabel.x=this.width/2-this._valueLabel.width/2;
},








"override public function draw",function()
{
this[$draw]();

this.drawKnob();

this._label.text=this._labelText;
this._label.draw();
this._label.x=this._radius-this._label.width/2;
this._label.y=0;

this.formatValueLabel();
this._valueLabel.x=this._radius-this._valueLabel.width/2;
this._valueLabel.y=this._radius*2+20;

this._width=this._radius*2;
this._height=this._radius*2+40;
},








"protected function onMouseDown",function(event)
{


this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},




"protected function onMouseMove",function(event)
{
if(this._mode==com.bit101.components.Knob.ROTATE)
{
var angle=0;
var rot=angle*180/Math.PI-135;
while(rot>360)rot-=360;
while(rot<0)rot+=360;
if(rot>270&&rot<315)rot=270;
if(rot>=315&&rot<=360)rot=0;
this._value=rot/270*(this._max-this._min)+this._min;

this._knob.rotation=rot+135;
this.formatValueLabel();
}
else if(this._mode==com.bit101.components.Knob.VERTICAL)
{
var oldValue=this._value;
var diff=this._startY-0;
var range=this._max-this._min;
var percent=range/this._mouseRange;
this._value+=percent*diff;
this.correctValue();
if(this._value!=oldValue)
{
this.updateKnob();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this._startY=0;
}
else if(this._mode==com.bit101.components.Knob.HORIZONTAL)
{
oldValue=this._value;
diff=this._startX-0;
range=this._max-this._min;
percent=range/this._mouseRange;
this._value-=percent*diff;
this.correctValue();
if(this._value!=oldValue)
{
this.updateKnob();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this._startX=0;
}
},




"protected function onMouseUp",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},









"public function set maximum",function(m)
{
this._max=m;
this.correctValue();
this.updateKnob();
},
"public function get maximum",function()
{
return this._max;
},




"public function set minimum",function(m)
{
this._min=m;
this.correctValue();
this.updateKnob();
},
"public function get minimum",function()
{
return this._min;
},




"public function set value",function(v)
{
this._value=v;
this.correctValue();
this.updateKnob();
},
"public function get value",function()
{
return this._value;
},




"public function set mouseRange",function(value)
{
this._mouseRange=value;
},
"public function get mouseRange",function()
{
return this._mouseRange;
},




"public function set labelPrecision",function(decimals)
{
this._precision=decimals;
},
"public function get labelPrecision",function()
{
return this._precision;
},




"public function set showValue",function(value)
{
this._valueLabel.visible=value;
},
"public function get showValue",function()
{
return this._valueLabel.visible;
},




"public function set label",function(str)
{
this._labelText=str;
this.draw();
},
"public function get label",function()
{
return this._labelText;
},

"public function set mode",function(value)
{
this._mode=value;
},
"public function get mode",function()
{
return this._mode;
},

"public function get radius",function()
{
return this._radius;
},

"public function set radius",function(value)
{
this._radius=value;
this.invalidate();
},
];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math"]
);
// class com.bit101.components.VScrollBar
joo.classLoader.prepare(



























"package com.bit101.components",



"public class VScrollBar extends com.bit101.components.ScrollBar",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Slider);},








"public function VScrollBar",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.Slider.VERTICAL,parent,xpos,ypos,defaultHandler);
},
];},[],["com.bit101.components.ScrollBar","com.bit101.components.Slider"]
);
// class com.bit101.components.InputText
joo.classLoader.prepare(

























"package com.bit101.components",








"public class InputText extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,flash.display.Sprite,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_password:false},
"protected var",{_text:""},
"protected var",{_tf: undefined},









"public function InputText",function(parent,xpos,ypos,text,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}defaultHandler=null;}
this.text=text;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function init",function()
{
this[$init]();
this.setSize(100,16);
},




"override protected function addChildren",function()
{
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._tf=new flash.text.TextField();
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.INPUT_TEXT);
this.addChild(this._tf);
this._tf.addEventListener(flash.events.Event.CHANGE,$$bound(this,"onChange"));

},











"override public function draw",function()
{
this[$draw]();
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();

this._tf.displayAsPassword=this._password;

if(this._text!=null)
{
this._tf.text=this._text;
}
else
{
this._tf.text="";
}
this._tf.width=this._width-4;
if(this._tf.text=="")
{
this._tf.text="X";
this._tf.height=Math.min(this._tf.textHeight+4,this._height);
this._tf.text="";
}
else
{
this._tf.height=Math.min(this._tf.textHeight+4,this._height);
}
this._tf.x=2;
this._tf.y=Math.round(this._height/2-this._tf.height/2);
},












"protected function onChange",function(event)
{
this._text=this._tf.text;
},











"public function set text",function(t)
{
this._text=t;
if(this._text==null)this._text="";
this.invalidate();
},
"public function get text",function()
{
return this._text;
},




"public function get textField",function()
{
return this._tf;
},




"public function set restrict",function(str)
{
this._tf.restrict=str;
},
"public function get restrict",function()
{
return this._tf.restrict;
},




"public function set maxChars",function(max)
{
this._tf.maxChars=max;
},
"public function get maxChars",function()
{
return this._tf.maxChars;
},




"public function set password",function(b)
{
this._password=b;
this.invalidate();
},
"public function get password",function()
{
return this._password;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},

];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","Math"]
);
// class com.bit101.components.TextArea
joo.classLoader.prepare(



























"package com.bit101.components",





"public class TextArea extends com.bit101.components.Text",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$onChange=$$l+'onChange',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(com.bit101.components.VScrollBar,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_scrollbar: undefined},








"public function TextArea",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this[$super](parent,xpos,ypos,text);
},




"protected override function init",function()
{
this[$init]();
this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL,$$bound(this,"onMouseWheel"));
},



"override protected function addChildren",function()
{
this[$addChildren]();
this._scrollbar=new com.bit101.components.VScrollBar(this,0,0,$$bound(this,"onScrollbarScroll"));
this._tf.addEventListener(flash.events.Event.SCROLL,$$bound(this,"onTextScroll"));
},




"protected function updateScrollbar",function()
{
var visibleLines=this._tf.numLines-this._tf.maxScrollV+1;
var percent=visibleLines/this._tf.numLines;
this._scrollbar.setSliderParams(1,this._tf.maxScrollV,this._tf.scrollV);
this._scrollbar.setThumbPercent(percent);
this._scrollbar.pageSize=visibleLines;
},











"override public function draw",function()
{
this[$draw]();

this._tf.width=this._width-this._scrollbar.width-4;
this._scrollbar.x=this._width-this._scrollbar.width;
this._scrollbar.height=this._height;
this._scrollbar.draw();
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onTextScrollDelay"));
},











"protected function onTextScrollDelay",function(event)
{
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onTextScrollDelay"));
this.updateScrollbar();
},




"protected override function onChange",function(event)
{
this[$onChange](event);
this.updateScrollbar();
},




"protected function onScrollbarScroll",function(event)
{
this._tf.scrollV=Math.round(this._scrollbar.value);
},




"protected function onTextScroll",function(event)
{
this._scrollbar.value=this._tf.scrollV;
this.updateScrollbar();
},




"protected function onMouseWheel",function(event)
{
this._scrollbar.value-=event.delta;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},
];},[],["com.bit101.components.Text","flash.events.MouseEvent","com.bit101.components.VScrollBar","flash.events.Event","Math"]
);
// class com.bit101.components.VRangeSlider
joo.classLoader.prepare("package com.bit101.components",



"public class VRangeSlider extends com.bit101.components.RangeSlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function VRangeSlider",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.RangeSlider.VERTICAL,parent,xpos,ypos,defaultHandler);
},
];},[],["com.bit101.components.RangeSlider"]
);
// class com.bit101.components.ScrollBar
joo.classLoader.prepare(



























"package com.bit101.components",








"public class ScrollBar extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildren=$$l+'addChildren',$init=$$l+'init',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.display.Shape,flash.events.MouseEvent,flash.events.TimerEvent,flash.events.Event,flash.utils.Timer,com.bit101.components.Style,com.bit101.components.Slider,com.bit101.components.ScrollSlider);},

"protected const",{DELAY_TIME:500},
"protected const",{REPEAT_TIME:100},
"protected const",{UP:"up"},
"protected const",{DOWN:"down"},

"protected var",{_upButton: undefined},
"protected var",{_downButton: undefined},
"protected var",{_scrollSlider: undefined},
"protected var",{_orientation: undefined},
"protected var",{_lineSize:1},
"protected var",{_delayTimer: undefined},
"protected var",{_repeatTimer: undefined},
"protected var",{_direction: undefined},
"protected var",{_shouldRepeat:false},









"public function ScrollBar",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"override protected function addChildren",function()
{
this._scrollSlider=new com.bit101.components.ScrollSlider(this._orientation,this,0,10,$$bound(this,"onChange"));
this._upButton=new com.bit101.components.PushButton(this,0,0,"");
this._upButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onUpClick"));
this._upButton.setSize(10,10);
var upArrow=new flash.display.Shape();
this._upButton.addChild(upArrow);

this._downButton=new com.bit101.components.PushButton(this,0,0,"");
this._downButton.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDownClick"));
this._downButton.setSize(10,10);
var downArrow=new flash.display.Shape();
this._downButton.addChild(downArrow);

if(this._orientation==com.bit101.components.Slider.VERTICAL)
{
upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
upArrow.graphics.moveTo(5,3);
upArrow.graphics.lineTo(7,6);
upArrow.graphics.lineTo(3,6);
upArrow.graphics.endFill();

downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
downArrow.graphics.moveTo(5,7);
downArrow.graphics.lineTo(7,4);
downArrow.graphics.lineTo(3,4);
downArrow.graphics.endFill();
}
else
{
upArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
upArrow.graphics.moveTo(3,5);
upArrow.graphics.lineTo(6,7);
upArrow.graphics.lineTo(6,3);
upArrow.graphics.endFill();

downArrow.graphics.beginFill(com.bit101.components.Style.DROPSHADOW,0.5);
downArrow.graphics.moveTo(7,5);
downArrow.graphics.lineTo(4,7);
downArrow.graphics.lineTo(4,3);
downArrow.graphics.endFill();
}


},




"protected override function init",function()
{
this[$init]();
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this.setSize(100,10);
}
else
{
this.setSize(10,100);
}
this._delayTimer=new flash.utils.Timer(this.DELAY_TIME,1);
this._delayTimer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE,$$bound(this,"onDelayComplete"));
this._repeatTimer=new flash.utils.Timer(this.REPEAT_TIME);
this._repeatTimer.addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,"onRepeat"));
},













"public function setSliderParams",function(min,max,value)
{
this._scrollSlider.setSliderParams(min,max,value);
},




"public function setThumbPercent",function(value)
{
this._scrollSlider.setThumbPercent(value);
},




"override public function draw",function()
{
this[$draw]();
if(this._orientation==com.bit101.components.Slider.VERTICAL)
{
this._scrollSlider.x=0;
this._scrollSlider.y=10;
this._scrollSlider.width=10;
this._scrollSlider.height=this._height-20;
this._downButton.x=0;
this._downButton.y=this._height-10;
}
else
{
this._scrollSlider.x=10;
this._scrollSlider.y=0;
this._scrollSlider.width=this._width-20;
this._scrollSlider.height=this._height;
this._downButton.x=this._width-10;
this._downButton.y=0;
}
this._scrollSlider.draw();
},












"public function set value",function(v)
{
this._scrollSlider.value=v;
},
"public function get value",function()
{
return this._scrollSlider.value;
},




"public function set minimum",function(v)
{
this._scrollSlider.minimum=v;
},
"public function get minimum",function()
{
return this._scrollSlider.minimum;
},




"public function set maximum",function(v)
{
this._scrollSlider.maximum=v;
},
"public function get maximum",function()
{
return this._scrollSlider.maximum;
},




"public function set lineSize",function(value)
{
this._lineSize=value;
},
"public function get lineSize",function()
{
return this._lineSize;
},




"public function set pageSize",function(value)
{
this._scrollSlider.pageSize=value;
this.invalidate();
},
"public function get pageSize",function()
{
return this._scrollSlider.pageSize;
},










"protected function onUpClick",function(event)
{
this.goUp();
this._shouldRepeat=true;
this._direction=this.UP;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function goUp",function()
{
this._scrollSlider.value-=this._lineSize;
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},

"protected function onDownClick",function(event)
{
this.goDown();
this._shouldRepeat=true;
this._direction=this.DOWN;
this._delayTimer.start();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function goDown",function()
{
this._scrollSlider.value+=this._lineSize;
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},

"protected function onMouseUp",function(event)
{
this._delayTimer.stop();
this._repeatTimer.stop();
this._shouldRepeat=false;
},

"protected function onChange",function(event)
{
this.dispatchEvent(event);
},

"protected function onDelayComplete",function(event)
{
if(this._shouldRepeat)
{
this._repeatTimer.start();
}
},

"protected function onRepeat",function(event)
{
if(this._direction==this.UP)
{
this.goUp();
}
else
{
this.goDown();
}
},




];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.ScrollSlider","com.bit101.components.PushButton","flash.events.MouseEvent","flash.display.Shape","com.bit101.components.Slider","com.bit101.components.Style","flash.utils.Timer","flash.events.TimerEvent"]
);
// class com.bit101.components.HSlider
joo.classLoader.prepare(



























"package com.bit101.components",



"public class HSlider extends com.bit101.components.Slider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Slider);},








"public function HSlider",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.Slider.HORIZONTAL,parent,xpos,ypos,defaultHandler);
},

];},[],["com.bit101.components.Slider"]
);
// class com.bit101.components.Meter
joo.classLoader.prepare(



























"package com.bit101.components",






"public class Meter extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$setSize=$$l+'setSize';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,Math,flash.events.Event,com.bit101.components.Style);},

"protected var",{_damp:.8},
"protected var",{_dial: undefined},
"protected var",{_label: undefined},
"protected var",{_labelText: undefined},
"protected var",{_maximum:1.0},
"protected var",{_maxLabel: undefined},
"protected var",{_minimum:0.0},
"protected var",{_minLabel: undefined},
"protected var",{_needle: undefined},
"protected var",{_needleMask: undefined},
"protected var",{_showValues:true},
"protected var",{_targetRotation:0},
"protected var",{_value:0.0},
"protected var",{_velocity:0},











"public function Meter",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this._labelText=text;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this._width=200;
this._height=100;
},





"override protected function addChildren",function()
{
this._dial=new flash.display.Sprite();
this.addChild(this._dial);

this._needle=new flash.display.Sprite();
this._needle.rotation=-50;
this._dial.addChild(this._needle);

this._needleMask=new flash.display.Sprite();
this.addChild(this._needleMask);
this._dial.mask=this._needleMask;

this._minLabel=new com.bit101.components.Label(this);
this._minLabel.text=this._minimum.toString();

this._maxLabel=new com.bit101.components.Label(this);
this._maxLabel.autoSize=true;
this._maxLabel.text=this._maximum.toString();

this._label=new com.bit101.components.Label(this);
this._label.text=this._labelText;
},










"override public function draw",function()
{
var startAngle=-140*Math.PI/180;
var endAngle=-40*Math.PI/180;

this.drawBackground();
this.drawDial(startAngle,endAngle);
this.drawTicks(startAngle,endAngle);
this.drawNeedle();

this._minLabel.move(10,this._height-this._minLabel.height-4);
this._maxLabel.move(this._width-this._maxLabel.width-10,this._height-this._maxLabel.height-4);
this._label.move((this._width-this._label.width)/2,this._height*.5);
this.update();
},






"override public function setSize",function(w,h)
{
this[$setSize](w,w/2);
},








"protected function drawBackground",function()
{
this.graphics.clear();
this.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this.graphics.drawRect(0,0,this._width,this._height);
this.graphics.endFill();

this.graphics.beginFill(com.bit101.components.Style.PANEL);
this.graphics.drawRect(1,1,this._width-2,this._height-2);
this.graphics.endFill();
},




"protected function drawDial",function(startAngle,endAngle)
{
this._dial.x=this._width/2;
this._dial.y=this._height*1.25;
this._dial.graphics.clear();
this._dial.graphics.lineStyle(0,com.bit101.components.Style.BACKGROUND);
this._dial.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
var r1=this._height*1.05;
var r2=this._height*0.96;

this._dial.graphics.moveTo(Math.cos(startAngle)*r1,Math.sin(startAngle)*r1);
for(var i=startAngle;i<endAngle;i+=.1)
{
this._dial.graphics.lineTo(Math.cos(i)*r1,Math.sin(i)*r1);
}
this._dial.graphics.lineTo(Math.cos(endAngle)*r1,Math.sin(endAngle)*r1);

this._dial.graphics.lineTo(Math.cos(endAngle)*r2,Math.sin(endAngle)*r2);
for(i=endAngle;i>startAngle;i-=.1)
{
this._dial.graphics.lineTo(Math.cos(i)*r2,Math.sin(i)*r2);
}
this._dial.graphics.lineTo(Math.cos(startAngle)*r2,Math.sin(startAngle)*r2);
this._dial.graphics.lineTo(Math.cos(startAngle)*r1,Math.sin(startAngle)*r1);

},




"protected function drawTicks",function(startAngle,endAngle)
{
var r1=this._height*1.05;
var r2=this._height*0.96;
var r3=this._height*1.13;
var tick=0;
for(var i=0;i<9;i++)
{
var angle=startAngle+i*(endAngle-startAngle)/8;
this._dial.graphics.moveTo(Math.cos(angle)*r2,Math.sin(angle)*r2);
if(tick++%2==0)
{
this._dial.graphics.lineTo(Math.cos(angle)*r3,Math.sin(angle)*r3);
}
else
{
this._dial.graphics.lineTo(Math.cos(angle)*r1,Math.sin(angle)*r1);
}
}
},




"protected function drawNeedle",function()
{
this._needle.graphics.clear();
this._needle.graphics.beginFill(0xff0000);
this._needle.graphics.drawRect(-0.5,-this._height*1.10,1,this._height*1.10);


this._needleMask.graphics.clear();
this._needleMask.graphics.beginFill(0);
this._needleMask.graphics.drawRect(0,0,this._width,this._height);
this._needleMask.graphics.endFill();
},




"protected function update",function()
{
this._value=Math.max(this._value,this._minimum);
this._value=Math.min(this._value,this._maximum);
this._targetRotation=-50+this._value/(this._maximum-this._minimum)*100;
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
},








"protected function onEnterFrame",function(event)
{
var dist=this._targetRotation-this._needle.rotation;
this._velocity+=dist*.05;
this._velocity*=this._damp;
if(Math.abs(this._velocity)<.1&&Math.abs(dist)<.1)
{
this._needle.rotation=this._targetRotation;
this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,"onEnterFrame"));
}
else
{
this._needle.rotation+=this._velocity;
}
},








"public function set maximum",function(value)
{
this._maximum=value;
this._maxLabel.text=this._maximum.toString();
this.update();
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set minimum",function(value)
{
this._minimum=value;
this._minLabel.text=this._minimum.toString();
this.update();
},
"public function get minimum",function()
{
return this._minimum;
},




"public function set value",function(val)
{
this._value=val;
this.update();
},
"public function get value",function()
{
return this._value;
},




"public function set label",function(value)
{
this._labelText=value;
this._label.text=this._labelText;
},
"public function get label",function()
{
return this._labelText;
},




"public function set showValues",function(value)
{
this._showValues=value;
this._minLabel.visible=this._showValues;
this._maxLabel.visible=this._showValues;
},
"public function get showValues",function()
{
return this._showValues;
},




"public function set damp",function(value)
{
this._damp=value;
},
"public function get damp",function()
{
return this._damp;
},

];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Label","Math","com.bit101.components.Style","flash.events.Event"]
);
// class com.bit101.components.VBox
joo.classLoader.prepare(




























"package com.bit101.components",






"public class VBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildAt=$$l+'addChildAt',$removeChild=$$l+'removeChild',$removeChildAt=$$l+'removeChildAt',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.events.Event);},

"protected var",{_spacing:5},








"public function VBox",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"override public function addChildAt",function(child,index)
{
this[$addChildAt](child,index);
child.addEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChild",function(child)
{
this.removeChild(child);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChildAt",function(index)
{
var child=this.removeChildAt(index);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"protected function onResize",function(event)
{
this.invalidate();
},




"override public function draw",function()
{
this._width=0;
this._height=0;
var ypos=0;
for(var i=0;i<this.numChildren;i++)
{
var child=this.getChildAt(i);
child.y=ypos;
ypos+=child.height;
ypos+=this._spacing;
this._height+=child.height;
this._width=Math.max(this._width,child.width);
}
this._height+=this._spacing*(this.numChildren-1);
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},




"public function set spacing",function(s)
{
this._spacing=s;
this.invalidate();
},
"public function get spacing",function()
{
return this._spacing;
},
];},[],["com.bit101.components.Component","flash.events.Event","Math"]
);
// class com.bit101.components.Panel
joo.classLoader.prepare(



























"package com.bit101.components",





"public class Panel extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Style);},

"protected var",{_mask: undefined},
"protected var",{_background: undefined},
"protected var",{_color:-1},
"protected var",{_shadow:true},
"protected var",{_gridSize:10},
"protected var",{_showGrid:false},
"protected var",{_gridColor:0xd0d0d0},





"public var",{content: undefined},








"public function Panel",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},





"override protected function init",function()
{
this[$init]();
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this._background=new flash.display.Sprite();
this.addChild(this._background);

this._mask=new flash.display.Sprite();
this._mask.mouseEnabled=false;
this.addChild(this._mask);

this.content=new flash.display.Sprite();
this.addChild(this.content);
this.content.mask=this._mask;


},











"override public function draw",function()
{
this[$draw]();
this._background.graphics.clear();
this._background.graphics.lineStyle(1,0,0.1);
if(this._color==-1)
{
this._background.graphics.beginFill(com.bit101.components.Style.PANEL);
}
else
{
this._background.graphics.beginFill(this._color);
}
this._background.graphics.drawRect(0,0,this._width,this._height);
this._background.graphics.endFill();

this.drawGrid();

this._mask.graphics.clear();
this._mask.graphics.beginFill(0xff0000);
this._mask.graphics.drawRect(0,0,this._width,this._height);
this._mask.graphics.endFill();
},

"protected function drawGrid",function()
{
if(!this._showGrid)return;

this._background.graphics.lineStyle(0,this._gridColor);
for(var i=0;i<this._width;i+=this._gridSize)
{
this._background.graphics.moveTo(i,0);
this._background.graphics.lineTo(i,this._height);
}
for(i=0;i<this._height;i+=this._gridSize)
{
this._background.graphics.moveTo(0,i);
this._background.graphics.lineTo(this._width,i);
}
},














"public function set shadow",function(b)
{
this._shadow=b;
if(this._shadow)
{

}
else
{

}
},
"public function get shadow",function()
{
return this._shadow;
},




"public function set color",function(c)
{
this._color=c;
this.invalidate();
},
"public function get color",function()
{
return this._color;
},




"public function set gridSize",function(value)
{
this._gridSize=value;
this.invalidate();
},
"public function get gridSize",function()
{
return this._gridSize;
},




"public function set showGrid",function(value)
{
this._showGrid=value;
this.invalidate();
},
"public function get showGrid",function()
{
return this._showGrid;
},




"public function set gridColor",function(value)
{
this._gridColor=value;
this.invalidate();
},
"public function get gridColor",function()
{
return this._gridColor;
},
];},[],["com.bit101.components.Component","flash.display.Sprite","com.bit101.components.Style"]
);
// class com.bit101.components.HUISlider
joo.classLoader.prepare(



























"package com.bit101.components",




"public class HUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$positionLabel=$$l+'positionLabel',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.HSlider);},










"public function HUISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._sliderClass=com.bit101.components.HSlider;
this[$super](parent,x,y,label,defaultEventHandler);
},




"override protected function init",function()
{
this[$init]();
this.setSize(200,18);
},




"override protected function positionLabel",function()
{
this._valueLabel.x=this._slider.x+this._slider.width+5;
},











"override public function draw",function()
{
this[$draw]();
this._slider.x=this._label.width+5;
this._slider.y=this.height/2-this._slider.height/2;
this._slider.width=this.width-this._label.width-50-10;

this._valueLabel.x=this._slider.x+this._slider.width+5;
},









];},[],["com.bit101.components.UISlider","com.bit101.components.HSlider"]
);
// class com.bit101.components.ComboBox
joo.classLoader.prepare(



























"package com.bit101.components",








"public class ComboBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.PushButton,flash.geom.Rectangle,String,com.bit101.components.List,flash.events.MouseEvent,flash.events.Event,flash.geom.Point);},

"public static const",{TOP:"top"},
"public static const",{BOTTOM:"bottom"},

"protected var",{_defaultLabel:""},
"protected var",{_dropDownButton: undefined},
"protected var",{_items: undefined},
"protected var",{_labelButton: undefined},
"protected var",{_list: undefined},
"protected var",{_numVisibleItems:6},
"protected var",{_open:false},
"protected var",{_openPosition:function(){return(com.bit101.components.ComboBox.BOTTOM);}},
"protected var",{_stage: undefined},










"public function ComboBox",function(parent,xpos,ypos,defaultLabel,items)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultLabel="";}items=null;}
this._defaultLabel=defaultLabel;
this._items=items;
this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$$bound(this,"onAddedToStage"));
this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
this[$super](parent,xpos,ypos);this._openPosition=this._openPosition();
},




"protected override function init",function()
{
this[$init]();
this.setSize(100,20);
this.setLabelButtonLabel();
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._list=new com.bit101.components.List(null,0,0,this._items);
this._list.addEventListener(flash.events.Event.SELECT,$$bound(this,"onSelect"));

this._labelButton=new com.bit101.components.PushButton(this,0,0,"",$$bound(this,"onDropDown"));
this._dropDownButton=new com.bit101.components.PushButton(this,0,0,"+",$$bound(this,"onDropDown"));
},




"protected function setLabelButtonLabel",function()
{
if(this.selectedItem==null)
{
this._labelButton.label=this._defaultLabel;
}
else if(is(this.selectedItem,String))
{
this._labelButton.label=this.selectedItem;
}
else if(is(this.selectedItem.label,String))
{
this._labelButton.label=this.selectedItem.label;
}
else
{
this._labelButton.label=this.selectedItem.toString();
}
},




"protected function removeList",function()
{
if(this._stage.contains(this._list))this._stage.removeChild(this._list);
this._stage.removeEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
this._dropDownButton.label="+";
},







"public override function draw",function()
{
this[$draw]();
this._labelButton.setSize(this._width-this._height+1,this._height);
this._labelButton.draw();

this._dropDownButton.setSize(this._height,this._height);
this._dropDownButton.draw();
this._dropDownButton.x=this._width-this.height;

this._list.setSize(this._width,this._numVisibleItems*this._list.listItemHeight);
},






"public function addItem",function(item)
{
this._list.addItem(item);
},






"public function addItemAt",function(item,index)
{
this._list.addItemAt(item,index);
},





"public function removeItem",function(item)
{
this._list.removeItem(item);
},





"public function removeItemAt",function(index)
{
this._list.removeItemAt(index);
},




"public function removeAll",function()
{
this._list.removeAll();
},











"protected function onDropDown",function(event)
{
this._open=!this._open;
if(this._open)
{
var point=new flash.geom.Point();
if(this._openPosition==com.bit101.components.ComboBox.BOTTOM)
{
point.y=this._height;
}
else
{
point.y=-this._numVisibleItems*this._list.listItemHeight;
}
point=this.localToGlobal(point);
this._list.move(point.x,point.y);
this._stage.addChild(this._list);
this._stage.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onStageClick"));
this._dropDownButton.label="-";
}
else
{
this.removeList();
}
},




"protected function onStageClick",function(event)
{

if(event.target==this._dropDownButton||event.target==this._labelButton)return;
if(new flash.geom.Rectangle(this._list.x,this._list.y,this._list.width,this._list.height).contains(event.stageX,event.stageY))return;

this._open=false;
this.removeList();
},




"protected function onSelect",function(event)
{
this._open=false;
this._dropDownButton.label="+";
if(this.stage!=null&&this.stage.contains(this._list))
{
this.stage.removeChild(this._list);
}
this.setLabelButtonLabel();
this.dispatchEvent(event);
},




"protected function onAddedToStage",function(event)
{
this._stage=this.stage;
},




"protected function onRemovedFromStage",function(event)
{
this.removeList();
},








"public function set selectedIndex",function(value)
{
this._list.selectedIndex=value;
this.setLabelButtonLabel();
},
"public function get selectedIndex",function()
{
return this._list.selectedIndex;
},




"public function set selectedItem",function(item)
{
this._list.selectedItem=item;
this.setLabelButtonLabel();
},
"public function get selectedItem",function()
{
return this._list.selectedItem;
},




"public function set defaultColor",function(value)
{
this._list.defaultColor=value;
},
"public function get defaultColor",function()
{
return this._list.defaultColor;
},




"public function set selectedColor",function(value)
{
this._list.selectedColor=value;
},
"public function get selectedColor",function()
{
return this._list.selectedColor;
},




"public function set rolloverColor",function(value)
{
this._list.rolloverColor=value;
},
"public function get rolloverColor",function()
{
return this._list.rolloverColor;
},




"public function set listItemHeight",function(value)
{
this._list.listItemHeight=value;
this.invalidate();
},
"public function get listItemHeight",function()
{
return this._list.listItemHeight;
},




"public function set openPosition",function(value)
{
this._openPosition=value;
},
"public function get openPosition",function()
{
return this._openPosition;
},




"public function set defaultLabel",function(value)
{
this._defaultLabel=value;
this.setLabelButtonLabel();
},
"public function get defaultLabel",function()
{
return this._defaultLabel;
},




"public function set numVisibleItems",function(value)
{
this._numVisibleItems=value;
this.invalidate();
},
"public function get numVisibleItems",function()
{
return this._numVisibleItems;
},




"public function set items",function(value)
{
this._list.items=value;
},
"public function get items",function()
{
return this._list.items;
},




"public function set listItemClass",function(value)
{
this._list.listItemClass=value;
},
"public function get listItemClass",function()
{
return this._list.listItemClass;
},





"public function set alternateColor",function(value)
{
this._list.alternateColor=value;
},
"public function get alternateColor",function()
{
return this._list.alternateColor;
},




"public function set alternateRows",function(value)
{
this._list.alternateRows=value;
},
"public function get alternateRows",function()
{
return this._list.alternateRows;
},
];},[],["com.bit101.components.Component","flash.events.Event","com.bit101.components.List","com.bit101.components.PushButton","String","flash.events.MouseEvent","flash.geom.Point","flash.geom.Rectangle"]
);
// class com.bit101.components.Label
joo.classLoader.prepare(



























"package com.bit101.components",







"public class Label extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.text.TextFieldAutoSize,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_autoSize:true},
"protected var",{_text:""},
"protected var",{_tf: undefined},








"public function Label",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this.text=text;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();


},




"override protected function addChildren",function()
{
this._height=18;
this._tf=new flash.text.TextField();
this._tf.height=this._height;
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.selectable=false;
this._tf.mouseEnabled=false;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.LABEL_TEXT);
this._tf.text=this._text;
this.addChild(this._tf);
this.draw();
},











"override public function draw",function()
{
this[$draw]();
this._tf.text=this._text;
if(this._autoSize)
{
this._tf.autoSize=flash.text.TextFieldAutoSize.LEFT;
this._width=this._tf.width;
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
}
else
{
this._tf.autoSize=flash.text.TextFieldAutoSize.NONE;
this._tf.width=this._width;
}
this._height=this._tf.height=18;
},












"public function set text",function(t)
{
this._text=t;
if(this._text==null)this._text="";
this.invalidate();
},
"public function get text",function()
{
return this._text;
},




"public function set autoSize",function(b)
{
this._autoSize=b;
},
"public function get autoSize",function()
{
return this._autoSize;
},




"public function get textField",function()
{
return this._tf;
},
];},[],["com.bit101.components.Component","flash.text.TextField","com.bit101.components.Style","flash.text.TextFormat","flash.text.TextFieldAutoSize","flash.events.Event"]
);
// class com.bit101.components.RangeSlider
joo.classLoader.prepare(



























"package com.bit101.components",







"public class RangeSlider extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_back: undefined},
"protected var",{_highLabel: undefined},
"protected var",{_highValue:100},
"protected var",{_labelMode:function(){return(com.bit101.components.RangeSlider.ALWAYS);}},
"protected var",{_labelPosition: undefined},
"protected var",{_labelPrecision:0},
"protected var",{_lowLabel: undefined},
"protected var",{_lowValue:0},
"protected var",{_maximum:100},
"protected var",{_maxHandle: undefined},
"protected var",{_minimum:0},
"protected var",{_minHandle: undefined},
"protected var",{_orientation:function(){return(com.bit101.components.RangeSlider.VERTICAL);}},
"protected var",{_tick:1},

"public static const",{ALWAYS:"always"},
"public static const",{BOTTOM:"bottom"},
"public static const",{HORIZONTAL:"horizontal"},
"public static const",{LEFT:"left"},
"public static const",{MOVE:"move"},
"public static const",{NEVER:"never"},
"public static const",{RIGHT:"right"},
"public static const",{TOP:"top"},
"public static const",{VERTICAL:"vertical"},











"public function RangeSlider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this._orientation=orientation;
this[$super](parent,xpos,ypos);this._labelMode=this._labelMode();this._orientation=this._orientation();
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this.setSize(110,10);
this._labelPosition=com.bit101.components.RangeSlider.TOP;
}
else
{
this.setSize(10,110);
this._labelPosition=com.bit101.components.RangeSlider.RIGHT;
}
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._back=new flash.display.Sprite();

this.addChild(this._back);

this._minHandle=new flash.display.Sprite();

this._minHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDragMin"));


this.addChild(this._minHandle);

this._maxHandle=new flash.display.Sprite();

this._maxHandle.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onDragMax"));


this.addChild(this._maxHandle);

this._lowLabel=new com.bit101.components.Label(this);
this._highLabel=new com.bit101.components.Label(this);
this._lowLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
},




"protected function drawBack",function()
{
this._back.graphics.clear();
this._back.graphics.beginFill(com.bit101.components.Style.BACKGROUND);
this._back.graphics.drawRect(0,0,this._width,this._height);
this._back.graphics.endFill();
},




"protected function drawHandles",function()
{
this._minHandle.graphics.clear();
this._minHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._maxHandle.graphics.clear();
this._maxHandle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._minHandle.graphics.drawRect(1,1,this._height-2,this._height-2);
this._maxHandle.graphics.drawRect(1,1,this._height-2,this._height-2);
}
else
{
this._minHandle.graphics.drawRect(1,1,this._width-2,this._width-2);
this._maxHandle.graphics.drawRect(1,1,this._width-2,this._width-2);
}
this._minHandle.graphics.endFill();
this.positionHandles();
},





"protected function positionHandles",function()
{
var range;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
range=this._width-this._height*2;
this._minHandle.x=(this._lowValue-this._minimum)/(this._maximum-this._minimum)*range;
this._maxHandle.x=this._height+(this._highValue-this._minimum)/(this._maximum-this._minimum)*range;
}
else
{
range=this._height-this._width*2;
this._minHandle.y=this._height-this._width-(this._lowValue-this._minimum)/(this._maximum-this._minimum)*range;
this._maxHandle.y=this._height-this._width*2-(this._highValue-this._minimum)/(this._maximum-this._minimum)*range;
}
this.updateLabels();
},




"protected function updateLabels",function()
{
this._lowLabel.text=this.getLabelForValue(this.lowValue);
this._highLabel.text=this.getLabelForValue(this.highValue);
this._lowLabel.draw();
this._highLabel.draw();

if(this._orientation==com.bit101.components.RangeSlider.VERTICAL)
{
this._lowLabel.y=this._minHandle.y+(this._width-this._lowLabel.height)*0.5;
this._highLabel.y=this._maxHandle.y+(this._width-this._highLabel.height)*0.5;
if(this._labelPosition==com.bit101.components.RangeSlider.LEFT)
{
this._lowLabel.x=-this._lowLabel.width-5;
this._highLabel.x=-this._highLabel.width-5;
}
else
{
this._lowLabel.x=this._width+5;
this._highLabel.x=this._width+5;
}
}
else
{
this._lowLabel.x=this._minHandle.x-this._lowLabel.width+this._height;
this._highLabel.x=this._maxHandle.x;
if(this._labelPosition==com.bit101.components.RangeSlider.BOTTOM)
{
this._lowLabel.y=this._height+2;
this._highLabel.y=this._height+2;
}
else
{
this._lowLabel.y=-this._lowLabel.height;
this._highLabel.y=-this._highLabel.height;
}

}
},





"protected function getLabelForValue",function(value)
{
var str=(Math.round(value*Math.pow(10,this._labelPrecision))/Math.pow(10,this._labelPrecision)).toString();
if(this._labelPrecision>0)
{
var decimal=str.split(".")[1]||"";
if(decimal.length==0)str+=".";
for(var i=decimal.length;i<this._labelPrecision;i++)
{
str+="0";
}
}
return str;
},








"override public function draw",function()
{
this[$draw]();
this.drawBack();
this.drawHandles();
},













"protected function onDragMin",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMinSlide"));
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._minHandle.startDrag(false,new flash.geom.Rectangle(0,0,this._maxHandle.x-this._height,0));
}
else
{
this._minHandle.startDrag(false,new flash.geom.Rectangle(0,this._maxHandle.y+this._width,0,this._height-this._maxHandle.y-this._width*2));
}
if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=true;
this._highLabel.visible=true;
}
},





"protected function onDragMax",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMaxSlide"));
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._maxHandle.startDrag(false,new flash.geom.Rectangle(this._minHandle.x+this._height,0,this._width-this._height-this._minHandle.x-this._height,0));
}
else
{
this._maxHandle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._minHandle.y-this._width));
}
if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=true;
this._highLabel.visible=true;
}
},





"protected function onDrop",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMinSlide"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMaxSlide"));

if(this._labelMode==com.bit101.components.RangeSlider.MOVE)
{
this._lowLabel.visible=false;
this._highLabel.visible=false;
}
},





"protected function onMinSlide",function(event)
{
var oldValue=this._lowValue;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._lowValue=this._minHandle.x/(this._width-this._height*2)*(this._maximum-this._minimum)+this._minimum;
}
else
{
this._lowValue=(this._height-this._width-this._minHandle.y)/(this.height-this._width*2)*(this._maximum-this._minimum)+this._minimum;
}
if(this._lowValue!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this.updateLabels();
},





"protected function onMaxSlide",function(event)
{
var oldValue=this._highValue;
if(this._orientation==com.bit101.components.RangeSlider.HORIZONTAL)
{
this._highValue=(this._maxHandle.x-this._height)/(this._width-this._height*2)*(this._maximum-this._minimum)+this._minimum;
}
else
{
this._highValue=(this._height-this._width*2-this._maxHandle.y)/(this._height-this._width*2)*(this._maximum-this._minimum)+this._minimum;
}
if(this._highValue!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
this.updateLabels();
},




"public function set minimum",function(value)
{
this._minimum=value;
this._maximum=Math.max(this._maximum,this._minimum);
this._lowValue=Math.max(this._lowValue,this._minimum);
this._highValue=Math.max(this._highValue,this._minimum);
this.positionHandles();
},
"public function get minimum",function()
{
return this._minimum;
},




"public function set maximum",function(value)
{
this._maximum=value;
this._minimum=Math.min(this._minimum,this._maximum);
this._lowValue=Math.min(this._lowValue,this._maximum);
this._highValue=Math.min(this._highValue,this._maximum);
this.positionHandles();
},
"public function get maximum",function()
{
return this._maximum;
},




"public function set lowValue",function(value)
{
this._lowValue=value;
this._lowValue=Math.min(this._lowValue,this._highValue);
this._lowValue=Math.max(this._lowValue,this._minimum);
this.positionHandles();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get lowValue",function()
{
return Math.round(this._lowValue/this._tick)*this._tick;
},




"public function set highValue",function(value)
{
this._highValue=value;
this._highValue=Math.max(this._highValue,this._lowValue);
this._highValue=Math.min(this._highValue,this._maximum);
this.positionHandles();
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
},
"public function get highValue",function()
{
return Math.round(this._highValue/this._tick)*this._tick;
},




"public function set labelMode",function(value)
{
this._labelMode=value;
this._highLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
this._lowLabel.visible=(this._labelMode==com.bit101.components.RangeSlider.ALWAYS);
},
"public function get labelMode",function()
{
return this._labelMode;
},




"public function set labelPosition",function(value)
{
this._labelPosition=value;
this.updateLabels();
},
"public function get labelPosition",function()
{
return this._labelPosition;
},




"public function set labelPrecision",function(value)
{
this._labelPrecision=value;
this.updateLabels();
},
"public function get labelPrecision",function()
{
return this._labelPrecision;
},




"public function set tick",function(value)
{
this._tick=value;
this.updateLabels();
},
"public function get tick",function()
{
return this._tick;
},


];},[],["com.bit101.components.Component","flash.events.Event","flash.display.Sprite","flash.events.MouseEvent","com.bit101.components.Label","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);
// class com.bit101.components.ScrollPane
joo.classLoader.prepare(



























"package com.bit101.components",








"public class ScrollPane extends com.bit101.components.Panel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.geom.Rectangle,com.bit101.components.VScrollBar,flash.display.Shape,com.bit101.components.HScrollBar,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_vScrollbar: undefined},
"protected var",{_hScrollbar: undefined},
"protected var",{_corner: undefined},
"protected var",{_dragContent:true},







"public function ScrollPane",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this.addEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=true;
this._background.buttonMode=true;
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this[$addChildren]();
this._vScrollbar=new com.bit101.components.VScrollBar(this,this.width-10,0,$$bound(this,"onScroll"));
this._hScrollbar=new com.bit101.components.HScrollBar(this,0,this.height-10,$$bound(this,"onScroll"));
this._corner=new flash.display.Shape();
this._corner.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._corner.graphics.drawRect(0,0,10,10);
this._corner.graphics.endFill();
this.addChild(this._corner);
},












"override public function draw",function()
{
this[$draw]();
this._vScrollbar.x=this.width-10;
this._vScrollbar.height=this.height-10;
this._hScrollbar.y=this.height-10;
this._hScrollbar.width=this.width-10;

this._vScrollbar.setThumbPercent((this._height-10)/this.content.height);
this._vScrollbar.maximum=Math.max(0,this.content.height-this._height+10);
this._vScrollbar.pageSize=this._height-10;

this._hScrollbar.setThumbPercent((this._width-10)/this.content.width);
this._hScrollbar.maximum=Math.max(0,this.content.width-this._width+10);
this._hScrollbar.pageSize=this._width-10;

this._corner.x=this.width-10;
this._corner.y=this.height-10;
this.content.x=-this._hScrollbar.value;
this.content.y=-this._vScrollbar.value;
},




"public function update",function()
{
this.invalidate();
},









"protected function onScroll",function(event)
{
this.content.x=-this._hScrollbar.value;
this.content.y=-this._vScrollbar.value;
},

"protected function onResize",function(event)
{
this.invalidate();
},

"protected function onMouseDown",function(event)
{
this.content.startDrag(false,new flash.geom.Rectangle(0,0,Math.min(0,this._width-this.content.width-10),Math.min(0,this._height-this.content.height-10)));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMouseMove",function(event)
{
this._hScrollbar.value=-this.content.x;
this._vScrollbar.value=-this.content.y;
},

"protected function onMouseUp",function(event)
{
this.content.stopDrag();
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onMouseMove"));
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"public function set dragContent",function(value)
{
this._dragContent=value;
if(this._dragContent)
{
this._background.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=true;
this._background.buttonMode=true;
}
else
{
this._background.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._background.useHandCursor=false;
this._background.buttonMode=false;
}
},
"public function get dragContent",function()
{
return this._dragContent;
},


];},[],["com.bit101.components.Panel","flash.events.Event","flash.events.MouseEvent","com.bit101.components.VScrollBar","com.bit101.components.HScrollBar","flash.display.Shape","com.bit101.components.Style","Math","flash.geom.Rectangle"]
);
// class com.bit101.components.List
joo.classLoader.prepare(



























"package com.bit101.components",






"public class List extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.display.Sprite,com.bit101.components.Panel,com.bit101.components.VScrollBar,Array,flash.events.MouseEvent,com.bit101.components.ListItem,flash.events.Event);},

"protected var",{_items: undefined},
"protected var",{_itemHolder: undefined},
"protected var",{_panel: undefined},
"protected var",{_listItemHeight:20},
"protected var",{_listItemClass:function(){return(com.bit101.components.ListItem);}},
"protected var",{_scrollbar: undefined},
"protected var",{_selectedIndex:-1},
"protected var",{_defaultColor:0xffffff},
"protected var",{_alternateColor:0xf3f3f3},
"protected var",{_selectedColor:0xcccccc},
"protected var",{_rolloverColor:0xdddddd},
"protected var",{_alternateRows:false},








"public function List",function(parent,xpos,ypos,items)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}items=null;}
if(items!=null)
{
this._items=items;
}
else
{
this._items=new Array();
}
this[$super](parent,xpos,ypos);this._listItemClass=this._listItemClass();
},




"protected override function init",function()
{
this[$init]();
this.setSize(100,100);
this.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL,$$bound(this,"onMouseWheel"));
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._panel=new com.bit101.components.Panel(this,0,0);
this._panel.color=this._defaultColor;
this._itemHolder=new flash.display.Sprite();
this._panel.content.addChild(this._itemHolder);
this._scrollbar=new com.bit101.components.VScrollBar(this,0,0,$$bound(this,"onScroll"));
},




"protected function makeListItems",function()
{
while(this._itemHolder.numChildren>0)this._itemHolder.removeChildAt(0);

for(var i=0;i<this._items.length;i++)
{









var item=new this._listItemClass(this._itemHolder,0,i*this._listItemHeight,this._items[i]);
item.setSize(this.width,this._listItemHeight);
item.defaultColor=this._defaultColor;
if(this._alternateRows)
{
item.defaultColor=(i%2==0)?this._defaultColor:this._alternateColor;
}
else
{
item.defaultColor=this._defaultColor;
}
item.selectedColor=this._selectedColor;
item.rolloverColor=this._rolloverColor;
item.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onSelect"));
if(i==this._selectedIndex)
{
item.selected=true;
}
}
},




"protected function scrollToSelection",function()
{
if(this._selectedIndex!=-1)
{
var itemTop=this._itemHolder.y+this._selectedIndex*this._listItemHeight;
var itemBottom=itemTop+this._listItemHeight;



if(itemTop<0)
{
this._itemHolder.y=-this._selectedIndex*this._listItemHeight;
}
else if(itemBottom>this._height)
{
this._itemHolder.y=-this._selectedIndex*this._listItemHeight-this._listItemHeight+this._height;
}
}
},










"public override function draw",function()
{
this[$draw]();

this._selectedIndex=Math.min(this._selectedIndex,this._items.length-1);


this.makeListItems();
this.scrollToSelection();


this._panel.setSize(this._width,this._height);
this._panel.color=this._defaultColor;
this._panel.draw();


this._scrollbar.x=this._width-10;
var contentHeight=this._items.length*this._listItemHeight;
this._scrollbar.setThumbPercent(this._height/contentHeight);
var pageSize=this._height/this._listItemHeight;
this._scrollbar.setSliderParams(0,Math.max(0,this._items.length-pageSize),this._itemHolder.y/this._listItemHeight);
this._scrollbar.pageSize=pageSize;
this._scrollbar.height=this._height;
this._scrollbar.draw();
},





"public function addItem",function(item)
{
this._items.push(item);
this.invalidate();
},






"public function addItemAt",function(item,index)
{
index=Math.max(0,index);
index=Math.min(this._items.length,index);
this._items.splice(index,0,item);
this.invalidate();
},





"public function removeItem",function(item)
{
var index=this._items.indexOf(item);
this.removeItemAt(index);
},





"public function removeItemAt",function(index)
{
if(index<0||index>=this._items.length)return;
this._items.splice(index,1);
this.invalidate();
},




"public function removeAll",function()
{
this._items.length=0;
this.invalidate();
},












"protected function onSelect",function(event)
{
if(!(is(event.target,com.bit101.components.ListItem)))return;

for(var i=0;i<this._itemHolder.numChildren;i++)
{
if(this._itemHolder.getChildAt(i)==event.target)this._selectedIndex=i;
(this._itemHolder.getChildAt(i)).selected=false;
}
(event.target).selected=true;
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},




"protected function onScroll",function(event)
{
this._itemHolder.y=-this._scrollbar.value*this._listItemHeight;
},




"protected function onMouseWheel",function(event)
{
this._scrollbar.value-=event.delta;
},








"public function set selectedIndex",function(value)
{
if(value>=0&&value<this._items.length)
{
this._selectedIndex=value;
this._scrollbar.value=this._selectedIndex;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
}
},
"public function get selectedIndex",function()
{
return this._selectedIndex;
},




"public function set selectedItem",function(item)
{
var index=this._items.indexOf(item);
if(index!=-1)
{
this.selectedIndex=index;
this.invalidate();
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
}
},
"public function get selectedItem",function()
{
if(this._selectedIndex>=0&&this._selectedIndex<this._items.length)
{
return this._items[this._selectedIndex];
}
return null;
},




"public function set defaultColor",function(value)
{
this._defaultColor=value;
this.invalidate();
},
"public function get defaultColor",function()
{
return this._defaultColor;
},




"public function set selectedColor",function(value)
{
this._selectedColor=value;
this.invalidate();
},
"public function get selectedColor",function()
{
return this._selectedColor;
},




"public function set rolloverColor",function(value)
{
this._rolloverColor=value;
this.invalidate();
},
"public function get rolloverColor",function()
{
return this._rolloverColor;
},




"public function set listItemHeight",function(value)
{
this._listItemHeight=value;
this.invalidate();
},
"public function get listItemHeight",function()
{
return this._listItemHeight;
},




"public function set items",function(value)
{
this._items=value;
this.invalidate();
},
"public function get items",function()
{
return this._items;
},




"public function set listItemClass",function(value)
{
this._listItemClass=value;
this.invalidate();
},
"public function get listItemClass",function()
{
return this._listItemClass;
},




"public function set alternateColor",function(value)
{
this._alternateColor=value;
this.invalidate();
},
"public function get alternateColor",function()
{
return this._alternateColor;
},




"public function set alternateRows",function(value)
{
this._alternateRows=value;
this.invalidate();
},
"public function get alternateRows",function()
{
return this._alternateRows;
},


];},[],["com.bit101.components.Component","com.bit101.components.ListItem","Array","flash.events.MouseEvent","com.bit101.components.Panel","flash.display.Sprite","com.bit101.components.VScrollBar","Math","flash.events.Event"]
);
// class com.bit101.components.VSlider
joo.classLoader.prepare(



























"package com.bit101.components",



"public class VSlider extends com.bit101.components.Slider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Slider);},








"public function VSlider",function(parent,xpos,ypos,defaultHandler)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](com.bit101.components.Slider.VERTICAL,parent,xpos,ypos,defaultHandler);
},
];},[],["com.bit101.components.Slider"]
);
// class com.bit101.components.Text
joo.classLoader.prepare(



























"package com.bit101.components",







"public class Text extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$enabled=$$l+'enabled';return[function(){joo.classLoader.init(flash.text.TextFieldType,com.bit101.components.Panel,flash.text.TextField,flash.events.Event,flash.text.TextFormat,com.bit101.components.Style);},

"protected var",{_tf: undefined},
"protected var",{_text:""},
"protected var",{_editable:true},
"protected var",{_panel: undefined},
"protected var",{_selectable:true},
"protected var",{_html:false},









"public function Text",function(parent,xpos,ypos,text)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}text="";}
this.text=text;
this[$super](parent,xpos,ypos);
this.setSize(200,100);
},




"override protected function init",function()
{
this[$init]();
},




"override protected function addChildren",function()
{
this._panel=new com.bit101.components.Panel(this);
this._panel.color=0xffffff;

this._tf=new flash.text.TextField();
this._tf.x=2;
this._tf.y=2;
this._tf.height=this._height;
this._tf.embedFonts=com.bit101.components.Style.embedFonts;
this._tf.multiline=true;
this._tf.wordWrap=true;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
this._tf.defaultTextFormat=new flash.text.TextFormat(com.bit101.components.Style.fontName,com.bit101.components.Style.fontSize,com.bit101.components.Style.LABEL_TEXT);
this._tf.addEventListener(flash.events.Event.CHANGE,$$bound(this,"onChange"));
this.addChild(this._tf);
},











"override public function draw",function()
{
this[$draw]();

this._panel.setSize(this._width,this._height);
this._panel.draw();

this._tf.width=this._width-4;
this._tf.height=this._height-4;
if(this._html)
{
this._tf.htmlText=this._text;
}
else
{
this._tf.text=this._text;
}
if(this._editable)
{
this._tf.mouseEnabled=true;
this._tf.selectable=true;
this._tf.type=flash.text.TextFieldType.INPUT;
}
else
{
this._tf.mouseEnabled=this._selectable;
this._tf.selectable=this._selectable;
this._tf.type=flash.text.TextFieldType.DYNAMIC;
}
},











"protected function onChange",function(event)
{
this._text=this._tf.text;
this.dispatchEvent(event);
},








"public function set text",function(t)
{
this._text=t;
if(this._text==null)this._text="";
this.invalidate();
},
"public function get text",function()
{
return this._text;
},




"public function get textField",function()
{
return this._tf;
},




"public function set editable",function(b)
{
this._editable=b;
this.invalidate();
},
"public function get editable",function()
{
return this._editable;
},




"public function set selectable",function(b)
{
this._selectable=b;
this.invalidate();
},
"public function get selectable",function()
{
return this._selectable;
},




"public function set html",function(b)
{
this._html=b;
this.invalidate();
},
"public function get html",function()
{
return this._html;
},




"public override function set enabled",function(value)
{
this[$enabled]=value;
this._tf.tabEnabled=value;
},

];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.text.TextField","com.bit101.components.Style","flash.text.TextFieldType","flash.text.TextFormat","flash.events.Event"]
);
// class com.bit101.components.Calendar
joo.classLoader.prepare(
































"package com.bit101.components",






"public class Calendar extends com.bit101.components.Panel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren';return[function(){joo.classLoader.init(com.bit101.components.Label,com.bit101.components.PushButton,Date,Array,flash.display.Shape,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_dateLabel: undefined},
"protected var",{_day: undefined},
"protected var",{_dayButtons:function(){return(new Array());}},
"protected var",{_month: undefined},
"protected var",{_monthNames:function(){return(["January","February","March","April","May","June","July","August","September","October","November","December"]);}},
"protected var",{_selection: undefined},
"protected var",{_year: undefined},







"public function Calendar",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);this._dayButtons=this._dayButtons();this._monthNames=this._monthNames();
},




"protected override function init",function()
{
this[$init]();
this.setSize(140,140);
var today=new Date();
this.setDate(today);
},




"protected override function addChildren",function()
{
this[$addChildren]();
for(var i=0;i<6;i++)
{
for(var j=0;j<7;j++)
{
var btn=new com.bit101.components.PushButton(this.content,j*20,20+i*20);
btn.setSize(19,19);
btn.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onDayClick"));
if(this._dayButtons.push!=undefined)
{
this._dayButtons.push(btn);
}
}
}

this._dateLabel=new com.bit101.components.Label(this.content,25,0);
this._dateLabel.autoSize=true;

var prevYearBtn=new com.bit101.components.PushButton(this.content,2,2,"«",$$bound(this,"onPrevYear"));
prevYearBtn.setSize(14,14);

var prevMonthBtn=new com.bit101.components.PushButton(this.content,17,2,"<",$$bound(this,"onPrevMonth"));
prevMonthBtn.setSize(14,14);

var nextMonthBtn=new com.bit101.components.PushButton(this.content,108,2,">",$$bound(this,"onNextMonth"));
nextMonthBtn.setSize(14,14);

var nextYearBtn=new com.bit101.components.PushButton(this.content,124,2,"»",$$bound(this,"onNextYear"));
nextYearBtn.setSize(14,14);

this._selection=new flash.display.Shape();
this._selection.graphics.beginFill(0,0.15);
this._selection.graphics.drawRect(1,1,18,18);
this.content.addChild(this._selection);
},







"protected function getEndDay",function(month,year)
{
switch(month)
{
case 0:
case 2:
case 4:
case 6:
case 7:
case 9:
case 11:
return 31;
break;

case 1:
if((this._year%400==0)||((this._year%100!=0)&&(this._year%4==0)))return 29;
return 28;
break;

default:
break;
}

return 30;
},









"public function setDate",function(date)
{
this._year=date.fullYear;
this._month=date.month;
this._day=date.date;
var startDay=new Date(this._year,this._month,1).day;
var endDay=this.getEndDay(this._month,this._year);
for(var i=0;i<42;i++)
{
if(this._dayButtons[i]!=undefined)
{
this._dayButtons[i].visible=false;
}
}
for(i=0;i<endDay;i++)
{
var btn=this._dayButtons[i+startDay];
if(btn!=undefined)
{
btn.visible=true;
btn.label=(i+1).toString();
btn.tag=i+1;
if(i+1==this._day)
{
this._selection.x=btn.x;
this._selection.y=btn.y;
}
}
}

this._dateLabel.text=this._monthNames[this._month]+"  "+this._year;
this._dateLabel.draw();
this._dateLabel.x=(this.width-this._dateLabel.width)/2;
},







"public function setYearMonthDay",function(year,month,day)
{
this.setDate(new Date(year,month,day));
},








"protected function onNextMonth",function(event)
{
this._month++;
if(this._month>11)
{
this._month=0;
this._year++;
}
this._day=Math.min(this._day,this.getEndDay(this._month,this._year));
this.setYearMonthDay(this._year,this._month,this._day);
},




"protected function onPrevMonth",function(event)
{
this._month--;
if(this._month<0)
{
this._month=11;
this._year--;
}
this._day=Math.min(this._day,this.getEndDay(this._month,this._year));
this.setYearMonthDay(this._year,this._month,this._day);
},




"protected function onNextYear",function(event)
{
this._year++;
this._day=Math.min(this._day,this.getEndDay(this._month,this._year));
this.setYearMonthDay(this._year,this._month,this._day);
},




"protected function onPrevYear",function(event)
{
this._year--;
this._day=Math.min(this._day,this.getEndDay(this._month,this._year));
this.setYearMonthDay(this._year,this._month,this._day);
},




"protected function onDayClick",function(event)
{
this._day=event.target.tag;
this.setYearMonthDay(this._year,this._month,this._day);
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},








"public function get selectedDate",function()
{
return new Date(this._year,this._month,this._day);
},




"public function get month",function()
{
return this._month;
},




"public function get year",function()
{
return this._year;
},




"public function get day",function()
{
return this._day;
},
];},[],["com.bit101.components.Panel","Array","Date","com.bit101.components.PushButton","flash.events.MouseEvent","com.bit101.components.Label","flash.display.Shape","Math","flash.events.Event"]
);
// class com.bit101.components.Window
joo.classLoader.prepare(



























"package com.bit101.components",







"public class Window extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw',$height=$$l+'height';return[function(){joo.classLoader.init(com.bit101.components.Label,flash.display.Sprite,com.bit101.components.PushButton,com.bit101.components.Panel,flash.display.Shape,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_title: undefined},
"protected var",{_titleBar: undefined},
"protected var",{_titleLabel: undefined},
"protected var",{_panel: undefined},
"protected var",{_color:-1},
"protected var",{_shadow:true},
"protected var",{_draggable:true},
"protected var",{_minimizeButton: undefined},
"protected var",{_hasMinimizeButton:false},
"protected var",{_minimized:false},
"protected var",{_hasCloseButton: undefined},
"protected var",{_closeButton: undefined},
"protected var",{_grips: undefined},









"public function Window",function(parent,xpos,ypos,title)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}title="Window";}
this._title=title;
this[$super](parent,xpos,ypos);
},




"override protected function init",function()
{
this[$init]();
this.setSize(100,100);
},




"override protected function addChildren",function()
{
this._titleBar=new com.bit101.components.Panel(this);

this._titleBar.buttonMode=true;
this._titleBar.useHandCursor=true;
this._titleBar.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,$$bound(this,"onMouseDown"));
this._titleBar.height=20;
this._titleLabel=new com.bit101.components.Label(this._titleBar.content,5,1,this._title);

this._grips=new flash.display.Shape();
for(var i=0;i<4;i++)
{
this._grips.graphics.lineStyle(1,0xffffff,.55);
this._grips.graphics.moveTo(0,3+i*4);
this._grips.graphics.lineTo(100,3+i*4);
this._grips.graphics.lineStyle(1,0,.125);
this._grips.graphics.moveTo(0,4+i*4);
this._grips.graphics.lineTo(100,4+i*4);
}
this._titleBar.content.addChild(this._grips);
this._grips.visible=false;

this._panel=new com.bit101.components.Panel(this,0,20);
this._panel.visible=!this._minimized;

this._minimizeButton=new flash.display.Sprite();
this._minimizeButton.graphics.beginFill(0,0);
this._minimizeButton.graphics.drawRect(-10,-10,20,20);
this._minimizeButton.graphics.endFill();
this._minimizeButton.graphics.beginFill(0,.35);
this._minimizeButton.graphics.moveTo(-5,-3);
this._minimizeButton.graphics.lineTo(5,-3);
this._minimizeButton.graphics.lineTo(0,4);
this._minimizeButton.graphics.lineTo(-5,-3);
this._minimizeButton.graphics.endFill();
this._minimizeButton.x=10;
this._minimizeButton.y=10;
this._minimizeButton.useHandCursor=true;
this._minimizeButton.buttonMode=true;
this._minimizeButton.addEventListener(flash.events.MouseEvent.CLICK,$$bound(this,"onMinimize"));

this._closeButton=new com.bit101.components.PushButton(null,86,6,"",$$bound(this,"onClose"));
this._closeButton.setSize(8,8);


},











"override public function draw",function()
{
this[$draw]();
this._titleBar.color=this._color;
this._panel.color=this._color;
this._titleBar.width=this.width;
this._titleBar.draw();
this._titleLabel.x=this._hasMinimizeButton?20:5;
this._closeButton.x=this._width-14;
this._grips.x=this._titleLabel.x+this._titleLabel.width;
if(this._hasCloseButton)
{
this._grips.width=this._closeButton.x-this._grips.x-2;
}
else
{
this._grips.width=this._width-this._grips.x-2;
}
this._panel.setSize(this._width,this._height-20);
this._panel.draw();
},










"protected function onMouseDown",function(event)
{
if(this._draggable)
{
this.startDrag();
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
this.parent.addChild(this);
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},





"protected function onMouseUp",function(event)
{
this.stopDrag();
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onMouseUp"));
},

"protected function onMinimize",function(event)
{
this.minimized=!this.minimized;
},

"protected function onClose",function(event)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CLOSE));
},








"public function set shadow",function(b)
{
this._shadow=b;
if(this._shadow)
{

}
else
{

}
},
"public function get shadow",function()
{
return this._shadow;
},




"public function set color",function(c)
{
this._color=c;
this.invalidate();
},
"public function get color",function()
{
return this._color;
},




"public function set title",function(t)
{
this._title=t;
this._titleLabel.text=this._title;
},
"public function get title",function()
{
return this._title;
},




"public function get content",function()
{
return this._panel.content;
},




"public function set draggable",function(b)
{
this._draggable=b;
this._titleBar.buttonMode=this._draggable;
this._titleBar.useHandCursor=this._draggable;
},
"public function get draggable",function()
{
return this._draggable;
},




"public function set hasMinimizeButton",function(b)
{
this._hasMinimizeButton=b;
if(this._hasMinimizeButton)
{
this.addChild(this._minimizeButton);
}




this.invalidate();
},
"public function get hasMinimizeButton",function()
{
return this._hasMinimizeButton;
},




"public function set minimized",function(value)
{
this._minimized=value;

if(this._minimized)
{

this._minimizeButton.rotation=-90;
}
else
{

this._minimizeButton.rotation=0;
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},
"public function get minimized",function()
{
return this._minimized;
},




"override public function get height",function()
{






return 20;

},





"public function set hasCloseButton",function(value)
{
this._hasCloseButton=value;
if(this._hasCloseButton)
{
this._titleBar.content.addChild(this._closeButton);
}




this.invalidate();
},
"public function get hasCloseButton",function()
{
return this._hasCloseButton;
},




"public function get titleBar",function()
{
return this._titleBar;
},
"public function set titleBar",function(value)
{
this._titleBar=value;
},




"public function get grips",function()
{
return this._grips;
},


];},[],["com.bit101.components.Component","com.bit101.components.Panel","flash.events.MouseEvent","com.bit101.components.Label","flash.display.Shape","flash.display.Sprite","com.bit101.components.PushButton","flash.events.Event"]
);
// class com.bit101.components.HBox
joo.classLoader.prepare(




























"package com.bit101.components",





"public class HBox extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addChildAt=$$l+'addChildAt',$removeChild=$$l+'removeChild',$removeChildAt=$$l+'removeChildAt',$draw=$$l+'draw';return[function(){joo.classLoader.init(flash.events.Event);},

"protected var",{_spacing:5},








"public function HBox",function(parent,xpos,ypos)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}
this[$super](parent,xpos,ypos);
},




"override public function addChildAt",function(child,index)
{
this[$addChildAt](child,index);
child.addEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChild",function(child)
{
this.removeChild(child);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},




"override public function removeChildAt",function(index)
{
var child=this.removeChildAt(index);
child.removeEventListener(flash.events.Event.RESIZE,$$bound(this,"onResize"));
this.invalidate();
return child;
},

"protected function onResize",function(event)
{
this.invalidate();
},




"override public function draw",function()
{
this._width=0;
this._height=0;
var xpos=0;
for(var i=0;i<this.numChildren;i++)
{
var child=this.getChildAt(i);
child.x=xpos;
xpos+=child.width;
xpos+=this._spacing;
this._width+=child.width;
this._height=Math.max(this._height,child.height);
}
this._width+=this._spacing*(this.numChildren-1);
this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
},




"public function set spacing",function(s)
{
this._spacing=s;
this.invalidate();
},
"public function get spacing",function()
{
return this._spacing;
},
];},[],["com.bit101.components.Component","flash.events.Event","Math"]
);
// class com.bit101.components.WheelMenu
joo.classLoader.prepare(
































"package com.bit101.components",







"public class WheelMenu extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init';return[function(){joo.classLoader.init(com.bit101.components.ArcButton,Math,Array,flash.events.MouseEvent,flash.events.Event);},

"protected var",{_borderColor:0xcccccc},
"protected var",{_buttons: undefined},
"protected var",{_color:0xffffff},
"protected var",{_highlightColor:0xeeeeee},
"protected var",{_iconRadius: undefined},
"protected var",{_innerRadius: undefined},
"protected var",{_items: undefined},
"protected var",{_numButtons: undefined},
"protected var",{_outerRadius: undefined},
"protected var",{_selectedIndex:-1},
"protected var",{_startingAngle:-90},










"public function WheelMenu",function(parent,numButtons,outerRadius,iconRadius,innerRadius,defaultHandler)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){outerRadius=80;}iconRadius=60;}innerRadius=10;}defaultHandler=null;}
this._numButtons=numButtons;
this._outerRadius=outerRadius;
this._iconRadius=iconRadius;
this._innerRadius=innerRadius;
this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$$bound(this,"onAddedToStage"));
this[$super](parent);

if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.SELECT,defaultHandler);
}
},








"override protected function init",function()
{
this[$init]();
this._items=new Array();
this.makeButtons();


},




"protected function makeButtons",function()
{
this._buttons=new Array();
for(var i=0;i<this._numButtons;i++)
{
var btn=new com.bit101.components.ArcButton(Math.PI*2/this._numButtons,this._outerRadius,this._iconRadius,this._innerRadius);
btn.id=i;
btn.rotation=this._startingAngle+360/this._numButtons*i;
btn.addEventListener(flash.events.Event.SELECT,$$bound(this,"onSelect"));
this.addChild(btn);
this._buttons.push(btn);
}
},








"public function hide",function()
{

if(this.stage!=null)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"));
}
},







"public function setItem",function(index,iconOrLabel,data)
{if(arguments.length<3){data=null;}
this._buttons[index].setIcon(iconOrLabel);
this._items[index]=data;
},




"public function show",function()
{
this.parent.addChild(this);
this.x=Math.round(this.parent.mouseX);
this.y=Math.round(this.parent.mouseY);
this._selectedIndex=-1;

this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"),true);
},








"protected function onAddedToStage",function(event)
{
this.hide();
this.addEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
},




"protected function onRemovedFromStage",function(event)
{
this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onStageMouseUp"));
this.removeEventListener(flash.events.Event.REMOVED_FROM_STAGE,$$bound(this,"onRemovedFromStage"));
},




"protected function onSelect",function(event)
{
this._selectedIndex=event.target.id;
this.dispatchEvent(new flash.events.Event(flash.events.Event.SELECT));
},




"protected function onStageMouseUp",function(event)
{
this.hide();
},








"public function set borderColor",function(value)
{
this._borderColor=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].borderColor=this._borderColor;
}
},
"public function get borderColor",function()
{
return this._borderColor;
},




"public function set color",function(value)
{
this._color=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].color=this._color;
}
},
"public function get color",function()
{
return this._color;
},




"public function set highlightColor",function(value)
{
this._highlightColor=value;
for(var i=0;i<this._numButtons;i++)
{
this._buttons[i].highlightColor=this._highlightColor;
}
},
"public function get highlightColor",function()
{
return this._highlightColor;
},




"public function get selectedIndex",function()
{
return this._selectedIndex;
},




"public function get selectedItem",function()
{
return this._items[this._selectedIndex];
},



];},[],["com.bit101.components.Component","flash.events.Event","Array","com.bit101.components.ArcButton","Math","flash.events.MouseEvent"]
);
// class com.bit101.components.ScrollSlider
joo.classLoader.prepare(



























"package com.bit101.components",












"public class ScrollSlider extends com.bit101.components.Slider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$drawHandle=$$l+'drawHandle',$positionHandle=$$l+'positionHandle',$onBackClick=$$l+'onBackClick',$onDrag=$$l+'onDrag',$onSlide=$$l+'onSlide';return[function(){joo.classLoader.init(flash.geom.Rectangle,flash.events.MouseEvent,flash.events.Event,com.bit101.components.Style);},

"protected var",{_thumbPercent:1.0},
"protected var",{_pageSize:1},









"public function ScrollSlider",function(orientation,parent,xpos,ypos,defaultHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){parent=null;}xpos=0;}ypos=0;}defaultHandler=null;}
this[$super](orientation,parent,xpos,ypos);
if(defaultHandler!=null)
{
this.addEventListener(flash.events.Event.CHANGE,defaultHandler);
}
},




"protected override function init",function()
{
this[$init]();
this.setSliderParams(1,1,0);
this.backClick=true;
},




"override protected function drawHandle",function()
{
var size;
this._handle.graphics.clear();
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
size=Math.round(this._width*this._thumbPercent);
size=Math.max(this._height,size);
this._handle.graphics.beginFill(0,0);
this._handle.graphics.drawRect(0,0,size,this._height);
this._handle.graphics.endFill();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._handle.graphics.drawRect(1,1,size-2,this._height-2);
}
else
{
size=Math.round(this._height*this._thumbPercent);
size=Math.max(this._width,size);
this._handle.graphics.beginFill(0,0);
this._handle.graphics.drawRect(0,0,this._width-2,size);
this._handle.graphics.endFill();
this._handle.graphics.beginFill(com.bit101.components.Style.BUTTON_FACE);
this._handle.graphics.drawRect(1,1,this._width-2,size-2);
}
this._handle.graphics.endFill();
this.positionHandle();
},





"protected override function positionHandle",function()
{
var range;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
range=this.width-this._handle.width;
this._handle.x=(this._value-this._min)/(this._max-this._min)*range;
}
else
{
range=this.height-this._handle.height;
this._handle.y=(this._value-this._min)/(this._max-this._min)*range;
}
},










"public function setThumbPercent",function(value)
{
this._thumbPercent=Math.min(value,1.0);
this.invalidate();
},













"protected override function onBackClick",function(event)
{
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
if(0<this._handle.x)
{
if(this._max>this._min)
{
this._value-=this._pageSize;
}
else
{
this._value+=this._pageSize;
}
this.correctValue();
}
else
{
if(this._max>this._min)
{
this._value+=this._pageSize;
}
else
{
this._value-=this._pageSize;
}
this.correctValue();
}
this.positionHandle();
}
else
{
if(0<this._handle.y)
{
if(this._max>this._min)
{
this._value-=this._pageSize;
}
else
{
this._value+=this._pageSize;
}
this.correctValue();
}
else
{
if(this._max>this._min)
{
this._value+=this._pageSize;
}
else
{
this._value-=this._pageSize;
}
this.correctValue();
}
this.positionHandle();
}
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));

},





"protected override function onDrag",function(event)
{
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,$$bound(this,"onDrop"));
this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE,$$bound(this,"onSlide"));
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,this._width-this._handle.width,0));
}
else
{
this._handle.startDrag(false,new flash.geom.Rectangle(0,0,0,this._height-this._handle.height));
}
},





"protected override function onSlide",function(event)
{
var oldValue=this._value;
if(this._orientation==com.bit101.components.Slider.HORIZONTAL)
{
if(this._width==this._handle.width)
{
this._value=this._min;
}
else
{
this._value=this._handle.x/(this._width-this._handle.width)*(this._max-this._min)+this._min;
}
}
else
{
if(this._height==this._handle.height)
{
this._value=this._min;
}
else
{
this._value=this._handle.y/(this._height-this._handle.height)*(this._max-this._min)+this._min;
}
}
if(this._value!=oldValue)
{
this.dispatchEvent(new flash.events.Event(flash.events.Event.CHANGE));
}
},












"public function set pageSize",function(value)
{
this._pageSize=value;
this.invalidate();
},
"public function get pageSize",function()
{
return this._pageSize;
},
];},[],["com.bit101.components.Slider","flash.events.Event","Math","com.bit101.components.Style","flash.events.MouseEvent","flash.geom.Rectangle"]
);
// class com.bit101.components.VUISlider
joo.classLoader.prepare(



























"package com.bit101.components",




"public class VUISlider extends com.bit101.components.UISlider",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$draw=$$l+'draw',$positionLabel=$$l+'positionLabel',$width=$$l+'width';return[function(){joo.classLoader.init(com.bit101.components.VSlider);},











"public function VUISlider",function(parent,x,y,label,defaultEventHandler)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}x=0;}y=0;}label="";}defaultEventHandler=null;}
this._sliderClass=com.bit101.components.VSlider;
this[$super](parent,x,y,label,defaultEventHandler);
},




"protected override function init",function()
{
this[$init]();
this.setSize(20,146);
},








"override public function draw",function()
{
this[$draw]();
this._label.x=this.width/2-this._label.width/2;

this._slider.x=this.width/2-this._slider.width/2;
this._slider.y=this._label.height+5;
this._slider.height=this.height-this._label.height-this._valueLabel.height-10;

this._valueLabel.x=this.width/2-this._valueLabel.width/2;
this._valueLabel.y=this._slider.y+this._slider.height+5;
},

"override protected function positionLabel",function()
{
this._valueLabel.x=this.width/2-this._valueLabel.width/2;
},












"override public function get width",function()
{
if(this._label==null)return this._width;
return Math.max(this._width,this._label.width);
},

];},[],["com.bit101.components.UISlider","com.bit101.components.VSlider","Math"]
);
// class com.bit101.components.ListItem
joo.classLoader.prepare(




























"package com.bit101.components",




"public class ListItem extends com.bit101.components.Component",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$init=$$l+'init',$addChildren=$$l+'addChildren',$draw=$$l+'draw';return[function(){joo.classLoader.init(com.bit101.components.Label,String,flash.events.MouseEvent);},

"protected var",{_data: undefined},
"protected var",{_label: undefined},
"protected var",{_defaultColor:0xffffff},
"protected var",{_selectedColor:0xdddddd},
"protected var",{_rolloverColor:0xeeeeee},
"protected var",{_selected: undefined},
"protected var",{_mouseOver:false},








"public function ListItem",function(parent,xpos,ypos,data)
{if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){parent=null;}xpos=0;}ypos=0;}data=null;}
this._data=data;
this[$super](parent,xpos,ypos);
},




"protected override function init",function()
{
this[$init]();
this.addEventListener(flash.events.MouseEvent.MOUSE_OVER,$$bound(this,"onMouseOver"));
this.setSize(100,20);
},




"protected override function addChildren",function()
{
this[$addChildren]();
this._label=new com.bit101.components.Label(this,5,0);
},








"public override function draw",function()
{
this[$draw]();
this.graphics.clear();
if(this._selected)
{
this.graphics.beginFill(this._selectedColor);
}
else if(this._mouseOver)
{
this.graphics.beginFill(this._rolloverColor);
}
else
{
this.graphics.beginFill(this._defaultColor);
}
this.graphics.drawRect(0,0,this.width,this.height);
this.graphics.endFill();
if(is(this._data,String))
{
this._label.text=this._data;
}
else if(is(this._data.label,String))
{
this._label.text=this._data.label;
}
else
{
this._label.text=this._data.toString();
}
},











"protected function onMouseOver",function(event)
{
this.addEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"onMouseOut"));
this._mouseOver=true;
this.invalidate();
},




"protected function onMouseOut",function(event)
{
this.removeEventListener(flash.events.MouseEvent.MOUSE_OUT,$$bound(this,"onMouseOut"));
this._mouseOver=false;
this.invalidate();
},










"public function set data",function(value)
{
this._data=value;
this.invalidate();
},
"public function get data",function()
{
return this._data;
},




"public function set selected",function(value)
{
this._selected=value;
this.invalidate();
},
"public function get selected",function()
{
return this._selected;
},




"public function set defaultColor",function(value)
{
this._defaultColor=value;
this.invalidate();
},
"public function get defaultColor",function()
{
return this._defaultColor;
},




"public function set selectedColor",function(value)
{
this._selectedColor=value;
this.invalidate();
},
"public function get selectedColor",function()
{
return this._selectedColor;
},




"public function set rolloverColor",function(value)
{
this._rolloverColor=value;
this.invalidate();
},
"public function get rolloverColor",function()
{
return this._rolloverColor;
},

];},[],["com.bit101.components.Component","flash.events.MouseEvent","com.bit101.components.Label","String"]
);
// class Test08
joo.classLoader.prepare("package",










"public class Test08 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Text,com.bit101.components.PushButton,com.bit101.charts.BarChart,com.bit101.components.Calendar);},

"public function Test08",function()
{this[$super]();
new com.bit101.components.Text(this,0,0,"hello, world");
new com.bit101.components.PushButton(this,100,110,"Click me");
new com.bit101.charts.BarChart(this,0,140,[10,87,42,3,92,34,21,83,44,71]);
new com.bit101.components.Calendar(this,0,250);
},
];},[],["flash.display.Sprite","com.bit101.components.Text","com.bit101.components.PushButton","com.bit101.charts.BarChart","com.bit101.components.Calendar"]
);
