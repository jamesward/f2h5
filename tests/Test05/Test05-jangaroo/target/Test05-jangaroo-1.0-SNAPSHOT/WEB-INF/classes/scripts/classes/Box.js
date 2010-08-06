joo.classLoader.prepare("package",/*
{
import flash.display.Sprite*/

"public class Box extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

  "public function Box",function $Box()
  {this[$super]();
    this.graphics.beginFill(Math.random() * 0xffffff);
    this.graphics.drawRect(0,0,50,50);
    this.graphics.endFill();
  },
];},[],["flash.display.Sprite","Math"]
);