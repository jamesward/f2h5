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

[RemoteClass(alias="DSK")]*/

/**
 * @private
 */
public class AcknowledgeMessageExt extends mx.messaging.messages.AcknowledgeMessage implements flash.utils.IExternalizable
{
    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    public native function AcknowledgeMessageExt(message:AcknowledgeMessage=null);

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