joo.classLoader.prepare(////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

"package mx.messaging.messages",/*
{

import flash.utils.IDataOutput
import flash.utils.IExternalizable

[RemoteClass(alias="DSK")]*/

/**
 * @private
 */
"public class AcknowledgeMessageExt extends mx.messaging.messages.AcknowledgeMessage implements flash.utils.IExternalizable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$writeExternal=$$l+'writeExternal',$messageId=$$l+'messageId',$_message=$$l+'_message';return[

    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    "public function AcknowledgeMessageExt",function $AcknowledgeMessageExt(message/*:AcknowledgeMessage=null*/)
    {if(arguments.length<1){message=null;}
        this[$super]();
        this[$_message] = message;
    },

    "override public function writeExternal",function writeExternal(output/*:IDataOutput*/)/*:void*/
    {
        if (this[$_message] != null)
            this[$_message].writeExternal(output);
        else
            this[$writeExternal](output);
    },

    /**
     *  The unique id for the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    "override public function get messageId",function get$messageId()/*:String*/
    {
        /* If we are wrapping another message, use its messageId */
        if (this[$_message] != null)
            return this[$_message].messageId;

        return this[$messageId];
    },

    "private var",{ _message/*:AcknowledgeMessage*/: undefined},
];},[],["mx.messaging.messages.AcknowledgeMessage","flash.utils.IExternalizable"]

);