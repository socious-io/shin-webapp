import {
  getVerifications as getVerificationsAPI,
  createVerification as createVerificationAPI,
  getVerification,
  updateVerification,
  VerificationReq,
  deleteVerification,
  connectVerification,
  VerificationIndividualRes,
  getVerificationIndividuals,
  createVerificationIndividuals,
  VerificationIndividualReq,
} from 'src/core/api';

import { AdaptorRes, SuccessRes } from '..';
import {
  ReusableVerificationsRes,
  SingleUseVerification,
  SingleUseVerificationsRes,
  UpdateVerificationReq,
  Verification,
  VerificationIndividualAdaptorList,
  VerificationReqAdaptor,
} from './index.type';

export const getReusableVerificationsAdaptor = async (
  page = 1,
  limit = 10,
): Promise<AdaptorRes<ReusableVerificationsRes>> => {
  try {
    const res = await getVerificationsAPI({ page, limit }, { type: 'MULTI' });
    const items: Verification[] = res.results.map(item => {
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        proofId: item.present_id,
        createdBy: `${item.user.first_name} ${item.user.last_name}`,
        creationDate: item.created_at,
        schema: item.schema,
        attributes: [],
        type: 'reusable',
        // FIXME: Ask BE to add this in API result
        // usage: 0
      };
    });
    const data: ReusableVerificationsRes = {
      items,
      page,
      totalCount: res.total,
    };
    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'error in get verifications API call',
    };
  }
};

export const getSingleUseVerificationsAdaptor = async (
  page = 1,
  limit = 10,
): Promise<AdaptorRes<SingleUseVerificationsRes>> => {
  try {
    const res = await getVerificationsAPI({ page, limit }, { type: 'SINGLE' });
    const items: SingleUseVerification[] = res.results.map(item => {
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        proofId: item.present_id,
        createdBy: `${item.user.first_name} ${item.user.last_name}`,
        creationDate: item.created_at,
        schema: item.schema,
        attributes: [],
        type: 'singleUse',
        // FIXME: Ask BE team to add these attributes in result
        // activeLinks:0,
        // completed:0
      };
    });
    const data: SingleUseVerificationsRes = {
      items,
      page,
      totalCount: res.total,
    };
    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'error in get verifications API call',
    };
  }
};

export const getVerificationByIdAdaptor = async (id: string): Promise<AdaptorRes<Verification>> => {
  try {
    const res = await getVerification(id);
    const data: Verification = {
      id: res.id,
      name: res.name,
      createdBy: res.user.id,
      creationDate: res.created_at,
      description: res.description,
      schema: res.schema,
      attributes: res.attributes?.map(item => {
        return {
          ...item,
          id: item.attribute_id,
        };
      }),
      type: res.type === 'SINGLE' ? 'singleUse' : 'reusable',
    };

    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'error in get verification API call',
    };
  }
};

export const createVerificationAdaptor = async (param: VerificationReqAdaptor): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await createVerificationAPI({
      name: param.name,
      description: param.description || '',
      schema_id: param.schemaId,
      attributes: param.attributes.map(atr => {
        const { id, operator, value, type } = atr;
        return { attribute_id: id, operator, value: value || '', type };
      }),
      type: param.type === 'reusable' ? 'MULTI' : 'SINGLE',
    });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in create verification API call' };
  }
};

export const updateVerificationAdaptor = async (param: UpdateVerificationReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const payload: VerificationReq = {
      name: param.name,
      description: param.description || '',
      schema_id: param.schemaId,
      attributes: param.attributes.map(atr => {
        const { id, operator, value, type } = atr;
        return { attribute_id: id, operator, value: value || '', type };
      }),
      type: param.type === 'reusable' ? 'MULTI' : 'SINGLE',
    };
    await updateVerification(param.id, payload);
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in update verification API call' };
  }
};

export const deleteVerificationAdaptor = async (id: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteVerification(id);

    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in update verification API call' };
  }
};

export const connectVerificationAdaptor = async (
  individualId: string,
): Promise<AdaptorRes<VerificationIndividualRes>> => {
  try {
    const res = await connectVerification(individualId);
    return {
      data: res,
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in connect verification API call' };
  }
};

export const getVerificationHistory = async (
  id: string,
  page: number,
): Promise<AdaptorRes<VerificationIndividualAdaptorList>> => {
  try {
    const apiRes = await getVerificationIndividuals(id, { page, limit: 10 });
    const data = apiRes.results.map(item => {
      return {
        id: item.id,
        individualId: item.user_id,
        connectionUrl: item.connection_url,
        status: item.status,
        createDate: item.created_at,
      };
    });

    const res: VerificationIndividualAdaptorList = {
      ...apiRes,
      results: data,
    };

    return {
      data: res,
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in getVerificationIndividuals API call' };
  }
};

export const createVerificationIndividualAdaptor = async (
  verificationId: string,
  customerId?: string,
): Promise<AdaptorRes<VerificationIndividualRes>> => {
  try {
    const payload: VerificationIndividualReq = {
      customer_id: customerId || Array.from({ length: 3 }, () => Math.floor(1000 + Math.random() * 9000)).join('-'),
      verification_id: verificationId,
    };
    const res = await createVerificationIndividuals(payload);
    return { data: res, error: null };
  } catch {
    return { data: null, error: 'Error in createVerificationIndividuals API call' };
  }
};
