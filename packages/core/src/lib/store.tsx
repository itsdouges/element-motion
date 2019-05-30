import { CollectorData, ElementData } from '../Collector';

export interface MotionData {
  elementData: ElementData;
  collectorData: CollectorData[];
}

interface MotionStore {
  [key: string]: MotionData;
}

const store: MotionStore = {};

export const set = (key: string, value: MotionData) => {
  store[key] = value;
};

export const get = (key: string): MotionData => {
  return store[key];
};

export const has = (key: string): boolean => !!get(key);

export const remove = (key: string) => {
  delete store[key];
};
