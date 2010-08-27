package
{

import reflex.components.Application;
import reflex.components.Button;

public class Test11 extends Application
{
  public function Test11()
  {
    var b:Button = new Button();
    b.label = "test";
    addChild(b);
  }
}
}
