package
{
import flash.display.Sprite;
import flash.events.Event;
import flash.text.TextField;

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class CreateTextFields extends Sprite
{
  public function CreateTextFields()
  {
    var startDate:Date = new Date();

    for (var i:uint = 0; i < 10000; i++)
    {
      var t:TextField = new TextField();
      t.text = "hello, world";
      addChild(t);
    }

    var endDate:Date = new Date();

    var tf:TextField = new TextField();
    tf.y = 100;
    tf.width = 400;
    tf.text = "creating " + numChildren + " TextFields took " + (endDate.time - startDate.time) + " ms";
    addChild(tf);
  }

}
}
