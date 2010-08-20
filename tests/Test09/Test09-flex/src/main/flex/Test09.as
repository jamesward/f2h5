package
{
  import flash.display.Sprite;

  [SWF(backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
  public class Test09 extends Sprite
  {
    public function Test09()
    {
      addChild(new KindaInnerClass());
    }
  }

}

import flash.display.Sprite;
class KindaInnerClass extends Sprite
{
  public function KindaInnerClass()
  {
    graphics.beginFill(0x0000ff);
    graphics.drawRect(0, 0, 50, 50);
  }
}
