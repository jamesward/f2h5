joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event
import flash.text.TextField

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class Test06 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.text.TextField);},

  "public function Test06",function $Test06()
  {this[$super]();
    var label/*:TextField*/ = new flash.text.TextField();
    label.text = "hello, world";
    this.addChild(label);
  },
];},[],["flash.display.Sprite","flash.text.TextField"]
);