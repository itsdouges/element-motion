export type Duration = number | 'dynamic';

export interface MotionProps {
  /**
   * CSS3 timing function to be used in the motion.
   */
  timingFunction?: string;

  /**
   * Duration in ms.
   *
   * Defaults to "dynamic" which will dynamically generate a duration in ms based
   * on expanding/collapsing, size of elements, and how far it moves across the screen.
   */
  duration?: Duration;
}
