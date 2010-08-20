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