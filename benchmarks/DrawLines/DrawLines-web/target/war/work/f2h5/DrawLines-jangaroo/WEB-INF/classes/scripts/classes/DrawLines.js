joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event
import flash.text.TextField

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class DrawLines extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$startDate=$$l+'startDate',$f=$$l+'f';return[function(){joo.classLoader.init(Date,flash.text.TextField,flash.events.Event);},

  "private var",{ startDate/*:Date*/: undefined},

  "public function DrawLines",function $DrawLines()
  {this[$super]();
    this.graphics.lineStyle(1);

    this[$startDate] = new Date();

    for (var i/*:uint*/ = 0; i < 10000; i++)
    {
      this.graphics.moveTo(0, 0);
      this.graphics.lineTo(400, 400);
    }

    this.addEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,$f));
  },

  "private function f",function f(e/*:Event*/)/*:void*/
  {
    var endDate/*:Date*/ = new Date();

    var tf/*:TextField*/ = new flash.text.TextField();
    tf.width = 400;
    tf.text = "drew 10,000 lines in " + (endDate.getTime() - this[$startDate].getTime()) + " ms";
    this.addChild(tf);

    this.removeEventListener(flash.events.Event.ENTER_FRAME, $$bound(this,$f));
  },

];},[],["flash.display.Sprite","Date","flash.events.Event","flash.text.TextField"]
);