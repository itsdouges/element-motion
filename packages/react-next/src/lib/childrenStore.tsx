import { GetElementSizeLocationReturnValue } from '../lib/dom';
import { Data, ChildrenAsFunction } from '../components/Collector';

interface ChildrenData extends GetElementSizeLocationReturnValue {
  element: HTMLElement;
  render: ChildrenAsFunction;
  data: Data[];
}

const children = new Map<string, ChildrenData>();

export const set = (key: string, value: ChildrenData) => children.set(key, value);

export const get = (key: string) => children.get(key);

export const has = (key: string) => children.has(key);

export const remove = (key: string) => children.delete(key);
