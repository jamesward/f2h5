package
{
import flash.display.Sprite;
import flash.events.Event;
import com.bit101.components.PushButton;
import com.bit101.components.Text;
import com.bit101.components.Label;
import com.bit101.components.Calendar;
import com.bit101.charts.BarChart;

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]
public class Test08 extends Sprite
{
  public function Test08()
  {
    new Text(this, 0, 0, "hello, world");
    new PushButton(this, 100, 110, "Click me");
    new BarChart(this, 0, 140, [10,87,42,3,92,34,21,83,44,71]);
    new Calendar(this, 0, 250);
  }
}
}
