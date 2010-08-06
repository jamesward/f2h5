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