package
{
import flash.display.Sprite;
import flash.events.Event;
import flash.text.TextField;

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class DrawLines extends Sprite
{
  private var startDate:Date;

  public function DrawLines()
  {
    graphics.lineStyle(1);

    startDate = new Date();

    for (var i:uint = 0; i < 10000; i++)
    {
      graphics.moveTo(0, 0);
      graphics.lineTo(400, 400);
    }

    addEventListener(Event.ENTER_FRAME, f);
  }

  private function f(e:Event):void
  {
    var endDate:Date = new Date();

    var tf:TextField = new TextField();
    tf.width = 400;
    tf.text = "drew 10,000 lines in " + (endDate.time - startDate.time) + " ms";
    addChild(tf);

    removeEventListener(Event.ENTER_FRAME, f);
  }

}
}
