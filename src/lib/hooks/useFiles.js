import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  uploadFile,
  getFiles, 
  getFile,
  updateFile,
  deleteFile,
  downloadFile,
  restoreFile,
  permanentDeleteFile
} from '@/lib/api/services/file';

const STALE_TIME = 2 * 60 * 1000;
const RETRY_COUNT = 1;

export const useFiles = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['files', filters],
    queryFn: () => getFiles(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    placeholderData: [],
  });

  return { 
    files: Array.isArray(data) ? data : [], 
    isLoading, 
    error, 
    refetch 
  };
};

export const useFile = (fileId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['file', fileId],
    queryFn: () => getFile(fileId),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
    enabled: !!fileId,
  });

  return { file: data, isLoading, error, refetch };
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const useUpdateFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId, data }) => updateFile(fileId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['file', variables.fileId] });
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: downloadFile,
  });
};

export const useRestoreFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const usePermanentDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentDeleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};