import { AdaptorRes, CredentialsRes, CredentialStatus, SuccessRes } from '..';

export const getCredentialsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<CredentialsRes>> => {
  try {
    //TODO: API call response
    const res = [
      {
        id: '1',
        recipient_name: 'Sanaz Mahmoudi',
        issuer: 'did:prism:0x7a3b9c2d1e8f4a5b6c7d8e9f0a1b2c3d',
        type: 'Educational Certificate',
        issuance_date: new Date(),
        expiration_date: new Date(),
        status: 'PENDING',
      },
    ];

    const items = res.map(credential => ({
      id: credential.id,
      recipient_name: credential.recipient_name,
      issuer: credential.issuer,
      type: credential.type,
      issuance_date: new Date(credential.issuance_date),
      expiration_date: new Date(credential.expiration_date),
      status: credential.status as CredentialStatus,
    }));

    return {
      data: {
        items,
        page,
        limit,
        total: 1,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting credential List: ', error);
    return { data: null, error: 'Error in getting credential List' };
  }
};

export const revokeCredentialAdaptor = async (credentialId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with credentialId
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in revoking credential', error);
    return { data: null, error: 'Error in revoking credential' };
  }
};

export const deleteCredentialAdaptor = async (credentialId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: API call with credentialId
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting credential', error);
    return { data: null, error: 'Error in deleting credential' };
  }
};
