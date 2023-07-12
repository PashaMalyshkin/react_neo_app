import { client } from './fetchClient.ts';
import {NeoResponse} from "../types/NeoResponse.ts";

const api_key = import.meta.env.VITE_API_KEY;

export const getNeo = (date: string) => {
  return client.get<NeoResponse>(`/neo/rest/v1/feed?start_date=${date}&api_key=${api_key}`);
};
