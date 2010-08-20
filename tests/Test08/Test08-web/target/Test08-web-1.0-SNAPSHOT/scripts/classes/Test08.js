joo.classLoader.prepare("package",/*
{
import flash.display.Sprite
import flash.events.Event
import com.bit101.components.PushButton
import com.bit101.components.Text
import com.bit101.components.Label
import com.bit101.components.Calendar
import com.bit101.charts.BarChart

[SWF( backgroundColor='0xffffff', frameRate='30', width='400', height='400')]*/
"public class Test08 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(com.bit101.components.Text,com.bit101.components.PushButton,com.bit101.charts.BarChart,com.bit101.components.Calendar);},

  "public function Test08",function $Test08()
  {this[$super]();
    new com.bit101.components.Text(this, 0, 0, "hello, world");
    new com.bit101.components.PushButton(this, 100, 110, "Click me");
    new com.bit101.charts.BarChart(this, 0, 140, [10,87,42,3,92,34,21,83,44,71]);
    new com.bit101.components.Calendar(this, 0, 250);
  },
];},[],["flash.display.Sprite","com.bit101.components.Text","com.bit101.components.PushButton","com.bit101.charts.BarChart","com.bit101.components.Calendar"]
);