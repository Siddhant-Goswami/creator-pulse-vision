import { useState, useEffect } from 'react';
import api, { UserProfile } from '@/lib/api-client';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUserProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'joinedAt'>>) => {
    try {
      const updatedProfile = await api.updateUserProfile(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    profile,
    loading,
    error,
    refetch: fetchUserProfile,
    updateProfile,
  };
};