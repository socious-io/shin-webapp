import { uploadMedia } from 'src/core/api';

import { UploadMediaRes } from './index.types';
import { AdaptorRes } from '..';

export const uploadMediaAdaptor = async (file: File): Promise<AdaptorRes<UploadMediaRes>> => {
  try {
    const res = await uploadMedia(file);
    return {
      data: {
        ...res,
        identity_id: '',
        created_at: res.created_at.toString(),
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
