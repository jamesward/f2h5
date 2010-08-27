joo.classLoader.prepare(










"package mx.messaging.messages",















"public class ErrorMessage extends mx.messaging.messages.AcknowledgeMessage",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getSmallMessage=$$l+'getSmallMessage';return[

















"public static const",{MESSAGE_DELIVERY_IN_DOUBT:"Client.Error.DeliveryInDoubt"},












"public static const",{RETRYABLE_HINT_HEADER:"DSRetryableErrorHint"},
















"public function ErrorMessage",function()
{
this[$super]();
},



















"public var",{faultCode: undefined},










"public var",{faultString: undefined},











"public var",{faultDetail: undefined},












"public var",{rootCause: undefined},











"public var",{extendedData: undefined},











"override public function getSmallMessage",function()
{
return null;
},
];},[],["mx.messaging.messages.AcknowledgeMessage"]

);