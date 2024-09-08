import { AdaptorRes, OrgProfileReq, OrgProfileRes, SuccessRes } from '..';

export const getOrgProfileAdaptor = async (): Promise<AdaptorRes<OrgProfileRes>> => {
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

export const changeOrgProfileAdaptor = async (payload: OrgProfileReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with payload
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing Organization Profile', error);
    return { data: null, error: 'Error in changing Organization Profile' };
  }
};
