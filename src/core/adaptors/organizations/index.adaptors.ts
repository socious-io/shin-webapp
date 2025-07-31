import { createOrg, getOrg, getOrgs, updateOrg } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { AdaptorRes, OrgProfileReq, OrgProfileRes } from '..';

export const getOrganizationsAdaptor = async (orgId?: string): Promise<AdaptorRes<OrgProfileRes[]>> => {
  try {
    const storageIdentityId = await nonPermanentStorage.get('identity');
    const currentIdentityId = orgId || storageIdentityId;

    const { results: organizations = [] } = await getOrgs();
    const data = organizations.map((org, index) => ({
      id: org.id,
      logo: { url: org.logo?.url || '', id: org.logo_id || '' },
      did: org?.did || '',
      name: org.name,
      description: org?.description || '',
      isVerified: org.is_verified,
      verificationStatus: org.verification_status || null,
      current: currentIdentityId ? org.id === currentIdentityId : index === 0,
    }));

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Organizations List', error);
    return { data: null, error: 'Error in getting Organizations List' };
  }
};

export const getOrgProfileAdaptor = async (orgId: string): Promise<AdaptorRes<OrgProfileRes>> => {
  try {
    const org = await getOrg(orgId);
    const res: OrgProfileRes = {
      id: org.id,
      logo: { url: org.logo?.url || '', id: org.logo_id || '' },
      did: org?.did || '',
      name: org.name,
      description: org?.description || '',
      isVerified: org?.is_verified,
      verificationStatus: org.verification_status || null,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const createOrUpdateOrgProfileAdaptor = async (
  params: OrgProfileReq,
  orgId?: string,
): Promise<AdaptorRes<string>> => {
  try {
    const payload = {
      name: params.name,
      description: params.description || '',
      logo_id: params.logoId,
    };
    const res = orgId ? await updateOrg(orgId, payload) : await createOrg(payload);
    return {
      data: res.id,
      error: null,
    };
  } catch {
    return { error: 'Error in creating or updating Organization Profile', data: null };
  }
};
