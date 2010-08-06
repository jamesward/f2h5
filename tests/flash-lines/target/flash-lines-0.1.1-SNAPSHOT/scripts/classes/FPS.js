joo.classLoader.prepare("package",
[
	"import flash.events.Event",
	"import flash.text.TextField",
	"import flash.text.TextFormat",
	"import flash.utils.getTimer",""],
	
	"public class FPS extends TextField",function(FPS,$$private){with(FPS)with($$private)return[function(){joo.classLoader.init(Event);},
	
		"private var",{ fs/*: int*/: undefined},
		"private var",{ ms/*: int*/: undefined},
		
		"public function FPS",function $FPS()
		{this[$super]();
			var format/*: TextFormat*/ = new TextFormat();
			
			format.color = 0x666666;
			format.size = 10;
			format.bold = true;
			format.font = 'Verdana';
			
			this.textColor = 0xcecece;
			this.autoSize = "left";
			this.defaultTextFormat = format;
			
			this[$ms] = getTimer();
			this[$fs] = 0;
			
			this.addEventListener( Event.ENTER_FRAME, this[$onEnterFrame] );
		},
		
		"private bound function onEnterFrame",function onEnterFrame( event/*: Event*/ )/*: void*/
		{
			if( getTimer() - 1000 > this[$ms] )
			{
				this[$ms] = getTimer();
				this.text = this[$fs].toString();
				this[$fs] = 0;
			}
			else
			{
				++this[$fs];
			}
		},
	];},[]
);