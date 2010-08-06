package flash.events {

import flash.events.Event;

public class TimerEvent extends flash.events.Event {

  public static const TIMER : String = "timer";
  public static const TIMER_COMPLETE:String = "timerComplete";

  public native function TimerEvent(type : String, bubbles : Boolean = false, cancelable : Boolean = false);

  override public native function clone() : Event;

  override public native function toString() : String;

  public native function updateAfterEvent() : void;
}
}