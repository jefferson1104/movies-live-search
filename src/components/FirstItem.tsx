import type { Ref } from "react";

import { useGetGenres } from "../hooks/useGetGenres";

import type { IMovie } from "../interfaces/movie";

interface IFirstItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie;
  isActive?: boolean;
}

export function FirstItem({ ref, item, isActive }: IFirstItemProps) {
  // Hooks
  const { genres, getGenreName } = useGetGenres();

  // Constants
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const year = new Date(item.release_date).getFullYear();

  // Methods
  const handleOpenItem = (item: IMovie) => {
    window.open(`https://www.themoviedb.org/movie/${item.id}`, "_blank");
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
          alt={item.title}
          className="w-14 h-20 object-cover rounded-md mr-2"
        />

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-blue-500 text-sm">
            {item.title}{" "}
            <span className="font-normal text-gray-400">({year})</span>
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
