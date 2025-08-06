import { useState, useEffect } from 'react';
import api, { TopicAnalytic, TrendingTopic, EfficiencyMetric } from '@/lib/api-client';

export const useTopicAnalytics = (filters: { status?: string; timeRange?: string } = {}) => {
  const [topics, setTopics] = useState<TopicAnalytic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopicAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTopicAnalytics(filters);
      setTopics(data.topics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch topic analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicAnalytics();
  }, [JSON.stringify(filters)]);

  return {
    topics,
    loading,
    error,
    refetch: fetchTopicAnalytics,
  };
};

export const useTrends = () => {
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTrends();
      setTrends(data.trending);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trends');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return {
    trends,
    loading,
    error,
    refetch: fetchTrends,
  };
};

export const useEfficiencyMetrics = () => {
  const [metrics, setMetrics] = useState<EfficiencyMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEfficiencyMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getEfficiencyMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch efficiency metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEfficiencyMetrics();
  }, []);

  return {
    metrics,
    loading,
    error,
    refetch: fetchEfficiencyMetrics,
  };
};