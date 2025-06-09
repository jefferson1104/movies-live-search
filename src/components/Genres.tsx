import type { IGenre } from "../interfaces/commons";
import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

interface IGenreProps {
  item: IMovie | ITvshow;
  genres: IGenre[];
}

export function Genres({ item, genres }: IGenreProps) {
  // Methods
  const getGenreName = (genreId: number, genreList: IGenre[]) => {
    if (!genreList || genreList.length === 0) return "";

    const genre = genreList.find((g) => g.id === Number(genreId));

    return genre ? genre.name : "";
  };

  // Renders
  return (
    <div className="hidden md:flex gap-2  ">
      {item.genre_ids.map((genre) => {
        const genreName = getGenreName(Number(genre), genres);

        return (
          <div
            key={String(genre)}
            className="w-fit px-2 rounded-2xl bg-gray-200 border border-gray-300"
          >
            <p className="font-medium text-center text-xs text-gray-800">
              {genreName}
            </p>
          </div>
        );
      })}
    </div>
  );
}
