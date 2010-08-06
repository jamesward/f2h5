package flash.utils {

import flash.events.EventDispatcher;
import flash.events.TimerEvent;/*

[Event(name="timerComplete",type="flash.events.TimerEvent")]
[Event(name="timer",type="flash.events.TimerEvent")]*/
/**
 * The Timer class is the interface to timers, which let you run code on
   a specified time sequence. Use the <code>start()</code> method to
   start a timer. Add an event listener for the timer event to set up
   code to be run on the timer interval.
   <p>You can create Timer objects to run once or repeat at specified
   intervals to execute code on a schedule. Depending on the environment
   (available memory and other factors), events may be dispatched at
   slightly offset intervals. Memory-intensive scripts may also offset
   the events.
 */
public class Timer extends flash.events.EventDispatcher
{

  /**
   * Constructs a new Timer object with the specified <code>delay</code>
     and <code>repeatCount</code> states.
   * <p>The timer does not start automatically; you must call the
     <code>start()</code> method to start it.
   * @param delay The delay between timer events, in milliseconds.
   * @param repeatCount (default = 0) � Specifies the number of
     repetitions. If zero, the timer repeats infinitely. If nonzero, the
     timer runs the specified number of times and then stops.
   * @throws Error if the delay specified is negative or not a finite
     number
   */
  public native function Timer(delay : Number, repeatCount : int = 0);

  /**
   * Return the delay, in milliseconds, between timer events.
   * @return the delay, in milliseconds, between timer events.
   */
  public native function get delay():Number;

  /**
   * The delay, in milliseconds, between timer events. If
   * you set the delay interval while the timer is running, the timer
   * will restart at the same <code>repeatCount</code> iteration.
   */
  public native function set delay(val:Number):void;

  /**
   * The total number of times the timer is set to run.
   * @return the total number of times the timer is set to run.
   */
  public native function get repeatCount() : int;

  /**
   * The total number of times the timer is set to run. If
   * the repeat count is set to 0, the timer continues forever or until
   * the <code>stop()</code> method is invoked or the program stops. If
   * the repeat count is nonzero, the timer runs the specified number
   * of times. If <code>repeatCount</code> is set to a total that is
   * the same or less then <code>currentCount</code> the timer stops
   * and will not fire again.
   */
  public native function set repeatCount(val : int) : void;

  /**
   * The timer's current state; <code>true</code> if the
   * timer is running, otherwise <code>false</code>.
   */
  public native function get running() : Boolean;

  /**
   * The total number of times the timer has fired since it
   * started at zero. If the timer has been reset, only the fires since
   * the reset are counted.
   */
  public native function get currentCount() : int;

  /**
   * Starts the timer, if it is not already running.
   */
  public native function start() : void;

  /**
   * Stops the timer. When <code>start()</code> is called after
     <code>stop()</code>, the timer instance runs for the
     <code>remaining</code> number of repetitions, as set by the
     <code>repeatCount</code> property.
   */
  public native function stop() : void;

  /**
   * Stops the timer, if it is running, and sets the <code>currentCount</code> property back to 0, like the reset
   * button of a stopwatch. Then, when <code>start()</code> is called, the timer instance runs for the specified
   * number of repetitions, as set by the <code>repeatCount</code> value.
   * @see flash.utils.Timer
   */
  public native function reset() : void;
}
}