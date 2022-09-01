import type { NextApiRequest, NextApiResponse } from "next";
import { giphyAPI } from "../../services/server/giphy.service";
import type { IGiphyResponse } from "../../interfaces/giphy.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGiphyResponse>
) {
  const { offset: offsetStr, limit: limitStr } = req.query;

  const offset =
    typeof offsetStr === "string" ? parseInt(offsetStr) : undefined;

  const limit = typeof limitStr === "string" ? parseInt(limitStr) : undefined;

  const response = await giphyAPI.getTrendingGifs({
    offset,
    limit,
  });

  res.json(response.data);
}
