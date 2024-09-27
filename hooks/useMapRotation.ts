import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/types";

interface UseMapRotationResult {
  data: ApiResponse | null;
  loading: boolean;
  error: Error | null;
}

const useMapRotation = (): UseMapRotationResult => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMapRotation = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
          "/api/map-rotation"
        );
        setData(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.message) {
          setError(new Error(err.message));
        } else {
          setError(new Error("未知のエラーが発生しました"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMapRotation();
  }, []);

  return { data, loading, error };
};

export default useMapRotation;
