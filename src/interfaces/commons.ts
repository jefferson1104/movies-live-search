import type { IMovie } from "./movie";
import type { ITvshow } from "./tvshow";

export interface IApiResponse {
  page: number;
  results: IMovie[] | ITvshow[];
  total_pages: number;
  total_results: number;
}

export interface IGenreId {
  [key: number]: number;
}

export interface IGenre {
  id: number;
  name: string;
}
