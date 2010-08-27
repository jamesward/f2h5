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

"package mx.rpc",/* 
{

import flash.events.Event
import flash.events.EventDispatcher

import mx.events.PropertyChangeEvent
import mx.messaging.messages.IMessage
import mx.rpc.events.FaultEvent
import mx.rpc.events.ResultEvent



/**
 *  Dispatched when a property of the channel set changes.
 * 
 *  @eventType mx.events.PropertyChangeEvent.PROPERTY_CHANGE
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * /
[Event(name="propertyChange", type="mx.events.PropertyChangeEvent")]*/

/**
 *  This class provides a place to set additional or token-level data for 
 *  asynchronous RPC operations.  It also allows an IResponder to be attached
 *  for an individual call.
 *  The AsyncToken can be referenced in <code>ResultEvent</code> and 
 *  <code>FaultEvent</code> from the <code>token</code> property.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
"public dynamic class AsyncToken extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_message=$$l+'_message',$_responders=$$l+'_responders',$_result=$$l+'_result';return[

    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    /**
     * Constructs an instance of the token with the specified message.
     *
     * @param message The message with which the token is associated.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function AsyncToken",function $AsyncToken(message/*:IMessage=null*/)
    {if(arguments.length<1){message=null;}
        this[$super]();
        this[$_message] = message;
    },

    //--------------------------------------------------------------------------
    //
    // Public properties
    // 
    //--------------------------------------------------------------------------
    
    //----------------------------------
    // message
    //----------------------------------
    
    "private var",{ _message/*:IMessage*/: undefined},

    /**
     *  Provides access to the associated message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get message",function get$message()/*:IMessage*/
    {
        return this[$_message];
    },

    /**
     *  @private
     */
    "public function setMessage",function setMessage(message/*:IMessage*/)/*:void*/
    {
        this[$_message] = message;
    },
    
    //----------------------------------
    // responder
    //----------------------------------

    /**
     *  @private
     */
    "private var",{ _responders/*:Array*/: undefined},

    /**
     * An array of IResponder handlers that will be called when
     * the asynchronous request completes.
     * 
     * Eaxh responder assigned to the token will have its  <code>result</code>
     * or <code>fault</code> function called passing in the
     * matching event <i>before</i> the operation or service dispatches the 
     * event itself.
     * 
     * A developer can prevent the service from subsequently dispatching the 
     * event by calling <code>event.preventDefault()</code>.
     * 
     * Note that this will not prevent the service or operation's 
     * <code>result</code> property from being assigned.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get responders",function get$responders()/*:Array*/
    {
        return this[$_responders];
    },
    
    //----------------------------------
    // result
    //----------------------------------
    
    "private var",{ _result/*:Object*/: undefined},/*
    
    [Bindable(event="propertyChange")]*/
    /**
     * The result that was returned by the associated RPC call.
     * Once the result property on the token has been assigned
     * it will be strictly equal to the result property on the associated
     * ResultEvent.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get result",function get$result()/*:Object*/
    {
        return this[$_result];
    },

    //--------------------------------------------------------------------------
    //
    // Methods
    // 
    //--------------------------------------------------------------------------
    
    /**
     *  Adds a responder to an Array of responders. 
     *  The object assigned to the responder parameter must implement
     *  <code>mx.rpc.IResponder</code>.
     *
     *  @param responder A handler which will be called when the asynchronous request completes.
     * 
     *  @see mx.rpc.IResponder
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function addResponder",function addResponder(responder/*:IResponder*/)/*:void*/
    {
        if (this[$_responders] == null)
            this[$_responders] = [];

        this[$_responders].push(responder);
    },

    /**
     * Determines if this token has at least one <code>mx.rpc.IResponder</code> registered.
     * @return true if at least one responder has been added to this token. 
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function hasResponder",function hasResponder()/*:Boolean*/
    {
        return (this[$_responders] != null && this[$_responders].length > 0);
    },

    /**
     * @private
     */
    "public function applyFault",function applyFault(event/*:FaultEvent*/)/*:void*/
    {
        if (this[$_responders] != null)
        {
            for (var i/*:uint*/ = 0; i < this[$_responders].length; i++)
            {
                var responder/*:IResponder*/ = this[$_responders][i];
                if (responder != null)
                {
                    responder.fault(event);
                }
            }
        }
    },

    /**
     * @private
     */
    "public function applyResult",function applyResult(event/*:ResultEvent*/)/*:void*/
    {
        this.setResult(event.result);

        if (this[$_responders] != null)
        {
            for (var i/*:uint*/ = 0; i < this[$_responders].length; i++)
            {
                var responder/*:IResponder*/ = this[$_responders][i];
                if (responder != null)
                {
                    responder.result(event);
                }
            }
        }
    },

    /**
     * @private
     */
    "public function setResult",function setResult(newResult/*:Object*/)/*:void*/
    {
        if (this[$_result] !== newResult)
        {
            var event/*:PropertyChangeEvent*/ = mx.events.PropertyChangeEvent.createUpdateEvent(this, "result", this[$_result], newResult);
            this[$_result] = newResult;
            this.dispatchEvent(event);
        }
    },
];},[],["flash.events.EventDispatcher","mx.events.PropertyChangeEvent"]
);