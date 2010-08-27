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

package mx.messaging.messages
{

import flash.utils.ByteArray;
import flash.utils.IDataInput;
import flash.utils.IDataOutput;

import mx.utils.RPCUIDUtil;/*

[RemoteClass(alias="flex.messaging.messages.AsyncMessage")]*/

/**
 *  AsyncMessage is the base class for all asynchronous messages.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion BlazeDS 4
 *  @productversion LCDS 3 
 */
public class AsyncMessage extends mx.messaging.messages.AbstractMessage implements mx.messaging.messages.ISmallMessage
{
    //--------------------------------------------------------------------------
    //
    // Static Constants
    // 
    //--------------------------------------------------------------------------
    
	/**
	 *  Messages sent by a MessageAgent with a defined <code>subtopic</code>
	 *  property indicate their target subtopic in this header.
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion BlazeDS 4
	 *  @productversion LCDS 3 
	 */
	public static const SUBTOPIC_HEADER:String = "DSSubtopic";

    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    /**
     *  Constructs an instance of an AsyncMessage with an empty body and header.
     *  In addition to this default behavior, the body and the headers for the
     *  message may also be passed to the constructor as a convenience.
     *  An example of this invocation approach for the body is:
     *  <code>var msg:AsyncMessage = new AsyncMessage("Body text");</code>
     *  An example that provides both the body and headers is:
     *  <code>var msg:AsyncMessage = new AsyncMessage("Body text", {"customerHeader":"customValue"});</code>
     * 
     *  @param body The optional body to assign to the message.
     * 
     *  @param headers The optional headers to assign to the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function AsyncMessage(body:Object = null, headers:Object = null);

    /**
     *  Provides access to the correlation id of the message.
     *  Used for acknowledgement and for segmentation of messages.
     *  The <code>correlationId</code> contains the <code>messageId</code> of the
     *  previous message that this message refers to.
     *
     *  @see mx.messaging.messages.AbstractMessage#messageId
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get correlationId():String;

    /**
     * @private
     */
    public native function set correlationId(value:String):void;

    //--------------------------------------------------------------------------
    //
    // Overridden Methods
    // 
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    public native function getSmallMessage():IMessage;

    /**
     * @private
     */
    override public native function readExternal(input:IDataInput):void;

    /**
     * @private
     */
    override public native function writeExternal(output:IDataOutput):void;

    /**
     *  @private
     */ 
    override protected native function addDebugAttributes(attributes:Object):void;


}

}