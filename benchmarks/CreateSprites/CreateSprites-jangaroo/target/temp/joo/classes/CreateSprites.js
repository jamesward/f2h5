joo.classLoader.prepare("package",






"public class CreateSprites extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.display.Sprite,Date,flash.text.TextField);},

"public function CreateSprites",function()
{this[$super]();
var startDate=new Date();

for(var i=0;i<1000;i++)
{
var s=new flash.display.Sprite();
s.graphics.clear();
this.addChild(s);
}

var endDate=new Date();

var tf=new flash.text.TextField();
tf.width=400;
tf.text="creating "+this.numChildren+" Sprites took "+(endDate.getTime()-startDate.getTime())+" ms";
this.addChild(tf);
},
];},[],["flash.display.Sprite","Date","flash.text.TextField"]
);