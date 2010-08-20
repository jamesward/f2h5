joo.classLoader.prepare("package",






"public class Test03 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$i=$$l+'i',$f=$$l+'f';return[function(){joo.classLoader.init(flash.display.StageScaleMode);},

"private var",{i:0},

"public function Test03",function()
{this[$super]();
this.stage.scaleMode=flash.display.StageScaleMode.NO_SCALE;

this.addEventListener("enterFrame",$$bound(this,$f));
},

"private function f",function(e)
{
this.graphics.clear();
var a=this.mouseX;
var b=this.mouseY;
var c=++this[$i]%8/8+10;
var d=(this[$i]&8)<<4;
for(var j=64;j--;)
{
this.graphics.lineStyle(c*=1.1,d-=0x50580);
this.graphics.drawCircle(a=5+a-a/50+Math.sin(this[$i]/16),b=5+b-b/50,c);
}
},

];},[],["flash.display.Sprite","flash.display.StageScaleMode","Math"]
);