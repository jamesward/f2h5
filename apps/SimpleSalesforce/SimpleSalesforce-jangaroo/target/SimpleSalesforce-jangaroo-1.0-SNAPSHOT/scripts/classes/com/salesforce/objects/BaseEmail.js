joo.classLoader.prepare(/*
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
"package com.salesforce.objects",/*
{
	import mx.utils.ObjectProxy*/	

	/**
	 * Object which holds fields common to SingleEmail and MassEmail uses of connectoin.sendEmail(), not created directly.
	 * 
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 9
	 * @tiptext
	 * 
	 * @private 
	 * 
	 * @author Ron Hess
	 */	
	"public class BaseEmail",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
	
		"public var",{ bccSender/*:Boolean*/: undefined},
		"public var",{ saveAsActivity/*:Boolean*/: undefined},
		"public var",{ useSignature/*:Boolean*/: undefined},
		"public var",{ emailPriority/*:String*/: undefined}, // Highest,High,Normal,Low,Lowest
		"public var",{ replyTo/*:String*/: undefined},
		"public var",{ subject/*:String*/: undefined},
		
		/**
		 * Constructor for the BaseEmail class.
		 * 
		 * <p>Creates a new BaseEmail object</p>
		 */		
		"public function BaseEmail",function $BaseEmail(obj/*:ObjectProxy*/) {this[$super]();
		},
	
	];},[],[]
);