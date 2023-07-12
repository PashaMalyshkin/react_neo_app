import { Neo } from './Neo.ts';
export interface NeoResponse {
  near_earth_objects: {
    [date: string]: Neo[];
  }
}
