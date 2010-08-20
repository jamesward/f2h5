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