import { PasswordReq, UserProfileReq, UserProfileRes } from './index.types';
import { AdaptorRes, SuccessRes } from '..';

export const getUserProfileAdaptor = async (): Promise<AdaptorRes<UserProfileRes>> => {
  try {
    //TODO: API call response and map
    const res = {
      id: '1234',
      imageUrl: '',
      firstName: 'Sanaz',
      lastName: 'Mahmoudi',
      email: 'mahmoudisanaz59@gmail.com',
      jobTitle: 'Front-End developer',
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting User Profile', error);
    return { data: null, error: 'Error in getting User Profile' };
  }
};

export const changeUserProfileAdaptor = async (payload: UserProfileReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with payload
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing User Profile', error);
    return { data: null, error: 'Error in changing User Profile' };
  }
};

export const changePasswordAdaptor = async (payload: PasswordReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with payload
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing Password', error);
    return { data: null, error: 'Error in changing Password' };
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
