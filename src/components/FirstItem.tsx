import type { Ref } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import type { ITvshow } from "../interfaces/tvshow";
import type { IMovie } from "../interfaces/movie";
import type { IGenre } from "../interfaces/commons";

import { useFavorites } from "../contexts/favoritesContext";

import { handleOpenItem } from "../utils/open-item";
import { getItemTitle } from "../utils/get-item-title";
import { getItemYear } from "../utils/get-item-year";

interface IFirstItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie | ITvshow;
  genres: IGenre[];
  isActive?: boolean;
}

export function FirstItem({ ref, item, genres, isActive }: IFirstItemProps) {
  // Hooks
  const { toggleFavorite, isFavorited } = useFavorites();

  // Constants
  const favorited = isFavorited(item);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const title = getItemTitle(item);
  const year = getItemYear(item);
  const isSmallScreen = window.innerWidth < 768;
  const truncatedTitle =
    isSmallScreen && title.length > 35 ? title.slice(0, 35) + "..." : title;

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
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenItem(item);
        }
      }}
    >
      <div
        className={`flex items-start justify-between w-full p-2 rounded-md bg-blue-100 ${
          isActive ? "bg-blue-200" : "hover:bg-blue-200"
        }`}
      >
        <div className="flex items-start justify-between w-full">
          <div
            className="flex items-start"
            onClick={() => handleOpenItem(item)}
          >
            <img
              src={`${baseImageUrl}${item.poster_path}`}
              alt={title}
              className="w-14 h-20 object-cover rounded-md mr-2"
            />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-blue-500 text-sm">
                {truncatedTitle}{" "}
                <span className="font-normal text-gray-400">({year})</span>
              </p>

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
            </div>
          </div>

          {favorited ? (
            <FaStar
              onClick={() => toggleFavorite(item)}
              className="size-6 text-amber-400 hover:text-gray-400 transition-all duration-300"
            />
          ) : (
            <FaRegStar
              onClick={() => toggleFavorite(item)}
              className="size-6 text-gray-400 hover:text-amber-400 transition-all duration-300"
            />
          )}
        </div>
      </div>
    </li>
  );
}
