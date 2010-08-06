joo.classLoader.prepare("package",
["import ParticleApplication",
	"import flash.display.Sprite",/*
	
	[SWF( backgroundColor='0x212121', frameRate='30', width='384', height='384')]*/""],

	"public class Main extends Sprite",function(Main,$$private){with(Main)with($$private)return[
	
		"private var",{ app/*: ParticleApplication*/: undefined},
		
		"public function Main",function $Main()
		{this[$super]();
			this.stage.frameRate = 44.444;
			
			this[$app] = new ParticleApplication();
			this.addChild( this[$app] );
		},
	];},[]
);