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