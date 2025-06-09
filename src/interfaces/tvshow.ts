import type { EMediaType } from "../enums/media-type";

import type { IGenreId } from "./commons";

export interface ITvshow {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: EMediaType;
  adult: boolean;
  original_language: string;
  genre_ids: IGenreId[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
