export interface Movie {
  id: string;
  name: string;
  posterUrl?: string;
}
export interface APIResponseMovie {
  name: string;
  "poster-image": string;
}