joo.classLoader.prepare("package flash.display",






"public class SimpleButton extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getElementName=$$l+'getElementName',$_upState=$$l+'_upState',$_overState=$$l+'_overState',$_downState=$$l+'_downState',$_hitTestState=$$l+'_hitTestState',$_enabled=$$l+'_enabled',$_trackAsMenu=$$l+'_trackAsMenu',$_useHandCursor=$$l+'_useHandCursor';return[








"public function SimpleButton",function(upState,overState,
downState,hitTestState){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){upState=null;}overState=null;}downState=null;}hitTestState=null;}
this[$super]();
this[$_upState]=upState;
this[$_overState]=overState;
this[$_downState]=downState;
this[$_hitTestState]=hitTestState;
},

"override protected function getElementName",function(){
return"button";
},






"public function get downState",function(){
return this[$_downState];
},

"public function set downState",function(value){
this[$_downState]=value;
},





"public function get enabled",function(){
return this[$_enabled];
},

"public function set enabled",function(value){
this[$_enabled]=value;
},


"public function get hitTestState",function(){
return this[$_hitTestState];
},

"public function set hitTestState",function(value){
this[$_hitTestState]=value;
},


"public function get overState",function(){
return this[$_overState];
},

"public function set overState",function(value){
this[$_overState]=value;
},












"public function get trackAsMenu",function(){
return this[$_trackAsMenu];
},

"public function set trackAsMenu",function(value){
this[$_trackAsMenu]=value;
},


"public function get upState",function(){
return this[$_upState];
},

"public function set upState",function(value){
this[$_upState]=value;
},


"public function get useHandCursor",function(){
return this[$_useHandCursor];
},

"public function set useHandCursor",function(value){
this[$_useHandCursor]=value;
},

"private var",{_upState: undefined},
"private var",{_overState: undefined},
"private var",{_downState: undefined},
"private var",{_hitTestState: undefined},

"private var",{_enabled:true},
"private var",{_trackAsMenu: undefined},
"private var",{_useHandCursor: undefined},
];},[],["flash.display.InteractiveObject"]
);