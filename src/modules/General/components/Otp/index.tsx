import { Typography } from '@mui/material';
import OtpInput from 'react-otp-input';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { OTPProps } from './index.types';

const handlePaste: React.ClipboardEventHandler = event => {
  event.clipboardData.getData('text');
};

const OTP: React.FC<OTPProps> = ({ value, setValue, isValid = true, errorMessage }) => {
  return (
    <>
      <OtpInput
        value={value}
        onChange={setValue}
        onPaste={handlePaste}
        numInputs={6}
        placeholder="______"
        inputStyle={`${css.input} !w-[48px] md:!w-[64px] h-[48px] md:h-[64px]`}
        inputType="tel"
        renderInput={props => <input {...props} />}
        containerStyle={css.container}
      />
      {!isValid && (
        <Typography variant="caption" color={variables.color_error_500}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default OTP;
