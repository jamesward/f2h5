package
{
import flash.display.Sprite;
//import flash.display.StageScaleMode;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30')]
public class Test02 extends Sprite
{
  private var i:uint = 0;

  public function Test02()
  {
    //stage.scaleMode = StageScaleMode.NO_SCALE;

    addEventListener(Event.ENTER_FRAME, f);
  }

  private function f(e:Event):void
  {
    if (i > 400)
      return;
    if (i++ < 1)
    {
      x = 275;
      y = 200;
    }
    graphics.lineStyle(3, Math.random()*1e7, 1);
    graphics.moveTo(Math.sin(i/9)*i, Math.cos(i/9)*i);
    graphics.lineTo(Math.sin(i/9)*200, Math.cos(i/9)*200);
  }

}
}
