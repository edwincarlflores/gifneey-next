import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { IGiphyResponse } from "../interfaces/giphy.interface";
import {
  fetchTrendingGIFs,
  fetchSearchResults,
} from "../services/client/giphy";

type ResultType = "trending" | "search";

type ReqParams = {
  offset: number;
  limit: number;
  resultType?: ResultType;
};

type QueryParams = {
  searchQuery: string;
  currentPage?: number;
  resultType?: ResultType;
} & ReqParams;

export const useTrendingGIFsQuery = (
  { offset, limit, resultType }: ReqParams,
  options?: UseQueryOptions<
    IGiphyResponse,
    unknown,
    IGiphyResponse,
    (string | number)[]
  >
) =>
  useQuery(["trending", offset], () => fetchTrendingGIFs({ offset, limit }), {
    ...options,
    enabled: resultType !== "search",
    refetchOnWindowFocus: false,
  });

export const useSearchResultsQuery = (
  { searchQuery, offset, limit, resultType }: QueryParams,
  options?: UseQueryOptions<
    IGiphyResponse,
    unknown,
    IGiphyResponse,
    (string | number)[]
  >
) =>
  useQuery(
    ["search", searchQuery, offset],
    () => fetchSearchResults(searchQuery, { offset, limit }),
    {
      ...options,
      enabled: !!searchQuery && resultType === "search",
      refetchOnWindowFocus: false,
    }
  );
