import { MediaRes } from './media.types';
import { post, get } from '../http';

export async function getMedia(id: string): Promise<MediaRes> {
  return (await get<MediaRes>(`/media/${id}`)).data;
}

export async function uploadMedia(file: File): Promise<MediaRes> {
  const formData = new FormData();
  formData.append('file', file);
  return (await post<MediaRes>('/media/upload', formData)).data;
}

export async function uploadMediaWithProgress(file: File, setProgress: (val: number) => void): Promise<MediaRes> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await post<MediaRes>('/media/upload', formData, {
    onUploadProgress: progressEvent => {
      if (progressEvent?.total) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentage);
      }
    },
  });
  return res.data;
}
