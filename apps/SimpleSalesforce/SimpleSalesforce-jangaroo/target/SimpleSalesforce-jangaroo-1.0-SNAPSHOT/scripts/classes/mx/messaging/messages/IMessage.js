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
{*/

/**
 *  This interface defines the contract for message objects.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion BlazeDS 4
 *  @productversion LCDS 3 
 */
"public interface IMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 
/*
    //--------------------------------------------------------------------------
    //
    // Properties
    // 
    //--------------------------------------------------------------------------

    //----------------------------------
	//  body
	//----------------------------------

    /**
     *  The body of a message contains the specific data that needs to be 
     *  delivered to the remote destination.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function body():Object;*/,/*
    
    /**
     *  @private
     * /
    function body(value:Object):void;*/,/*
    
    //----------------------------------
	//  clientId
	//----------------------------------
    
    /**
     *  The clientId indicates which client sent the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function clientId():String;*/,/*
    
    /**
	 *  @private
	 * /
    function clientId(value:String):void;*/,/*
    
    //----------------------------------
	//  destination
	//----------------------------------
    
    /**
     *  The message destination.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * / 
    function destination():String;*/,/*
    
    /**
     *  @private
     * / 
    function destination(value:String):void;*/,/*

    //----------------------------------
	//  headers
	//----------------------------------

    /**
     *  Provides access to the headers of the message.
     *  The headers of a message are an associative array where the key is the
     *  header name.
     *  This property provides access to specialized meta information for the 
     *  specific message instance.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function headers():Object;*/,/*
    
    /**
     *  @private
     * /
    function headers(value:Object):void;*/,/*
    
    //----------------------------------
	//  messageId
	//----------------------------------
    
    /**
     *  The unique id for the message.
     *  The message id can be used to correlate a response to the original
     *  request message in request-response messaging scenarios.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function messageId():String;*/,/*
    
    /**
     *  @private
     * /
    function messageId(value:String):void;*/,/*

    //----------------------------------
	//  timestamp
	//----------------------------------

    /**
     *  Provides access to the time stamp for the message.
     *  A time stamp is the date and time that the message was sent.
     *  The time stamp is used for tracking the message through the system,
     *  ensuring quality of service levels and providing a mechanism for
     *  expiration.
     *
     *  @see #timeToLive
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function timestamp():Number;*/,/*
    
    /**
     *  @private
     * /
    function timestamp(value:Number):void;*/,/*

    //----------------------------------
	//  timeToLive
	//----------------------------------
    
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
     * /
    function timeToLive():Number;*/,/*
    
    /**
     *  @private
     * / 
    function timeToLive(value:Number):void;*/,/*
    
    //--------------------------------------------------------------------------
    //
    // Methods
    // 
    //--------------------------------------------------------------------------
    
    /**
     *  This method will return a string representation of the message.
     *
     *  @return String representation of the message.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion BlazeDS 4
     *  @productversion LCDS 3 
     * /
    function toString():String;*/,
    
];},[],[]

);