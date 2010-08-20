package com.salesforce.events
{
	import mx.rpc.events.FaultEvent;

	public class ApexFaultEvent extends FaultEvent
	{
		public var context:Object;
		
		public function ApexFaultEvent(faultEvent:FaultEvent, context:Object = null) {
				
			super(faultEvent.type, faultEvent.bubbles, faultEvent.cancelable, faultEvent.fault, faultEvent.token, faultEvent.message);
			this.context = context;
		}
	}
}