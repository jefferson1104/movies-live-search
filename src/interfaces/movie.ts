interface IMovieGenreId {
  [key: number]: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: IMovieGenreId[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieApiResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieGenre {
  id: number;
  name: string;
}
