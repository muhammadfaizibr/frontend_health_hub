import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getCases, 
  getCase,
  createCase,
  updateCase,
  deleteCase,
  getAppointments, 
  getAppointment,
  joinAppointment,
  bookAppointment,
  cancelAppointment,
  getReports,
  getPrescriptions,
  createReport,
  createReview,
  updatePatientProfile,
  getProfile
} from '@/lib/api/services/patient';

const STALE_TIME = 2 * 60 * 1000;
const RETRY_COUNT = 1;


export const usePatientProfile = () => {
  return useQuery({
    queryKey: ['patientProfile'],
    queryFn: getProfile,
    staleTime: STALE_TIME,
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePatientProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientProfile'] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};


export const useCases = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cases'],
    queryFn: () => getCases(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { cases: data, isLoading, error, refetch };
};


export const useCase = (caseId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['case', caseId],
    queryFn: () => getCase(caseId),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    enabled: !!caseId,
  });

  return { caseData: data, isLoading, error, refetch };
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
};

export const useUpdateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ caseId, data }) => updateCase(caseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.caseId] });
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
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

export const useAppointment = (appointmentId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => getAppointment(appointmentId),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    enabled: !!appointmentId,
  });

  return { appointment: data, isLoading, error, refetch };
};

export const useJoinAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ appointmentId, participantType }) => 
      joinAppointment(appointmentId, participantType),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['appointment', variables.appointmentId] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
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

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      // Invalidate all appointment-related queries
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment'] });
      queryClient.invalidateQueries({ queryKey: ['case-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
};

// Prescriptions Hooks
export const usePrescriptions = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['prescriptions', filters],
    queryFn: () => getPrescriptions(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    placeholderData: [],
  });

  return { prescriptions: data, isLoading, error, refetch };
};

// Reports Hooks
export const useReports = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', filters],
    queryFn: () => getReports(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    placeholderData: [],
  });

  return { reports: data, isLoading, error, refetch };
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};

// Reviews Hooks
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment'] });
      queryClient.invalidateQueries({ queryKey: ['doctorReviews'] });
    },
  });
};

export const useCreateAppointment = useBookAppointment;