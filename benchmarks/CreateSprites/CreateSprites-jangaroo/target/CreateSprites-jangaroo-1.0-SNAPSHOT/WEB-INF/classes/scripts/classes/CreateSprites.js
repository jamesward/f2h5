joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event
import flash.text.TextField

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class CreateSprites extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.display.Sprite,Date,flash.text.TextField);},

  "public function CreateSprites",function $CreateSprites()
  {this[$super]();
    var startDate/*:Date*/ = new Date();

    for (var i/*:uint*/ = 0; i < 1000; i++)
    {
      var s/*:Sprite*/ = new flash.display.Sprite();
      s.graphics.clear();
      this.addChild(s);
    }

    var endDate/*:Date*/ = new Date();

    var tf/*:TextField*/ = new flash.text.TextField();
    tf.width = 400;
    tf.text = "creating " + this.numChildren + " Sprites took " + (endDate.getTime() - startDate.getTime()) + " ms";
    this.addChild(tf);
  },
];},[],["flash.display.Sprite","Date","flash.text.TextField"]
);