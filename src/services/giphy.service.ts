import { AxiosResponse } from "axios";
import HttpClient from "../lib/http-client";
import type { IGiphyResponse } from "../interfaces/giphy.interface";

const GIPHY_GIF_API_BASE_URL = "https://api.giphy.com/v1/gifs";

type GifsOptionalParams = {
  limit?: number;
  offset?: number;
  rating?: string;
  random_id?: string;
  bundle?: string;
};

type SearchOptionalParams = GifsOptionalParams & {
  lang?: string;
};

class GiphyService extends HttpClient {
  private static classInstance?: GiphyService;

  private constructor() {
    super(GIPHY_GIF_API_BASE_URL);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new GiphyService();
    }

    return this.classInstance;
  }

  public getTrendingGifs(
    optionalParams?: GifsOptionalParams
  ): Promise<AxiosResponse<IGiphyResponse>> {
    return this.instance.get<IGiphyResponse>("/trending", {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        ...optionalParams,
      },
    });
  }

  public getSearchResults(
    searchQuery: string,
    optionalParams?: SearchOptionalParams
  ): Promise<AxiosResponse<IGiphyResponse>> {
    return this.instance.get<IGiphyResponse>("/search", {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: searchQuery,
        ...optionalParams,
      },
    });
  }
}

export const giphyAPI = GiphyService.getInstance();

export default GiphyService;
