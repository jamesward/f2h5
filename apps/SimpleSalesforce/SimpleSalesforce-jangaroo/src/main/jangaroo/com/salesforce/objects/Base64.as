/*
Copyright (c) 2007 salesforce.com, inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
﻿/**
 * @class Base64
 * @author Abdul Qabiz (http://www.abdulqabiz.com)
 * @version 1.0
 * @requires ActionScript 3.0 and Flash Player 8.5 (atleast)
 * 
 * @credits Based on Aardwulf Systems'(www.aardwulf.com) Javascript implementation.
 *			   (http://www.aardwulf.com/tutor/base64/base64.html)
 * 
**/


package com.salesforce.objects
{
	import flash.utils.ByteArray;
	import mx.binding.utils.BindingUtils;
	
	public class Base64
	{
		 
		 private static const KEY_STR:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		//Base64:encode(..) encodes a string to a base64 string
		public static function encode(input:String):String
		{
			var output:String = "";
		    var chr1:uint, chr2:uint, chr3:uint;
		    var enc1:uint, enc2:uint, enc3:uint, enc4:uint;
		    var i:uint = 0;
			var length:uint = input.length;
		    do{
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	            enc1 = chr1 >> 2;
		        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
		         if (isNaN(chr2)) 
				 {
			        enc3 = enc4 = 64;
				 } 
				 else if (isNaN(chr3)) 
				{
					enc4 = 64;
				}
				output+= KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
			}while (i < length);
			return output;
		}


		//Base64:decode(..) decodes a base64 string
   
		public static function decode(input:String):ByteArray
		{
		    var output:ByteArray = new ByteArray();
			var chr1:uint, chr2:uint, chr3:uint;
		    var enc1:int, enc2:int, enc3:int, enc4:int;
			var i:uint = 0;
			var length:uint = input.length;

			// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			var base64test:RegExp = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input))
			{
		     throw new Error("There were invalid base64 characters in the input text.\n" +
               "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
               "Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do{
				enc1 = KEY_STR.indexOf(input.charAt(i++));
				enc2 = KEY_STR.indexOf(input.charAt(i++));
				enc3 = KEY_STR.indexOf(input.charAt(i++));
				enc4 = KEY_STR.indexOf(input.charAt(i++));
				
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
		 		
				output.writeByte( chr1 );
				
				if (enc3 != 64)
				{
					output.writeByte( chr2);
				}
				if (enc4 != 64) 
				{
					output.writeByte(chr3);
				}
	
			}while(i < length);

			return output;
		}
	}
}