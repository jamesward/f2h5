package
{
import flash.display.Sprite;

public class Box extends Sprite
{
  public function Box()
  {
    graphics.beginFill(Math.random() * 0xffffff);
    graphics.drawRect(0,0,50,50);
    graphics.endFill();
  }
}
}
