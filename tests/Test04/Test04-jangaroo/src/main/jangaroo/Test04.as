package
{
import flash.display.Sprite;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30')]
public class Test04 extends Sprite
{
  public function Test04()
  {
    graphics.lineStyle(1, 0x000000);
    graphics.moveTo(0,0);
    graphics.lineTo(100,100);
  }

}
}
