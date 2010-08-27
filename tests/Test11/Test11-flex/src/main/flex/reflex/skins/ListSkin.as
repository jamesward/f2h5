package reflex.skins
{
	import flight.binding.Bind;
	import flight.list.ArrayList;
	
	import reflex.display.Container;
	
	import reflex.events.InvalidationEvent;

	public class ListSkin extends Skin
	{
		
		[Bindable]
		public var container:Container;
		
		public function ListSkin()
		{
			super();
			container = new Container();
			Bind.addBinding(this, "container.children", this, "target.dataProvider");
			Bind.addBinding(this, "container.template", this, "target.template");
			Bind.addBinding(this, "container.layout", this, "target.layout");
			// need a better solution for this
			Bind.addBinding(this, "container.width", this, "target.width");
			Bind.addBinding(this, "container.height", this, "target.height");
			children = new ArrayList([container]);
			//children.addItem(container);
			
		}
		
	}
}