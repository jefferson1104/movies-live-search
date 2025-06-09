import { EMediaType } from "../enums/media-type";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

export const getItemYear = (item: IMovie | ITvshow) => {
  const date =
    item.media_type === EMediaType.TV
      ? (item as ITvshow).first_air_date
      : (item as IMovie).release_date;

  return new Date(date).getFullYear();
};
