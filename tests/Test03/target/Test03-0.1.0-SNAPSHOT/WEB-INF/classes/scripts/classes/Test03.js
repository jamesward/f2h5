joo.classLoader.prepare("package",
[
"import flash.display.Sprite",
//import flash.display.StageScaleMode;
"import flash.events.Event",/*

[SWF( backgroundColor='0xffffff', frameRate='30')]*/""],
"public class Test03 extends flash.display.Sprite",function($$private){with($$private)return[

  "private var",{ i/*:uint*/ : 0},

  "public function Test03",function $Test03()
  {this[$super]();
    //stage.scaleMode = StageScaleMode.NO_SCALE;

    this.addEventListener("enterFrame", this[$f]);
  },

  "private bound function f",function f(e/*:Event*/)/*:void*/
  {
    this.graphics.clear();
    this[$i]++;
    var n/*:Number*/ = Math.sin(this[$i]*.04)*9;
    this.graphics.beginFill(Math.random()*999999);
    for (var j/*:uint*/ = 3; j--;)
    {
      this.graphics.drawCircle(n*5, n*5, j*5);
    }
    this.graphics.fill();
    this.x = this.y = 237;
    //rotation = n * 99;
    //scaleX = scaleY = 3 + Math.abs(n);
  },

];},[],["flash.display.Sprite","flash.display.DisplayObject","Math"]
);