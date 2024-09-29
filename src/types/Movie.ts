export interface MovieType {
  id: string;
  name: string;
  posterUrl?: string;
}

export interface APIResponseMovieType {
  name: string;
  "poster-image": string;
}
