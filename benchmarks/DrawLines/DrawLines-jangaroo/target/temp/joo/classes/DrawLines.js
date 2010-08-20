joo.classLoader.prepare("package",






"public class DrawLines extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$startDate=$$l+'startDate',$f=$$l+'f';return[function(){joo.classLoader.init(Date,flash.text.TextField,flash.events.Event);},

"private var",{startDate: undefined},

"public function DrawLines",function()
{this[$super]();
this.graphics.lineStyle(1);

this[$startDate]=new Date();

for(var i=0;i<10000;i++)
{
this.graphics.moveTo(0,0);
this.graphics.lineTo(400,400);
}

this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,$f));
},

"private function f",function(e)
{
var endDate=new Date();

var tf=new flash.text.TextField();
tf.width=400;
tf.text="drew 10,000 lines in "+(endDate.getTime()-this[$startDate].getTime())+" ms";
this.addChild(tf);

this.removeEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,$f));
},

];},[],["flash.display.Sprite","Date","flash.events.Event","flash.text.TextField"]
);