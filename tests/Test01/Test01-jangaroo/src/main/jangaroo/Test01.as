package
{
	import flash.display.Sprite;
        import flash.display.StageScaleMode;
	
	[SWF( backgroundColor='0x212121', frameRate='30', width='384', height='384')]

	public class Test01 extends Sprite
	{
		private var app: ParticleApplication;
		
		public function Test01()
		{
			stage.frameRate = 44.444;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			app = new ParticleApplication();
			addChild( app );
		}
	}
}
