joo.classLoader.prepare("package",
[
"import flash.display.Sprite",

"import flash.events.Event",

""],
"public class Test02 extends flash.display.Sprite",function($$private){with($$private)return[function(){joo.classLoader.init(flash.events.Event);},

"private var",{i:0},

"public function Test02",function()
{this[$super]();


this.addEventListener(flash.events.Event.ENTER_FRAME,this[$f]);
},

"private bound function f",function(e)
{
if(this[$i]>400)
return;
if(this[$i]++<1)
{
this.x=275;
this.y=200;
}
this.graphics.lineStyle(3,Math.random()*1e7,1);
this.graphics.moveTo(Math.sin(this[$i]/9)*this[$i],Math.cos(this[$i]/9)*this[$i]);
this.graphics.lineTo(Math.sin(this[$i]/9)*200,Math.cos(this[$i]/9)*200);
},

];},[],["flash.display.Sprite","flash.display.DisplayObject","flash.events.Event","Math"]
);