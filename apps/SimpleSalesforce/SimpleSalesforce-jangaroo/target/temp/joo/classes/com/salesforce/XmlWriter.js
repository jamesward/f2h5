joo.classLoader.prepare(


























"package com.salesforce",






"public class XmlWriter",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$buffer=$$l+'buffer',$nspaces=$$l+'nspaces',$prefixCount=$$l+'prefixCount',$writingStartElement=$$l+'writingStartElement',$append=$$l+'append';return[function(){joo.classLoader.init(Date,String,Array,Boolean,Object);},

"private var",{buffer: undefined},
"private var",{nspaces: undefined},
"private var",{prefixCount:0},
"private var",{writingStartElement: undefined},

"private static var",{soapNS:"http://schemas.xmlsoap.org/soap/envelope/"},

"public function XmlWriter",function()
{this[$super]();
this[$buffer]=new String("");
this[$nspaces]=new Object();
this[$prefixCount]=0;
this[$writingStartElement]=false;
},

"public function writeStartElement",function(name,nspace,prefix)
{if(arguments.length<3){if(arguments.length<2){nspace=null;}prefix=null;}
if(this[$writingStartElement]){
this[$append](">");
}
this[$append]("<");
var newns=false;
if(nspace){
if(!this[$nspaces][nspace]&&this[$nspaces][nspace]!==""){
newns=true;
}
if(!prefix){
prefix=this.getPrefix(nspace);
}
if(prefix!==null&&prefix!==""){
this[$append](prefix);
this[$append](":");
}
}

this[$append](name);
if(newns===true){
this.writeNamespace(nspace,prefix);
}
this[$writingStartElement]=true;
},

"public function writeEndElement",function(name,nspace)
{if(arguments.length<2){nspace=null;}
if(this[$writingStartElement]){
this[$append]("/>");
}else{
this[$append]("</");
if(nspace){
var prefix=this.getPrefix(nspace);
if(prefix&&prefix!==""){
this[$append](prefix);
this[$append](":");
}
}
this[$append](name);
this[$append](">");
}
this[$writingStartElement]=false;
},

"public function writeNamespace",function(nspace,prefix)
{
if(prefix&&""!==prefix){
this[$nspaces][nspace]=prefix;
this[$append](" ");
this[$append]("xmlns:");
this[$append](prefix);
}else{
this[$nspaces][nspace]="";
this[$append](" ");
this[$append]("xmlns");
}
this[$append]("=\"");
this[$append](nspace);
this[$append]("\"");
},

"public function writeText",function(text)
{
if(this[$writingStartElement]){
this[$append](">");
this[$writingStartElement]=false;
}else{
throw"Can only write text after a start element";
}
if(typeof text=='string'){
text=text.replace(/&/g,'&amp;');
text=text.replace(/</g,'&lt;');
text=text.replace(/>/g,'&gt;');
}

this[$append](text);
},

"public function writeXsiType",function(xsiType)
{
this.writeNamespace("http://www.w3.org/2001/XMLSchema-instance","xsi");
this.writeAttribute("xsi:type",xsiType);
},

"public function writeAttribute",function(name,value)
{
this[$append](" "+name+"=\""+value+"\"");
},

"public function getPrefix",function(nspace)
{
var prefix=this[$nspaces][nspace];


if(!prefix&&prefix!==""){
prefix="ns"+this[$prefixCount];
this[$prefixCount]++;
this[$nspaces][nspace]=prefix;
return prefix;
}
return prefix;
},

"public function toString",function()
{
return this[$buffer];
},


"public function startEnvelope",function()
{
this.writeStartElement("Envelope",$$private.soapNS,"se");
},

"public function endEnvelope",function()
{
this.writeEndElement("Envelope",$$private.soapNS);
},

"public function startHeader",function()
{
this.writeStartElement("Header",$$private.soapNS,"se");
},

"public function endHeader",function()
{
this.writeEndElement("Header",$$private.soapNS);
},

"public function startBody",function()
{
this.writeStartElement("Body",$$private.soapNS,"se");
},

"public function endBody",function()
{
this.writeEndElement("Body",$$private.soapNS);
},

"public function writeNameValueNode",function(name,value)
{

if(is(value,Date))
{
this.writeStartElement(name);
this.writeText(com.salesforce.Util.dateTimeToString(value));
this.writeEndElement(name);
}
else if(is(value,Boolean))
{


var textValue=value?"true":"false";
this.writeStartElement(name);
this.writeText(textValue);
this.writeEndElement(name);
}
else if(value&&(is(value,Array)))
{
for(var v in value)
{
this.writeStartElement(name);
this.writeText(value[v]);
this.writeEndElement(name);
}
}
else
{
this.writeStartElement(name);
this.writeText(value.toString());
this.writeEndElement(name);
}
},




"private function append",function(s)
{
this[$buffer]=this[$buffer].concat(s);
},

];},[],["String","Object","Date","com.salesforce.Util","Boolean","Array"]
);