import { verificationType } from 'src/core/adaptors';

export interface TypeRadioGroupProps {
  selected?: verificationType;
  setSelected: (newVal: verificationType) => void;
}
