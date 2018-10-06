import { ElementData, CollectorData } from '../Collector';

export interface BabaStore {
  elementData: ElementData;
  collectorData: CollectorData[];
}

/**
 * @hidden
 */
const store = new Map<string, BabaStore>();

/**
 * @hidden
 */
export const set = (key: string, value: BabaStore) => store.set(key, value);

/**
 * @hidden
 */
export const get = (key: string) => store.get(key);

/**
 * @hidden
 */
export const has = (key: string) => store.has(key);

/**
 * @hidden
 */
export const remove = (key: string) => store.delete(key);
