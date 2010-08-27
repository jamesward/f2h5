////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2005-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

package mx.rpc.events
{

import mx.core.mx_internal;
import mx.messaging.events.MessageEvent;
import mx.messaging.messages.IMessage;
import mx.rpc.AsyncToken;

"use namespace mx_internal",;

/**
 * The base class for events that RPC services dispatch.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
public class AbstractEvent extends mx.messaging.events.MessageEvent
{

    /**
     * @private
     */
    public native function AbstractEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = true, 
        token:AsyncToken = null, message:IMessage = null);

    /**
     * The token that represents the call to the method. Used in the asynchronous completion token pattern.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public native function get token():AsyncToken;

    mx_internal native function setToken(t:AsyncToken):void;
    
    /**
     * Does nothing by default.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    mx_internal native function callTokenResponders():void;
}

}