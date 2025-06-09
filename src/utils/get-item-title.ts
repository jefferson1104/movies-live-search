import { EMediaType } from "../enums/media-type";

import type { IMovie } from "../interfaces/movie";
import type { ITvshow } from "../interfaces/tvshow";

export const getItemTitle = (item: IMovie | ITvshow): string => {
  return item.media_type === EMediaType.TV
    ? (item as ITvshow).name
    : (item as IMovie).title;
};
