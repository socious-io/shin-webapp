import { AdaptorRes, ProfileReq, ProfileRes, successRes } from '..';

export const getOrgProfileAdaptor = async (): Promise<AdaptorRes<ProfileRes>> => {
  try {
    //TODO: API call response and map
    const res = {
      avatarUrl: '',
      did: 'did:prism:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      name: 'default name',
      description: 'default description',
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const changeOrgProfileAdaptor = async (payload: ProfileReq): Promise<AdaptorRes<successRes>> => {
  try {
    //TODO: API call with payload
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing Organization Profile', error);
    return { data: null, error: 'Error in changing Organization Profile' };
  }
};
