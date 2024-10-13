export type StatusValue = 'CREATED' | 'REQUESTED' | 'VERIFIED' | 'FAILED';
export interface StatusProps {
  status: StatusValue;
}
