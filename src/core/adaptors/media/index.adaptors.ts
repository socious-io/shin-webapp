import { UploadMediaRes } from './index.types';
import { AdaptorRes } from '..';

export const uploadMedia = async (file: File): Promise<AdaptorRes<UploadMediaRes>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    // TODO: CALL upload API
    return {
      data: {
        id: '',
        identity_id: '',
        filename: '',
        url: '',
        created_at: '',
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in uploadMedia API Call',
    };
  }
};
