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