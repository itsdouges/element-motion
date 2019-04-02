import { CollectorData, ElementData } from '../Collector';


export interface BabaData {
  elementData: ElementData;
  collectorData: CollectorData[];
}


const store = new Map<string, BabaData>();


export const set = (key: string, value: BabaData) => store.set(key, value);


export const get = (key: string) => store.get(key);


export const has = (key: string) => store.has(key);


export const remove = (key: string) => store.delete(key);
