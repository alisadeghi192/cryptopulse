import { fetchCoins, type FetchCoinsParams } from "@/lib/api/coins";
import { useQuery } from "@tanstack/react-query";

export function useCoins(params: FetchCoinsParams = {}) {
  return useQuery({
    queryKey: ['coins', params],
    queryFn: () => fetchCoins(params),
  })
}