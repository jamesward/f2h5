joo.classLoader.prepare(










"package mx.rpc.events",

















"public class AbstractEvent extends mx.messaging.events.MessageEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_token=$$l+'_token';return[

"private var",{_token: undefined},




"public function AbstractEvent",function(type,bubbles,cancelable,
token,message)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=true;}token=null;}message=null;}
this[$super](type,bubbles,cancelable,message);

this[$_token]=token;
},









"public function get token",function()
{
return this[$_token];
},

"mx_internal function setToken",function(t)
{
this[$_token]=t;
},









"mx_internal function callTokenResponders",function()
{
},
];},[],["mx.messaging.events.MessageEvent"]

);