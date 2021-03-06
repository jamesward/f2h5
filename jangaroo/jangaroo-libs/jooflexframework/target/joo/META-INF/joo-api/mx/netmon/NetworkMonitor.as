////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2003-2006 Adobe Macromedia Software LLC and its licensors.
//  All Rights Reserved. The following is Source Code and is subject to all
//  restrictions on such code as contained in the End User License Agreement
//  accompanying this product. If you have received this file from a source
//  other than Adobe, then your use, modification, or distribution of this file
//  requires the prior written permission of Adobe.
//
////////////////////////////////////////////////////////////////////////////////

package mx.netmon
{
    
import flash.events.Event;
import flash.net.URLRequest;
    
/**
 *  NetworkMonitor is a stub used by the framework and enterprise service
 *  classes to send information to the Flash Builder Network Monitor feature.
 * 
 *  The NetworkMonitor declares a number of Impl functions which are to be
 *  filled in by a mix-in class provided by Flash Builder.
 *  If those functions are not assigned the stub will do nothing,
 *  will or return false or null as appropriate.
 *  We don't use a singleton or an instance object at the moment to simplify
 *  the code that calls the monitor.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
public class NetworkMonitor
{
    //--------------------------------------------------------------------------
    //
    //  Class mixins
    //
    //--------------------------------------------------------------------------
    
    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var isMonitoringImpl:Function;
    
    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var adjustURLRequestImpl:Function;
    
    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var adjustNetConnectionURLImpl:Function;
    
    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var monitorEventImpl:Function;

    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var monitorInvocationImpl:Function;

    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var monitorResultImpl:Function;

    /**
     *  To be assigned by mix-in.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var monitorFaultImpl:Function;

    //--------------------------------------------------------------------------
    //
    //  Class methods
    //
    //--------------------------------------------------------------------------

    /**
     *  Returns true if the monitor is linked and monitoring.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static native function isMonitoring():Boolean;
    
    /**
     *  Adjust the URLRequest so that it goes through the monitor. 
     *  The URLRequest sent to the monitor will have two headers:
     *  <ul>
     *    <li><code>actualHostPort</code>: The real <code>host:port</code> for the URL.</li>
     *    <li><code>correlationID</code>: The correlationID for the request in case it's from 
     *                    messaging (Image/Loader requests need to create their  own correlationIDs)</li>
     *  </ul>
     *
     *  @param urlRequest The URLRequest to adjust.
     *  (Relative URLs are supported.)
     *
     *  @param rootURL Computes an absolute URL from the relative URL.
     *  If necessary, pass the SWF file's URL as this value.
     *
     *  @param correlationID The correlationID that may be used
     *  for associated events.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */ 
    public static native function adjustURLRequest(urlRequest:URLRequest,
                                            rootURL:String,
                                            correlationID:String):void; 
    
    /**
     *  Adjust the URL for NetConnectionChannel and HTTPChannel Requests
     *  so that it goes through the monitor. 
     *  Returns the modified url.
     *
     *  @param url to adjust.
     * 
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */ 
     public static native function adjustNetConnectionURL(rootUrl:String, url:String):String; 
    
    /**
     *  Tell the monitor that an event occurred.
     *  This may be used by the Loader to monitor security and IO errors.
     *  It should not be used for the Loader's <code>complete</code> event.
     * 
     *  @param event The event that is about to occur (or occurred).
     *
     *  @param correlationID The correlationID to associate with other events
     *  or the request.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static native function monitorEvent(event:Event,
                                        correlationID:String):void;

    /**
     *  Tell the monitor that an invocation is occuring.
     *
     *  @param id The id of the tag causing the invocation
     *  if it can be determined.
     *
     *  @param invocationMessage The Message that will be sent across the wire.
     *  (It is untyped here to avoid linking in the dependency.)
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static native function monitorInvocation(id:String,
                                             invocationMessage:Object, messageAgent:Object):void;

    /**
     *  Tell the monitor that a result was returned.
     *
     *  @param resultMessage The Message that came back indicating the result.
     *  (It is untyped here to avoid linking in the dependency.)
     *
     *  @param actualResult the decoded result
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static native function monitorResult(resultMessage:Object,
                                         actualResult:Object):void;

    /**
     *  Tell the monitor that a fault occurred.
     *
     *  @param faultMessage The Message that came back indicating the result.
     *  It be null if this was due to an invocation failure.
     *  (It is untyped here to avoid linking in the dependency.)
     *
     *  @param actualFault The Fault that occurred.
     *  (It is untyped here to avoid linking in the dependency.)
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static native function monitorFault(faultMessage:Object,
                                        actualFault:Object):void;
}
    
}