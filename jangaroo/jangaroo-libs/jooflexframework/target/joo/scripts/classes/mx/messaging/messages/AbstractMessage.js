joo.classLoader.prepare(////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2006-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

"package mx.messaging.messages",/*
{

import flash.utils.ByteArray
import flash.utils.IDataInput
import flash.utils.IDataOutput
import flash.utils.getQualifiedClassName

import mx.utils.RPCObjectUtil
import mx.utils.RPCStringUtil
import mx.utils.RPCUIDUtil*/


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
"public class AbstractMessage implements mx.messaging.messages.IMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_body=$$l+'_body',$_clientId=$$l+'_clientId',$clientIdBytes=$$l+'clientIdBytes',$_destination=$$l+'_destination',$_headers=$$l+'_headers',$_messageId=$$l+'_messageId',$messageIdBytes=$$l+'messageIdBytes',$_timestamp=$$l+'_timestamp',$_timeToLive=$$l+'_timeToLive';return[

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
    "public static const",{ DESTINATION_CLIENT_ID_HEADER/*:String*/ : "DSDstClientId"},

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
	"public static const",{ ENDPOINT_HEADER/*:String*/ : "DSEndpoint"},

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
	"public static const",{ FLEX_CLIENT_ID_HEADER/*:String*/ : "DSId"},

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
    "public static const",{ PRIORITY_HEADER/*:String*/ : "DSPriority"},

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
	"public static const",{ REMOTE_CREDENTIALS_HEADER/*:String*/ : "DSRemoteCredentials"},

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
	"public static const",{ REMOTE_CREDENTIALS_CHARSET_HEADER/*:String*/ : "DSRemoteCredentialsCharset"},
		
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
	"public static const",{ REQUEST_TIMEOUT_HEADER/*:String*/ : "DSRequestTimeout"},	

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
    "public static const",{ STATUS_CODE_HEADER/*:String*/ : "DSStatusCode"},


    //--------------------------------------------------------------------------
    //
    // Private Static Constants for Serialization
    // 
    //--------------------------------------------------------------------------

    "private static const",{ HAS_NEXT_FLAG/*:uint*/ : 128},
    "private static const",{ BODY_FLAG/*:uint*/ : 1},
    "private static const",{ CLIENT_ID_FLAG/*:uint*/ : 2},
    "private static const",{ DESTINATION_FLAG/*:uint*/ : 4},
    "private static const",{ HEADERS_FLAG/*:uint*/ : 8},
    "private static const",{ MESSAGE_ID_FLAG/*:uint*/ : 16},
    "private static const",{ TIMESTAMP_FLAG/*:uint*/ : 32},
    "private static const",{ TIME_TO_LIVE_FLAG/*:uint*/ : 64},
    "private static const",{ CLIENT_ID_BYTES_FLAG/*:uint*/ : 1},
    "private static const",{ MESSAGE_ID_BYTES_FLAG/*:uint*/ : 2},


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
    "public function AbstractMessage",function $AbstractMessage()
    {
        this[$super]();this[$_body]=this[$_body]();
    },

    //--------------------------------------------------------------------------
    //
    // Properties
    // 
    //--------------------------------------------------------------------------

    //----------------------------------
	//  body
	//----------------------------------

    /**
     *  @private
     */
    "private var",{ _body/*:Object*/ :function(){return( {});}},

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
    "public function get body",function get$body()/*:Object*/
    {
        return this[$_body];
    },
    
    /**
     *  @private
     */
    "public function set body",function set$body(value/*:Object*/)/*:void*/
    {
        this[$_body] = value;
    },   

    //----------------------------------
	//  clientId
	//----------------------------------

	/**
	 *  @private
	 */
	"private var",{ _clientId/*:String*/: undefined},

	/**
	 * @private
	 */
    "private var",{ clientIdBytes/*:ByteArray*/: undefined},

    /**
     *  The clientId indicates which MessageAgent sent the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    "public function get clientId",function get$clientId()/*:String*/
    {
        return this[$_clientId];   
    },

    /**
	 *  @private
	 */
    "public function set clientId",function set$clientId(value/*:String*/)/*:void*/
    {
        this[$_clientId] = value;
        this[$clientIdBytes] = null;
    },

    //----------------------------------
	//  destination
	//----------------------------------
    
    /**
     *  @private
     */
    "private var",{ _destination/*:String*/ : ""},
    
    /**
     *  The message destination.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */ 
    "public function get destination",function get$destination()/*:String*/
    {
        return this[$_destination];   
    },
    
    /**
     *  @private
     */ 
    "public function set destination",function set$destination(value/*:String*/)/*:void*/
    {
        this[$_destination] = value;   
    },
    
    //----------------------------------
	//  headers
	//----------------------------------

    /**
     *  @private
     */
    "private var",{ _headers/*:Object*/: undefined},

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
    "public function get headers",function get$headers()/*:Object*/
    {
        if (this[$_headers] == null)
             this[$_headers] = {};

        return this[$_headers];   
    },

    /**
     *  @private
     */
    "public function set headers",function set$headers(value/*:Object*/)/*:void*/
    {
        this[$_headers] = value;   
    },
    
    //----------------------------------
	//  messageId
	//----------------------------------

    /**
     *  @private
     */
    "private var",{ _messageId/*:String*/: undefined},

    /**
     * @private
     */
    "private var",{ messageIdBytes/*:ByteArray*/: undefined},

    /**
     *  The unique id for the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     */
    "public function get messageId",function get$messageId()/*:String*/
    {
        if (this[$_messageId] == null)
            this[$_messageId] = mx.utils.RPCUIDUtil.createUID();

        return this[$_messageId];
    },

    /**
     *  @private
     */
    "public function set messageId",function set$messageId(value/*:String*/)/*:void*/
    {
        this[$_messageId] = value;
        this[$messageIdBytes] = null;
    },

    //----------------------------------
	//  timestamp
	//----------------------------------

    /**
     *  @private
     */
    "private var",{ _timestamp/*:Number*/ : 0},
    
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
    "public function get timestamp",function get$timestamp()/*:Number*/
    {
        return this[$_timestamp];
    },
    
    /**
     *  @private
     */
    "public function set timestamp",function set$timestamp(value/*:Number*/)/*:void*/
    {
        this[$_timestamp] = value;
    }, 
    
    //----------------------------------
	//  timeToLive
	//----------------------------------
    
    /**
     *  @private
     */
    "private var",{ _timeToLive/*:Number*/ : 0},
    
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
    "public function get timeToLive",function get$timeToLive()/*:Number*/
    {
        return this[$_timeToLive];
    },
    
    /**
     *  @private
     */ 
    "public function set timeToLive",function set$timeToLive(value/*:Number*/)/*:void*/
    {
        this[$_timeToLive] = value;   
    },     

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
    "public function readExternal",function readExternal(input/*:IDataInput*/)/*:void*/
    {
        var flagsArray/*:Array*/ = this.readFlags(input);

        for (var i/*:uint*/ = 0; i < flagsArray.length; i++)
        {
            var flags/*:uint*/ = flagsArray[i]/*as uint*/;
            var reservedPosition/*:uint*/ = 0;

            if (i == 0)
            {
                if ((flags & $$private.BODY_FLAG) != 0)
                    this.body = input.readObject();
                else
                    this.body = null; // default body is {} so need to set it here
        
                if ((flags & $$private.CLIENT_ID_FLAG) != 0)
                    this.clientId = input.readObject();
        
                if ((flags & $$private.DESTINATION_FLAG) != 0)
                    this.destination = input.readObject()/*as String*/;
        
                if ((flags & $$private.HEADERS_FLAG) != 0)
                    this.headers = input.readObject();
        
                if ((flags & $$private.MESSAGE_ID_FLAG) != 0)
                    this.messageId = input.readObject()/*as String*/;
        
                if ((flags & $$private.TIMESTAMP_FLAG) != 0)
                    this.timestamp = input.readObject()/*as Number*/;
        
                if ((flags & $$private.TIME_TO_LIVE_FLAG) != 0)
                    this.timeToLive = input.readObject()/*as Number*/;

                reservedPosition = 7;
            }
            else if (i == 1)
            {
                if ((flags & $$private.CLIENT_ID_BYTES_FLAG) != 0)
                {
                    this[$clientIdBytes] = input.readObject()/*as ByteArray*/;
                    this.clientId = mx.utils.RPCUIDUtil.fromByteArray(this[$clientIdBytes]);
                }
        
                if ((flags & $$private.MESSAGE_ID_BYTES_FLAG) != 0)
                {
                    this[$messageIdBytes] = input.readObject()/*as ByteArray*/;
                    this.messageId = mx.utils.RPCUIDUtil.fromByteArray(this[$messageIdBytes]);
                }

                reservedPosition = 2;
            }

            // For forwards compatibility, read in any other flagged objects to
            // preserve the integrity of the input stream...
            if ((flags >> reservedPosition) != 0)
            {
                for (var j/*:uint*/ = reservedPosition; j < 6; j++)
                {
                    if (((flags >> j) & 1) != 0)
                    {
                        input.readObject();
                    }
                }
            }
        }
    },

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
    "public function toString",function toString()/*:String*/
    {
        return mx.utils.RPCObjectUtil.toString(this);
    },

    /**
     * @private
     * 
     * While this class itself does not implement flash.utils.IExternalizable,
     * ISmallMessage implementations will typically use IExternalizable to
     * serialize themselves in a smaller form. This method supports this
     * functionality by implementing IExternalizable.writeExternal(IDataOutput)
     * to efficiently serialize the properties for this abstract base class.
     */
    "public function writeExternal",function writeExternal(output/*:IDataOutput*/)/*:void*/
    {
        var flags/*:uint*/ = 0;

        // Since we're using custom serialization, we have to invoke the
        // messageId getter to ensure we have a valid id for the message.
        var checkForMessageId/*:String*/ = this.messageId;

        if (this[$clientIdBytes] == null)
            this[$clientIdBytes] = mx.utils.RPCUIDUtil.toByteArray(this[$_clientId]);

        if (this[$messageIdBytes] == null)
            this[$messageIdBytes] = mx.utils.RPCUIDUtil.toByteArray(this[$_messageId]);

        if (this.body != null)
            flags |= $$private.BODY_FLAG;

        if (this.clientId != null && this[$clientIdBytes] == null)
            flags |= $$private.CLIENT_ID_FLAG;

        if (this.destination != null)
            flags |= $$private.DESTINATION_FLAG;

        if (this.headers != null)
            flags |= $$private.HEADERS_FLAG;

        if (this.messageId != null && this[$messageIdBytes] == null)
            flags |= $$private.MESSAGE_ID_FLAG;

        if (this.timestamp != 0)
            flags |= $$private.TIMESTAMP_FLAG;

        if (this.timeToLive != 0)
            flags |= $$private.TIME_TO_LIVE_FLAG;

        if (this[$clientIdBytes] != null || this[$messageIdBytes] != null)
            flags |= $$private.HAS_NEXT_FLAG;

        output.writeByte(flags);

        flags = 0;

        if (this[$clientIdBytes] != null)
            flags |= $$private.CLIENT_ID_BYTES_FLAG;

        if (this[$messageIdBytes] != null)
            flags |= $$private.MESSAGE_ID_BYTES_FLAG;

        // This is only read if the previous flag has HAS_NEXT_FLAG set
        if (flags != 0)
            output.writeByte(flags);

        if (this.body != null)
            output.writeObject(this.body);

        if (this.clientId != null && this[$clientIdBytes] == null)
            output.writeObject(this.clientId);

        if (this.destination != null)
            output.writeObject(this.destination);

        if (this.headers != null)
            output.writeObject(this.headers);

        if (this.messageId != null && this[$messageIdBytes] == null)
            output.writeObject(this.messageId);

        if (this.timestamp != 0)
            output.writeObject(this.timestamp);

        if (this.timeToLive != 0)
            output.writeObject(this.timeToLive);

        if (this[$clientIdBytes] != null)
            output.writeObject(this[$clientIdBytes]);

        if (this[$messageIdBytes] != null)
            output.writeObject(this[$messageIdBytes]);
    },

    //--------------------------------------------------------------------------
    //
    // Protected Methods
    // 
    //--------------------------------------------------------------------------    

    /**
     *  @private
     */ 
    "protected function addDebugAttributes",function addDebugAttributes(attributes/*:Object*/)/*:void*/
    {
        attributes["body"] = this.body;
        attributes["clientId"] = this.clientId;
        attributes["destination"] = this.destination;
        attributes["headers"] = this.headers;
        attributes["messageId"] = this.messageId;
        attributes["timestamp"] = this.timestamp;
        attributes["timeToLive"] = this.timeToLive;
    },
    
    /**
     *  @private
     */ 
    "final protected function getDebugString",function getDebugString()/*:String*/
    {
        var result/*:String*/ = "(" + flash.utils.getQualifiedClassName(this) + ")";

        var attributes/*:Object*/ = {};
        this.addDebugAttributes(attributes);

        var propertyNames/*:Array*/ = [];
        for (var propertyName/*:String*/ in attributes)
        {
            propertyNames.push(propertyName);
        }
        propertyNames.sort();

        for (var i/*:uint*/ = 0; i < propertyNames.length; i++)
        {
            var name/*:String*/ = String(propertyNames[i]);
            var value/*:String*/ = mx.utils.RPCObjectUtil.toString(attributes[name]);
            result += mx.utils.RPCStringUtil.substitute("\n  {0}={1}", name, value);
        }

        return result;
    },

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
    "protected function readFlags",function readFlags(input/*:IDataInput*/)/*:Array*/
    {
        var hasNextFlag/*:Boolean*/ = true;
        var flagsArray/*:Array*/ = [];

        while (hasNextFlag && input.bytesAvailable > 0)
        {
            var flags/*:uint*/ = input.readUnsignedByte();
            flagsArray.push(flags);

            if ((flags & $$private.HAS_NEXT_FLAG) != 0)
                hasNextFlag = true;
            else
                hasNextFlag = false;
        }

        return flagsArray;
    },
];},[],["mx.messaging.messages.IMessage","mx.utils.RPCUIDUtil","mx.utils.RPCObjectUtil","String","mx.utils.RPCStringUtil"]

);