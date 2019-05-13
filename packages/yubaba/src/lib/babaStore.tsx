import { CollectorData, ElementData } from '../Collector';

export interface BabaData {
  elementData: ElementData;
  collectorData: CollectorData[];
}

interface BabaStore {
  [key: string]: BabaData;
}

const store: BabaStore = {};

export const set = (key: string, value: BabaData) => {
  store[key] = value;
};

export const get = (key: string): BabaData => {
  return store[key];
};

export const has = (key: string): boolean => !!get(key);

export const remove = (key: string) => {
  delete store[key];
};
