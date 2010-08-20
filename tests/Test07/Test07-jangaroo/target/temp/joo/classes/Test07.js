joo.classLoader.prepare("package",






"public class Test07 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.display.Sprite);},

"public function Test07",function()
{this[$super]();
var s1=new flash.display.Sprite();
s1.graphics.beginFill(0xff0000);
s1.graphics.drawRect(0,0,400,400);
s1.graphics.endFill();

var s2=new flash.display.Sprite();
s2.graphics.beginFill(0x00ff00);
s2.graphics.drawRect(100,100,200,200);
s2.graphics.endFill();

s1.addChild(s2);

this.addChild(s1);
},
];},[],["flash.display.Sprite"]
);