joo.classLoader.prepare(










"package mx.netmon",





















"public class NetworkMonitor",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[















"public static var",{isMonitoringImpl: undefined},









"public static var",{adjustURLRequestImpl: undefined},









"public static var",{adjustNetConnectionURLImpl: undefined},









"public static var",{monitorEventImpl: undefined},









"public static var",{monitorInvocationImpl: undefined},









"public static var",{monitorResultImpl: undefined},









"public static var",{monitorFaultImpl: undefined},















"public static function isMonitoring",function()
{
return mx.netmon.NetworkMonitor.isMonitoringImpl!=null?mx.netmon.NetworkMonitor.isMonitoringImpl():false;
},
























"public static function adjustURLRequest",function(urlRequest,
rootURL,
correlationID)
{
if(mx.netmon.NetworkMonitor.adjustURLRequestImpl!=null)
mx.netmon.NetworkMonitor.adjustURLRequestImpl(urlRequest,rootURL,correlationID);
},













"public static function adjustNetConnectionURL",function(rootUrl,url)
{
if(mx.netmon.NetworkMonitor.adjustNetConnectionURLImpl!=null)
return mx.netmon.NetworkMonitor.adjustNetConnectionURLImpl(rootUrl,url);
return null;
},
















"public static function monitorEvent",function(event,
correlationID)
{
if(mx.netmon.NetworkMonitor.monitorEventImpl!=null)
mx.netmon.NetworkMonitor.monitorEventImpl(event,correlationID);
},















"public static function monitorInvocation",function(id,
invocationMessage,messageAgent)
{
if(mx.netmon.NetworkMonitor.monitorInvocationImpl!=null)
mx.netmon.NetworkMonitor.monitorInvocationImpl(id,invocationMessage,messageAgent);
},














"public static function monitorResult",function(resultMessage,
actualResult)
{
if(mx.netmon.NetworkMonitor.monitorResultImpl!=null)
mx.netmon.NetworkMonitor.monitorResultImpl(resultMessage,actualResult);
},
















"public static function monitorFault",function(faultMessage,
actualFault)
{
if(mx.netmon.NetworkMonitor.monitorFaultImpl!=null)
mx.netmon.NetworkMonitor.monitorFaultImpl(faultMessage,actualFault);
},
];},["isMonitoring","adjustURLRequest","adjustNetConnectionURL","monitorEvent","monitorInvocation","monitorResult","monitorFault"],[]

);