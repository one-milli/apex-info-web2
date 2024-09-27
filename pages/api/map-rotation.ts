import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/types";

let cachedData: ApiResponse | null = null;
let cacheTime: number = 0;
const CACHE_DURATION: number = 1 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const currentTime: number = Date.now();

  // キャッシュが有効であればキャッシュを返す
  if (cachedData && currentTime - cacheTime < CACHE_DURATION) {
    return res.status(200).json(cachedData);
  }

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
      `${process.env.ALS_API_URL}/maprotation?version=2&auth=${process.env.ALS_API_KEY}`
    );

    cachedData = response.data;
    cacheTime = currentTime;

    return res.status(200).json(cachedData);
  } catch (error: unknown) {
    console.error("Error fetching map rotation:", error);

    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({ error: error.response.statusText });
    }

    return res.status(500).json({ error: "Failed to fetch map rotation data" });
  }
}
