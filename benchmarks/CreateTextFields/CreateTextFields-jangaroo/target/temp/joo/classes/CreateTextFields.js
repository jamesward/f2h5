joo.classLoader.prepare("package",






"public class CreateTextFields extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Date,flash.text.TextField);},

"public function CreateTextFields",function()
{this[$super]();
var startDate=new Date();

for(var i=0;i<10000;i++)
{
var t=new flash.text.TextField();
t.text="hello, world";
this.addChild(t);
}

var endDate=new Date();

var tf=new flash.text.TextField();
tf.y=100;
tf.width=400;
tf.text="creating "+this.numChildren+" TextFields took "+(endDate.getTime()-startDate.getTime())+" ms";
this.addChild(tf);
},
];},[],["flash.display.Sprite","Date","flash.text.TextField"]
);