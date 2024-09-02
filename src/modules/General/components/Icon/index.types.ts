import { AdaptorRes } from 'src/core/adaptors';
import { VerificationsRes } from 'src/core/adaptors/verifications/index.type';

export interface IconProps {
  name: string;
  color?: string;
  fontSize?: number;
  className?: string;
  containerClass?: string;
  cursor?: 'pointer' | 'text' | 'default';
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}
export const getVerificationsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<VerificationsRes>> => {
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
