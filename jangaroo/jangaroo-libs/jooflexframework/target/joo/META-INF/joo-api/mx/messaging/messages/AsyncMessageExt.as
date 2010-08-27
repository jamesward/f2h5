////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

package mx.messaging.messages
{

import flash.utils.IDataOutput;
import flash.utils.IExternalizable;/*

[RemoteClass(alias="DSA")]*/

/**
 * A special serialization wrapper for AsyncMessages. This wrapper is used to
 * enable the externalizable form of an AsyncMessage for serialization. The
 * wrapper must be applied just before the message is serialized as it does not
 * proxy any information to the wrapped message.
 * 
 * @private
 */
public class AsyncMessageExt extends mx.messaging.messages.AsyncMessage implements flash.utils.IExternalizable
{
    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    public native function AsyncMessageExt(message:AsyncMessage=null);

    override public native function writeExternal(output:IDataOutput):void;

    /**
     *  The unique id for the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    override public native function get messageId():String;
}

}