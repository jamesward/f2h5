package
{
import flash.display.Sprite;
import flash.display.StageScaleMode;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30', width='100', height='100')]
public class Test04 extends Sprite
{
  public function Test04()
  {
    stage.scaleMode = StageScaleMode.NO_SCALE;
    graphics.lineStyle(1, 0x000000);
    graphics.moveTo(0,0);
    graphics.lineTo(100,100);
  }
}
}
