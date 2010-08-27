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

import flash.utils.IDataInput;
import flash.utils.IDataOutput;/*

[RemoteClass(alias="flex.messaging.messages.AcknowledgeMessage")]*/

/**
 *  An AcknowledgeMessage acknowledges the receipt of a message that 
 *  was sent previously.
 *  Every message sent within the messaging system must receive an
 *  acknowledgement.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion BlazeDS 4
 *  @productversion LCDS 3 
 */
public class AcknowledgeMessage extends mx.messaging.messages.AsyncMessage implements mx.messaging.messages.ISmallMessage
{
    //--------------------------------------------------------------------------
    //
    // Static Constants
    // 
    //--------------------------------------------------------------------------
    
    /**
     *  Header name for the error hint header.
     *  Used to indicate that the acknowledgement is for a message that
     *  generated an error.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public static const ERROR_HINT_HEADER:String = "DSErrorHint";
    
    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------
    
    /**
     *  Constructs an instance of an AcknowledgeMessage with an empty body and header.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function AcknowledgeMessage();
    
    //--------------------------------------------------------------------------
    //
    // Overridden Methods
    // 
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    override public native function getSmallMessage():IMessage;

    /**
     * @private
     */
    override public native function readExternal(input:IDataInput):void;

    /**
     * @private
     */
    override public native function writeExternal(output:IDataOutput):void;
    
}

}