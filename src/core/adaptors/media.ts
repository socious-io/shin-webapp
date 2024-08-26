export interface UploadMediaAdaptorRes {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
  error?: string;
}

export const uploadMediaAdaptor = async (file: File): Promise<UploadMediaAdaptorRes> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    // TODO: CALL upload API
    return {
      id: '',
      identity_id: '',
      filename: '',
      url: '',
      created_at: '',
    };
  } catch {
    return {
      id: '',
      identity_id: '',
      filename: '',
      url: '',
      created_at: '',
      error: 'Error in uploadMedia API Call',
    };
  }
};
