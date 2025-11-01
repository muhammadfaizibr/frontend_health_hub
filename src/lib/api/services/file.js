import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/utils/api-wrapper';
import { apiClient } from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const uploadFile = async (fileData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.FILES.UPLOAD, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export const getFiles = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.FILES.LIST,
    { params: filters },
    'Files retrieved successfully'
  );
  return data;
};

export const getFile = async (fileId) => {
  const data = await apiGet(
    `${API_ENDPOINTS.FILES.LIST}${fileId}/`,
    {},
    'File retrieved successfully'
  );
  return data;
};

export const updateFile = async (fileId, fileData) => {
  const data = await apiPut(
    `${API_ENDPOINTS.FILES.LIST}${fileId}/`,
    fileData,
    {},
    'File updated successfully'
  );
  return data;
};

export const deleteFile = async (fileId) => {
  const data = await apiDelete(
    `${API_ENDPOINTS.FILES.LIST}${fileId}/`,
    {},
    'File deleted successfully'
  );
  return data;
};

export const downloadFile = async (fileId) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.FILES.LIST}${fileId}/download/`,
      {
        responseType: 'blob',
      }
    );

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'download';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    // Create blob and download
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, filename };
  } catch (error) {
    console.error('File download error:', error);
    throw error;
  }
};

export const restoreFile = async (fileId) => {
  const data = await apiPost(
    `${API_ENDPOINTS.FILES.LIST}${fileId}/restore/`,
    {},
    {},
    'File restored successfully'
  );
  return data;
};

export const permanentDeleteFile = async (fileId) => {
  const data = await apiDelete(
    `${API_ENDPOINTS.FILES.LIST}${fileId}/permanent_delete/`,
    {},
    'File permanently deleted'
  );
  return data;
};

export const fileService = {
  uploadFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
  downloadFile,
  restoreFile,
  permanentDeleteFile,
};

export default fileService;