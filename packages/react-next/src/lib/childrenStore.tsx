import { GetElementSizeLocationReturnValue } from '../lib/dom';
import { CollectorData, CollectorChildrenAsFunction } from '../components/Collector';

/**
 * @hidden
 */
export interface ChildrenData extends GetElementSizeLocationReturnValue {
  render: CollectorChildrenAsFunction;
  data: CollectorData[];
}

/**
 * @hidden
 */
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
