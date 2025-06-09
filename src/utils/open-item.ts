import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

export const handleOpenItem = (item: IMovie | ITvshow) => {
  window.open(
    `https://www.themoviedb.org/${item.media_type}/${item.id}`,
    "_blank"
  );
};
