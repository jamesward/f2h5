joo.classLoader.prepare("package joo.flash", [

"import flash.display.Stage",
"import joo.classLoader",
"import joo.DynamicClassLoader",
"import joo.getQualifiedObject",""],

"public class Run",function(Run,$$private){with(Run)with($$private)return[function(){joo.classLoader.init(classLoader);}, 

  "public static function main",function main(id/* : String*/, primaryDisplayObjectClassName/* : String*/)/* : void*/ {
    (classLoader).import_(primaryDisplayObjectClassName);
    (classLoader).complete(function joo$flash$Run$12_50()/* : void*/ {
      var stage/* : Stage*/ = new Stage(id);
      var primaryDisplayObjectClass/* : Class*/ = getQualifiedObject(primaryDisplayObjectClassName);
      stage.addChildAt(new primaryDisplayObjectClass(), 0);
    });
  },

];},["main"]
);