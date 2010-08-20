joo.classLoader.prepare("package joo.flash",







"public class Run",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static function main",function(id,primaryDisplayObjectClassName){
(joo.classLoader).import_(primaryDisplayObjectClassName);
(joo.classLoader).complete(function(){
var stage=flash.display.Stage.getInstance(id);
var primaryDisplayObjectClass=joo.getQualifiedObject(primaryDisplayObjectClassName);
stage.addChildAt(new primaryDisplayObjectClass(),0);
});
},

];},["main"],["flash.display.Stage"]
);