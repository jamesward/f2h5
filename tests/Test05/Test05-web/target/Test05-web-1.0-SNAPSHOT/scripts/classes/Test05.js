joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class Test05 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$f=$$l+'f';return[function(){joo.classLoader.init(Box,flash.events.Event);},

  "public function Test05",function $Test05()
  {this[$super]();
    this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,$f));
  },

  "private function f",function f(e/*:Event*/)/*:void*/
  {
    var b/*:Box*/ = new Box();
    b.x = (Math.random() * 350);
    b.y = (Math.random() * 350);
    b.width = 50;
    b.height = 50;
    this.addChild(b);
  },
];},[],["flash.display.Sprite","flash.events.Event","Box","Math"]
);