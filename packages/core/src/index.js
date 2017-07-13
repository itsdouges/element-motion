// @flow

export type { Animation } from './orchestrator';

export { default as orchestrator, addListener, removeFromStore } from './orchestrator';

export {
  circleExpand,
  circleShrink,
  fadeout,
  move,
  reveal,
} from './animations';
