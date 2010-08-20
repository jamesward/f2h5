package
{
import flash.display.Sprite;
import flash.events.Event;
import flash.text.TextField;

[SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class CreateSprites extends Sprite
{
  public function CreateSprites()
  {
    var startDate:Date = new Date();

    for (var i:uint = 0; i < 1000; i++)
    {
      var s:Sprite = new Sprite();
      s.graphics.clear();
      addChild(s);
    }

    var endDate:Date = new Date();

    var tf:TextField = new TextField();
    tf.width = 400;
    tf.text = "creating " + numChildren + " Sprites took " + (endDate.time - startDate.time) + " ms";
    addChild(tf);
  }

}
}
