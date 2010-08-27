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

import flash.events.Event

import mx.messaging.messages.IMessage
import mx.messaging.messages.AbstractMessage
import mx.rpc.AsyncToken*/

/**
 * The event that indicates an RPC operation has successfully returned a result.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
"public class ResultEvent extends mx.rpc.events.AbstractEvent",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString',$callTokenResponders=$$l+'callTokenResponders',$_result=$$l+'_result',$_headers=$$l+'_headers',$_statusCode=$$l+'_statusCode';return[function(){joo.classLoader.init(mx.messaging.messages.AbstractMessage);},

    //--------------------------------------------------------------------------
    //
    //  Class constants
    //
    //--------------------------------------------------------------------------

    /**
    * The RESULT event type.
    *
    * <p>The properties of the event object have the following values:</p>
    * <table class="innertable">
    *     <tr><th>Property</th><th>Value</th></tr>
    *     <tr><td><code>bubbles</code></td><td>false</td></tr>
    *     <tr><td><code>cancelable</code></td><td>true, preventDefault() 
    *       from the associated token's responder.result method will prevent
    *       the service or operation from dispatching this event</td></tr>
    *     <tr><td><code>currentTarget</code></td><td>The Object that defines the 
    *       event listener that handles the event. For example, if you use 
    *       <code>myButton.addEventListener()</code> to register an event listener, 
    *       myButton is the value of the <code>currentTarget</code>. </td></tr>
    *     <tr><td><code>message</code></td><td> The Message associated with this event.</td></tr>
    *     <tr><td><code>target</code></td><td>The Object that dispatched the event; 
    *       it is not always the Object listening for the event. 
    *       Use the <code>currentTarget</code> property to always access the 
    *       Object listening for the event.</td></tr>
    *     <tr><td><code>result</code></td><td>Result that the RPC call returns.</td></tr>
    *     <tr><td><code>token</code></td><td>The token that represents the indiviudal call
    *     to the method. Used in the asynchronous completion token pattern.</td></tr>
    *  </table>
    *     
    *  @eventType result      
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public static const",{ RESULT/*:String*/ : "result"},


    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    /**
     * Creates a new ResultEvent.
     * @param type The event type; indicates the action that triggered the event.
     * @param bubbles Specifies whether the event can bubble up the display list hierarchy.
     * @param cancelable Specifies whether the behavior associated with the event can be prevented.
     * @param result Object that holds the actual result of the call.
     * @param token Token that represents the call to the method. Used in the asynchronous completion token pattern.
     * @param message Source Message of the result.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function ResultEvent",function $ResultEvent(type/*:String*/, bubbles/*:Boolean = false*/, cancelable/*:Boolean = true*/,
                                result/*:Object = null*/, token/*:AsyncToken = null*/, message/*:IMessage = null*/)
    {if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = true;}result = null;}token = null;}message = null;}
        this[$super](type, bubbles, cancelable, token, message);

        if (message != null && message.headers != null)
            this[$_statusCode] = message.headers[mx.messaging.messages.AbstractMessage.STATUS_CODE_HEADER]/*as int*/;

        this[$_result] = result;
    },


    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    /**
     * In certain circumstances, headers may also be returned with a result to
     * provide further context.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get headers",function get$headers()/*:Object*/
    {
        return this[$_headers];
    },

    /**
     * @private
     */
    "public function set headers",function set$headers(value/*:Object*/)/*:void*/
    {
        this[$_headers] = value;
    },

    /**
     * Result that the RPC call returns.
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

    /**
     * If the source message was sent via HTTP, this property provides access
     * to the HTTP response status code (if available), otherwise the value is
     * 0.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */ 
    "public function get statusCode",function get$statusCode()/*:int*/
    {
        return this[$_statusCode];
    },

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    "public static function createEvent",function createEvent(result/*:Object = null*/, token/*:AsyncToken = null*/, message/*:IMessage = null*/)/*:ResultEvent*/
    {if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){result = null;}token = null;}message = null;}
        return new mx.rpc.events.ResultEvent(mx.rpc.events.ResultEvent.RESULT, false, true, result, token, message);
    },

    /**
     * Because this event can be re-dispatched we have to implement clone to
     * return the appropriate type, otherwise we will get just the standard
     * event type.
     * @private
     */
    "override public function clone",function clone()/*:Event*/
    {
        return new mx.rpc.events.ResultEvent(this.type, this.bubbles, this.cancelable, this.result, this.token, this.message);
    },
   /**
     * Returns a string representation of the ResultEvent.
     *
     * @return String representation of the ResultEvent.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "override public function toString",function toString()/*:String*/
    {
        return this.formatToString("ResultEvent", "messageId", "type", "bubbles", "cancelable", "eventPhase");
    },

    /*
     * Have the token apply the result.
     */
    "override public function callTokenResponders",function callTokenResponders()/*:void*/
    {
        if (this.token != null)
            this.token.applyResult(this);
    },

    "public function setResult",function setResult(r/*:Object*/)/*:void*/
    {
        this[$_result] = r;
    },


    //--------------------------------------------------------------------------
    //
    //  Private Variables
    //
    //--------------------------------------------------------------------------

    "private var",{ _result/*:Object*/: undefined},
    "private var",{ _headers/*:Object*/: undefined},
    "private var",{ _statusCode/*:int*/: undefined},
];},["createEvent"],["mx.rpc.events.AbstractEvent","mx.messaging.messages.AbstractMessage"]

);