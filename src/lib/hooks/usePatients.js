import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCases, getAppointments, bookAppointment } from '@/lib/api/services/patient';

const STALE_TIME = 2 * 60 * 1000;
const RETRY_COUNT = 1;

export const useCases = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cases', filters],
    queryFn: () => getCases(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { cases: data, isLoading, error, refetch };
};

export const useAppointments = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => getAppointments(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { appointments: data, isLoading, error, refetch };
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
};

// Deprecated: Use useBookAppointment instead
export const useCreateAppointment = useBookAppointment;