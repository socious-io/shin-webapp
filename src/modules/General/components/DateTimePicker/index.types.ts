import { DateTimePickerProps as MUIDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

export interface DateTimePickerProps extends Omit<MUIDateTimePickerProps<any>, 'renderInput'> {
  id?: string;
  label?: string;
  errorMessage?: string;
}
