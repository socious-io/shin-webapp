import {
  connectCredential,
  createCredential,
  createCredentialWithRecipient,
  createRecipient,
  CredentialRes,
  deleteCredential,
  deleteCredentials,
  deleteRecipient,
  downloadSample,
  getCredentials,
  getImportStatus,
  getRecipients,
  importCSVFile,
  revokeCredential,
  revokeCredentials,
  sendCredentials,
  updateRecipient,
} from 'src/core/api';
import { requestKYB } from 'src/core/api/kyb/kyb.api';
import store from 'src/store';

import {
  AdaptorRes,
  CredentialRecipientReq,
  CredentialReq,
  CredentialsRes,
  CredentialStatus,
  ImportFileReq,
  ImportFileRes,
  ImportStatus,
  RecipientReq,
  RecipientRes,
  SendCredentialReq,
  SuccessRes,
} from '..';

export const getCredentialsAdaptor = async (
  page = 1,
  limit = 10,
  filters?: { schema_id: string; sent: boolean },
): Promise<AdaptorRes<CredentialsRes>> => {
  const { email } = store.getState().user.userProfile;
  try {
    const { results, total = 0 } = await getCredentials({ page, limit }, filters);
    const items = results?.length
      ? results.map(credential => ({
          id: credential.id,
          recipient_name:
            credential.recipient?.first_name || credential.recipient?.last_name
              ? `${credential.recipient.first_name} ${credential.recipient.last_name}`
              : '',
          issuer: credential?.organization?.name || email || '',
          type: credential.name,
          issuance_date: new Date(credential.created_at),
          expiration_date: credential?.expired_at ? new Date(credential.expired_at) : null,
          status: credential.status as CredentialStatus,
        }))
      : [];

    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting credential List: ', error);
    return { data: null, error: 'Error in getting credential List' };
  }
};

export const createCredentialAdaptor = async (payload: CredentialReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      name: payload.name,
      description: payload.description,
      schema_id: payload.selectedSchema,
      recipient_id: payload.selectedRecipient,
      claims: payload.claims,
    };
    await createCredential(newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in creating a credential', error);
    return { data: null, error: 'Error in creating a credential' };
  }
};

export const revokeCredentialAdaptor = async (credentialId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await revokeCredential(credentialId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in revoking credential', error);
    return { data: null, error: 'Error in revoking credential' };
  }
};

export const revokeCredentialsAdaptor = async (credentialIds: string[]): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await revokeCredentials({ credentials: credentialIds });
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in revoking credentials', error);
    return { data: null, error: 'Error in revoking credentials' };
  }
};

export const deleteCredentialAdaptor = async (credentialId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteCredential(credentialId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting credential', error);
    return { data: null, error: 'Error in deleting credential' };
  }
};

export const deleteCredentialsAdaptor = async (credentialIds: string[]): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteCredentials({ credentials: credentialIds });
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting credentials', error);
    return { data: null, error: 'Error in deleting credentials' };
  }
};

export const getRecipientsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<RecipientRes>> => {
  try {
    const { results, total = 0 } = await getRecipients({ page, limit });

    const items = results?.length
      ? results.map(recipient => ({
          id: recipient.id,
          firstName: recipient.first_name,
          lastName: recipient.last_name,
          name: `${recipient.first_name} ${recipient.last_name}`,
          email: recipient.email,
          created_date: new Date(recipient.created_at),
        }))
      : [];

    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting recipients List: ', error);
    return { data: null, error: 'Error in getting recipients List' };
  }
};

export const addOrUpdateRecipientAdaptor = async (
  payload: RecipientReq,
  recipientId?: string,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
    };
    if (recipientId) {
      await updateRecipient(recipientId, newPayload);
    } else {
      await createRecipient(newPayload);
    }
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in adding/updating a recipient', error);
    return { data: null, error: 'Error in adding/updating a recipient' };
  }
};

export const deleteRecipientAdaptor = async (recipientId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteRecipient(recipientId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting credential', error);
    return { data: null, error: 'Error in deleting credential' };
  }
};

export const connectCredentialAdaptor = async (credentialId: string): Promise<AdaptorRes<CredentialRes>> => {
  try {
    const res = await connectCredential(credentialId);
    return {
      data: res,
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in connecting credential' };
  }
};

export const verifyOrganization = async (orgId: string, documents: string[]): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await requestKYB(orgId, { documents });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in verify organization API call',
    };
  }
};

export const addCredentialRecipientAdaptor = async (
  payload: CredentialRecipientReq,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      credential: {
        name: payload.name,
        description: payload.description,
        schema_id: payload.selectedSchema,
        claims: payload.claims,
      },
      recipient: {
        email: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName,
      },
    };
    await createCredentialWithRecipient(newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in creating a credential with recipient', error);
    return { data: null, error: 'Error in creating a credential with recipient' };
  }
};

export const sendCredentialsAdaptors = async (payload: SendCredentialReq) => {
  try {
    await sendCredentials(payload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in sending the credentials to recipients', error);
    return { data: null, error: 'Error in sending the credentials to recipients' };
  }
};

export const importCSVFileAdaptor = async (payload: ImportFileReq): Promise<AdaptorRes<ImportFileRes>> => {
  try {
    const res = await importCSVFile(payload);
    const data = {
      id: res.id,
      total: res.total_count,
    };
    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in importing CSV files',
    };
  }
};

export const getImportAdaptor = async (importId: string): Promise<AdaptorRes<{ id: string; status: string }>> => {
  try {
    const res = await getImportStatus(importId);
    return {
      data: {
        id: res.id,
        status: res.status,
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in downloading sample CSV',
    };
  }
};

export const getImportStatusAdaptor = async (importId: string): Promise<AdaptorRes<ImportStatus>> => {
  try {
    const res = await getImportStatus(importId);
    return {
      data: res.status,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in downloading sample CSV',
    };
  }
};

export const downloadSampleAdaptor = async (schemaId: string): Promise<AdaptorRes<string>> => {
  try {
    const res = await downloadSample(schemaId);
    return {
      data: res,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in downloading sample CSV',
    };
  }
};
