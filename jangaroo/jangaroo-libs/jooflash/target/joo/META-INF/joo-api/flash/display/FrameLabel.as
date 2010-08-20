package flash.display {

/**
 * The FrameLabel object contains properties that specify a frame number and the corresponding label name.
 * The Scene class includes a labels property, which is an array of FrameLabel objects for the scene.
 * @see Scene.labels
 * @see MovieClip.currentLabel
 * @see MovieClip.currentScene
 * @see MovieClip.scenes
 * @see MovieClip.gotoAndPlay()
 * @see MovieClip.gotoAndStop()
 */
public class FrameLabel {

  public native function FrameLabel();

  /**
   * The frame number containing the label.
   */
    public native function get frame():int;

  /**
   * The name of the label.
   */
  public native function get name():String;
}
}