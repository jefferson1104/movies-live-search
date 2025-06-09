import { useFavorites } from "../contexts/favoritesContext";

import { useGetGenres } from "../hooks/useGetGenres";

import { getItemTitle } from "../utils/get-item-title";
import { getItemYear } from "../utils/get-item-year";

import { Genres } from "./Genres";

export function Favorites() {
  // Hooks
  const { favorites } = useFavorites();
  const { genres } = useGetGenres();

  // Constants
  const reversedFavorites = favorites.slice().reverse();

  // renders
  if (reversedFavorites.length === 0) {
    return <p className="text-gray-500">Nenhum favorito encontrado.</p>;
  }

  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Poster</th>
              <th className="p-3 border-b">Título</th>
              <th className="p-3 border-b">Ano</th>
              <th className="p-3 border-b">Gêneros</th>
            </tr>
          </thead>
          <tbody>
            {reversedFavorites.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                    alt={getItemTitle(item)}
                    className="w-20 h-auto rounded shadow"
                  />
                </td>
                <td className="p-3 border-b font-medium text-gray-800">
                  {getItemTitle(item)}
                </td>
                <td className="p-3 border-b text-gray-600">
                  {getItemYear(item)}
                </td>
                <td className="p-3 border-b text-gray-600">
                  <Genres item={item} genres={genres} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {reversedFavorites.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-3 p-3 border border-gray-200 rounded-lg shadow-sm"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
              alt={getItemTitle(item)}
              className="w-full sm:w-24 h-auto rounded"
            />
            <div className="flex flex-col justify-center gap-1">
              <p className="font-semibold text-gray-800">
                {getItemTitle(item)}
              </p>
              <p className="text-sm text-gray-600">{getItemYear(item)}</p>
              <Genres item={item} genres={genres} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
