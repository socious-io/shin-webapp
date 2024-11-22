import { DatePickerProps as MUIDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps as MUIDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { TimePickerProps as MUITimePickerProps } from '@mui/x-date-pickers/TimePicker';

type CustomType = MUIDatePickerProps<any> & MUITimePickerProps<any> & MUIDateTimePickerProps<any>;

export interface DateTimePickerProps extends CustomType {
  id?: string;
  variant?: 'date' | 'time' | 'datetime';
  label?: string;
  errorMessage?: string;
}
