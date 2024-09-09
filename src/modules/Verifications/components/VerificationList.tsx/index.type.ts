import { Verification } from 'src/core/adaptors';

export interface VerificationListProps {
  list: Verification[];
  setList: (newVal: Verification[]) => void;
  totalItems: number;
}
