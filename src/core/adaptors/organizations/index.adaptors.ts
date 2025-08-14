import { getOrg, getOrgs, Organization, updateOrg } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { AdaptorRes, IdentityType, OrgProfileReq, OrgProfileRes, OrgsRes } from '..';

export const getCurrentOrgProfileAdaptor = (org: Organization, current = false): OrgProfileRes => ({
  id: org.id,
  logo: {
    url: org.logo?.url || '',
    id: org.logo?.id || '',
    filename: org.logo?.filename || '',
    created_at: org.logo?.created_at || null,
  },
  img: org.logo?.url || '',
  did: org?.did || '',
  name: org.name,
  username: '', // FIXME: check if username/email will be provided
  type: 'organization' as IdentityType,
  description: org?.description || '',
  isVerified: org.verified,
  verificationStatus: org.verification_status || 'UNDEFINED',
  current,
});

export const getOrganizationsAdaptor = async (orgId?: string): Promise<AdaptorRes<OrgsRes>> => {
  try {
    const storageIdentityId = await nonPermanentStorage.get('identity');
    const currentIdentityId = orgId || storageIdentityId;

    const { results: organizations = [] } = await getOrgs();
    //FIXME: remove when user force to choose organization and remove overwritten cookie identity
    const isValidIdentityId = organizations.some(org => org.id === currentIdentityId);
    await nonPermanentStorage.set({
      key: 'identity',
      value: (isValidIdentityId ? currentIdentityId : organizations[0]?.id) || '',
    });
    const data = organizations.map((org, index) =>
      getCurrentOrgProfileAdaptor(org, isValidIdentityId ? org.id === currentIdentityId : index === 0),
    );

    return {
      data: { entities: data, currentId: (isValidIdentityId ? currentIdentityId : organizations[0]?.id) || '' },
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

    return { data: getCurrentOrgProfileAdaptor(org), error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const updateOrgProfileAdaptor = async (
  params: OrgProfileReq,
  orgId: string,
): Promise<AdaptorRes<OrgProfileRes>> => {
  try {
    const payload = {
      name: params.name,
      description: params.description || '',
      logo: params?.logo,
    };
    const org = await updateOrg(orgId, payload);

    return { data: getCurrentOrgProfileAdaptor(org, true), error: null };
  } catch {
    return { error: 'Error in updating Organization Profile', data: null };
  }
};
