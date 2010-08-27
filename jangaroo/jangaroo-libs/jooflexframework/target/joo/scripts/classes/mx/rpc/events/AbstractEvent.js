joo.classLoader.prepare(////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2005-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

"package mx.rpc.events",/*
{

import mx.core.mx_internal
import mx.messaging.events.MessageEvent
import mx.messaging.messages.IMessage
import mx.rpc.AsyncToken

"use namespace mx_internal",*/

/**
 * The base class for events that RPC services dispatch.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
"public class AbstractEvent extends mx.messaging.events.MessageEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_token=$$l+'_token';return[

    "private var",{ _token/*:AsyncToken*/: undefined},

    /**
     * @private
     */
    "public function AbstractEvent",function $AbstractEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = true*/, 
        token/*:AsyncToken = null*/, message/*:IMessage = null*/)
    {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = true;}token = null;}message = null;}
        this[$super](type, bubbles, cancelable, message);

        this[$_token] = token;
    },

    /**
     * The token that represents the call to the method. Used in the asynchronous completion token pattern.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get token",function get$token()/*:AsyncToken*/
    {
        return this[$_token];
    },

    "mx_internal function setToken",function setToken(t/*:AsyncToken*/)/*:void*/
    {
        this[$_token] = t;
    },
    
    /**
     * Does nothing by default.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "mx_internal function callTokenResponders",function callTokenResponders()/*:void*/
    {
    },
];},[],["mx.messaging.events.MessageEvent"]

);