import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const { isAuthenticated, user, updateUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated && !user,
    retry: false,
  });

  useEffect(() => {
    if (data?.user) {
      updateUser(data.user);
    }
  }, [data, updateUser]);

  return {
    user: user || data?.user,
    isAuthenticated,
    isLoading,
  };
};