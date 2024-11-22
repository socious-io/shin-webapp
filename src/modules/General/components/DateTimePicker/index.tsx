import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker';

import css from './index.module.scss';
import { DateTimePickerProps } from './index.types';

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  id,
  variant = 'date',
  name,
  label,
  errorMessage,
  ...props
}) => {
  const baseProps = {
    name,
    slotProps: {
      textField: {
        id,
        error: !!errorMessage,
        helperText: errorMessage || '',
        className: `${css['input']} ${errorMessage ? css['input--error'] : css['input--normal']}`,
      },
    },
    ...props,
  };
  const component = {
    date: <MUIDatePicker {...baseProps} />,
    time: <MUITimePicker {...baseProps} />,
    datetime: <MUIDateTimePicker {...baseProps} />,
  };

  return (
    <div className={css['container']}>
      {label && (
        <div className={css['label']}>
          <label htmlFor={id} className={css['label__text']} aria-describedby={id}>
            {label}
          </label>
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>{component[variant]}</LocalizationProvider>
    </div>
  );
};

export default DateTimePicker;
