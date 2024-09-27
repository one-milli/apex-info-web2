import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { MapRotationData, ApiResponse } from "@/types";

let cachedData: MapRotationData | null = null;
let cacheTime: number = 0;
const CACHE_DURATION: number = 1 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const currentTime: number = Date.now();

  // キャッシュが有効であればキャッシュを返す
  if (cachedData && currentTime - cacheTime < CACHE_DURATION) {
    const apiResponse: ApiResponse = {
      current: cachedData.current,
      next: cachedData.next,
      fetchedAt: new Date(cacheTime).toISOString(),
    };
    return res.status(200).json(apiResponse);
  }

  try {
    // 外部APIからデータを取得
    const response: AxiosResponse<MapRotationData> = await axios.get<MapRotationData>(
      `${process.env.ALS_API_URL}/maprotation?auth=${process.env.ALS_API_KEY}`
    );

    cachedData = response.data;
    cacheTime = currentTime;

    const apiResponse: ApiResponse = {
      current: cachedData.current,
      next: cachedData.next,
      fetchedAt: new Date(cacheTime).toISOString(),
    };

    return res.status(200).json(apiResponse);
  } catch (error: unknown) {
    console.error("Error fetching map rotation:", error);

    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({ error: error.response.statusText });
    }

    return res.status(500).json({ error: "Failed to fetch map rotation data" });
  }
}
