import { useState, useEffect } from 'react';
import api, { UsageStats } from '@/lib/api-client';

export const useUsageStats = () => {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsageStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUsageStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch usage statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchUsageStats,
  };
};