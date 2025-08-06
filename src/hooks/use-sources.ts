import { useState, useEffect } from 'react';
import api, { Source, CreateSourceData } from '@/lib/api-client';

export const useSources = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSources = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getSources();
      setSources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const addSource = async (sourceData: CreateSourceData) => {
    try {
      const newSource = await api.createSource(sourceData);
      setSources(prev => [...prev, newSource]);
      return newSource;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create source';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateSourceStatus = async (id: number, status: Source['status']) => {
    try {
      const updatedSource = await api.updateSourceStatus(id, status);
      setSources(prev => 
        prev.map(source => 
          source.id === id ? updatedSource : source
        )
      );
      return updatedSource;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update source status';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeSource = async (id: number) => {
    try {
      await api.deleteSource(id);
      setSources(prev => prev.filter(source => source.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete source';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    sources,
    loading,
    error,
    refetch: fetchSources,
    addSource,
    updateSourceStatus,
    removeSource,
  };
};