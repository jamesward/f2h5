package
{
import flash.display.Sprite;
import flash.events.Event;
import flash.text.TextField;

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class Test06 extends Sprite
{
  public function Test06()
  {
    var label:TextField = new TextField();
    label.text = "hello, world";
    addChild(label);
  }
}
}
