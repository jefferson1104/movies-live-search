import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import api from "../server/api";

import type { IGenre } from "../interfaces/commons";

export const useGetGenres = () => {
  // Methods
  const fetchData = async (): Promise<IGenre[]> => {
    const [movieGenresResponse, tvGenresResponse] = await Promise.all([
      api.get("/genre/movie/list?language=pt-BR"),
      api.get("/genre/tv/list?language=pt-BR"),
    ]);

    const movieGenres: IGenre[] = movieGenresResponse.data.genres;
    const tvGenres: IGenre[] = tvGenresResponse.data.genres;

    const allGenres = [...movieGenres, ...tvGenres];

    const uniqueGenres = Array.from(
      new Map(allGenres.map((genre) => [genre.id, genre])).values()
    );

    return uniqueGenres;
  };

  // Utils
  const { error, data, isFetching, isPending } = useQuery({
    queryKey: ["fetchGenres"],
    queryFn: fetchData,
  } as UseQueryOptions);

  // Returns
  return {
    genres: (data as IGenre[]) ?? [],
    genresError: error,
    genresIsFetching: isFetching,
    genresIsPending: isPending,
  };
};
