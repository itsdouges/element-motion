import { GetElementSizeLocationReturnValue } from '../lib/dom';
import { Data, ChildrenAsFunction } from '../components/Collector';

interface ChildrenData extends GetElementSizeLocationReturnValue {
  element: HTMLElement;
  render: ChildrenAsFunction;
  data: Data[];
}

const children = new Map<string, ChildrenData>();

/**
 * @hidden
 */
export const set = (key: string, value: ChildrenData) => children.set(key, value);

/**
 * @hidden
 */
export const get = (key: string) => children.get(key);

/**
 * @hidden
 */
export const has = (key: string) => children.has(key);

/**
 * @hidden
 */
export const remove = (key: string) => children.delete(key);
