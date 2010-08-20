joo.classLoader.prepare("package",/*
{
	import flash.display.Sprite
        import flash.display.StageScaleMode
	
	[SWF( backgroundColor='0x212121', frameRate='30', width='384', height='384')]*/

	"public class Test01 extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$app=$$l+'app';return[function(){joo.classLoader.init(flash.display.StageScaleMode,ParticleApplication);},
	
		"private var",{ app/*: ParticleApplication*/: undefined},
		
		"public function Test01",function $Test01()
		{this[$super]();
			this.stage.frameRate = 44.444;
			this.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
			
			this[$app] = new ParticleApplication();
			this.addChild( this[$app] );
		},
	];},[],["flash.display.Sprite","flash.display.StageScaleMode","ParticleApplication"]
);