import { useState, useEffect } from 'react';
import api, { DeliveryChannel, PublishContentData, PublishResponse } from '@/lib/api-client';

export const useDeliveryChannels = () => {
  const [channels, setChannels] = useState<DeliveryChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getDeliveryChannels();
      setChannels(data.channels);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch delivery channels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const publishContent = async (publishData: PublishContentData): Promise<PublishResponse> => {
    try {
      const result = await api.publishContent(publishData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish content';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    channels,
    loading,
    error,
    refetch: fetchChannels,
    publishContent,
  };
};