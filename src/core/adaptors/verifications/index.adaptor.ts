import {
  getVerifications as getVerificationsAPI,
  createVerification as createVerificationAPI,
  getVerification,
  updateVerification,
  VerificationReq,
  deleteVerification,
} from 'src/core/api';

import { UpdateVerificationReq, Verification, VerificationReqAdaptor, VerificationsRes } from './index.type';
import { AdaptorRes, SuccessRes } from '..';

export const getVerificationsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<VerificationsRes>> => {
  try {
    const res = await getVerificationsAPI({ page, limit });
    const items: Verification[] = res.results.map(item => {
      return {
        id: item.id,
        name: item.name,
        proofId: item.present_id,
        createdBy: `${item.user.first_name} ${item.user.last_name}`,
        creationDate: item.created_at,
        schema: item.schema,
      };
    });
    const data: VerificationsRes = {
      items,
      page,
      totalCount: 7,
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