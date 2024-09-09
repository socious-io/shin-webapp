import { getOrg, getOrgs, updateOrg } from 'src/core/api';

import { AdaptorRes, OrgProfileReq, OrgProfileRes, SuccessRes } from '..';

export const getOrgProfileAdaptor = async (orgId: string): Promise<AdaptorRes<OrgProfileRes>> => {
  try {
    const org = await getOrg(orgId);
    const res = {
      logo: { url: org.logo?.url || '', id: org.logo_id || '' },
      did: org?.did || '',
      name: org.name,
      description: org?.description || '',
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const changeOrgProfileAdaptor = async (
  orgId: string,
  payload: OrgProfileReq,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      name: payload.name,
      description: payload?.description || '',
      logo_id: payload?.logoId || '',
    };
    await updateOrg(orgId, newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing Organization Profile', error);
    return { data: null, error: 'Error in changing Organization Profile' };
  }
};

export const getOrgIdAdaptor = async (): Promise<AdaptorRes<string>> => {
  try {
    const { results = [] } = await getOrgs();
    return {
      data: results[0]?.id || '',
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Organization ID', error);
    return { data: null, error: 'Error in getting Organization ID' };
  }
};
