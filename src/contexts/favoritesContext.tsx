import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

const FAVORITES_KEY = "favorites";

interface FavoritesContextProps {
  favorites: (IMovie | ITvshow)[];
  toggleFavorite: (item: IMovie | ITvshow) => void;
  isFavorited: (item: IMovie | ITvshow) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Hooks
  const isFirstLoad = useRef(true);

  // States
  const [favorites, setFavorites] = useState<(IMovie | ITvshow)[]>([]);

  // Methods
  const isFavorited = (item: IMovie | ITvshow) =>
    favorites.some((i) => i.id === item.id && i.media_type === item.media_type);

  const toggleFavorite = (item: IMovie | ITvshow) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (i) => i.id === item.id && i.media_type === item.media_type
      );
      if (exists) {
        return prev.filter(
          (i) => !(i.id === item.id && i.media_type === item.media_type)
        );
      }
      return [...prev, item];
    });
  };

  // Effects
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Renders
  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
