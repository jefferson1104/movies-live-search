import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

import type { IMovie } from "../interfaces/movie";

import { FirstItem } from "./FirstItem";
import { Item } from "./Item";

interface IInputSearchProps {
  isLoading?: boolean;
  value?: string;
  searchValue?: string;
  searchResults?: IMovie[];
  onSearchChange: (value: string) => void;
}

export function InputSearch({
  isLoading = false,
  value = "",
  searchValue = "",
  searchResults = [],
  onSearchChange,
}: IInputSearchProps) {
  // Hooks
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | undefined)[]>([]);

  // States
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Methods
  const handleOpenItem = (item: IMovie) => {
    window.open(`https://www.themoviedb.org/movie/${item.id}`, "_blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults?.length === 0) return;

    if (e.key === "ArrowDown" && searchResults) {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? 0 : Math.min(prev + 1, searchResults.length - 1);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp" && searchResults) {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? searchResults.length - 1 : Math.max(prev - 1, 0);
        return nextIndex;
      });
    }

    if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      handleOpenItem(searchResults[activeIndex]);
    }
  };

  // Effects
  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.focus();
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Renders
  return (
    <div className="group" ref={wrapperRef}>
      <p className="text-gray-800">Pesquise um filme</p>
      <div className="flex items-center justify-between gap-2 w-full h-10 px-2 py-1 rounded-md border border-gray-600 focus-within:border-blue-500">
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Ex: Star Wars"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {isLoading && <LuLoaderCircle className="animate-spin text-blue-500" />}

        {!isLoading && (
          <FaChevronDown className="fill-gray-600 group-focus-within:fill-blue-500 transform transition-transform duration-300 group-focus-within:rotate-180" />
        )}
      </div>

      {searchValue && (
        <ul className="group mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Empty State */}
          {searchResults?.length === 0 && (
            <div className="flex items-center justify-center h-14">
              <p className="text-center text-gray-400">
                Nenhum resultado encontrado para "{searchValue}"
              </p>
            </div>
          )}

          {/* Search Results */}
          {searchResults?.map((item, index) => {
            const isFirstItem = index === 0;

            return isFirstItem ? (
              <FirstItem
                key={item.id}
                item={item}
                isActive={activeIndex === index}
                ref={(el) => {
                  itemRefs.current[index] = el ?? undefined;
                }}
              />
            ) : (
              <Item
                key={item.id}
                item={item}
                isActive={activeIndex === index}
                ref={(el) => {
                  itemRefs.current[index] = el ?? undefined;
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
