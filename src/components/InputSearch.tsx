import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

import { useGetGenres } from "../hooks/useGetGenres";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

import { handleOpenItem } from "../utils/open-item";

import { FirstItem } from "./FirstItem";
import { Item } from "./Item";

interface IInputSearchProps {
  isLoading?: boolean;
  value?: string;
  searchValue?: string;
  searchResults?: IMovie[] | ITvshow[];
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onLoadMoreResults: () => Promise<void>;
}

export function InputSearch({
  isLoading = false,
  value = "",
  searchValue = "",
  searchResults = [],
  currentPage,
  totalPages,
  onSearchChange,
  onLoadMoreResults,
}: IInputSearchProps) {
  // Hooks
  const { genres } = useGetGenres();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | undefined)[]>([]);
  const isFetching = useRef(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // States
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Constants
  const suggestionLinks = [
    {
      label: (term: string) => `Buscar "${term}" no IMDB`,
      href: (term: string) =>
        `https://www.imdb.com/find?q=${encodeURIComponent(term)}`,
    },
    {
      label: (term: string) => `Buscar "${term}" no Google`,
      href: (term: string) =>
        `https://www.google.com/search?q=${encodeURIComponent(term)}`,
    },
  ];
  const totalItems =
    searchResults?.length > 0 ? searchResults.length : suggestionLinks.length;

  // Methods
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (totalItems === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? 0 : Math.min(prev + 1, totalItems - 1);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? totalItems - 1 : Math.max(prev - 1, 0);
        return nextIndex;
      });
    }

    if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      if (searchResults?.length > 0) {
        handleOpenItem(searchResults[activeIndex]);
      } else {
        const link = suggestionLinks[activeIndex];
        window.open(link.href(searchValue), "_blank");
      }
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

  useEffect(() => {
    setActiveIndex(null);
  }, [searchValue]);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    listEl.scrollTop = 0;
  }, [searchValue]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = list;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

      if (!isNearBottom) return;
      if (isFetching.current) return;
      if (currentPage >= totalPages) return;

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(async () => {
        isFetching.current = true;
        try {
          await onLoadMoreResults();
        } finally {
          isFetching.current = false;
        }
      }, 300);
    };

    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, onLoadMoreResults]);

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
        <ul
          className="group mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          ref={listRef}
        >
          {/* Empty State */}
          {searchResults?.length === 0 && searchValue && (
            <div className="p-2">
              <p className="text-gray-500 text-sm mb-2">
                Nenhum resultado encontrado para{" "}
                <strong>"{searchValue}"</strong>.
              </p>

              {suggestionLinks.map((link, index) => {
                const isActive = activeIndex === index;

                return (
                  <li
                    key={index}
                    className="p-1 cursor-pointer"
                    ref={(el) => {
                      itemRefs.current[index] = el ?? undefined;
                    }}
                    onClick={() =>
                      window.open(link.href(searchValue), "_blank")
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        window.open(link.href(searchValue), "_blank");
                      }
                    }}
                  >
                    <div
                      className={`flex items-center py-1 px-2 rounded-md ${
                        isActive ? "bg-gray-200" : "hover:bg-gray-100"
                      }`}
                    >
                      {link.label(searchValue)}
                    </div>
                  </li>
                );
              })}
            </div>
          )}

          {/* Search Results */}
          {searchResults?.map((item, index) => {
            const isFirstItem = index === 0;

            return isFirstItem ? (
              <FirstItem
                key={item.id}
                item={item}
                genres={genres}
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
