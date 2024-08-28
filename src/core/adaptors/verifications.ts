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
export const getVerificationsAdaptor = async (page = 1, limit = 10): Promise<VerificationsRes> => {
  try {
    // TODO: call API and map the result
    return {
      items: [],
      page,
      totalCount: 10,
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
