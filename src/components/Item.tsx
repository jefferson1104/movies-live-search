import type { Ref } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

import { useFavorites } from "../contexts/favoritesContext";

import { getItemTitle } from "../utils/get-item-title";
import { handleOpenItem } from "../utils/open-item";

interface IItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie | ITvshow;
  isActive?: boolean;
}

export function Item({ ref, item, isActive }: IItemProps) {
  // Hooks
  const { toggleFavorite, isFavorited } = useFavorites();

  // Constants
  const favorited = isFavorited(item);
  const title = getItemTitle(item);
  const isSmallScreen = window.innerWidth < 768;
  const truncatedTitle =
    isSmallScreen && title.length > 30 ? title.slice(0, 30) + "..." : title;

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
        className={`flex items-center justify-between w-full py-1 px-1 rounded-md ${
          isActive ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        <div className="w-full" onClick={() => handleOpenItem(item)}>
          <p>{truncatedTitle}</p>
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
    </li>
  );
}
