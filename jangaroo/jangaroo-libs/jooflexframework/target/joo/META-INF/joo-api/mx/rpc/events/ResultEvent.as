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

import flash.events.Event;

import mx.messaging.messages.IMessage;
import mx.messaging.messages.AbstractMessage;
import mx.rpc.AsyncToken;

/**
 * The event that indicates an RPC operation has successfully returned a result.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
public class ResultEvent extends mx.rpc.events.AbstractEvent
{
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
    public static const RESULT:String = "result";


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
    public native function ResultEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = true,
                                result:Object = null, token:AsyncToken = null, message:IMessage = null);


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
    public native function get headers():Object;

    /**
     * @private
     */
    public native function set headers(value:Object):void;

    /**
     * Result that the RPC call returns.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public native function get result():Object;

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
    public native function get statusCode():int;

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    public static native function createEvent(result:Object = null, token:AsyncToken = null, message:IMessage = null):ResultEvent;

    /**
     * Because this event can be re-dispatched we have to implement clone to
     * return the appropriate type, otherwise we will get just the standard
     * event type.
     * @private
     */
    override public native function clone():Event;
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
    override public native function toString():String;

    /*
     * Have the token apply the result.
     */
    override public native function callTokenResponders():void;

    public native function setResult(r:Object):void;
}

}