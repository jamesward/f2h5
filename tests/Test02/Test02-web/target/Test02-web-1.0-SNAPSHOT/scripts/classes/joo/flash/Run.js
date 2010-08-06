joo.classLoader.prepare("package joo.flash", [

"import flash.display.Stage",
"import joo.classLoader",
"import joo.DynamicClassLoader",
"import joo.getQualifiedObject",""],

"public class Run",function($$private){with($$private)return[ 

  "public static function main",function main(id/* : String*/, primaryDisplayObjectClassName/* : String*/)/* : void*/ {
    (joo.classLoader/*as DynamicClassLoader*/).import_(primaryDisplayObjectClassName);
    (joo.classLoader/*as DynamicClassLoader*/).complete(function joo$flash$Run$12_50()/* : void*/ {
      var stage/* : Stage*/ = new flash.display.Stage(id);
      var primaryDisplayObjectClass/* : Class*/ = joo.getQualifiedObject(primaryDisplayObjectClassName)/*as Class*/;
      stage.addChildAt(new primaryDisplayObjectClass()/*as DisplayObject*/, 0);
    });
  },

];},["main"],["flash.display.Stage"]
);