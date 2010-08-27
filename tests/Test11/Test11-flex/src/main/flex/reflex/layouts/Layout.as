package reflex.layouts
{
	import flash.display.DisplayObject;
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.Dictionary;
	
	import flight.binding.Bind;
	import flight.events.PropertyEvent;
	
	import reflex.events.InvalidationEvent;
	import reflex.metadata.resolveBindings;
	import reflex.metadata.resolveEventListeners;
	import reflex.metadata.resolveLayoutProperties;
	import reflex.metadata.resolvePropertyListeners;
	
	//[LayoutProperty(name="layout", measure="true")]
	//[LayoutProperty(name="measurements", measure="true")]
	/**
	 * The Layout class provides automated metadata handling for layouts which extend it.
	 * It is recommended that you extend this class to create custom layouts, but it's not required.
	 * 
	 * @alpha
	 **/
	public class Layout extends EventDispatcher
	{
		
		private var attached:Dictionary = new Dictionary(true);
		private var _target:IEventDispatcher;
		
		[Bindable(event="targetChange")]
		public function get target():IEventDispatcher { return _target; }
		public function set target(value:IEventDispatcher):void
		{
			if(_target == value) {
				return;
			}
			PropertyEvent.dispatchChange(this, "target", _target, _target = value);
		}
		
		public function Layout() {
			reflex.metadata.resolveBindings(this);
			reflex.metadata.resolveEventListeners(this);
			reflex.metadata.resolvePropertyListeners(this);
			Bind.addListener(this, onInvalidateLayout, this, "target.width");
			Bind.addListener(this, onInvalidateLayout, this, "target.height");
		}
		
		public function measure(children:Array):Point {
			// this method of listening for layout invalidating changes is very much experimental
			for each(var child:IEventDispatcher in children) {
				if(attached[child] != true) {
					reflex.metadata.resolveLayoutProperties(this, child, onInvalidateLayout);
					attached[child] = true;
				}
			}
			return new Point(0, 0);
		}
		
		public function update(children:Array, rectangle:Rectangle):void {
			// this method of listening for layout invalidating changes is very much experimental
			for each(var child:IEventDispatcher in children) {
				if(attached[child] != true) {
					reflex.metadata.resolveLayoutProperties(this, child, onInvalidateLayout);
					attached[child] = true;
				}
			}
		}
		
		private function onInvalidateLayout(object:*):void {
			if(target is DisplayObject) {
				//InvalidationEvent.invalidate(target as DisplayObject, "measure");
				InvalidationEvent.invalidate(target as DisplayObject, "layout");
			}
		}
		
	}
}