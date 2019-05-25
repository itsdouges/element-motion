import { CollectorChildrenProps, InlineStyles } from '../Collector';
import { InjectedProps } from '../VisibilityManager';

export type AnimationFunc = () => Promise<void>;

export interface MappedAnimation {
  animate: AnimationFunc;
  beforeAnimate: AnimationFunc;
  afterAnimate: AnimationFunc;
  cleanup: () => void;
}

export type AnimationBlock = MappedAnimation[];

export interface ChildProps {
  style?: InlineStyles;
  className?: string;
}

export interface AnimatorState {
  childProps: ChildProps;
  animationsMarkup: React.ReactPortal[];
}

export interface BaseAnimatorProps extends CollectorChildrenProps, InjectedProps {
  /**
   * Callback called when all animations have finished and been cleaned up. Fired from the triggering Animator
   * component.
   */
  onFinish: () => void;

  /**
   * Time this component will wait until it throws away the animation.
   * Defaults to 50ms, might want to bump it up if loading something that was code split.
   */
  timeToWaitForNextAnimator: number;

  /**
   * HTMLElement container used when creating elements for animations,
   * generally only supporting animations will need this.
   */
  container: HTMLElement | (() => HTMLElement);
}

export interface AnimatorProps extends BaseAnimatorProps {
  /**
   * Name of the animator, this should match the target animator.
   */
  name: string;

  /**
   * Use if your element is expected to persist through an animation.
   * When you transition to the next state set your "in" to false and vice versa.
   * This lets the Animator components know when to execute the animations.
   *
   * You can't use this with the "triggerSelfKey".
   */
  in?: boolean;

  /**
   * Will trigger animations over itself when this prop changes.
   *
   * You can't use the with the "in" prop.
   */
  triggerSelfKey?: string;
}
