import { useEffect, useRef, useState } from "react";

import api from "./server/api";

import { MovieInputSearch } from "./components/MovieInputSearch";

function App() {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  // Constants
  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  // Methods
  const handleChange = (value: string) => {
    setQuery(value);

    // Limpa timeout anterior, se houver
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Cria um novo timeout
    debounceTimeoutRef.current = window.setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  };

  const fetchMovies = async (debouncedQuery: string) => {
    try {
      setIsLoading(true);
      const response = await api.get("/search/movie", {
        params: {
          query: debouncedQuery,
        },
      });

      setResults(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
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

      <main className="flex flex-col flex-grow items-center">
        <div className="mt-16 mb-8 w-[480px]">
          <MovieInputSearch
            isLoading={isLoading}
            value={query}
            searchValue={debouncedQuery}
            searchResults={results}
            onSearchChange={handleChange}
          />
        </div>

        <div className="max-w-xl">
          <p className="text-lg text-center">
            Movies Live Search é uma aplicação que permite buscar filmes em
            tempo real, exibindo resultados instantâneos enquanto o usuário
            digita. O projeto utiliza React, TypeScript e APIs públicas de
            filmes para oferecer uma experiência rápida e intuitiva.
          </p>
        </div>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 shadow">
        <p className="text-sm">&copy; 2025 Soares Dev LTDA.</p>
      </footer>
    </div>
  );
}

export default App;
