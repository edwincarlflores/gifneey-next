import API from "../../utils/APIUtils";
import type { IGiphyResponse } from "../../interfaces/giphy.interface";
import type { GifsOptionalParams } from "../server/giphy.service";

type RequestOptionalParams = Pick<GifsOptionalParams, "offset" | "limit">;

type TrendingGifs = (
  optionalParams: RequestOptionalParams
) => Promise<IGiphyResponse>;

type SearchResults = (
  searchQuery: string,
  optionalParams: RequestOptionalParams
) => Promise<IGiphyResponse>;

export const fetchTrendingGIFs: TrendingGifs = async ({ offset, limit }) =>
  API(`/api/trending?offset=${offset}&limit=${limit}`);

export const fetchSearchResults: SearchResults = async (
  searchQuery,
  { offset, limit }
) => API(`/api/search?query=${searchQuery}&offset=${offset}&limit=${limit}`);
