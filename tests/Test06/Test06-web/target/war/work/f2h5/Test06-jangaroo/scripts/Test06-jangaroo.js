// class Box
joo.classLoader.prepare("package",



"public class Box extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public function Box",function()
{this[$super]();
this.graphics.beginFill(Math.random()*0xffffff);
this.graphics.drawRect(0,0,50,50);
this.graphics.endFill();
},
];},[],["flash.display.Sprite","Math"]
);
// class Test06
joo.classLoader.prepare("package",






"public class Test06 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.text.TextField);},

"public function Test06",function()
{this[$super]();
var label=new flash.text.TextField();
label.text="hello, world";
this.addChild(label);
},
];},[],["flash.display.Sprite","flash.text.TextField"]
);
// class Test05
joo.classLoader.prepare("package",





"public class Test05 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$f=$$l+'f';return[function(){joo.classLoader.init(Box,flash.events.Event);},

"public function Test05",function()
{this[$super]();
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,$f));
},

"private function f",function(e)
{
var b=new Box();
b.x=(Math.random()*350);
b.y=(Math.random()*350);
b.width=50;
b.height=50;
this.addChild(b);
},
];},[],["flash.display.Sprite","flash.events.Event","Box","Math"]
);
