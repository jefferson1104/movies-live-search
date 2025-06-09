import { useEffect, useRef, useState } from "react";

import api from "../server/api";

import { EMediaType } from "../enums/media-type";

import type { IApiResponse } from "../interfaces/commons";

import { InputSearch } from "../components/InputSearch";
import { Favorites } from "../components/Favorites";

export function Home() {
  // States
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<IApiResponse>();

  // Constants
  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  // Methods
  const handleChange = (value: string) => {
    setQuery(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  };

  const fetchMovies = async (debouncedQuery: string) => {
    try {
      setIsLoading(true);

      const normalizedQuery = debouncedQuery.toLowerCase();

      const response = await api.get("/search/multi", {
        params: {
          query: normalizedQuery,
        },
      });

      if (response.data) {
        const filteredResults = response.data.results.filter(
          (item: { media_type: EMediaType }) =>
            item.media_type === EMediaType.MOVIE ||
            item.media_type === EMediaType.TV
        );

        setItems({ ...response.data, results: filteredResults });
      }
    } catch (error) {
      console.error("fetchMovies() error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!items || page >= items.total_pages) return;

    try {
      setIsLoading(true);

      const normalizedQuery = debouncedQuery.toLowerCase();

      const response = await api.get("/search/multi", {
        params: {
          query: normalizedQuery,
          page: page + 1,
        },
      });

      if (response.data) {
        const filteredResults = response.data.results.filter(
          (item: { media_type: EMediaType }) =>
            item.media_type === EMediaType.MOVIE ||
            item.media_type === EMediaType.TV
        );

        setItems((prevItems) => ({
          ...response.data,
          results: [...(prevItems?.results ?? []), ...filteredResults],
        }));

        setPage(page + 1);
      }
    } catch (error) {
      console.error("fetchNextPage() error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    setPage(1);

    if (!debouncedQuery) {
      setItems(undefined);
      return;
    }

    if (debouncedQuery.length < 3) {
      setItems(undefined);
      return;
    }

    fetchMovies(debouncedQuery);
  }, [debouncedQuery]);

  // Renders
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 flex items-center justify-center bg-gray-100 shadow">
        <h1 className="text-2xl font-bold">Movies Live Search</h1>
      </header>

      <main className="flex flex-col flex-grow items-center px-2 md:px-4">
        {/* live search */}
        <div className="mt-16 mb-8 w-[320px] md:w-[480px]">
          <InputSearch
            isLoading={isLoading}
            value={query}
            searchValue={debouncedQuery}
            searchResults={items?.results}
            currentPage={page}
            totalPages={items?.total_pages ?? 0}
            onSearchChange={handleChange}
            onLoadMoreResults={fetchNextPage}
          />
        </div>

        {/* favorites */}
        <div className="w-full mb-8">
          <Favorites />
        </div>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 shadow">
        <p className="text-sm">&copy; 2025 Soares Dev LTDA.</p>
      </footer>
    </div>
  );
}
