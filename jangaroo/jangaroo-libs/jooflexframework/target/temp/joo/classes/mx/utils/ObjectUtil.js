joo.classLoader.prepare(










"package mx.utils",
















"public class ObjectUtil",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(mx.collections.IList,Date,Class,flash.utils.Dictionary,Array,Error);},


















"mx_internal static const",{VERSION:"3.3.0.4852"},





"private static var",{defaultToStringExcludes:function(){return(["password","credentials"]);}},








































"public static function compare",function(a,b,depth)
{if(arguments.length<3){depth=-1;}
return $$private.internalCompare(a,b,0,depth,new flash.utils.Dictionary(true));
},
















"public static function copy",function(value)
{





return null;
},



















"public static function isSimple",function(value)
{
var type=typeof(value);
switch(type)
{
case"number":
case"string":
case"boolean":
{
return true;
}

case"object":
{
return(is(value,Date))||(is(value,Array));
}
}

return false;
},














"public static function numericCompare",function(a,b)
{
if(isNaN(a)&&isNaN(b))
return 0;

if(isNaN(a))
return 1;

if(isNaN(b))
return-1;

if(a<b)
return-1;

if(a>b)
return 1;

return 0;
},

















"public static function stringCompare",function(a,b,
caseInsensitive)
{if(arguments.length<3){caseInsensitive=false;}
if(a==null&&b==null)
return 0;

if(a==null)
return 1;

if(b==null)
return-1;


if(caseInsensitive)
{
a=a.toLocaleLowerCase();
b=b.toLocaleLowerCase();
}

var result=a.localeCompare(b);

if(result<-1)
result=-1;
else if(result>1)
result=1;

return result;
},

















"public static function dateCompare",function(a,b)
{
if(a==null&&b==null)
return 0;

if(a==null)
return 1;

if(b==null)
return-1;

var na=a.getTime();
var nb=b.getTime();

if(na<nb)
return-1;

if(na>nb)
return 1;

return 0;
},











































































































































































"public static function toString",function(value,
namespaceURIs,
exclude)
{if(arguments.length<3){if(arguments.length<2){namespaceURIs=null;}exclude=null;}
if(exclude==null)
{
exclude=$$private.defaultToStringExcludes;
}

$$private.refCount=0;
return $$private.internalToString(value,0,null,namespaceURIs,exclude);
},






"private static function internalToString",function(value,
indent,
refs,
namespaceURIs,
exclude)
{if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){indent=0;}refs=null;}namespaceURIs=null;}exclude=null;}
var str;
var type=value==null?"null":typeof(value);
switch(type)
{
case"boolean":
case"number":
{
return value.toString();
}

case"string":
{
return"\""+value.toString()+"\"";
}

case"object":
{
if(is(value,Date))
{
return value.toString();
}




else if(is(value,Class))
{
return"("+flash.utils.getQualifiedClassName(value)+")";
}
else
{
var classInfo=mx.utils.ObjectUtil.getClassInfo(value,exclude,
{includeReadOnly:true,uris:namespaceURIs});

var properties=classInfo.properties;

str="("+classInfo.name+")";





if(refs==null)
refs=new flash.utils.Dictionary(true);


var id=refs[value];
if(id!=null)
{
str+="#"+id;
return str;
}

if(value!=null)
{
str+="#"+$$private.refCount;
refs[value]=$$private.refCount;
$$private.refCount++;
}

var isArray=is(value,Array);
var isDict=is(value,flash.utils.Dictionary);
var prop;
indent+=2;


for(var j=0;j<properties.length;j++)
{
str=$$private.newline(str,indent);
prop=properties[j];

if(isArray)
str+="[";
else if(isDict)
str+="{";


if(isDict)
{

str+=$$private.internalToString(prop,indent,refs,
namespaceURIs,exclude);
}
else
{
str+=prop.toString();
}

if(isArray)
str+="] ";
else if(isDict)
str+="} = ";
else
str+=" = ";

try
{

str+=$$private.internalToString(value[prop],indent,refs,
namespaceURIs,exclude);
}
catch(e){if(is(e,Error))
{
















str+="?";
}else throw e;}
}
indent-=2;
return str;
}
break;
}

case"xml":
{
return value.toString();
}

default:
{
return"("+type+")";
}
}

return"(unknown)";
},






"private static function newline",function(str,n)
{if(arguments.length<2){n=0;}
var result=str;
result+="\n";

for(var i=0;i<n;i++)
{
result+=" ";
}
return result;
},

"private static function internalCompare",function(a,b,
currentDepth,desiredDepth,
refs)
{
if(a==null&&b==null)
return 0;

if(a==null)
return 1;

if(b==null)
return-1;







var typeOfA=typeof(a);
var typeOfB=typeof(b);

var result=0;

if(typeOfA==typeOfB)
{
switch(typeOfA)
{
case"boolean":
{
result=mx.utils.ObjectUtil.numericCompare((a),(b));
break;
}

case"number":
{
result=mx.utils.ObjectUtil.numericCompare(a,b);
break;
}

case"string":
{
result=mx.utils.ObjectUtil.stringCompare(a,b);
break;
}

case"object":
{
var newDepth=desiredDepth>0?desiredDepth-1:desiredDepth;









var aRef=refs[a];
var bRef=refs[b];

if(aRef&&!bRef)
return 1;
else if(bRef&&!aRef)
return-1;
else if(bRef&&aRef)
return 0;

refs[a]=true;
refs[b]=true;

if(desiredDepth!=-1&&(currentDepth>desiredDepth))
{


result=mx.utils.ObjectUtil.stringCompare(a.toString(),b.toString());
}
else if((is(a,Array))&&(is(b,Array)))
{
result=$$private.arrayCompare(a,b,currentDepth,desiredDepth,refs);
}
else if((is(a,Date))&&(is(b,Date)))
{
result=mx.utils.ObjectUtil.dateCompare(a,b);
}
else if((is(a,mx.collections.IList))&&(is(b,mx.collections.IList)))
{
result=$$private.listCompare(a,b,currentDepth,desiredDepth,refs);
}




else if(flash.utils.getQualifiedClassName(a)==flash.utils.getQualifiedClassName(b))
{
var aProps=mx.utils.ObjectUtil.getClassInfo(a).properties;
var bProps;



if(flash.utils.getQualifiedClassName(a)=="Object")
{
bProps=mx.utils.ObjectUtil.getClassInfo(b).properties;
result=$$private.arrayCompare(aProps,bProps,currentDepth,newDepth,refs);
}

if(result!=0)
{
return result;
}


var propName;
var aProp;
var bProp;
for(var i=0;i<aProps.length;i++)
{
propName=aProps[i];
aProp=a[propName];
bProp=b[propName];
result=$$private.internalCompare(aProp,bProp,currentDepth+1,newDepth,refs);
if(result!=0)
{
i=aProps.length;
}
}
}
else
{

return 1;
}
break;
}
}
}
else
{
return mx.utils.ObjectUtil.stringCompare(typeOfA,typeOfB);
}

return result;
},





































"public static function getClassInfo",function(obj,
excludes,
options)
{if(arguments.length<3){if(arguments.length<2){excludes=null;}options=null;}




























































































































































































































return null;
},













"public static function hasMetadata",function(obj,
propName,
metadataName,
excludes,
options)
{if(arguments.length<5){if(arguments.length<4){excludes=null;}options=null;}
var classInfo=mx.utils.ObjectUtil.getClassInfo(obj,excludes,options);
var metadataInfo=classInfo["metadata"];
return $$private.internalHasMetadata(metadataInfo,propName,metadataName);
},




"private static function internalHasMetadata",function(metadataInfo,propName,metadataName)
{
if(metadataInfo!=null)
{
var metadata=metadataInfo[propName];
if(metadata!=null)
{
if(metadata[metadataName]!=null)
return true;
}
}
return false;
},








































































"private static function getCacheKey",function(o,excludes,options)
{if(arguments.length<3){if(arguments.length<2){excludes=null;}options=null;}
var key=flash.utils.getQualifiedClassName(o);

if(excludes!=null)
{
for(var i=0;i<excludes.length;i++)
{
var excl=excludes[i];
if(excl!=null)
key+=excl;
}
}

if(options!=null)
{
for(var flag in options)
{
key+=flag;
var value=options[flag];
if(value!=null)
key+=value;
}
}
return key;
},




"private static function arrayCompare",function(a,b,
currentDepth,desiredDepth,
refs)
{
var result=0;

if(a.length!=b.length)
{
if(a.length<b.length)
result=-1;
else
result=1;
}
else
{
var key;
for(key in a)
{
if(b.hasOwnProperty(key))
{
result=$$private.internalCompare(a[key],b[key],currentDepth,
desiredDepth,refs);

if(result!=0)
return result;
}
else
{
return-1;
}
}

for(key in b)
{
if(!a.hasOwnProperty(key))
{
return 1;
}
}
}

return result;
},

































"private static function listCompare",function(a,b,currentDepth,
desiredDepth,refs)
{
var result=0;

if(a.length!=b.length)
{
if(a.length<b.length)
result=-1;
else
result=1;
}
else
{
for(var i=0;i<a.length;i++)
{
result=$$private.internalCompare(a.getItemAt(i),b.getItemAt(i),
currentDepth+1,desiredDepth,refs);
if(result!=0)
{
i=a.length;
}
}
}

return result;
},




"private static var",{refCount:0},




"private static var",{CLASS_INFO_CACHE:function(){return({});}},
];},["compare","copy","isSimple","numericCompare","stringCompare","dateCompare","toString","getClassInfo","hasMetadata"],["flash.utils.Dictionary","Date","Array","Class","Error","Number","mx.collections.IList"]

);