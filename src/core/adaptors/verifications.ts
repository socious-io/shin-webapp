export interface Verification {
  id: string;
  name: string;
  proofId: string;
  createdBy: string;
  creationDate: string;
}

export interface VerificationsRes {
  items: Verification[];
  page: number;
  totalCount: number;
  error?: string;
}

export interface VerificationRes {
  data?: Verification;
  error?: string;
}
export const getVerificationsAdaptor = async (page = 1, limit = 10): Promise<VerificationsRes> => {
  try {
    // TODO: call API and map the result
    return {
      items: [
        {
          id: '1',
          name: 'verification 1',
          proofId: '1234_1111',
          createdBy: 'Marjan',
          creationDate: '',
        },
        {
          id: '2',
          name: 'verification 2',
          proofId: '1234_2222',
          createdBy: 'Sanaz',
          creationDate: '',
        },
        {
          id: '3',
          name: 'verification 3',
          proofId: '1234_3333',
          createdBy: 'Azin',
          creationDate: '',
        },
        {
          id: '4',
          name: 'verification 4',
          proofId: '1234_4444',
          createdBy: 'Mohammad',
          creationDate: '',
        },
        {
          id: '5',
          name: 'verification 5',
          proofId: '1234_5555',
          createdBy: 'Minh',
          creationDate: '',
        },
        {
          id: '6',
          name: 'verification 6',
          proofId: '1234_6666',
          createdBy: 'Seira',
          creationDate: '',
        },
        {
          id: '7',
          name: 'verification 7',
          proofId: '1234_7777',
          createdBy: 'Elain',
          creationDate: '',
        },
      ],
      page,
      totalCount: 7,
    };
  } catch {
    return {
      items: [],
      page,
      totalCount: 0,
      error: 'error in get verifications API call',
    };
  }
};

export const getVerificationById = async (id: string): Promise<VerificationRes> => {
  try {
    // get verification by id and map the result to VerificationRes
    const res: VerificationRes = {
      data: {
        id: '1',
        name: 'verification 1',
        proofId: '1234_1111',
        createdBy: 'Marjan',
        creationDate: '',
      },
    };
    return res;
  } catch {
    return {
      error: 'error in get verification API call',
    };
  }
};
