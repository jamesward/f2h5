joo.classLoader.prepare(









"package mx.utils",














"public dynamic class OrderedObject extends flash.utils.Proxy",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_item=$$l+'_item',$getProperty=$$l+'getProperty',$callProperty=$$l+'callProperty',$deleteProperty=$$l+'deleteProperty',$hasProperty=$$l+'hasProperty',$nextName=$$l+'nextName',$nextNameIndex=$$l+'nextNameIndex',$nextValue=$$l+'nextValue',$setProperty=$$l+'setProperty';return[

















"public function OrderedObject",function(item)
{if(arguments.length<1){item=null;}
this[$super]();

if(!item)
item={};
this[$_item]=item;

this.propertyList=[];
},















"public var",{propertyList: undefined},



















"private var",{_item: undefined},



























"public function getObjectProperty",function(name)
{
return this.getProperty(name);
},






















"public function setObjectProperty",function(name,value)
{
this.setProperty(name,value);
},





















"override public function getProperty",function(name)
{

var result=null;

result=this[$_item][name];

return result;
},















"override public function callProperty",function(name)
{var rest=Array.prototype.slice.call(arguments,1);
return this[$_item][name].apply(this[$_item],rest);
},















"override public function deleteProperty",function(name)
{
var oldVal=this[$_item][name];
var deleted=delete this[$_item][name];

var deleteIndex=-1;
for(var i=0;i<this.propertyList.length;i++)
{
if(this.propertyList[i]==name)
{
deleteIndex=i;
break;
}
}
if(deleteIndex>-1)
{
this.propertyList.splice(deleteIndex,1);
}

return deleted;
},

















"override public function hasProperty",function(name)
{
return(name in this[$_item]);
},
















"override public function nextName",function(index)
{
return this.propertyList[index-1];
},












"override public function nextNameIndex",function(index)
{
if(index<this.propertyList.length)
{
return index+1;
}
else
{
return 0;
}
},
















"override public function nextValue",function(index)
{
return this[$_item][this.propertyList[index-1]];
},














"override public function setProperty",function(name,value)
{
var oldVal=this[$_item][name];
if(oldVal!==value)
{

this[$_item][name]=value;

for(var i=0;i<this.propertyList.length;i++)
{
if(this.propertyList[i]==name)
{
return;
}
}
this.propertyList.push(name);
}
},

];},[],["flash.utils.Proxy"]

);