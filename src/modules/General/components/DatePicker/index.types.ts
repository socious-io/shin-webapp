import { DatePickerProps as MUIDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export interface DatePickerProps<TDate extends Dayjs = Dayjs> extends MUIDatePickerProps<TDate> {
  id?: string;
  label?: string;
  errorMessage?: string;
}
