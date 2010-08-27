joo.classLoader.prepare(






































"package com.salesforce.objects",




"public class Base64",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.utils.ByteArray,Error);},


"private static const",{KEY_STR:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},


"public static function encode",function(input)
{
var output="";
var chr1,chr2,chr3;
var enc1,enc2,enc3,enc4;
var i=0;
var length=input.length;
do{
chr1=input.charCodeAt(i++);
chr2=input.charCodeAt(i++);
chr3=input.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2))
{
enc3=enc4=64;
}
else if(isNaN(chr3))
{
enc4=64;
}
output+=$$private.KEY_STR.charAt(enc1)+$$private.KEY_STR.charAt(enc2)+$$private.KEY_STR.charAt(enc3)+$$private.KEY_STR.charAt(enc4);
}while(i<length);
return output;
},




"public static function decode",function(input)
{
var output=new flash.utils.ByteArray();
var chr1,chr2,chr3;
var enc1,enc2,enc3,enc4;
var i=0;
var length=input.length;


var base64test=/[^A-Za-z0-9\+\/\=]/g;
if(base64test.exec(input))
{
throw new Error("There were invalid base64 characters in the input text.\n"+
"Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n"+
"Expect errors in decoding.");
}
input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");

do{
enc1=$$private.KEY_STR.indexOf(input.charAt(i++));
enc2=$$private.KEY_STR.indexOf(input.charAt(i++));
enc3=$$private.KEY_STR.indexOf(input.charAt(i++));
enc4=$$private.KEY_STR.indexOf(input.charAt(i++));

chr1=(enc1<<2)|(enc2>>4);
chr2=((enc2&15)<<4)|(enc3>>2);
chr3=((enc3&3)<<6)|enc4;

output.writeByte(chr1);

if(enc3!=64)
{
output.writeByte(chr2);
}
if(enc4!=64)
{
output.writeByte(chr3);
}

}while(i<length);

return output;
},
];},["encode","decode"],["flash.utils.ByteArray","Error"]
);