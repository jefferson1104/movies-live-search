import type { Ref } from "react";

import { EMediaType } from "../enums/media-type";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

import { handleOpenItem } from "../utils/open-item";

interface IItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie | ITvshow;
  isActive?: boolean;
}

export function Item({ ref, item, isActive }: IItemProps) {
  // Constants
  const title =
    item.media_type === EMediaType.TV
      ? (item as ITvshow).name
      : (item as IMovie).title;

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
        className={`flex items-center py-1 px-2 rounded-md ${
          isActive ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        {title}
      </div>
    </li>
  );
}
