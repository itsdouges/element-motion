import { CollectorData, ElementData } from '../Collector';

/**
 * @hidden
 */
export interface BabaData {
  elementData: ElementData;
  collectorData: CollectorData[];
}

/**
 * @hidden
 */
const store = new Map<string, BabaData>();

/**
 * @hidden
 */
export const set = (key: string, value: BabaData) => store.set(key, value);

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
