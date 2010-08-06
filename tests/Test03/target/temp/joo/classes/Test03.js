joo.classLoader.prepare("package",
[
"import flash.display.Sprite",

"import flash.events.Event",

""],
"public class Test03 extends flash.display.Sprite",function($$private){with($$private)return[

"private var",{i:0},

"public function Test03",function()
{this[$super]();


this.addEventListener("enterFrame",this[$f]);
},

"private bound function f",function(e)
{
this.graphics.clear();
this[$i]++;
var n=Math.sin(this[$i]*.04)*9;
this.graphics.beginFill(Math.random()*999999);
for(var j=3;j--;)
{
this.graphics.drawCircle(n*5,n*5,j*5);
}
this.graphics.fill();
this.x=this.y=237;


},

];},[],["flash.display.Sprite","flash.display.DisplayObject","Math"]
);