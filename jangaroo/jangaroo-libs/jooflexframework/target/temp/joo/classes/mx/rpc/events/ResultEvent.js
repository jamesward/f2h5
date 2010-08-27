joo.classLoader.prepare(










"package mx.rpc.events",
















"public class ResultEvent extends mx.rpc.events.AbstractEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString',$callTokenResponders=$$l+'callTokenResponders',$_result=$$l+'_result',$_headers=$$l+'_headers',$_statusCode=$$l+'_statusCode';return[function(){joo.classLoader.init(mx.messaging.messages.AbstractMessage);},






































"public static const",{RESULT:"result"},






















"public function ResultEvent",function(type,bubbles,cancelable,
result,token,message)
{if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=true;}result=null;}token=null;}message=null;}
this[$super](type,bubbles,cancelable,token,message);

if(message!=null&&message.headers!=null)
this[$_statusCode]=message.headers[mx.messaging.messages.AbstractMessage.STATUS_CODE_HEADER];

this[$_result]=result;
},

















"public function get headers",function()
{
return this[$_headers];
},




"public function set headers",function(value)
{
this[$_headers]=value;
},









"public function get result",function()
{
return this[$_result];
},











"public function get statusCode",function()
{
return this[$_statusCode];
},










"public static function createEvent",function(result,token,message)
{if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){result=null;}token=null;}message=null;}
return new mx.rpc.events.ResultEvent(mx.rpc.events.ResultEvent.RESULT,false,true,result,token,message);
},







"override public function clone",function()
{
return new mx.rpc.events.ResultEvent(this.type,this.bubbles,this.cancelable,this.result,this.token,this.message);
},










"override public function toString",function()
{
return this.formatToString("ResultEvent","messageId","type","bubbles","cancelable","eventPhase");
},




"override public function callTokenResponders",function()
{
if(this.token!=null)
this.token.applyResult(this);
},

"public function setResult",function(r)
{
this[$_result]=r;
},








"private var",{_result: undefined},
"private var",{_headers: undefined},
"private var",{_statusCode: undefined},
];},["createEvent"],["mx.rpc.events.AbstractEvent","mx.messaging.messages.AbstractMessage"]

);