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
package com.salesforce.objects
{
	import flash.utils.ByteArray;
	
	public dynamic class Bitset {		
		public var data:ByteArray;
		
		public function Bitset(data:String)		{
			// the string that comes over the wire is base 64 
			// need to move it back to binary data		
			this.data = Base64.decode(data);  
		}
 
		public function testBit(n:int):Boolean {
			var d:int = data[n>>3];
			return ((d & (0x80 >> n % 8)) != 0); 
		}
	
		public function dump( ) : String {
		    var hex:String = "0x";  
		    var bytes:ByteArray = this.data;  
		    for( var i:int = 0; i < bytes.length; i++ )
		        hex += d2h( int(bytes[i]) );
		    return hex;		
		}
		
		private function d2h( d:int ) : String {
		    var c:Array = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
		    if( d> 255 ) d = 255;
		    var l:int = d / 16;
		    var r:int = d % 16;
		    return c[l]+c[r];
		}

	}
}