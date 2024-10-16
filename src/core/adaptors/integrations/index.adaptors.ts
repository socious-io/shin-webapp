import { createIntegration, deleteIntegration, getIntegrations, updateIntegration } from 'src/core/api';

import { AdaptorRes, IntegrationReq, IntegrationsRes, SuccessRes } from '..';

export const getIntegrationsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<IntegrationsRes>> => {
  try {
    const { results, total = 0 } = await getIntegrations({ page, limit });
    const items = results?.length
      ? results.map(integration => ({
          id: integration.id,
          name: integration.name,
          base_url: integration.base_url,
          api_key: integration.key,
          secret_key: integration.secret,
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
    console.error('Error in getting integration List: ', error);
    return { data: null, error: 'Error in getting integration List' };
  }
};

export const addOrUpdateIntegrationAdaptor = async (
  payload: IntegrationReq,
  integrationId?: string,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    if (integrationId) {
      await updateIntegration(integrationId, payload);
    } else {
      await createIntegration(payload);
    }
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in adding/updating a integration', error);
    return { data: null, error: 'Error in adding/updating a integration' };
  }
};

export const deleteIntegrationAdaptor = async (integrationId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteIntegration(integrationId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting integration', error);
    return { data: null, error: 'Error in deleting integration' };
  }
};
