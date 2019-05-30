import { CollectorChildrenProps, InlineStyles } from '../Collector';
import { InjectedProps } from '../VisibilityManager';

export type MotionFunc = () => Promise<void>;

export interface MappedMotion {
  animate: MotionFunc;
  beforeAnimate: MotionFunc;
  afterAnimate: MotionFunc;
  cleanup: () => void;
}

export type MotionBlock = MappedMotion[];

export interface ChildProps {
  style?: InlineStyles;
  className?: string;
}

export interface MotionState {
  childProps: ChildProps;
  motionsMarkup: React.ReactPortal[];
}

export interface BaseMotionProps extends CollectorChildrenProps, InjectedProps {
  /**
   * Callback called when all motions have finished and been cleaned up. Fired from the triggering Motion
   * component.
   */
  onFinish: () => void;

  /**
   * Time this component will wait until it throws away the motion.
   * Defaults to 50ms, might want to bump it up if loading something that was code split.
   */
  timeToWaitForNext: number;

  /**
   * HTMLElement container used when creating elements for motions,
   * generally only supporting motions will need this.
   */
  container: HTMLElement | (() => HTMLElement);
}

export interface MotionProps extends BaseMotionProps {
  /**
   * Name of the motion, this should match the target motion.
   */
  name: string;

  /**
   * Use if your element is expected to persist through a motion.
   * When you transition to the next state set your "in" to false and vice versa.
   * This lets the Motion components know when to execute the motions.
   *
   * You can't use this with the "triggerSelfKey".
   */
  in?: boolean;

  /**
   * Will trigger motions over itself when this prop changes.
   *
   * You can't use the with the "in" prop.
   */
  triggerSelfKey?: string;
}
