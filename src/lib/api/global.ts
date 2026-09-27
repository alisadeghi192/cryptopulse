import { apiClient } from '@/lib/axios'
import type { GlobalStats, GlobalStatsResponse } from '@/types/coin'

export async function fetchGlobalStats(): Promise<GlobalStats> {
  const { data } = await apiClient.get<GlobalStatsResponse>('/global')
  return data.data
}