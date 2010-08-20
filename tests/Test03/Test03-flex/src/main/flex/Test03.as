package
{
import flash.display.Sprite;
import flash.display.StageScaleMode;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30')]
public class Test03 extends Sprite
{
  private var i:uint = 0;

  public function Test03()
  {
    stage.scaleMode = StageScaleMode.NO_SCALE;

    addEventListener("enterFrame", f);
  }

  private function f(e:Event):void
  {
    graphics.clear();
    var a:Number = mouseX;
    var b:Number = mouseY;
    var c:Number = ++i % 8 / 8 + 10;
    var d:Number = (i & 8 ) << 4;
    for (var j:int = 64; j--; )
    {
      graphics.lineStyle(c *= 1.1, d -= 0x50580);
      graphics.drawCircle(a = 5+a - a/50 + Math.sin(i/16), b = 5 + b - b/50, c);
    }
  }

}
}
