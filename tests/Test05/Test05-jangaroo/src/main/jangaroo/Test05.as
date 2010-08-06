package
{
import flash.display.Sprite;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class Test05 extends Sprite
{
  public function Test05()
  {
    addEventListener(Event.ENTER_FRAME, f);
  }

  private function f(e:Event):void
  {
    var b:Box = new Box();
    b.x = (Math.random() * 350);
    b.y = (Math.random() * 350);
    b.width = 50;
    b.height = 50;
    addChild(b);
  }
}
}
