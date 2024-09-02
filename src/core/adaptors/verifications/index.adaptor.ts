import { UpdateVerificationReq, Verification, VerificationReq, VerificationsRes } from './index.type';
import { AdaptorRes, successRes } from '..';

const schema = {
  id: '1',
  name: 'Educational Certificate',
  description: 'For academic degrees, diplomas, or certifications',
  created: '',
  created_at: new Date(),
  deletable: false,
  attributes: [{ name: 'Test', option: { label: 'Text', value: 'TEXT' }, description: 'attribute description' }],
};
export const getVerifications = async (page = 1, limit = 10): Promise<AdaptorRes<VerificationsRes>> => {
  try {
    // TODO: call API and map the result
    const data: VerificationsRes = {
      items: [
        {
          id: '1',
          name: 'verification 1',
          proofId: '1234_1111',
          createdBy: 'Marjan',
          creationDate: '',
          schema,
        },
        {
          id: '2',
          name: 'verification 2',
          proofId: '1234_2222',
          createdBy: 'Sanaz',
          creationDate: '',
          schema,
        },
        {
          id: '3',
          name: 'verification 3',
          proofId: '1234_3333',
          createdBy: 'Azin',
          creationDate: '',
          schema,
        },
        {
          id: '4',
          name: 'verification 4',
          proofId: '1234_4444',
          createdBy: 'Mohammad',
          creationDate: '',
          schema,
        },
        {
          id: '5',
          name: 'verification 5',
          proofId: '1234_5555',
          createdBy: 'Minh',
          creationDate: '',
          schema,
        },
        {
          id: '6',
          name: 'verification 6',
          proofId: '1234_6666',
          createdBy: 'Seira',
          creationDate: '',
          schema,
        },
        {
          id: '7',
          name: 'verification 7',
          proofId: '1234_7777',
          createdBy: 'Elain',
          creationDate: '',
          schema,
        },
      ],
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

export const getVerificationById = async (id: string): Promise<AdaptorRes<Verification>> => {
  try {
    // get verification by id and map the result to VerificationRes
    const res = {
      data: {
        id: '1',
        name: 'verification 1',
        proofId: '1234_1111',
        createdBy: 'Marjan',
        creationDate: '',
        description: 'test desc',
        schema,
      },
      error: null,
    };
    return res;
  } catch {
    return {
      data: null,
      error: 'error in get verification API call',
    };
  }
};

export const createVerification = async (param: VerificationReq): Promise<AdaptorRes<successRes>> => {
  try {
    // TODO: call API with param
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in create verification API call' };
  }
};

export const updateVerification = async (param: UpdateVerificationReq): Promise<AdaptorRes<successRes>> => {
  try {
    // TODO: call API with param
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return { data: null, error: 'Error in update verification API call' };
  }
};
