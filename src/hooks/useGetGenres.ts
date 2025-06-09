import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import api from "../server/api";

import type { IMovieGenre } from "../interfaces/movie";

export const useGetGenres = () => {
  // Methods
  const fetchData = async (): Promise<IMovieGenre[]> => {
    const { data } = await api.get("/genre/movie/list?language=pt-BR");
    return data.genres;
  };

  const getGenreName = (genreId: number, genreList: IMovieGenre[]) => {
    if (!genreList || genreList.length === 0) return "";

    const genre = genreList.find((g) => g.id === Number(genreId));

    return genre ? genre.name : "";
  };

  // Utils
  const { error, data, isFetching, isPending } = useQuery({
    queryKey: ["fetchGenres"],
    queryFn: fetchData,
  } as UseQueryOptions);

  // Returns
  return {
    genres: (data as IMovieGenre[]) ?? [],
    genresError: error,
    genresIsFetching: isFetching,
    genresIsPending: isPending,
    getGenreName,
  };
};
