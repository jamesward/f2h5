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

package mx.rpc 
{

import flash.events.Event;
import flash.events.EventDispatcher;

import mx.events.PropertyChangeEvent;
import mx.messaging.messages.IMessage;
import mx.rpc.events.FaultEvent;
import mx.rpc.events.ResultEvent;



/**
 *  Dispatched when a property of the channel set changes.
 * 
 *  @eventType mx.events.PropertyChangeEvent.PROPERTY_CHANGE
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
[Event(name="propertyChange", type="mx.events.PropertyChangeEvent")]

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
public dynamic class AsyncToken extends EventDispatcher
{
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
    public function AsyncToken(message:IMessage=null)
    {
        super();
        _message = message;
    }

    //--------------------------------------------------------------------------
    //
    // Public properties
    // 
    //--------------------------------------------------------------------------
    
    //----------------------------------
    // message
    //----------------------------------
    
    private var _message:IMessage;

    /**
     *  Provides access to the associated message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function get message():IMessage
    {
        return _message;
    }

    /**
     *  @private
     */
    public function setMessage(message:IMessage):void
    {
        _message = message;
    }
    
    //----------------------------------
    // responder
    //----------------------------------

    /**
     *  @private
     */
    private var _responders:Array;

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
    public function get responders():Array
    {
        return _responders;
    }
    
    //----------------------------------
    // result
    //----------------------------------
    
    private var _result:Object;
    
    [Bindable(event="propertyChange")]
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
    public function get result():Object
    {
        return _result;
    }

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
    public function addResponder(responder:IResponder):void
    {
        if (_responders == null)
            _responders = [];

        _responders.push(responder);
    }

    /**
     * Determines if this token has at least one <code>mx.rpc.IResponder</code> registered.
     * @return true if at least one responder has been added to this token. 
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function hasResponder():Boolean
    {
        return (_responders != null && _responders.length > 0);
    }

    /**
     * @private
     */
    public function applyFault(event:FaultEvent):void
    {
        if (_responders != null)
        {
            for (var i:uint = 0; i < _responders.length; i++)
            {
                var responder:IResponder = _responders[i];
                if (responder != null)
                {
                    responder.fault(event);
                }
            }
        }
    }

    /**
     * @private
     */
    public function applyResult(event:ResultEvent):void
    {
        setResult(event.result);

        if (_responders != null)
        {
            for (var i:uint = 0; i < _responders.length; i++)
            {
                var responder:IResponder = _responders[i];
                if (responder != null)
                {
                    responder.result(event);
                }
            }
        }
    }

    /**
     * @private
     */
    public function setResult(newResult:Object):void
    {
        if (_result !== newResult)
        {
            var event:PropertyChangeEvent = PropertyChangeEvent.createUpdateEvent(this, "result", _result, newResult);
            _result = newResult;
            dispatchEvent(event);
        }
    }
}
}