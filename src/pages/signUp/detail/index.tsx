import React from 'react';
import Button from 'src/modules/General/components/Button';
import { Input } from 'src/modules/General/components/Input';
import FormHeader from 'src/modules/SignUp/FormHeader';
import StepperLayout from 'src/modules/SignUp/StepperLayout';

import css from './index.module.scss';
import { useDetail } from './useDetail';

export const Detail = () => {
  const { register, errors } = useDetail();
  return (
    <StepperLayout activeStep={0}>
      <div className={css['container']}>
        <FormHeader
          title="Your details"
          subtitle="Help us customize your experience. Your data stays private and secure."
        />
        <div className={css['form']}>
          <div className={css['form__content']}>
            <div className="flex gap-5">
              <Input
                id="name"
                label="First name*"
                name="name"
                register={register}
                placeholder="Your first name"
                errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
              />

              <Input
                id="lastName"
                label="Last name*"
                name="lastName"
                register={register}
                placeholder="Your last name"
                errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
              />
            </div>
            <Input
              id="email"
              // TODO: get email from server
              value="test@socious.com"
              label="Email*"
              name="email"
              disabled
            />
            <Input
              id="jobTitle"
              label="Job title"
              name="jobTitle"
              register={register}
              placeholder="Your job title"
              errors={errors['jobTitle']?.message ? [errors['jobTitle']?.message.toString()] : undefined}
            />
            <Input
              autoComplete="current-password"
              id="password"
              type="password"
              label="Password*"
              name="password"
              register={register}
              placeholder="Type a password"
              errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
              hints={[
                {
                  hint: 'Your password must be at least 8 characters with lowercase, uppercase, and a special character.',
                  hide: false,
                },
              ]}
            />
          </div>
          <Button color="primary" variant="contained">
            Continue
          </Button>
        </div>
      </div>
    </StepperLayout>
  );
};
