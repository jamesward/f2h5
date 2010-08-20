package
{
import flash.display.Sprite;
import flash.events.Event;
import flash.text.TextField;

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class Test07 extends Sprite
{
  public function Test07()
  {
    var s1:Sprite = new Sprite();
    s1.graphics.beginFill(0xff0000);
    s1.graphics.drawRect(0, 0, 400, 400);
    s1.graphics.endFill();

    var s2:Sprite = new Sprite();
    s2.graphics.beginFill(0x00ff00);
    s2.graphics.drawRect(100, 100, 200, 200);
    s2.graphics.endFill();
   
    s1.addChild(s2);

    addChild(s1);
  }
}
}
