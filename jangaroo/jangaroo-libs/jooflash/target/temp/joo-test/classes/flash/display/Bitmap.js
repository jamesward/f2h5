joo.classLoader.prepare("package flash.display",


"public class Bitmap extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$_bitmapData=$$l+'_bitmapData',$_pixelSnapping=$$l+'_pixelSnapping',$_smoothing=$$l+'_smoothing';return[








"public function Bitmap",function(bitmapData,pixelSnapping,smoothing){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){bitmapData=null;}pixelSnapping="auto";}smoothing=false;}
this[$_bitmapData]=bitmapData;
this[$super]();
this[$_pixelSnapping]=pixelSnapping;
this[$_smoothing]=smoothing;
},

"override protected function createElement",function(){
return this[$_bitmapData].canvas;
},





"public function get bitmapData",function(){
return this[$_bitmapData];
},

"public function set bitmapData",function(value){
this[$_bitmapData]=value;
},














"public function get pixelSnapping",function(){
return this[$_pixelSnapping];
},














"public function set pixelSnapping",function(value){
this[$_pixelSnapping]=value;
},






"public function get smoothing",function(){
return this[$_smoothing];
},





"public function set smoothing",function(value){
this[$_smoothing]=value;
},

"private var",{_bitmapData: undefined},
"private var",{_pixelSnapping: undefined},
"private var",{_smoothing: undefined},

];},[],["flash.display.DisplayObject"]
);