////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2006-2007 Adobe Systems Incorporated
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
import flash.utils.getQualifiedClassName;

import mx.utils.RPCObjectUtil;
import mx.utils.RPCStringUtil;
import mx.utils.RPCUIDUtil;


/**
 *  Abstract base class for all messages.
 *  Messages have two customizable sections; headers and body.
 *  The <code>headers</code> property provides access to specialized meta
 *  information for a specific message instance.
 *  The <code>headers</code> property is an associative array with the specific
 *  header name as the key.
 *  <p>
 *  The body of a message contains the instance specific data that needs to be
 *  delivered and processed by the remote destination.
 *  The <code>body</code> is an object and is the payload for a message.
 *  </p>
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion BlazeDS 4
 *  @productversion LCDS 3 
 */
public class AbstractMessage implements mx.messaging.messages.IMessage
{
    //--------------------------------------------------------------------------
    //
    // Static Constants
    // 
    //--------------------------------------------------------------------------
    
    /**
     *  Messages pushed from the server may arrive in a batch, with messages in the
     *  batch potentially targeted to different Consumer instances. 
     *  Each message will contain this header identifying the Consumer instance that 
     *  will receive the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public static const DESTINATION_CLIENT_ID_HEADER:String = "DSDstClientId";

    /**
     *  Messages are tagged with the endpoint id for the Channel they are sent over.
     *  Channels set this value automatically when they send a message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
	public static const ENDPOINT_HEADER:String = "DSEndpoint";

	/**
	 *  This header is used to transport the global FlexClient Id value in outbound 
	 *  messages once it has been assigned by the server.
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion BlazeDS 4
	 *  @productversion LCDS 3 
	 */
	public static const FLEX_CLIENT_ID_HEADER:String = "DSId";

    /**
     *  Messages sent by a MessageAgent can have a priority header with a 0-9
     *  numerical value (0 being lowest) and the server can choose to use this
     *  numerical value to prioritize messages to clients. 
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public static const PRIORITY_HEADER:String = "DSPriority";

	/**
     *  Messages that need to set remote credentials for a destination
     *  carry the Base64 encoded credentials in this header.  
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion BlazeDS 4
	 *  @productversion LCDS 3 
	 */
	public static const REMOTE_CREDENTIALS_HEADER:String = "DSRemoteCredentials";

	/**
     *  Messages that need to set remote credentials for a destination
     *  may also need to report the character-set encoding that was used to
     *  create the credentials String using this header.  
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion BlazeDS 4
	 *  @productversion LCDS 3 
	 */
	public static const REMOTE_CREDENTIALS_CHARSET_HEADER:String = "DSRemoteCredentialsCharset";
		
	/**
	 *  Messages sent with a defined request timeout use this header. 
	 *  The request timeout value is set on outbound messages by services or 
	 *  channels and the value controls how long the corresponding MessageResponder 
	 *  will wait for an acknowledgement, result or fault response for the message
	 *  before timing out the request.
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion BlazeDS 4
	 *  @productversion LCDS 3 
	 */
	public static const REQUEST_TIMEOUT_HEADER:String = "DSRequestTimeout";	

    /**
     *  A status code can provide context about the nature of a response
     *  message. For example, messages received from an HTTP based channel may
     *  need to report the HTTP response status code (if available).
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public static const STATUS_CODE_HEADER:String = "DSStatusCode";


    //--------------------------------------------------------------------------
    //
    // Constructor
    // 
    //--------------------------------------------------------------------------

    /**
     *  Constructs an instance of an AbstractMessage with an empty body and header.
     *  This message type should not be instantiated or used directly.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function AbstractMessage();

    /**
     *  The body of a message contains the specific data that needs to be 
     *  delivered to the remote destination.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get body():Object;
    
    /**
     *  @private
     */
    public native function set body(value:Object):void;

    /**
     *  The clientId indicates which MessageAgent sent the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get clientId():String;

    /**
	 *  @private
	 */
    public native function set clientId(value:String):void;
    
    /**
     *  The message destination.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */ 
    public native function get destination():String;
    
    /**
     *  @private
     */ 
    public native function set destination(value:String):void;

    /**
     *  The headers of a message are an associative array where the key is the
     *  header name and the value is the header value.
     *  This property provides access to the specialized meta information for the 
     *  specific message instance.
     *  Core header names begin with a 'DS' prefix. Custom header names should start 
     *  with a unique prefix to avoid name collisions.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get headers():Object;

    /**
     *  @private
     */
    public native function set headers(value:Object):void;

    /**
     *  The unique id for the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get messageId():String;

    /**
     *  @private
     */
    public native function set messageId(value:String):void;
    
    /**
     *  Provides access to the time stamp for the message.
     *  A time stamp is the date and time that the message was sent.
     *  The time stamp is used for tracking the message through the system,
     *  ensuring quality of service levels and providing a mechanism for
     *  message expiration.
     *
     *  @see #timeToLive
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get timestamp():Number;
    
    /**
     *  @private
     */
    public native function set timestamp(value:Number):void;
    
    /**
     *  The time to live value of a message indicates how long the message
     *  should be considered valid and deliverable.
     *  This value works in conjunction with the <code>timestamp</code> value.
     *  Time to live is the number of milliseconds that this message remains
     *  valid starting from the specified <code>timestamp</code> value.
     *  For example, if the <code>timestamp</code> value is 04/05/05 1:30:45 PST
     *  and the <code>timeToLive</code> value is 5000, then this message will
     *  expire at 04/05/05 1:30:50 PST.
     *  Once a message expires it will not be delivered to any other clients.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function get timeToLive():Number;
    
    /**
     *  @private
     */ 
    public native function set timeToLive(value:Number):void;     

    //--------------------------------------------------------------------------
    //
    // Methods
    // 
    //--------------------------------------------------------------------------

    /**
     * @private
     * 
     * While this class itself does not implement flash.utils.IExternalizable,
     * ISmallMessage implementations will typically use IExternalizable to
     * serialize themselves in a smaller form. This method supports this
     * functionality by implementing IExternalizable.readExternal(IDataInput) to
     * deserialize the properties for this abstract base class.
     */
    public native function readExternal(input:IDataInput):void;

    /**
     *  Returns a string representation of the message.
     *
     *  @return String representation of the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    public native function toString():String;

    /**
     * @private
     * 
     * While this class itself does not implement flash.utils.IExternalizable,
     * ISmallMessage implementations will typically use IExternalizable to
     * serialize themselves in a smaller form. This method supports this
     * functionality by implementing IExternalizable.writeExternal(IDataOutput)
     * to efficiently serialize the properties for this abstract base class.
     */
    public native function writeExternal(output:IDataOutput):void;

    //--------------------------------------------------------------------------
    //
    // Protected Methods
    // 
    //--------------------------------------------------------------------------    

    /**
     *  @private
     */ 
    protected native function addDebugAttributes(attributes:Object):void;
    
    /**
     *  @private
     */ 
    final protected native function getDebugString():String;

    /**
     * @private
     * To support efficient serialization for ISmallMessage implementations,
     * this utility method reads in the property flags from an IDataInput
     * stream. Flags are read in one byte at a time. Flags make use of
     * sign-extension so that if the high-bit is set to 1 this indicates that
     * another set of flags follows.
     * 
     * @return The Array of property flags. Each flags byte is stored as a uint
     * in the Array.
     */
    protected native function readFlags(input:IDataInput):Array;
}

}