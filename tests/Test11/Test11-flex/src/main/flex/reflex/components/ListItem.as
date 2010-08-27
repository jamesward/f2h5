package reflex.components
{
	import flight.events.PropertyEvent;
	
	import mx.core.IDataRenderer;
	
	import reflex.behaviors.ButtonBehavior;
	
	/**
	 * @alpha
	 */
	public class ListItem extends Button implements IDataRenderer
	{
		
		private var _data:Object;
		
		[Bindable(event="dataChange")]
		public function get data():Object { return _data; }
		public function set data(value:Object):void
		{
			if(_data == value) {
				return;
			}
			PropertyEvent.dispatchChange(this, "data", _data, _data = value);
		}
		
		public function ListItem()
		{
			super();
		}
		
	}
}