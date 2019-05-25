import { CollectorData, ElementData } from '../Collector';

export interface AnimatorData {
  elementData: ElementData;
  collectorData: CollectorData[];
}

interface AnimatorStore {
  [key: string]: AnimatorData;
}

const store: AnimatorStore = {};

export const set = (key: string, value: AnimatorData) => {
  store[key] = value;
};

export const get = (key: string): AnimatorData => {
  return store[key];
};

export const has = (key: string): boolean => !!get(key);

export const remove = (key: string) => {
  delete store[key];
};
