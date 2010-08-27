joo.classLoader.prepare(










"package mx.rpc",











"public class Fault extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$toString=$$l+'toString';return[














"public function Fault",function(faultCode,faultString,faultDetail)
{if(arguments.length<3){faultDetail=null;}
this[$super]("faultCode:"+faultCode+" faultString:'"+faultString+"' faultDetail:'"+faultDetail+"'");

this._faultCode=faultCode;
this._faultString=faultString?faultString:"";
this._faultDetail=faultDetail;
},

















"public var",{content: undefined},










"public var",{rootCause: undefined},















"public function get faultCode",function()
{
return this._faultCode;
},









"public function get faultDetail",function()
{
return this._faultDetail;
},









"public function get faultString",function()
{
return this._faultString;
},

















"override public function toString",function()
{
var s="[RPC Fault";
s+=" faultString=\""+this.faultString+"\"";
s+=" faultCode=\""+this.faultCode+"\"";
s+=" faultDetail=\""+this.faultDetail+"\"]";
return s;
},




"protected var",{_faultCode: undefined},




"protected var",{_faultString: undefined},




"protected var",{_faultDetail: undefined},
];},[],["Error"]

);