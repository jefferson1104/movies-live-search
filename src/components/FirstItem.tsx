import type { Ref } from "react";

import { EMediaType } from "../enums/media-type";

import type { ITvshow } from "../interfaces/tvshow";
import type { IMovie } from "../interfaces/movie";
import type { IGenre } from "../interfaces/commons";

import { handleOpenItem } from "../utils/open-item";

interface IFirstItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie | ITvshow;
  genres: IGenre[];
  isActive?: boolean;
}

export function FirstItem({ ref, item, genres, isActive }: IFirstItemProps) {
  // Constants
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const itemDate =
    item.media_type === EMediaType.TV
      ? (item as ITvshow).first_air_date
      : (item as IMovie).release_date;
  const year = new Date(itemDate).getFullYear();
  const title =
    item.media_type === EMediaType.TV
      ? (item as ITvshow).name
      : (item as IMovie).title;

  // Methods
  const getGenreName = (genreId: number, genreList: IGenre[]) => {
    if (!genreList || genreList.length === 0) return "";

    const genre = genreList.find((g) => g.id === Number(genreId));

    return genre ? genre.name : "";
  };

  // Renders
  return (
    <li
      className="p-1 cursor-pointer"
      ref={ref}
      onClick={() => handleOpenItem(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenItem(item);
        }
      }}
    >
      <div
        className={`flex items-start p-2 rounded-md bg-blue-100 ${
          isActive ? "bg-blue-200" : "hover:bg-blue-200"
        }`}
      >
        <img
          src={`${baseImageUrl}${item.poster_path}`}
          alt={title}
          className="w-14 h-20 object-cover rounded-md mr-2"
        />

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-blue-500 text-sm">
            {title} <span className="font-normal text-gray-400">({year})</span>
          </p>

          <div className="flex gap-2">
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
        </div>
      </div>
    </li>
  );
}
