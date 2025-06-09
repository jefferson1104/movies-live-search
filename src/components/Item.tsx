import type { Ref } from "react";
import type { IMovie } from "../interfaces/movie";

interface IItemProps {
  ref: Ref<HTMLLIElement>;
  item: IMovie;
  isActive?: boolean;
}

export function Item({ ref, item, isActive }: IItemProps) {
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
        className={`flex items-center py-1 px-2 rounded-md ${
          isActive ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        {item.title}
      </div>
    </li>
  );
}
