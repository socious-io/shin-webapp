import { getUser, updatePassword, updateProfile } from 'src/core/api';

import { PasswordReq, UserProfileReq, UserProfileRes } from './index.types';
import { AdaptorRes, SuccessRes, CustomError } from '..';

export const getUserProfileAdaptor = async (): Promise<AdaptorRes<UserProfileRes>> => {
  try {
    const user = await getUser();
    const res = {
      id: user.id,
      avatar: { url: user.avatar?.url || '', id: user.avatar_id || '' },
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email,
      jobTitle: user.job_title,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting User Profile', error);
    return { data: null, error: 'Error in getting User Profile' };
  }
};

export const changeUserProfileAdaptor = async (payload: UserProfileReq): Promise<AdaptorRes<UserProfileRes>> => {
  try {
    const newPayload = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      job_title: payload?.jobTitle || '',
      avatar_id: payload?.avatarId || '',
    };
    const user = await updateProfile(newPayload);
    const res = {
      id: user.id,
      avatar: { url: user.avatar?.url || '', id: user.avatar_id || '' },
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email,
      jobTitle: user.job_title,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in changing User Profile', error);
    return { data: null, error: 'Error in changing User Profile' };
  }
};

export const changePasswordAdaptor = async (payload: PasswordReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      current_password: payload.currentPass,
      password: payload.confirmPass,
    };
    await updatePassword(newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error: unknown) {
    console.error('Error in changing Password', error);
    return { data: null, error: (error as CustomError).response.data.error || 'Error in changing Password' };
  }
};

export const removeAccountAdaptor = async (userId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with userId
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in removing Account', error);
    return { data: null, error: 'Error in removing Account' };
  }
};
