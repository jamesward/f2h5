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
{*/

/**
 * The Fault class represents a fault in a remote procedure call (RPC) service
 * invocation.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
"public class Fault extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$toString=$$l+'toString';return[

    /**
     * Creates a new Fault object.
     *
     * @param faultCode A simple code describing the fault.
     * @param faultString Text description of the fault.
     * @param faultDetail Additional details describing the fault.
     * 
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function Fault",function $Fault(faultCode/*:String*/, faultString/*:String*/, faultDetail/*:String = null*/)
    {if(arguments.length<3){faultDetail = null;}
        this[$super]("faultCode:" + faultCode + " faultString:'" + faultString + "' faultDetail:'" + faultDetail + "'");
        
        this._faultCode = faultCode;
        this._faultString = faultString ? faultString : "";
        this._faultDetail = faultDetail;
    },


    //--------------------------------------------------------------------------
    //
    // Variables
    // 
    //--------------------------------------------------------------------------

    /**
     * The raw content of the fault (if available), such as an HTTP response
     * body.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public var",{ content/*:Object*/: undefined},

    /**
     * The cause of the fault. The value will be null if the cause is
     * unknown or whether this fault represents the root itself.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public var",{ rootCause/*:Object*/: undefined},

    //--------------------------------------------------------------------------
    //
    // Properties
    // 
    //--------------------------------------------------------------------------

    /**
     * A simple code describing the fault.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get faultCode",function get$faultCode()/*:String*/
    {
        return this._faultCode;
    },

    /**
     * Any extra details of the fault.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get faultDetail",function get$faultDetail()/*:String*/
    {
        return this._faultDetail;
    },

    /**
     * Text description of the fault.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "public function get faultString",function get$faultString()/*:String*/
    {
        return this._faultString;
    },

    //--------------------------------------------------------------------------
    //
    // Methods
    // 
    //--------------------------------------------------------------------------

    /**
     * Returns the string representation of a Fault object.
     *
     * @return Returns the string representation of a Fault object.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    "override public function toString",function toString()/*:String*/
    {
        var s/*:String*/ = "[RPC Fault";
        s += " faultString=\"" + this.faultString + "\"";
        s += " faultCode=\"" + this.faultCode + "\"";
        s += " faultDetail=\"" + this.faultDetail + "\"]";
        return s;
    },

    /**
     * @private
     */
    "protected var",{ _faultCode/*:String*/: undefined},
    
    /**
     * @private
     */
    "protected var",{ _faultString/*:String*/: undefined},
    
    /**
     * @private
     */
    "protected var",{ _faultDetail/*:String*/: undefined},
];},[],["Error"]

);