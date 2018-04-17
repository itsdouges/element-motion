import { GetElementSizeLocationReturnValue } from '../lib/dom';

interface ChildrenData extends GetElementSizeLocationReturnValue {
  element: HTMLElement;
  reactNode: React.ReactNode;
}

const children = new Map<string, ChildrenData>();

export const set = (key: string, value: ChildrenData) => children.set(key, value);

export const get = (key: string) => children.get(key);

export const has = (key: string) => children.has(key);
