import API from "../../utils/APIUtils";
import type { IGiphyResponse } from "../../interfaces/giphy.interface";
import type { GifsOptionalParams } from "../server/giphy.service";

type RequestOptionalParams = Pick<GifsOptionalParams, "offset" | "limit">;

export const fetchTrendingGIFs = async ({
  offset,
  limit,
}: RequestOptionalParams): Promise<IGiphyResponse> =>
  API(`/api/trending?offset=${offset}&limit=${limit}`);

export const fetchSearchResults = async (
  searchQuery: string,
  { offset, limit }: RequestOptionalParams
): Promise<IGiphyResponse> =>
  API(`/api/search?query=${searchQuery}&offset=${offset}&limit=${limit}`);
