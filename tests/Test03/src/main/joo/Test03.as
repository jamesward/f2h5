package
{
import flash.display.Sprite;
//import flash.display.StageScaleMode;
import flash.events.Event;

[SWF( backgroundColor='0xffffff', frameRate='30')]
public class Test03 extends Sprite
{
  private var i:uint = 0;

  public function Test03()
  {
    //stage.scaleMode = StageScaleMode.NO_SCALE;

    addEventListener("enterFrame", f);
  }

  private function f(e:Event):void
  {
    graphics.clear();
    i++;
    var n:Number = Math.sin(i*.04)*9;
    graphics.beginFill(Math.random()*999999);
    for (var j:uint = 3; j--;)
    {
      graphics.drawCircle(n*5, n*5, j*5);
    }
    graphics.fill();
    x = y = 237;
    //rotation = n * 99;
    //scaleX = scaleY = 3 + Math.abs(n);
  }

}
}
