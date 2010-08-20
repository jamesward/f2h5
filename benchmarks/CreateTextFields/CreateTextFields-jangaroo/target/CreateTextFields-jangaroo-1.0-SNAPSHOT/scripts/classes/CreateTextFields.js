joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event
import flash.text.TextField

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class CreateTextFields extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Date,flash.text.TextField);},

  "public function CreateTextFields",function $CreateTextFields()
  {this[$super]();
    var startDate/*:Date*/ = new Date();

    for (var i/*:uint*/ = 0; i < 10000; i++)
    {
      var t/*:TextField*/ = new flash.text.TextField();
      t.text = "hello, world";
      this.addChild(t);
    }

    var endDate/*:Date*/ = new Date();

    var tf/*:TextField*/ = new flash.text.TextField();
    tf.y = 100;
    tf.width = 400;
    tf.text = "creating " + this.numChildren + " TextFields took " + (endDate.getTime() - startDate.getTime()) + " ms";
    this.addChild(tf);
  },
];},[],["flash.display.Sprite","Date","flash.text.TextField"]
);